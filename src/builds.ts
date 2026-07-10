/**
 * Central design tokens for the template.
 *
 * Palette:
 * - deep brown canvas
 * - espresso accent
 * - warm cream
 * - pure white
 */

export const colors = {
  bgDeep: '#5B4836',
  bgDark: '#4A3424',
  bgCard: '#3C2515',
  bgCream: '#EFE6D8',
  bgWhite: '#FFFFFF',

  accent: '#3C2515',
  accentHover: '#4A2F1C',
  accentLight: '#8A694D',

  textPrimary: '#FFFFFF',
  textSecondary: '#F7F1E7',
  textMuted: '#D8C9B7',

  textDark: '#3C2515',
  textDarkMuted: '#6F513D',

  black: '#24170F',
  white: '#FFFFFF',
  cream: '#EFE6D8',
  darkSlate: '#3C2515',

  navBg: 'rgba(255,255,255,0.96)',
  navBgDefault: 'rgba(255,255,255,0.88)',
  navBorder: 'rgba(60,37,21,0.08)',
  glassBg: 'rgba(239,230,216,0.86)',
  glassBorder: 'rgba(60,37,21,0.12)',
  formBg: 'rgba(239,230,216,0.94)',
  inputBg: 'rgba(60,37,21,0.05)',
  inputBorder: 'rgba(60,37,21,0.16)',
} as const

// Host Grotesk handles body/UI text.
// Allura handles the script accent used in headings.
export const fontFamily = {
  sans: "'Host Grotesk', sans-serif",
  script: "'Allura', cursive",
} as const

// Font sizes are responsive by breakpoint: sm (<640) | md (640-1024) | lg (>1024)
export const fontSize = {
  h1: { lg: '3.5rem', md: '2.75rem', sm: '2rem' },
  h2: { lg: '2.75rem', md: '2.125rem', sm: '1.625rem' },
  h3: { lg: '2rem', md: '1.625rem', sm: '1.375rem' },
  h4: { lg: '1.5rem', md: '1.25rem', sm: '1.125rem' },
  h5: { lg: '1.25rem', md: '1.125rem', sm: '1rem' },
  p: { lg: '1rem', md: '0.9375rem', sm: '0.875rem' },
} as const

export const lineHeight = {
  h1: '1.1',
  h2: '1.1',
  h3: '1.25',
  h4: '1.3',
  h5: '1.35',
  p: '1.6',
} as const

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

// Button padding tokens.
export const buttonPadding = {
  lg: ['0.875rem', '2rem'],
  md: ['0.625rem', '1.5rem'],
  sm: ['0.5rem', '1.125rem'],
} as const

// Border radius tokens.
export const borderRadius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '20px',
  full: '9999px',
} as const

// Spacing tokens.
export const spacing = {
  section: { lg: '6rem', md: '4rem', sm: '2.5rem' },
  navH: { lg: '72px', md: '64px', sm: '56px' },
  containerPx: { lg: '5rem', md: '2.5rem', sm: '1.25rem' },
} as const

// Z-index tokens.
export const zIndex = {
  navbar: 50,
  modal: 100,
  toast: 200,
} as const
