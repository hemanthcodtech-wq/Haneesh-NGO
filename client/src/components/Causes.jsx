import { ArrowRight, CheckCircle2 } from "lucide-react"
import { NavLink } from "react-router-dom"
import { focusAreas } from "../data/content"
import Icon from "./Common/Icon"
import FadeIn from "./Common/FadeIn"

export default function Causes() {
  return (
    <section id="causes" className="w-full overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24 bg-gradient-to-b from-transparent via-[#f8faff] to-transparent">
      <div className="mx-auto w-full max-w-[1320px]">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
            Core Pillars
          </span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
            Our Focus Areas
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-base">
            Dedicated programs designed to bring care, empowerment and sustainable relief to individuals and communities.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, i) => (
            <FadeIn key={area.id} delay={i * 0.08} className="flex flex-col">
              <article className="group relative flex h-full flex-col rounded-3xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#e5a93c]">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f]">
                    <Icon name={area.icon} className="size-6" />
                  </span>
                  <span className="font-heading text-xs font-black tracking-wider text-[#0b2545] bg-[#edf4fc] px-2.5 py-1 rounded-full">
                    AREA {area.key}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-[#0b2545] sm:text-xl leading-snug">
                  {area.title}
                </h3>
                
                <p className="mt-2 text-xs text-[#5a6e85] font-medium leading-relaxed">
                  {area.shortDescription}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] flex-1">
                  {area.description}
                </p>

                <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
                  <NavLink
                    to="/programs"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2545] transition hover:text-[#c8891f]"
                  >
                    <span>Learn more about this cause</span>
                    <ArrowRight className="size-3.5 transition group-hover/link:translate-x-1" />
                  </NavLink>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
