/**
 * Universal Scoring System for All Tests
 * 
 * This system handles scoring for all tests with:
 * - 20 questions
 * - 7 answer choices: ["Never", "Rarely", "Sometimes", "Neutral", "Often", "Usually", "Always"]
 * - Reverse scoring support
 * 
 * Scoring Rules:
 * - Normal: Never=1, Rarely=2, Sometimes=3, Neutral=4, Often=5, Usually=6, Always=7
 * - Reverse: Never=7, Rarely=6, Sometimes=5, Neutral=4, Often=3, Usually=2, Always=1
 * 
 * Result Tiers:
 * - 0-70: "developing"
 * - 71-110: "good"
 * - 111-140: "excellent"
 */

export type AnswerIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ReverseFlag = 0 | 1;
export type ResultTier = 'developing' | 'good' | 'excellent';

export interface UniversalScoringInput {
  /**
   * Array of 20 selected answer indices (1-7)
   * Index 1 = "Never", Index 7 = "Always"
   */
  answers: AnswerIndex[];
  
  /**
   * Array of 20 reverse flags (0 or 1)
   * 0 = Normal scoring, 1 = Reverse scoring
   */
  reverse: ReverseFlag[];
}

export interface UniversalScoringOutput {
  /**
   * Total score (20-140)
   */
  totalScore: number;
  
  /**
   * Result tier based on score range
   */
  resultTier: ResultTier;
  
  /**
   * Individual question scores (for debugging/analysis)
   */
  questionScores: number[];
}

/**
 * Answer choice labels (for reference)
 */
export const ANSWER_CHOICES = [
  'Never',      // Index 1 → Score 1 (normal) or 7 (reverse)
  'Rarely',     // Index 2 → Score 2 (normal) or 6 (reverse)
  'Sometimes',  // Index 3 → Score 3 (normal) or 5 (reverse)
  'Neutral',    // Index 4 → Score 4 (both)
  'Often',      // Index 5 → Score 5 (normal) or 3 (reverse)
  'Usually',    // Index 6 → Score 6 (normal) or 2 (reverse)
  'Always',     // Index 7 → Score 7 (normal) or 1 (reverse)
] as const;

/**
 * Calculate score for a single question
 * 
 * @param answerIndex - Selected answer index (1-7)
 * @param reverse - Reverse flag (0 or 1)
 * @returns Score for this question (1-7)
 */
function calculateQuestionScore(
  answerIndex: AnswerIndex,
  reverse: ReverseFlag
): number {
  // Validate answer index
  if (answerIndex < 1 || answerIndex > 7) {
    throw new Error(`Invalid answer index: ${answerIndex}. Must be between 1 and 7.`);
  }

  // Normal scoring: answerIndex directly maps to score
  // Never (1) = 1, Rarely (2) = 2, ..., Always (7) = 7
  if (reverse === 0) {
    return answerIndex;
  }

  // Reverse scoring: invert the score
  // Never (1) = 7, Rarely (2) = 6, ..., Always (7) = 1
  // Formula: 8 - answerIndex
  return 8 - answerIndex;
}

/**
 * Determine result tier based on total score
 * 
 * @param totalScore - Total score (20-140)
 * @returns Result tier
 */
function determineResultTier(totalScore: number): ResultTier {
  if (totalScore >= 111 && totalScore <= 140) {
    return 'excellent';
  }
  
  if (totalScore >= 71 && totalScore <= 110) {
    return 'good';
  }
  
  if (totalScore >= 0 && totalScore <= 70) {
    return 'developing';
  }
  
  // Fallback for edge cases (shouldn't happen with valid input)
  if (totalScore < 0) {
    return 'developing';
  }
  
  return 'excellent';
}

/**
 * Universal scoring function for all tests
 * 
 * @param input - Scoring input with answers and reverse flags
 * @returns Scoring output with total score, tier, and individual scores
 * 
 * @example
 * ```typescript
 * const result = calculateUniversalScore({
 *   answers: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6],
 *   reverse: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
 * });
 * // Returns: { totalScore: 80, resultTier: 'good', questionScores: [...] }
 * ```
 * 
 * Score Ranges:
 * - 0-70: "developing"
 * - 71-110: "good"
 * - 111-140: "excellent"
 */
export function calculateUniversalScore(
  input: UniversalScoringInput
): UniversalScoringOutput {
  const { answers, reverse } = input;

  // Validate input arrays have exactly 20 items
  if (answers.length !== 20) {
    throw new Error(
      `Invalid answers array length: ${answers.length}. Expected exactly 20 answers.`
    );
  }

  if (reverse.length !== 20) {
    throw new Error(
      `Invalid reverse array length: ${reverse.length}. Expected exactly 20 reverse flags.`
    );
  }

  // Calculate individual question scores
  const questionScores: number[] = [];
  let totalScore = 0;

  for (let i = 0; i < 20; i++) {
    const answerIndex = answers[i];
    const reverseFlag = reverse[i];

    // Validate answer index
    if (answerIndex < 1 || answerIndex > 7) {
      throw new Error(
        `Invalid answer index at position ${i}: ${answerIndex}. Must be between 1 and 7.`
      );
    }

    // Validate reverse flag
    if (reverseFlag !== 0 && reverseFlag !== 1) {
      throw new Error(
        `Invalid reverse flag at position ${i}: ${reverseFlag}. Must be 0 or 1.`
      );
    }

    // Calculate score for this question
    const questionScore = calculateQuestionScore(answerIndex, reverseFlag);
    questionScores.push(questionScore);
    totalScore += questionScore;
  }

  // Validate total score is within expected range
  if (totalScore < 20 || totalScore > 140) {
    throw new Error(
      `Invalid total score: ${totalScore}. Expected range: 20-140.`
    );
  }

  // Determine result tier
  const resultTier = determineResultTier(totalScore);

  return {
    totalScore,
    resultTier,
    questionScores,
  };
}

/**
 * Helper function to convert answer choice string to index
 * 
 * @param answerChoice - Answer choice string
 * @returns Answer index (1-7) or null if invalid
 */
export function answerChoiceToIndex(
  answerChoice: string
): AnswerIndex | null {
  const normalized = answerChoice.trim().toLowerCase();
  const index = ANSWER_CHOICES.findIndex(
    (choice) => choice.toLowerCase() === normalized
  );
  
  if (index === -1) {
    return null;
  }
  
  // Convert 0-based index to 1-based index
  return (index + 1) as AnswerIndex;
}

/**
 * Helper function to convert answer index to choice string
 * 
 * @param answerIndex - Answer index (1-7)
 * @returns Answer choice string or null if invalid
 */
export function answerIndexToChoice(
  answerIndex: AnswerIndex
): string | null {
  if (answerIndex < 1 || answerIndex > 7) {
    return null;
  }
  
  // Convert 1-based index to 0-based index
  return ANSWER_CHOICES[answerIndex - 1] || null;
}

