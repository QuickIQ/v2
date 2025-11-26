import { useTranslation } from 'react-i18next';
import UniversalUnlockTemplate from '../../../components/TestFlow/UniversalUnlockTemplate';

interface Level3Props {
  score: number;
}

export default function Level3({ score }: Level3Props) {
  const { i18n } = useTranslation();
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  // Level 3 uses 'good' for emoji config but loads level3 content from iqtest.json
  // Level 3 Rarity: Top %10–35
  return (
    <UniversalUnlockTemplate
      testId="iqtest"
      level="good"
      locale={locale}
      customLevelKey="level3"
      score={score}
      rarity="Top %10–35"
    />
  );
}
