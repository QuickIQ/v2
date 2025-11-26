import { useTranslation } from 'react-i18next';
import UniversalUnlockTemplate from '../../../components/TestFlow/UniversalUnlockTemplate';

interface Level1Props {
  score: number;
}

export default function Level1({ score }: Level1Props) {
  const { i18n } = useTranslation();
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  // Level 1 uses 'developing' for emoji config but loads level1 content from iqtest.json
  // Level 1 Rarity: Top %65–99
  return (
    <UniversalUnlockTemplate
      testId="iqtest"
      level="developing"
      locale={locale}
      customLevelKey="level1"
      score={score}
      rarity="Top %65–99"
    />
  );
}
