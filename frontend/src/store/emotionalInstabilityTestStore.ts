import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface EmotionalInstabilityQuestion extends TestQuestion {}
export interface EmotionalInstabilityAnswer extends TestAnswer {}
export interface EmotionalInstabilityTestState extends TestState<EmotionalInstabilityQuestion, EmotionalInstabilityAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('emotional-instability');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useEmotionalInstabilityTestStore = createTestStore<EmotionalInstabilityQuestion, EmotionalInstabilityAnswer>({
  testId: 'emotional-instability',
  storageKey: 'emotional-instability-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

