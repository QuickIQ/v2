import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useNegotiationSkillsTestStore } from '../../../store/negotiationSkillsTestStore';

export default function NegotiationSkillsUnlockPage() {
  return <UniversalUnlockPage testId="negotiation-skills" useTestStore={ useNegotiationSkillsTestStore } />;
}
