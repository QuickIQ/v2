import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface DecisionMakingQuestion extends TestQuestion {}
export interface DecisionMakingAnswer extends TestAnswer {}
export interface DecisionMakingTestState extends TestState<DecisionMakingQuestion, DecisionMakingAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('decision-making');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useDecisionMakingTestStore = createTestStore<DecisionMakingQuestion, DecisionMakingAnswer>({
  testId: 'decision-making',
  storageKey: 'decision-making-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
