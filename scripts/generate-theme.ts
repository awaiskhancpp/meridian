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
} from '../src/builds.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const outPath = resolve(__dirname, '../src/app/(frontend)/theme.generated.css')

// ─── Build CSS ────────────────────────────────────────────────────────────────

let css = `/**
 * theme.generated.css
 * Auto-generated from builds.ts by scripts/generate-theme.ts
 * DO NOT EDIT BY HAND — changes will be overwritten.
 */

@theme {
  /* ─── Colors ──────────────────────────────────────────────────── */
  --color-bg-deep: ${colors.bgDeep};
  --color-bg-dark: ${colors.bgDark};
  --color-bg-card: ${colors.bgCard};
  --color-accent: ${colors.accent};
  --color-accent-hover: ${colors.accentHover};
  --color-accent-light: ${colors.accentLight};
  --color-text-primary: ${colors.textPrimary};
  --color-text-secondary: ${colors.textSecondary};
  --color-text-muted: ${colors.textMuted};
  --color-black: ${colors.black};
  --color-dark-slate: ${colors.darkSlate};

  /* UI chrome — rgba strings, usable in arbitrary values */
  --color-nav-bg: ${colors.navBg};
  --color-nav-border: ${colors.navBorder};
  --color-input-bg: ${colors.inputBg};
  --color-input-border: ${colors.inputBorder};
  --color-glass-bg: ${colors.glassBg};
  --color-glass-border: ${colors.glassBorder};

  /* ─── Typography ──────────────────────────────────────────────── */
  --font-family-sans: ${fontFamily.sans};
  --font-weight-regular: ${fontWeight.regular};
  --font-weight-medium: ${fontWeight.medium};
  --font-weight-semibold: ${fontWeight.semibold};

  /* ─── Border Radius ───────────────────────────────────────────── */
  --radius-xs: ${borderRadius.xs};
  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-full: ${borderRadius.full};

  /* ─── Spacing ─────────────────────────────────────────────────── */
  --spacing-section-sm: ${spacing.section.sm};
  --spacing-section-md: ${spacing.section.md};
  --spacing-section-lg: ${spacing.section.lg};
  --spacing-nav-h-sm: ${spacing.navH.sm};
  --spacing-nav-h-md: ${spacing.navH.md};
  --spacing-nav-h-lg: ${spacing.navH.lg};

  /* ─── Z-Index ─────────────────────────────────────────────────── */
  --z-navbar: ${zIndex.navbar};
  --z-modal: ${zIndex.modal};
  --z-toast: ${zIndex.toast};
}

/* ═══════════════════════════════════════════════════════════════════
   Typography Utilities
   ═══════════════════════════════════════════════════════════════════ */

@utility text-h1 {
  font-size: ${fontSize.h1.sm};
  line-height: ${lineHeight.h1};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) {
    font-size: ${fontSize.h1.md};
  }
  @media (min-width: 1024px) {
    font-size: ${fontSize.h1.lg};
  }
}

@utility text-h2 {
  font-size: ${fontSize.h2.sm};
  line-height: ${lineHeight.h2};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) {
    font-size: ${fontSize.h2.md};
  }
  @media (min-width: 1024px) {
    font-size: ${fontSize.h2.lg};
  }
}

@utility text-h3 {
  font-size: ${fontSize.h3.sm};
  line-height: ${lineHeight.h3};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) {
    font-size: ${fontSize.h3.md};
  }
  @media (min-width: 1024px) {
    font-size: ${fontSize.h3.lg};
  }
}

@utility text-h4 {
  font-size: ${fontSize.h4.sm};
  line-height: ${lineHeight.h4};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) {
    font-size: ${fontSize.h4.md};
  }
  @media (min-width: 1024px) {
    font-size: ${fontSize.h4.lg};
  }
}

@utility text-h5 {
  font-size: ${fontSize.h5.sm};
  line-height: ${lineHeight.h5};
  font-weight: ${fontWeight.semibold};
  @media (min-width: 640px) and (max-width: 1023px) {
    font-size: ${fontSize.h5.md};
  }
  @media (min-width: 1024px) {
    font-size: ${fontSize.h5.lg};
  }
}

@utility text-p {
  font-size: ${fontSize.p.sm};
  line-height: ${lineHeight.p};
  @media (min-width: 640px) and (max-width: 1023px) {
    font-size: ${fontSize.p.md};
  }
  @media (min-width: 1024px) {
    font-size: ${fontSize.p.lg};
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Button Padding Utilities
   ═══════════════════════════════════════════════════════════════════ */

@utility btn-padding-sm {
  padding: ${buttonPadding.sm[0]} ${buttonPadding.sm[1]};
}

@utility btn-padding-md {
  padding: ${buttonPadding.md[0]} ${buttonPadding.md[1]};
}

@utility btn-padding-lg {
  padding: ${buttonPadding.lg[0]} ${buttonPadding.lg[1]};
}

/* ═══════════════════════════════════════════════════════════════════
   Semantic Color Utilities (common patterns)
   ═══════════════════════════════════════════════════════════════════ */

@utility bg-deep {
  background-color: var(--color-bg-deep);
}

@utility bg-dark {
  background-color: var(--color-bg-dark);
}

@utility bg-card {
  background-color: var(--color-bg-card);
}

@utility bg-accent {
  background-color: var(--color-accent);
}

@utility bg-accent-hover {
  background-color: var(--color-accent-hover);
}

@utility text-primary {
  color: var(--color-text-primary);
}

@utility text-secondary {
  color: var(--color-text-secondary);
}

@utility text-muted {
  color: var(--color-text-muted);
}

@utility text-black {
  color: var(--color-black);
}

@utility text-dark-slate {
  color: var(--color-dark-slate);
}

@utility text-accent {
  color: var(--color-accent);
}

@utility border-accent {
  border-color: var(--color-accent);
}

@utility ring-accent {
  --tw-ring-color: var(--color-accent);
}
`

// Write the file
writeFileSync(outPath, css, 'utf8')
console.log(`✓ Generated ${outPath}`)
