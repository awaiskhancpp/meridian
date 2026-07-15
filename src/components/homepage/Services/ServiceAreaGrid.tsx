import Image from 'next/image'
interface ServiceCardProps {
  title: string
  description: string
  image: string
  imageAlt: string
}
export function ServiceAreaGrid({ title, description, image, imageAlt }: ServiceCardProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="pr-2 flex-1">
        <h2 className="font-bold text-2xl">{title}</h2>
        <div className="border border-t-text-dark my-2 pr-4" />
        <p>{description}</p>
      </div>
      <div className="relative mt-1 w-full aspect-square w-full">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>
    </div>
  )
}
