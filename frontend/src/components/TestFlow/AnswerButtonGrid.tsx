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
  const isMobile = useMobile();

  const handleOptionSelect = (index: number) => {
    if (!disabled) {
      onSelect(index);
    }
  };

  // Mobile layout: Special arrangement
  if (isMobile) {
    return (
      <>
        {/* Top row: options 4, 5, 6 */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          width: '100%',
        }}>
          {[4, 5, 6].map((originalIndex) => {
            if (originalIndex >= options.length) return null;
            const option = options[originalIndex];
            return (
              <motion.button
                key={originalIndex}
                onClick={() => handleOptionSelect(originalIndex)}
                whileHover={!disabled ? { 
                  y: -4,
                  boxShadow: `0 0 12px ${glowColors[originalIndex]}, 0 4px 18px rgba(0,0,0,0.1)`,
                  filter: 'brightness(1.06)',
                  transition: { duration: 0.12, ease: 'easeOut' }
                } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
                disabled={disabled}
                style={{
                  padding: '10px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: answerGradients[originalIndex] || answerGradients[0],
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#333',
                  transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
                  opacity: disabled ? 0.6 : 1,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  position: 'relative',
                  zIndex: selectedOption === originalIndex ? 2 : 1,
                  minWidth: '100px',
                  flex: '1 1 0',
                  whiteSpace: 'nowrap',
                }}
              >
                {option}
              </motion.button>
            );
          })}
        </div>
        
        {/* Middle row: option 3 (neutral) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
          {options[3] && (
            <motion.button
              key={3}
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
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                position: 'relative',
                zIndex: selectedOption === 3 ? 2 : 1,
                minWidth: '250px',
                maxWidth: '250px',
                whiteSpace: 'nowrap',
              }}
            >
              {options[3]}
            </motion.button>
          )}
        </div>
        
        {/* Bottom row: options 0, 1, 2 */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          width: '100%',
        }}>
          {[0, 1, 2].map((originalIndex) => {
            if (originalIndex >= options.length) return null;
            const option = options[originalIndex];
            return (
              <motion.button
                key={originalIndex}
                onClick={() => handleOptionSelect(originalIndex)}
                whileHover={!disabled ? { 
                  y: -4,
                  boxShadow: `0 0 12px ${glowColors[originalIndex]}, 0 4px 18px rgba(0,0,0,0.1)`,
                  filter: 'brightness(1.06)',
                  transition: { duration: 0.12, ease: 'easeOut' }
                } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
                disabled={disabled}
                style={{
                  padding: '10px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: answerGradients[originalIndex] || answerGradients[0],
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#333',
                  transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
                  opacity: disabled ? 0.6 : 1,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  position: 'relative',
                  zIndex: selectedOption === originalIndex ? 2 : 1,
                  minWidth: '100px',
                  flex: '1 1 0',
                  whiteSpace: 'nowrap',
                }}
              >
                {option}
              </motion.button>
            );
          })}
        </div>
      </>
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

