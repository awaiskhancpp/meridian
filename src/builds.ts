/**
 * builds.ts
 * Central design token file. All theme values live here.
 * Import from this file to stay consistent across components.
 *
 * IMPORTANT — Tailwind cannot resolve dynamic class names at build time.
 * Use these tokens as Tailwind arbitrary values: bg-[#4a9ebb]
 * or reference them in style= props when truly dynamic.
 */

// ─── Color Palette ───────────────────────────────────────────────────────────
export const colors = {
  // Primary backgrounds
  bgDeep: '#0d1b2a', // deepest navy  (outermost bg)
  bgDark: '#112233', // dark navy     (main surface)
  bgCard: '#162d3f', // card / glass surface

  // Accent — steel blue, sits naturally in the deep navy palette
  accent: '#4a9ebb',
  accentHover: '#357a96',
  accentLight: '#6ab4d0', // lighter tint for hover states / glows

  // Text
  textPrimary: '#ffffff', // HEX #FFFFFF  RGB 255,255,255
  textSecondary: '#a8bcc8', // muted blue-grey
  textMuted: '#6b8898',

  // Neutral
  black: '#000000', // HEX #000000  RGB 0,0,0
  darkSlate: '#223338', // HEX #223338  RGB 34,51,56

  // UI chrome — kept as strings so they can be used in arbitrary Tailwind values
  navBg: 'rgba(17,34,51,0.80)', // scrolled navbar bg
  navBorder: 'rgba(255,255,255,0.10)',
  inputBg: 'rgba(255,255,255,0.06)',
  inputBorder: 'rgba(255,255,255,0.10)',
  glassBg: 'rgba(22,45,63,0.72)',
  glassBorder: 'rgba(255,255,255,0.10)',
} as const

// ─── Typography ───────────────────────────────────────────────────────────────
// Font: DM Sans — Regular 400, Medium 500, SemiBold 600
export const fontFamily = {
  sans: "'DM Sans', sans-serif",
} as const

// Font sizes — three breakpoints: sm (<640) | md (640-1024) | lg (>1024)
export const fontSize = {
  h1: { lg: '3.5rem', md: '2.75rem', sm: '2rem' }, // 56 / 44 / 32px
  h2: { lg: '2.75rem', md: '2.125rem', sm: '1.625rem' }, // 44 / 34 / 26px
  h3: { lg: '2rem', md: '1.625rem', sm: '1.375rem' }, // 32 / 26 / 22px
  h4: { lg: '1.5rem', md: '1.25rem', sm: '1.125rem' }, // 24 / 20 / 18px
  h5: { lg: '1.25rem', md: '1.125rem', sm: '1rem' }, // 20 / 18 / 16px
  p: { lg: '1rem', md: '0.9375rem', sm: '0.875rem' }, // 16 / 15 / 14px
} as const

export const lineHeight = {
  h1: '1.15',
  h2: '1.2',
  h3: '1.25',
  h4: '1.3',
  h5: '1.35',
  p: '1.6',
} as const

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
} as const

// ─── Button Padding ───────────────────────────────────────────────────────────
// [paddingY, paddingX]
export const buttonPadding = {
  lg: ['0.875rem', '2rem'], // 14px 32px
  md: ['0.625rem', '1.5rem'], // 10px 24px
  sm: ['0.5rem', '1.125rem'], // 8px  18px
} as const

// ─── Border Radius ────────────────────────────────────────────────────────────
export const borderRadius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '20px',
  full: '9999px',
} as const

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const spacing = {
  section: { lg: '6rem', md: '4rem', sm: '2.5rem' },
  navH: { lg: '72px', md: '64px', sm: '56px' },
  containerPx: { lg: '5rem', md: '2.5rem', sm: '1.25rem' },
} as const

// ─── Z-Index ──────────────────────────────────────────────────────────────────
export const zIndex = {
  navbar: 50,
  modal: 100,
  toast: 200,
} as const
