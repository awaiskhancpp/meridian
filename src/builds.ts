export const colors = {
  primary: '#4A3424',
  primarySoft: '#5B4836',
  primaryHover: '#4A2F1C',
  accent: '#3C2515',
  background: '#FFFFFF',
  surface: '#EFE6D8',
  surfaceMuted: '#F7F1E7',
  foreground: '#24170F',
  mutedForeground: '#6F513D',
  onPrimaryMuted: 'rgba(255,255,255,0.6)',
  onPrimarySubtle: 'rgba(255,255,255,0.7)',
  onPrimaryStrong: 'rgba(255,255,255,0.85)',
  onPrimaryFaint: 'rgba(255,255,255,0.2)',
  onPrimaryHigh: 'rgba(255,255,255,0.95)',
  border: 'rgba(60,37,21,0.08)',
  borderMuted: 'rgba(60,37,21,0.12)',
  borderStrong: 'rgba(60,37,21,0.2)',
  borderInverse: 'rgba(255,255,255,0.3)',
  borderInverseStrong: 'rgba(255,255,255,0.7)',
  overlay: 'rgba(34,24,18,0.38)',
  overlayStrong: 'rgba(34,24,18,0.74)',
  imageOverlay: 'rgba(0,0,0,0.4)',
  panel: 'rgba(60,37,21,0.82)',
  overlaySoft: 'rgba(0,0,0,0.1)',
  glass: 'rgba(239,230,216,0.86)',
} as const

export const surfaces = {
  page: colors.background,
  section: colors.surface,
  card: colors.background,
  overlay: 'rgba(255,255,255,0.9)',
} as const

export const status = {
  danger: '#EA4335',
  dangerBackground: 'rgba(234,67,53,0.08)',
  success: '#34A853',
  successBackground: 'rgba(52,168,83,0.08)',
  warning: '#FBBC05',
  warningBackground: 'rgba(251,188,5,0.08)',
  info: '#4285F4',
  infoBackground: 'rgba(66,133,244,0.08)',
} as const

export const fonts = {
  sans: "'Host Grotesk', sans-serif",
  script: "'Allura', cursive",
} as const

export const fontSize = {
  caption: '0.68rem',
  bodySm: '0.875rem',
  body: '0.95rem',
  bodyLg: '1.125rem',
  card: 'clamp(1.35rem,2vw,1.85rem)',
  cardTitle: 'clamp(1.5rem,2vw,2rem)',
  form: 'clamp(1.8rem,3.6vw,2.6rem)',
  displayLg: '4.5rem',
  subheading: 'clamp(1.9rem,3.8vw,3.2rem)',
  heading: 'clamp(1.9rem,3.8vw,3.2rem)',
  headingLg: 'clamp(2.75rem,6.8vw,5.85rem)',
  display: 'clamp(2.75rem,6.8vw,5.85rem)',
  script: 'clamp(2.1rem,4vw,3.5rem)',
  displayScript: 'clamp(3.1rem,7vw,6.1rem)',
} as const

export const tracking = {
  tight: '-0.025em',
  hero: '-0.03em',
  base: '0em',
  wide: '0.025em',
  wider: '0.1em',
} as const

export const lineHeight = {
  tight: '0.92',
  hero: '0.9',
  snug: '0.98',
  section: '0.95',
  normal: '1.1',
  body: '1.6',
} as const

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
} as const

export const spacing = {
  4: '0.25rem',
  8: '0.5rem',
  12: '0.75rem',
  16: '1rem',
  24: '1.5rem',
  32: '2rem',
  48: '3rem',
  64: '4rem',
  80: '5rem',
  96: '6rem',
  sectionSm: '2.5rem',
  sectionMd: '4rem',
  sectionLg: '6rem',
  sectionXl: '6.5rem',
} as const

export const layout = {
  contentMax: '1440px',
  navHeight: '72px',
  divider: '0.125rem',
  viewport: '100svh',
  viewportShort: '60vh',
  viewportPage: '85vh',
  viewportTall: '90vh',
  viewportWidth: '90vw',
  viewportWidthWide: '85vw',
  media: '28rem',
  mediaLg: '34rem',
} as const

export const aspectRatio = {
  landscape: '4/3',
  portrait: '4/5',
} as const

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  full: '9999px',
} as const

export const shadow = {
  sm: '0 12px 28px rgba(60,37,21,0.08)',
  md: '0 18px 48px rgba(60,37,21,0.1)',
  lg: '0 20px 60px rgba(0,0,0,0.12)',
} as const

export const motion = {
  standard: '300ms',
  accordionProperty: 'grid-template-rows',
  buttonReveal: '350ms',
  buttonEasing: 'cubic-bezier(0.4,0,0.2,1)',
} as const

export const zIndex = {
  navbar: 50,
  modal: 100,
  toast: 200,
} as const

export const gradients = {
  hero: 'linear-gradient(115deg,rgba(34,24,18,0.7) 0%,rgba(34,24,18,0.42) 38%,rgba(34,24,18,0.12) 68%,rgba(34,24,18,0.04) 100%)',
  card: 'linear-gradient(180deg,rgba(60,37,21,0.08) 0%,rgba(60,37,21,0.18) 100%)',
  radial: 'radial-gradient(circle at center,rgba(60,37,21,0.03) 0%,transparent 70%)',
  cardBottom: 'linear-gradient(180deg,transparent 0%,rgba(0,0,0,0.1) 100%)',
} as const

export const semantic = {
  background: surfaces.page,
  foreground: colors.foreground,
  card: surfaces.card,
  cardForeground: colors.foreground,
  primary: colors.primary,
  primaryForeground: colors.background,
  secondary: colors.primarySoft,
  secondaryForeground: colors.background,
  muted: surfaces.section,
  mutedForeground: colors.mutedForeground,
  accent: colors.accent,
  accentForeground: colors.background,
  border: colors.border,
  input: colors.borderMuted,
  ring: colors.accent,
  destructive: status.danger,
  destructiveForeground: colors.background,
  success: status.success,
  successForeground: colors.background,
  warning: status.warning,
  warningForeground: colors.foreground,
  info: status.info,
  infoForeground: colors.background,
} as const

export const design = {
  colors,
  surfaces,
  status,
  fonts,
  fontSize,
  tracking,
  lineHeight,
  fontWeight,
  spacing,
  layout,
  aspectRatio,
  radius,
  shadow,
  motion,
  zIndex,
  gradients,
  semantic,
} as const

export default design
