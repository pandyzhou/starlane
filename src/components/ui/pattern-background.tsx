import React from 'react';

export const PatternBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 overflow-hidden"
    style={{ containerType: 'size' }}
  >
    <div
      className="absolute"
      style={{
        inset: '-0.8cqmin',
        filter: 'blur(0.4cqmin)',
        backgroundColor: 'var(--pattern-sky-base)',
        backgroundImage: `
          radial-gradient(circle at 65.34% 44.62%, var(--pattern-sky-1) 0%, transparent 34.1%),
          radial-gradient(circle at 28.07% 74.48%, var(--pattern-sky-2) 0%, transparent 45.65%),
          radial-gradient(circle at 52.42% 19.94%, var(--pattern-sky-3) 0%, transparent 57.55%),
          radial-gradient(circle at 80.31% 84.47%, var(--pattern-sky-4) 0%, transparent 69.1%)
        `,
      }}
    />
  </div>
);
