import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AttentionSpanQuestion extends TestQuestion {}
export interface AttentionSpanAnswer extends TestAnswer {}
export interface AttentionSpanTestState extends TestState<AttentionSpanQuestion, AttentionSpanAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('attention-span');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAttentionSpanTestStore = createTestStore<AttentionSpanQuestion, AttentionSpanAnswer>({
  testId: 'attention-span',
  storageKey: 'attention-span-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
