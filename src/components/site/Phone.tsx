/** Skærmbillede fra appen i en iPhone-ramme. */
export default function Phone({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative aspect-[1000/2100] rounded-[16%/7.4%] bg-[#0b0b0c] p-[3.2%] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className="h-full w-full rounded-[13%/6%] object-cover" />
    </div>
  );
}
