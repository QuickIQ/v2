import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface MarketBehaviorQuestion extends TestQuestion {}
export interface MarketBehaviorAnswer extends TestAnswer {}
export interface MarketBehaviorTestState extends TestState<MarketBehaviorQuestion, MarketBehaviorAnswer> {}

const testConfig = getTestConfig('market-behavior');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useMarketBehaviorTestStore = createTestStore<MarketBehaviorQuestion, MarketBehaviorAnswer>({
  testId: 'market-behavior',
  storageKey: 'market-behavior-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

