import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface CoParentingDynamicsQuestion extends TestQuestion {}
export interface CoParentingDynamicsAnswer extends TestAnswer {}
export interface CoParentingDynamicsTestState extends TestState<CoParentingDynamicsQuestion, CoParentingDynamicsAnswer> {}

const testConfig = getTestConfig('co-parenting-dynamics');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useCoParentingDynamicsTestStore = createTestStore<CoParentingDynamicsQuestion, CoParentingDynamicsAnswer>({
  testId: 'co-parenting-dynamics',
  storageKey: 'co-parenting-dynamics-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

