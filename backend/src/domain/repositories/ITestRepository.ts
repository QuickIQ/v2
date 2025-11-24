import { Test } from '../entities/Test';
import { TestSlug } from '../value-objects/TestSlug';
import { LanguageCode } from '../value-objects/LanguageCode';

/**
 * Test Repository Interface
 * Defines how to access test data
 */
export interface ITestRepository {
  findAll(languageCode: LanguageCode): Promise<Test[]>;
  findBySlug(slug: TestSlug, languageCode: LanguageCode): Promise<Test | null>;
  findById(id: number, languageCode: LanguageCode): Promise<Test | null>;
}

