import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useRiskToleranceTestStore } from '../../../store/riskToleranceTestStore';

export default function RiskToleranceUnlockPage() {
  return <UniversalUnlockPage testId="risk-tolerance" useTestStore={ useRiskToleranceTestStore } />;
}
