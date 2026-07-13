import React from 'react'
import Image from 'next/image'
import { Compass, PenLine, Hammer, CheckCircle2 } from 'lucide-react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { process } = siteData

/**
 * Process
 *
 * All 4 cards are the SAME component. Rest state: number pinned to the top,
 * icon + title grouped together near the BOTTOM (icon sits close to the
 * title, not close to the number). Hover state: number disappears,
 * replaced at the top by the photo; below it, icon → title → description.
 *
 * Growth mechanism: each grid item is a FIXED-height placeholder
 * (`h-[20rem]`, never changes) — this is what CSS Grid uses to size the
 * shared row track. The actual visible card is an `absolute` overlay
 * anchored to the placeholder's bottom edge, sized independently via its
 * own `height` transition. Because it's `position: absolute`, it's
 * removed from the grid's layout calculation entirely, so growing it on
 * hover can NEVER resize the row or shift sibling cards — which is what
 * happened with the earlier `min-height`-on-the-grid-item approach (CSS
 * Grid rows size to their tallest cell, so any cell that grows resizes
 * the whole row, and every sibling re-aligns to match).
 *
 * The overlay is bottom-anchored (`inset-x-0 bottom-0`) so growth only
 * ever extends the top edge upward, never the bottom.
 *
 * Responsive:
 *   - lg+     : collapsed at rest, hover reveals photo + description, grows upward
 *   - sm/md   : hover isn't reliable on touch, so every card renders its
 *               "expanded" content permanently — nothing hidden, no hover needed
 *
 * Theme: cream bg, dark text, accent for borders/icons, Allura script —
 *        all from theme.generated.css utilities, no hardcoded hex.
 */

function StepIcon({ name }: { name: string }) {
  const cls = 'h-5 w-5 text-accent'
  if (name === 'compass') return <Compass className={cls} strokeWidth={1.5} aria-hidden="true" />
  if (name === 'ruler') return <PenLine className={cls} strokeWidth={1.5} aria-hidden="true" />
  if (name === 'hammer') return <Hammer className={cls} strokeWidth={1.5} aria-hidden="true" />
  if (name === 'check') return <CheckCircle2 className={cls} strokeWidth={1.5} aria-hidden="true" />
  return null
}

type Step = { icon: string; image: string; title: string; description: string }

/* ── Desktop card ─────────────────────────────────────────────────── */
function ProcessCard({ step, index }: { step: Step; index: number }) {
  return (
    /* Grid item — FIXED height, never changes. Keeps the row track locked
       regardless of hover state, so siblings never shift. */
    <div className="relative h-[20rem]">
      <div
        className="
          group absolute inset-x-0 bottom-0 z-10 h-[20rem] overflow-hidden rounded-2xl
          border border-bg-cream bg-cream transition-[height] duration-500 ease-out
          hover:z-20 hover:h-[26rem]
        "
      >
        {/* ── Rest layer: number at top, icon+title grouped near the bottom ── */}
        <div className="absolute inset-0 flex flex-col p-6 opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0">
          <span className="text-[2.8rem] font-black leading-none text-dark opacity-10">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="mt-auto flex flex-col gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-white">
              <StepIcon name={step.icon} />
            </span>
            <h3 className="text-xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-dark">
              {step.title}
            </h3>
          </div>
        </div>

        {/* ── Hover layer: photo at top (replaces the number), then
               icon → title → description ── */}
        <div className="absolute inset-0 flex flex-col opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
          <div className="relative h-40 w-full shrink-0 overflow-hidden">
            <Image src={step.image} alt="" fill aria-hidden="true" className="object-cover" />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-white">
              <StepIcon name={step.icon} />
            </span>
            <h3 className="mt-4 text-xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-dark">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-dark-muted">{step.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Mobile/tablet card — permanently in the "expanded" state.
     Hover isn't reliable on touch, so there's nothing to reveal —
     photo + icon + title + description are always visible, same order
     as the desktop hover layer. ── */
function SimpleCard({ step, index }: { step: Step; index: number }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-bg-cream bg-cream">
      <div className="relative h-40 w-full shrink-0 overflow-hidden">
        <Image src={step.image} alt="" fill aria-hidden="true" className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-white">
          <StepIcon name={step.icon} />
        </span>
        <h3 className="mt-4 text-xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-dark">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-dark-muted">{step.description}</p>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-white py-16 lg:py-24">
      <Container>
        {/* Centred heading block */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.34em] text-dark-muted">
            <span className="h-5" aria-hidden="true" />
            {process.label}
          </p>
          <h2 id="process-heading" className="mt-4">
            <span className="block text-[clamp(2.4rem,5vw,4.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {process.heading}
            </span>
            <span className="block font-[family-name:var(--font-allura)] text-[clamp(2.8rem,5.6vw,4.8rem)] leading-none text-accent">
              {process.script}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-dark-muted">
            {process.subheading}
          </p>
        </div>

        {/* ── sm/md: every card permanently expanded (photo always visible) ── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {process.steps.map((step, i) => (
            <SimpleCard key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* ── lg+: 4 fixed-height grid cells, each hosting an absolutely
             positioned card that grows independently on hover — see
             ProcessCard's comment for why this needs to be an overlay
             rather than a size change on the grid item itself. Extra
             top margin (mt-20 instead of mt-12) leaves headroom for a
             hovered card to grow upward without visually colliding with
             the subheading text above. ── */}
        <div className="mt-20 hidden grid-cols-4 gap-4 lg:grid">
          {process.steps.map((step, i) => (
            <ProcessCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
