import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface BurnoutQuestion extends TestQuestion {}
export interface BurnoutAnswer extends TestAnswer {}
export interface BurnoutTestState extends TestState<BurnoutQuestion, BurnoutAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('burnout');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useBurnoutTestStore = createTestStore<BurnoutQuestion, BurnoutAnswer>({
  testId: 'burnout',
  storageKey: 'burnout-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

