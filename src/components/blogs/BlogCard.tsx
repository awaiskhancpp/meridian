import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import type { BlogCardData } from '@/lib/blogs'

type BlogCardProps = {
  card: Pick<BlogCardData, 'title' | 'description' | 'image' | 'imageAlt' | 'href'>
  titleTransform?: 'capitalize' | 'uppercase'
}

/** Shared image/overlay card used by homepage, about, and related-post carousels. */
export default function BlogCard({ card, titleTransform = 'capitalize' }: BlogCardProps) {
  return (
    <article className="group h-full">
      <Link href={card.href} className="block">
        <div className="relative h-media overflow-hidden lg:h-media-lg">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-overlay-card" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
            {/*
              This panel is h-full/w-full on purpose (it's meant to span
              the whole image as a backdrop), but that means the OUTER
              flex's items-center/justify-center has nothing left to
              center — the panel already fills all available space.
              What was missing is centering for the panel's OWN children:
              text-center only aligns text horizontally, it does nothing
              vertically, so the heading/paragraph/button were just
              block-flowing from the top, leaving a large empty gap below
              the button instead of the content sitting in the middle of
              the panel. flex flex-col items-center justify-center here
              (on the panel itself, not just its parent) centers its
              children both ways within the full-height space.
            */}
            <div className="card-overlay flex h-full w-full translate-y-4 flex-col items-center justify-center text-center opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <h3
                className={`card-title text-foreground ${titleTransform}`}
              >
                {card.title}
              </h3>
              <p className="mt-5 text-body-sm leading-6 text-muted-foreground">{card.description}</p>
              <Button variant="outline" className="mt-10 rounded-none">
                Read More
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 transition-all duration-standard group-hover:-translate-y-2 group-hover:opacity-0">
          <h3 className="card-heading text-foreground">{card.title}</h3>
        </div>
      </Link>
    </article>
  )
}
