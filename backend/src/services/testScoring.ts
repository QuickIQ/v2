import { pool } from '../db/connection';

interface Answer {
  question_id: number;
  option_key: string;
}

/**
 * Calculate IQ score with category breakdown
 */
export function calculateIQScore(
  questions: Array<{
    id: number;
    category: string;
    correct_answer_key: string;
    difficulty_weight: number;
    options: Array<{ key: string; points: number; isCorrect?: boolean }>;
  }>,
  answers: Array<{ question_id: number; option_key: string }>
): {
  totalScore: number;
  categoryScores: { logical: number; verbal: number; spatial: number };
  resultTier: 'exceptional' | 'above_average' | 'developing';
} {
  const categoryScores: { logical: number; verbal: number; spatial: number } = {
    logical: 0,
    verbal: 0,
    spatial: 0,
  };

  const questionMap = new Map(questions.map((q) => [q.id, q]));
  let totalRawScore = 0;
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const answer of answers) {
    const question = questionMap.get(answer.question_id);
    if (!question) continue;

    const isCorrect = question.correct_answer_key === answer.option_key;
    const weight = parseFloat(question.difficulty_weight?.toString() || '1.0');
    const points = isCorrect ? 5 : 0; // 5 points per correct answer

    totalRawScore += points;
    totalWeightedScore += points * weight;
    totalWeight += weight;

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
  // Max possible: 25 questions * 5 points = 125 points
  // Convert to IQ scale: 70 + (score/max * 75)
  const maxPossible = questions.length * 5;
  const normalizedScore = (totalRawScore / maxPossible) * 100;
  const iqScore = Math.round(70 + (normalizedScore / 100) * 75);

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
    totalScore: iqScore,
    categoryScores,
    resultTier,
  };
}

export async function calculateTestResult(
  testId: number,
  testType: string,
  answers: Answer[]
) {
  // Get all questions with their scoring
  const questionsResult = await pool.query(
    'SELECT id, options, scoring_rule FROM questions WHERE test_id = $1',
    [testId]
  );

  let totalScore = 0;
  const questionMap = new Map(
    questionsResult.rows.map((q: any) => [q.id, q])
  );

  // Calculate base score from answers
  for (const answer of answers) {
    const question = questionMap.get(answer.question_id);
    if (!question) continue;

    const options = question.options;
    const selectedOption = options.find(
      (opt: any) => opt.key === answer.option_key
    );
    if (selectedOption) {
      totalScore += selectedOption.points || 0;
    }
  }

  // Apply special scoring logic
  if (testType === 'iq') {
    totalScore = calculateIQScoreSimple(totalScore, questionsResult.rows.length);
  } else if (testType === 'personality') {
    const personalityType = calculatePersonalityType(answers, questionMap);
    return {
      totalScore: 0, // Personality tests don't use numeric scores
      resultId: null,
      resultData: {
        type: personalityType,
        testType: 'personality',
      },
    };
  }

  // Find matching result
  const resultQuery = await pool.query(
    'SELECT * FROM results WHERE test_id = $1 AND $2 >= min_score AND $2 <= max_score ORDER BY min_score DESC LIMIT 1',
    [testId, totalScore]
  );

  if (resultQuery.rows.length === 0) {
    throw new Error('No result found for this score');
  }

  const result = resultQuery.rows[0];

  return {
    totalScore,
    resultId: result.id,
    resultData: {
      ...result,
      score: totalScore,
      testType,
    },
  };
}

function calculateIQScoreSimple(baseScore: number, totalQuestions: number): number {
  // IQ Score calculation: Map raw score to IQ range (70-145+)
  // Assuming each question can contribute up to 5 points (best answer)
  const maxPossibleScore = totalQuestions * 5;
  const percentage = (baseScore / maxPossibleScore) * 100;

  // Map percentage to IQ scale (70-145+)
  // Linear mapping: 0% = 70, 100% = 145+
  let iqScore = 70 + (percentage / 100) * 75;

  // Cap at 145+ (let's say 150 is the practical max for display)
  if (iqScore > 150) {
    iqScore = 150;
  }

  return Math.round(iqScore);
}

function calculatePersonalityType(
  answers: Answer[],
  questionMap: Map<number, any>
): string {
  // MBTI-style 16 type calculation
  // Based on 4 dimensions: E/I, S/N, T/F, J/P
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
    if (!question || !question.scoring_rule) continue;

    const rule = question.scoring_rule;
    const option = question.options.find(
      (opt: any) => opt.key === answer.option_key
    );

    if (option && rule[option.key]) {
      const dimension = rule[option.key];
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

  return `${type1}${type2}${type3}${type4}`;
}

