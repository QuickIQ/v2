import { ITestRepository } from '../../domain/repositories/ITestRepository';
import { IQuestionRepository } from '../../domain/repositories/IQuestionRepository';
import { ITestSessionRepository } from '../../domain/repositories/ITestSessionRepository';
import { ScoringService } from '../../domain/services/ScoringService';
import { TestSlug } from '../../domain/value-objects/TestSlug';
import { LanguageCode } from '../../domain/value-objects/LanguageCode';
import { Score } from '../../domain/value-objects/Score';
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
    let scoringResult;
    try {
      scoringResult = await this.scoringService.calculateResult(
        test,
        questions,
        domainAnswers
      );
    } catch (error: any) {
      // If scoring fails (e.g., database not connected), use fallback
      console.warn('Scoring service failed, using fallback:', error.message);
      const fallbackScoreValue = domainAnswers.reduce((sum, answer) => {
        const question = questions.find(q => q.id === answer.question_id);
        if (!question) return sum;
        const option = question.getOptionByKey(answer.option_key);
        return sum + (option?.points || 0);
      }, 0);
      
      // Determine tier from score (fallback logic)
      let fallbackTier: 'excellent' | 'good' | 'under_development' = 'good';
      const maxPossibleScore = questions.length * 7; // Assuming max 7 points per question
      const percentage = maxPossibleScore > 0 ? (fallbackScoreValue / maxPossibleScore) * 100 : 50;
      if (percentage >= 80) {
        fallbackTier = 'excellent';
      } else if (percentage >= 50) {
        fallbackTier = 'good';
      } else {
        fallbackTier = 'under_development';
      }
      
      scoringResult = {
        rawScore: new Score(fallbackScoreValue),
        iqScore: undefined,
        categoryScores: undefined,
        resultTier: null,
        resultData: { tier: fallbackTier },
        resultTierId: null,
      };
    }

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

    // Build response - handle case where resultTier is null
    const tier = scoringResult.resultTier?.tier || scoringResult.resultData?.tier || 'good';
    const resultData: any = {
      id: scoringResult.resultTier?.id || 0,
      testId: test.id,
      minScore: scoringResult.resultTier?.minScore?.getValue() || 0,
      maxScore: scoringResult.resultTier?.maxScore?.getValue() || 0,
      tier: tier,
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

