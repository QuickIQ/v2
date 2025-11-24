import { Pool } from 'pg';
import { ITranslationRepository } from '../../domain/repositories/ITranslationRepository';
import { Translation } from '../../domain/entities/Translation';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';

/**
 * Postgres Implementation of ITranslationRepository
 */
export class PostgresTranslationRepository implements ITranslationRepository {
  constructor(private readonly pool: Pool) {}

  async findByKey(key: string, languageCode: LanguageCode): Promise<Translation | null> {
    const result = await this.pool.query(
      'SELECT * FROM translations WHERE key = $1 AND language_code = $2',
      [key, languageCode.toString()]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTranslation(result.rows[0]);
  }

  async findByKeys(keys: string[], languageCode: LanguageCode): Promise<Translation[]> {
    if (keys.length === 0) {
      return [];
    }

    const result = await this.pool.query(
      `SELECT * FROM translations 
       WHERE key = ANY($1) AND language_code = $2`,
      [keys, languageCode.toString()]
    );

    return result.rows.map(row => this.mapRowToTranslation(row));
  }

  private mapRowToTranslation(row: any): Translation {
    return new Translation(
      row.key,
      new LanguageCode(row.language_code),
      row.value
    );
  }
}

