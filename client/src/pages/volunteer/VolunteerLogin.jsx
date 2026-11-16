import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, LogIn, UserPlus, ArrowRight, Heart, Shield, Users, ArrowLeft, HeartHandshake, Sparkles } from "lucide-react"
import { useApp } from "../../context/AppContext"
import Logo from "../../components/Common/Logo"

export default function VolunteerLogin() {
  const { volunteerLogin } = useApp()
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [showPw, setShowPw] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  const setLogin = (k) => (e) => setLoginForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoginError("")
    setLoginLoading(true)
    const result = await volunteerLogin(loginForm.email, loginForm.password)
    if (result.success) {
      navigate("/volunteer-portal")
    } else {
      setLoginError(result.error || "Unable to sign in. Please verify your email and password.")
    }
    setLoginLoading(false)
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
            Hanish Charity Foundation &bull; Sevak Network
          </p>
        </div>

        {/* Login Card */}
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                Registered Volunteer Email
              </label>
              <input
                required
                type="email"
                value={loginForm.email}
                onChange={setLogin("email")}
                placeholder="your.email@example.com"
                className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-semibold text-[#0b2545] placeholder:text-[#94a3b8] focus:border-[#e5a93c] focus:outline-none focus:ring-2 focus:ring-[#e5a93c]/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0b2545] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPw ? "text" : "password"}
                  value={loginForm.password}
                  onChange={setLogin("password")}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 pr-11 text-sm font-semibold text-[#0b2545] placeholder:text-[#94a3b8] focus:border-[#e5a93c] focus:outline-none focus:ring-2 focus:ring-[#e5a93c]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a6e85] hover:text-[#0b2545] transition"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-6 py-3 text-sm font-black text-[#07162c] shadow-lg shadow-amber-950/20 transition hover:brightness-105 active:scale-98 disabled:opacity-60"
            >
              <LogIn className="size-4 stroke-[2.5]" />
              <span>{loginLoading ? "Signing in..." : "Sign In to Portal"}</span>
            </button>
          </form>

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
                to="/volunteer"
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
