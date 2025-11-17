import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ShadowIntentionsQuestion extends TestQuestion {}
export interface ShadowIntentionsAnswer extends TestAnswer {}
export interface ShadowIntentionsTestState extends TestState<ShadowIntentionsQuestion, ShadowIntentionsAnswer> {}

const testConfig = getTestConfig('shadow-intentions');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useShadowIntentionsTestStore = createTestStore<ShadowIntentionsQuestion, ShadowIntentionsAnswer>({
  testId: 'shadow-intentions',
  storageKey: 'shadow-intentions-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

