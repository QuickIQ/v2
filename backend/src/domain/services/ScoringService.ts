import { IScoringStrategy } from './IScoringStrategy';
import { StandardScoringStrategy } from './StandardScoringStrategy';
import { IQScoringStrategy } from './IQScoringStrategy';
import { PersonalityScoringStrategy } from './PersonalityScoringStrategy';
import { Test, TestType } from '../entities/Test';
import { Question } from '../entities/Question';
import { Answer } from '../entities/TestSession';
import { IResultRepository } from '../repositories/IResultRepository';
import { ScoringResult } from './IScoringStrategy';

/**
 * Scoring Service
 * Orchestrates scoring strategies and matches results to tiers
 */
export class ScoringService {
  private strategies: Map<TestType, IScoringStrategy>;

  constructor(private readonly resultRepository: IResultRepository) {
    this.strategies = new Map([
      ['standard', new StandardScoringStrategy()],
      ['iq', new IQScoringStrategy()],
      ['personality', new PersonalityScoringStrategy()],
      ['custom', new StandardScoringStrategy()], // Custom uses standard by default
    ]);
  }

  async calculateResult(
    test: Test,
    questions: Question[],
    answers: Answer[]
  ): Promise<ScoringResult & { resultTierId: number | null }> {
    const strategy = this.strategies.get(test.testType);
    if (!strategy) {
      throw new Error(`No scoring strategy found for test type: ${test.testType}`);
    }

    const scoringResult = strategy.calculateScore(questions, answers);

    // Match result tier if not already determined
    if (!scoringResult.resultTier && scoringResult.rawScore) {
      const matchedTier = await this.resultRepository.findByTestIdAndScore(
        test.id,
        scoringResult.rawScore
      );
      scoringResult.resultTier = matchedTier || null;
    }

    return {
      ...scoringResult,
      resultTierId: scoringResult.resultTier?.id || null,
    };
  }
}

