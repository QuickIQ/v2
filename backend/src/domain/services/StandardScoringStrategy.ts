import { IScoringStrategy, ScoringResult } from './IScoringStrategy';
import { Question } from '../entities/Question';
import { Answer } from '../entities/TestSession';
import { Score } from '../value-objects/Score';

/**
 * Standard Scoring Strategy
 * Sums points from selected options
 */
export class StandardScoringStrategy implements IScoringStrategy {
  calculateScore(questions: Question[], answers: Answer[]): ScoringResult {
    const questionMap = new Map(questions.map(q => [q.id, q]));
    let totalScore = 0;

    for (const answer of answers) {
      const question = questionMap.get(answer.question_id);
      if (!question) continue;

      const option = question.getOptionByKey(answer.option_key);
      if (option) {
        totalScore += option.points || 0;
      }
    }

    return {
      rawScore: new Score(totalScore),
      resultTier: null, // Will be determined by ResultTier matching
    };
  }
}

