import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, BookOpen, Stethoscope, Utensils, Users, HandHeart } from "lucide-react"
import { focusAreas } from "../data/content"
import Icon from "../components/Common/Icon"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

export default function CausesPage() {
  return (
    <main className="public-page min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#133e87] text-white">
        <div className="pointer-events-none absolute -top-24 -left-24 size-[520px] rounded-full bg-[#173b6c]/40 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-[550px] rounded-full bg-[#e5a93c]/20 blur-[140px]" />
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #e5a93c 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }}
        />

        <motion.div 
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="page-shell relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <motion.div variants={heroBadgeVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/40 bg-[#07162c]/80 px-4 py-1.5 text-xs font-bold text-[#fcd34d] shadow-sm backdrop-blur-md">
              <ShieldCheck className="size-3.5" />
              Core Pillars &bull; Hanish Charity Foundation
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            Our Causes, Their Brighter Futures
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            Every cause represents an opportunity to change a life. Explore the areas where Hanish Charity Foundation aims to bring hope, assistance and meaningful support.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. CAUSES EXPLORER WITH ALTERNATING HERO CARDS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8 space-y-16">
          {focusAreas.map((cause, idx) => (
            <div 
              key={cause.id}
              id={cause.slug}
              className={`rounded-3xl border border-[#e2e8f0] p-8 sm:p-12 lg:p-14 shadow-sm transition duration-300 hover:shadow-xl hover:border-[#e5a93c] ${
                idx % 2 === 1 ? "bg-[#fafbff]" : "bg-white"
              }`}
            >
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                
                <div className={`lg:col-span-8 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="font-heading text-xs font-black tracking-wider text-[#0b2545] bg-[#edf4fc] px-3 py-1 rounded-full">
                      CAUSE 0{cause.id}
                    </span>
                    <span className="text-xs font-bold text-[#c8891f]">
                      {cause.shortDescription}
                    </span>
                  </div>

                  <h2 className="mt-2 font-heading text-2xl font-black text-[#0b2545] sm:text-3xl lg:text-4xl">
                    {cause.title}
                  </h2>
                  
                  <p className="mt-4 text-xs leading-relaxed text-[#5a6e85] sm:text-sm sm:leading-7">
                    {cause.detailedContent}
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#f1f5f9]">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0b2545] mb-3">
                      Our Core Objectives:
                    </h4>
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      {cause.objectives.map((obj) => (
                        <li key={obj} className="flex items-start gap-2 text-xs sm:text-sm text-[#5a6e85]">
                          <CheckCircle2 className="size-4 shrink-0 text-[#e5a93c] mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      to={`/donate?cause=${cause.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-6 py-2.5 text-xs font-black text-[#07162c] shadow hover:brightness-105 active:scale-95 sm:text-sm"
                    >
                      <span>Support This Cause</span>
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      to="/volunteer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#0b2545]/20 bg-white px-5 py-2.5 text-xs font-bold text-[#0b2545] hover:bg-[#edf4fc] sm:text-sm"
                    >
                      Become a Volunteer
                    </Link>
                  </div>
                </div>

                <div className={`lg:col-span-4 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-sm text-center">
                    <div className="mx-auto grid size-20 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f] shadow-sm mb-5">
                      <Icon name={cause.icon} className="size-10" />
                    </div>
                    <h3 className="font-heading text-xl font-black text-[#0b2545]">
                      {cause.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#5a6e85] leading-relaxed">
                      Dedicated to creating meaningful impact through public care &amp; kindness.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GLOBAL CALL TO ACTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] text-white">
        <div className="page-shell px-4 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/40 bg-[#07162c]/80 px-4 py-1.5 text-xs font-bold text-[#fcd34d]">
            <Heart className="size-3.5 fill-current text-[#fcd34d]" />
            Make a Difference
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold text-white sm:text-4xl">
            Your Support Can Change Someone's Story.
          </h2>
          <p className="mt-3 text-sm text-white/90 sm:text-base leading-relaxed">
            Whether through a donation, volunteering or spreading awareness, your contribution can help bring hope to someone in need.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              to="/donate"
              className="rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3.5 text-sm font-black text-[#07162c] shadow hover:brightness-105 active:scale-95"
            >
              Support Our Causes
            </Link>
            <Link
              to="/volunteer"
              className="rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white shadow hover:bg-white/20 active:scale-95"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
