import express from 'express';
import { pool } from '../db/connection';

const router = express.Router();

// Get questions for a test
router.get('/test/:testId', async (req, res, next) => {
  try {
    const { testId } = req.params;
    const language = (req.query.lang as string) || 'en';

    const result = await pool.query(
      `SELECT q.*, 
        (SELECT value FROM translations WHERE key = q.text_key AND language_code = $1) as translated_text
       FROM questions q
       WHERE q.test_id = $2
       ORDER BY q.order_index`,
      [language, testId]
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

export default router;

