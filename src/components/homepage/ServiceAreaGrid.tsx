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
      <div className="flex-1">
        <h2 className="font-bold text-body-lg">{title}</h2>
        <div className="my-2 border-t border-border-strong" />
        <p>{description}</p>
      </div>
      {/* <div className="relative mt-1 w-full aspect-square w-full">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div> */}
    </div>
  )
}
