import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AmbitionQuestion extends TestQuestion {}
export interface AmbitionAnswer extends TestAnswer {}
export interface AmbitionTestState extends TestState<AmbitionQuestion, AmbitionAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('ambition');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAmbitionTestStore = createTestStore<AmbitionQuestion, AmbitionAnswer>({
  testId: 'ambition',
  storageKey: 'ambition-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});


