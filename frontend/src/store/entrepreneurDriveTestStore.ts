import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface EntrepreneurDriveQuestion extends TestQuestion {}
export interface EntrepreneurDriveAnswer extends TestAnswer {}
export interface EntrepreneurDriveTestState extends TestState<EntrepreneurDriveQuestion, EntrepreneurDriveAnswer> {}

const testConfig = getTestConfig('entrepreneur-drive');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useEntrepreneurDriveTestStore = createTestStore<EntrepreneurDriveQuestion, EntrepreneurDriveAnswer>({
  testId: 'entrepreneur-drive',
  storageKey: 'entrepreneur-drive-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

