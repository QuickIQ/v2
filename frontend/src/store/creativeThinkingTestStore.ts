import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface CreativeThinkingQuestion extends TestQuestion {}
export interface CreativeThinkingAnswer extends TestAnswer {}
export interface CreativeThinkingTestState extends TestState<CreativeThinkingQuestion, CreativeThinkingAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('creative-thinking');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useCreativeThinkingTestStore = createTestStore<CreativeThinkingQuestion, CreativeThinkingAnswer>({
  testId: 'creative-thinking',
  storageKey: 'creative-thinking-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
