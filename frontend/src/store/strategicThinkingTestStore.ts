import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface StrategicThinkingQuestion extends TestQuestion {}
export interface StrategicThinkingAnswer extends TestAnswer {}
export interface StrategicThinkingTestState extends TestState<StrategicThinkingQuestion, StrategicThinkingAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('strategic-thinking');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useStrategicThinkingTestStore = createTestStore<StrategicThinkingQuestion, StrategicThinkingAnswer>({
  testId: 'strategic-thinking',
  storageKey: 'strategic-thinking-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
