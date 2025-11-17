import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AdhdQuestion extends TestQuestion {}
export interface AdhdAnswer extends TestAnswer {}
export interface AdhdTestState extends TestState<AdhdQuestion, AdhdAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('adhd');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAdhdTestStore = createTestStore<AdhdQuestion, AdhdAnswer>({
  testId: 'adhd',
  storageKey: 'adhd-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

