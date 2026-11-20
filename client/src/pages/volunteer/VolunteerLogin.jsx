import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn, ArrowRight, ArrowLeft, HeartHandshake, Mail, KeyRound, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from "lucide-react"
import { useApp } from "../../context/AppContext"
import Logo from "../../components/Common/Logo"
import API_BASE from "../../lib/api"

export default function VolunteerLogin() {
  const { volunteerLoginWithOtp } = useApp()
  const navigate = useNavigate()

  // State: step 1 = Enter Email, step 2 = Enter OTP
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState("")
  const [infoMsg, setInfoMsg] = useState("")

  // Step 1: Send OTP to registered volunteer email
  const handleSendLoginOtp = async (e) => {
    e.preventDefault()
    setError("")
    setInfoMsg("")
    if (!email) {
      setError("Please enter your registered volunteer email.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/volunteers/login-send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      })
      const data = await res.json()

      if (data.success) {
        setStep(2)
        setInfoMsg(data.message || "A 6-digit OTP has been sent to your email.")
      } else {
        setError(data.message || "Failed to send OTP.")
      }
    } catch {
      setError("Unable to reach the server. Please check your internet connection.")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP and Login
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError("")
    setInfoMsg("")
    if (!otp || otp.length < 6) {
      setError("Please enter the complete 6-digit OTP sent to your email.")
      return
    }

    setLoading(true)
    const result = await volunteerLoginWithOtp(email.trim(), otp.trim())
    if (result.success) {
      navigate("/volunteer-portal")
    } else {
      setError(result.error || "Invalid OTP. Please check and try again.")
    }
    setLoading(false)
  }

  // Resend OTP
  const handleResendOtp = async () => {
    setError("")
    setInfoMsg("")
    setResending(true)
    try {
      const res = await fetch(`${API_BASE}/api/volunteers/login-send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      })
      const data = await res.json()
      if (data.success) {
        setInfoMsg("A fresh OTP has been sent to your email.")
      } else {
        setError(data.message || "Failed to resend OTP.")
      }
    } catch {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setResending(false)
    }
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#133e87] px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full bg-[#173b6c]/40 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-[500px] rounded-full bg-[#e5a93c]/20 blur-[140px]" />
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #e5a93c 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-sm backdrop-blur-md transition hover:bg-white/20"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header Branding */}
        <div className="mb-6 text-center">
          <div className="relative mx-auto mb-4 inline-flex items-center justify-center">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#e5a93c]/30 to-[#f5b74c]/30 blur-lg" />
            <div className="relative flex size-24 items-center justify-center rounded-3xl border-2 border-[#e5a93c]/40 bg-white p-3 shadow-2xl">
              <Logo className="size-full object-contain" />
            </div>
          </div>

          <h1 className="font-heading text-2xl font-black text-white sm:text-3xl tracking-tight">
            Volunteer Portal
          </h1>
          <p className="mt-1 text-xs text-[#fcd34d] font-bold tracking-wide">
            Hanish Charity Foundation &bull; Secure OTP Login
          </p>
        </div>

        {/* Login Card */}
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Progress / Step indicator */}
          <div className="mb-6 flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div className="flex items-center gap-2">
              <span className={`grid size-6 place-items-center rounded-full text-xs font-black ${step === 1 ? "bg-[#0b2545] text-[#e5a93c]" : "bg-emerald-500 text-white"}`}>
                {step === 1 ? "1" : "✓"}
              </span>
              <span className="text-xs font-bold text-[#0b2545]">
                {step === 1 ? "Enter Registered Email" : "Email Verified"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`grid size-6 place-items-center rounded-full text-xs font-black ${step === 2 ? "bg-[#0b2545] text-[#e5a93c]" : "bg-slate-200 text-slate-500"}`}>
                2
              </span>
              <span className={`text-xs font-bold ${step === 2 ? "text-[#0b2545]" : "text-slate-400"}`}>
                Enter OTP
              </span>
            </div>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
              <span>{infoMsg}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 ? (
              // Step 1: Request OTP Form
              <motion.form
                key="step-email"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                onSubmit={handleSendLoginOtp}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                    Registered Volunteer Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white py-3 pl-10 pr-4 text-sm font-semibold text-[#0b2545] placeholder:text-[#94a3b8] focus:border-[#e5a93c] focus:outline-none focus:ring-2 focus:ring-[#e5a93c]/20 transition"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#5a6e85]">
                    We will send a 6-digit verification code to your email if your application is approved.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-6 py-3 text-sm font-black text-[#07162c] shadow-lg shadow-amber-950/20 transition hover:brightness-105 active:scale-98 disabled:opacity-60"
                >
                  <KeyRound className="size-4 stroke-[2.5]" />
                  <span>{loading ? "Sending OTP Code..." : "Send Login OTP"}</span>
                </button>
              </motion.form>
            ) : (
              // Step 2: Verify OTP Form
              <motion.form
                key="step-otp"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                onSubmit={handleVerifyOtp}
                className="space-y-4"
              >
                <div className="rounded-xl border border-border bg-[#fafbff] p-3 text-xs text-muted-foreground">
                  Sending verification code to: <strong className="text-[#0b2545]">{email}</strong>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setOtp(""); setError(""); setInfoMsg(""); }}
                    className="ml-2 text-xs font-bold text-[#c8891f] underline"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                    Enter 6-Digit Email OTP
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="123456"
                    className="w-full text-center tracking-[0.4em] font-mono rounded-xl border border-[#cbd5e1] bg-white py-3 px-4 text-xl font-black text-[#0b2545] placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-[#94a3b8] focus:border-[#e5a93c] focus:outline-none focus:ring-2 focus:ring-[#e5a93c]/20 transition"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#5a6e85]">Didn't receive the email code?</span>
                  <button
                    type="button"
                    disabled={resending}
                    onClick={handleResendOtp}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#c8891f] hover:underline disabled:opacity-50"
                  >
                    <RefreshCw className={`size-3 ${resending ? "animate-spin" : ""}`} />
                    <span>{resending ? "Resending..." : "Resend OTP"}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-6 py-3 text-sm font-black text-[#07162c] shadow-lg shadow-amber-950/20 transition hover:brightness-105 active:scale-98 disabled:opacity-60"
                >
                  <LogIn className="size-4 stroke-[2.5]" />
                  <span>{loading ? "Verifying OTP..." : "Verify & Access Portal"}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* New Volunteer Registration Box */}
          <div className="mt-6 pt-5 border-t border-[#f1f5f9]">
            <div className="rounded-2xl border border-[#e5a93c]/30 bg-[#fef7ea] p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black text-[#0b2545]">
                <HeartHandshake className="size-4 text-[#c8891f]" />
                <span>New Volunteer?</span>
              </div>
              <p className="mt-1 text-[11px] text-[#5a6e85]">
                Join Hanish Charity Foundation to participate in community drives &amp; earn your certified ID card.
              </p>
              <Link
                to="/volunteer/register"
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#0b2545] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#133e87] active:scale-95 shadow-sm"
              >
                <span>Register as a Volunteer</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-5 text-center text-xs text-white/70">
          Dedicated Sevak Access &bull; Hanish Charity Foundation
        </p>
      </motion.div>
    </main>
  )
}
