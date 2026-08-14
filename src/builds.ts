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
  overlayHeavy: 'rgba(0,0,0,0.85)',
  overlayLight: 'rgba(0,0,0,0.1)',
  panelDark: 'rgba(60,37,21,0.82)',
  whiteSoft: 'rgba(255,255,255,0.05)',
  whiteGhost: 'rgba(255,255,255,0.1)',
  whiteFaint: 'rgba(255,255,255,0.2)',
  whiteMuted: 'rgba(255,255,255,0.6)',
  whiteSubtle: 'rgba(255,255,255,0.7)',
  whiteStrong: 'rgba(255,255,255,0.85)',
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

// Page-level surface roles. Components use these names so a builder can
// change a whole surface category from one source of truth.
export const surfaces = {
  page: colors.bgWhite,
  section: colors.bgCream,
  card: colors.white,
  overlay: colors.whiteOverlay,
  dark: colors.bgDark,
} as const

// Status colors derive from the existing palette rather than introducing
// fresh, untraceable hex values — changing decorativeRed still changes
// error states everywhere, since dangerFg points at the same value.
export const status = {
  dangerFg: colors.decorativeRed,
  dangerBg: 'rgba(234,67,53,0.08)',
  successFg: colors.decorativeGreen,
  successBg: 'rgba(52,168,83,0.08)',
  warningFg: colors.decorativeGold,
  warningBg: 'rgba(251,188,5,0.08)',
  infoFg: colors.decorativeBlue,
  infoBg: 'rgba(66,133,244,0.08)',
} as const

// Letter-spacing tokens. Every value here matches what's already in use
// somewhere in the repo exactly — this centralizes existing values,
// it does not redesign the scale. One genuine single-use value
// (0.24em, Navbar's mobile menu link) is intentionally left as a
// plain arbitrary value rather than tokenized, since a token only
// earns its place once a value is actually shared across files.
export const tracking = {
  eyebrow: '0.34em',
  label: '0.28em',
  snug: '0.22em',
  loose: '0.2em',
  medium: '0.18em',
  pill: '0.14em',
  nav: '0.12em',
  headingTight: '-0.02em',
  headingSubtle: '-0.015em',
  headingMedium: '-0.03em',
  headingLoose: '-0.04em',
} as const

// Host Grotesk handles body/UI text.
// Allura handles the script accent used in headings.
export const fontFamily = {
  sans: "'Host Grotesk', sans-serif",
  script: "'Allura', cursive",
} as const

// Central typography and layout recipes used by components. Keep values here
// so a builder can update the template from one source of truth.
export const typography = {
  heroDisplay: 'clamp(2.75rem,6.8vw,5.85rem)',
  heroScript: 'clamp(3.1rem,7vw,6.1rem)',
  body: '0.95rem',
  eyebrow: '0.68rem',
  metadata: '0.65rem',
  heroLine: '0.9',
  scriptLine: '0.82',
  headingLine: '0.92',
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
  // The page's shared outer content width.
  // independently in both Container.tsx and Hero.tsx (same raw value,
  // two places), the exact "should be a token" signal.
  contentMaxWidth: '1440px',
  carouselOffset: '14rem',
  cardMedia: '28rem',
  cardMediaLg: '34rem',
  contactMapHeight: '437px',
  dropdownWidth: '220px',
  dropdownTop: '85%',
  gapCard: '0.75rem',
  narrowCopy: '260px',
  headerTop: '6rem',
  gapField: '0.75rem',
  dividerWidth: '0.125rem',
  heroTop: { base: '6rem', sm: '7rem', lg: '8rem', wide: '6rem' },
  aboutCalloutRight: { base: '4rem', md: '18rem' },
} as const

export const layout = {
  sectionPadding: { sm: '2.5rem', lg: '4rem' },
  sectionMarginBottom: { sm: '2.5rem', lg: '4rem' },
  heroColumns: 'minmax(0,1fr) auto',
  galleryAspect: '16/10',
  accordionExpanded: '1fr',
  accordionCollapsed: '0fr',
} as const

