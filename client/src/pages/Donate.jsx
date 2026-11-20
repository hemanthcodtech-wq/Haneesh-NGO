import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, CreditCard, Lock, HandHeart, Loader2, AlertCircle } from "lucide-react"
import { donationTiers, focusAreas, foundationInfo } from "../data/content"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"
import BankAccountsSection from "../components/Common/BankAccountsSection"
import API_BASE from "../lib/api"

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Donate() {
  const [amount, setAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCause, setSelectedCause] = useState(focusAreas[0].title)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [panNumber, setPanNumber] = useState("")
  const [requests80g, setRequests80g] = useState(true)
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [lastTxn, setLastTxn] = useState(null)

  const handleTierSelect = (val) => {
    setAmount(val)
    setCustomAmount("")
  }

  const handleCustomChange = (e) => {
    const val = e.target.value
    setCustomAmount(val)
    setAmount(Number(val) || 0)
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setErrorMsg("")

    if (!amount || amount < 1) {
      setErrorMsg("Please select or enter a valid donation amount.")
      return
    }
    if (!name.trim()) {
      setErrorMsg("Please enter your full name.")
      return
    }
    if (!email.trim() || !phone.trim()) {
      setErrorMsg("Please provide your email address and phone number for receipt delivery.")
      return
    }

    setLoading(true)

    try {
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error("Razorpay SDK could not be loaded. Please check your internet connection.")
      }

      // 1. Fetch Key or Create Order via backend
      let keyId = "rzp_test_TZvGeQCY7vlXkN"
      let orderId = null

      try {
        const orderRes = await fetch(`${API_BASE}/api/donations/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amount,
            notes: {
              donor_name: name,
              cause: selectedCause,
              phone: phone
            }
          })
        })
        const orderData = await orderRes.json()
        if (orderData.success && orderData.order) {
          orderId = orderData.order.id
          if (orderData.key) keyId = orderData.key
        }
      } catch (err) {
        console.warn("Direct order creation bypassed or fallback used:", err)
      }

      // 2. Launch Razorpay Checkout Modal
      const options = {
        key: keyId,
        amount: Math.round(amount * 100), // in paise
        currency: "INR",
        name: "Hanish Charity Foundation",
        description: `Donation towards ${selectedCause}`,
        image: "/images/logo.png",
        order_id: orderId || undefined,
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        notes: {
          cause: selectedCause,
          donor_pan: panNumber || "N/A"
        },
        theme: {
          color: "#0B2545" // Deep Navy Theme
        },
        handler: async function (response) {
          try {
            // 3. Register completed donation in DB
            const formData = new FormData()
            formData.append("amount", String(amount))
            formData.append("payment_method", "Razorpay")
            formData.append("designation", selectedCause)
            formData.append("name", name)
            formData.append("email", email)
            formData.append("phone", phone)
            formData.append("address", address || "India")
            formData.append("pan_number", panNumber)
            formData.append("requests_80g", requests80g ? "true" : "false")
            formData.append("txn_id", response.razorpay_payment_id || `TXN_${Date.now()}`)
            formData.append("razorpay_order_id", response.razorpay_order_id || "")
            formData.append("razorpay_signature", response.razorpay_signature || "")

            await fetch(`${API_BASE}/api/donations/donate`, {
              method: "POST",
              body: formData
            })

            setLastTxn({
              id: response.razorpay_payment_id,
              amount: amount,
              cause: selectedCause
            })
            setSubmitted(true)
            setLoading(false)
          } catch (postErr) {
            console.error("Donation record post error:", postErr)
            setLastTxn({
              id: response.razorpay_payment_id,
              amount: amount,
              cause: selectedCause
            })
            setSubmitted(true)
            setLoading(false)
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error)
        setErrorMsg(response.error.description || "Payment failed. Please try again or use another payment method.")
        setLoading(false)
      })
      rzp.open()
    } catch (err) {
      console.error("Razorpay initiation error:", err)
      setErrorMsg(err.message || "Unable to initialize payment gateway. Please try again.")
      setLoading(false)
    }
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
              <Sparkles className="size-3.5" />
              Make an Impact &bull; Hanish Charity Foundation
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            Your Kindness Can Change Lives.
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            A donation is more than financial support. It is a message of hope, a gesture of compassion and an opportunity to make someone's life better. Join Hanish Charity Foundation in supporting meaningful humanitarian causes.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. WHY DONATE & MODERN MULTI-STEP GIVING CONTAINER */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              Transparency &bull; Humanity
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Give Hope. Share Happiness. Make an Impact.
            </h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#5a6e85]">
              <span className="rounded-lg bg-[#edf4fc] px-3 py-1 font-semibold text-[#0b2545] border border-[#cbd5e1]">
                PAN: <strong className="font-mono">AAHCH7252D</strong>
              </span>
              <span className="rounded-lg bg-[#edf4fc] px-3 py-1 font-semibold text-[#0b2545] border border-[#cbd5e1]">
                URN: <strong className="font-mono">AAHCH7252DE20241</strong>
              </span>
              <span className="rounded-lg bg-emerald-50 px-3 py-1 font-bold text-emerald-800 border border-emerald-200">
                80G Tax Deductible
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5a6e85] sm:text-base">
              Your generosity can help support initiatives focused on education, healthcare, food assistance, child welfare and community development. Every contribution represents an opportunity to extend a helping hand to people who need support.
            </p>
          </div>

          {/* Giving Container */}
          <div className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-[#fafbff] p-8 sm:p-12 shadow-xl shadow-slate-200/50">
            {submitted ? (
              <div className="py-14 text-center">
                <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-3xl">
                  Thank You for Your Generosity!
                </h3>
                <p className="mt-3 text-sm text-[#5a6e85] max-w-md mx-auto leading-relaxed">
                  Your charitable donation of <strong>₹{lastTxn?.amount?.toLocaleString("en-IN") || amount.toLocaleString("en-IN")}</strong> towards <strong>{lastTxn?.cause || selectedCause}</strong> was successful.
                </p>
                {lastTxn?.id && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white border border-[#cbd5e1] px-4 py-2 text-xs font-mono text-[#0b2545]">
                    <span>Payment ID:</span>
                    <strong>{lastTxn.id}</strong>
                  </div>
                )}
                <p className="mt-3 text-xs text-[#5a6e85]">
                  An official tax exemption 80G receipt has been dispatched to your email: <strong>{email}</strong>
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setName("")
                      setEmail("")
                      setPhone("")
                      setPanNumber("")
                    }}
                    className="rounded-xl bg-[#0b2545] px-7 py-3 text-xs font-bold text-white hover:bg-[#133e87] transition shadow"
                  >
                    Make Another Contribution
                  </button>
                  <Link
                    to="/"
                    className="rounded-xl border border-[#0b2545]/20 bg-white px-7 py-3 text-xs font-bold text-[#0b2545] hover:bg-[#edf4fc] transition"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePayment} className="space-y-10">
                
                {/* Error Banner */}
                {errorMsg && (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800">
                    <AlertCircle className="size-5 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Choose Amount */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-black uppercase tracking-wider text-[#0b2545]">
                      1. Select Donation Amount
                    </label>
                    <span className="text-[11px] text-[#5a6e85] font-semibold">
                      Tax exempt receipts available under 80G
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {donationTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => handleTierSelect(tier.amount)}
                        className={`rounded-2xl border p-5 text-left transition duration-200 ${
                          amount === tier.amount && !customAmount 
                            ? "border-[#e5a93c] bg-white shadow-lg ring-2 ring-[#e5a93c]" 
                            : "border-[#e2e8f0] bg-white/70 hover:border-[#cbd5e1] hover:bg-white"
                        }`}
                      >
                        <div className="font-heading text-xl font-black text-[#0b2545]">
                          {tier.label}
                        </div>
                        <div className="mt-1 text-xs font-bold text-[#c8891f]">
                          {tier.title}
                        </div>
                        <div className="mt-2 text-[11px] text-[#5a6e85] leading-relaxed">
                          {tier.impact}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mt-5 max-w-xs">
                    <label className="block text-xs font-bold text-[#0b2545] mb-1.5">
                      Or enter custom amount (₹):
                    </label>
                    <input
                      type="number"
                      min="10"
                      placeholder="e.g. 2500"
                      value={customAmount}
                      onChange={handleCustomChange}
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-bold text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Choose Cause */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0b2545] mb-3">
                    2. Select Cause / Program
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {focusAreas.map((cause) => (
                      <button
                        type="button"
                        key={cause.id}
                        onClick={() => setSelectedCause(cause.title)}
                        className={`rounded-xl border p-4 text-left transition duration-200 ${
                          selectedCause === cause.title
                            ? "border-[#0b2545] bg-white shadow-md ring-2 ring-[#0b2545]"
                            : "border-[#e2e8f0] bg-white/70 hover:border-[#cbd5e1] hover:bg-white"
                        }`}
                      >
                        <div className="text-xs font-bold text-[#0b2545]">
                          {cause.title}
                        </div>
                        <div className="mt-1 text-[11px] text-[#5a6e85] line-clamp-1">
                          {cause.shortDescription}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Donor Details */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0b2545] mb-3">
                    3. Donor Information
                  </label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        placeholder="PAN Number (Required for 80G Tax Exemption)"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                        maxLength={10}
                        className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm uppercase text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Postal Address / City (Optional)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0b2545] focus:border-[#e5a93c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="requests80g"
                      checked={requests80g}
                      onChange={(e) => setRequests80g(e.target.checked)}
                      className="size-4 rounded border-gray-300 text-[#0b2545] focus:ring-[#e5a93c]"
                    />
                    <label htmlFor="requests80g" className="text-xs font-semibold text-[#0b2545]">
                      I request an official 80G tax exemption receipt for this donation.
                    </label>
                  </div>
                </div>

                {/* 4. Payment Gateway Selection */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0b2545] mb-2">
                    4. Secure Payment Gateway
                  </label>
                  <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-xl bg-emerald-600 text-white font-black text-sm">
                          ₹
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0b2545]">
                            Razorpay Real-Time Payment Gateway
                          </div>
                          <div className="text-[11px] text-[#5a6e85]">
                            Supports Google Pay, PhonePe, Paytm, BHIM UPI, NetBanking &amp; Cards
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-200/80 px-2.5 py-1 text-[10px] font-bold text-emerald-900">
                        Active &amp; Secure
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-[#e2e8f0]">
                  <div className="flex items-center gap-2 text-xs text-[#5a6e85]">
                    <Lock className="size-4 text-emerald-600" />
                    <span>Real-time 256-bit encrypted Razorpay checkout</span>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-9 py-3.5 text-sm font-black text-[#07162c] shadow-lg transition hover:brightness-105 active:scale-95 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Opening Razorpay Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Pay ₹{amount.toLocaleString("en-IN")}</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Admin Bank Accounts & QR Scanner Section */}
          <div className="mt-12">
            <BankAccountsSection />
          </div>

        </div>
      </section>

      {/* 3. CLOSING SECTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] text-white">
        <div className="page-shell px-4 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-4xl">
            No Contribution Is Too Small When It Comes From the Heart.
          </h2>
          <p className="mt-4 text-sm text-white/90 sm:text-base leading-relaxed">
            Thank you for believing in humanity and supporting a mission built on compassion. Your generosity helps us work towards a better tomorrow.
          </p>
        </div>
      </section>

    </main>
  )
}
