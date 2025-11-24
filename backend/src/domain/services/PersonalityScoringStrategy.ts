import { IScoringStrategy, ScoringResult } from './IScoringStrategy';
import { Question } from '../entities/Question';
import { Answer } from '../entities/TestSession';
import { Score } from '../value-objects/Score';

/**
 * Personality Scoring Strategy (MBTI-style)
 * Calculates personality type from dimension scores
 */
export class PersonalityScoringStrategy implements IScoringStrategy {
  calculateScore(questions: Question[], answers: Answer[]): ScoringResult {
    const questionMap = new Map(questions.map(q => [q.id, q]));
    const dimensions = {
      E: 0, // Extraversion
      I: 0, // Introversion
      S: 0, // Sensing
      N: 0, // Intuition
      T: 0, // Thinking
      F: 0, // Feeling
      J: 0, // Judging
      P: 0, // Perceiving
    };

    for (const answer of answers) {
      const question = questionMap.get(answer.question_id);
      if (!question || !question.scoringRule) continue;

      const option = question.getOptionByKey(answer.option_key);
      if (option && question.scoringRule[option.key]) {
        const dimension = question.scoringRule[option.key];
        if (dimension && dimensions.hasOwnProperty(dimension)) {
          (dimensions as any)[dimension]++;
        }
      }
    }

    // Determine type
    const type1 = dimensions.E > dimensions.I ? 'E' : 'I';
    const type2 = dimensions.S > dimensions.N ? 'S' : 'N';
    const type3 = dimensions.T > dimensions.F ? 'T' : 'F';
    const type4 = dimensions.J > dimensions.P ? 'J' : 'P';

    const personalityType = `${type1}${type2}${type3}${type4}`;

    return {
      rawScore: new Score(0), // Personality tests don't use numeric scores
      resultTier: null,
      resultData: {
        type: personalityType,
        testType: 'personality',
        dimensions,
      },
    };
  }
}

