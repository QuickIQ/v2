import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ClosenessNeedQuestion extends TestQuestion {}
export interface ClosenessNeedAnswer extends TestAnswer {}
export interface ClosenessNeedTestState extends TestState<ClosenessNeedQuestion, ClosenessNeedAnswer> {}

const testConfig = getTestConfig('closeness-need');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useClosenessNeedTestStore = createTestStore<ClosenessNeedQuestion, ClosenessNeedAnswer>({
  testId: 'closeness-need',
  storageKey: 'closeness-need-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

