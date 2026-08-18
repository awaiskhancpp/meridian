import Image from 'next/image'
import Link from 'next/link'
import { getServiceIcon } from './serviceIcons'

type ServiceImageCardProps = {
  title: string
  image: string
  icon?: string
  href: string
}

/** Shared photo card used by service listings and related-service carousels. */
export default function ServiceImageCard({ title, image, icon, href }: ServiceImageCardProps) {
  const Icon = getServiceIcon(icon)

  return (
    <Link href={href} className="group flex w-full">
      <div className="relative ratio-portrait w-full overflow-hidden rounded-none">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-4 bottom-4 bg-dark px-3 pb-5 pt-9 whitespace-nowrap shadow-card-strong transition-colors duration-standard">
          {Icon ? (
            <div className="absolute -top-7 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-page">
              <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
            </div>
          ) : null}
          <h3 className="text-base font-bold uppercase leading-snug tracking-wide text-white sm:text-lg">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}
