import { useState } from "react"
import { motion } from "framer-motion"
import { Link, NavLink } from "react-router-dom"
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Stethoscope, 
  Utensils, 
  Users, 
  ShieldCheck, 
  HandHeart, 
  Compass, 
  Eye, 
  CheckCircle2, 
  Award,
  Globe,
  Quote,
  Clock,
  MapPin,
  Calendar
} from "lucide-react"

import { 
  hero, 
  introduction, 
  missionVision, 
  directors,
  focusAreas, 
  impactSection, 
  whyChooseUs, 
  homeCTA,
  testimonials,
  news
} from "../data/content"
import CampaignPopup from "../components/CampaignPopup"
import BankAccountsSection from "../components/Common/BankAccountsSection"

export default function Home() {
  const [selectedPillar, setSelectedPillar] = useState(0)

  return (
    <main className="public-page min-h-screen bg-white">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION - Modern Asymmetric Split with Live Giving Trigger
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#133e87] text-white pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -top-24 -left-24 size-[550px] rounded-full bg-[#173b6c]/40 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-[600px] rounded-full bg-[#e5a93c]/20 blur-[130px]" />
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #e5a93c 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }}
        />

        <div className="page-shell relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Content Column */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/40 bg-[#07162c]/80 px-4 py-1.5 shadow-inner backdrop-blur-md">
                <span className="flex size-2 rounded-full bg-[#e5a93c] animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#fcd34d] sm:text-xs">
                  {hero.smallHeading}
                </span>
              </div>

              <h1 className="mt-5 font-heading text-[clamp(2.4rem,5.6vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                Together, We Can <br />
                <span className="bg-gradient-to-r from-[#fcd34d] via-[#f5b74c] to-[#e5a93c] bg-clip-text text-transparent">
                  Make a Difference.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-[580px] text-sm leading-[1.8] text-white/90 sm:text-base lg:mx-0 lg:text-[16px] lg:leading-[1.85]">
                {hero.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
                <Link
                  to="/donate"
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3.5 text-sm font-black text-[#07162c] shadow-xl shadow-amber-950/30 transition hover:brightness-105 active:scale-95"
                >
                  <span>Donate Now</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/volunteer"
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 active:scale-95"
                >
                  <Heart className="size-4 text-[#fcd34d] fill-current" />
                  <span>Become a Volunteer</span>
                </Link>
              </div>

              {/* Hero Supporting Text Strip */}
              <div className="mt-10 border-t border-white/15 pt-5 text-white/85">
                <p className="text-xs font-bold tracking-wide text-[#fcd34d] sm:text-sm">
                  ✨ {hero.supportingText}
                </p>
              </div>
            </div>

            {/* Right Visual Card with Real Imagery */}
            <div className="lg:col-span-5">
              <div className="group relative mx-auto max-w-md overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-2.5 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src={hero.image}
                    alt="Hanish Charity Foundation Humanitarian Seva"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07162c]/90 via-transparent to-black/20" />
                </div>

                {/* Floating Top Badge */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/40 bg-[#0b2545]/90 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                  <Sparkles className="size-3.5 text-[#fcd34d]" />
                  <span>Humanity First &bull; Compassion Always</span>
                </div>

                {/* Floating Bottom Action Banner */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-white/95 p-3.5 text-[#0b2545] shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-[#fef7ea] text-[#c8891f]">
                        <HandHeart className="size-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#0b2545]">Every Small Act Counts</h4>
                        <p className="text-[10px] text-[#5a6e85]">Join hands with our mission</p>
                      </div>
                    </div>
                    <Link
                      to="/donate"
                      className="rounded-xl bg-[#0b2545] px-3.5 py-2 text-[11px] font-bold text-[#fcd34d] transition hover:bg-[#133e87] active:scale-95 whitespace-nowrap"
                    >
                      Give Hope &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 2: INTRODUCTION SECTION - Clean Two-Tone Narrative Box
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#fafbff] border-b border-[#e2e8f0]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            
            <div className="lg:col-span-7">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
                Introduction
              </span>
              <h2 className="mt-3 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl lg:text-[40px] leading-tight">
                {introduction.heading}
              </h2>
              
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                {introduction.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-7 py-3 text-sm font-bold text-[#07162c] shadow-lg shadow-amber-950/20 transition hover:brightness-105 active:scale-95"
                >
                  <span>{introduction.buttonText}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">
                <div className="size-14 rounded-2xl bg-[#edf4fc] text-[#0b2545] grid place-items-center mb-5">
                  <ShieldCheck className="size-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#0b2545]">
                  Dignity &amp; Compassionate Care
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-sm">
                  We believe that helping others is one of the greatest responsibilities we share as human beings. Through collective action, kindness reaches every doorstep.
                </p>
                <div className="mt-6 pt-5 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#0b2545]">
                  <span>Humanitarian Care</span>
                  <span className="text-[#c8891f]">Verified NGO</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3: MISSION & VISION - Distinct Symmetric Architectural Cards
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Guiding Purpose
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Our Mission &amp; Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Mission Card */}
            <div className="group rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-8 sm:p-10 shadow-sm transition hover:shadow-xl hover:border-[#0b2545]">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545] shadow-sm">
                  <Compass className="size-7" />
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-[#0b2545]">
                  {missionVision.mission.title}
                </h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                {missionVision.mission.text}
              </p>
            </div>

            {/* Vision Card */}
            <div className="group rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-8 sm:p-10 shadow-sm transition hover:shadow-xl hover:border-[#e5a93c]">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f] shadow-sm">
                  <Eye className="size-7" />
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-[#0b2545]">
                  {missionVision.vision.title}
                </h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                {missionVision.vision.text}
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 3B: FOUNDERS & LEADERSHIP - Nenavath Madan & Nenavath Swaroopa
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#fafbff] border-y border-[#e2e8f0]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Dedicated Leadership
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Meet Our Founders
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-base">
              Guided by compassion, empathy and service to humanity, our founders lead every initiative with transparent and devoted commitment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {directors.map((dir) => (
              <div
                key={dir.name}
                className="group relative overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#e5a93c]"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
                  <div className="relative shrink-0">
                    <img
                      src={dir.image}
                      alt={dir.name}
                      className="size-28 sm:size-32 rounded-2xl object-cover object-top border-2 border-[#e5a93c]/30 shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute -bottom-2 -right-2 grid size-8 place-items-center rounded-xl bg-[#0b2545] text-[#fcd34d] shadow-sm">
                      <Award className="size-4" />
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-heading text-2xl font-black text-[#0b2545]">
                      {dir.name}
                    </h3>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#fef7ea] px-3.5 py-1 text-xs font-black text-[#c8891f]">
                      <Sparkles className="size-3" />
                      <span>{dir.role}</span>
                    </div>
                    <div className="mt-2 text-xs font-semibold text-[#5a6e85]">
                      Hanish Charity Foundation
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-[#5a6e85] sm:text-sm sm:leading-7">
                  {dir.bio}
                </p>

                <div className="mt-6 pt-5 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#0b2545]">
                  <span className="inline-flex items-center gap-1.5 text-[#0b2545]">
                    <ShieldCheck className="size-4 text-[#c8891f]" />
                    Verified Leadership
                  </span>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1 text-xs font-black text-[#c8891f] hover:text-[#0b2545] transition-colors"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 4: OUR FOCUS AREAS - 6 Key Pillars in a Refined Modern Card Grid
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#fafbff] border-y border-[#e2e8f0]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Core Initiatives
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Our Focus Areas
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-base">
              Explore the six critical pillars through which Hanish Charity Foundation serves humanity, empowers children, and supports struggling families.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, idx) => (
              <div
                key={area.id}
                className="group flex flex-col rounded-3xl border border-[#e2e8f0] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#e5a93c]"
              >
                <div className="flex items-center justify-between">
                  <span className={`grid size-12 place-items-center rounded-2xl ${idx % 2 === 0 ? "bg-[#fef7ea] text-[#c8891f]" : "bg-[#edf4fc] text-[#0b2545]"}`}>
                    {idx === 0 && <BookOpen className="size-6" />}
                    {idx === 1 && <Stethoscope className="size-6" />}
                    {idx === 2 && <Utensils className="size-6" />}
                    {idx === 3 && <Users className="size-6" />}
                    {idx === 4 && <ShieldCheck className="size-6" />}
                    {idx === 5 && <HandHeart className="size-6" />}
                  </span>
                  <span className="font-heading text-xs font-black tracking-wider text-[#0b2545] bg-[#edf4fc] px-2.5 py-1 rounded-full">
                    {area.key}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-lg font-extrabold text-[#0b2545] sm:text-xl">
                  {area.title}
                </h3>

                <p className="mt-2 text-xs text-[#5a6e85] font-medium leading-relaxed">
                  {area.shortDescription}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] flex-1">
                  {area.description}
                </p>

                <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
                  <Link
                    to={`/programs#${area.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2545] hover:text-[#c8891f] transition"
                  >
                    <span>Read detailed objectives</span>
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: IMPACT SECTION - High-Impact Floating Counter Matrix
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl border border-[#e2e8f0] bg-gradient-to-br from-[#07162c] via-[#0b2545] to-[#173b6c] p-8 sm:p-14 text-white shadow-2xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#fcd34d]">
                Verified Outcomes
              </span>
              <h2 className="mt-2 font-heading text-2xl font-extrabold text-white sm:text-4xl">
                {impactSection.heading}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-base">
                {impactSection.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {impactSection.counters.map((cnt, i) => (
                <div
                  key={cnt.id}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-md transition hover:bg-white/15"
                >
                  <div className="font-heading text-2xl font-black text-[#fcd34d] sm:text-3xl lg:text-4xl">
                    {cnt.value}
                  </div>
                  <div className="mt-2 text-xs font-bold text-white/90 sm:text-sm">
                    {cnt.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6: WHY CHOOSE US - 5 Pillars Horizontal Timeline / Flex Cards
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#fafbff] border-b border-[#e2e8f0]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Values &amp; Ethics
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              {whyChooseUs.heading}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {whyChooseUs.points.map((pt, idx) => (
              <div
                key={pt.title}
                className="flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#e5a93c]"
              >
                <div className="size-10 rounded-xl bg-[#fef7ea] text-[#c8891f] grid place-items-center mb-4 font-black text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-base font-extrabold text-[#0b2545]">
                  {pt.title}
                </h3>
                <p className="mt-2 text-xs text-[#5a6e85] leading-relaxed flex-1">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 7: CALL TO ACTION - "Be the Reason Someone Smiles Today."
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#e5a93c]/40 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] p-8 sm:p-14 text-white text-center shadow-2xl max-w-4xl mx-auto">
            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#e5a93c]/20 blur-3xl" />
            
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e5a93c] px-4 py-1 text-xs font-black uppercase tracking-wider text-[#07162c] shadow">
              <Sparkles className="size-3.5" />
              JOIN THE HUMANITARIAN MOVEMENT
            </span>

            <h2 className="mt-5 font-heading text-2xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
              {homeCTA.heading}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base max-w-2xl mx-auto">
              {homeCTA.description}
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                to="/donate"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3 text-sm font-black text-[#07162c] shadow-xl hover:brightness-105 active:scale-95"
              >
                <span>{homeCTA.primaryBtn}</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/volunteer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3 text-sm font-bold text-white shadow hover:bg-white/20 active:scale-95"
              >
                <Heart className="size-4 text-[#fcd34d] fill-current" />
                <span>{homeCTA.secondaryBtn}</span>
              </Link>
            </div>
          </div>

          {/* Official Bank Account & QR Donation Details */}
          <div className="mt-14">
            <BankAccountsSection />
          </div>

        </div>
      </section>

      {/* Campaign Popup Modal */}
      <CampaignPopup />

    </main>
  )
}
