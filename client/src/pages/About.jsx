import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { 
  Heart, 
  HandHeart, 
  Users, 
  Compass, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Award, 
  FileText, 
  Download, 
  ExternalLink,
  Quote,
  UserCheck
} from "lucide-react"
import { aboutContent, missionVision, directors, officialDocuments } from "../data/content"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

export default function About() {
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
              <Sparkles className="size-3.5" />
              {aboutContent.hero.subtitle}
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            {aboutContent.hero.heading}
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            {aboutContent.hero.description}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            <div className="lg:col-span-7">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
                Who We Are
              </span>
              <h2 className="mt-3 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl lg:text-[40px] leading-tight">
                {aboutContent.whoWeAre.heading}
              </h2>
              
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                {aboutContent.whoWeAre.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f]">
                    <ShieldCheck className="size-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0b2545]">Section 8 Non-Profit</h4>
                    <p className="text-xs text-[#5a6e85]">Central Govt. Licensed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545]">
                    <Users className="size-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0b2545]">12A &amp; 80G Certified</h4>
                    <p className="text-xs text-[#5a6e85]">Tax-exempt donations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-[#e2e8f0] bg-gradient-to-br from-[#fafbff] via-white to-[#fef7ea]/50 p-8 sm:p-10 shadow-xl shadow-slate-200/50">
                <div className="size-16 rounded-2xl bg-[#0b2545] text-[#fcd34d] grid place-items-center mb-6 shadow-md">
                  <Heart className="size-8 fill-current" />
                </div>
                <h3 className="font-heading text-2xl font-black text-[#0b2545]">
                  Humanity Comes First
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-sm">
                  We believe that even the smallest act of generosity can create a meaningful difference in someone's life. By bringing people together, we foster a lifelong culture of empathy and care.
                </p>
                <div className="mt-8 pt-6 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#0b2545]">
                  <span>Hanish Charity Foundation</span>
                  <span className="text-[#c8891f]">&bull; Registered Trust</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DIRECTORS & LEADERSHIP - Founders Nenavath Madan & Nenavath Swaroopa */}
      <section className="py-16 sm:py-24 bg-[#fafbff] border-y border-[#e2e8f0]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Founders &amp; Leadership
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Meet Our Founders
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-base">
              The visionaries driving Hanish Charity Foundation with unwavering integrity, transparency, and personal commitment to social welfare.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {directors.map((dir, idx) => (
              <div
                key={dir.name}
                className="group relative overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#e5a93c]"
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
                    <UserCheck className="size-4 text-[#c8891f]" />
                    Verified Leadership
                  </span>
                  <span className="rounded-full bg-[#edf4fc] px-3 py-0.5 text-[11px] font-extrabold text-[#0b2545]">
                    Board of Directors
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. OFFICIAL STATUTORY DOCUMENTS - New Interactive Repository */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Transparency &amp; Governance
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Official Legal &amp; Statutory Documents
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-base">
              Hanish Charity Foundation operates with complete legal accountability and transparency. View and download our verified registration and approval certificates.
            </p>

            {/* Quick Stat Badges for PAN and URN */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-[#0b2545]/15 bg-[#edf4fc] px-3.5 py-1.5 text-xs font-black text-[#0b2545]">
                <ShieldCheck className="size-4 text-[#c8891f]" />
                PAN: <span className="font-mono text-[#0b2545]">AAHCH7252D</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-[#0b2545]/15 bg-[#edf4fc] px-3.5 py-1.5 text-xs font-black text-[#0b2545]">
                <ShieldCheck className="size-4 text-[#c8891f]" />
                Unique Reg No (URN): <span className="font-mono text-[#0b2545]">AAHCH7252DE20241</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800">
                Nature: Charitable Non-Profit
              </span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officialDocuments.map((doc) => (
              <div
                key={doc.title}
                className="group flex flex-col justify-between rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#e5a93c] hover:bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="grid size-11 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545] group-hover:bg-[#fef7ea] group-hover:text-[#c8891f] transition">
                      <FileText className="size-5" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0b2545] bg-white border border-[#e2e8f0] px-2.5 py-1 rounded-full shadow-xs">
                      {doc.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-extrabold text-[#0b2545] leading-snug">
                    {doc.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#5a6e85] leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-[#0b2545]/15 py-2.5 text-xs font-extrabold text-[#0b2545] shadow-xs transition hover:bg-[#0b2545] hover:text-white group-hover:border-[#0b2545]"
                  >
                    <Download className="size-3.5" />
                    <span>View / Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. MISSION & VISION */}
      <section className="py-16 sm:py-24 bg-[#fafbff] border-y border-[#e2e8f0]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Guiding Framework
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Our Mission &amp; Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 sm:p-10 shadow-sm transition hover:shadow-md hover:border-[#0b2545]">
              <div className="flex items-center gap-3.5">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545]">
                  <Compass className="size-6" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-[#0b2545]">Our Mission</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                To serve humanity with compassion by supporting vulnerable communities, empowering individuals and providing opportunities for a healthier, happier and more dignified life.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 sm:p-10 shadow-sm transition hover:shadow-md hover:border-[#e5a93c]">
              <div className="flex items-center gap-3.5">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f]">
                  <Eye className="size-6" />
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-[#0b2545]">Our Vision</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                To build a compassionate society where everyone has access to basic necessities, quality education, healthcare and equal opportunities, regardless of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR COMMITMENT & CLOSING CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#e5a93c]/40 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] p-8 sm:p-14 text-white text-center shadow-2xl max-w-4xl mx-auto">
            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#e5a93c]/20 blur-3xl" />
            
            <h2 className="font-heading text-2xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Our Commitment
            </h2>
            <p className="mt-4 text-sm text-white/90 sm:text-base leading-relaxed max-w-2xl mx-auto">
              {aboutContent.commitment.text}
            </p>
            <p className="mt-6 font-heading text-lg font-black text-[#fcd34d] sm:text-2xl">
              ✨ {aboutContent.commitment.closingCTA}
            </p>
            
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                to="/donate"
                className="rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3.5 text-sm font-black text-[#07162c] shadow-lg hover:brightness-105 active:scale-95"
              >
                Donate Today
              </Link>
              <Link
                to="/volunteer"
                className="rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white shadow hover:bg-white/20 active:scale-95"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
