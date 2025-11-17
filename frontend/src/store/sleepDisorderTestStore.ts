import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface SleepDisorderQuestion extends TestQuestion {}
export interface SleepDisorderAnswer extends TestAnswer {}
export interface SleepDisorderTestState extends TestState<SleepDisorderQuestion, SleepDisorderAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('sleep-disorder');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useSleepDisorderTestStore = createTestStore<SleepDisorderQuestion, SleepDisorderAnswer>({
  testId: 'sleep-disorder',
  storageKey: 'sleep-disorder-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

