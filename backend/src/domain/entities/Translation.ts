import { LanguageCode } from '../value-objects/LanguageCode';

/**
 * Translation Entity
 * Represents a translation for a key in a specific language
 */
export class Translation {
  constructor(
    public readonly key: string,
    public readonly languageCode: LanguageCode,
    public readonly value: string
  ) {}
}

