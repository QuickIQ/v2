import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface NegotiationSkillsQuestion extends TestQuestion {}
export interface NegotiationSkillsAnswer extends TestAnswer {}
export interface NegotiationSkillsTestState extends TestState<NegotiationSkillsQuestion, NegotiationSkillsAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('negotiation-skills');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 101, good: 50, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useNegotiationSkillsTestStore = createTestStore<NegotiationSkillsQuestion, NegotiationSkillsAnswer>({
  testId: 'negotiation-skills',
  storageKey: 'negotiation-skills-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