export const motion = {
  standard: '300ms',
  accordionProperty: 'grid-template-rows',
  buttonReveal: '350ms',
  buttonEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Component-level recipes. Components reference these semantic names instead
// of exposing raw clamp(), viewport, pixel, or fraction values in class names.
export const componentStyles = {
  type: {
    heroDisplay: 'clamp(2.75rem,6.8vw,5.85rem)',
    heroScript: 'clamp(3.1rem,7vw,6.1rem)',
    eyebrow: '0.68rem',
    notFoundWatermark: 'clamp(9rem,42vw,30rem)',
    notFoundTitle: 'clamp(2.4rem,7vw,5.5rem)',
    notFoundScript: 'clamp(2.8rem,7.5vw,6rem)',
    pageTitle: 'clamp(2.75rem,6.8vw,5.85rem)',
    pageScript: 'clamp(3.1rem,7vw,6.1rem)',
    sectionTitle: 'clamp(2rem,4vw,3rem)',
    sectionTitleWide: 'clamp(2rem,4vw,3.25rem)',
    sectionTitleLarge: 'clamp(2rem,4vw,3.5rem)',
    sectionTitleExtraLarge: 'clamp(2rem,4vw,4rem)',
    serviceScript: 'clamp(2.2rem,4.5vw,3.5rem)',
    serviceHero: 'clamp(2rem,5vw,4rem)',
    serviceForm: 'clamp(1.8rem,3.6vw,2.6rem)',
    serviceWhy: 'clamp(1.9rem,3.8vw,3rem)',
    projectHero: 'clamp(2.75rem,6.8vw,5.85rem)',
    projectTitle: 'clamp(2rem,4vw,3.4rem)',
    projectBrief: 'clamp(2rem,4vw,3.5rem)',
    projectCta: 'clamp(2rem,4vw,4rem)',
    projectCard: 'clamp(1.2rem,1.8vw,1.6rem)',
    projectCardHover: 'clamp(1.35rem,2vw,1.85rem)',
    cardTitle: 'clamp(1.5rem,2vw,2rem)',
    missionTitle: 'clamp(2.125rem,3vw,2.75rem)',
    missionScript: 'clamp(2.75rem,4vw,3.5rem)',
    valueTitle: 'clamp(1.625rem,2vw,2rem)',
    trustTitle: 'clamp(2rem,4vw,3.25rem)',
    trustScript: 'clamp(2.5rem,5vw,4rem)',
    body: '0.95rem',
    metadata: '0.65rem',
    code: '0.9em',
    searchLabel: '10px',
    displayLarge: '3.5rem',
    displayExtraLarge: '4.5rem',
    articleSubheading: '1.9rem',
  },
  leading: {
    hero: '0.9',
    script: '0.82',
    heading: '0.92',
    section: '0.95',
    compact: '0.98',
    projectHero: '0.9',
    mission: '1.1',
    body: '1.6',
    footer: '1.6',
  },
  layout: {
    heroMax: '40rem',
    headingMax: '44rem',
    copyMax: '28rem',
    copyWide: '30rem',
    copyExtraWide: '36rem',
    cardCopy: '19rem',
    aboutStats: '15rem',
    trustCopy: '12rem',
    storyCopy: '24rem',
    whyImageSm: '380px',
    whyImageMd: '420px',
    whyImageLg: '360px',
    mediaHeight: '28rem',
    mediaHeightLg: '34rem',
    iframeHeight: '24rem',
    iframeHeightLg: '30rem',
    galleryHeight: '85vh',
    galleryHeightLg: '90vh',
    galleryWidth: '90vw',
    galleryWidthLg: '85vw',
    serviceFormMinHeight: '20rem',
    serviceFieldMinHeight: '7rem',
    storyMediaMinHeight: '300px',
    trustCardMinHeight: '160px',
    menuMaxHeight: '30rem',
    carouselTop: '14rem',
    contactMapHeight: '437px',
    contactMinHeight: '90vh',
    contactSuccessHeight: '437px',
    contactFieldMinHeight: '9rem',
    contactRadius: '24px',
    legalMaxWidth: '64rem',
    pageHeroMinHeight: '480px',
    serviceHeroMinHeight: '500px',
    processMediaRatio: '280/160',
    landscapeRatio: '4/3',
    portraitRatio: '4/5',
    galleryRatio: '16/10',
    heroColumns: 'minmax(0,1fr) auto',
    projectBriefColumns: '1.1fr 0.9fr',
    projectDirectionColumns: '0.8fr 1.2fr',
    serviceAboutColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)',
    serviceWhyColumns: 'minmax(0,0.8fr) minmax(0,1fr) minmax(0,1.2fr)',
    faqColumns: '0.85fr 1.15fr',
    blogColumns: '1fr 15rem',
  },
  viewport: {
    hero: '100svh',
    serviceHero: '100vh',
    serviceHeroLg: '92vh',
    pageHero: '60vh',
    pageHeroLg: '85vh',
    project: '100svh',
    process: '96vh',
    mobileMenu: 'calc(100dvh - 100%)',
    tocMax: 'calc(100vh - 8rem)',
  },
  zIndex: {
    search: 800,
    overlay: 999,
    gallery: 60,
  },
} as const

// Z-index tokens.
export const zIndex = {
  navbar: 50,
  modal: 100,
  toast: 200,
} as const

// Shadow tokens that mirror the current template visuals.
export const shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  soft: '0 12px 28px rgba(60,37,21,0.08)',
  card: '0 18px 48px rgba(60,37,21,0.1)',
  cardStrong: '0 12px 28px rgba(60,37,21,0.18)',
  lift: '0 20px 60px rgba(0,0,0,0.12)',
  navbar: '0 18px 48px rgba(60,37,21,0.06)',
  menu: '0 28px 70px rgba(60,37,21,0.12)',
  textHero: '0 2px 6px rgba(0,0,0,0.18)',
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

// Named one-off layout values discovered during the repository-wide audit.
// These are intentionally explicit so future builders do not need to search
// component files for arbitrary Tailwind values.
export const utilityTokens = {
  tocMaxHeight: 'calc(100vh - 8rem)',
  cardMedia: '28rem',
  cardMediaLg: '34rem',
  galleryAspect: '16/10',
  accordionRowsOpen: '1fr',
  accordionRowsClosed: '0fr',
  transitionAccordion: 'grid-template-rows',
  carouselTop: '14rem',
  navbarDropdownTop: '85%',
  navbarDropdownWidth: '220px',
  sectionPaddingSm: '2.5rem',
  sectionPaddingLg: '4rem',
} as const
