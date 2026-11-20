import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Quote, Star, Heart, ArrowRight, CheckCircle2, MessageSquareQuote, Sparkles } from "lucide-react"
import API_BASE from "../lib/api"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/testimonials`)
        const data = await res.json()
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials)
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

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
              <Sparkles className="size-3.5 text-[#e5a93c]" />
              Voices of Trust &bull; Hanish Charity Foundation
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            Stories of Hope &amp; Community Impact
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            Read heartfelt words from donors, partners, volunteers, and beneficiaries whose lives have been touched through the dedicated seva of Hanish Charity Foundation.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. TESTIMONIALS GRID */}
      <section className="py-16 sm:py-24 bg-[#fafbff]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="size-10 animate-spin rounded-full border-4 border-[#0b2545] border-t-[#e5a93c]" />
              <p className="mt-4 text-sm font-semibold text-muted-foreground">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-white p-12 text-center shadow-sm">
              <MessageSquareQuote className="mx-auto size-12 text-muted-foreground/40" />
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">No Testimonials Yet</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Testimonials published by our administration will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => {
                const name = t.name || "Supporter"
                const role = t.role || "Community Member"
                const quote = t.quote || ""
                const rating = Math.min(Math.max(Number(t.rating) || 5, 1), 5)
                const avatar = t.image_url

                return (
                  <article
                    key={t.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-7 sm:p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#e5a93c] hover:shadow-xl"
                  >
                    <div>
                      {/* Top Quote Icon & Rating */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="grid size-11 place-items-center rounded-2xl bg-[#fef7ea] text-[#c8891f] shadow-sm">
                          <Quote className="size-5" />
                        </span>
                        <div className="flex items-center gap-1 text-[#f59e0b]">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="size-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Quote Text */}
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed italic">
                        "{quote}"
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="mt-8 pt-5 border-t border-[#f1f5f9] flex items-center gap-3.5">
                      <div className="size-12 shrink-0 rounded-full border-2 border-[#e5a93c]/50 bg-[#edf4fc] overflow-hidden flex items-center justify-center font-bold text-[#0b2545] text-sm">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                            }}
                          />
                        ) : (
                          name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-heading text-sm font-extrabold text-[#0b2545] truncate">
                          {name}
                        </h4>
                        <p className="text-[11px] font-semibold text-[#8a99ad] truncate">
                          {role}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

        </div>
      </section>

      {/* 3. CALL TO ACTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] text-white">
        <div className="page-shell px-4 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/40 bg-[#07162c]/80 px-4 py-1.5 text-xs font-bold text-[#fcd34d]">
            <Heart className="size-3.5 fill-current text-[#fcd34d]" />
            Be Part of Our Mission
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold text-white sm:text-4xl">
            Help Us Write the Next Success Story
          </h2>
          <p className="mt-3 text-sm text-white/90 sm:text-base leading-relaxed">
            Your support empowers communities, educates children, and brings healthcare to those who need it most.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              to="/donate"
              className="rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3.5 text-sm font-black text-[#07162c] shadow hover:brightness-105 active:scale-95"
            >
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white shadow hover:bg-white/20 active:scale-95"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
