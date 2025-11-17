import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface ImpulseBuyingQuestion extends TestQuestion {}
export interface ImpulseBuyingAnswer extends TestAnswer {}
export interface ImpulseBuyingTestState extends TestState<ImpulseBuyingQuestion, ImpulseBuyingAnswer> {}

const testConfig = getTestConfig('impulse-buying');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useImpulseBuyingTestStore = createTestStore<ImpulseBuyingQuestion, ImpulseBuyingAnswer>({
  testId: 'impulse-buying',
  storageKey: 'impulse-buying-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

