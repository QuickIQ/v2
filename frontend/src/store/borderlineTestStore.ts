import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface BorderlineQuestion extends TestQuestion {}
export interface BorderlineAnswer extends TestAnswer {}
export interface BorderlineTestState extends TestState<BorderlineQuestion, BorderlineAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('borderline');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useBorderlineTestStore = createTestStore<BorderlineQuestion, BorderlineAnswer>({
  testId: 'borderline',
  storageKey: 'borderline-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

