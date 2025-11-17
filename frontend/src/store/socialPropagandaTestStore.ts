import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface SocialPropagandaQuestion extends TestQuestion {}
export interface SocialPropagandaAnswer extends TestAnswer {}
export interface SocialPropagandaTestState extends TestState<SocialPropagandaQuestion, SocialPropagandaAnswer> {}

const testConfig = getTestConfig('social-propaganda');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useSocialPropagandaTestStore = createTestStore<SocialPropagandaQuestion, SocialPropagandaAnswer>({
  testId: 'social-propaganda',
  storageKey: 'social-propaganda-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

