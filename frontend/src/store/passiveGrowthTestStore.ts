import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface PassiveGrowthQuestion extends TestQuestion {}
export interface PassiveGrowthAnswer extends TestAnswer {}
export interface PassiveGrowthTestState extends TestState<PassiveGrowthQuestion, PassiveGrowthAnswer> {}

const testConfig = getTestConfig('passive-growth');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const usePassiveGrowthTestStore = createTestStore<PassiveGrowthQuestion, PassiveGrowthAnswer>({
  testId: 'passive-growth',
  storageKey: 'passive-growth-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

