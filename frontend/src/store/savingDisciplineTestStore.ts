import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface SavingDisciplineQuestion extends TestQuestion {}
export interface SavingDisciplineAnswer extends TestAnswer {}
export interface SavingDisciplineTestState extends TestState<SavingDisciplineQuestion, SavingDisciplineAnswer> {}

const testConfig = getTestConfig('saving-discipline');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useSavingDisciplineTestStore = createTestStore<SavingDisciplineQuestion, SavingDisciplineAnswer>({
  testId: 'saving-discipline',
  storageKey: 'saving-discipline-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

