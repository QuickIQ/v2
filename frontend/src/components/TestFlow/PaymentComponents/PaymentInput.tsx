import { motion } from 'framer-motion';

interface PaymentInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'password';
  maxLength?: number;
  icon?: string;
  formatValue?: (value: string) => string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function PaymentInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  maxLength,
  icon,
  formatValue,
  onFocus,
  onBlur,
}: PaymentInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatValue ? formatValue(e.target.value) : e.target.value;
    onChange(newValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = error ? '#e74c3c' : '#7B6CFF';
    e.target.style.background = '#ffffff';
    e.target.style.boxShadow = error
      ? '0 0 0 3px rgba(231, 76, 60, 0.1)'
      : 'inset 0 1px 3px rgba(0,0,0,0.08), 0 0 0 2px rgba(123, 108, 255, 0.2)';
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = error ? '#e74c3c' : 'transparent';
    e.target.style.background = '#f7f7f7';
    e.target.style.boxShadow = error
      ? '0 0 0 3px rgba(231, 76, 60, 0.1)'
      : 'inset 0 1px 3px rgba(0,0,0,0.08)';
    onBlur?.(e);
  };

  return (
    <div style={{ marginBottom: error ? '4px' : '0' }}>
      <label
        style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '500',
          color: '#333',
          marginBottom: '8px',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              opacity: 0.4,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          style={{
            width: '100%',
            padding: icon ? '14px 16px 14px 48px' : '14px 16px',
            borderRadius: '14px',
            border: `2px solid ${error ? '#e74c3c' : 'transparent'}`,
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.2s ease',
            background: '#f7f7f7',
            color: '#2A2A2A',
            boxShadow: error
              ? '0 0 0 3px rgba(231, 76, 60, 0.1)'
              : 'inset 0 1px 3px rgba(0,0,0,0.08)',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            userSelect: 'text',
            WebkitUserSelect: 'text',
            MozUserSelect: 'text',
            msUserSelect: 'text',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {error && (
        <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

