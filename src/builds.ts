/**
 * Central design tokens for the template.
 *
 * Keep these values aligned with the current live styling.
 * If a component needs a new visual treatment, add the value here first
 * and then wire it through the generator or component utilities.
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
  overlayDark: 'rgba(0,0,0,0.4)',
  panelDark: 'rgba(60,37,21,0.82)',
  whiteSoft: 'rgba(255,255,255,0.05)',
  whiteGhost: 'rgba(255,255,255,0.1)',
  whiteFaint: 'rgba(255,255,255,0.2)',
  whiteMuted: 'rgba(255,255,255,0.6)',
  whiteSubtle: 'rgba(255,255,255,0.7)',
  whiteOverlay: 'rgba(255,255,255,0.9)',
  whiteHigh: 'rgba(255,255,255,0.95)',
  borderLightSoft: 'rgba(255,255,255,0.2)',
  borderLightMuted: 'rgba(255,255,255,0.3)',
  borderLightMid: 'rgba(255,255,255,0.35)',
  borderLightStrong: 'rgba(255,255,255,0.5)',
  borderLightHeavy: 'rgba(255,255,255,0.7)',
  borderEmphasis: 'rgba(60,37,21,0.3)',
  ringDarkSoft: 'rgba(0,0,0,0.05)',

  // Shared alpha values used across cards, nav, borders, and overlays.
  borderSubtle: 'rgba(60,37,21,0.08)',
  borderSoft: 'rgba(60,37,21,0.1)',
  borderMuted: 'rgba(60,37,21,0.12)',
  borderDivider: 'rgba(60,37,21,0.15)',
  borderStrong: 'rgba(60,37,21,0.2)',
  borderDividerStrong: 'rgba(60,37,21,0.25)',
  borderExtraStrong: 'rgba(60,37,21,0.22)',
  accentFaint: 'rgba(60,37,21,0.06)',

  // Hero and panel overlays.
  heroOverlay: 'rgba(34,24,18,0.38)',
  heroOverlayMid: 'rgba(34,24,18,0.18)',
  heroOverlayStrong: 'rgba(34,24,18,0.74)',
  serviceHeroOverlay: 'rgba(34,24,18,0.45)',
  serviceHeroOverlayMid: 'rgba(34,24,18,0.25)',
  serviceHeroOverlayStrong: 'rgba(34,24,18,0.7)',
  cardOverlay: 'rgba(60,37,21,0.08)',
  cardOverlayStrong: 'rgba(60,37,21,0.18)',
  radialWarm: 'rgba(60,37,21,0.03)',

  // Decorative accents used for icons, ratings, and highlights.
  decorativeGold: '#FBBC05',
  decorativeBlue: '#4285F4',
  decorativeGreen: '#34A853',
  decorativeRed: '#EA4335',
  decorativeTerracotta: '#c28b6e',
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

export const buttonClasses = {
  base: 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-accent/40 disabled:opacity-50 disabled:pointer-events-none',
  sizes: {
    lg: 'btn-padding-lg text-base',
    md: 'btn-padding-md text-sm',
    sm: 'btn-padding-sm text-sm',
  },
  variants: {
    primary: 'bg-accent hover:bg-accent-hover text-white border border-transparent shadow-soft',
    outline: 'bg-transparent border border-extra-strong text-dark hover:bg-accent hover:text-white',
    outlineLight:
      'bg-transparent border border-light-heavy text-white hover:bg-white hover:text-dark',
    ghost: 'bg-transparent border border-transparent text-dark hover:bg-accent-faint',
  },
  line: 'group relative inline-flex items-center gap-3 pb-2 text-sm font-semibold uppercase tracking-[0.18em] text-dark',
  lineSweep:
    'absolute inset-0 -translate-x-full transform bg-current transition-transform duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0',
} as const

// Shadow tokens that mirror the current template visuals.
export const shadow = {
  soft: '0 12px 28px rgba(60,37,21,0.08)',
  card: '0 18px 48px rgba(60,37,21,0.1)',
  cardStrong: '0 12px 28px rgba(60,37,21,0.18)',
  lift: '0 20px 60px rgba(0,0,0,0.12)',
  navbar: '0 18px 48px rgba(60,37,21,0.06)',
  menu: '0 28px 70px rgba(60,37,21,0.12)',
} as const

// Reusable gradients used by hero and card overlays.
export const gradient = {
  hero: 'linear-gradient(115deg,rgba(34,24,18,0.7) 0%,rgba(34,24,18,0.42) 38%,rgba(34,24,18,0.12) 68%,rgba(34,24,18,0.04) 100%)',
  serviceHero:
    'linear-gradient(115deg,rgba(34,24,18,0.7) 0%,rgba(34,24,18,0.42) 38%,rgba(34,24,18,0.12) 68%,rgba(34,24,18,0.04) 100%)',
  card: 'linear-gradient(180deg,rgba(60,37,21,0.08) 0%,rgba(60,37,21,0.18) 100%)',
  radialWarm: 'radial-gradient(circle at center,rgba(60,37,21,0.03) 0%,transparent 70%)',
  cardBottomDark: 'linear-gradient(180deg,transparent 0%,rgba(0,0,0,0.1) 100%)',
} as const
