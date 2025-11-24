import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { useRipple } from '../../hooks/useRipple';
import answerGradientsData from '../../data/shared/answer-gradients.json';

interface AnswerButtonGridProps {
  options: string[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

// Load answer gradients and glow colors from JSON
const answerGradients = answerGradientsData.gradients;
const glowColors = answerGradientsData.glowColors;

interface AnswerButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  disabled: boolean;
  onSelect: (index: number) => void;
  isMobile: boolean;
}

function AnswerButton({ option, index, isSelected, disabled, onSelect, isMobile }: AnswerButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { ripples, createRipple, color, scale, transition } = useRipple({
    buttonRef,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createRipple(e);
      onSelect(index);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`answer-option ripple-container ${isMobile ? `answer-${['never', 'rarely', 'sometimes', 'neutral', 'often', 'usually', 'always'][index]}` : ''}`}
      onClick={handleClick}
      whileHover={!disabled ? { 
        y: -4,
        boxShadow: `0 0 12px ${glowColors[index] || glowColors[0]}, 0 4px 18px rgba(0,0,0,0.1)`,
        filter: 'brightness(1.06)',
        transition: { duration: 0.12, ease: 'easeOut' }
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      style={{
        padding: isMobile ? '10px 14px' : '12px 20px',
        border: 'none',
        borderRadius: '12px',
        background: answerGradients[index] || answerGradients[0],
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        fontSize: isMobile ? '12px' : '14px',
        fontWeight: '600',
        color: '#333',
        transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
        opacity: disabled ? 0.6 : 1,
        boxShadow: isSelected ? `0 0 12px ${glowColors[index] || glowColors[0]}, 0 4px 18px rgba(0,0,0,0.1)` : (isMobile ? '0 2px 6px rgba(0,0,0,0.06)' : '0 3px 10px rgba(0,0,0,0.08)'),
        position: 'relative',
        zIndex: isSelected ? 2 : 1,
        whiteSpace: 'nowrap',
        ...(isMobile ? {} : { flex: '1 1 0', maxWidth: '150px' }),
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
      {option}
    </motion.button>
  );
}

export function AnswerButtonGrid({ options, selectedOption, onSelect, disabled = false }: AnswerButtonGridProps) {
  const isMobile = useMobile(600);

  const handleOptionSelect = (index: number) => {
    if (!disabled) {
      onSelect(index);
    }
  };

  // Mobile layout: CSS Grid arrangement
  // Options order: [Never(0), Rarely(1), Sometimes(2), Neutral(3), Often(4), Usually(5), Always(6)]
  // New layout:
  // Row 1: Always(6) — Never(0)
  // Row 2: Usually(5) — Rarely(1)
  // Row 3: Often(4) — Sometimes(2)
  // Row 4: Neutral(3) (centered, full width)
  if (isMobile) {
    return (
      <div 
        className="answers-grid"
        style={{
          width: '100%',
        }}
      >
        {/* Always (index 6) */}
        {options[6] && (
          <AnswerButton
            option={options[6]}
            index={6}
            isSelected={selectedOption === 6}
            disabled={disabled}
            onSelect={handleOptionSelect}
            isMobile={true}
          />
        )}

        {/* Never (index 0) */}
        {options[0] && (
          <AnswerButton
            option={options[0]}
            index={0}
            isSelected={selectedOption === 0}
            disabled={disabled}
            onSelect={handleOptionSelect}
            isMobile={true}
          />
        )}

        {/* Usually (index 5) */}
        {options[5] && (
          <AnswerButton
            option={options[5]}
            index={5}
            isSelected={selectedOption === 5}
            disabled={disabled}
            onSelect={handleOptionSelect}
            isMobile={true}
          />
        )}

        {/* Rarely (index 1) */}
        {options[1] && (
          <AnswerButton
            option={options[1]}
            index={1}
            isSelected={selectedOption === 1}
            disabled={disabled}
            onSelect={handleOptionSelect}
            isMobile={true}
          />
        )}

        {/* Often (index 4) */}
        {options[4] && (
          <AnswerButton
            option={options[4]}
            index={4}
            isSelected={selectedOption === 4}
            disabled={disabled}
            onSelect={handleOptionSelect}
            isMobile={true}
          />
        )}

        {/* Sometimes (index 2) */}
        {options[2] && (
          <AnswerButton
            option={options[2]}
            index={2}
            isSelected={selectedOption === 2}
            disabled={disabled}
            onSelect={handleOptionSelect}
            isMobile={true}
          />
        )}

        {/* Neutral (index 3) */}
        {options[3] && (
          <AnswerButton
            option={options[3]}
            index={3}
            isSelected={selectedOption === 3}
            disabled={disabled}
            onSelect={handleOptionSelect}
            isMobile={true}
          />
        )}
      </div>
    );
  }

  // Desktop layout: Horizontal row
  return (
    <>
      {options.map((option: string, index: number) => (
        <AnswerButton
          key={index}
          option={option}
          index={index}
          isSelected={selectedOption === index}
          disabled={disabled}
          onSelect={handleOptionSelect}
          isMobile={false}
        />
      ))}
    </>
  );
}

