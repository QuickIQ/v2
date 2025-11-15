import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface ProblemSolvingQuestion extends TestQuestion {}
export interface ProblemSolvingAnswer extends TestAnswer {}
export interface ProblemSolvingTestState extends TestState<ProblemSolvingQuestion, ProblemSolvingAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('problem-solving');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useProblemSolvingTestStore = createTestStore<ProblemSolvingQuestion, ProblemSolvingAnswer>({
  testId: 'problem-solving',
  storageKey: 'problem-solving-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
