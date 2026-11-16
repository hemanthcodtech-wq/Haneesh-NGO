import { ArrowRight, Compass, Eye, ShieldCheck, Heart, HandHeart, Sparkles } from "lucide-react"
import { NavLink } from "react-router-dom"
import { introduction, missionVision } from "../data/content"
import FadeIn from "./Common/FadeIn"

export default function Mission() {
  return (
    <div className="space-y-12 sm:space-y-16 py-10 sm:py-16">
      
      {/* 1. Introduction Section */}
      <section id="intro" className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1320px]">
          <FadeIn className="relative overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6 sm:p-10 lg:p-14 shadow-[0_16px_40px_rgba(11,37,69,0.06)]">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#fef7ea] border border-[#e5a93c]/30 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
                  <span className="size-2 rounded-full bg-[#e5a93c]" />
                  Our Foundation
                </span>
                
                <h2 className="mt-4 font-heading text-2xl font-extrabold leading-[1.2] text-[#0b2545] sm:text-4xl lg:text-[42px]">
                  {introduction.heading}
                </h2>
                
                <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                  {introduction.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <NavLink
                    to="/about"
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-7 py-3 text-sm font-bold text-[#07162c] shadow-lg shadow-amber-950/20 transition hover:brightness-105 active:scale-95"
                  >
                    <span>{introduction.buttonText}</span>
                    <ArrowRight className="size-4" />
                  </NavLink>
                  <NavLink
                    to="/programs"
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#0b2545]/20 bg-white px-6 py-3 text-sm font-bold text-[#0b2545] transition hover:bg-[#edf4fc]"
                  >
                    Explore Focus Areas
                  </NavLink>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-[#fafbff] to-[#f4f7fb] p-6 text-center sm:p-8">
                  <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f] shadow-sm">
                    <HandHeart className="size-8" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-extrabold text-[#0b2545]">Humanity First</h3>
                  <p className="mt-2 text-xs text-[#5a6e85] leading-relaxed">
                    Every act of giving creates a lasting ripple of hope and opportunity for someone in need.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Our Mission & Vision */}
      <section id="mission-vision" className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            
            {/* Mission Card */}
            <FadeIn className="rounded-3xl border border-[#e2e8f0] bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center gap-3.5">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545]">
                  <Compass className="size-6" />
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-[#0b2545]">
                  {missionVision.mission.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                {missionVision.mission.text}
              </p>
            </FadeIn>

            {/* Vision Card */}
            <FadeIn delay={0.1} className="rounded-3xl border border-[#e2e8f0] bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center gap-3.5">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f]">
                  <Eye className="size-6" />
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-[#0b2545]">
                  {missionVision.vision.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                {missionVision.vision.text}
              </p>
            </FadeIn>

          </div>
        </div>
      </section>

    </div>
  )
}
