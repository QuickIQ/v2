import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface NarcissismQuestion extends TestQuestion {}
export interface NarcissismAnswer extends TestAnswer {}
export interface NarcissismTestState extends TestState<NarcissismQuestion, NarcissismAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('narcissism');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useNarcissismTestStore = createTestStore<NarcissismQuestion, NarcissismAnswer>({
  testId: 'narcissism',
  storageKey: 'narcissism-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

