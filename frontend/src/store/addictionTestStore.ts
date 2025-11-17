import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AddictionQuestion extends TestQuestion {}
export interface AddictionAnswer extends TestAnswer {}
export interface AddictionTestState extends TestState<AddictionQuestion, AddictionAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('addiction');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAddictionTestStore = createTestStore<AddictionQuestion, AddictionAnswer>({
  testId: 'addiction',
  storageKey: 'addiction-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

