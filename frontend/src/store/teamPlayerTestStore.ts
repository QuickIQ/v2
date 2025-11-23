import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface TeamPlayerQuestion extends TestQuestion {}
export interface TeamPlayerAnswer extends TestAnswer {}
export interface TeamPlayerTestState extends TestState<TeamPlayerQuestion, TeamPlayerAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('team-player');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useTeamPlayerTestStore = createTestStore<TeamPlayerQuestion, TeamPlayerAnswer>({
  testId: 'team-player',
  storageKey: 'team-player-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});






