#!/usr/bin/env tsx
/**
 * scripts/generate-theme.ts
 *
 * Imports builds.ts and generates src/app/(frontend)/theme.generated.css
 * with Tailwind v4 @theme and @utility blocks.
 *
 * Run via:  tsx scripts/generate-theme.ts
 * Auto-run: npm run predev / npm run prebuild
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  colors,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  buttonPadding,
  borderRadius,
  spacing,
  zIndex,
  shadow,
  gradient,
} from '../src/builds.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const outPath = resolve(__dirname, '../src/app/theme.generated.css')

// ─── Build CSS ────────────────────────────────────────────────────────────────

let css = `/**
 * theme.generated.css
 * Auto-generated from builds.ts by scripts/generate-theme.ts
 * DO NOT EDIT BY HAND — changes will be overwritten.
 */

@theme {
  /* ─── Colors ──────────────────────────────────────────────────── */
  --color-bg-deep:   ${colors.bgDeep};
  --color-bg-dark:   ${colors.bgDark};
  --color-bg-card:   ${colors.bgCard};
  --color-bg-cream:  ${colors.bgCream};
  --color-bg-white:  ${colors.bgWhite};
  --color-accent:       ${colors.accent};
  --color-accent-hover: ${colors.accentHover};
  --color-accent-light: ${colors.accentLight};
  /* text on dark surfaces */
  --color-text-primary:   ${colors.textPrimary};
  --color-text-secondary: ${colors.textSecondary};
  --color-text-muted:     ${colors.textMuted};
  /* text on light surfaces */
  --color-text-dark:       ${colors.textDark};
  --color-text-dark-muted: ${colors.textDarkMuted};
  --color-black:      ${colors.black};
  --color-white:      ${colors.white};
  --color-cream:      ${colors.cream};
  --color-dark-slate: ${colors.darkSlate};

  /* UI chrome */
  --color-nav-bg:        ${colors.navBg};
  --color-nav-bg-default:${colors.navBgDefault};
  --color-nav-border:    ${colors.navBorder};
  --color-input-bg:      ${colors.inputBg};
  --color-input-border:  ${colors.inputBorder};
  --color-overlay-dark:  ${colors.overlayDark};
  --color-panel-dark:    ${colors.panelDark};
  --color-white-soft:    ${colors.whiteSoft};
  --color-white-ghost:   ${colors.whiteGhost};
  --color-white-faint:   ${colors.whiteFaint};
  --color-white-muted:   ${colors.whiteMuted};
  --color-white-subtle:  ${colors.whiteSubtle};
  --color-white-overlay: ${colors.whiteOverlay};
  --color-white-high:    ${colors.whiteHigh};
  --color-border-light-soft:   ${colors.borderLightSoft};
  --color-border-light-muted:  ${colors.borderLightMuted};
  --color-border-light-mid:    ${colors.borderLightMid};
  --color-border-light-strong: ${colors.borderLightStrong};
  --color-border-light-heavy:  ${colors.borderLightHeavy};
  --color-border-emphasis:     ${colors.borderEmphasis};
  --color-ring-dark-soft:      ${colors.ringDarkSoft};
  --color-glass-bg:      ${colors.glassBg};
  --color-glass-border:  ${colors.glassBorder};
  --color-form-bg:       ${colors.formBg};
  --color-border-subtle: ${colors.borderSubtle};
  --color-border-soft:   ${colors.borderSoft};
  --color-border-muted:  ${colors.borderMuted};
  --color-border-divider: ${colors.borderDivider};
  --color-border-strong: ${colors.borderStrong};
  --color-border-divider-strong: ${colors.borderDividerStrong};
  --color-border-extra-strong: ${colors.borderExtraStrong};
  --color-accent-faint:  ${colors.accentFaint};
  --color-hero-overlay: ${colors.heroOverlay};
  --color-hero-overlay-mid: ${colors.heroOverlayMid};
  --color-hero-overlay-strong: ${colors.heroOverlayStrong};
  --color-service-hero-overlay: ${colors.serviceHeroOverlay};
  --color-service-hero-overlay-mid: ${colors.serviceHeroOverlayMid};
  --color-service-hero-overlay-strong: ${colors.serviceHeroOverlayStrong};
  --color-card-overlay: ${colors.cardOverlay};
  --color-card-overlay-strong: ${colors.cardOverlayStrong};
  --color-radial-warm: ${colors.radialWarm};
  --color-decorative-gold: ${colors.decorativeGold};
  --color-decorative-blue: ${colors.decorativeBlue};
  --color-decorative-green: ${colors.decorativeGreen};
  --color-decorative-red: ${colors.decorativeRed};
  --color-decorative-terracotta: ${colors.decorativeTerracotta};
  --shadow-soft: ${shadow.soft};
  --shadow-card: ${shadow.card};
  --shadow-card-strong: ${shadow.cardStrong};
  --shadow-lift: ${shadow.lift};
  --shadow-navbar: ${shadow.navbar};
  --shadow-menu: ${shadow.menu};
  --gradient-hero: ${gradient.hero};
  --gradient-service-hero: ${gradient.serviceHero};
  --gradient-card: ${gradient.card};
  --gradient-radial-warm: ${gradient.radialWarm};
  --gradient-card-bottom-dark: ${gradient.cardBottomDark};

  /* ─── Typography ──────────────────────────────────────────────── */
  --font-family-sans:   ${fontFamily.sans};
  --font-family-script: ${fontFamily.script};
  --font-weight-regular:  ${fontWeight.regular};
  --font-weight-medium:   ${fontWeight.medium};
  --font-weight-semibold: ${fontWeight.semibold};
  --font-weight-bold:     ${fontWeight.bold};

  /* ─── Border Radius ───────────────────────────────────────────── */
  --radius-xs:   ${borderRadius.xs};
  --radius-sm:   ${borderRadius.sm};
  --radius-md:   ${borderRadius.md};
  --radius-lg:   ${borderRadius.lg};
  --radius-full: ${borderRadius.full};

  /* ─── Spacing ─────────────────────────────────────────────────── */
  --spacing-section-sm: ${spacing.section.sm};
  --spacing-section-md: ${spacing.section.md};
  --spacing-section-lg: ${spacing.section.lg};
  --spacing-nav-h-sm:   ${spacing.navH.sm};
  --spacing-nav-h-md:   ${spacing.navH.md};
  --spacing-nav-h-lg:   ${spacing.navH.lg};

  /* ─── Z-Index ─────────────────────────────────────────────────── */
  --z-navbar: ${zIndex.navbar};
  --z-modal:  ${zIndex.modal};
  --z-toast:  ${zIndex.toast};
}

