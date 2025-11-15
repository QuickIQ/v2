import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AutismQuestion extends TestQuestion {}
export interface AutismAnswer extends TestAnswer {}
export interface AutismTestState extends TestState<AutismQuestion, AutismAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('autism');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAutismTestStore = createTestStore<AutismQuestion, AutismAnswer>({
  testId: 'autism',
  storageKey: 'autism-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
