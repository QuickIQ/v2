interface StatItemProps {
  emoji: string;
  title: string;
  subtitle?: string;
  isMobile?: boolean;
}

export function StatItem({ emoji, title, subtitle, isMobile }: StatItemProps) {
  return (
    <div style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>{emoji}</span>
        <p
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#444',
            margin: 0,
          }}
        >
          {title}
        </p>
      </div>
      {!isMobile && subtitle && (
        <p
          style={{
            fontSize: '12px',
            fontWeight: '500',
            opacity: 0.55,
            color: '#666',
            margin: 0,
            marginLeft: '28px',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

