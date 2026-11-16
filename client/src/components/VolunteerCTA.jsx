import { ArrowRight, Check, HeartHandshake } from "lucide-react"
import { NavLink } from "react-router-dom"
import { volunteer } from "../data/content"
import FadeIn from "./Common/FadeIn"

export default function VolunteerCTA() {
  return (
    <section id="volunteer" className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <FadeIn className="relative min-h-[340px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#07162c] via-[#0b2545] to-[#173b6c] text-white shadow-xl sm:min-h-[380px]">
          <img
            src={volunteer.image}
            alt="Hanish Charity Foundation Volunteers"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            decoding="async"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#0b2545]/90 to-transparent" />
          
          <div className="relative z-10 flex min-h-[340px] items-center px-6 py-8 sm:min-h-[380px] sm:px-12 sm:py-12 lg:px-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e5a93c]/20 border border-[#e5a93c]/40 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#fcd34d]">
                <HeartHandshake className="size-3.5 text-[#e5a93c]" />
                Join the Movement
              </span>
              
              <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight sm:text-4xl lg:text-[42px] text-white">
                Volunteer With Hanish Charity Foundation
              </h2>
              
              <p className="mt-2.5 text-xs leading-relaxed text-white/85 sm:text-sm">
                Become the guiding hand for children in need. Dedicate your passion, skills, and time to food drives, student mentorship, and healthcare camps.
              </p>

              <p className="mt-2 text-xs font-semibold text-[#fcd34d] italic">
                &ldquo;Small acts of kindness make monumental transformations.&rdquo;
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 sm:gap-2.5 sm:text-sm">
                {volunteer.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/90">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e5a93c] text-[#07162c]">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <NavLink
                  to="/volunteer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-6 py-3 text-xs font-bold text-[#07162c] shadow-lg transition hover:brightness-105 active:scale-95 sm:text-sm"
                >
                  Register as Volunteer
                  <ArrowRight className="size-4" />
                </NavLink>
                <NavLink
                  to="/about"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/20 active:scale-95 sm:text-sm backdrop-blur-sm"
                >
                  Learn More About Us
                </NavLink>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
