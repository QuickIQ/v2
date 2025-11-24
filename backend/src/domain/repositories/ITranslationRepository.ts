import { Translation } from '../entities/Translation';
import { LanguageCode } from '../value-objects/LanguageCode';

/**
 * Translation Repository Interface
 * Defines how to access translation data
 */
export interface ITranslationRepository {
  findByKey(key: string, languageCode: LanguageCode): Promise<Translation | null>;
  findByKeys(keys: string[], languageCode: LanguageCode): Promise<Translation[]>;
}

