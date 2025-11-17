import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface IncomeStrategyQuestion extends TestQuestion {}
export interface IncomeStrategyAnswer extends TestAnswer {}
export interface IncomeStrategyTestState extends TestState<IncomeStrategyQuestion, IncomeStrategyAnswer> {}

const testConfig = getTestConfig('income-strategy');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useIncomeStrategyTestStore = createTestStore<IncomeStrategyQuestion, IncomeStrategyAnswer>({
  testId: 'income-strategy',
  storageKey: 'income-strategy-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

