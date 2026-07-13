import React from 'react'
import { Compass, PenLine, Hammer, CheckCircle2 } from 'lucide-react'
import siteData from '@/website.json'
import { Container } from '@/components/ui'

const { process } = siteData

/**
 * Process
 *
 * Horizontal accordion, matching the reference: all cards are equal
 * width at rest (compact — just a number + label at top, a small icon
 * near the bottom). Hovering ONE card grows it in WIDTH via flex-grow,
 * which pushes the other three narrower to compensate — the row's
 * total width never changes, only how it's divided up.
 *
 * This is a fundamentally different mechanism from a height-growth
 * card: `flex-grow` is what CSS animates here, not `height`. Every
 * card shares the same flex container, so growing one's flex-grow
 * value automatically (and smoothly, since flex-grow is transitionable)
 * steals space from its siblings — no absolute positioning or manual
 * height math needed.
 *
 * `min-w-0` on each card is required — flex items default to
 * `min-width: auto`, which would refuse to let the compact cards
 * shrink below their content's natural width, breaking the whole
 * effect.
 *
 * Content within a card cross-fades between two states (icon-only vs.
 * icon + title + description) the same way the previous version did —
 * that part didn't need to change, only what triggers the size change.
 *
 * Responsive:
 *   - lg+   : compact row, hover expands one card at a time
 *   - sm/md : hover isn't reliable on touch, so every card renders
 *             permanently expanded, stacked vertically — nothing
 *             hidden, no hover needed
 */

function StepIcon({ name, className }: { name: string; className: string }) {
  if (name === 'compass')
    return <Compass className={className} strokeWidth={1.5} aria-hidden="true" />
  if (name === 'ruler')
    return <PenLine className={className} strokeWidth={1.5} aria-hidden="true" />
  if (name === 'hammer')
    return <Hammer className={className} strokeWidth={1.5} aria-hidden="true" />
  if (name === 'check')
    return <CheckCircle2 className={className} strokeWidth={1.5} aria-hidden="true" />
  return null
}

type Step = { icon: string; image: string; title: string; description: string }

/* ── Desktop card — horizontal accordion panel ───────────────────── */
function ProcessCard({ step, index }: { step: Step; index: number }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <div
      id="process"
      className="
        group relative h-[26rem] min-w-0 flex-1 overflow-hidden rounded-2xl
        bg-[#f3ede3] transition-all duration-500 ease-out
        hover:flex-[2.5] hover:bg-accent
      "
    >
      <div className="relative z-10 flex h-full flex-col p-5">
        {/* Number + label — always visible, color shifts with the bg */}
        <p className="whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-dark-muted transition-colors duration-500 group-hover:text-white/70">
          {number}. {step.title}
        </p>

        {/* Stage: rest icon vs. expanded content, cross-fading,
            bottom-anchored so both states share the same baseline */}
        <div className="relative mt-auto flex-1">
          {/* Rest state — small icon badge, fades out on hover */}
          <div className="absolute inset-x-0 bottom-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/20 bg-white">
              <StepIcon name={step.icon} className="h-4 w-4 text-accent" />
            </span>
          </div>

          {/* Expanded state — bigger icon, title, description. Only
              actually readable once the card has grown, so a slight
              delay lets the width animation lead the content fade-in. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <StepIcon name={step.icon} className="h-6 w-6 text-white" />
            </span>
            <h3 className="mt-6 whitespace-nowrap text-xl font-black uppercase leading-tight text-white">
              {step.title}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/85">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Mobile/tablet card — permanently expanded.
     Hover isn't reliable on touch, so there's nothing to reveal —
     icon + title + description are always visible. ── */
function SimpleCard({ step, index }: { step: Step; index: number }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <div className="rounded-2xl bg-cream p-6">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-dark-muted">
        {number}. {step.title}
      </p>
      <span className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-white">
        <StepIcon name={step.icon} className="h-5 w-5 text-accent" />
      </span>
      <h3 className="mt-4 text-xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-dark">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-dark-muted">{step.description}</p>
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
            <span className="block text-[clamp(1.9rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-dark">
              {process.heading}
            </span>
            <span className="block capitalize font-[family-name:var(--font-allura)] text-[clamp(2.1rem,4vw,3.5rem)] leading-none text-accent">
              {process.script}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-p leading-relaxed text-dark-muted">
            {process.subheading}
          </p>
        </div>

        {/* ── sm/md: every card permanently expanded, stacked ── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {process.steps.map((step, i) => (
            <SimpleCard key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* ── lg+: horizontal accordion — flex row, each card flex-1 at
             rest, hover:flex-[2.5] on the hovered one. min-w-0 is what
             lets the other cards actually compress instead of refusing
             to shrink below their content width. ── */}
        <div className="mt-12 hidden gap-4 lg:flex">
          {process.steps.map((step, i) => (
            <ProcessCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