/* ═══════════════════════════════════════════════════════════════════
   Typography Utilities
   ═══════════════════════════════════════════════════════════════════ */

@utility text-h1 {
  font-size: ${fontSize.h1.sm};
  line-height: ${lineHeight.h1};
  font-weight: ${fontWeight.bold};
  @media (min-width: 640px) and (max-width: 1023px) { font-size: ${fontSize.h1.md}; }
  @media (min-width: 1024px) { font-size: ${fontSize.h1.lg}; }
}

@utility text-h2 {
  font-size: ${fontSize.h2.sm};
  line-height: ${lineHeight.h2};
  font-weight: ${fontWeight.bold};
  @media (min-width: 640px) and (max-width: 1023px) { font-size: ${fontSize.h2.md}; }
  @media (min-width: 1024px) { font-size: ${fontSize.h2.lg}; }
}

@utility text-h3 {
  font-size: ${fontSize.h3.sm};
  line-height: ${lineHeight.h3};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) { font-size: ${fontSize.h3.md}; }
  @media (min-width: 1024px) { font-size: ${fontSize.h3.lg}; }
}

@utility text-h4 {
  font-size: ${fontSize.h4.sm};
  line-height: ${lineHeight.h4};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) { font-size: ${fontSize.h4.md}; }
  @media (min-width: 1024px) { font-size: ${fontSize.h4.lg}; }
}

