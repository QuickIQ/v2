import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface ConflictStyleQuestion extends TestQuestion {}
export interface ConflictStyleAnswer extends TestAnswer {}
export interface ConflictStyleTestState extends TestState<ConflictStyleQuestion, ConflictStyleAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('conflict-style');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useConflictStyleTestStore = createTestStore<ConflictStyleQuestion, ConflictStyleAnswer>({
  testId: 'conflict-style',
  storageKey: 'conflict-style-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

