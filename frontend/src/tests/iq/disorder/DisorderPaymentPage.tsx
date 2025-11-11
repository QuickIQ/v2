import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../../../hooks/useMobile';
import { Lock, Shield, CheckCircle, Star } from 'lucide-react';
import { useDisorderTestStore } from '../../../store/disorderTestStore';
import '../../../App.css';

// Recent Results Component
const namesByCountry: Record<string, string[]> = {
  'TR': [
    'Ayşe Doğan', 'Fatma Şen', 'Ali Demir', 'Mehmet Kaya', 'Zeynep Yılmaz', 'Can Özkan', 'Elif Demir', 'Burak Aydın',
    'Selin Yıldız', 'Emre Çelik', 'Deniz Kaya', 'Ceren Arslan', 'Onur Şahin', 'Gizem Özdemir', 'Kerem Yılmaz', 'Seda Aktaş',
    'Murat Demir', 'Pınar Koç', 'Serkan Yıldırım', 'Burcu Öztürk', 'Tolga Aydın', 'Derya Çetin', 'Okan Güneş', 'Aslı Karaca',
    'Barış Özkan', 'Ebru Şimşek', 'Kemal Yücel', 'Gamze Avcı', 'Volkan Kılıç', 'Merve Çakır', 'Hakan Doğan', 'Sibel Arıkan'
  ],
  'SY': [
    'Hassan Khalid', 'Noor Alhashimi', 'Omar Said', 'Lina Aboud', 'Ahmad Mansour', 'Layla Hassan', 'Yusuf Ali', 'Rania Mahmoud',
    'Malik Al-Assad', 'Sara Al-Hamid', 'Tariq Al-Mahmoud', 'Nadia Al-Khalil', 'Karim Al-Zahra', 'Lina Al-Maliki', 'Fadi Al-Saadi', 'Rana Al-Hashimi',
    'Bilal Al-Mosawi', 'Hala Al-Baghdadi', 'Waleed Al-Khouri', 'Maya Al-Shami', 'Ziad Al-Darwish', 'Layla Al-Mansour', 'Samir Al-Haddad', 'Nour Al-Ahmad',
    'Tamer Al-Sabah', 'Rima Al-Farouk', 'Khalil Al-Mustafa', 'Dina Al-Hakim', 'Nabil Al-Rashid', 'Sana Al-Mahmoud', 'Firas Al-Khatib', 'Rania Al-Sabbagh'
  ],
  'BG': [
    'Maria Petrova', 'Ivanka Stoyanova', 'Dimitar Ivanov', 'Elena Georgieva', 'Nikolay Petrov', 'Svetlana Dimitrova',
    'Georgi Nikolov', 'Viktoria Todorova', 'Stefan Dimitrov', 'Radka Stoyanova', 'Ivan Petrov', 'Daniela Georgieva',
    'Martin Hristov', 'Kristina Ivanova', 'Vasil Popov', 'Milena Stoyanova', 'Hristo Dimitrov', 'Yana Petrova',
    'Kaloyan Nikolov', 'Desislava Todorova', 'Radoslav Georgiev', 'Teodora Stoyanova', 'Boris Petrov', 'Simona Dimitrova'
  ],
  'IQ': [
    'Ahmed Al-Maliki', 'Fatima Al-Hashimi', 'Omar Al-Saadi', 'Layla Al-Zahra', 'Hassan Al-Baghdadi', 'Noor Al-Mosawi',
    'Ali Al-Khafaji', 'Zainab Al-Mahmoud', 'Mohammed Al-Rashid', 'Sara Al-Hakim', 'Khalid Al-Sabah', 'Rana Al-Mustafa',
    'Tariq Al-Khatib', 'Lina Al-Farouk', 'Bilal Al-Darwish', 'Nadia Al-Shami', 'Karim Al-Khouri', 'Hala Al-Haddad',
    'Waleed Al-Sabbagh', 'Maya Al-Ahmad', 'Ziad Al-Mansour', 'Layla Al-Hamid', 'Samir Al-Assad', 'Nour Al-Khalil',
    'Tamer Al-Zahra', 'Rima Al-Maliki', 'Khalil Al-Saadi', 'Dina Al-Hashimi', 'Nabil Al-Baghdadi', 'Sana Al-Mosawi'
  ],
  'GR': [
    'Dimitris Papadopoulos', 'Elena Konstantinou', 'Yannis Georgiou', 'Sofia Nikolaou', 'Andreas Petrou', 'Maria Ioannou',
    'Nikos Papadakis', 'Katerina Dimitriou', 'Giorgos Stavros', 'Anna Christou', 'Michalis Petrakis', 'Eleni Papadopoulou',
    'Stavros Georgiou', 'Despina Nikolaou', 'Kostas Ioannou', 'Ioanna Petrou', 'Thanasis Papadopoulos', 'Maria Georgiou',
    'Vasilis Konstantinou', 'Sofia Dimitriou', 'Panagiotis Stavros', 'Elena Christou', 'Dimitris Petrakis', 'Katerina Papadopoulou'
  ],
  'US': [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Emma Martinez', 'James Anderson', 'Olivia Taylor',
    'Robert Williams', 'Jennifer Garcia', 'William Jones', 'Jessica Miller', 'Richard Moore', 'Amanda Jackson', 'Joseph White', 'Melissa Harris',
    'Thomas Martin', 'Michelle Thompson', 'Charles Garcia', 'Ashley Martinez', 'Christopher Robinson', 'Stephanie Clark', 'Daniel Rodriguez', 'Nicole Lewis',
    'Matthew Walker', 'Lauren Hall', 'Anthony Young', 'Rebecca King', 'Mark Wright', 'Samantha Lopez', 'Donald Hill', 'Amanda Green',
    'Steven Adams', 'Rachel Baker', 'Paul Nelson', 'Megan Carter', 'Andrew Mitchell', 'Lauren Perez', 'Joshua Roberts', 'Brittany Turner',
    'Kevin Phillips', 'Heather Campbell', 'Brian Parker', 'Crystal Evans', 'George Edwards', 'Tiffany Collins', 'Edward Stewart', 'Monica Sanchez'
  ],
  'GB': [
    'William Thomas', 'Sophia Jackson', 'Daniel White', 'Isabella Harris', 'Matthew Martin', 'Mia Thompson', 'Oliver James', 'Charlotte Brown',
    'Harry Wilson', 'Amelia Taylor', 'George Moore', 'Olivia Clark', 'Jack Robinson', 'Emily Lewis', 'Charlie Walker', 'Grace Hall',
    'Thomas Young', 'Lily King', 'James Wright', 'Sophia Green', 'Henry Adams', 'Isabella Baker', 'Alexander Nelson', 'Mia Carter',
    'Benjamin Mitchell', 'Charlotte Perez', 'Samuel Roberts', 'Amelia Turner', 'Joseph Phillips', 'Emily Campbell', 'Daniel Parker', 'Sophia Evans',
    'David Edwards', 'Isabella Collins', 'Michael Stewart', 'Mia Sanchez', 'Richard Morris', 'Charlotte Rogers', 'Christopher Reed', 'Amelia Cook',
    'Andrew Morgan', 'Sophia Bell', 'Mark Murphy', 'Isabella Bailey', 'Paul Rivera', 'Mia Cooper', 'Steven Richardson', 'Charlotte Cox'
  ],
  'DE': [
    'Hans Mueller', 'Anna Schmidt', 'Thomas Weber', 'Julia Fischer', 'Michael Becker', 'Lisa Wagner', 'Sebastian Klein', 'Sarah Hoffmann',
    'Andreas Schulz', 'Nicole Bauer', 'Stefan Koch', 'Melanie Richter', 'Christian Lange', 'Stephanie Wolf', 'Daniel Zimmermann', 'Nadine Hartmann',
    'Markus Krüger', 'Julia Lehmann', 'Tobias Werner', 'Sabine Köhler', 'Florian Herrmann', 'Katrin König', 'Jan Schröder', 'Tanja Huber',
    'Sven Mayer', 'Anja Fischer', 'Philipp Fuchs', 'Claudia Peters', 'Martin Scholz', 'Simone Lang', 'Felix Jung', 'Petra Brandt',
    'Lukas Otto', 'Silke Stein', 'Nico Haas', 'Diana Friedrich', 'Maximilian Günther', 'Julia Roth', 'Tim Frank', 'Sandra Keller'
  ],
  'FR': [
    'Pierre Dubois', 'Marie Martin', 'Jean Bernard', 'Sophie Laurent', 'Antoine Moreau', 'Camille Rousseau', 'Lucas Lefebvre', 'Emma Girard',
    'Thomas Petit', 'Julie Durand', 'Nicolas Leroy', 'Céline Moreau', 'Julien Simon', 'Marion Michel', 'Alexandre Roux', 'Claire Vincent',
    'Mathieu Fournier', 'Laura Girard', 'Romain Mercier', 'Émilie Bernard', 'Sébastien Dumont', 'Pauline Rousseau', 'Guillaume Lemaire', 'Manon Blanc',
    'Adrien Garnier', 'Léa Faure', 'Baptiste Roussel', 'Chloé Perrin', 'Maxime Gauthier', 'Julie Lefebvre', 'Hugo Caron', 'Camille Denis',
    'Louis Barbier', 'Sophie Garnier', 'Victor Pons', 'Élise Roux', 'Raphaël Lemoine', 'Inès Fabre', 'Théo Guerin', 'Léna Bonnet'
  ],
  'ES': [
    'Carlos Rodriguez', 'Maria Garcia', 'Jose Martinez', 'Ana Lopez', 'Miguel Sanchez', 'Laura Fernandez', 'Pablo Gonzalez', 'Isabel Torres',
    'Antonio Ruiz', 'Carmen Jimenez', 'Francisco Moreno', 'Isabel Diaz', 'Manuel Romero', 'Elena Navarro', 'Javier Morales', 'Patricia Ramos',
    'Fernando Herrera', 'Sandra Castro', 'Alberto Ortega', 'Monica Delgado', 'Roberto Vazquez', 'Cristina Molina', 'Sergio Campos', 'Beatriz Gil',
    'Rafael Serrano', 'Nuria Blanco', 'Eduardo Marquez', 'Silvia Iglesias', 'Alejandro Peña', 'Rosa Suarez', 'Victor Mendez', 'Teresa Fuentes',
    'Adrian Cortes', 'Lucia Vega', 'Ivan Leon', 'Marta Pardo', 'Oscar Rios', 'Eva Montes', 'Hector Nunez', 'Claudia Soler'
  ]
};

