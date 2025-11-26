import { useTranslation } from 'react-i18next';
import UniversalUnlockTemplate from '../../../components/TestFlow/UniversalUnlockTemplate';

interface Level2Props {
  score: number;
}

export default function Level2({ score }: Level2Props) {
  const { i18n } = useTranslation();
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  // Level 2 uses 'developing' for emoji config but loads level2 content from iqtest.json
  // Level 2 Rarity: Top %35–65
  return (
    <UniversalUnlockTemplate
      testId="iqtest"
      level="developing"
      locale={locale}
      customLevelKey="level2"
      score={score}
      rarity="Top %35–65"
    />
  );
}
