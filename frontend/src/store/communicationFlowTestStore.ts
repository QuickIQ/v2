import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface CommunicationFlowQuestion extends TestQuestion {}
export interface CommunicationFlowAnswer extends TestAnswer {}
export interface CommunicationFlowTestState extends TestState<CommunicationFlowQuestion, CommunicationFlowAnswer> {}

const testConfig = getTestConfig('communication-flow');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useCommunicationFlowTestStore = createTestStore<CommunicationFlowQuestion, CommunicationFlowAnswer>({
  testId: 'communication-flow',
  storageKey: 'communication-flow-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

