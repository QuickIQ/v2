import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface MoneyTriggersQuestion extends TestQuestion {}
export interface MoneyTriggersAnswer extends TestAnswer {}
export interface MoneyTriggersTestState extends TestState<MoneyTriggersQuestion, MoneyTriggersAnswer> {}

const testConfig = getTestConfig('money-triggers');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useMoneyTriggersTestStore = createTestStore<MoneyTriggersQuestion, MoneyTriggersAnswer>({
  testId: 'money-triggers',
  storageKey: 'money-triggers-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

