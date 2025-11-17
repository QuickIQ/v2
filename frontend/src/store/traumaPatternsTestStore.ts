import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface TraumaPatternsQuestion extends TestQuestion {}
export interface TraumaPatternsAnswer extends TestAnswer {}
export interface TraumaPatternsTestState extends TestState<TraumaPatternsQuestion, TraumaPatternsAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('trauma-patterns');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useTraumaPatternsTestStore = createTestStore<TraumaPatternsQuestion, TraumaPatternsAnswer>({
  testId: 'trauma-patterns',
  storageKey: 'trauma-patterns-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

