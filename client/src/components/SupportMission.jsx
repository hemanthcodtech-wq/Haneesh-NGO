import { useState } from "react"
import { Heart, ShieldCheck, CheckCircle2, ArrowRight, Users, Sparkles, Star } from "lucide-react"
import { NavLink } from "react-router-dom"
import { whyChooseUs, homeCTA } from "../data/content"
import FadeIn from "./Common/FadeIn"

export default function SupportMission() {
  return (
    <section id="support" className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[1320px] space-y-14">
        
        {/* Why Choose Us Section */}
        <div>
          <FadeIn className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Core Principles
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              {whyChooseUs.heading}
            </h2>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {whyChooseUs.points.map((pt, idx) => (
              <FadeIn key={pt.title} delay={idx * 0.07}>
                <div className="h-full rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition hover:shadow-md hover:border-[#e5a93c]">
                  <div className="size-9 rounded-xl bg-[#fef7ea] text-[#c8891f] grid place-items-center mb-3 font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading text-base font-extrabold text-[#0b2545]">
                    {pt.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#5a6e85] leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Call To Action Banner: Be the Reason Someone Smiles Today */}
        <FadeIn className="relative overflow-hidden rounded-3xl border-2 border-[#e5a93c]/40 bg-gradient-to-br from-[#07162c] via-[#0b2545] to-[#173b6c] p-7 text-white shadow-2xl sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#e5a93c]/20 blur-3xl" />
          
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e5a93c] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#07162c] shadow">
              <Sparkles className="size-3.5" />
              JOIN THE HUMANITARIAN MOVEMENT
            </span>
            
            <h2 className="mt-4 font-heading text-2xl font-extrabold text-white sm:text-4xl lg:text-[42px] leading-tight">
              {homeCTA.heading}
            </h2>
            
            <p className="mt-3.5 text-xs leading-relaxed text-white/90 sm:text-base sm:leading-8">
              {homeCTA.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavLink
                to="/donate"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-7 py-3 text-sm font-extrabold text-[#07162c] shadow-xl transition hover:brightness-105 active:scale-95"
              >
                <span>{homeCTA.primaryBtn}</span>
                <ArrowRight className="size-4" />
              </NavLink>

              <NavLink
                to="/volunteer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 active:scale-95"
              >
                <Heart className="size-4 text-[#fcd34d] fill-current" />
                <span>{homeCTA.secondaryBtn}</span>
              </NavLink>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
