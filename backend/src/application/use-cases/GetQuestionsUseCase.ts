import { IQuestionRepository } from '../../domain/repositories/IQuestionRepository';
import { ITranslationRepository } from '../../domain/repositories/ITranslationRepository';
import { ITestRepository } from '../../domain/repositories/ITestRepository';
import { TestSlug } from '../../domain/value-objects/TestSlug';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';
import { QuestionResponseDTO } from '../dto/TestDTO';

/**
 * Get Questions Use Case
 * Returns questions for a test with translations
 */
export class GetQuestionsUseCase {
  constructor(
    private readonly testRepository: ITestRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly translationRepository: ITranslationRepository
  ) {}

  async execute(slug: string, languageCode: string): Promise<QuestionResponseDTO[]> {
    const testSlug = new TestSlug(slug);
    const langCode = new LanguageCode(languageCode);

    // Verify test exists
    const test = await this.testRepository.findBySlug(testSlug, langCode);
    if (!test) {
      throw new Error('Test not found');
    }

    // Get questions
    const questions = await this.questionRepository.findByTestId(test.id, langCode);

    // Translate questions and options
    const translatedQuestions = await Promise.all(
      questions.map(async (question) => {
        // Translate question text
        const questionTranslation = await this.translationRepository.findByKey(
          question.textKey,
          langCode
        );

        // Translate options
        const optionKeys = question.options.map(opt => opt.key);
        const optionTranslations = await this.translationRepository.findByKeys(
          optionKeys,
          langCode
        );
        const translationMap = new Map(
          optionTranslations.map(t => [t.key, t.value])
        );

        const translatedOptions = question.options.map(opt => ({
          key: opt.key,
          text: translationMap.get(opt.key) || opt.key,
          points: opt.points,
          isCorrect: opt.isCorrect,
        }));

        return {
          id: question.id,
          testId: question.testId,
          order: question.order,
          text: questionTranslation?.value || question.textKey,
          textKey: question.textKey,
          options: translatedOptions,
          category: question.category,
          questionType: question.questionType,
          imageData: question.imageData,
          correctAnswerKey: question.correctAnswerKey,
          difficultyWeight: question.difficultyWeight,
          scoringRule: question.scoringRule,
        };
      })
    );

    return translatedQuestions;
  }
}

