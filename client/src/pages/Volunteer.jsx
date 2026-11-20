import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, HeartHandshake, CheckCircle2, ArrowRight, Sparkles, Users, Award, ShieldCheck } from "lucide-react"
import { volunteer } from "../data/content"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    occupation: "",
    interests: "Community Service",
    skills: "",
    reason: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
              <HeartHandshake className="size-3.5" />
              Sevak Movement &bull; Hanish Charity Foundation
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            {volunteer.hero.heading}
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            {volunteer.hero.description}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. WHY VOLUNTEER & OPPORTUNITIES */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-7">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
                Make a Meaningful Difference
              </span>
              <h2 className="mt-3 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl leading-tight">
                Why Volunteer With Us?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8">
                {volunteer.whyVolunteer}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-8 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-[#0b2545] mb-5">
                  Volunteer Opportunities:
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#5a6e85]">
                  {volunteer.opportunities.map((opp) => (
                    <li key={opp} className="flex items-center gap-3">
                      <span className="size-2 rounded-full bg-[#e5a93c]" />
                      <span className="font-semibold text-[#0b2545]">{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. VOLUNTEER REGISTRATION FORM */}
          <div className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-8 sm:p-12 shadow-xl shadow-slate-200/50">
            <h3 className="font-heading text-2xl font-extrabold text-[#0b2545] mb-2 sm:text-3xl">
              Volunteer Registration Form
            </h3>
            <p className="text-xs text-[#5a6e85] mb-8">
              Fill in your details below to join our verified volunteer network and receive your official volunteer card.
            </p>

            {submitted ? (
              <div className="py-14 text-center">
                <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="size-10" />
                </div>
                <h4 className="mt-6 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-3xl">
                  Welcome to the Movement!
                </h4>
                <p className="mt-3 text-sm text-[#5a6e85] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. We have received your volunteer application. Our administration team will review your application for approval and notify you via email.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/volunteer/login"
                    className="rounded-xl bg-[#0b2545] px-7 py-3 text-xs font-bold text-white hover:bg-[#133e87] transition shadow"
                  >
                    Go to Volunteer Login
                  </Link>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        age: "",
                        city: "",
                        occupation: "",
                        interests: "Community Service",
                        skills: "",
                        reason: ""
                      });
                    }}
                    className="rounded-xl border border-border bg-white px-7 py-3 text-xs font-bold text-[#0b2545] hover:bg-muted transition shadow-sm"
                  >
                    Submit Another Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99661 12658"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 24"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Student / Professional / Business / Other"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                      Primary Area of Interest
                    </label>
                    <select
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    >
                      {volunteer.opportunities.map((opp) => (
                        <option key={opp} value={opp}>{opp}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                    Skills / Expertise
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. Teaching, Design, Logistics, First Aid, Social Media"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b2545] mb-2 uppercase tracking-wider">
                    Why Would You Like to Volunteer?
                  </label>
                  <textarea
                    rows="3"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Tell us a little about your motivation to help..."
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-9 py-3.5 text-sm font-black text-[#07162c] shadow-lg transition hover:brightness-105 active:scale-95"
                  >
                    <span>Join as a Volunteer</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] text-white">
        <div className="page-shell px-4 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-4xl">
            {volunteer.ctaHeading}
          </h2>
          <p className="mt-4 text-sm text-white/90 sm:text-base leading-relaxed">
            {volunteer.ctaDescription}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/donate"
              className="rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-7 py-3 text-sm font-bold text-[#07162c] shadow hover:brightness-105 active:scale-95"
            >
              Donate Now
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow hover:bg-white/20 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