@utility text-h5 {
  font-size: ${fontSize.h5.sm};
  line-height: ${lineHeight.h5};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) { font-size: ${fontSize.h5.md}; }
  @media (min-width: 1024px) { font-size: ${fontSize.h5.lg}; }
}

@utility text-p {
  font-size: ${fontSize.p.sm};
  line-height: ${lineHeight.p};
  @media (min-width: 640px) and (max-width: 1023px) { font-size: ${fontSize.p.md}; }
  @media (min-width: 1024px) { font-size: ${fontSize.p.lg}; }
}

/* ═══════════════════════════════════════════════════════════════════
   Button Padding Utilities
   ═══════════════════════════════════════════════════════════════════ */

@utility btn-padding-sm { padding: ${buttonPadding.sm[0]} ${buttonPadding.sm[1]}; }
@utility btn-padding-md { padding: ${buttonPadding.md[0]} ${buttonPadding.md[1]}; }
@utility btn-padding-lg { padding: ${buttonPadding.lg[0]} ${buttonPadding.lg[1]}; }

/* ═══════════════════════════════════════════════════════════════════
   Semantic Color Utilities
   ═══════════════════════════════════════════════════════════════════ */

/* Backgrounds */
@utility bg-deep  { background-color: var(--color-bg-deep); }
@utility bg-dark  { background-color: var(--color-bg-dark); }
@utility bg-card  { background-color: var(--color-bg-card); }
@utility bg-cream { background-color: var(--color-bg-cream); }
@utility bg-accent       { background-color: var(--color-accent); }
@utility bg-accent-hover { background-color: var(--color-accent-hover); }
@utility bg-accent-faint { background-color: var(--color-accent-faint); }
@utility bg-overlay-dark { background-color: var(--color-overlay-dark); }
@utility bg-panel-dark { background-color: var(--color-panel-dark); }
@utility bg-white-soft { background-color: var(--color-white-soft); }
@utility bg-white-ghost { background-color: var(--color-white-ghost); }
@utility bg-white-faint { background-color: var(--color-white-faint); }
@utility bg-white-muted { background-color: var(--color-white-muted); }
@utility bg-white-subtle { background-color: var(--color-white-subtle); }
@utility bg-white-overlay { background-color: var(--color-white-overlay); }
@utility bg-white-high { background-color: var(--color-white-high); }
@utility bg-nav          { background-color: var(--color-nav-bg); }
@utility bg-nav-default  { background-color: var(--color-nav-bg-default); }
@utility bg-glass        { background-color: var(--color-glass-bg); }
@utility bg-form         { background-color: var(--color-form-bg); }
@utility bg-input        { background-color: var(--color-input-bg); }
@utility bg-card-overlay  { background-color: var(--color-card-overlay); }
@utility bg-card-overlay-strong { background-color: var(--color-card-overlay-strong); }

/* Text — on dark surfaces */
@utility text-primary   { color: var(--color-text-primary); }
@utility text-secondary { color: var(--color-text-secondary); }
@utility text-muted     { color: var(--color-text-muted); }

/* Text — on light surfaces */
@utility text-dark       { color: var(--color-text-dark); }
@utility text-dark-muted { color: var(--color-text-dark-muted); }

/* Shared */
@utility text-black      { color: var(--color-black); }
@utility text-white      { color: var(--color-white); }
@utility text-cream      { color: var(--color-cream); }
@utility text-dark-slate { color: var(--color-dark-slate); }
@utility text-accent     { color: var(--color-accent); }
@utility text-accent-light { color: var(--color-accent-light); }

