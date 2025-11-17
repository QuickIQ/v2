import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface JealousyLevelsQuestion extends TestQuestion {}
export interface JealousyLevelsAnswer extends TestAnswer {}
export interface JealousyLevelsTestState extends TestState<JealousyLevelsQuestion, JealousyLevelsAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('jealousy-levels');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useJealousyLevelsTestStore = createTestStore<JealousyLevelsQuestion, JealousyLevelsAnswer>({
  testId: 'jealousy-levels',
  storageKey: 'jealousy-levels-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

