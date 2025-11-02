import express from 'express';
import { pool } from '../db/connection';

const router = express.Router();

// Get all translations for a language
router.get('/:language', async (req, res, next) => {
  try {
    const { language } = req.params;
    const result = await pool.query(
      'SELECT key, value FROM translations WHERE language_code = $1',
      [language]
    );

    const translations: Record<string, string> = {};
    result.rows.forEach((row) => {
      translations[row.key] = row.value;
    });

    res.json(translations);
  } catch (error) {
    next(error);
  }
});

export default router;

