import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface IntimacyBlocksQuestion extends TestQuestion {}
export interface IntimacyBlocksAnswer extends TestAnswer {}
export interface IntimacyBlocksTestState extends TestState<IntimacyBlocksQuestion, IntimacyBlocksAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('intimacy-blocks');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useIntimacyBlocksTestStore = createTestStore<IntimacyBlocksQuestion, IntimacyBlocksAnswer>({
  testId: 'intimacy-blocks',
  storageKey: 'intimacy-blocks-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

