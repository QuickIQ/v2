import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface CovertInfluenceQuestion extends TestQuestion {}
export interface CovertInfluenceAnswer extends TestAnswer {}
export interface CovertInfluenceTestState extends TestState<CovertInfluenceQuestion, CovertInfluenceAnswer> {}

const testConfig = getTestConfig('covert-influence');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useCovertInfluenceTestStore = createTestStore<CovertInfluenceQuestion, CovertInfluenceAnswer>({
  testId: 'covert-influence',
  storageKey: 'covert-influence-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

