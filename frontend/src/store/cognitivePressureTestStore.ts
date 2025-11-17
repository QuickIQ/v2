import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface CognitivePressureQuestion extends TestQuestion {}
export interface CognitivePressureAnswer extends TestAnswer {}
export interface CognitivePressureTestState extends TestState<CognitivePressureQuestion, CognitivePressureAnswer> {}

const testConfig = getTestConfig('cognitive-pressure');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useCognitivePressureTestStore = createTestStore<CognitivePressureQuestion, CognitivePressureAnswer>({
  testId: 'cognitive-pressure',
  storageKey: 'cognitive-pressure-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

