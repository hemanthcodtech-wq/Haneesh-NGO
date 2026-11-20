import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Heart, ShieldCheck, Tag, Calendar, Layers, CheckCircle2 } from "lucide-react"
import API_BASE from "../lib/api"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/programs`)
        const data = await res.json()
        if (data.success && Array.isArray(data.programs)) {
          setPrograms(data.programs)
        }
      } catch (err) {
        console.error("Failed to load programs:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [])

  // Derive unique categories from programs tags/categories
  const categories = ["all", ...new Set(programs.map(p => (p.tag || p.category || "General").trim()).filter(Boolean))]

  const filteredPrograms = activeCategory === "all"
    ? programs
    : programs.filter(p => (p.tag || p.category || "General").toLowerCase() === activeCategory.toLowerCase())

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
              Impact in Action &bull; Hanish Charity Foundation
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            Our Ongoing Programs &amp; Initiatives
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            Discover the live welfare programs spearheaded by Hanish Charity Foundation. Each program directly serves underprivileged children, needy families, and local communities.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. PROGRAMS CONTENT */}
      <section className="py-16 sm:py-24 bg-[#fafbff]">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Tabs */}
          {categories.length > 2 && (
            <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-[#0b2545] text-[#e5a93c] shadow-md"
                      : "border border-border bg-white text-muted-foreground hover:bg-[#edf4fc] hover:text-[#0b2545]"
                  }`}
                >
                  {cat === "all" ? "All Programs" : cat}
                </button>
              ))}
            </div>
          )}

          {/* Loading / Empty / Cards Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="size-10 animate-spin rounded-full border-4 border-[#0b2545] border-t-[#e5a93c]" />
              <p className="mt-4 text-sm font-semibold text-muted-foreground">Loading active programs...</p>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-white p-12 text-center shadow-sm">
              <Layers className="mx-auto size-12 text-muted-foreground/40" />
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">No Programs Available</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Programs will appear here as soon as they are published by our admin team.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((program) => {
                const tag = program.tag || program.category || "Welfare"
                const title = program.title || program.name || "Foundation Program"
                const desc = program.description || ""
                const img = program.image_url || "/images/placeholder.jpg"

                return (
                  <article
                    key={program.id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#e5a93c] hover:shadow-xl"
                  >
                    {/* Program Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        decoding="async"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/images/annadanam-seva.png"
                        }}
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-[#0b2545]/90 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#e5a93c] shadow-sm">
                        {tag}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="font-heading text-lg font-black text-[#0b2545] sm:text-xl group-hover:text-[#c8891f] transition-colors leading-snug">
                        {title}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-[13px] flex-1 line-clamp-4">
                        {desc}
                      </p>

                      <div className="mt-6 pt-5 border-t border-[#f1f5f9] flex items-center justify-between gap-3">
                        <Link
                          to="/donate"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c8891f] hover:text-[#0b2545] transition"
                        >
                          <span>Support Program</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                        <Link
                          to="/volunteer"
                          className="rounded-lg bg-[#edf4fc] px-3 py-1.5 text-[11px] font-bold text-[#0b2545] hover:bg-[#0b2545] hover:text-white transition"
                        >
                          Volunteer
                        </Link>
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
            Get Involved Today
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold text-white sm:text-4xl">
            Want to Support or Launch a Seva Program?
          </h2>
          <p className="mt-3 text-sm text-white/90 sm:text-base leading-relaxed">
            Partner with Hanish Charity Foundation to reach more underprivileged families and bring lasting change.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              to="/donate"
              className="rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3.5 text-sm font-black text-[#07162c] shadow hover:brightness-105 active:scale-95"
            >
              Donate Towards Programs
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white shadow hover:bg-white/20 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
