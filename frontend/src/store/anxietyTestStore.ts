import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AnxietyQuestion extends TestQuestion {}
export interface AnxietyAnswer extends TestAnswer {}
export interface AnxietyTestState extends TestState<AnxietyQuestion, AnxietyAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('anxiety');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAnxietyTestStore = createTestStore<AnxietyQuestion, AnxietyAnswer>({
  testId: 'anxiety',
  storageKey: 'anxiety-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
