import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface OcdQuestion extends TestQuestion {}
export interface OcdAnswer extends TestAnswer {}
export interface OcdTestState extends TestState<OcdQuestion, OcdAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('ocd');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useOcdTestStore = createTestStore<OcdQuestion, OcdAnswer>({
  testId: 'ocd',
  storageKey: 'ocd-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

