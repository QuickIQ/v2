import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface PerfectionismQuestion extends TestQuestion {}
export interface PerfectionismAnswer extends TestAnswer {}
export interface PerfectionismTestState extends TestState<PerfectionismQuestion, PerfectionismAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('perfectionism');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const usePerfectionismTestStore = createTestStore<PerfectionismQuestion, PerfectionismAnswer>({
  testId: 'perfectionism',
  storageKey: 'perfectionism-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});







