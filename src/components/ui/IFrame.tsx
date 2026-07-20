export function IFrame({ address, mapSrc }: { address?: string; mapSrc: string }) {
  return (
    <div className="h-[24rem] w-full overflow-hidden border border-soft lg:h-[30rem]">
      <iframe
        title={`${address} on Google Maps`}
        src={mapSrc}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
