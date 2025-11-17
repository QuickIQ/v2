import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ColdStrategyQuestion extends TestQuestion {}
export interface ColdStrategyAnswer extends TestAnswer {}
export interface ColdStrategyTestState extends TestState<ColdStrategyQuestion, ColdStrategyAnswer> {}

const testConfig = getTestConfig('cold-strategy');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useColdStrategyTestStore = createTestStore<ColdStrategyQuestion, ColdStrategyAnswer>({
  testId: 'cold-strategy',
  storageKey: 'cold-strategy-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

