import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface BudgetControlQuestion extends TestQuestion {}
export interface BudgetControlAnswer extends TestAnswer {}
export interface BudgetControlTestState extends TestState<BudgetControlQuestion, BudgetControlAnswer> {}

const testConfig = getTestConfig('budget-control');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useBudgetControlTestStore = createTestStore<BudgetControlQuestion, BudgetControlAnswer>({
  testId: 'budget-control',
  storageKey: 'budget-control-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

