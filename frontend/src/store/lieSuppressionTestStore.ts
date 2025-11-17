import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface LieSuppressionQuestion extends TestQuestion {}
export interface LieSuppressionAnswer extends TestAnswer {}
export interface LieSuppressionTestState extends TestState<LieSuppressionQuestion, LieSuppressionAnswer> {}

const testConfig = getTestConfig('lie-suppression');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useLieSuppressionTestStore = createTestStore<LieSuppressionQuestion, LieSuppressionAnswer>({
  testId: 'lie-suppression',
  storageKey: 'lie-suppression-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

