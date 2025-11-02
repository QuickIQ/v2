import express from 'express';
import { pool } from '../db/connection';
import { randomBytes } from 'crypto';
import { calculateIQScore } from '../services/testScoring';

const router = express.Router();

/**
 * Create or resume test session
 */
router.post('/quick-iq-test/session', async (req, res, next) => {
  try {
    const { sessionToken } = req.body;
    
    const testResult = await pool.query(
      `SELECT id FROM tests WHERE slug = 'quick-iq-test' AND enabled = true`
    );
    
    if (testResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quick IQ Test not found' });
    }
    
    const testId = testResult.rows[0].id;
    
    if (sessionToken) {
      // Resume existing session
      const sessionResult = await pool.query(
        `SELECT * FROM test_sessions 
         WHERE session_token = $1 AND test_id = $2 
         ORDER BY created_at DESC LIMIT 1`,
        [sessionToken, testId]
      );
      
      if (sessionResult.rows.length > 0) {
        const session = sessionResult.rows[0];
        return res.json({
          sessionToken: session.session_token,
          timeRemaining: session.time_remaining,
          answers: session.answers,
          timeStarted: session.time_started,
        });
      }
    }
    
    // Create new session
    const newToken = randomBytes(32).toString('hex');
    const timeRemaining = 20 * 60; // 20 minutes in seconds
    
    await pool.query(
      `INSERT INTO test_sessions (test_id, session_token, answers, time_remaining, time_started)
       VALUES ($1, $2, $3, $4, NOW())`,
      [testId, newToken, JSON.stringify([]), timeRemaining]
    );
    
    res.json({
      sessionToken: newToken,
      timeRemaining,
      answers: [],
      timeStarted: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Save progress (answers + time remaining)
 */
router.post('/quick-iq-test/progress', async (req, res, next) => {
  try {
    const { sessionToken, answers, timeRemaining } = req.body;
    
    if (!sessionToken) {
      return res.status(400).json({ error: 'Session token required' });
    }
    
    await pool.query(
      `UPDATE test_sessions 
       SET answers = $1, time_remaining = $2, updated_at = NOW()
       WHERE session_token = $3`,
      [JSON.stringify(answers), timeRemaining, sessionToken]
    );
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

/**
 * Submit IQ test and calculate results
 */
router.post('/quick-iq-test/submit', async (req, res, next) => {
  try {
    const { sessionToken, answers, email, timeRemaining } = req.body;
    
    const testResult = await pool.query(
      `SELECT id FROM tests WHERE slug = 'quick-iq-test' AND enabled = true`
    );
    
    if (testResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quick IQ Test not found' });
    }
    
    const testId = testResult.rows[0].id;
    
    // Get all questions with their correct answers
    const questionsResult = await pool.query(
      `SELECT id, category, correct_answer_key, difficulty_weight, options
       FROM questions WHERE test_id = $1 ORDER BY order_index`,
      [testId]
    );
    
    const questions = questionsResult.rows;
    
    // Calculate scores with category breakdown
    const { totalScore, categoryScores, resultTier } = calculateIQScore(
      questions,
      answers
    );
    
    // Find or create user
    let userId = null;
    if (email) {
      let userResult = await pool.query(
        `SELECT id FROM users WHERE email = $1`,
        [email]
      );
      
      if (userResult.rows.length === 0) {
        const newUser = await pool.query(
          `INSERT INTO users (email) VALUES ($1) RETURNING id`,
          [email]
        );
        userId = newUser.rows[0].id;
      } else {
        userId = userResult.rows[0].id;
      }
    }
    
    // Find matching result tier
    const resultResult = await pool.query(
      `SELECT id FROM results 
       WHERE test_id = $1 AND min_score <= $2 AND max_score >= $2
       LIMIT 1`,
      [testId, totalScore]
    );
    
    const resultId = resultResult.rows[0]?.id || null;
    
    // Update session
    await pool.query(
      `UPDATE test_sessions 
       SET user_id = $1, email = $2, total_score = $3, 
           category_scores = $4, result_id = $5, 
           time_remaining = $6, time_completed = NOW()
       WHERE session_token = $7`,
      [
        userId,
        email || null,
        totalScore,
        JSON.stringify(categoryScores),
        resultId,
        timeRemaining || 0,
        sessionToken,
      ]
    );
    
    // Get result details
    let resultDetails = null;
    if (resultId) {
      const detailsResult = await pool.query(
        `SELECT * FROM results WHERE id = $1`,
        [resultId]
      );
      resultDetails = detailsResult.rows[0];
    }
    
    res.json({
      sessionToken,
      score: totalScore,
      categoryScores,
      resultTier,
      resultId,
      resultDetails,
      requiresPayment: true, // IQ test requires payment
    });
  } catch (error) {
    next(error);
  }
});

export default router;

