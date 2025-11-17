import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface EmotionalMaskQuestion extends TestQuestion {}
export interface EmotionalMaskAnswer extends TestAnswer {}
export interface EmotionalMaskTestState extends TestState<EmotionalMaskQuestion, EmotionalMaskAnswer> {}

const testConfig = getTestConfig('emotional-mask');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useEmotionalMaskTestStore = createTestStore<EmotionalMaskQuestion, EmotionalMaskAnswer>({
  testId: 'emotional-mask',
  storageKey: 'emotional-mask-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

