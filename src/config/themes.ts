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