@utility border-accent { border-color: var(--color-accent); }
@utility border-nav    { border-color: var(--color-nav-border); }
@utility border-glass  { border-color: var(--color-glass-border); }
@utility border-input  { border-color: var(--color-input-border); }
@utility border-light-soft { border-color: var(--color-border-light-soft); }
@utility border-light-muted { border-color: var(--color-border-light-muted); }
@utility border-light-mid { border-color: var(--color-border-light-mid); }
@utility border-light-strong { border-color: var(--color-border-light-strong); }
@utility border-light-heavy { border-color: var(--color-border-light-heavy); }
@utility border-emphasis { border-color: var(--color-border-emphasis); }
@utility border-subtle { border-color: var(--color-border-subtle); }
@utility border-soft { border-color: var(--color-border-soft); }
@utility border-muted { border-color: var(--color-border-muted); }
@utility border-divider { border-color: var(--color-border-divider); }
@utility border-strong { border-color: var(--color-border-strong); }
@utility border-divider-strong { border-color: var(--color-border-divider-strong); }
@utility border-extra-strong { border-color: var(--color-border-extra-strong); }
@utility ring-accent   { --tw-ring-color: var(--color-accent); }
@utility ring-dark-soft { --tw-ring-color: var(--color-ring-dark-soft); }

@utility divide-soft {
  & > :not(:last-child) { border-color: var(--color-border-soft); }
}
@utility divide-muted {
  & > :not(:last-child) { border-color: var(--color-border-muted); }
}
@utility divide-divider {
  & > :not(:last-child) { border-color: var(--color-border-divider); }
}
@utility divide-divider-strong {
  & > :not(:last-child) { border-color: var(--color-border-divider-strong); }
}

@utility bg-hero-overlay { background-color: var(--color-hero-overlay); }
@utility bg-hero-overlay-mid { background-color: var(--color-hero-overlay-mid); }
@utility bg-hero-overlay-strong { background-color: var(--color-hero-overlay-strong); }
@utility bg-service-hero-overlay { background-color: var(--color-service-hero-overlay); }
@utility bg-service-hero-overlay-mid { background-color: var(--color-service-hero-overlay-mid); }
@utility bg-service-hero-overlay-strong { background-color: var(--color-service-hero-overlay-strong); }

@utility bg-overlay-hero { background-image: var(--gradient-hero); }
@utility bg-overlay-service-hero { background-image: var(--gradient-service-hero); }
@utility bg-overlay-card { background-image: var(--gradient-card); }
@utility bg-radial-warm { background-image: var(--gradient-radial-warm); }
@utility bg-card-bottom-dark { background-image: var(--gradient-card-bottom-dark); }

@utility shadow-soft { box-shadow: var(--shadow-soft); }
@utility shadow-card { box-shadow: var(--shadow-card); }
@utility shadow-card-strong { box-shadow: var(--shadow-card-strong); }
@utility shadow-lift { box-shadow: var(--shadow-lift); }
@utility shadow-navbar { box-shadow: var(--shadow-navbar); }
@utility shadow-menu { box-shadow: var(--shadow-menu); }

@utility bg-decorative-gold { background-color: var(--color-decorative-gold); }
@utility bg-decorative-blue { background-color: var(--color-decorative-blue); }
@utility bg-decorative-green { background-color: var(--color-decorative-green); }
@utility bg-decorative-red { background-color: var(--color-decorative-red); }
@utility bg-decorative-terracotta { background-color: var(--color-decorative-terracotta); }
@utility text-decorative-gold { color: var(--color-decorative-gold); }
@utility text-decorative-blue { color: var(--color-decorative-blue); }
@utility text-decorative-green { color: var(--color-decorative-green); }
@utility text-decorative-red { color: var(--color-decorative-red); }
@utility text-decorative-terracotta { color: var(--color-decorative-terracotta); }
@utility fill-decorative-gold { fill: var(--color-decorative-gold); }
@utility fill-decorative-blue { fill: var(--color-decorative-blue); }
@utility fill-decorative-green { fill: var(--color-decorative-green); }
@utility fill-decorative-red { fill: var(--color-decorative-red); }
@utility fill-decorative-terracotta { fill: var(--color-decorative-terracotta); }
@utility text-border-strong { color: var(--color-border-strong); }
`

// Write the file
writeFileSync(outPath, css, 'utf8')
console.log(`✓ Generated ${outPath}`)
