import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../../../hooks/useMobile';
import { useTestsCompletedCounter } from '../../../hooks/useTestsCompletedCounter';
import { Lock, Shield, CheckCircle, Star, ArrowDown } from 'lucide-react';
import { useAttentionSpanTestStore } from '../../../store/attentionSpanTestStore';
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
        {getTranslation('tests.attentionSpan.payment.recent_results', i18n.language === 'tr' ? 'Güncel Sonuçlar' : 'Recent Results')}
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

export default function AttentionSpanPaymentPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);
  const { resultLevel, resultData } = useAttentionSpanTestStore();
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
      navigate('/test/attention-span/unlock');
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
      navigate('/test/attention-span/unlock');
    }, 1000);
  };

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };
  const { count: testCount, text: testsCompletedText, formattedCount } = useTestsCompletedCounter();


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
    if (resultLevel === 'excellent') return ['🎯', '✨', '💚'];
    if (resultLevel === 'good') return ['🎯', '🌟', '💚'];
    return ['🎯', '🌟', '💚'];
  };

  // Placeholder insights that always show
  const getPlaceholderInsights = () => [
    'Understanding Your Patterns: Discover how your mind processes emotions and thoughts',
    'Emotional Awareness: Learn to recognize and manage your emotional responses',
    'Thought Balance: Explore the relationship between your thoughts and feelings',
    'Growth Strategies: Practical steps to improve your mental well-being',
    'Future Potential: Unlock your path to emotional resilience and balance',
    'Self-Care Essentials: Build daily habits that support your mental wellness'
  ];

  // Get insights to display (use resultData if available, otherwise use placeholders)
  const displayInsights = resultData?.insights && resultData.insights.length > 0 
    ? resultData.insights 
    : getPlaceholderInsights();

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
        {/* AI Aurora Payment Card - Redesigned */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          style={{
            position: 'relative',
            width: '90vw',
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: isMobile ? '48px' : '64px',
            padding: isMobile ? '40px 24px' : '80px 60px',
            background: 'linear-gradient(135deg, #7B5CFF 0%, #5BE9FF 100%)',
            borderRadius: '28px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: 'inset 0 0 30px rgba(255,255,255,0.05), 0 0 50px rgba(124,90,255,0.35)',
            overflow: 'hidden',
            cursor: 'default',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Subtle Aurora Glow Overlay */}
          <motion.div
            animate={{
              opacity: [0.06, 0.1, 0.06],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.08)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Shimmering Glow Pulse - Hover Effect */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            whileHover={{
              x: '200%',
              opacity: [0, 0.6, 0],
              transition: {
                duration: 1.2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.5,
              }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transform: 'skewX(-20deg)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Slow Gradient Animation */}
          <motion.div
            animate={{
              background: [
                'linear-gradient(135deg, #7B5CFF 0%, #5BE9FF 100%)',
                'linear-gradient(135deg, #6B4CFF 0%, #4BD9FF 100%)',
                'linear-gradient(135deg, #7B5CFF 0%, #5BE9FF 100%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.3,
              zIndex: 0,
            }}
          />

          {/* Brightening Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 0.15,
              transition: { duration: 0.4, ease: 'easeOut' }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
          }}>
            {/* Badge */}
            <motion.div
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                padding: '6px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: '600',
                letterSpacing: '0.5px',
              }}
            >
              ✨ AI-powered insight just for you
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: isMobile ? '28px' : '38px',
                fontWeight: '700',
                color: '#f8f9ff',
                margin: 0,
                lineHeight: '1.3',
                textShadow: '0 2px 12px rgba(0,0,0,0.25)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              Your Mind Holds More Than You Think
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
                }}
              >
                <Star
                  size={isMobile ? 28 : 36}
                  fill="#FFD700"
                  color="#FFD700"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))',
                  }}
                />
              </motion.div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.6',
                maxWidth: '700px',
                margin: '4px 0 0 0',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
              }}
            >
              Unlock your full creative potential — AI has analyzed your answers and crafted a detailed insight just for you.
            </motion.p>

            {/* Main CTA Button */}
            <motion.button
              onClick={() => {
                const paymentSection = document.getElementById('payment-section');
                if (paymentSection) {
                  paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 30px rgba(91,233,255,0.5)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                position: 'relative',
                padding: '18px 42px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                border: 'none',
                borderRadius: '14px',
                color: 'white',
                fontWeight: '700',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ display: 'inline-block' }}>
                Reveal My Hidden Potential
              </span>
              <motion.span
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <ArrowDown size={20} style={{ display: 'block' }} />
              </motion.span>
            </motion.button>
          </div>
        </motion.section>

        {/* The Growing Mind Section - Always Visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'relative',
              maxWidth: '700px',
              margin: '0 auto 48px',
              background: '#ffffff',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
            boxShadow: '0 24px 80px rgba(255, 105, 180, 0.2), 0 0 0 1px rgba(255, 105, 180, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              padding: isMobile ? '40px 28px' : '56px 48px',
              textAlign: 'center',
            border: '1px solid rgba(255, 105, 180, 0.15)',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'all 0.2s ease-out',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
            {/* The Growing Mind Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginBottom: '32px',
            }}>
              {/* Title */}
              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.75rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 50%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                marginBottom: '8px',
                textShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
              }}>
                Your Detailed Attention Span Result
              </h2>

              {/* Decorative Line */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                margin: '8px 0 24px',
              }}>
                <span style={{
                  flex: 1,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #4CAF50, transparent)',
                  maxWidth: '150px',
                }} />
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                  fontSize: '18px',
                    filter: 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.8))',
                  }}
                >
                  🎯
                </motion.span>
                <span style={{
                  flex: 1,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #4CAF50, transparent)',
                  maxWidth: '150px',
                }} />
              </div>

              {/* Emoji Group - Mobile: Below Title */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '30px',
                    marginTop: '8px',
                    marginBottom: '16px',
                    textAlign: 'center',
                  }}
                >
                  {getResultEmojis().map((emoji, index) => (
                    <span key={index} style={{ display: 'inline-block' }}>
                      {emoji}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Symmetric 6-Card Layout */}
              {!isMobile ? (
                <div style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '26px',
                }}>
                  {/* Top Row: 2 Cards */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isTablet ? '20px' : '26px',
                    width: '100%',
                  }}>
                    {displayInsights.slice(0, 2).map((insight: string, index: number) => {
                      const parts = insight.split(':');
                    const title = parts.length > 1 ? parts[0].trim() : '';
                      const description = parts.length > 1 ? parts.slice(1).join(':').trim() : insight;
                    return (
                      <motion.div
                          key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                        whileHover={{
                          scale: 1.06,
                            boxShadow: '0 0 25px rgba(255,105,180,0.4)',
                            background: 'linear-gradient(135deg, #fff5f8 0%, #ffe8eb 100%)',
                          filter: 'brightness(1.1)',
                          transition: { duration: 0.15, ease: 'easeInOut' }
                        }}
                        style={{
                          width: isTablet ? '240px' : '270px',
                          minHeight: isTablet ? '170px' : '180px',
                            background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
                          borderRadius: '16px',
                            border: '1.5px solid rgba(255,105,180,0.15)',
                            boxShadow: '0 2px 10px rgba(255,105,180,0.1)',
                          padding: '18px 20px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease-in-out',
                          transformOrigin: 'center',
                        }}
                      >
                        {title && (
                          <h4 style={{
                              color: '#4CAF50',
                            fontWeight: '600',
                            fontSize: '16px',
                            margin: '0 0 12px 0',
                            lineHeight: '1.3',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                          }}>
                            {title}
                          </h4>
                        )}
                        <p style={{
                          fontSize: '14.5px',
                          color: '#555',
                          textAlign: 'center',
                          lineHeight: '1.55',
                          margin: 0,
                          filter: 'blur(4px)',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                        }}>
                          {description}
                        </p>
                      </motion.div>
                    );
                    })}
                  </div>

                  {/* Middle Row: 2 Cards */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isTablet ? '20px' : '26px',
                    width: '100%',
                  }}>
                    {displayInsights.slice(2, 4).map((insight: string, index: number) => {
                      const parts = insight.split(':');
                      const title = parts.length > 1 ? parts[0].trim() : '';
                      const description = parts.length > 1 ? parts.slice(1).join(':').trim() : insight;
                      return (
                        <motion.div
                          key={index + 2}
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                          whileHover={{
                            scale: 1.06,
                            boxShadow: '0 0 25px rgba(255,105,180,0.4)',
                            background: 'linear-gradient(135deg, #fff5f8 0%, #ffe8eb 100%)',
                            filter: 'brightness(1.1)',
                            transition: { duration: 0.15, ease: 'easeInOut' }
                          }}
                          style={{
                            width: isTablet ? '240px' : '270px',
                            minHeight: isTablet ? '170px' : '180px',
                            background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
                            borderRadius: '16px',
                            border: '1.5px solid rgba(255,105,180,0.15)',
                            boxShadow: '0 2px 10px rgba(255,105,180,0.1)',
                            padding: '18px 20px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease-in-out',
                            transformOrigin: 'center',
                          }}
                        >
                          {title && (
                            <h4 style={{
                              color: '#4CAF50',
                              fontWeight: '600',
                              fontSize: '16px',
                              margin: '0 0 12px 0',
                              lineHeight: '1.3',
                              userSelect: 'none',
                              WebkitUserSelect: 'none',
                              MozUserSelect: 'none',
                              msUserSelect: 'none',
                            }}>
                              {title}
                            </h4>
                          )}
                          <p style={{
                            fontSize: '14.5px',
                            color: '#555',
                            textAlign: 'center',
                            lineHeight: '1.55',
                            margin: 0,
                            filter: 'blur(4px)',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                          }}>
                            {description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Bottom Row: 2 Cards */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: isTablet ? '20px' : '26px',
                    width: '100%',
                  }}>
                    {displayInsights.slice(4, 6).map((insight: string, index: number) => {
                      const parts = insight.split(':');
                      const title = parts.length > 1 ? parts[0].trim() : '';
                      const description = parts.length > 1 ? parts.slice(1).join(':').trim() : insight;
                      return (
                        <motion.div
                          key={index + 3}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                          whileHover={{
                            scale: 1.06,
                            boxShadow: '0 0 25px rgba(255,105,180,0.4)',
                            background: 'linear-gradient(135deg, #fff5f8 0%, #ffe8eb 100%)',
                            filter: 'brightness(1.1)',
                            transition: { duration: 0.15, ease: 'easeInOut' }
                          }}
                          style={{
                            width: '270px',
                            minHeight: '180px',
                            background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
                            borderRadius: '16px',
                            border: '1.5px solid rgba(255,105,180,0.15)',
                            boxShadow: '0 2px 10px rgba(255,105,180,0.1)',
                            padding: '18px 20px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease-in-out',
                            transformOrigin: 'center',
                          }}
                        >
                          {title && (
                            <h4 style={{
                              color: '#4CAF50',
                              fontWeight: '600',
                              fontSize: '16px',
                              margin: '0 0 12px 0',
                              lineHeight: '1.3',
                              userSelect: 'none',
                              WebkitUserSelect: 'none',
                              MozUserSelect: 'none',
                              msUserSelect: 'none',
                            }}>
                              {title}
                            </h4>
                          )}
                          <p style={{
                            fontSize: '14.5px',
                            color: '#555',
                            textAlign: 'center',
                            lineHeight: '1.55',
                            margin: 0,
                            filter: 'blur(4px)',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                          }}>
                            {description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Mobile: Vertical Stack
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '18px',
                  width: '100%',
                }}>
                  {/* All Cards */}
                  {displayInsights.slice(0, 6).map((insight: string, index: number) => {
                    const parts = insight.split(':');
                    const title = parts.length > 1 ? parts[0].trim() : '';
                    const description = parts.length > 1 ? parts.slice(1).join(':').trim() : insight;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 25px rgba(255,105,180,0.4)',
                          background: 'linear-gradient(135deg, #fff5f8 0%, #ffe8eb 100%)',
                          filter: 'brightness(1.1)',
                          transition: { duration: 0.15, ease: 'easeInOut' }
                        }}
                        style={{
                          width: '100%',
                          maxWidth: '300px',
                          minHeight: '170px',
                          background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
                          borderRadius: '16px',
                          border: '1.5px solid rgba(255,105,180,0.15)',
                          boxShadow: '0 2px 10px rgba(255,105,180,0.1)',
                          padding: '18px 20px',
                          cursor: 'pointer',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease-in-out',
                          transformOrigin: 'center',
                        }}
                      >
                        {title && (
                          <h4 style={{
                            color: '#4CAF50',
                            fontWeight: '600',
                            fontSize: '16px',
                            margin: '0 0 12px 0',
                            lineHeight: '1.3',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none',
                          }}>
                            {title}
                          </h4>
                        )}
                        <p style={{
                          fontSize: '14.5px',
                          color: '#555',
                          textAlign: 'center',
                          lineHeight: '1.55',
                          margin: 0,
                          filter: 'blur(4px)',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                        }}>
                          {description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Intro Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  marginTop: '32px',
                  background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
                  borderRadius: '20px',
                  padding: isMobile ? '24px 20px' : '32px 28px',
                  border: '2px solid rgba(255, 105, 180, 0.2)',
                  boxShadow: '0 8px 32px rgba(255, 105, 180, 0.15)',
                  textAlign: 'center',
                }}
              >
                <p style={{
                  fontSize: isMobile ? '15px' : '17px',
                  fontWeight: '700',
                  color: '#4CAF50',
                  margin: 0,
                  lineHeight: '1.6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}>
                  <span>THIS IS JUST AN INTRO!</span>
                  <span style={{ fontSize: '20px' }}>☕</span>
                </p>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#666',
                  margin: '12px 0 0 0',
                  lineHeight: '1.5',
                }}>
                  YOU WILL SEE 100X MORE CONTENT WHEN YOU UNLOCK YOUR PERSONALIZED RESULT. IT'S CHEAPER THAN A COFFEE PRICE!☕
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
              background: '#ffffff',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              boxShadow: '0 24px 80px rgba(255, 105, 180, 0.2), 0 0 0 1px rgba(255, 105, 180, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              padding: isMobile ? '40px 28px' : '56px 48px',
              textAlign: 'center',
              border: '1px solid rgba(255, 105, 180, 0.15)',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'all 0.2s ease-out',
            }}
          >
            {/* Unlock Detailed Result Section */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut' }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 40px rgba(255, 105, 180, 0.25)',
                transition: { duration: 0.3 }
              }}
              style={{
                padding: isMobile ? '24px' : '36px 24px',
                background: 'linear-gradient(180deg, #fff0f5 0%, #ffe4e1 100%)',
                borderRadius: '22px',
                border: '2px dashed rgba(255, 105, 180, 0.25)',
                textAlign: 'center',
                marginTop: '32px',
                boxShadow: '0 4px 25px rgba(255, 105, 180, 0.08)',
                position: 'relative',
                transition: 'all 0.3s ease',
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
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                🔒
              </motion.div>
              <p style={{
                fontSize: isMobile ? '15px' : '16px',
                color: '#444',
                lineHeight: '1.6',
                fontWeight: '500',
                marginBottom: '24px',
                maxWidth: '540px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                {getTranslation('tests.attentionSpan.payment.locked_subtext', 'Your personalized insight is waiting — Discover your attention patterns, focus strengths, and concentration blueprint.')}
              </p>
              <motion.button
                onClick={() => {
                  const paymentSection = document.getElementById('payment-section');
                  if (paymentSection) {
                    paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                whileHover={{ 
                  scale: 1.06,
                  boxShadow: '0 10px 25px rgba(108, 99, 255, 0.45)',
                  filter: 'brightness(1.1)',
                  transition: { duration: 0.25, ease: 'easeInOut' }
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '14px 34px',
                  background: 'linear-gradient(90deg, #6C63FF 0%, #9E8DFF 100%)',
                  border: 'none',
                  borderRadius: '14px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: isMobile ? '15px' : '17px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(108, 99, 255, 0.3)',
                  transition: 'all 0.25s ease-in-out',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🔓 {getTranslation('tests.attentionSpan.payment.unlock_button', 'Unlock Detailed Result')}
              </motion.button>
            </motion.div>
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
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: isMobile ? '20px' : '24px',
              color: '#888',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              flexWrap: 'wrap',
            }}
          >
            {i18n.language === 'tr' ? (
              <>
                <span>Bugün</span>
                <motion.span
                  key={testCount}
                  initial={{ scale: 1.3, y: -5 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.5
                  }}
                  style={{
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: isMobile ? '22px' : '26px',
                  }}
                >
                  {formattedCount}
                </motion.span>
                <span>test tamamlandı!</span>
              </>
            ) : (
              <>
                <span>Today</span>
                <motion.span
                  key={testCount}
                  initial={{ scale: 1.3, y: -5 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.5
                  }}
                  style={{
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: isMobile ? '22px' : '26px',
                  }}
                >
                  {formattedCount}
                </motion.span>
                <span>test's completed!</span>
              </>
            )}
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
            {getTranslation('tests.attentionSpan.payment.why_trust', i18n.language === 'tr' ? 'Neden QuickIQ\'ya Güvenmelisiniz?' : 'Why Trust QuickIQ?')}
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
                title: getTranslation('tests.attentionSpan.payment.trust_feature1_title', i18n.language === 'tr' ? 'Yapay Zeka Destekli Odaklanma Analizi' : 'AI-Powered Attention Analysis'),
                desc: getTranslation('tests.attentionSpan.payment.trust_feature1_desc', i18n.language === 'tr' ? 'Gelişmiş algoritmalarla odaklanma ve dikkat sürenizin derinlemesine analizi.' : 'Deep analysis of your attention span and focus patterns with advanced algorithms.'),
              },
              {
                icon: <CheckCircle size={32} />,
                title: getTranslation('tests.attentionSpan.payment.trust_feature2_title', i18n.language === 'tr' ? 'Uygulanabilir İçgörüler' : 'Actionable Insights'),
                desc: getTranslation('tests.attentionSpan.payment.trust_feature2_desc', i18n.language === 'tr' ? 'Gerçek hayatta kullanabileceğiniz pratik tavsiyeler.' : 'Practical advice you can use in real life.'),
              },
              {
                icon: <Lock size={32} />,
                title: getTranslation('tests.attentionSpan.payment.trust_feature3_title', i18n.language === 'tr' ? 'Kişiselleştirilmiş Gelişim Planı' : 'Personalized Growth Plan'),
                desc: getTranslation('tests.attentionSpan.payment.trust_feature3_desc', i18n.language === 'tr' ? 'Size özel hazırlanmış kapsamlı gelişim stratejisi.' : 'Comprehensive growth strategy tailored just for you.'),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: '0 12px 32px rgba(108, 99, 255, 0.25)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-out',
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
            {getTranslation('tests.attentionSpan.payment.reviews', i18n.language === 'tr' ? 'Yorumlar' : 'Reviews')}
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '32px',
          }}>
            {getTranslation('tests.attentionSpan.payment.reviews_subtitle', i18n.language === 'tr' ? 'Mükemmel ⭐ 4.7 puan — 1769 yorum' : 'Excellent ⭐ 4.7 rating — 1769 reviews')}
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
                      {getTranslation('tests.attentionSpan.payment.verified_customer', i18n.language === 'tr' ? 'Doğrulanmış Müşteri' : 'Verified Customer')}
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
            {/* Discover Your Mind Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              style={{
                width: '100%',
                marginBottom: isMobile ? '24px' : '32px',
              }}
            >
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
                    'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(108, 99, 255, 0.15) 50%, rgba(155, 201, 237, 0.15) 100%)',
                    'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
                  ],
                  boxShadow: [
                    '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
                    '0 12px 48px rgba(139, 92, 246, 0.3), 0 0 50px rgba(108, 99, 255, 0.25), inset 0 0 80px rgba(255, 255, 255, 0.15)',
                    '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
                  borderRadius: '24px',
                  border: '2px solid rgba(108, 99, 255, 0.3)',
                  padding: isMobile ? '28px 24px' : '36px 48px',
                  boxShadow: '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Animated rainbow shimmer */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '200%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.3) 10%, rgba(255, 165, 0, 0.3) 20%, rgba(255, 255, 0, 0.3) 30%, rgba(0, 255, 0, 0.3) 40%, rgba(0, 0, 255, 0.3) 50%, rgba(75, 0, 130, 0.3) 60%, rgba(238, 130, 238, 0.3) 70%, transparent 80%, transparent 100%)',
                    pointerEvents: 'none',
                    filter: 'blur(8px)',
                  }}
                />
                
                {/* Decorative dots pattern */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '60px',
                  height: '60px',
                  background: 'radial-gradient(circle, rgba(108, 99, 255, 0.2) 2px, transparent 2px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.3,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '60px',
                  height: '60px',
                  background: 'radial-gradient(circle, rgba(155, 201, 237, 0.2) 2px, transparent 2px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.3,
                  pointerEvents: 'none',
                }} />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  style={{
                    fontSize: isMobile ? '18px' : '24px',
                    fontWeight: '700',
                    lineHeight: '1.5',
                    margin: 0,
                    background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 2px 20px rgba(108, 99, 255, 0.3)',
                    position: 'relative',
                    zIndex: 1,
                    letterSpacing: '0.3px',
                  }}
                >
                  Discover your mind, reveal your truth, unlock your potential, and transform yourself.
                </motion.p>
              </motion.div>
            </motion.div>
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
                order: isMobile ? 1 : 1,
              }}
            >
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
                    🧬
                  </div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#333',
                    marginBottom: '8px',
                  }}>
                    {getTranslation('trust.cognitiveFramework', i18n.language === 'tr' ? 'Bilişsel-Bilim Çerçevesi' : 'Cognitive-Science Framework')}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    margin: 0,
                  }}>
                    {getTranslation('trust.cognitiveFrameworkDesc', i18n.language === 'tr' 
                      ? 'Bilişsel bilim ilkeleriyle inşa edildi. Doğruluk, tutarlılık ve güvenilirlik sağlamak için binlerce test oturumunda doğrulandı.'
                      : 'Built with cognitive science principles. Validated across thousands of test sessions to ensure accuracy, consistency, and reliability.')}
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

                {/* Trust Point 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.6,
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
              </div>
            </motion.div>

            {/* CENTER COLUMN: Payment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(244, 246, 255, 0.5))',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.8)',
                padding: isMobile ? '32px 24px' : '48px 40px',
                position: 'relative',
                overflow: 'hidden',
                order: isMobile ? 2 : 2,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                width: isMobile ? '100%' : '102%',
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
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(244, 246, 255, 0.5))',
                borderRadius: '30px',
              }} />
            </div>

            <div id="checkout-container" style={{ position: 'relative', zIndex: 1, fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              <style>{`
                #checkout-container input::placeholder {
                  color: #A7A7A7;
                }
                .pay-now-btn {
                  background: linear-gradient(90deg, #7370FF 0%, #90C3FF 100%) !important;
                  color: #FFFFFF !important;
                  font-weight: 600 !important;
                  font-size: 20px !important;
                  padding: 18px 28px !important;
                  width: 100% !important;
                  border-radius: 16px !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  gap: 10px !important;
                  box-shadow: 0 8px 20px rgba(120, 135, 255, 0.35) !important;
                  transition: all 0.18s ease-out !important;
                  border: none !important;
                }
                .pay-now-btn span.lock-icon {
                  font-size: 22px !important;
                  filter: none !important;
                }
                .pay-now-btn:hover {
                  transform: translateY(-2px) !important;
                  filter: brightness(1.09) !important;
                  box-shadow: 0 12px 28px rgba(120, 135, 255, 0.45) !important;
                }
                .pay-now-btn:active {
                  transform: translateY(0px) !important;
                  filter: brightness(0.97) !important;
                }
              `}</style>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '8px',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}>
                  <span style={{ color: '#333' }}>$1.95 USD</span>
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  opacity: 0.75,
                  marginTop: '8px',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}>
                  🔒 Secure checkout • SSL encrypted • Powered by Stripe
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
                      ? 'linear-gradient(135deg, #A8B4FF 0%, #B8E0FF 100%)'
                      : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: activeTab === 'card' ? 'white' : '#666',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transform: activeTab === 'card' ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: activeTab === 'card' ? '0 4px 10px rgba(0,0,0,0.06)' : 'none',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  🔒 {getTranslation('payment.tab.card', 'Pay with Card')}
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
                    transition: 'all 0.12s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transform: activeTab === 'googlepay' ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: activeTab === 'googlepay' ? '0 4px 10px rgba(0,0,0,0.06)' : 'none',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                  {/* Card Number */}
                  <div style={{ marginBottom: '4px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '8px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}>
                      {getTranslation('payment.cardNumber', 'Card Number')}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '18px',
                        opacity: 0.4,
                        pointerEvents: 'none',
                        zIndex: 1,
                      }}>
                        💳
                      </span>
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
                          padding: '14px 16px 14px 48px',
                          borderRadius: '14px',
                          border: `2px solid ${errors.cardNumber ? '#e74c3c' : 'transparent'}`,
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          background: '#f7f7f7',
                          color: '#2A2A2A',
                          boxShadow: errors.cardNumber 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08)',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = errors.cardNumber ? '#e74c3c' : '#7B6CFF';
                          e.target.style.background = '#ffffff';
                          e.target.style.boxShadow = errors.cardNumber 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08), 0 0 0 2px rgba(123, 108, 255, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.cardNumber ? '#e74c3c' : 'transparent';
                          e.target.style.background = '#f7f7f7';
                          e.target.style.boxShadow = errors.cardNumber 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08)';
                        }}
                      />
                    </div>
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
                    gap: '12px',
                    marginBottom: '4px',
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: '8px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                          borderRadius: '14px',
                          border: `2px solid ${errors.expiry ? '#e74c3c' : 'transparent'}`,
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          background: '#f7f7f7',
                          color: '#2A2A2A',
                          boxShadow: errors.expiry 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08)',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = errors.expiry ? '#e74c3c' : '#7B6CFF';
                          e.target.style.background = '#ffffff';
                          e.target.style.boxShadow = errors.expiry 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08), 0 0 0 2px rgba(123, 108, 255, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.expiry ? '#e74c3c' : 'transparent';
                          e.target.style.background = '#f7f7f7';
                          e.target.style.boxShadow = errors.expiry 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08)';
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
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: '8px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}>
                        {getTranslation('payment.cvv', 'CVC')}
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => {
                          setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
                          if (errors.cvv) {
                            setErrors(prev => ({ ...prev, cvv: '' }));
                          }
                        }}
                        placeholder="••••"
                        maxLength={3}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '14px',
                          border: `2px solid ${errors.cvv ? '#e74c3c' : 'transparent'}`,
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          background: '#f7f7f7',
                          color: '#2A2A2A',
                          boxShadow: errors.cvv 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08)',
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = errors.cvv ? '#e74c3c' : '#7B6CFF';
                          e.target.style.background = '#ffffff';
                          e.target.style.boxShadow = errors.cvv 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08), 0 0 0 2px rgba(123, 108, 255, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.cvv ? '#e74c3c' : 'transparent';
                          e.target.style.background = '#f7f7f7';
                          e.target.style.boxShadow = errors.cvv 
                            ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                            : 'inset 0 1px 3px rgba(0,0,0,0.08)';
                        }}
                      />
                      {errors.cvv && (
                        <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div style={{ marginTop: '4px', marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '8px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}>
                      {getTranslation('payment.cardName', 'Name on Card')}
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
                      placeholder="Full name"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '14px',
                        border: `2px solid ${errors.cardName ? '#e74c3c' : 'transparent'}`,
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        background: '#f7f7f7',
                        color: '#2A2A2A',
                        boxShadow: errors.cardName 
                          ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                          : 'inset 0 1px 3px rgba(0,0,0,0.08)',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.cardName ? '#e74c3c' : '#7B6CFF';
                        e.target.style.background = '#ffffff';
                        e.target.style.boxShadow = errors.cardName 
                          ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                          : 'inset 0 1px 3px rgba(0,0,0,0.08), 0 0 0 2px rgba(123, 108, 255, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.cardName ? '#e74c3c' : 'transparent';
                        e.target.style.background = '#f7f7f7';
                        e.target.style.boxShadow = errors.cardName 
                          ? '0 0 0 3px rgba(231, 76, 60, 0.1)' 
                          : 'inset 0 1px 3px rgba(0,0,0,0.08)';
                      }}
                    />
                    {errors.cardName && (
                      <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
                        {errors.cardName}
                      </p>
                    )}
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
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    🔒 Stripe-secured payment. We never store card information.
                  </p>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={processing}
                    className="pay-now-btn"
                    style={{
                      cursor: processing ? 'not-allowed' : 'pointer',
                      marginBottom: '12px',
                      background: processing ? '#ccc' : undefined,
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
                        <span className="lock-icon">🔒</span> Unlock My Results Securely
                      </>
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

              {/* Trial Disclaimer */}
              {activeTab === 'card' && (
                <p style={{
                  fontSize: '13px',
                  color: '#888',
                  textAlign: 'center',
                  lineHeight: '1.4',
                  marginTop: '8px',
                  marginBottom: '0px',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}>
                  <span style={{ fontWeight: '500' }}>7-Day Trial • Cancel Anytime</span>
                  <br />
                  <span style={{ opacity: 0.6 }}>Then $39.90/month after the trial.</span>
                </p>
              )}

              {/* Trial Footer */}
              <p style={{
                fontSize: '13px',
                color: '#888',
                textAlign: 'center',
                lineHeight: '1.5',
                marginTop: '0px',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}>
                100% Secure • Encrypted by Stripe • Cancel Anytime
              </p>

              {/* Trust Badges */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '12px' : '16px',
                marginTop: '24px',
                padding: '12px 16px',
                background: 'rgba(0, 0, 0, 0.06)',
                borderRadius: '12px',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#666',
                }}>
                  <span style={{ fontSize: '16px' }}>✅</span> {getTranslation('payment.verified', 'Verified by Stripe')}
                </span>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#666',
                }}>
                  <span style={{ fontSize: '16px' }}>🔒</span> {getTranslation('payment.secure', 'Secure SSL')}
                </span>
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#666',
                  gridColumn: isMobile ? '1 / -1' : 'auto',
                }}>
                  <span style={{ fontSize: '16px' }}>💰</span> {getTranslation('payment.refund', '7-Day Refund Policy')}
                </span>
              </div>

              {/* Complete Your 7-Day Trial Securely - Below Payment Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '32px',
                  width: '100%',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
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
            </div>
          </motion.div>

            {/* RIGHT COLUMN: Trusted Worldwide */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                maxWidth: isMobile ? '100%' : '280px',
                order: isMobile ? 3 : 3,
              }}
            >
              <motion.div
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 8px 28px rgba(0,0,0,0.06)',
                }}
                transition={{ duration: 0.15, ease: 'ease-out' }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(245,245,255,0.45) 100%)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  borderRadius: '28px',
                  border: '1px solid rgba(255,255,255,0.45)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.04), 0 2px 10px rgba(0,0,0,0.03)',
                  padding: isMobile ? '22px' : '32px 32px 38px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle top glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '120px',
                  background: 'radial-gradient(circle, rgba(140,120,255,0.12), transparent 60%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Header */}
                  <div style={{
                    marginBottom: isMobile ? '20px' : '24px',
                    textAlign: 'center',
                  }}>
                    <h3 style={{
                      fontSize: isMobile ? '1.25rem' : '1.5rem',
                      fontWeight: '700',
                      color: '#333',
                      margin: 0,
                      marginBottom: '6px',
                    }}>
                      {i18n.language === 'tr' ? 'Dünya Çapında Güvenilen' : 'Trusted Worldwide'}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      opacity: 0.6,
                      color: '#666',
                      margin: 0,
                    }}>
                      {i18n.language === 'tr' ? 'Gerçek kullanıcılar. Gerçek sonuçlar. Gerçek güven.' : 'Real users. Real results. Real trust.'}
                    </p>
                  </div>

                  {/* Content Sections */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '16px' : '22px',
                    marginBottom: isMobile ? '20px' : '28px',
                  }}>
                    {/* Tests Completed */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>🔥</span>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#444',
                          margin: 0,
                        }}>
                          {formattedCount} {i18n.language === 'tr' ? 'test bugün tamamlandı' : 'tests completed today'}
                        </p>
                      </div>
                      {!isMobile && (
                        <p style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          opacity: 0.55,
                          color: '#666',
                          margin: 0,
                          marginLeft: '28px',
                        }}>
                          {i18n.language === 'tr' ? 'Canlı veri saatlik güncellenir' : 'Live data updated hourly'}
                        </p>
                      )}
                    </div>

                    {/* Countries */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>🌍</span>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#444',
                          margin: 0,
                        }}>
                          {i18n.language === 'tr' ? '80+ ülkeden kullanıcılar tarafından güveniliyor' : 'Trusted by users from 80+ countries'}
                        </p>
                      </div>
                      {!isMobile && (
                        <p style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          opacity: 0.55,
                          color: '#666',
                          margin: 0,
                          marginLeft: '28px',
                        }}>
                          {i18n.language === 'tr' ? 'Küresel erişim ve büyüyor' : 'Global reach & growing'}
                        </p>
                      )}
                    </div>

                    {/* Rating */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>⭐</span>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#444',
                          margin: 0,
                        }}>
                          {i18n.language === 'tr' ? '4.9/5 doğruluk geri bildirimi puanı' : 'Rated 4.9/5 accuracy feedback'}
                        </p>
                      </div>
                      {!isMobile && (
                        <p style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          opacity: 0.55,
                          color: '#666',
                          margin: 0,
                          marginLeft: '28px',
                        }}>
                          {i18n.language === 'tr' ? '12,800+ doğrulanmış kullanıcıya dayanır' : 'Based on 12,800+ verified users'}
                        </p>
                      )}
                    </div>

                    {/* Completion Rate */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>🎯</span>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#444',
                          margin: 0,
                        }}>
                          {i18n.language === 'tr' ? 'Tüm testlerde %92 tamamlanma oranı' : '92% completion rate across all tests'}
                        </p>
                      </div>
                      {!isMobile && (
                        <p style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          opacity: 0.55,
                          color: '#666',
                          margin: 0,
                          marginLeft: '28px',
                        }}>
                          {i18n.language === 'tr' ? 'Kullanıcılar test akışımızı sorunsuz ve güvenilir buluyor' : 'Users find our test flow smooth & reliable'}
                        </p>
                      )}
                    </div>

                    {/* Monthly Active Users */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>🌍</span>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#444',
                          margin: 0,
                        }}>
                          {i18n.language === 'tr' ? 'Aylık 120,000+ aktif kullanıcı tarafından kullanılıyor' : 'Used by 120,000+ active users monthly'}
                        </p>
                      </div>
                      {!isMobile && (
                        <p style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          opacity: 0.55,
                          color: '#666',
                          margin: 0,
                          marginLeft: '28px',
                        }}>
                          {i18n.language === 'tr' ? 'Her dakika yeni kullanıcılar katılıyor' : 'New users join every minute'}
                        </p>
                      )}
                    </div>

                    {/* SSL & Encryption */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <span style={{ fontSize: '1.1rem' }}>🔐</span>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#444',
                          margin: 0,
                        }}>
                          {i18n.language === 'tr' ? '256-bit SSL ve Stripe şifreleme ile güvence altında' : 'Secured with 256-bit SSL & Stripe encryption'}
                        </p>
                      </div>
                      {!isMobile && (
                        <p style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          opacity: 0.55,
                          color: '#666',
                          margin: 0,
                          marginLeft: '28px',
                        }}>
                          {i18n.language === 'tr' ? 'Verileriniz gizli, şifrelenmiş ve korunur' : 'Your data stays private, encrypted, and protected'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Country Flags Pill */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    padding: '12px 18px',
                    flexWrap: 'wrap',
                  }}>
                    {['🇹🇷', '🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷'].map((flag, index) => (
                      <span
                        key={index}
                        style={{
                          fontSize: '1.5rem',
                          lineHeight: '1',
                        }}
                      >
                        {flag}
                      </span>
                    ))}
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      opacity: 0.8,
                      color: '#666',
                    }}>
                      {i18n.language === 'tr' ? '+184 diğer ülke' : '+184 other countries'}
                    </span>
                  </div>
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
                  transition: { duration: 0.15, ease: 'easeOut' }
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                  width: '64px',
                  height: '64px',
                }}>
                  {/* Soft Pastel Ring Glow */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(221, 231, 255, 0.3) 0%, rgba(243, 232, 255, 0.25) 100%)',
                    filter: 'blur(75px)',
                    opacity: 0.3,
                    zIndex: 0,
                  }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>🧠</span>
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
                  transition: { duration: 0.15, ease: 'easeOut' }
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                  width: '64px',
                  height: '64px',
                }}>
                  {/* Soft Pastel Ring Glow */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(221, 231, 255, 0.3) 0%, rgba(243, 232, 255, 0.25) 100%)',
                    filter: 'blur(75px)',
                    opacity: 0.3,
                    zIndex: 0,
                  }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>⚙️</span>
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
                  transition: { duration: 0.15, ease: 'easeOut' }
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
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                  width: '64px',
                  height: '64px',
                }}>
                  {/* Soft Pastel Ring Glow */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(221, 231, 255, 0.3) 0%, rgba(243, 232, 255, 0.25) 100%)',
                    filter: 'blur(75px)',
                    opacity: 0.3,
                    zIndex: 0,
                  }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>🎯</span>
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
          marginTop: '64px',
          marginBottom: '32px',
        }}
      >
        <p style={{
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.6',
        }}>
          {getTranslation('tests.attentionSpan.payment.footer', i18n.language === 'tr'
            ? 'Başarılı ödemeden sonra sonuçlarınıza yönlendirileceksiniz. Verileriniz gizli tutulur.'
            : 'You\'ll be redirected to your results after successful payment. Your data remains private.')}
        </p>
      </motion.div>
    </main>
  );
}

