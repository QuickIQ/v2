import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface MemoryRetentionQuestion extends TestQuestion {}
export interface MemoryRetentionAnswer extends TestAnswer {}
export interface MemoryRetentionTestState extends TestState<MemoryRetentionQuestion, MemoryRetentionAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('memory-retention');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useMemoryRetentionTestStore = createTestStore<MemoryRetentionQuestion, MemoryRetentionAnswer>({
  testId: 'memory-retention',
  storageKey: 'memory-retention-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
