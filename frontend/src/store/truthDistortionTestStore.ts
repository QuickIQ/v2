import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface TruthDistortionQuestion extends TestQuestion {}
export interface TruthDistortionAnswer extends TestAnswer {}
export interface TruthDistortionTestState extends TestState<TruthDistortionQuestion, TruthDistortionAnswer> {}

const testConfig = getTestConfig('truth-distortion');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useTruthDistortionTestStore = createTestStore<TruthDistortionQuestion, TruthDistortionAnswer>({
  testId: 'truth-distortion',
  storageKey: 'truth-distortion-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

