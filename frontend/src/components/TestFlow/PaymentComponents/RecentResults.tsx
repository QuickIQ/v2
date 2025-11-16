import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../../../hooks/useMobile';
import namesByCountryData from '../../../data/shared/names-by-country.json';
import countriesData from '../../../data/shared/countries.json';
import creativityTypesData from '../../../data/shared/creativity-types.json';

const namesByCountry: Record<string, string[]> = namesByCountryData;
const countries = countriesData;
const creativityTypes = creativityTypesData;

function randomShortName(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.`;
}

interface RecentResult {
  name: string;
  country: string;
  type: string;
}

// Track recently shown names to avoid repetition
let recentlyShownNames = new Set<string>();

function generateResults(locale: string): RecentResult[] {
  const types = creativityTypes[locale as 'en' | 'tr'] || creativityTypes.en;
  const results: RecentResult[] = [];
  const usedCombinations = new Set<string>();
  
  // If we've shown too many names, reset the tracking (to allow some repetition after a while)
  if (recentlyShownNames.size > 100) {
    recentlyShownNames.clear();
  }
  
  // Shuffle countries for variety
  const shuffledCountries = [...countries].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < 8; i++) {
    let attempts = 0;
    let result: RecentResult | null = null;
    
    // Try to find a unique combination
    while (attempts < 50 && !result) {
      const country = shuffledCountries[Math.floor(Math.random() * shuffledCountries.length)];
      const countryNames = namesByCountry[country.code] || namesByCountry['US'];
      const name = countryNames[Math.floor(Math.random() * countryNames.length)];
      const shortName = randomShortName(name);
      const type = types[Math.floor(Math.random() * types.length)];
      
      // Create a unique key for this combination
      const combinationKey = `${shortName}-${country.flag}-${type}`;
      
      // Check if we've shown this exact name recently or this combination
      if (!recentlyShownNames.has(shortName) && !usedCombinations.has(combinationKey)) {
        result = { name: shortName, country: country.flag, type };
        recentlyShownNames.add(shortName);
        usedCombinations.add(combinationKey);
      }
      attempts++;
    }
    
    // If we couldn't find a unique one after many attempts, use any available
    if (!result) {
      const country = shuffledCountries[Math.floor(Math.random() * shuffledCountries.length)];
      const countryNames = namesByCountry[country.code] || namesByCountry['US'];
      const name = countryNames[Math.floor(Math.random() * countryNames.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      result = { name: randomShortName(name), country: country.flag, type };
    }
    
    results.push(result);
  }
  
  return results;
}

interface RecentResultsProps {
  testId: string;
  t?: any;
  i18n?: any;
  isMobile?: boolean;
}

export function RecentResults({ testId, t: tProp, i18n: i18nProp, isMobile: isMobileProp }: RecentResultsProps) {
  const translation = useTranslation();
  const t = tProp || translation.t;
  const i18n = i18nProp || translation.i18n;
  const isMobile = isMobileProp !== undefined ? isMobileProp : useMobile();
  const [results, setResults] = useState<RecentResult[]>(() => generateResults(i18n.language));

  // Helper to get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setResults(generateResults(i18n.language));
    }, 8000); // 8 seconds
    return () => clearInterval(interval);
  }, [i18n.language]);

  return (
    <section style={{
      marginTop: isMobile ? '48px' : '64px',
      textAlign: 'center',
      padding: isMobile ? '0 20px' : '0',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: isMobile ? '24px' : '28px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '24px',
        }}
      >
        {getTranslation(`tests.${testId}.payment.recent_results`, i18n.language === 'tr' ? 'Güncel Sonuçlar' : 'Recent Results')}
      </motion.h2>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(108, 99, 255, 0.15)',
        padding: isMobile ? '20px' : '32px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '12px',
      }}>
        <AnimatePresence mode="wait">
          {results.map((r, i) => (
            <motion.div
              key={`${r.name}-${r.country}-${i}-${Date.now()}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '16px',
                background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: isMobile ? '14px' : '15px',
                color: '#333',
                fontWeight: '500',
              }}>
                <span style={{ fontSize: '20px' }}>{r.country}</span>
                {r.name}
              </span>
              <span style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#6c63ff',
                fontWeight: '600',
                textAlign: 'right',
              }}>
                {r.type}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

