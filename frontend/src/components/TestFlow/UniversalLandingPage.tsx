import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { useRipple } from '../../hooks/useRipple';
import { Sparkles, BookOpen, Clock } from 'lucide-react';
import { loadTestContent, getTestConfig, TestContent } from '../../utils/testContentLoader';
import * as LucideIcons from 'lucide-react';
import { LoadingFallback } from '../ui/LoadingFallback';
import { ErrorFallback } from '../ui/ErrorFallback';
import '../../App.css';

// Import landing images
import addictionImage from '../../assets/images/landing/addiction.svg';
import adhdImage from '../../assets/images/landing/adhd.svg';
import ambitionImage from '../../assets/images/landing/ambition.svg';
import angerControlImage from '../../assets/images/landing/anger-control.svg';
import antisocialTraitsImage from '../../assets/images/landing/antisocial-traits.svg';
import anxietyImage from '../../assets/images/landing/anxiety.svg';
import attachmentStyleImage from '../../assets/images/landing/attachment-style.svg';
import attentionSpanImage from '../../assets/images/landing/attention-span.svg';
import autismImage from '../../assets/images/landing/autism.svg';
import borderlineImage from '../../assets/images/landing/borderline.svg';
import boundarySkillsImage from '../../assets/images/landing/boundary-skills.svg';
import breakupStyleImage from '../../assets/images/landing/breakup-style.svg';
import budgetControlImage from '../../assets/images/landing/budget-control.svg';
import burnoutImage from '../../assets/images/landing/burnout.svg';
import closenessNeedImage from '../../assets/images/landing/closeness-need.svg';
import coParentingDynamicsImage from '../../assets/images/landing/co-parenting-dynamics.svg';
import communicationFlowImage from '../../assets/images/landing/communication-flow.svg';
import compatibilityFitImage from '../../assets/images/landing/compatibility-fit.svg';
import conflictStyleImage from '../../assets/images/landing/conflict-style.svg';
import creativeThinkingImage from '../../assets/images/landing/creative-thinking.svg';
import criticismImage from '../../assets/images/landing/criticism.svg';
import debtPatternsImage from '../../assets/images/landing/debt-patterns.svg';
import decisionMakingImage from '../../assets/images/landing/decision-making.svg';
import depressionImage from '../../assets/images/landing/depression.svg';
import eatingBehaviorImage from '../../assets/images/landing/eating-behavior.svg';
import emotionalAvailabilityImage from '../../assets/images/landing/emotional-availability.svg';
import emotionalInstabilityImage from '../../assets/images/landing/emotional-instability.svg';
import emotionalLaborImage from '../../assets/images/landing/emotional-labor.svg';
import entrepreneurDriveImage from '../../assets/images/landing/entrepreneur-drive.svg';
import entrepreneurMindsetImage from '../../assets/images/landing/entrepreneur-mindset.svg';
import financialAnxietyImage from '../../assets/images/landing/financial-anxiety.svg';
import healthAnxietyImage from '../../assets/images/landing/health-anxiety.svg';
import impulseBuyingImage from '../../assets/images/landing/impulse-buying.svg';
import intimacyBlocksImage from '../../assets/images/landing/intimacy-blocks.svg';
import investmentStyleImage from '../../assets/images/landing/investment-style.svg';
import jealousyLevelsImage from '../../assets/images/landing/jealousy-levels.svg';
import leadershipArchetypeImage from '../../assets/images/landing/leadership-archetype.svg';
import loveLanguageImage from '../../assets/images/landing/love-language.svg';
import marketBehaviorImage from '../../assets/images/landing/market-behavior.svg';
import marriageReadinessImage from '../../assets/images/landing/marriage-readiness.svg';
import memoryRetentionImage from '../../assets/images/landing/memory-retention.svg';
import moneyBoundariesImage from '../../assets/images/landing/money-boundaries.svg';
import multitaskingImage from '../../assets/images/landing/multitasking.svg';
import narcissismImage from '../../assets/images/landing/narcissism.svg';
import negotiationSkillsImage from '../../assets/images/landing/negotiation-skills.svg';
import ocdImage from '../../assets/images/landing/ocd.svg';
import panicDisorderImage from '../../assets/images/landing/panic-disorder.svg';
import parentingReadinessImage from '../../assets/images/landing/parenting-readiness.svg';
import passiveGrowthImage from '../../assets/images/landing/passive-growth.svg';
import perfectionismImage from '../../assets/images/landing/perfectionism.svg';
import powerBalanceImage from '../../assets/images/landing/power-balance.svg';
import problemSolvingImage from '../../assets/images/landing/problem-solving.svg';
import profitInstinctImage from '../../assets/images/landing/profit-instinct.svg';
import ptsdImage from '../../assets/images/landing/ptsd.svg';
import relationshipAnxietyImage from '../../assets/images/landing/relationship-anxiety.svg';
import relationshipTestImage from '../../assets/images/landing/relationship-test.svg';
import returnExpectationsImage from '../../assets/images/landing/return-expectations.svg';
import riskToleranceImage from '../../assets/images/landing/risk-tolerance.svg';
import salesConfidenceImage from '../../assets/images/landing/sales-confidence.svg';
import savingsArchetypeImage from '../../assets/images/landing/savings-archetype.svg';
import sexualChemistryImage from '../../assets/images/landing/sexual-chemistry.svg';
import sleepDisorderImage from '../../assets/images/landing/sleep-disorder.svg';
import socialAnxietyImage from '../../assets/images/landing/social-anxiety.svg';
import strategicThinkingImage from '../../assets/images/landing/strategic-thinking.svg';
import stressManagementImage from '../../assets/images/landing/stress-management.svg';
import successImage from '../../assets/images/landing/success.svg';
import taxAwarenessImage from '../../assets/images/landing/tax-awareness.svg';
import teamPlayerImage from '../../assets/images/landing/team-player.svg';
import timeManagementImage from '../../assets/images/landing/time-management.svg';
import traumaPatternsImage from '../../assets/images/landing/trauma-patterns.svg';
import trustIssuesImage from '../../assets/images/landing/trust-issues.svg';
import cognitivePressureImage from '../../assets/images/landing/cognitive-pressure.svg';
import coldStrategyImage from '../../assets/images/landing/cold-strategy.svg';
import complianceHackImage from '../../assets/images/landing/compliance-hack.svg';
import conflictManipulationImage from '../../assets/images/landing/conflict-manipulation.svg';
import covertInfluenceImage from '../../assets/images/landing/covert-influence.svg';
import dualPersonaImage from '../../assets/images/landing/dual-persona.svg';
import emotionalExploitImage from '../../assets/images/landing/emotional-exploit.svg';
import emotionalMaskImage from '../../assets/images/landing/emotional-mask.svg';
import hiddenManipulationImage from '../../assets/images/landing/hidden-manipulation.svg';
import incomeStrategyImage from '../../assets/images/landing/income-strategy.svg';
import lieSuppressionImage from '../../assets/images/landing/lie-suppression.svg';
import mindControlImage from '../../assets/images/landing/mind-control.svg';
import moneyTriggersImage from '../../assets/images/landing/money-triggers.svg';
import obedienceTriggerImage from '../../assets/images/landing/obedience-trigger.svg';
import perceptionControlImage from '../../assets/images/landing/perception-control.svg';
import savingDisciplineImage from '../../assets/images/landing/saving-discipline.svg';
import shadowIntentionsImage from '../../assets/images/landing/shadow-intentions.svg';
import socialEngineeringImage from '../../assets/images/landing/social-engineering.svg';
import socialPropagandaImage from '../../assets/images/landing/social-propaganda.svg';
import spendingHabitsImage from '../../assets/images/landing/spending-habits.svg';
import truthDistortionImage from '../../assets/images/landing/truth-distortion.svg';
import wealthMindsetImage from '../../assets/images/landing/wealth-mindset.svg';
import desireControlImage from '../../assets/images/landing/desire-control.svg';
import fearLeverageImage from '../../assets/images/landing/fear-leverage.svg';
import charmWeaponImage from '../../assets/images/landing/charm-weapon.svg';
import silentDominanceImage from '../../assets/images/landing/silent-dominance.svg';
import boundaryBendingImage from '../../assets/images/landing/boundary-bending.svg';

