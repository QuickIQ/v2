/**
 * Test file for Universal Scoring System
 * 
 * This file demonstrates usage and validates the scoring function
 */

import {
  calculateUniversalScore,
  answerChoiceToIndex,
  answerIndexToChoice,
  type UniversalScoringInput,
} from './universalScoring';

/**
 * Example usage and test cases
 */

// Test Case 1: All "Never" answers (minimum score)
const testCase1: UniversalScoringInput = {
  answers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  reverse: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
// Expected: totalScore = 20, resultTier = 'developing'

// Test Case 2: All "Always" answers (maximum score)
const testCase2: UniversalScoringInput = {
  answers: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  reverse: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
// Expected: totalScore = 140, resultTier = 'excellent'

// Test Case 3: Mixed answers with some reverse scoring
const testCase3: UniversalScoringInput = {
  answers: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  reverse: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
// Expected: totalScore = 80, resultTier = 'good' (71-110 range)

// Test Case 4: Reverse scoring example
const testCase4: UniversalScoringInput = {
  answers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  reverse: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
};
// Expected: totalScore = 140 (Never with reverse = 7), resultTier = 'excellent'

// Test Case 5: Real-world example - mixed answers
const testCase5: UniversalScoringInput = {
  answers: [3, 4, 5, 2, 6, 4, 5, 3, 4, 5, 6, 4, 3, 5, 4, 6, 5, 4, 3, 5],
  reverse: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
};
// Expected: Score calculation with mixed normal and reverse scoring

/**
 * Usage example in a React component
 */
export function exampleUsage() {
  // Example: User has completed a test with 20 questions
  const userAnswers: UniversalScoringInput = {
    answers: [5, 6, 4, 3, 7, 5, 4, 6, 5, 4, 5, 6, 4, 5, 6, 5, 4, 5, 6, 5],
    reverse: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  };

  // Calculate score
  const result = calculateUniversalScore(userAnswers);

  // Result will be:
  // {
  //   totalScore: 95,
  //   resultTier: 'good',
  //   questionScores: [5, 6, 3, 3, 7, 5, 3, 6, 5, 4, 5, 6, 3, 5, 6, 5, 4, 5, 6, 5]
  // }

  // Redirect based on tier
  if (result.resultTier === 'excellent') {
    // Redirect to excellent result screen
    console.log('Redirecting to excellent result screen');
  } else if (result.resultTier === 'good') {
    // Redirect to good result screen
    console.log('Redirecting to good result screen');
  } else {
    // Redirect to developing result screen
    console.log('Redirecting to developing result screen');
  }

  return result;
}

/**
 * Helper function to convert answer strings to indices
 */
export function convertAnswersFromStrings(
  answerStrings: string[],
  reverseFlags: (0 | 1)[]
): UniversalScoringInput | null {
  if (answerStrings.length !== 20 || reverseFlags.length !== 20) {
    return null;
  }

  const answers: (1 | 2 | 3 | 4 | 5 | 6 | 7)[] = [];

  for (const answerString of answerStrings) {
    const index = answerChoiceToIndex(answerString);
    if (index === null) {
      return null; // Invalid answer string
    }
    answers.push(index);
  }

  return {
    answers: answers as UniversalScoringInput['answers'],
    reverse: reverseFlags as UniversalScoringInput['reverse'],
  };
}

