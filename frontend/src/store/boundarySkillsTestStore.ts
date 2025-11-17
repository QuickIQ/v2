import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface BoundarySkillsQuestion extends TestQuestion {}
export interface BoundarySkillsAnswer extends TestAnswer {}
export interface BoundarySkillsTestState extends TestState<BoundarySkillsQuestion, BoundarySkillsAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('boundary-skills');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useBoundarySkillsTestStore = createTestStore<BoundarySkillsQuestion, BoundarySkillsAnswer>({
  testId: 'boundary-skills',
  storageKey: 'boundary-skills-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

