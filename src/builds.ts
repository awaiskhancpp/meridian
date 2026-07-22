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

// Responsive type recipes used throughout the website. These preserve the
// current visual values while giving every screen a shared heading system.
export const typeRecipe = {
  heading2: {
    size: 'clamp(1.9rem,3.8vw,3.2rem)',
    weight: '900',
    line: '0.92',
    tracking: '-0.05em',
  },
  headingScript: {
    size: 'clamp(2.1rem,4vw,3.5rem)',
    line: '1',
  },
  headingHero: {
    size: 'clamp(2.75rem,6.8vw,5.85rem)',
    weight: '700',
    line: '0.9',
    tracking: '-0.06em',
  },
  headingHeroScript: {
    size: 'clamp(3.1rem,7vw,6.1rem)',
    line: '0.82',
  },
  cardTitle: {
    size: 'clamp(1.35rem,2vw,1.85rem)',
    weight: '700',
    line: '0.95',
    tracking: '-0.05em',
  },
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

// Reusable class primitives. Components should compose these for shared
// visual decisions; page-specific geometry belongs with the page.
export const uiClasses = {
  container: 'mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-8',
  section: 'py-16 lg:py-24',
  sectionCompact: 'py-16',
  eyebrow: 'text-xs font-medium uppercase tracking-[0.34em] text-dark-muted',
  eyebrowLight: 'text-xs font-medium uppercase tracking-[0.34em] text-white/70',
  heading:
    'text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark',
  headingLarge:
    'text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark',
  cardTitle:
    'text-[clamp(1.35rem,2vw,1.85rem)] font-bold uppercase leading-[0.95] tracking-[-0.05em] text-dark',
  headingLight:
    'text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white',
  body: 'text-p text-dark-muted',
  bodyLight: 'text-p text-white/80',
  mediaCover: 'object-cover object-center',
  mediaCoverTransition:
    'object-cover object-center transition-transform duration-700 group-hover:scale-105',
  heroOverlay: 'absolute inset-0 bg-overlay-service-hero',
  border: 'border border-muted',
  divider: 'border-subtle',
  cardSurface: 'border border-subtle bg-white shadow-soft',
  page: 'bg-white',
  focus: 'outline-none focus-visible:ring-2 focus-visible:ring-accent',
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

export const projectStyles = {
  grid: {
    wrapper: 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6',
    first: 'lg:col-span-4',
    second: 'lg:col-span-2',
    middle: 'lg:col-span-2',
    last: 'lg:col-span-2',
    lastWide: 'lg:col-span-4',
  },
  card: {
    image: 'relative h-[28rem] overflow-hidden lg:h-[34rem]',
    overlay: 'absolute inset-0 bg-overlay-card',
    hoverPanel:
      'pointer-events-none absolute inset-0 flex items-center justify-center p-6 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100',
    hoverContent:
      'flex h-full w-full translate-y-4 flex-col items-center justify-center border border-light-strong bg-white-overlay px-8 py-10 text-center opacity-0 shadow-soft backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100',
    title:
      'mt-4 text-[clamp(1.35rem,2vw,1.85rem)] font-bold uppercase leading-[0.95] tracking-[-0.05em] transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0',
  },
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

export const responsiveTypography = {
  // Hero and Page Header Typography
  hero: {
    title:
      'text-[clamp(2.75rem,6.8vw,5.85rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white',
    titleWithShadow:
      'text-[clamp(2.75rem,6.8vw,5.85rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]',
    script:
      'font-[family-name:var(--font-allura)] capitalize text-[clamp(3.1rem,7vw,6.1rem)] leading-[0.82] text-cream',
    serviceHero:
      'text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white lg:text-[4.5rem]',
    projectHero:
      'text-[clamp(2.75rem,7vw,6.4rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]',
  },
  // Section Headings & Subheadings
  section: {
    headingLarge:
      'text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark', // ProjectBrief, ProjectDirection, RelatedProjects
    headingExtraLarge:
      'text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]', // ProjectCTA
    headingMedium:
      'text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-dark lg:text-[3.5rem]', // AreasWeServe
    headingMediumLight:
      'text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white lg:text-[3.5rem]', // CTABanner
    scriptSubheading:
      'font-[family-name:var(--font-allura)] capitalize text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.82] text-accent', // AreasWeServe, etc.
    scriptTrust:
      'block font-[family-name:var(--font-allura)] text-[clamp(2.4rem,5.4vw,4rem)] leading-tight text-accent', // TrustSection
    scriptTrustAbout:
      'block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.5rem,5vw,4rem)] leading-none text-accent mt-1', // AboutTrustSection
  },
  // Blog / Post Typography
  blog: {
    title:
      'text-[clamp(2rem,4.5vw,3.2rem)] font-black uppercase leading-[0.98] tracking-[-0.04em] text-dark', // Blog slug heading
    cardTitle:
      'text-[clamp(1.5rem,2vw,2rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark', // Homepage Blog card / ProjectPage
  },
  // Cards & Widgets Typography
  card: {
    gridCardTitle:
      'text-[clamp(1rem,2vw,1.5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white', // ServiceGridCard
    chooseUsTitle:
      'text-[clamp(1.9rem,3.8vw,3rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-dark', // ServiceWhyChooseUs
  },
  // Forms Typography
  form: {
    title:
      'text-[clamp(1.8rem,3.6vw,2.6rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-white',
  },
  // Stats Typography
  stat: {
    number:
      'block text-[clamp(2.2rem,5.4vw,3.8rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-dark', // TrustSection
    numberAbout:
      'block text-[clamp(2rem,4vw,3.25rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-dark', // AboutTrustSection
  },
  // Mission & Values Typography
  mission: {
    title:
      'block uppercase tracking-[-0.05em] text-primary font-sans text-[clamp(2.125rem,3vw,2.75rem)] font-black leading-[1.1]',
    script:
      'block capitalize mt-1 text-accentLight font-script text-[clamp(2.75rem,4vw,3.5rem)] leading-none',
    cardTitle: 'mb-4 text-primary font-sans text-[clamp(1.625rem,2vw,2rem)] font-bold',
  },
  // Misc Typography
  misc: {
    huge404:
      'pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(9rem,42vw,30rem)] font-black leading-none text-white/5',
    title404:
      'text-[clamp(2.4rem,7vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]',
    script404:
      'font-[family-name:var(--font-allura)] capitalize text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.82] text-cream',
    testimonialQuote:
      'mt-4 text-center text-[clamp(1.2rem,2.2vw,1.75rem)] font-medium leading-snug text-dark',
  },
} as const

export const trackingClasses = {
  eyebrow: 'tracking-[0.34em]',
  eyebrowLight: 'tracking-[0.28em]',
  label: 'tracking-[0.22em]',
  input: 'tracking-[0.12em]',
  button: 'tracking-[0.18em]',
  pills: 'tracking-[0.14em]',
  navbar: 'tracking-[0.12em]',
  footerBrand: 'tracking-[0.18em]',
  menuOpen: 'tracking-[0.24em]',
  faqTitle: 'tracking-[0.2em]',
  headingTight: 'tracking-[-0.02em]',
  headingTighter: 'tracking-[-0.03em]',
  headingTightest: 'tracking-[-0.04em]',
  headingExtreme: 'tracking-[-0.05em]',
  heroExtreme: 'tracking-[-0.06em]',
} as const

export const layoutClasses = {
  // Heights & Containers
  heroHeight: 'h-[100svh] w-full overflow-hidden 2xl:h-[100svh]',
  serviceHeroHeight: 'h-[100vh] min-h-[500px] w-full lg:h-[92vh]',
  pageHeroHeight: 'h-[60vh] min-h-[480px] w-full lg:h-[85vh]',
  serviceProcessHeight: 'h-[96vh]',
  contactMinHeight: 'min-h-[90vh]',
  notFoundMinHeight: 'min-h-[100svh]',
  cardImageHeight: 'h-[28rem] lg:h-[34rem]',
  iframeHeight: 'h-[24rem] lg:h-[30rem]',
  navbarDropdownWidth: 'w-[220px]',
  navbarMobileMaxHeight: 'max-h-[40rem]',
  navbarMobileSubmenuMaxHeight: 'max-h-[24rem]',
  testimonialMinHeight: 'min-h-[360px] md:min-h-[240px] lg:min-h-[320px]',
  formSuccessMinHeight: 'min-h-[20rem]',
  aboutTrustCardMinHeight: 'min-h-[160px]',
  ourStoryImageHeight: 'min-h-[300px] lg:h-full',
  contactCardHeight: 'h-[437px]',

  // Aspect Ratios
  aspectWhyChooseUs: 'aspect-[4/5]',
  aspectProcess: 'aspect-[280/160]',
  aspectGallery: 'aspect-[4/3] md:aspect-[16/10]',
} as const

export const gridClasses = {
  // Grid layouts and column configurations
  faqLayout: 'grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16',
  aboutLayout:
    'grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch',
  whyChooseUsThreeCols:
    'grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-10',
  heroLayout: 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end',
  blogLayout: 'grid grid-cols-1 gap-12 lg:grid-cols-[1fr_15rem]',

  // Grid Row Transitions
  hoverRowsTransition:
    'grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]',
  accordionRowsTransition: 'grid transition-[grid-template-rows] duration-300 ease-out',
} as const

export const spacingClasses = {
  // Custom paddings, margins, gaps
  sectionWide: 'py-16 lg:py-26',
  sectionMedium: 'py-16 lg:py-20',
  heroPaddingTop: 'pt-24 sm:pt-28 lg:pt-32 2xl:pt-24',
  heroPaddingBottom: 'pb-8 sm:pb-10 lg:pb-12',
  aboutStatsPaddingTop: 'pt-14',
  notFoundFooterPadding: 'mt-12 pt-8',
  notFoundFooterGap: 'gap-x-6 gap-y-3',
} as const