// Landing images mapping
const landingImages: Record<string, string> = {
  'addiction': addictionImage,
  'adhd': adhdImage,
  'ambition': ambitionImage,
  'anger-control': angerControlImage,
  'antisocial-traits': antisocialTraitsImage,
  'anxiety': anxietyImage,
  'attachment-style': attachmentStyleImage,
  'attention-span': attentionSpanImage,
  'autism': autismImage,
  'borderline': borderlineImage,
  'boundary-skills': boundarySkillsImage,
  'breakup-style': breakupStyleImage,
  'budget-control': budgetControlImage,
  'burnout': burnoutImage,
  'closeness-need': closenessNeedImage,
  'co-parenting-dynamics': coParentingDynamicsImage,
  'communication-flow': communicationFlowImage,
  'compatibility-fit': compatibilityFitImage,
  'conflict-style': conflictStyleImage,
  'creative-thinking': creativeThinkingImage,
  'criticism': criticismImage,
  'debt-patterns': debtPatternsImage,
  'decision-making': decisionMakingImage,
  'depression': depressionImage,
  'eating-behavior': eatingBehaviorImage,
  'emotional-availability': emotionalAvailabilityImage,
  'emotional-instability': emotionalInstabilityImage,
  'emotional-labor': emotionalLaborImage,
  'entrepreneur-drive': entrepreneurDriveImage,
  'entrepreneur-mindset': entrepreneurMindsetImage,
  'financial-anxiety': financialAnxietyImage,
  'health-anxiety': healthAnxietyImage,
  'impulse-buying': impulseBuyingImage,
  'intimacy-blocks': intimacyBlocksImage,
  'investment-style': investmentStyleImage,
  'jealousy-levels': jealousyLevelsImage,
  'leadership-archetype': leadershipArchetypeImage,
  'love-language': loveLanguageImage,
  'market-behavior': marketBehaviorImage,
  'marriage-readiness': marriageReadinessImage,
  'memory-retention': memoryRetentionImage,
  'money-boundaries': moneyBoundariesImage,
  'multitasking': multitaskingImage,
  'narcissism': narcissismImage,
  'negotiation-skills': negotiationSkillsImage,
  'ocd': ocdImage,
  'panic-disorder': panicDisorderImage,
  'parenting-readiness': parentingReadinessImage,
  'passive-growth': passiveGrowthImage,
  'perfectionism': perfectionismImage,
  'power-balance': powerBalanceImage,
  'problem-solving': problemSolvingImage,
  'profit-instinct': profitInstinctImage,
  'ptsd': ptsdImage,
  'relationship-anxiety': relationshipAnxietyImage,
  'relationship-test': relationshipTestImage,
  'return-expectations': returnExpectationsImage,
  'risk-tolerance': riskToleranceImage,
  'sales-confidence': salesConfidenceImage,
  'savings-archetype': savingsArchetypeImage,
  'sexual-chemistry': sexualChemistryImage,
  'sleep-disorder': sleepDisorderImage,
  'social-anxiety': socialAnxietyImage,
  'strategic-thinking': strategicThinkingImage,
  'stress-management': stressManagementImage,
  'success': successImage,
  'tax-awareness': taxAwarenessImage,
  'team-player': teamPlayerImage,
  'time-management': timeManagementImage,
  'trauma-patterns': traumaPatternsImage,
  'trust-issues': trustIssuesImage,
  'cognitive-pressure': cognitivePressureImage,
  'cold-strategy': coldStrategyImage,
  'compliance-hack': complianceHackImage,
  'conflict-manipulation': conflictManipulationImage,
  'covert-influence': covertInfluenceImage,
  'dual-persona': dualPersonaImage,
  'emotional-exploit': emotionalExploitImage,
  'emotional-mask': emotionalMaskImage,
  'hidden-manipulation': hiddenManipulationImage,
  'income-strategy': incomeStrategyImage,
  'lie-suppression': lieSuppressionImage,
  'mind-control': mindControlImage,
  'money-triggers': moneyTriggersImage,
  'obedience-trigger': obedienceTriggerImage,
  'perception-control': perceptionControlImage,
  'saving-discipline': savingDisciplineImage,
  'shadow-intentions': shadowIntentionsImage,
  'social-engineering': socialEngineeringImage,
  'social-propaganda': socialPropagandaImage,
  'spending-habits': spendingHabitsImage,
  'truth-distortion': truthDistortionImage,
  'wealth-mindset': wealthMindsetImage,
  'desire-control': desireControlImage,
  'fear-leverage': fearLeverageImage,
  'charm-weapon': charmWeaponImage,
  'silent-dominance': silentDominanceImage,
  'boundary-bending': boundaryBendingImage,
};

