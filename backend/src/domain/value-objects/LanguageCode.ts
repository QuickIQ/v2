/**
 * Language Code Value Object
 * Represents a valid language code (ISO 639-1)
 */
export class LanguageCode {
  private readonly value: string;

  private static readonly VALID_CODES = new Set([
    'en', 'tr', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar'
  ]);

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Language code cannot be empty');
    }
    const normalized = value.trim().toLowerCase();
    if (!LanguageCode.VALID_CODES.has(normalized)) {
      throw new Error(`Invalid language code: ${value}. Must be one of: ${Array.from(LanguageCode.VALID_CODES).join(', ')}`);
    }
    this.value = normalized;
  }

  toString(): string {
    return this.value;
  }

  equals(other: LanguageCode): boolean {
    return this.value === other.value;
  }
}

