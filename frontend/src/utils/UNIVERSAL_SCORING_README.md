# Universal Scoring System

A reusable scoring system for all tests in the project.

## Overview

This system handles scoring for tests with:
- **20 questions** per test
- **7 answer choices**: Never, Rarely, Sometimes, Neutral, Often, Usually, Always
- **Reverse scoring support** for reverse-keyed questions

## Scoring Rules

### Normal Scoring (reverse = 0)
- Never = 1 point
- Rarely = 2 points
- Sometimes = 3 points
- Neutral = 4 points
- Often = 5 points
- Usually = 6 points
- Always = 7 points

### Reverse Scoring (reverse = 1)
- Never = 7 points
- Rarely = 6 points
- Sometimes = 5 points
- Neutral = 4 points
- Often = 3 points
- Usually = 2 points
- Always = 1 point

## Score Ranges

- **Minimum Score**: 20 points (all "Never" answers with normal scoring)
- **Maximum Score**: 140 points (all "Always" answers with normal scoring)

## Result Tiers

After calculating the total score:

| Score Range | Result Tier | Redirect To |
|------------|-------------|-------------|
| 0-70 | `developing` | Developing Result Screen |
| 71-110 | `good` | Good Result Screen |
| 111-140 | `excellent` | Excellent Result Screen |

## Usage

### Basic Example

```typescript
import { calculateUniversalScore } from './utils/universalScoring';

// User's answers (20 questions, each answer is 1-7)
const answers = [5, 6, 4, 3, 7, 5, 4, 6, 5, 4, 5, 6, 4, 5, 6, 5, 4, 5, 6, 5];

// Reverse flags (20 questions, each is 0 or 1)
const reverse = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];

// Calculate score
const result = calculateUniversalScore({ answers, reverse });

console.log(result.totalScore);    // e.g., 95
console.log(result.resultTier);     // e.g., 'good'
console.log(result.questionScores); // Array of 20 individual scores

// Redirect based on tier
if (result.resultTier === 'excellent') {
  // Navigate to excellent result screen
} else if (result.resultTier === 'good') {
  // Navigate to good result screen
} else {
  // Navigate to developing result screen
}
```

### Integration with Test Store

```typescript
import { calculateUniversalScore } from '../utils/universalScoring';

// In your test store's calculateScore function
calculateScore: () => {
  const answers = get().answers;
  const questions = get().questions;
  
  // Convert answers to format expected by universal scoring
  const answerIndices = answers.map(a => a.option_index + 1); // Convert 0-based to 1-based
  const reverseFlags = questions.map(q => q.reverse || 0);
  
  // Calculate using universal scoring
  const result = calculateUniversalScore({
    answers: answerIndices,
    reverse: reverseFlags,
  });
  
  // Update store with results
  set({ 
    totalScore: result.totalScore,
    resultLevel: result.resultTier,
  });
}
```

### Converting Answer Strings to Indices

```typescript
import { answerChoiceToIndex, answerIndexToChoice } from './utils/universalScoring';

// Convert string to index
const index = answerChoiceToIndex('Never');  // Returns: 1
const index2 = answerChoiceToIndex('Always'); // Returns: 7

// Convert index to string
const choice = answerIndexToChoice(1);  // Returns: 'Never'
const choice2 = answerIndexToChoice(7); // Returns: 'Always'
```

## API Reference

### `calculateUniversalScore(input: UniversalScoringInput): UniversalScoringOutput`

Main scoring function.

**Input:**
```typescript
{
  answers: AnswerIndex[];  // Array of 20 answer indices (1-7)
  reverse: ReverseFlag[];  // Array of 20 reverse flags (0 or 1)
}
```

**Output:**
```typescript
{
  totalScore: number;      // Total score (20-140)
  resultTier: ResultTier;  // 'developing' | 'good' | 'excellent'
  questionScores: number[]; // Array of 20 individual question scores
}
```

### Types

```typescript
type AnswerIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type ReverseFlag = 0 | 1;
type ResultTier = 'developing' | 'good' | 'excellent';
```

## Error Handling

The function will throw errors for:
- Invalid array lengths (must be exactly 20)
- Invalid answer indices (must be 1-7)
- Invalid reverse flags (must be 0 or 1)
- Invalid total scores (must be 20-140)

## Testing

See `universalScoring.test.ts` for example usage and test cases.

## Notes

- This system is **framework-agnostic** and works with React, Next.js, or any TypeScript project
- No test names are hardcoded - works for **ALL tests**
- The function is **pure** (no side effects)
- All validation is included in the function

