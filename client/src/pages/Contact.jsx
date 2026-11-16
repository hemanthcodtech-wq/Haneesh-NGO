import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, MessageSquare, HeartHandshake } from "lucide-react"
import { foundationInfo } from "../data/content"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
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
      
      {/* 1. HERO SECTION - Cinematic Staggered Entrance */}
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
              Get In Touch
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            Let's Connect for a Better Tomorrow.
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            Have a question, want to support our mission or interested in becoming a volunteer? We would love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. CONTACT CHANNELS & INTERACTIVE FORM */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            
            {/* Left: Direct Foundation Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
                  Direct Channels
                </span>
                <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-3xl">
                  Reach Out to Us
                </h2>
                <p className="mt-2 text-sm text-[#5a6e85] leading-relaxed">
                  We welcome inquiries from donors, prospective volunteers, partner NGOs, and families seeking community guidance.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                
                {/* Phone Card */}
                <a
                  href={`tel:${foundationInfo.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-start gap-4 rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-5 transition duration-300 hover:shadow-md hover:border-[#e5a93c] group"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545] group-hover:bg-[#fef7ea] group-hover:text-[#c8891f] transition">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">Official Phone</div>
                    <div className="mt-1 text-sm font-extrabold text-[#0b2545] sm:text-base">{foundationInfo.phone}</div>
                    <div className="text-xs text-[#5a6e85]">Available for calls and WhatsApp</div>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${foundationInfo.email}`}
                  className="flex items-start gap-4 rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-5 transition duration-300 hover:shadow-md hover:border-[#e5a93c] group"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545] group-hover:bg-[#fef7ea] group-hover:text-[#c8891f] transition">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">Official Email</div>
                    <div className="mt-1 text-sm font-extrabold text-[#0b2545] break-all">{foundationInfo.email}</div>
                    <div className="text-xs text-[#5a6e85]">Prompt response within 24 hours</div>
                  </div>
                </a>

                {/* Address Card */}
                <div className="flex items-start gap-4 rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545]">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">Foundation Address</div>
                    <div className="mt-1 text-sm font-extrabold text-[#0b2545]">{foundationInfo.address}</div>
                    <div className="text-xs text-[#5a6e85]">Headquartered in India</div>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="flex items-start gap-4 rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf4fc] text-[#0b2545]">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">Working Hours</div>
                    <div className="mt-1 text-sm font-extrabold text-[#0b2545]">{foundationInfo.workingHours}</div>
                    <div className="text-xs text-[#5a6e85]">Assistance available on schedule</div>
                  </div>
                </div>

                {/* Legal & Tax Registration Card */}
                <div className="rounded-3xl border border-[#e5a93c]/30 bg-[#fef7ea]/50 p-5">
                  <div className="text-xs font-black uppercase tracking-wider text-[#0b2545]">Official Registration &amp; Tax Info</div>
                  <div className="mt-2.5 grid gap-2 text-xs text-[#0b2545] sm:grid-cols-2">
                    <div><span className="font-bold text-[#5a6e85]">PAN:</span> <span className="font-mono font-extrabold text-[#0b2545]">{foundationInfo.pan}</span></div>
                    <div><span className="font-bold text-[#5a6e85]">URN:</span> <span className="font-mono font-extrabold text-[#0b2545]">{foundationInfo.registrationNumber}</span></div>
                    <div><span className="font-bold text-[#5a6e85]">Nature:</span> <span className="font-bold text-emerald-700">{foundationInfo.natureOfActivities}</span></div>
                    <div><span className="font-bold text-[#5a6e85]">Exemption:</span> <span className="font-bold text-emerald-700">80G &amp; 12A Approved</span></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Message Form Card */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-7 sm:p-10 shadow-xl shadow-slate-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#fef7ea] text-[#c8891f]">
                    <MessageSquare className="size-5" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-[#0b2545] sm:text-2xl">
                    Send Us a Message
                  </h3>
                </div>
                
                <p className="text-xs text-[#5a6e85] mb-8">
                  Complete the form below and our team will get back to you promptly.
                </p>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h4 className="mt-5 font-heading text-2xl font-extrabold text-[#0b2545]">
                      Message Sent Successfully!
                    </h4>
                    <p className="mt-2 text-sm text-[#5a6e85] max-w-sm mx-auto">
                      Thank you for contacting Hanish Charity Foundation. We have received your query and will respond shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-xl bg-[#0b2545] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#133e87]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 99661 12658"
                          className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="General Inquiry / Donation / Volunteering"
                          className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                        Message *
                      </label>
                      <textarea
                        rows="4"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we assist you or how would you like to collaborate?"
                        className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3 text-sm font-black text-[#07162c] shadow-lg transition hover:brightness-105 active:scale-95"
                    >
                      <Send className="size-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. JOIN OUR MISSION BANNER */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] text-white">
        <div className="page-shell px-4 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-4xl">
            Your Voice Can Inspire Change.
          </h2>
          <p className="mt-4 text-sm text-white/90 sm:text-base leading-relaxed">
            Whether you want to volunteer, contribute, collaborate or learn more about our work, reach out to us. Together, we can make a difference.
          </p>
        </div>
      </section>

    </main>
  )
}
