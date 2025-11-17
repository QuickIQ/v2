import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface PanicDisorderQuestion extends TestQuestion {}
export interface PanicDisorderAnswer extends TestAnswer {}
export interface PanicDisorderTestState extends TestState<PanicDisorderQuestion, PanicDisorderAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('panic-disorder');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const usePanicDisorderTestStore = createTestStore<PanicDisorderQuestion, PanicDisorderAnswer>({
  testId: 'panic-disorder',
  storageKey: 'panic-disorder-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

