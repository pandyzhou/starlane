import React from 'react';

const BEAM_GRADIENT =
  'linear-gradient(rgb(var(--theme-primary-rgb)) 0%, rgb(var(--theme-primary-rgb) / 0) 100%)';

const BEAM_MASKS = [
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 36%, rgb(0, 0, 0) 55%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 11%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0.55) 41%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 78%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 9%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 28%, rgba(0, 0, 0, 0.424) 40%, rgb(0, 0, 0) 48%, rgba(0, 0, 0, 0.267) 54%, rgba(0, 0, 0, 0.13) 78%, rgb(0, 0, 0) 88%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 17%, rgba(0, 0, 0, 0.55) 26%, rgba(0, 0, 0) 35%, rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 0.13) 69%, rgb(0, 0, 0) 79%, rgba(0, 0, 0, 0) 97%)',
  'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 27%, rgba(0, 0, 0) 42%, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.13) 67%, rgb(0, 0, 0) 74%, rgb(0, 0, 0) 82%, rgba(0, 0, 0, 0.47) 88%, rgba(0, 0, 0, 0) 97%)',
];

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export const ElegantPattern: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden text-theme-fg">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(100% 100% at 0% 0%, rgb(var(--theme-muted-rgb) / 0.35) 0%, transparent 100%)',
        maskImage:
          'radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88.2883%, rgba(0, 0, 0, 0) 100%)',
        WebkitMaskImage:
          'radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88.2883%, rgba(0, 0, 0, 0) 100%)',
      }}
    >
      {BEAM_MASKS.map((mask, idx) => (
        <div
          key={idx}
          className="absolute inset-0 opacity-20 dark:opacity-25"
          style={{
            background: BEAM_GRADIENT,
            maskImage: mask,
            WebkitMaskImage: mask,
            transform: 'skewX(45deg)',
          }}
        />
      ))}
    </div>

    <div
      className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-repeat"
      style={{
        backgroundImage: `url("${GRAIN_SVG}")`,
        backgroundSize: '150px 150px',
      }}
    />

    <div
      className="absolute inset-0 opacity-20 dark:opacity-25"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    />
  </div>
);
