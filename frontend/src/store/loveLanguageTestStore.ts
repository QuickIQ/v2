import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

// Type aliases for backward compatibility
export interface LoveLanguageQuestion extends TestQuestion {}
export interface LoveLanguageAnswer extends TestAnswer {}
export interface LoveLanguageTestState extends TestState<LoveLanguageQuestion, LoveLanguageAnswer> {}

// Get config from test-config.json
const testConfig = getTestConfig('love-language');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

// Create store using factory
export const useLoveLanguageTestStore = createTestStore<LoveLanguageQuestion, LoveLanguageAnswer>({
  testId: 'love-language',
  storageKey: 'love-language-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

