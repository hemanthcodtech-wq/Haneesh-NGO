import { useState } from "react"
import { Building2, QrCode, Copy, Check, ShieldCheck, CreditCard, ChevronRight } from "lucide-react"
import { useApp } from "../../context/AppContext"

export default function BankAccountsSection({ className = "" }) {
  const { bankAccounts } = useApp()
  const [copiedKey, setCopiedKey] = useState(null)
  const [selectedAccIndex, setSelectedAccIndex] = useState(0)

  const activeAccounts = (bankAccounts || []).filter(a => a.is_active !== false)

  if (activeAccounts.length === 0) return null

  const handleCopy = (text, key) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const currentAcc = activeAccounts[selectedAccIndex] || activeAccounts[0]

  return (
    <div className={`rounded-3xl border border-[#e2e8f0] bg-white p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-200/50 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1f5f9] pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef7ea] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#c8891f]">
            <Building2 className="size-3.5" /> Direct Bank Transfer &amp; UPI
          </span>
          <h3 className="mt-2 font-heading text-xl font-black text-[#0b2545] sm:text-2xl">
            Official Foundation Bank Account &amp; QR
          </h3>
          <p className="mt-1 text-xs text-[#5a6e85]">
            Make direct contributions through NEFT, RTGS, IMPS, or scan using any UPI application.
          </p>
        </div>

        {/* Tab switcher if multiple accounts */}
        {activeAccounts.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {activeAccounts.map((acc, idx) => (
              <button
                key={acc.id || idx}
                onClick={() => setSelectedAccIndex(idx)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  selectedAccIndex === idx
                    ? "bg-[#0b2545] text-white shadow-sm"
                    : "border border-border bg-white text-primary hover:bg-[#edf4fc]"
                }`}
              >
                {acc.bank_name || `Account ${idx + 1}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Details & QR Scanner */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
        
        {/* Left Side: Bank Details Table */}
        <div className="lg:col-span-7 space-y-3.5">
          {[
            { label: "Account Name", value: currentAcc.account_name, key: "name" },
            { label: "Bank Name", value: currentAcc.bank_name, key: "bank" },
            { label: "Account Number", value: currentAcc.account_number, key: "acc_num", copyable: true },
            { label: "IFSC Code", value: currentAcc.ifsc_code, key: "ifsc", copyable: true },
            { label: "Branch", value: currentAcc.branch || currentAcc.branch_name, key: "branch" },
            { label: "UPI ID / VPA", value: currentAcc.upi_id, key: "upi", copyable: true }
          ].filter(item => Boolean(item.value)).map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-2xl border border-[#f1f5f9] bg-[#fafbff] px-4 py-3 sm:px-5 sm:py-3.5 transition hover:border-[#e5a93c]"
            >
              <div className="min-w-0 pr-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8a99ad]">
                  {item.label}
                </span>
                <span className="mt-0.5 block font-mono text-sm font-black text-[#0b2545] sm:text-base break-all">
                  {item.value}
                </span>
              </div>

              {item.copyable && (
                <button
                  type="button"
                  onClick={() => handleCopy(item.value, item.key)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-3 py-1.5 text-xs font-bold text-[#0b2545] transition hover:border-[#e5a93c] hover:bg-[#fef7ea] active:scale-95 shadow-2xs"
                >
                  {copiedKey === item.key ? (
                    <>
                      <Check className="size-3.5 text-emerald-600 stroke-[3]" />
                      <span className="text-emerald-700 font-extrabold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5 text-[#5a6e85]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2 pt-2 text-[11px] font-semibold text-[#5a6e85]">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>Official verified account of Hanish Charity Foundation. Eligible for tax benefits under Sec 80G.</span>
          </div>
        </div>

        {/* Right Side: QR Scanner Box */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative mx-auto flex w-full max-w-[280px] flex-col items-center rounded-3xl border-2 border-[#e5a93c]/50 bg-gradient-to-b from-[#fef7ea] to-white p-6 text-center shadow-xl">
            <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-[#0b2545] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#e5a93c]">
              <QrCode className="size-3.5" /> Scan to Donate
            </span>

            {/* QR Code Frame */}
            <div className="size-48 overflow-hidden rounded-2xl border-4 border-white bg-white p-2 shadow-md flex items-center justify-center">
              {currentAcc.qr_code_url ? (
                <img
                  src={currentAcc.qr_code_url}
                  alt="Official Donation QR Code"
                  className="size-full object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                  <QrCode className="size-16 text-slate-300 mb-2" />
                  <span className="text-[11px] font-bold">QR Available via UPI ID</span>
                </div>
              )}
            </div>

            <p className="mt-4 text-xs font-black text-[#0b2545]">
              {currentAcc.account_name}
            </p>
            <p className="mt-0.5 text-[10px] text-[#5a6e85]">
              Scan with GPay, PhonePe, Paytm, or any BHIM UPI app
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
