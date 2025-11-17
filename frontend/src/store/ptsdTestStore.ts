import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface PtsdQuestion extends TestQuestion {}
export interface PtsdAnswer extends TestAnswer {}
export interface PtsdTestState extends TestState<PtsdQuestion, PtsdAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('ptsd');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const usePtsdTestStore = createTestStore<PtsdQuestion, PtsdAnswer>({
  testId: 'ptsd',
  storageKey: 'ptsd-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

