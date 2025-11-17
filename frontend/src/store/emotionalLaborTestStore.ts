import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface EmotionalLaborQuestion extends TestQuestion {}
export interface EmotionalLaborAnswer extends TestAnswer {}
export interface EmotionalLaborTestState extends TestState<EmotionalLaborQuestion, EmotionalLaborAnswer> {}

const testConfig = getTestConfig('emotional-labor');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useEmotionalLaborTestStore = createTestStore<EmotionalLaborQuestion, EmotionalLaborAnswer>({
  testId: 'emotional-labor',
  storageKey: 'emotional-labor-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

