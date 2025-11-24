import { Question } from '../entities/Question';
import { LanguageCode } from '../value-objects/LanguageCode';

/**
 * Question Repository Interface
 * Defines how to access question data
 */
export interface IQuestionRepository {
  findByTestId(testId: number, languageCode: LanguageCode): Promise<Question[]>;
  findById(id: number, languageCode: LanguageCode): Promise<Question | null>;
}

