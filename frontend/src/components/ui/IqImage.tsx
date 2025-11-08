import React from 'react';

interface IqImageProps {
  src: string;
  alt: string;
  isQuestion?: boolean;
  className?: string;
}

export const IqImage: React.FC<IqImageProps> = ({ src, alt, isQuestion = false, className = '' }) => {
  const baseClasses = 'iq-image';
  const typeClass = isQuestion ? 'question' : 'answer';
  const combinedClasses = `${baseClasses} ${typeClass} ${className}`.trim();

  return (
    <img
      src={src}
      alt={alt}
      className={combinedClasses}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        objectFit: 'contain',
        width: isQuestion ? '360px' : '120px',
        height: isQuestion ? '360px' : '120px',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    />
  );
};

