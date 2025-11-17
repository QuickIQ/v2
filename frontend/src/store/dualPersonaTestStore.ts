import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface DualPersonaQuestion extends TestQuestion {}
export interface DualPersonaAnswer extends TestAnswer {}
export interface DualPersonaTestState extends TestState<DualPersonaQuestion, DualPersonaAnswer> {}

const testConfig = getTestConfig('dual-persona');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useDualPersonaTestStore = createTestStore<DualPersonaQuestion, DualPersonaAnswer>({
  testId: 'dual-persona',
  storageKey: 'dual-persona-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

