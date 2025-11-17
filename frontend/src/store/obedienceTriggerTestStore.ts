import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ObedienceTriggerQuestion extends TestQuestion {}
export interface ObedienceTriggerAnswer extends TestAnswer {}
export interface ObedienceTriggerTestState extends TestState<ObedienceTriggerQuestion, ObedienceTriggerAnswer> {}

const testConfig = getTestConfig('obedience-trigger');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useObedienceTriggerTestStore = createTestStore<ObedienceTriggerQuestion, ObedienceTriggerAnswer>({
  testId: 'obedience-trigger',
  storageKey: 'obedience-trigger-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

