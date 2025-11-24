import { ITestRepository } from '../../domain/repositories/ITestRepository';
import { IQuestionRepository } from '../../domain/repositories/IQuestionRepository';
import { ITestSessionRepository } from '../../domain/repositories/ITestSessionRepository';
import { ScoringService } from '../../domain/services/ScoringService';
import { TestSlug } from '../../domain/value-objects/TestSlug';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';
import { Answer } from '../../domain/entities/TestSession';
import { SubmitAnswersRequestDTO, SubmitAnswersResponseDTO } from '../dto/TestDTO';

/**
 * Submit Answers Use Case
 * Processes test answers, calculates score, and creates session
 */
export class SubmitAnswersUseCase {
  constructor(
    private readonly testRepository: ITestRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly testSessionRepository: ITestSessionRepository,
    private readonly scoringService: ScoringService
  ) {}

  async execute(
    slug: string,
    request: SubmitAnswersRequestDTO,
    languageCode: string = 'en'
  ): Promise<SubmitAnswersResponseDTO> {
    const testSlug = new TestSlug(slug);
    const langCode = new LanguageCode(languageCode);

    // Get test
    const test = await this.testRepository.findBySlug(testSlug, langCode);
    if (!test) {
      throw new Error('Test not found');
    }

    // Get questions
    const questions = await this.questionRepository.findByTestId(test.id, langCode);

    // Convert answers to domain format
    const domainAnswers: Answer[] = request.answers.map(a => ({
      question_id: a.question_id,
      option_key: a.option_key,
    }));

    // Calculate score
    const scoringResult = await this.scoringService.calculateResult(
      test,
      questions,
      domainAnswers
    );

    // Determine payment status
    const paymentStatus = test.requiresPayment() ? 'pending' : 'not_required';

    // Create session
    const session = await this.testSessionRepository.create(
      test.id,
      request.email || null,
      domainAnswers,
      scoringResult.rawScore,
      scoringResult.iqScore || null,
      scoringResult.resultTierId,
      paymentStatus,
      null, // userId
      null, // sessionToken
      scoringResult.categoryScores || null
    );

    // Build response
    const resultData: any = {
      id: scoringResult.resultTier?.id || 0,
      testId: test.id,
      minScore: scoringResult.resultTier?.minScore.getValue() || 0,
      maxScore: scoringResult.resultTier?.maxScore.getValue() || 0,
      tier: scoringResult.resultTier?.tier || '',
      resultTextKey: scoringResult.resultTier?.resultTextKey || '',
      imageRef: scoringResult.resultTier?.imageRef || null,
      score: scoringResult.rawScore.getValue(),
      testType: test.testType,
      ...scoringResult.resultData,
    };

    return {
      sessionId: session.id,
      score: scoringResult.rawScore.getValue(),
      iqScore: scoringResult.iqScore?.getValue(),
      categoryScores: scoringResult.categoryScores,
      resultId: scoringResult.resultTierId,
      result: resultData,
      requiresPayment: test.requiresPayment(),
    };
  }
}

