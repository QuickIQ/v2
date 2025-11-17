import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface EatingBehaviorQuestion extends TestQuestion {}
export interface EatingBehaviorAnswer extends TestAnswer {}
export interface EatingBehaviorTestState extends TestState<EatingBehaviorQuestion, EatingBehaviorAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('eating-behavior');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useEatingBehaviorTestStore = createTestStore<EatingBehaviorQuestion, EatingBehaviorAnswer>({
  testId: 'eating-behavior',
  storageKey: 'eating-behavior-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

