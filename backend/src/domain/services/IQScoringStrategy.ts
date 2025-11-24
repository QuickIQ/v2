import { IScoringStrategy, ScoringResult } from './IScoringStrategy';
import { Question } from '../entities/Question';
import { Answer } from '../entities/TestSession';
import { Score } from '../value-objects/Score';

/**
 * IQ Scoring Strategy
 * Calculates IQ score (70-145+ range) from raw score
 */
export class IQScoringStrategy implements IScoringStrategy {
  calculateScore(questions: Question[], answers: Answer[]): ScoringResult {
    const questionMap = new Map(questions.map(q => [q.id, q]));
    let totalRawScore = 0;
    const categoryScores: { logical: number; verbal: number; spatial: number } = {
      logical: 0,
      verbal: 0,
      spatial: 0,
    };

    for (const answer of answers) {
      const question = questionMap.get(answer.question_id);
      if (!question) continue;

      const isCorrect = question.correctAnswerKey === answer.option_key;
      const points = isCorrect ? 5 : 0; // 5 points per correct answer

      totalRawScore += points;

      // Add to category score
      const category = question.category?.toLowerCase() || 'logical';
      if (category === 'logical' || category === 'numerical') {
        categoryScores.logical += points;
      } else if (category === 'verbal') {
        categoryScores.verbal += points;
      } else if (category === 'spatial' || category === 'matrix') {
        categoryScores.spatial += points;
      }
    }

    // Calculate IQ score (70-145+ range)
    // Max possible: questions.length * 5 points
    const maxPossible = questions.length * 5;
    const normalizedScore = (totalRawScore / maxPossible) * 100;
    let iqScore = Math.round(70 + (normalizedScore / 100) * 75);

    // Cap at 150
    if (iqScore > 150) {
      iqScore = 150;
    }

    // Determine tier
    let resultTier: 'exceptional' | 'above_average' | 'developing';
    if (iqScore >= 130) {
      resultTier = 'exceptional';
    } else if (iqScore >= 110) {
      resultTier = 'above_average';
    } else {
      resultTier = 'developing';
    }

    return {
      rawScore: new Score(totalRawScore),
      iqScore: new Score(iqScore),
      categoryScores,
      resultTier: null, // Will be matched by ResultTier
      resultData: {
        tier: resultTier,
        categoryScores,
      },
    };
  }
}

