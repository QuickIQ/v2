import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface SpendingHabitsQuestion extends TestQuestion {}
export interface SpendingHabitsAnswer extends TestAnswer {}
export interface SpendingHabitsTestState extends TestState<SpendingHabitsQuestion, SpendingHabitsAnswer> {}

const testConfig = getTestConfig('spending-habits');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useSpendingHabitsTestStore = createTestStore<SpendingHabitsQuestion, SpendingHabitsAnswer>({
  testId: 'spending-habits',
  storageKey: 'spending-habits-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

