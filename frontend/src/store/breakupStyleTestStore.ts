import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface BreakupStyleQuestion extends TestQuestion {}
export interface BreakupStyleAnswer extends TestAnswer {}
export interface BreakupStyleTestState extends TestState<BreakupStyleQuestion, BreakupStyleAnswer> {}

const testConfig = getTestConfig('breakup-style');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useBreakupStyleTestStore = createTestStore<BreakupStyleQuestion, BreakupStyleAnswer>({
  testId: 'breakup-style',
  storageKey: 'breakup-style-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

