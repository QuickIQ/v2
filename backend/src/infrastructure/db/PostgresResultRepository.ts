import { Pool } from 'pg';
import { IResultRepository } from '../../domain/repositories/IResultRepository';
import { ResultTier } from '../../domain/entities/ResultTier';
import { Score } from '../../domain/value-objects/Score';

/**
 * Postgres Implementation of IResultRepository
 */
export class PostgresResultRepository implements IResultRepository {
  constructor(private readonly pool: Pool) {}

  async findByTestIdAndScore(testId: number, score: Score): Promise<ResultTier | null> {
    const result = await this.pool.query(
      `SELECT * FROM results 
       WHERE test_id = $1 AND $2 >= min_score AND $2 <= max_score 
       ORDER BY min_score DESC LIMIT 1`,
      [testId, score.getValue()]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToResultTier(result.rows[0]);
  }

  async findByTestId(testId: number): Promise<ResultTier[]> {
    const result = await this.pool.query(
      'SELECT * FROM results WHERE test_id = $1 ORDER BY min_score',
      [testId]
    );

    return result.rows.map(row => this.mapRowToResultTier(row));
  }

  async findById(id: number): Promise<ResultTier | null> {
    const result = await this.pool.query(
      'SELECT * FROM results WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToResultTier(result.rows[0]);
  }

  private mapRowToResultTier(row: any): ResultTier {
    return new ResultTier(
      row.id,
      row.test_id,
      new Score(row.min_score),
      new Score(row.max_score),
      row.tier || 'standard',
      row.result_text_key,
      row.image_ref || null
    );
  }
}

