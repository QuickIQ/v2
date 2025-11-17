import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ConflictManipulationQuestion extends TestQuestion {}
export interface ConflictManipulationAnswer extends TestAnswer {}
export interface ConflictManipulationTestState extends TestState<ConflictManipulationQuestion, ConflictManipulationAnswer> {}

const testConfig = getTestConfig('conflict-manipulation');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useConflictManipulationTestStore = createTestStore<ConflictManipulationQuestion, ConflictManipulationAnswer>({
  testId: 'conflict-manipulation',
  storageKey: 'conflict-manipulation-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

