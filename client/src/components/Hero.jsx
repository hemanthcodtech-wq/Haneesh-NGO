import { motion } from "framer-motion"
import { Heart, HandHeart, ArrowRight, Sparkles } from "lucide-react"
import { NavLink } from "react-router-dom"
import { hero } from "../data/content"

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden home-hero pt-10 pb-16 sm:pt-14 sm:pb-24 lg:py-28">
      {/* Brand Ambient Glows */}
      <div className="pointer-events-none absolute -top-12 -left-12 size-[520px] rounded-full bg-[#133e87]/35 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -left-20 size-[450px] rounded-full bg-[#0b2545]/80 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 size-[550px] rounded-full bg-[#e5a93c]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 size-[400px] rounded-full bg-[#d49528]/15 blur-[90px]" />
      
      {/* Subtle Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e5a93c 1px, transparent 0)",
          backgroundSize: '32px 32px'
        }}
      />

      <div className="page-shell relative z-10 flex flex-col-reverse gap-10 px-4 sm:grid sm:grid-cols-[1.15fr_0.85fr] sm:gap-12 sm:px-6 lg:gap-16 lg:px-8 xl:gap-20 sm:items-center">
        
        {/* Text & Content Column */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center sm:text-left"
        >
          {/* Small Heading */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/40 bg-[#07162c]/75 px-4 py-1.5 backdrop-blur-md shadow-inner">
            <span className="flex size-2 rounded-full bg-[#e5a93c] animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#fcd34d] sm:text-xs">
              {hero.smallHeading}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mt-4 font-heading text-[clamp(2.3rem,5.8vw,4.4rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            Together, We Can <br />
            <span className="bg-gradient-to-r from-[#fcd34d] via-[#f5b74c] to-[#e5a93c] bg-clip-text text-transparent">
              Make a Difference.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[580px] text-sm leading-[1.8] text-white/90 sm:mx-0 sm:mt-5 sm:text-base lg:text-[16px] lg:leading-[1.8]">
            {hero.description}
          </p>

          {/* Action Buttons: Donate Now & Become a Volunteer */}
          <div className="mt-8 flex flex-wrap justify-center gap-3.5 sm:justify-start sm:gap-4 lg:mt-9">
            <NavLink
              to="/donate"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-7 py-3 text-sm font-extrabold text-[#07162c] shadow-xl shadow-amber-950/30 transition hover:brightness-105 active:scale-95 whitespace-nowrap"
            >
              <span>Donate Now</span>
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </NavLink>

            <NavLink
              to="/volunteer"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 active:scale-95 whitespace-nowrap"
            >
              <Heart className="size-4 text-[#fcd34d] fill-current" />
              <span>Become a Volunteer</span>
            </NavLink>
          </div>

          {/* Hero Supporting Text */}
          <div className="mt-8 border-t border-white/15 pt-5 text-white/85 sm:pt-6">
            <p className="text-xs font-bold tracking-wide text-[#fcd34d] sm:text-sm">
              ✨ {hero.supportingText}
            </p>
          </div>
        </motion.div>

        {/* Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[460px] sm:mx-0 sm:max-w-none"
        >
          <div className="group relative overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-2 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]">
              <img
                src={hero.image}
                alt="Hanish Charity Foundation Community Care"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                decoding="async"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07162c]/90 via-transparent to-black/20" />
            </div>

            {/* Floating Top Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/40 bg-[#0b2545]/90 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md sm:top-5 sm:left-5">
              <Sparkles className="size-3.5 text-[#fcd34d]" />
              <span>Humanity First &bull; Compassion Always</span>
            </div>

            {/* Floating Bottom Card: Prompt */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/25 bg-white/95 p-3.5 text-[#0b2545] shadow-2xl backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#fef7ea] text-[#c8891f] sm:size-11">
                    <HandHeart className="size-5 sm:size-6" />
                  </div>
                  <div>
                    <h2 className="text-xs font-extrabold sm:text-sm text-[#07162c]">Bring Hope &amp; Support</h2>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">Every small act creates a big impact</p>
                  </div>
                </div>
                <NavLink
                  to="/donate"
                  className="rounded-xl bg-[#0b2545] hover:bg-[#133e87] px-3.5 py-2 text-[11px] font-bold text-[#fcd34d] shadow transition active:scale-95 whitespace-nowrap"
                >
                  Give Now &rarr;
                </NavLink>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
