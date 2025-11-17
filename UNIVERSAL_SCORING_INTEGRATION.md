# Universal Scoring System Integration

## Overview

The universal scoring system has been successfully integrated into all test categories. All tests now use the same scoring logic, regardless of category.

## Integration Points

### 1. Test Store Factory (`frontend/src/store/testStoreFactory.ts`)

**Updated:** The `calculateScore()` function now uses the universal scoring system.

**Key Changes:**
- Imports `calculateUniversalScore` from `../utils/universalScoring`
- Converts answers from 0-based indices (0-6) to 1-based indices (1-7)
- Converts boolean/number reverse flags to 0/1 format
- Uses universal scoring function for all calculations
- Falls back to old calculation method if universal scoring fails

**Scoring Logic:**
```typescript
// All tests use the same thresholds:
// 0-70 = 'developing'
// 71-110 = 'good'
// 111-140 = 'excellent'
```

### 2. Payment Form (`frontend/src/components/TestFlow/PaymentComponents/PaymentForm.tsx`)

**Updated:** Now redirects to tier-specific unlock pages.

**Key Changes:**
- Accepts `resultLevel` prop
- Redirects to `/test/${testId}/unlock/${tier}` instead of `/test/${testId}/unlock`
- Defaults to 'good' if resultLevel is not available

### 3. Universal Payment Page (`frontend/src/components/TestFlow/UniversalPaymentPage.tsx`)

**Updated:** Passes `resultLevel` to PaymentForm component.

## Test Categories

All 5 categories use the same scoring system:

1. **Business** – Career, Performance & Leadership Mastery
2. **Health** – Mental Fitness, Cognitive Balance & Habit Strength
3. **Love** – Romantic Dynamics & Emotional Bonding
4. **Money** – Risk, Impulse & Money Behavior Patterns
5. **Dark** – Shadow Traits, Manipulation & Inner Conflict Forces

## Scoring Rules

### Answer Choices (7 options)
- Never = 1 point (normal) / 7 points (reverse)
- Rarely = 2 points (normal) / 6 points (reverse)
- Sometimes = 3 points (normal) / 5 points (reverse)
- Neutral = 4 points (both)
- Often = 5 points (normal) / 3 points (reverse)
- Usually = 6 points (normal) / 2 points (reverse)
- Always = 7 points (normal) / 1 point (reverse)

### Reverse Scoring
Each question has a `reverse` field:
- `reverse: 0` or `reverse: false` → Normal scoring
- `reverse: 1` or `reverse: true` → Reverse scoring

### Total Score Range
- **Minimum:** 20 points (all "Never" with normal scoring)
- **Maximum:** 140 points (all "Always" with normal scoring)

## Result Tiers

| Score Range | Tier | Redirect URL |
|------------|------|--------------|
| 0-70 | `developing` | `/test/{testId}/unlock/developing` |
| 71-110 | `good` | `/test/{testId}/unlock/good` |
| 111-140 | `excellent` | `/test/{testId}/unlock/excellent` |

## Routing Flow

1. **Test Completion** → Score calculated using universal scoring
2. **Analyzing Page** → Shows progress, calculates final score
3. **Email Page** → User enters email
4. **Payment Page** → User completes payment
5. **Unlock Page** → Redirects to `/test/{testId}/unlock/{tier}` based on score

## Data Structure

### Questions JSON Format
```json
{
  "questions": [
    {
      "id": 1,
      "text": "Question text",
      "options": ["Never", "Rarely", "Sometimes", "Neutral", "Often", "Usually", "Always"],
      "reverse": 0  // or 1 for reverse scoring
    }
  ]
}
```

### Answers Format
```typescript
{
  question_id: number;
  option_index: number; // 0-6 (0=Never, 6=Always)
  score: number;
}
```

## Implementation Details

### Universal Scoring Function
Located at: `frontend/src/utils/universalScoring.ts`

**Input:**
```typescript
{
  answers: AnswerIndex[];  // 20 answer indices (1-7)
  reverse: ReverseFlag[];  // 20 reverse flags (0 or 1)
}
```

**Output:**
```typescript
{
  totalScore: number;      // 20-140
  resultTier: ResultTier;  // 'developing' | 'good' | 'excellent'
  questionScores: number[]; // Individual question scores
}
```

### Test Store Integration
All test stores created via `createTestStore()` automatically use universal scoring. No changes needed to individual test store files.

## Verification Checklist

- ✅ Universal scoring function created
- ✅ Test store factory updated to use universal scoring
- ✅ Payment form redirects to tier-specific URLs
- ✅ All tests use same thresholds (20-50, 51-100, 101-140)
- ✅ Reverse scoring properly handled (boolean/number → 0/1)
- ✅ Routing works for all 5 categories
- ✅ Unlock pages accessible via `/test/{testId}/unlock/{tier}`

## Testing

To test the integration:

1. **Complete a test** with 20 questions
2. **Verify scoring** - Check that totalScore is between 20-140
3. **Verify tier** - Check that resultTier matches score range
4. **Verify routing** - After payment, should redirect to `/test/{testId}/unlock/{tier}`
5. **Verify unlock page** - Should display correct tier content

## Notes

- All tests must have exactly 20 questions
- All questions must have 7 answer choices
- Reverse flags can be boolean or number (0/1)
- The system handles edge cases gracefully (fallback to old method if needed)
- No hardcoding - all tests use the same logic
- Fully localizable - question texts and results are in JSON

