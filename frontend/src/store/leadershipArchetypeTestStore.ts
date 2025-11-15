import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface LeadershipArchetypeQuestion extends TestQuestion {}
export interface LeadershipArchetypeAnswer extends TestAnswer {}
export interface LeadershipArchetypeTestState extends TestState<LeadershipArchetypeQuestion, LeadershipArchetypeAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('leadership-archetype');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useLeadershipArchetypeTestStore = createTestStore<LeadershipArchetypeQuestion, LeadershipArchetypeAnswer>({
  testId: 'leadership-archetype',
  storageKey: 'leadership-archetype-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});
