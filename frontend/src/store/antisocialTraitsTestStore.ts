import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface AntisocialTraitsQuestion extends TestQuestion {}
export interface AntisocialTraitsAnswer extends TestAnswer {}
export interface AntisocialTraitsTestState extends TestState<AntisocialTraitsQuestion, AntisocialTraitsAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('antisocial-traits');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useAntisocialTraitsTestStore = createTestStore<AntisocialTraitsQuestion, AntisocialTraitsAnswer>({
  testId: 'antisocial-traits',
  storageKey: 'antisocial-traits-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

