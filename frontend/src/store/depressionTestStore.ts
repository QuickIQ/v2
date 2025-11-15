import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface DepressionQuestion extends TestQuestion {}
export interface DepressionAnswer extends TestAnswer {}
export interface DepressionTestState extends TestState<DepressionQuestion, DepressionAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('depression');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useDepressionTestStore = createTestStore<DepressionQuestion, DepressionAnswer>({
  testId: 'depression',
  storageKey: 'depression-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
