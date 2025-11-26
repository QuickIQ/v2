import { Pool } from 'pg';
import { ITestRepository } from '../../domain/repositories/ITestRepository';
import { Test } from '../../domain/entities/Test';
import { TestSlug } from '../../domain/value-objects/TestSlug';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';

/**
 * Postgres Implementation of ITestRepository
 */
export class PostgresTestRepository implements ITestRepository {
  constructor(private readonly pool: Pool) {}

  async findAll(languageCode: LanguageCode): Promise<Test[]> {
    try {
      const result = await this.pool.query(
        `SELECT t.*, 
          (SELECT value FROM translations WHERE key = t.name AND language_code = $1) as translated_name
         FROM tests t 
         WHERE enabled = true 
         ORDER BY t.order_index, t.id`,
        [languageCode.toString()]
      );

      return result.rows.map(row => this.mapRowToTest(row));
    } catch (error: any) {
      // Re-throw with more context for controller to handle
      throw new Error(`Failed to fetch tests: ${error.message}`);
    }
  }

  async findBySlug(slug: TestSlug, languageCode: LanguageCode): Promise<Test | null> {
    const result = await this.pool.query(
      `SELECT t.*, 
        (SELECT value FROM translations WHERE key = t.name AND language_code = $1) as translated_name
       FROM tests t 
       WHERE slug = $2 AND enabled = true`,
      [languageCode.toString(), slug.toString()]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTest(result.rows[0]);
  }

  async findById(id: number, languageCode: LanguageCode): Promise<Test | null> {
    const result = await this.pool.query(
      `SELECT t.*, 
        (SELECT value FROM translations WHERE key = t.name AND language_code = $1) as translated_name
       FROM tests t 
       WHERE id = $2 AND enabled = true`,
      [languageCode.toString(), id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTest(result.rows[0]);
  }

  private mapRowToTest(row: any): Test {
    return Test.create(
      row.id,
      row.slug,
      row.translated_name || row.name,
      row.category,
      row.test_type || 'standard',
      row.is_premium || false,
      row.price_cents || 0,
      row.default_language || 'en',
      row.enabled !== false,
      row.order_index || 0
    );
  }
}

