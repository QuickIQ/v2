import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface TrustIssuesQuestion extends TestQuestion {}
export interface TrustIssuesAnswer extends TestAnswer {}
export interface TrustIssuesTestState extends TestState<TrustIssuesQuestion, TrustIssuesAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('trust-issues');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useTrustIssuesTestStore = createTestStore<TrustIssuesQuestion, TrustIssuesAnswer>({
  testId: 'trust-issues',
  storageKey: 'trust-issues-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

