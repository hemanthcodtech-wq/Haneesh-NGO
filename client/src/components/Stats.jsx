import { useEffect, useRef, useState } from "react"
import { impactSection } from "../data/content"
import Icon from "./Common/Icon"
import FadeIn from "./Common/FadeIn"

function CountUp({ value }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef(null)

  useEffect(() => {
    const match = String(value).match(/^(.*?)([\d,]+)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }

    const [, prefix, numeric, suffix] = match
    const target = Number(numeric.replace(/,/g, ""))
    let frame
    let start
    const duration = 1500

    const step = (time) => {
      if (!start) start = time
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(target * eased)
      setDisplay()
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        frame = requestAnimationFrame(step)
        observer.disconnect()
      }
    }, { threshold: 0.35 })

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={ref}>{display}</span>
}

export default function Stats() {
  return (
    <section aria-label="Impact section" className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 bg-[#fafbff]">
      <div className="mx-auto w-full max-w-[1320px]">
        
        {/* Impact Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
            Our Collective Impact
          </span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
            {impactSection.heading}
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-base">
            {impactSection.description}
          </p>
        </FadeIn>

        {/* Counters Grid */}
        <FadeIn className="rounded-2xl border border-border/70 bg-white p-3 shadow-[0_10px_30px_rgba(11,37,69,0.06)] sm:rounded-3xl sm:p-5 lg:p-6">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
            {impactSection.counters.map((stat, i) => (
              <FadeIn key={stat.id} delay={i * 0.08} className="flex min-h-[92px] items-center gap-3 rounded-xl px-3 py-4 sm:min-h-[108px] sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-5 bg-[#fafbff]/60">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#0b2545] text-white">
                  <Icon name={stat.icon} className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block font-heading text-xl font-extrabold text-[#0b2545] sm:text-2xl lg:text-3xl">
                    <CountUp value={stat.value} />
                  </span>
                  <span className="text-[11px] font-semibold text-[#5a6e85] sm:text-xs">
                    {stat.label}
                  </span>
                </span>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
