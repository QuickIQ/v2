import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface SocialEngineeringQuestion extends TestQuestion {}
export interface SocialEngineeringAnswer extends TestAnswer {}
export interface SocialEngineeringTestState extends TestState<SocialEngineeringQuestion, SocialEngineeringAnswer> {}

const testConfig = getTestConfig('social-engineering');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useSocialEngineeringTestStore = createTestStore<SocialEngineeringQuestion, SocialEngineeringAnswer>({
  testId: 'social-engineering',
  storageKey: 'social-engineering-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

