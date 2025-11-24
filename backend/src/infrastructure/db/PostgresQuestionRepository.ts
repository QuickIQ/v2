import { Pool } from 'pg';
import { IQuestionRepository } from '../../domain/repositories/IQuestionRepository';
import { Question } from '../../domain/entities/Question';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';

/**
 * Postgres Implementation of IQuestionRepository
 */
export class PostgresQuestionRepository implements IQuestionRepository {
  constructor(private readonly pool: Pool) {}

  async findByTestId(testId: number, languageCode: LanguageCode): Promise<Question[]> {
    const result = await this.pool.query(
      `SELECT q.*, 
        (SELECT value FROM translations WHERE key = q.text_key AND language_code = $1) as translated_text
       FROM questions q
       WHERE q.test_id = $2
       ORDER BY q.order_index`,
      [languageCode.toString(), testId]
    );

    return result.rows.map(row => this.mapRowToQuestion(row));
  }

  async findById(id: number, languageCode: LanguageCode): Promise<Question | null> {
    const result = await this.pool.query(
      `SELECT q.*, 
        (SELECT value FROM translations WHERE key = q.text_key AND language_code = $1) as translated_text
       FROM questions q
       WHERE q.id = $2`,
      [languageCode.toString(), id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToQuestion(result.rows[0]);
  }

  private mapRowToQuestion(row: any): Question {
    return new Question(
      row.id,
      row.test_id,
      row.order_index,
      row.text_key,
      row.options || [],
      row.category || null,
      row.question_type || null,
      row.image_data || null,
      row.correct_answer_key || null,
      parseFloat(row.difficulty_weight?.toString() || '1.0'),
      row.scoring_rule || null
    );
  }
}

