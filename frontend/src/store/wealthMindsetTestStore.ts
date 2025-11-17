import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface WealthMindsetQuestion extends TestQuestion {}
export interface WealthMindsetAnswer extends TestAnswer {}
export interface WealthMindsetTestState extends TestState<WealthMindsetQuestion, WealthMindsetAnswer> {}

const testConfig = getTestConfig('wealth-mindset');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useWealthMindsetTestStore = createTestStore<WealthMindsetQuestion, WealthMindsetAnswer>({
  testId: 'wealth-mindset',
  storageKey: 'wealth-mindset-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

