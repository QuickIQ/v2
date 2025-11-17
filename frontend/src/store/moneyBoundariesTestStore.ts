import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface MoneyBoundariesQuestion extends TestQuestion {}
export interface MoneyBoundariesAnswer extends TestAnswer {}
export interface MoneyBoundariesTestState extends TestState<MoneyBoundariesQuestion, MoneyBoundariesAnswer> {}

const testConfig = getTestConfig('money-boundaries');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useMoneyBoundariesTestStore = createTestStore<MoneyBoundariesQuestion, MoneyBoundariesAnswer>({
  testId: 'money-boundaries',
  storageKey: 'money-boundaries-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