interface Props {
  testId: string;
  onStart: () => void;
  iconName?: string;
}

export default function UniversalLandingPage({ testId, onStart, iconName }: Props) {
  const { i18n } = useTranslation();
  const isMobile = useMobile();
  const language = i18n.language as 'en' | 'tr';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { ripples, createRipple, color, scale, transition } = useRipple({
    buttonRef,
  });
  const [content, setContent] = useState<TestContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [landingImage, setLandingImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load landing image
  useEffect(() => {
    const image = landingImages[testId];
    if (image) {
      setLandingImage(image);
    } else {
      setLandingImage(null);
    }
  }, [testId]);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        setError(null);
        const loadedContent = await loadTestContent(testId);
        if (!loadedContent) {
          const errorMsg = `Test content not found for: ${testId}`;
          setError(errorMsg);
        } else {
          setContent(loadedContent);
        }
      } catch (err: any) {
        const errorMsg = `Failed to load content for ${testId}: ${err.message || err}`;
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [testId]);

  // Hide scrollbar on landing pages when content fits
  useEffect(() => {
    // Add class to body and html to hide scrollbar but allow scrolling if needed
    document.body.classList.add('landing-page-no-scrollbar');
    document.documentElement.classList.add('landing-page-no-scrollbar');
    
    return () => {
      // Remove class when component unmounts
      document.body.classList.remove('landing-page-no-scrollbar');
      document.documentElement.classList.remove('landing-page-no-scrollbar');
    };
  }, []);

  if (loading) {
    return <LoadingFallback testId={testId} />;
  }

  if (error || !content) {
    return <ErrorFallback error={error} testId={testId} />;
  }

  const testConfig = getTestConfig(testId);
  const IconComponent = iconName && (LucideIcons as any)[iconName] 
    ? (LucideIcons as any)[iconName] 
    : LucideIcons.HelpCircle;

  const colors = content.colors;
  const landing = content.landing;
  const questions = content.questions;

  const animatedGradients = colors.background.landing.animated || [
    colors.background.landing.gradient,
    colors.background.landing.gradient,
    colors.background.landing.gradient,
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background.landing.gradient,
      paddingTop: isMobile ? '40px' : '50px',
      paddingBottom: isMobile ? '40px' : '48px',
      paddingLeft: isMobile ? '20px' : '40px',
      paddingRight: isMobile ? '20px' : '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background gradient */}
      {animatedGradients.length > 1 && (
        <motion.div
          animate={{
            background: animatedGradients,
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
            zIndex: 0,
          }}
        />
      )}

      <div style={{
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: isMobile ? '36px' : '48px',
            marginBottom: '10px',
            fontWeight: 'bold',
            background: colors.button.primary.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
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
            }}
          >
            <IconComponent 
              size={isMobile ? 32 : 40}
              color={colors.primary.main}
              style={{ 
                filter: `drop-shadow(0 0 8px ${colors.primary.main}CC)`,
              }} 
            />
          </motion.div>
          {testConfig?.name?.[language] || testConfig?.name?.en || testId}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: isMobile ? '18px' : '22px',
            color: '#555',
            marginBottom: '8px',
            fontWeight: '500',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          {language === 'tr' 
            ? 'Dürüst cevap verin, bu test yargılamak için değil, kendinizi keşfetmeniz içindir.'
            : 'Answer honestly, this test is for your self-discovery, not for judgment.'}
        </motion.p>

        {/* Reminder - below subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontSize: isMobile ? '13px' : '15px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.5',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {landing.reminder[language] || landing.reminder.en}
        </motion.p>

        {/* Landing Image - SVG */}
        {landingImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={landingImage}
              alt={`${testId} landing illustration`}
              style={{
                maxWidth: isMobile ? '280px' : '400px',
                width: '100%',
                height: 'auto',
                filter: `drop-shadow(0 8px 16px ${colors.primary.main}33)`,
              }}
            />
          </motion.div>
        )}

        {/* Separator with icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: landingImage ? 0.6 : 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            gap: '12px',
          }}
        >
          <div style={{
            flex: 1,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${colors.primary.main}4D, transparent)`,
          }} />
          <Sparkles size={20} style={{ color: colors.primary.main, opacity: 0.6 }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${colors.primary.main}4D, transparent)`,
          }} />
        </motion.div>

        {/* Test Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: landingImage ? 0.8 : 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: isMobile ? '10px' : '16px',
            marginBottom: '10px',
          }}
        >
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.05, y: -3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: isMobile ? '12px 16px' : '16px 22px',
              boxShadow: `0 2px 12px ${colors.primary.main}20, 0 0 0 1px ${colors.primary.main}15`,
              border: `1px solid ${colors.primary.main}20`,
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '6px' : '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ 
              fontSize: isMobile ? '20px' : '26px', 
              fontWeight: '700', 
              color: colors.primary.main, 
              lineHeight: '1',
            }}>
              {questions.total}
            </span>
            <span style={{ 
              fontSize: isMobile ? '11px' : '13px', 
              color: '#666', 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {language === 'tr' ? 'Soru' : 'Questions'}
            </span>
            <BookOpen 
              size={isMobile ? 14 : 16} 
              style={{ 
                color: colors.primary.main,
                opacity: 0.6,
                flexShrink: 0,
                marginLeft: '2px',
              }} 
            />
          </motion.div>
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.05, y: -3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: isMobile ? '12px 16px' : '16px 22px',
              boxShadow: `0 2px 12px ${colors.primary.main}20, 0 0 0 1px ${colors.primary.main}15`,
              border: `1px solid ${colors.primary.main}20`,
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '6px' : '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ 
              fontSize: isMobile ? '20px' : '26px', 
              fontWeight: '700', 
              color: colors.primary.main, 
              lineHeight: '1',
            }}>
              {Math.floor(questions.timeLimit / 60)}
            </span>
            <span style={{ 
              fontSize: isMobile ? '11px' : '13px', 
              color: '#666', 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {language === 'tr' ? 'Dakika' : 'Minutes'}
            </span>
            <Clock 
              size={isMobile ? 14 : 16} 
              style={{ 
                color: colors.primary.main,
                opacity: 0.6,
                flexShrink: 0,
                marginLeft: '2px',
              }} 
            />
          </motion.div>
        </motion.div>

        {/* Privacy Notice - above button */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: landingImage ? 0.95 : 0.65 }}
          style={{
            fontSize: isMobile ? '12px' : '13px',
            color: '#666',
            marginBottom: '8px',
            textAlign: 'center',
            lineHeight: '1.4',
          }}
        >
          {language === 'tr' 
            ? 'Cevaplarınız saklanmaz veya paylaşılmaz.'
            : 'Your responses are not stored or shared.'}
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: landingImage ? 1.0 : 0.7,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          style={{ 
            textAlign: 'center',
          }}
        >
          <motion.button
            ref={buttonRef}
            className="ripple-container"
            onClick={(e) => {
              createRipple(e);
              onStart();
            }}
            whileHover={{ 
              scale: 1.15,
              y: -8,
              boxShadow: `0 16px 50px ${colors.primary.main}B3, 0 0 60px ${colors.primary.light}99, 0 0 80px ${colors.primary.main}66`,
              transition: { duration: 0.15, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontSize: isMobile ? '18px' : '20px',
              padding: isMobile ? '18px 48px' : '20px 56px',
              background: colors.button.primary.gradient,
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: colors.button.primary.shadow,
              transition: 'all 0.15s ease-out',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale, opacity: 0 }}
                transition={transition}
                style={{
                  position: 'absolute',
                  top: ripple.y - ripple.size / 2,
                  left: ripple.x - ripple.size / 2,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  borderRadius: '50%',
                  backgroundColor: color,
                  pointerEvents: 'none',
                  zIndex: 9999,
                }}
              />
            ))}
            <motion.span
              animate={{
                boxShadow: [
                  `0 0 0 0 ${colors.primary.main}B3`,
                  `0 0 0 10px ${colors.primary.main}00`,
                  `0 0 0 0 ${colors.primary.main}00`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                pointerEvents: 'none',
              }}
            />
            {language === 'tr' ? 'Devam Et' : 'Continue'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

