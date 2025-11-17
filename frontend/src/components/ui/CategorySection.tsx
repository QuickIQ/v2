import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { useTranslation } from 'react-i18next';
import { TestCard } from './TestCard';
import { getAllTestConfigs } from '../../utils/testContentLoader';
import categoriesData from '../../data/shared/categories.json';

export function CategorySection() {
  const isMobile = useMobile();
  const { i18n } = useTranslation();
  const language = i18n.language as 'en' | 'tr';
  
  // Cache test configs - sadece bir kere hesapla
  const testConfigs = useMemo(() => getAllTestConfigs(), []);
  
  // Her kategori için test'leri önceden hesapla - sadece testConfigs değiştiğinde yeniden hesapla
  const testsByCategory = useMemo(() => {
    const map: Record<string, typeof testConfigs> = {};
    categoriesData.categories.forEach(category => {
      const categoryNameEn = category.title.en.split('–')[0].trim();
      const categoryNameTr = category.title.tr.split('–')[0].trim();
      map[category.id] = testConfigs.filter(test => 
        test.category === categoryNameEn || 
        test.category === categoryNameTr ||
        test.category.toLowerCase() === category.id
      );
    });
    return map;
  }, [testConfigs]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      style={{
        marginTop: isMobile ? '32px' : '48px',
        marginBottom: isMobile ? '48px' : '64px',
      }}
    >
      {categoriesData.categories.map((category) => (
        <div key={category.id} id={`${category.id}-section`}>
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: category.color,
            marginTop: category.id === 'business' ? '0' : '32px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            {category.emoji} {category.title[language] || category.title.en}
          </h2>

          {category.showCards && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile 
                ? 'repeat(2, minmax(0, 1fr))' 
                : 'repeat(3, minmax(0, 1fr))',
              gridAutoRows: '1fr',
              gap: isMobile ? '12px' : '10px',
              maxWidth: 'none',
              margin: '0 auto',
              padding: isMobile ? '0' : '0',
              marginBottom: isMobile ? '32px' : '48px',
              alignItems: 'stretch',
              justifyItems: 'stretch',
            }}>
              {testsByCategory[category.id]?.map((test, index) => (
                <TestCard key={test.id} test={test} index={index} />
              ))}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

