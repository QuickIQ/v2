import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useRiskToleranceTestStore } from '../../../store/risktoleranceTestStore';

export default function RiskTolerancePaymentPage() {
  return <UniversalPaymentPage testId="risk-tolerance" useTestStore={useRiskToleranceTestStore} />;
}