const countries = [
  { flag: '🇹🇷', code: 'TR' },
  { flag: '🇸🇾', code: 'SY' },
  { flag: '🇧🇬', code: 'BG' },
  { flag: '🇮🇶', code: 'IQ' },
  { flag: '🇬🇷', code: 'GR' },
  { flag: '🇺🇸', code: 'US' },
  { flag: '🇬🇧', code: 'GB' },
  { flag: '🇩🇪', code: 'DE' },
  { flag: '🇫🇷', code: 'FR' },
  { flag: '🇪🇸', code: 'ES' }
];

const creativityTypes = {
  en: ['Innovative Mind', 'Adaptive Innovator', 'Emerging Innovator', 'Creative Visionary', 'Boundary Pusher', 'Idea Connector', 'Pattern Seeker', 'Solution Generator'],
  tr: ['Yenilikçi Zihin', 'Uyarlanabilir Yenilikçi', 'Gelişen Yenilikçi', 'Yaratıcı Vizyoner', 'Sınır Zorlayıcı', 'Fikir Bağlayıcı', 'Desen Arayıcı', 'Çözüm Üretici']
};

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

function RecentResults({ t, i18n, isMobile }: { t: any; i18n: any; isMobile: boolean }) {
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
        {getTranslation('tests.disorder.payment.recent_results', i18n.language === 'tr' ? 'Güncel Sonuçlar' : 'Recent Results')}
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

export default function DisorderPaymentPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const { resultLevel, resultData } = useDisorderTestStore();
  const [activeTab, setActiveTab] = useState<'card' | 'googlepay'>('card');
  const [processing, setProcessing] = useState(false);
  
  // Card form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Helper to get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  // Countries list
  const countriesList = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'TR', name: 'Turkey' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'AT', name: 'Austria' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'PL', name: 'Poland' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'GR', name: 'Greece' },
    { code: 'PT', name: 'Portugal' },
    { code: 'IE', name: 'Ireland' },
  ];

  // Validation functions
  const validateCardNumber = (num: string): boolean => {
    const cleaned = num.replace(/\s/g, '');
    return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned);
  };

  const validateExpiry = (exp: string): boolean => {
    const match = exp.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    const month = parseInt(match[1]);
    const year = parseInt('20' + match[2]);
    const now = new Date();
    const expiryDate = new Date(year, month - 1);
    return month >= 1 && month <= 12 && expiryDate > now;
  };

  const validateCVV = (cvv: string): boolean => {
    return /^\d{3}$/.test(cvv);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!cardName.trim()) {
      newErrors.cardName = getTranslation('payment.errors.cardName', 'Cardholder name is required');
    }
    
    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = getTranslation('payment.errors.cardNumber', 'Invalid card number');
    }
    
    if (!validateExpiry(expiry)) {
      newErrors.expiry = getTranslation('payment.errors.expiry', 'Invalid expiration date');
    }
    
    if (!validateCVV(cvv)) {
      newErrors.cvv = getTranslation('payment.errors.cvv', 'Invalid CVV');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToastMessage(getTranslation('payment.errors.validation', 'Please check your card information'));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    
    setProcessing(true);
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On success, navigate to unlock
      navigate('/test/disorder/unlock');
    } catch (error) {
      setProcessing(false);
      setToastMessage(getTranslation('payment.errors.failed', 'Payment failed. Please check your card info.'));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleGooglePayClick = () => {
    setProcessing(true);
    setTimeout(() => {
      navigate('/test/disorder/unlock');
    }, 1000);
  };

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };
  const [testCount, setTestCount] = useState(() => {
    if (typeof window === 'undefined') return 8000;
    const saved = localStorage.getItem('disorderTestsCount');
    const savedTime = localStorage.getItem('disorderTestsTime');
    const now = Date.now();
    
    if (saved && savedTime) {
      const timeDiff = now - parseInt(savedTime);
      if (timeDiff < 86400000) {
        return parseInt(saved);
      }
    }
    
    const newCount = Math.floor(7000 + Math.random() * 2000);
    localStorage.setItem('disorderTestsCount', newCount.toString());
    localStorage.setItem('disorderTestsTime', now.toString());
    return newCount;
  });

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTestCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem('disorderTestsCount', newCount.toString());
        return newCount;
      });
    }, 60000);

    const interval2 = setInterval(() => {
      setTestCount((prev) => {
        const newCount = prev + 2;
        localStorage.setItem('disorderTestsCount', newCount.toString());
        return newCount;
      });
    }, 120000);

    const checkReset = setInterval(() => {
      const savedTime = localStorage.getItem('disorderTestsTime');
      if (savedTime) {
        const timeDiff = Date.now() - parseInt(savedTime);
        if (timeDiff >= 86400000) {
          const newCount = Math.floor(7000 + Math.random() * 2000);
          setTestCount(newCount);
          localStorage.setItem('disorderTestsCount', newCount.toString());
          localStorage.setItem('disorderTestsTime', Date.now().toString());
        }
      }
    }, 3600000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(checkReset);
    };
  }, []);


  const reviews = {
    en: [
      { name: 'Sarah M.', text: 'This test completely changed how I see myself. The insights are incredibly accurate.', city: 'New York, USA', time: '2 hours ago' },
      { name: 'Michael K.', text: 'Worth every penny. The creativity analysis was spot-on and very detailed.', city: 'London, UK', time: '5 hours ago' },
      { name: 'Emma L.', text: 'I finally understand my creative strengths and how to use them in my career. Highly recommend!', city: 'Toronto, Canada', time: '8 hours ago' },
      { name: 'David R.', text: 'The most comprehensive creativity test I\'ve ever taken. The results were eye-opening.', city: 'Sydney, Australia', time: '12 hours ago' },
      { name: 'Sophia T.', text: 'Amazing accuracy! Everything it said about my creative thinking was true. Great investment in self-discovery.', city: 'Berlin, Germany', time: '1 day ago' },
      { name: 'James W.', text: 'The detailed report helped me understand my creative process better. Very insightful!', city: 'Los Angeles, USA', time: '2 days ago' },
      { name: 'Olivia H.', text: 'I was skeptical at first, but the results were spot-on. Highly recommend to everyone!', city: 'Chicago, USA', time: '3 days ago' },
      { name: 'Noah B.', text: 'Best creativity test I\'ve taken. The career recommendations were exactly what I needed.', city: 'Miami, USA', time: '4 days ago' },
      { name: 'Isabella S.', text: 'The analysis was incredibly detailed and accurate. It helped me understand myself better.', city: 'Seattle, USA', time: '5 days ago' },
    ],
    tr: [
      { name: 'Rüya G.', text: 'Hayata bakış açımı yeniden düşünmemi sağladı. Sonuçlar gerçekten çok doğruydu.', city: 'İzmir, Türkiye', time: '3 saat önce' },
      { name: 'Ahmet C.', text: 'Sadece bir testte bu kadar netlik. Her kuruşuna değer.', city: 'Ankara, Türkiye', time: '6 saat önce' },
      { name: 'Abigail Y.', text: 'Her şey göz önünde bulundurulduğunda, buna değer. Yaratıcılık analizi çok detaylı.', city: 'İstanbul, Türkiye', time: '9 saat önce' },
      { name: 'Mehmet D.', text: 'Yaratıcı güçlü yönlerimi ve nasıl kullanacağımı nihayet anladım. Kesinlikle tavsiye ederim!', city: 'Bursa, Türkiye', time: '1 gün önce' },
      { name: 'Zeynep K.', text: 'Aldığım en kapsamlı yaratıcılık testi. Sonuçlar gerçekten göz açıcıydı.', city: 'Antalya, Türkiye', time: '2 gün önce' },
      { name: 'Can Y.', text: 'Detaylı rapor yaratıcı sürecimi daha iyi anlamama yardımcı oldu. Çok içgörülü!', city: 'Gaziantep, Türkiye', time: '3 gün önce' },
      { name: 'Elif M.', text: 'Başta şüpheliydim ama sonuçlar çok doğruydu. Herkese kesinlikle tavsiye ederim!', city: 'Konya, Türkiye', time: '4 gün önce' },
      { name: 'Burak A.', text: 'Aldığım en iyi yaratıcılık testi. Kariyer önerileri tam ihtiyacım olan şeydi.', city: 'Adana, Türkiye', time: '5 gün önce' },
      { name: 'Selin N.', text: 'Analiz inanılmaz derecede detaylı ve doğruydu. Kendimi daha iyi anlamama yardımcı oldu.', city: 'Trabzon, Türkiye', time: '6 gün önce' },
    ]
  };

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const currentReviews = reviews[i18n.language as 'en' | 'tr'] || reviews.en;
  
  // Create extended array for seamless infinite loop (duplicate first 3 at the end)
  const extendedReviews = [...currentReviews, ...currentReviews.slice(0, 3)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => {
        const nextIndex = prev + 1;
        // If we've reached the end of original reviews, reset to 0 for seamless loop
        if (nextIndex >= currentReviews.length) {
          return 0;
        }
        return nextIndex;
      });
    }, 6000); // Every 6 seconds
    return () => clearInterval(interval);
  }, [currentReviews.length]);

  const getResultTitle = () => {
    if (resultData?.title) {
      return resultData.title;
    }
    if (resultLevel === 'excellent') return 'Creative Thinker – The Innovative Mind';
    if (resultLevel === 'good') return 'Creative Thinker – The Adaptive Innovator';
    return 'Creative Thinker – The Emerging Innovator';
  };

  const getResultEmojis = () => {
    if (resultLevel === 'excellent') return ['💡', '✨', '🚀'];
    if (resultLevel === 'good') return ['🎨', '🌟', '💫'];
    return ['🌱', '📚', '🔍'];
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '100px' : '120px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Top Banner: Celebration-style result ready banner */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative',
            textAlign: 'center',
            marginBottom: isMobile ? '32px' : '48px',
            padding: isMobile ? '48px 24px' : '48px 40px',
            background: 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(167, 139, 250, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >

          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <h1 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '8px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}>
              {getTranslation('payment.resultBanner.title', i18n.language === 'tr' 
                ? 'Kişisel analiz raporun hazır!' 
                : 'Your personalized insights are ready!')}
            </h1>
            <p style={{
              fontSize: isMobile ? '14px' : '16px',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              maxWidth: '600px',
              marginBottom: '8px',
            }}>
              {getTranslation('payment.resultBanner.subtitle', i18n.language === 'tr'
                ? 'Cevaplarına özel olarak hazırlanmış yapay zekâ destekli sonuçlarını şimdi keşfet.'
                : 'Unlock your full results, crafted by our AI based on your unique answers.')}
            </p>
            <motion.button
              onClick={() => {
                const paymentSection = document.getElementById('payment-section');
                if (paymentSection) {
                  paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '14px 32px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                color: '#6C63FF',
                fontWeight: '700',
                fontSize: isMobile ? '16px' : '18px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
              }}
            >
              {getTranslation('payment.resultBanner.button', i18n.language === 'tr' 
                ? 'Sonucumu Gör ↓' 
                : 'See My Result ↓')}
            </motion.button>
          </div>
        </motion.section>

        {/* Result Preview Section */}
        {resultLevel && resultData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'relative',
              maxWidth: '700px',
              margin: '0 auto 48px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 255, 1) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              boxShadow: '0 24px 80px rgba(108, 99, 255, 0.2), 0 0 0 1px rgba(108, 99, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              padding: isMobile ? '40px 28px' : '56px 48px',
              textAlign: 'center',
              border: '1px solid rgba(108, 99, 255, 0.15)',
              overflow: 'hidden',
            }}
          >
            {/* Decorative gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '200px',
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.08) 0%, rgba(103, 232, 249, 0.08) 100%)',
              borderRadius: '32px 32px 0 0',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '1.5px',
              color: '#6c63ff',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              {getTranslation('tests.disorder.payment.your_result', 'Your Creativity Level')}
            </p>
            
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '500',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}>
              {getTranslation('tests.disorder.payment.blueprint_text', 'Your creative thinking analysis has been generated.')}
            </p>

            {/* Result Title */}
            <h1 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
              lineHeight: '1.2',
            }}>
              <div>Creative Thinker</div>
              <div style={{ 
                fontSize: isMobile ? '24px' : '36px', 
                marginTop: '4px',
                background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {(() => {
                  const title = getResultTitle();
                  const parts = title.split(/[–—]/).map(s => s.trim());
                  return parts.length > 1 ? parts[1] : '';
                })()}
              </div>
            </h1>

            {/* Animated Emoji Background */}
            <div style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '24px',
              height: isMobile ? '60px' : '80px',
            }}>
              <div style={{
                position: 'absolute',
                width: isMobile ? '80px' : '96px',
                height: isMobile ? '80px' : '96px',
                background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                opacity: 0.3,
                animation: 'pulse 3s ease-in-out infinite',
              }} />
              
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                zIndex: 1,
              }}>
                {getResultEmojis().map((emoji, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: isMobile ? '28px' : '36px',
                      display: 'inline-block',
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview Points */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '32px',
            }}>
              {resultData.insights?.slice(0, 3).map((insight, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.95) 100%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(108, 99, 255, 0.2)',
                    boxShadow: '0 4px 16px rgba(108, 99, 255, 0.1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <p style={{
                    fontSize: '13px',
                    color: '#555',
                    lineHeight: '1.6',
                    fontWeight: '500',
                    margin: 0,
                  }}>
                    {insight}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Lock Message */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                padding: isMobile ? '32px 24px' : '40px 32px',
                background: 'linear-gradient(135deg, rgba(251, 234, 255, 0.8) 0%, rgba(255, 244, 240, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                border: '2px dashed rgba(108, 99, 255, 0.4)',
                textAlign: 'center',
                marginTop: '32px',
                boxShadow: '0 8px 24px rgba(108, 99, 255, 0.15)',
                position: 'relative',
              }}
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{
                  fontSize: '40px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                🔒
              </motion.div>
              <p style={{
                fontSize: isMobile ? '15px' : '16px',
                color: '#555',
                lineHeight: '1.7',
                fontWeight: '500',
                marginBottom: '24px',
              }}>
                {getTranslation('tests.disorder.payment.locked_subtext', 'Your full detailed report is ready — including creative strategies, growth areas, and personalized insights.')}
              </p>
              <motion.button
                onClick={() => {
                  const paymentSection = document.getElementById('payment-section');
                  if (paymentSection) {
                    paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 24px rgba(108, 99, 255, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: isMobile ? '15px' : '17px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(108, 99, 255, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                🔓 {getTranslation('tests.disorder.payment.unlock_button', 'Unlock Detailed Result')}
              </motion.button>
            </motion.div>
            </div>
          </motion.div>
        ) : null}

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '32px' : '48px',
          }}
        >
          <motion.p
            key={testCount}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#888',
              fontWeight: '500',
            }}
          >
            {getTranslation('tests.disorder.payment.tests_completed', i18n.language === 'tr' ? 'Bugün' : 'Today')} <span style={{ fontWeight: '700', color: '#6c63ff' }}>{testCount.toLocaleString()}</span> {getTranslation('tests.disorder.payment.tests_completed_suffix', i18n.language === 'tr' ? 'kişi testi tamamladı' : 'people completed the test')}
          </motion.p>
        </motion.div>

        {/* Why Trust QuickIQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
            marginBottom: '32px',
          }}>
            {getTranslation('tests.disorder.payment.why_trust', i18n.language === 'tr' ? 'Neden QuickIQ\'ya Güvenmelisiniz?' : 'Why Trust QuickIQ?')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '24px',
            marginBottom: '32px',
          }}>
            {[
              {
                icon: <Shield size={32} />,
                title: getTranslation('tests.disorder.payment.trust_feature1_title', i18n.language === 'tr' ? 'Yapay Zeka Destekli Yaratıcılık Analizi' : 'AI-Powered Creativity Analysis'),
                desc: getTranslation('tests.disorder.payment.trust_feature1_desc', i18n.language === 'tr' ? 'Gelişmiş algoritmalarla yaratıcı düşünme tarzınızın derinlemesine analizi.' : 'Deep analysis of your creative thinking style with advanced algorithms.'),
              },
              {
                icon: <CheckCircle size={32} />,
                title: getTranslation('tests.disorder.payment.trust_feature2_title', i18n.language === 'tr' ? 'Uygulanabilir İçgörüler' : 'Actionable Insights'),
                desc: getTranslation('tests.disorder.payment.trust_feature2_desc', i18n.language === 'tr' ? 'Gerçek hayatta kullanabileceğiniz pratik tavsiyeler.' : 'Practical advice you can use in real life.'),
              },
              {
                icon: <Lock size={32} />,
                title: getTranslation('tests.disorder.payment.trust_feature3_title', i18n.language === 'tr' ? 'Kişiselleştirilmiş Gelişim Planı' : 'Personalized Growth Plan'),
                desc: getTranslation('tests.disorder.payment.trust_feature3_desc', i18n.language === 'tr' ? 'Size özel hazırlanmış kapsamlı gelişim stratejisi.' : 'Comprehensive growth strategy tailored just for you.'),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '8px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
            marginBottom: '8px',
          }}>
            {getTranslation('tests.disorder.payment.reviews', i18n.language === 'tr' ? 'Yorumlar' : 'Reviews')}
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '32px',
          }}>
            {getTranslation('tests.disorder.payment.reviews_subtitle', i18n.language === 'tr' ? 'Mükemmel ⭐ 4.7 puan — 1769 yorum' : 'Excellent ⭐ 4.7 rating — 1769 reviews')}
          </p>

          <div style={{
            position: 'relative',
            overflow: 'hidden',
            maxWidth: isMobile ? '100%' : '1040px',
            margin: '0 auto',
            padding: isMobile ? '0 10px' : '0 20px',
          }}>
            <div style={{
              display: 'flex',
              gap: '20px',
              transform: `translateX(-${currentReviewIndex * (isMobile ? 320 : 340)}px)`,
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}>
              {extendedReviews.map((review, index) => {
                const actualIndex = index % currentReviews.length;
                return (
                  <motion.div
                    key={`${actualIndex}-${index}`}
                    style={{
                      minWidth: isMobile ? '300px' : '320px',
                      width: isMobile ? '300px' : '320px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '24px',
                      padding: '24px',
                      boxShadow: 'none',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}>
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#333',
                      }}>
                        {review.name}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                        ))}
                      </div>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: '#6c63ff',
                      fontWeight: '600',
                      marginBottom: '12px',
                    }}>
                      {getTranslation('tests.disorder.payment.verified_customer', i18n.language === 'tr' ? 'Doğrulanmış Müşteri' : 'Verified Customer')}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '12px',
                    }}>
                      {review.text}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#999',
                    }}>
                      {review.city} • {review.time}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '16px',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        >
          <p style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6',
          }}>
            {getTranslation('tests.disorder.payment.footer', i18n.language === 'tr'
              ? 'Başarılı ödemeden sonra sonuçlarınıza yönlendirileceksiniz. Verileriniz gizli tutulur.'
              : 'You\'ll be redirected to your results after successful payment. Your data remains private.')}
          </p>
        </motion.div>

        {/* Recent Results Section */}
        <RecentResults t={t} i18n={i18n} isMobile={isMobile} />

        {/* Payment Options Section */}
        <div id="payment-section" style={{ marginTop: '40px', scrollMarginTop: '100px' }}>
          {/* Divider with text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '32px' : '40px',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.3), transparent)',
              }} />
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#6c63ff',
                fontWeight: '600',
                padding: '0 16px',
                whiteSpace: 'nowrap',
              }}>
                {getTranslation('payment.completeTrial', 'Complete Your 7-Day Trial Securely')}
              </p>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.3), transparent)',
              }} />
            </div>
          </motion.div>

          {/* 3-Column Layout: Trust | Payment | Quick Facts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '280px 1fr 280px',
            gap: isMobile ? '32px' : '32px',
            maxWidth: isMobile ? '100%' : '1400px',
            margin: '0 auto 48px',
            alignItems: 'start',
          }}>
            {/* LEFT COLUMN: Why Trust QuickIQ? */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                maxWidth: isMobile ? '100%' : '280px',
              }}
            >
              <h3 style={{
                fontSize: isMobile ? '20px' : '22px',
                fontWeight: '700',
                color: '#333',
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {getTranslation('trust.title', i18n.language === 'tr' ? 'Neden QuickIQ\'ya Güvenmelisiniz?' : 'Why Trust QuickIQ?')}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                {/* Trust Point 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3,
                    hover: { duration: 0.15, ease: 'easeOut' },
                    default: { duration: 0.2, ease: 'easeIn' }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    zIndex: 10,
                    boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 16px rgba(108, 99, 255, 0.1)',
                    border: '1px solid rgba(108, 99, 255, 0.15)',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    🧠
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#333',
                    marginBottom: '8px',
                  }}>
                    {getTranslation('trust.aiAccuracy', i18n.language === 'tr' ? 'Yapay Zeka Destekli Doğruluk' : 'AI-Powered Accuracy')}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    margin: 0,
                  }}>
                    {getTranslation('trust.aiAccuracyDesc', i18n.language === 'tr' 
                      ? 'Binlerce test sonucuyla doğrulanmış bilişsel AI modelleri tarafından üretilen içgörüler kazanın.'
                      : 'Gain insights generated by cognitive AI models verified by thousands of test results.')}
                  </p>
                </motion.div>

                {/* Trust Point 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.4,
                    hover: { duration: 0.15, ease: 'easeOut' },
                    default: { duration: 0.2, ease: 'easeIn' }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    zIndex: 10,
                    boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 16px rgba(108, 99, 255, 0.1)',
                    border: '1px solid rgba(108, 99, 255, 0.15)',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    🔒
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#333',
                    marginBottom: '8px',
                  }}>
                    {getTranslation('trust.dataPrivacy', i18n.language === 'tr' ? 'Veri Gizliliği' : 'Data Privacy')}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    margin: 0,
                  }}>
                    {getTranslation('trust.dataPrivacyDesc', i18n.language === 'tr' 
                      ? 'Yanıtlarınız şifrelenir. Hiçbir kişisel veri saklanmaz.'
                      : 'Your responses are encrypted. No personal data is ever stored.')}
                  </p>
                </motion.div>

                {/* Trust Point 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5,
                    hover: { duration: 0.15, ease: 'easeOut' },
                    default: { duration: 0.2, ease: 'easeIn' }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    zIndex: 10,
                    boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 16px rgba(108, 99, 255, 0.1)',
                    border: '1px solid rgba(108, 99, 255, 0.15)',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    ⚡
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#333',
                    marginBottom: '8px',
                  }}>
                    {getTranslation('trust.actionableInsights', i18n.language === 'tr' ? 'Uygulanabilir İçgörüler' : 'Actionable Insights')}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    margin: 0,
                  }}>
                    {getTranslation('trust.actionableInsightsDesc', i18n.language === 'tr' 
                      ? 'Gerçek hayatta hemen uygulayabileceğiniz pratik geri bildirim alın.'
                      : 'Get practical feedback you can apply immediately in real life.')}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* CENTER COLUMN: Payment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                boxShadow: '0 20px 60px rgba(108, 99, 255, 0.2), 0 0 0 1px rgba(108, 99, 255, 0.1)',
                padding: isMobile ? '32px 24px' : '48px 40px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
            {/* Glowing border effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(123, 108, 255, 0.1) 0%, rgba(102, 200, 255, 0.1) 100%)',
              borderRadius: '32px',
              padding: '2px',
              zIndex: 0,
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '30px',
              }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '8px',
                }}>
                  <span style={{ color: '#333' }}>$1.95 USD</span>
                </h2>
                <p style={{
                  fontSize: isMobile ? '13px' : '14px',
                  color: '#666',
                  marginTop: '8px',
                }}>
                  {getTranslation('payment.instantAccess', 'Instant access after secure payment • Cancel anytime.')}
                </p>
              </div>

              {/* Tabs */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '32px',
                background: 'rgba(108, 99, 255, 0.05)',
                borderRadius: '16px',
                padding: '4px',
              }}>
                <motion.button
                  onClick={() => setActiveTab('card')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: activeTab === 'card' 
                      ? 'linear-gradient(135deg, #7B6CFF 0%, #66C8FF 100%)'
                      : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: activeTab === 'card' ? 'white' : '#666',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  💳 {getTranslation('payment.tab.card', 'Pay with Card')}
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('googlepay')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: activeTab === 'googlepay'
                      ? 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)'
                      : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: activeTab === 'googlepay' ? 'white' : '#666',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  🪙 {getTranslation('payment.tab.googlepay', 'Pay with Google Pay')}
                </motion.button>
              </div>

              {/* Card Form (shown when card tab is active) */}
              {activeTab === 'card' && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleCardSubmit}
                  style={{ marginBottom: '24px' }}
                >
                  {/* Cardholder Name */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '8px',
                    }}>
                      {getTranslation('payment.cardName', 'Cardholder Name')}
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => {
                        setCardName(e.target.value);
                        if (errors.cardName) {
                          setErrors(prev => ({ ...prev, cardName: '' }));
                        }
                      }}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: `2px solid ${errors.cardName ? '#e74c3c' : '#e0e0e0'}`,
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        background: 'white',
                        boxShadow: errors.cardName ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.cardName ? '#e74c3c' : '#7B6CFF';
                        e.target.style.boxShadow = `0 0 0 3px ${errors.cardName ? 'rgba(231, 76, 60, 0.1)' : 'rgba(123, 108, 255, 0.1)'}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.cardName ? '#e74c3c' : '#e0e0e0';
                        e.target.style.boxShadow = errors.cardName ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)';
                      }}
                    />
                    {errors.cardName && (
                      <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  {/* Card Number */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '8px',
                    }}>
                      {getTranslation('payment.cardNumber', 'Card Number')}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value.replace(/\D/g, ''));
                        setCardNumber(formatted);
                        if (errors.cardNumber) {
                          setErrors(prev => ({ ...prev, cardNumber: '' }));
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: `2px solid ${errors.cardNumber ? '#e74c3c' : '#e0e0e0'}`,
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        background: 'white',
                        boxShadow: errors.cardNumber ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.cardNumber ? '#e74c3c' : '#7B6CFF';
                        e.target.style.boxShadow = `0 0 0 3px ${errors.cardNumber ? 'rgba(231, 76, 60, 0.1)' : 'rgba(123, 108, 255, 0.1)'}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.cardNumber ? '#e74c3c' : '#e0e0e0';
                        e.target.style.boxShadow = errors.cardNumber ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)';
                      }}
                    />
                    {errors.cardNumber && (
                      <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  {/* Expiry and CVV */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '20px',
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '8px',
                      }}>
                        {getTranslation('payment.expiry', 'Expiration Date')}
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          const formatted = val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val;
                          setExpiry(formatted);
                          if (errors.expiry) {
                            setErrors(prev => ({ ...prev, expiry: '' }));
                          }
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          border: `2px solid ${errors.expiry ? '#e74c3c' : '#e0e0e0'}`,
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          background: 'white',
                          boxShadow: errors.expiry ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = errors.expiry ? '#e74c3c' : '#7B6CFF';
                          e.target.style.boxShadow = `0 0 0 3px ${errors.expiry ? 'rgba(231, 76, 60, 0.1)' : 'rgba(123, 108, 255, 0.1)'}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.expiry ? '#e74c3c' : '#e0e0e0';
                          e.target.style.boxShadow = errors.expiry ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)';
                        }}
                      />
                      {errors.expiry && (
                        <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                          {errors.expiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '8px',
                      }}>
                        {getTranslation('payment.cvv', 'CVC')}
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => {
                          setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
                          if (errors.cvv) {
                            setErrors(prev => ({ ...prev, cvv: '' }));
                          }
                        }}
                        placeholder="123"
                        maxLength={3}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          border: `2px solid ${errors.cvv ? '#e74c3c' : '#e0e0e0'}`,
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          background: 'white',
                          boxShadow: errors.cvv ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = errors.cvv ? '#e74c3c' : '#7B6CFF';
                          e.target.style.boxShadow = `0 0 0 3px ${errors.cvv ? 'rgba(231, 76, 60, 0.1)' : 'rgba(123, 108, 255, 0.1)'}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.cvv ? '#e74c3c' : '#e0e0e0';
                          e.target.style.boxShadow = errors.cvv ? '0 0 0 3px rgba(231, 76, 60, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)';
                        }}
                      />
                      {errors.cvv && (
                        <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Save Card Checkbox */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#666',
                    }}>
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: '#7B6CFF',
                        }}
                      />
                      <span>
                        {getTranslation('payment.saveCard', 'Save card securely for faster checkout')}
                      </span>
                    </label>
                  </div>

                  {/* Encryption Message */}
                  <p style={{
                    fontSize: '12px',
                    color: '#888',
                    textAlign: 'center',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}>
                    🔒 {getTranslation('payment.encryption', 'All transactions are encrypted and processed via Stripe. We never store card data.')}
                  </p>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={processing}
                    whileHover={!processing ? { scale: 1.02, filter: 'brightness(1.01)' } : {}}
                    whileTap={!processing ? { scale: 0.98 } : {}}
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: processing
                        ? '#ccc'
                        : 'linear-gradient(90deg, #7B6CFF 0%, #66C8FF 100%)',
                      border: 'none',
                      borderRadius: '16px',
                      color: 'white',
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '700',
                      cursor: processing ? 'not-allowed' : 'pointer',
                      boxShadow: processing ? 'none' : '0 4px 20px rgba(123, 108, 255, 0.4)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      marginBottom: '16px',
                    }}
                  >
                    {processing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                          }}
                        />
                        {getTranslation('payment.processing', 'Processing...')}
                      </>
                    ) : (
                      getTranslation('payment.payNow', 'Pay Now')
                    )}
                  </motion.button>
                </motion.form>
              )}

              {/* Google Pay (shown when googlepay tab is active) */}
              {activeTab === 'googlepay' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: '24px' }}
                >
                  <motion.button
                    onClick={handleGooglePayClick}
                    disabled={processing}
                    whileHover={!processing ? { scale: 1.02 } : {}}
                    whileTap={!processing ? { scale: 0.98 } : {}}
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: processing
                        ? '#ccc'
                        : 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                      border: 'none',
                      borderRadius: '16px',
                      color: 'white',
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '700',
                      cursor: processing ? 'not-allowed' : 'pointer',
                      boxShadow: processing ? 'none' : '0 4px 20px rgba(66, 133, 244, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      marginBottom: '16px',
                    }}
                  >
                    {processing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                          }}
                        />
                        {getTranslation('payment.processing', 'Processing...')}
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        {getTranslation('payment.googlePay', 'Pay with Google Pay')}
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Trial Footer */}
              <p style={{
                fontSize: '13px',
                color: '#888',
                textAlign: 'center',
                lineHeight: '1.5',
                marginTop: '24px',
              }}>
                / 7-Day Trial {getTranslation('tests.disorder.payment.trial_footer', i18n.language === 'tr' 
                  ? 'Sonrasında ayda ₺1,199 — istediğiniz zaman iptal edebilirsiniz.'
                  : 'Then $39.90 per month after trial — cancel anytime.')}
              </p>

              {/* Trust Badges */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isMobile ? '12px' : '20px',
                marginTop: '24px',
                flexWrap: 'wrap',
                fontSize: '12px',
                color: '#666',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✅ {getTranslation('payment.verified', 'Verified by Stripe')}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  🔒 {getTranslation('payment.secure', 'Secure SSL')}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  💰 {getTranslation('payment.refund', '7-Day Refund Policy')}
                </span>
              </div>
            </div>
          </motion.div>

            {/* RIGHT COLUMN: QuickIQ in Numbers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                maxWidth: isMobile ? '100%' : '280px',
              }}
            >
              <h3 style={{
                fontSize: isMobile ? '20px' : '22px',
                fontWeight: '700',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ fontSize: isMobile ? '24px' : '26px' }}>📊</span>
                <span style={{
                  background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {getTranslation('trust.quickFacts', i18n.language === 'tr' ? 'QuickIQ Rakamlarla' : 'QuickIQ by the Numbers')}
                </span>
              </h3>

              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  zIndex: 10,
                  boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
                }}
                transition={{ 
                  hover: { duration: 0.15, ease: 'easeOut' },
                  default: { duration: 0.2, ease: 'easeIn' }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  padding: '28px 24px',
                  boxShadow: '0 8px 24px rgba(108, 99, 255, 0.15)',
                  border: '1px solid rgba(108, 99, 255, 0.2)',
                  position: 'relative',
                }}
              >

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '24px',
                }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>•</span>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0,
                    }}>
                      {getTranslation('trust.testsCompleted', i18n.language === 'tr' 
                        ? `Bugün ${testCount.toLocaleString()} test tamamlandı`
                        : `Over ${testCount.toLocaleString()} tests completed today`)}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>•</span>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0,
                    }}>
                      {getTranslation('trust.countries', i18n.language === 'tr' 
                        ? '80+ ülkeden kullanıcılar tarafından güveniliyor'
                        : 'Trusted by users from 80+ countries')}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>•</span>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0,
                    }}>
                      {getTranslation('trust.rating', i18n.language === 'tr' 
                        ? '4.9/5 doğruluk geri bildirimi puanı'
                        : 'Rated 4.9/5 accuracy feedback')}
                    </p>
                  </motion.div>
                </div>

                {/* User Avatars */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(108, 99, 255, 0.1)',
                }}>
                  {['🇹🇷', '🇺🇸', '🇬🇧', '🇩🇪'].slice(0, 3).map((flag, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)',
                        border: '2px solid white',
                        marginLeft: index > 0 ? '-8px' : '0',
                      }}
                    >
                      {flag}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(155, 201, 237, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#6c63ff',
                      boxShadow: '0 4px 12px rgba(108, 99, 255, 0.2)',
                      border: '2px solid rgba(108, 99, 255, 0.3)',
                      marginLeft: '-8px',
                    }}
                  >
                    +184
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            marginTop: isMobile ? '24px' : '32px',
            marginBottom: isMobile ? '48px' : '64px',
            padding: isMobile ? '0 20px' : '0',
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px',
              padding: isMobile ? '0 20px' : '0',
            }}>
              {/* Feature Card 1: Advanced Personality Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  zIndex: 10,
                  boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
                }}
                transition={{ 
                  hover: { duration: 0.15, ease: 'easeOut' },
                  default: { duration: 0.2, ease: 'easeIn' }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(108, 99, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #66C8FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 16px rgba(108, 99, 255, 0.2)',
                }}>
                  🧠
                </div>
                <h3 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                }}>
                  {getTranslation('payment.features.advancedPersonalityMap.title', i18n.language === 'tr' 
                    ? 'Gelişmiş Kişilik Haritası' 
                    : 'Advanced Personality Map')}
                </h3>
                <p style={{
                  fontSize: isMobile ? '14px' : '15px',
                  color: '#666',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {getTranslation('payment.features.advancedPersonalityMap.desc', i18n.language === 'tr' 
                    ? 'Kendi kendinizi ayrıntılı bir şekilde anlamanıza yardımcı olan yapay zeka destekli bir kişilik çerçevesine sahip olun.'
                    : 'Gain an AI-powered framework to understand yourself in rich detail.')}
                </p>
              </motion.div>

              {/* Feature Card 2: Applicable Personal Initiatives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  zIndex: 10,
                  boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
                }}
                transition={{ 
                  hover: { duration: 0.15, ease: 'easeOut' },
                  default: { duration: 0.2, ease: 'easeIn' }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(108, 99, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #66C8FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 16px rgba(108, 99, 255, 0.2)',
                }}>
                  ⚙️
                </div>
                <h3 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                }}>
                  {getTranslation('payment.features.applicableInitiatives.title', i18n.language === 'tr' 
                    ? 'Uygulanabilir Kişisel İnisiyatifler' 
                    : 'Applicable Personal Initiatives')}
                </h3>
                <p style={{
                  fontSize: isMobile ? '14px' : '15px',
                  color: '#666',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {getTranslation('payment.features.applicableInitiatives.desc', i18n.language === 'tr' 
                    ? 'Güçlü bilgileri hemen ilişkilerinizi, işinize ve kişisel büyümeye geliştirin.'
                    : 'Instantly apply strong insights to improve your relationships, work, and personal growth.')}
                </p>
              </motion.div>

              {/* Feature Card 3: Personalized Growth Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  zIndex: 10,
                  boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
                }}
                transition={{ 
                  hover: { duration: 0.15, ease: 'easeOut' },
                  default: { duration: 0.2, ease: 'easeIn' }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(108, 99, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #66C8FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 16px rgba(108, 99, 255, 0.2)',
                }}>
                  🎯
                </div>
                <h3 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '12px',
                  lineHeight: '1.3',
                }}>
                  {getTranslation('payment.features.personalizedPlan.title', i18n.language === 'tr' 
                    ? 'Kişiselleştirilmiş Gelişim Planı' 
                    : 'Personalized Growth Plan')}
                </h3>
                <p style={{
                  fontSize: isMobile ? '14px' : '15px',
                  color: '#666',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {getTranslation('payment.features.personalizedPlan.desc', i18n.language === 'tr' 
                    ? 'Kendi bilginizi gerçek dünya başarısına dönüştürmek için kişiselleştirilmiş kılavuzla.'
                    : 'Turn your awareness into real-world success through a tailored improvement guide.')}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#e74c3c',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(231, 76, 60, 0.4)',
              zIndex: 10000,
              maxWidth: '90%',
              textAlign: 'center',
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

