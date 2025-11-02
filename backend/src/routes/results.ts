import express from 'express';
import { pool } from '../db/connection';

const router = express.Router();

// Get result by ID with translations
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const language = (req.query.lang as string) || 'en';

    const result = await pool.query(
      `SELECT r.*, 
        (SELECT value FROM translations WHERE key = r.result_text_key AND language_code = $1) as translated_text
       FROM results r
       WHERE r.id = $2`,
      [language, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;

