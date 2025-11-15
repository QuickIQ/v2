import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useNegotiationSkillsTestStore } from '../../../store/negotiationskillsTestStore';

export default function NegotiationSkillsPaymentPage() {
  return <UniversalPaymentPage testId="negotiation-skills" useTestStore={useNegotiationSkillsTestStore} />;
}
