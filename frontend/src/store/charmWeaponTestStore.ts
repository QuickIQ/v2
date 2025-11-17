import { createTestStore, TestQuestion, TestAnswer, TestState } from './testStoreFactory';
import { getTestConfig } from '../utils/testContentLoader';

export interface CharmWeaponQuestion extends TestQuestion {}
export interface CharmWeaponAnswer extends TestAnswer {}
export interface CharmWeaponTestState extends TestState<CharmWeaponQuestion, CharmWeaponAnswer> {}

const testConfig = getTestConfig('charm-weapon');
const scoring = testConfig?.scoring || {
  thresholds: { excellent: 111, good: 71, developing: 0 },
  timeLimit: 600
};

export const useCharmWeaponTestStore = createTestStore<CharmWeaponQuestion, CharmWeaponAnswer>({
  testId: 'charm-weapon',
  storageKey: 'charm-weapon-test-storage',
  timeLimit: scoring.timeLimit,
  scoreThresholds: scoring.thresholds,
});

