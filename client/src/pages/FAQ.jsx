import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Sparkles, HelpCircle, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { faqs } from "../data/content"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
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
              <HelpCircle className="size-3.5" />
              Frequently Asked Questions &bull; Hanish Charity Foundation
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            Questions &amp; Answers
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            Find answers to common questions about Hanish Charity Foundation, our causes, volunteering, and transparent donation processes.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. ACCORDION CONTAINER */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Knowledge Base
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={faq.q}
                  className={`overflow-hidden rounded-3xl border transition duration-300 ${
                    isOpen 
                      ? "border-[#e5a93c] bg-white shadow-lg ring-1 ring-[#e5a93c]/30" 
                      : "border-[#e2e8f0] bg-[#fafbff] hover:border-[#cbd5e1] hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between p-6 sm:p-7 text-left font-heading text-base font-bold text-[#0b2545] sm:text-lg"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className={`grid size-9 shrink-0 place-items-center rounded-xl transition-all ${
                      isOpen ? "bg-[#fef7ea] text-[#c8891f] rotate-180" : "bg-[#edf4fc] text-[#0b2545]"
                    }`}>
                      <ChevronDown className="size-4" />
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm leading-relaxed text-[#5a6e85] sm:text-base sm:leading-8 border-t border-[#f1f5f9]">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Still Have Questions Box */}
          <div className="mt-14 rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-8 sm:p-10 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545] mb-4">
              <MessageSquare className="size-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#0b2545]">
              Still have questions?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#5a6e85] max-w-md mx-auto leading-relaxed">
              We are here to assist you. Reach out to our team directly through our contact desk.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0b2545] px-6 py-3 text-xs font-bold text-white hover:bg-[#133e87] transition shadow"
              >
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
