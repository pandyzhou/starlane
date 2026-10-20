import themesData from './themes.json';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardFg: string;
  cardDesc: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  glowA: string;
  glowB: string;
}

export interface ThemeItem {
  id: string;
  name: string;
  displayName: string;
  type: 'light' | 'dark';
  icon: string;
  colors: ThemeColors;
}

export const THEMES: ThemeItem[] = themesData as ThemeItem[];

export const DEFAULT_THEME_ID = 'candyland';

/** ??? ? CSS ?????? index.css / tailwind.config.js ????? */
export const VAR_SUFFIX: Record<keyof ThemeColors, string> = {
  background: 'bg',
  foreground: 'fg',
  card: 'card',
  cardFg: 'card-fg',
  cardDesc: 'card-desc',
  border: 'border',
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
  muted: 'muted',
  glowA: 'glow-a',
  glowB: 'glow-b'
};

/** ?????? rgb ??????? Tailwind ????????? */
export const ALPHA_KEYS: Array<keyof ThemeColors> = [
  'background',
  'foreground',
  'card',
  'cardFg',
  'cardDesc',
  'border',
  'primary',
  'secondary',
  'accent',
  'muted'
];

/** #rrggbb / #rgb ? "r g b" */
export function hexToRgbTriplet(hex: string): string {
  const raw = hex.replace('#', '').trim();
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return '0 0 0';
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
