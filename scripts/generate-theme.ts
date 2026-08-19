#!/usr/bin/env tsx

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  colors,
  surfaces,
  status,
  fonts,
  fontSize,
  tracking,
  lineHeight,
  fontWeight,
  spacing,
  sectionSpacing,
  layout,
  aspectRatio,
  radius,
  shadow,
  motion,
  zIndex,
  gradients,
  semantic,
} from '../src/builds'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outPath = resolve(__dirname, '../src/app/theme.generated.css')

const css = `/** Generated from src/builds.ts. Do not edit by hand. */
@theme {
  --font-family-sans: ${fonts.sans};
  --font-family-script: ${fonts.script};
  --color-background: ${semantic.background};
  --color-foreground: ${semantic.foreground};
  --color-card: ${semantic.card};
  --color-card-foreground: ${semantic.cardForeground};
  --color-primary: ${semantic.primary};
  --color-primary-foreground: ${semantic.primaryForeground};
  --color-secondary: ${semantic.secondary};
  --color-secondary-foreground: ${semantic.secondaryForeground};
  --color-muted: ${semantic.muted};
  --color-muted-foreground: ${semantic.mutedForeground};
  --color-accent: ${semantic.accent};
  --color-accent-foreground: ${semantic.accentForeground};
  --color-border: ${semantic.border};
  --color-input: ${semantic.input};
  --color-ring: ${semantic.ring};
  --color-destructive: ${semantic.destructive};
  --color-destructive-foreground: ${semantic.destructiveForeground};
  --color-success: ${semantic.success};
  --color-success-foreground: ${semantic.successForeground};
  --color-warning: ${semantic.warning};
  --color-warning-foreground: ${semantic.warningForeground};
  --color-info: ${semantic.info};
  --color-info-foreground: ${semantic.infoForeground};
  --color-surface: ${surfaces.section};
  --color-surface-muted: ${colors.surfaceMuted};
  --color-surface-overlay: ${surfaces.overlay};
  --color-primary-hover: ${colors.primaryHover};
  --color-primary-foreground-muted: ${colors.onPrimaryMuted};
  --color-primary-foreground-subtle: ${colors.onPrimarySubtle};
  --color-primary-foreground-strong: ${colors.onPrimaryStrong};
  --color-primary-foreground-faint: ${colors.onPrimaryFaint};
  --color-primary-foreground-high: ${colors.onPrimaryHigh};
  --color-border-muted: ${colors.borderMuted};
  --color-border-strong: ${colors.borderStrong};
  --color-border-inverse: ${colors.borderInverse};
  --color-border-inverse-strong: ${colors.borderInverseStrong};
  --color-overlay: ${colors.overlay};
  --color-overlay-strong: ${colors.overlayStrong};
  --color-image-overlay: ${colors.imageOverlay};
  --color-panel: ${colors.panel};
  --color-overlay-soft: ${colors.overlaySoft};
  --color-glass: ${colors.glass};
  --color-status-danger-background: ${status.dangerBackground};
  --color-status-success-background: ${status.successBackground};
  --color-status-warning-background: ${status.warningBackground};
  --color-status-info-background: ${status.infoBackground};
  --radius-sm: ${radius.sm};
  --radius-md: ${radius.md};
  --radius-lg: ${radius.lg};
  --radius-full: ${radius.full};
  --shadow-sm: ${shadow.sm};
  --shadow-md: ${shadow.md};
  --shadow-lg: ${shadow.lg};
  --tracking-tight: ${tracking.tight};
  --tracking-base: ${tracking.base};
  --tracking-wide: ${tracking.wide};
  --tracking-wider: ${tracking.wider};
  --spacing-content-max: ${layout.contentMax};
  --z-navbar: ${zIndex.navbar};
  --z-modal: ${zIndex.modal};
  --z-toast: ${zIndex.toast};
  --z-search: ${zIndex.search};
  --z-overlay: ${zIndex.overlay};
  --z-gallery: ${zIndex.gallery};
}

@utility font-sans { font-family: var(--font-family-sans); }
@utility font-script { font-family: var(--font-family-script); }
@utility text-caption { font-size: ${fontSize.caption}; }
@utility text-body-sm { font-size: ${fontSize.bodySm}; }
@utility text-body { font-size: ${fontSize.body}; line-height: ${lineHeight.body}; }
@utility text-body-lg { font-size: ${fontSize.bodyLg}; }
@utility text-card { font-size: ${fontSize.card}; }
@utility text-subheading { font-size: ${fontSize.subheading}; }
@utility text-heading { font-size: ${fontSize.heading}; }
@utility text-heading-lg { font-size: ${fontSize.headingLg}; }
@utility text-display { font-size: ${fontSize.display}; }
@utility text-script { font-family: var(--font-family-script); font-size: ${fontSize.script}; }
@utility text-display-script { font-family: var(--font-family-script); font-size: ${fontSize.displayScript}; }

@utility heading-display {
  font-size: ${fontSize.display}; font-weight: ${fontWeight.bold};
  line-height: ${lineHeight.hero}; letter-spacing: ${tracking.hero}; text-transform: uppercase; color: var(--color-foreground);
}
@utility heading-display-script {
  font-family: var(--font-family-script); font-size: ${fontSize.displayScript};
  line-height: 0.82; text-transform: capitalize;
}
@utility heading-hero {
  font-size: ${fontSize.headingLg}; font-weight: ${fontWeight.bold};
  line-height: ${lineHeight.hero}; letter-spacing: ${tracking.hero}; text-transform: uppercase;
  color: var(--color-foreground); @media (min-width: 1024px) { font-size: ${fontSize.displayLg}; }
}
@utility heading-compact {
  font-size: ${fontSize.compact}; font-weight: ${fontWeight.black}; line-height: ${lineHeight.tight};
  letter-spacing: ${tracking.tight}; text-transform: uppercase; color: var(--color-foreground);
  @media (min-width: 768px) { font-size: ${fontSize.compactLg}; }
}
@utility heading-1 {
  font-size: ${fontSize.headingLg}; font-weight: ${fontWeight.black};
  line-height: ${lineHeight.tight}; letter-spacing: ${tracking.tight}; text-transform: uppercase; color: var(--color-foreground);
}
@utility heading-2 {
  font-size: ${fontSize.heading}; font-weight: ${fontWeight.black};
  line-height: ${lineHeight.tight}; letter-spacing: ${tracking.tight}; text-transform: uppercase; color: var(--color-foreground);
}
@utility heading-3 {
  font-size: ${fontSize.card}; font-weight: ${fontWeight.bold};
  line-height: ${lineHeight.tight}; letter-spacing: ${tracking.tight}; text-transform: uppercase; color: var(--color-foreground);
}
@utility card-title {
  font-size: ${fontSize.cardTitle}; font-weight: ${fontWeight.black};
  line-height: ${lineHeight.tight}; letter-spacing: ${tracking.tight};
  
}
@utility card-heading { font-size: ${fontSize.card}; font-weight: ${fontWeight.bold}; line-height: 0.95; letter-spacing: ${tracking.tight}; }
@utility heading-script { font-family: var(--font-family-script); font-size: ${fontSize.script}; line-height: 1; text-transform: capitalize; }
@utility heading-compact-script { font-family: var(--font-family-script); font-size: ${fontSize.scriptCompact}; font-weight: ${fontWeight.regular}; line-height: 1; text-transform: capitalize; color: var(--color-accent); @media (min-width: 768px) { font-size: ${fontSize.scriptCompactLg}; } }
@utility heading-form { font-size: ${fontSize.form}; font-weight: ${fontWeight.black}; line-height: ${lineHeight.tight}; letter-spacing: ${tracking.hero}; text-transform: uppercase; color: var(--color-foreground); }
@utility stat-value { font-size: ${fontSize.stat}; font-weight: ${fontWeight.black}; line-height: 1; color: var(--color-accent); @media (min-width: 1024px) { font-size: ${fontSize.statLg}; } }
@utility label { font-size: ${fontSize.caption}; font-weight: ${fontWeight.medium}; text-transform: uppercase; letter-spacing: ${tracking.wider}; }

/* Reusable structural recipes. Components choose a visual role instead of
   rebuilding the same surface, spacing, and interaction rules. */
@utility section-eyebrow { font-size: ${fontSize.caption}; font-weight: ${fontWeight.medium}; text-transform: uppercase; letter-spacing: ${tracking.wider}; color: var(--color-muted-foreground); }
@utility section-heading-title { display: block; font-size: ${fontSize.heading}; font-weight: ${fontWeight.black}; line-height: ${lineHeight.tight}; letter-spacing: ${tracking.tight}; text-transform: uppercase; color: var(--color-foreground); }
@utility section-heading-script { display: block; margin-top: ${spacing[8]}; font-family: var(--font-family-script); font-size: ${fontSize.script}; line-height: 1; text-transform: capitalize; color: var(--color-accent); }
@utility section-description { margin-inline: auto; margin-top: ${spacing[24]}; max-width: 42rem; font-size: ${fontSize.body}; line-height: ${lineHeight.body}; color: var(--color-muted-foreground); }
@utility section-heading-inline-description { margin-top: ${spacing[16]}; max-width: 36rem; font-size: ${fontSize.bodySm}; color: var(--color-muted-foreground); }
@utility highlight-title { font-size: ${fontSize.highlight}; font-weight: ${fontWeight.bold}; line-height: 1; @media (min-width: 640px) { font-size: ${fontSize.highlightLg}; } }
@utility card { border: 1px solid var(--color-border); border-radius: 0; background-color: var(--color-card); padding: ${spacing[24]}; }
@utility card-interactive { border: 1px solid var(--color-border); border-radius: 0; background-color: var(--color-card); padding: ${spacing[24]}; transition-property: box-shadow; transition-duration: ${motion.standard}; }
@utility card-overlay { border: 1px solid var(--color-border-inverse-strong); border-radius: 0; background-color: var(--color-surface-overlay); padding: ${spacing[24]}; box-shadow: var(--shadow-sm); }
@utility card-muted { border: 1px solid var(--color-border-inverse); border-radius: 0; background-color: var(--color-glass); padding: ${spacing[24]}; box-shadow: var(--shadow-md); }
@utility card-featured { border: 1px solid var(--color-border); border-radius: var(--radius-lg); background-color: var(--color-primary); padding: ${spacing[32]}; box-shadow: var(--shadow-md); @media (min-width: 1024px) { padding: ${spacing[48]}; } }

@utility leading-tight { line-height: ${lineHeight.tight}; }
@utility leading-hero { line-height: ${lineHeight.hero}; }
@utility leading-snug { line-height: ${lineHeight.snug}; }
@utility leading-normal { line-height: ${lineHeight.normal}; }
@utility leading-body { line-height: ${lineHeight.body}; }
@utility tracking-tight { letter-spacing: ${tracking.tight}; }
@utility tracking-wide { letter-spacing: ${tracking.wide}; }
@utility tracking-wider { letter-spacing: ${tracking.wider}; }

@utility section-padding { padding-block: ${sectionSpacing.sm}; @media (min-width: 1024px) { padding-block: ${sectionSpacing.md}; } }
@utility section-padding-xl { padding-block: ${sectionSpacing.md}; @media (min-width: 1024px) { padding-block: ${sectionSpacing.xl}; } }
@utility section-space { padding-block: ${sectionSpacing.md}; @media (min-width: 1024px) { padding-block: ${sectionSpacing.lg}; } }
@utility section-margin-bottom { margin-bottom: ${sectionSpacing.sm}; @media (min-width: 1024px) { margin-bottom: ${sectionSpacing.md}; } }
@utility max-w-content { max-width: var(--spacing-content-max); }
@utility gap-field { gap: ${spacing[12]}; }
@utility gap-card { gap: ${spacing[12]}; }
@utility w-divider { width: ${layout.divider}; }
@utility h-media { height: ${layout.media}; }
@utility h-media-lg { height: ${layout.mediaLg}; }
@utility h-form-success { height: ${layout.formSuccess}; }
@utility min-h-form-success { min-height: ${layout.formSuccess}; }
@utility h-viewport { height: ${layout.viewport}; }
@utility min-h-viewport { min-height: ${layout.viewport}; }
@utility h-viewport-short { height: ${layout.viewportShort}; }
@utility h-viewport-page { height: ${layout.viewportPage}; }
@utility h-viewport-tall { height: ${layout.viewportTall}; }
@utility w-viewport { width: ${layout.viewportWidth}; }
@utility w-viewport-wide { width: ${layout.viewportWidthWide}; }
@utility h-navbar { height: ${layout.navHeight}; }
@utility aspect-landscape { aspect-ratio: ${aspectRatio.landscape}; }
@utility aspect-portrait { aspect-ratio: ${aspectRatio.portrait}; }
@utility z-navbar { z-index: var(--z-navbar); }
@utility z-modal { z-index: var(--z-modal); }
@utility z-toast { z-index: var(--z-toast); }
@utility z-search { z-index: var(--z-search); }
@utility z-overlay { z-index: var(--z-overlay); }
@utility z-gallery { z-index: var(--z-gallery); }
@utility transition-standard { transition-property: color, background-color, border-color, opacity, transform; transition-duration: ${motion.standard}; }
@utility duration-standard { transition-duration: ${motion.standard}; }
@utility duration-button { transition-duration: ${motion.buttonReveal}; }
@utility ease-button { transition-timing-function: ${motion.buttonEasing}; }
@utility transition-accordion { transition-property: ${motion.accordionProperty}; }
@utility grid-rows-collapsed { grid-template-rows: 0fr; }
@utility grid-rows-expanded { grid-template-rows: 1fr; }
@utility before-after-clip { clip-path: inset(0 calc(100% - attr(data-position type(<number>)) * 1%) 0 0); }
@utility before-after-position { left: calc(attr(data-position type(<number>)) * 1%); }

@utility bg-background { background-color: var(--color-background); }
@utility bg-surface { background-color: var(--color-surface); }
@utility bg-surface-muted { background-color: var(--color-surface-muted); }
@utility bg-card { background-color: var(--color-card); }
@utility bg-primary { background-color: var(--color-primary); }
@utility bg-primary-hover { background-color: var(--color-primary-hover); }
@utility bg-secondary { background-color: var(--color-secondary); }
@utility bg-accent { background-color: var(--color-accent); }
@utility bg-overlay { background-color: var(--color-overlay); }
@utility bg-overlay-strong { background-color: var(--color-overlay-strong); }
@utility bg-image-overlay { background-color: var(--color-image-overlay); }
@utility bg-panel { background-color: var(--color-panel); }
@utility bg-overlay-soft { background-color: var(--color-overlay-soft); }
@utility bg-glass { background-color: var(--color-glass); }
@utility bg-input { background-color: var(--color-input); }
@utility bg-primary-foreground { background-color: var(--color-primary-foreground); }
@utility bg-primary-foreground-faint { background-color: var(--color-primary-foreground-faint); }
@utility bg-primary-foreground-high { background-color: var(--color-primary-foreground-high); }
@utility text-foreground { color: var(--color-foreground); }
@utility text-card-foreground { color: var(--color-card-foreground); }
@utility text-muted-foreground { color: var(--color-muted-foreground); }
@utility text-primary-foreground { color: var(--color-primary-foreground); }
@utility text-primary-foreground-muted { color: var(--color-primary-foreground-muted); }
@utility text-primary-foreground-subtle { color: var(--color-primary-foreground-subtle); }
@utility text-primary-foreground-strong { color: var(--color-primary-foreground-strong); }
@utility text-secondary-foreground { color: var(--color-surface-muted); }
@utility text-surface-foreground { color: var(--color-surface); }
@utility text-accent { color: var(--color-accent); }
@utility text-accent-foreground { color: var(--color-accent-foreground); }
@utility border-border { border-color: var(--color-border); }
@utility border-border-muted { border-color: var(--color-border-muted); }
@utility border-border-strong { border-color: var(--color-border-strong); }
@utility border-border-inverse { border-color: var(--color-border-inverse); }
@utility border-border-inverse-strong { border-color: var(--color-border-inverse-strong); }
@utility border-accent { border-color: var(--color-accent); }
@utility border-input { border-color: var(--color-input); }
@utility ring-focus { --tw-ring-color: var(--color-ring); }
@utility ring-border { --tw-ring-color: var(--color-border-strong); }
@utility divide-border { & > :not(:last-child) { border-color: var(--color-border); } }
@utility bg-status-danger { background-color: var(--color-destructive); }
@utility bg-status-danger-background { background-color: var(--color-status-danger-background); }
@utility bg-status-success { background-color: var(--color-success); }
@utility bg-status-success-background { background-color: var(--color-status-success-background); }
@utility text-status-danger { color: var(--color-destructive); }
@utility text-status-success { color: var(--color-success); }
@utility text-status-warning { color: var(--color-warning); }
@utility text-status-info { color: var(--color-info); }
@utility bg-hero-overlay { background-image: ${gradients.hero}; }
@utility bg-overlay-card { background-image: ${gradients.card}; }
@utility bg-radial { background-image: ${gradients.radial}; }
@utility bg-card-bottom { background-image: ${gradients.cardBottom}; }
@utility shadow-sm { box-shadow: var(--shadow-sm); }
@utility shadow-md { box-shadow: var(--shadow-md); }
@utility shadow-lg { box-shadow: var(--shadow-lg); }
@utility drop-shadow-hero { filter: drop-shadow(var(--shadow-sm)); }
`

writeFileSync(outPath, css, 'utf8')
console.log(`✓ Generated ${outPath}`)
