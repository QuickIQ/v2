import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface HiddenManipulationQuestion extends TestQuestion {}
export interface HiddenManipulationAnswer extends TestAnswer {}
export interface HiddenManipulationTestState extends TestState<HiddenManipulationQuestion, HiddenManipulationAnswer> {}

const testConfig = getTestConfig('hidden-manipulation');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useHiddenManipulationTestStore = createTestStore<HiddenManipulationQuestion, HiddenManipulationAnswer>({
  testId: 'hidden-manipulation',
  storageKey: 'hidden-manipulation-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

