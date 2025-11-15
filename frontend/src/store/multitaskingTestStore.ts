import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface MultitaskingQuestion extends TestQuestion {}
export interface MultitaskingAnswer extends TestAnswer {}
export interface MultitaskingTestState extends TestState<MultitaskingQuestion, MultitaskingAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('multitasking');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useMultitaskingTestStore = createTestStore<MultitaskingQuestion, MultitaskingAnswer>({
  testId: 'multitasking',
  storageKey: 'multitasking-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
