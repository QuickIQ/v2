import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Question, Answer } from '../../types';
import '../../App.css';

interface Props {
  questions: Question[];
  answers: Answer[];
  onAnswerSelect: (questionId: number, optionKey: string) => void;
  onSubmit: () => void;
}

function QuestionsPage({ questions, answers, onAnswerSelect, onSubmit }: Props) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.question_id === currentQuestion?.id);

  // Initialize selected answer when question changes
  useEffect(() => {
    if (currentAnswer) {
      setSelectedAnswer(currentAnswer.option_key);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentIndex, currentAnswer]);

  const handleOptionSelect = (optionKey: string) => {
    setSelectedAnswer(optionKey);
    if (currentQuestion) {
      onAnswerSelect(currentQuestion.id, optionKey);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextQuestion = questions[currentIndex + 1];
      const nextAnswer = answers.find((a) => a.question_id === nextQuestion.id);
      setSelectedAnswer(nextAnswer?.option_key || null);
    } else {
      // All questions answered, can submit
      if (answers.length === questions.length) {
        onSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevQuestion = questions[currentIndex - 1];
      const prevAnswer = answers.find((a) => a.question_id === prevQuestion.id);
      setSelectedAnswer(prevAnswer?.option_key || null);
    }
  };

  if (!currentQuestion) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="app" style={{ minHeight: '100vh', padding: '40px 20px', background: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              {t('test.questions.question', { current: currentIndex + 1, total: questions.length })}
            </span>
            <span style={{ color: '#666', fontSize: '14px' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '28px', marginBottom: '32px', color: '#333' }}>
            {currentQuestion.text}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQuestion.options.map((option) => (
              <button
                key={option.key}
                onClick={() => handleOptionSelect(option.key)}
                style={{
                  padding: '16px',
                  border: `2px solid ${selectedAnswer === option.key ? '#667eea' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  background: selectedAnswer === option.key ? '#f0f4ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
              >
                {option.text}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              {t('common.back')}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentIndex === questions.length - 1 ? t('common.submit') : t('common.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;

