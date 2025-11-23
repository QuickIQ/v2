import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface SuccessQuestion extends TestQuestion {}
export interface SuccessAnswer extends TestAnswer {}
export interface SuccessTestState extends TestState<SuccessQuestion, SuccessAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('success');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useSuccessTestStore = createTestStore<SuccessQuestion, SuccessAnswer>({
  testId: 'success',
  storageKey: 'success-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});






