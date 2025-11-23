import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
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
          <motion.button
            className="answer-option answer-always"
            onClick={() => handleOptionSelect(6)}
            whileHover={!disabled ? { 
              y: -4,
              boxShadow: `0 0 12px ${glowColors[6]}, 0 4px 18px rgba(0,0,0,0.1)`,
              filter: 'brightness(1.06)',
              transition: { duration: 0.12, ease: 'easeOut' }
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '12px',
              background: answerGradients[6] || answerGradients[0],
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
              opacity: disabled ? 0.6 : 1,
              boxShadow: selectedOption === 6 ? `0 0 12px ${glowColors[6]}, 0 4px 18px rgba(0,0,0,0.1)` : '0 2px 6px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: selectedOption === 6 ? 2 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {options[6]}
          </motion.button>
        )}

        {/* Never (index 0) */}
        {options[0] && (
          <motion.button
            className="answer-option answer-never"
            onClick={() => handleOptionSelect(0)}
            whileHover={!disabled ? { 
              y: -4,
              boxShadow: `0 0 12px ${glowColors[0]}, 0 4px 18px rgba(0,0,0,0.1)`,
              filter: 'brightness(1.06)',
              transition: { duration: 0.12, ease: 'easeOut' }
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '12px',
              background: answerGradients[0] || answerGradients[0],
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
              opacity: disabled ? 0.6 : 1,
              boxShadow: selectedOption === 0 ? `0 0 12px ${glowColors[0]}, 0 4px 18px rgba(0,0,0,0.1)` : '0 2px 6px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: selectedOption === 0 ? 2 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {options[0]}
          </motion.button>
        )}

        {/* Usually (index 5) */}
        {options[5] && (
          <motion.button
            className="answer-option answer-usually"
            onClick={() => handleOptionSelect(5)}
            whileHover={!disabled ? { 
              y: -4,
              boxShadow: `0 0 12px ${glowColors[5]}, 0 4px 18px rgba(0,0,0,0.1)`,
              filter: 'brightness(1.06)',
              transition: { duration: 0.12, ease: 'easeOut' }
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '12px',
              background: answerGradients[5] || answerGradients[0],
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
              opacity: disabled ? 0.6 : 1,
              boxShadow: selectedOption === 5 ? `0 0 12px ${glowColors[5]}, 0 4px 18px rgba(0,0,0,0.1)` : '0 2px 6px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: selectedOption === 5 ? 2 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {options[5]}
          </motion.button>
        )}

        {/* Rarely (index 1) */}
        {options[1] && (
          <motion.button
            className="answer-option answer-rarely"
            onClick={() => handleOptionSelect(1)}
            whileHover={!disabled ? { 
              y: -4,
              boxShadow: `0 0 12px ${glowColors[1]}, 0 4px 18px rgba(0,0,0,0.1)`,
              filter: 'brightness(1.06)',
              transition: { duration: 0.12, ease: 'easeOut' }
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '12px',
              background: answerGradients[1] || answerGradients[0],
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
              opacity: disabled ? 0.6 : 1,
              boxShadow: selectedOption === 1 ? `0 0 12px ${glowColors[1]}, 0 4px 18px rgba(0,0,0,0.1)` : '0 2px 6px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: selectedOption === 1 ? 2 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {options[1]}
          </motion.button>
        )}

        {/* Often (index 4) */}
        {options[4] && (
          <motion.button
            className="answer-option answer-often"
            onClick={() => handleOptionSelect(4)}
            whileHover={!disabled ? { 
              y: -4,
              boxShadow: `0 0 12px ${glowColors[4]}, 0 4px 18px rgba(0,0,0,0.1)`,
              filter: 'brightness(1.06)',
              transition: { duration: 0.12, ease: 'easeOut' }
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '12px',
              background: answerGradients[4] || answerGradients[0],
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
              opacity: disabled ? 0.6 : 1,
              boxShadow: selectedOption === 4 ? `0 0 12px ${glowColors[4]}, 0 4px 18px rgba(0,0,0,0.1)` : '0 2px 6px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: selectedOption === 4 ? 2 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {options[4]}
          </motion.button>
        )}

        {/* Sometimes (index 2) */}
        {options[2] && (
          <motion.button
            className="answer-option answer-sometimes"
            onClick={() => handleOptionSelect(2)}
            whileHover={!disabled ? { 
              y: -4,
              boxShadow: `0 0 12px ${glowColors[2]}, 0 4px 18px rgba(0,0,0,0.1)`,
              filter: 'brightness(1.06)',
              transition: { duration: 0.12, ease: 'easeOut' }
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '12px',
              background: answerGradients[2] || answerGradients[0],
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
              opacity: disabled ? 0.6 : 1,
              boxShadow: selectedOption === 2 ? `0 0 12px ${glowColors[2]}, 0 4px 18px rgba(0,0,0,0.1)` : '0 2px 6px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: selectedOption === 2 ? 2 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {options[2]}
          </motion.button>
        )}

        {/* Neutral (index 3) */}
        {options[3] && (
          <motion.button
            className="answer-option answer-neutral"
            onClick={() => handleOptionSelect(3)}
            whileHover={!disabled ? { 
              y: -4,
              boxShadow: `0 0 12px ${glowColors[3]}, 0 4px 18px rgba(0,0,0,0.1)`,
              filter: 'brightness(1.06)',
              transition: { duration: 0.12, ease: 'easeOut' }
            } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            style={{
              padding: '10px 14px',
              border: 'none',
              borderRadius: '12px',
              background: answerGradients[3] || answerGradients[0],
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: '600',
              color: '#333',
              transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
              opacity: disabled ? 0.6 : 1,
              boxShadow: selectedOption === 3 ? `0 0 12px ${glowColors[3]}, 0 4px 18px rgba(0,0,0,0.1)` : '0 2px 6px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: selectedOption === 3 ? 2 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {options[3]}
          </motion.button>
        )}
      </div>
    );
  }

  // Desktop layout: Horizontal row
  return (
    <>
      {options.map((option: string, index: number) => (
        <motion.button
          key={index}
          onClick={() => handleOptionSelect(index)}
          whileHover={!disabled ? { 
            y: -4,
            boxShadow: `0 0 12px ${glowColors[index] || glowColors[0]}, 0 4px 18px rgba(0,0,0,0.1)`,
            filter: 'brightness(1.06)',
            transition: { duration: 0.12, ease: 'easeOut' }
          } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          disabled={disabled}
          style={{
            padding: '12px 20px',
            border: 'none',
            borderRadius: '12px',
            background: answerGradients[index] || answerGradients[0],
            cursor: disabled ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
            transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
            opacity: disabled ? 0.6 : 1,
            boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
            position: 'relative',
            zIndex: selectedOption === index ? 2 : 1,
            flex: '1 1 0',
            maxWidth: '150px',
            whiteSpace: 'nowrap',
          }}
        >
          {option}
        </motion.button>
      ))}
    </>
  );
}

