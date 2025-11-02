import express from 'express';
import { pool } from '../db/connection';
import { calculateTestResult } from '../services/testScoring';

const router = express.Router();

// Get all enabled tests
router.get('/', async (req, res, next) => {
  try {
    const language = (req.query.lang as string) || 'en';
    const result = await pool.query(
      `SELECT t.*, 
        (SELECT value FROM translations WHERE key = t.name AND language_code = $1) as translated_name
       FROM tests t 
       WHERE enabled = true 
       ORDER BY t.order_index, t.id`,
      [language]
    );
    res.json(result.rows);
  } catch (error: any) {
    // If database error, return empty array instead of crashing
    if (error.code === 'ECONNREFUSED' || error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
      console.warn('Database not connected, returning empty array:', error.message);
      return res.json([]);
    }
    next(error);
  }
});

// Get test by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const language = (req.query.lang as string) || 'en';
    
    const testResult = await pool.query(
      `SELECT t.*, 
        (SELECT value FROM translations WHERE key = t.name AND language_code = $1) as translated_name
       FROM tests t 
       WHERE slug = $2 AND enabled = true`,
      [language, slug]
    );

    if (testResult.rows.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
    }

    res.json(testResult.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Submit test answers and calculate result
router.post('/:slug/submit', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { answers, email } = req.body;

    // Get test
    const testResult = await pool.query(
      'SELECT * FROM tests WHERE slug = $1 AND enabled = true',
      [slug]
    );

    if (testResult.rows.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const test = testResult.rows[0];

    // Calculate score and result
    const { totalScore, resultId, resultData } = await calculateTestResult(
      test.id,
      test.test_type,
      answers
    );

    // Save session
    const sessionResult = await pool.query(
      `INSERT INTO test_sessions (test_id, email, answers, total_score, result_id, paid)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [test.id, email || null, JSON.stringify(answers), totalScore, resultId, false]
    );

    const sessionId = sessionResult.rows[0].id;

    res.json({
      sessionId,
      score: totalScore,
      resultId,
      result: resultData,
      requiresPayment: test.is_premium, // Always requires payment if premium
    });
  } catch (error) {
    next(error);
  }
});

// Get test questions
router.get('/:slug/questions', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const language = (req.query.lang as string) || 'en';

    const testResult = await pool.query(
      'SELECT id FROM tests WHERE slug = $1 AND enabled = true',
      [slug]
    );

    if (testResult.rows.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const testId = testResult.rows[0].id;

    const questionsResult = await pool.query(
      `SELECT q.*, 
        (SELECT value FROM translations WHERE key = q.text_key AND language_code = $1) as translated_text
       FROM questions q
       WHERE q.test_id = $2
       ORDER BY q.order_index`,
      [language, testId]
    );

    // Translate options
    const questions = await Promise.all(
      questionsResult.rows.map(async (q) => {
        const options = q.options;
        const translatedOptions = await Promise.all(
          options.map(async (opt: any) => {
            const transResult = await pool.query(
              'SELECT value FROM translations WHERE key = $1 AND language_code = $2',
              [opt.key, language]
            );
            return {
              ...opt,
              text: transResult.rows[0]?.value || opt.key,
            };
          })
        );
        return {
          ...q,
          text: q.translated_text || q.text_key,
          options: translatedOptions,
        };
      })
    );

    res.json(questions);
  } catch (error) {
    next(error);
  }
});

export default router;
