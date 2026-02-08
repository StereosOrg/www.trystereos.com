const colors = [
  "bg-emerald-100 border-emerald-300",
  "bg-violet-100 border-violet-300",
  "bg-amber-100 border-amber-300",
  "bg-rose-100 border-rose-300",
  "bg-cyan-100 border-cyan-300",
  "bg-orange-100 border-orange-300",
  "bg-blue-100 border-blue-300",
  "bg-pink-100 border-pink-300",
]

function LogoPlaceholder({ index }: { index: number }) {
  const color = colors[index % colors.length]
  return (
    <div
      className={`flex-shrink-0 flex items-center gap-3 px-5 py-3 border-4 border-black ${color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
    >
      <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center">
        <span className="text-xs font-black">?</span>
      </div>
      <span className="text-sm font-bold uppercase tracking-[0.15em] whitespace-nowrap">
        Your Logo Here
      </span>
    </div>
  )
}

export function LogoMarquee() {
  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="relative overflow-hidden border-y-4 border-black bg-white py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      {/* Sliding track — two copies for seamless loop */}
      <div className="flex gap-6 animate-marquee w-max">
        {items.map((i) => (
          <LogoPlaceholder key={`a-${i}`} index={i} />
        ))}
        {items.map((i) => (
          <LogoPlaceholder key={`b-${i}`} index={i} />
        ))}
      </div>
    </div>
  )
}
