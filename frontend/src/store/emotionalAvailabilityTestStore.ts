import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface EmotionalAvailabilityQuestion extends TestQuestion {}
export interface EmotionalAvailabilityAnswer extends TestAnswer {}
export interface EmotionalAvailabilityTestState extends TestState<EmotionalAvailabilityQuestion, EmotionalAvailabilityAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('emotional-availability');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useEmotionalAvailabilityTestStore = createTestStore<EmotionalAvailabilityQuestion, EmotionalAvailabilityAnswer>({
  testId: 'emotional-availability',
  storageKey: 'emotional-availability-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

