import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Brain, Award } from 'lucide-react';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import '../../App.css';

interface Props {
  score: number;
  result: any;
}

export function EnhancedIQResult({ score }: Props) {
  const { t } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (score >= 130) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [score]);

  const getTier = (score: number) => {
    if (score >= 130) return { 
      label: t('test.iq.excellent'), 
      color: '#27ae60',
      gradient: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
      icon: Trophy,
      message: 'Harika! Üstün zekaya sahipsiniz!'
    };
    if (score >= 115) return { 
      label: t('test.iq.good'), 
      color: '#3498db',
      gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      icon: TrendingUp,
      message: 'Mükemmel! Yüksek zeka seviyesindesiniz!'
    };
    if (score >= 85) return { 
      label: t('test.iq.average'), 
      color: '#f39c12',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
      icon: Brain,
      message: 'İyi! Normal zeka seviyesindesiniz!'
    };
    return { 
      label: t('test.iq.belowAverage'), 
      color: '#e74c3c',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      icon: Award,
      message: 'Değerlendirme tamamlandı.'
    };
  };

  const tier = getTier(score);
  const Icon = tier.icon;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        <motion.div
          className="card"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '64px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            textAlign: 'center',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: tier.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              boxShadow: `0 10px 40px ${tier.color}40`,
            }}
          >
            <Icon size={64} color="white" />
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '24px' }}
          >
            <div style={{ fontSize: '18px', color: '#666', marginBottom: '12px', fontWeight: '500' }}>
              {t('test.iq.score')}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              style={{
                fontSize: '96px',
                fontWeight: 'bold',
                background: tier.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1',
                marginBottom: '16px',
              }}
            >
              {score}
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: tier.gradient,
                color: 'white',
                borderRadius: '50px',
                fontSize: '20px',
                fontWeight: 'bold',
                boxShadow: `0 8px 24px ${tier.color}40`,
              }}
            >
              {tier.label}
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              fontSize: '24px',
              color: '#333',
              marginBottom: '48px',
              fontWeight: '500',
            }}
          >
            {tier.message}
          </motion.p>

          {/* Interpretation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              textAlign: 'left',
              marginTop: '48px',
              padding: '32px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderRadius: '20px',
            }}
          >
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#333', fontWeight: '600' }}>
              {t('test.iq.interpretation')}
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#666' }}>
              {score >= 130 && 'IQ skorunuz üstün zeka seviyesini göstermektedir. Mükemmel muhakeme yeteneğiniz, problem çözme becerileriniz ve entelektüel kapasiteniz olağanüstü seviyededir. Bu seviyedeki bireyler genellikle akademik başarı, yaratıcılık ve liderlik konularında öne çıkarlar.'}
              {score >= 115 && score < 130 && 'IQ skorunuz ortalamanın üzerinde bir zeka seviyesini göstermektedir. Güçlü analitik düşünme ve öğrenme yetenekleriniz var. Bu seviyedeki bireyler genellikle karmaşık problemleri çözmede başarılıdır ve hızlı öğrenirler.'}
              {score >= 85 && score < 115 && 'IQ skorunuz normal aralıkta yer almaktadır. Bu, genel nüfusun çoğunluğunda görülen tipik bilişsel işlevi temsil eder. Normal IQ seviyesine sahip bireyler günlük yaşam görevlerini başarıyla yerine getirir ve uygun eğitim ve çalışma ile mükemmel sonuçlar elde edebilirler.'}
              {score < 85 && 'IQ skorunuz değerlendirilmiştir. Daha detaylı değerlendirme için profesyonel bir psikolog veya uzmana danışmanız önerilir. Unutmayın ki IQ sadece zekanın bir yönüdür ve başarı birçok faktöre bağlıdır.'}
            </p>
          </motion.div>

          {/* Score Distribution Chart */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              marginTop: '48px',
              padding: '32px',
              background: 'white',
              borderRadius: '20px',
              border: '2px solid #e0e0e0',
            }}
          >
            <h4 style={{ fontSize: '18px', marginBottom: '24px', color: '#333', fontWeight: '600' }}>
              IQ Dağılımı
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px' }}>
              {[
                { label: '<85', range: [0, 84], color: '#e74c3c' },
                { label: '85-114', range: [85, 114], color: '#f39c12' },
                { label: '115-129', range: [115, 129], color: '#3498db' },
                { label: '130+', range: [130, 200], color: '#27ae60' },
              ].map((section, idx) => {
                const height = section.range[0] <= score && score <= section.range[1] ? 100 : 
                               score > section.range[1] ? 70 : 40;
                const isCurrent = section.range[0] <= score && score <= section.range[1];
                return (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                    style={{
                      width: '60px',
                      background: isCurrent ? tier.gradient : section.color,
                      borderRadius: '8px 8px 0 0',
                      position: 'relative',
                      boxShadow: isCurrent ? `0 4px 12px ${tier.color}40` : 'none',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      fontWeight: isCurrent ? 'bold' : 'normal',
                      color: isCurrent ? tier.color : '#666',
                    }}>
                      {section.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '14px',
              color: '#666',
            }}>
              Skorunuz: {score}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default EnhancedIQResult;

