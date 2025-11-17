import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface DebtPatternsQuestion extends TestQuestion {}
export interface DebtPatternsAnswer extends TestAnswer {}
export interface DebtPatternsTestState extends TestState<DebtPatternsQuestion, DebtPatternsAnswer> {}

const testConfig = getTestConfig('debt-patterns');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useDebtPatternsTestStore = createTestStore<DebtPatternsQuestion, DebtPatternsAnswer>({
  testId: 'debt-patterns',
  storageKey: 'debt-patterns-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

