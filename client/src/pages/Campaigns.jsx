import API_BASE from "../lib/api"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Heart, Target, Sparkles, CheckCircle2, HandHeart, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { heroContainerVariants, heroChildVariants, heroBadgeVariants } from "../components/Common/HeroAnimations"

const DEFAULT_CAMPAIGNS = [
  {
    id: 1,
    name: "Children's Education & School Supplies Drive",
    text: "Providing school kits, books, and scholarship support to underprivileged children.",
    raised: 75,
    goal: "₹2,50,000",
    image: "/images/hero-community.png",
    category: "Education Support"
  },
  {
    id: 2,
    name: "Community Food Relief & Daily Nutrition Drive",
    text: "Distributing nutritious meals and essential ration kits to needy families and elders.",
    raised: 82,
    goal: "₹5,00,000",
    image: "/images/food-relief.jpg",
    category: "Food Relief"
  },
  {
    id: 3,
    name: "Medical Emergency & Health Check-up Camp",
    text: "Offering free health screenings, primary medicines, and vital diagnostic support.",
    raised: 60,
    goal: "₹3,00,000",
    image: "/images/news-blood.png",
    category: "Healthcare Assistance"
  },
  {
    id: 4,
    name: "Women Skill Development & Livelihood Program",
    text: "Vocational training and tailoring programs empowering women toward self-reliance.",
    raised: 68,
    goal: "₹2,00,000",
    image: "/images/gallery-2.png",
    category: "Women Empowerment"
  },
  {
    id: 5,
    name: "Child Welfare & Nutrition Support",
    text: "Ensuring orphaned and vulnerable children receive proper shelter, education and care.",
    raised: 90,
    goal: "₹4,00,000",
    image: "/images/hero-girl.png",
    category: "Child Welfare"
  },
  {
    id: 6,
    name: "Elderly & Vulnerable Citizen Assistance",
    text: "Extending warmth, essential healthcare supplies, and companionship to needy elders.",
    raised: 55,
    goal: "₹1,50,000",
    image: "/images/volunteers.png",
    category: "Community Care"
  }
];

function CampaignCard({ campaign }) {
  const progress = Math.min(Math.max(campaign.raised || 0, 5), 100);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#e5a93c]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f7fb]">
        <img
          src={campaign.image || "/images/hero-community.png"}
          alt={campaign.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "/images/hero-community.png"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07162c]/85 via-transparent to-black/10" />
        <span className="absolute bottom-3.5 left-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-black text-[#c8891f] shadow-md backdrop-blur-sm">
          {progress}% Funded
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#fef7ea] px-3 py-1 text-[11px] font-extrabold text-[#c8891f]">
            {campaign.category || "Active Campaign"}
          </span>
          <div className="grid size-9 place-items-center rounded-xl bg-[#edf4fc] text-[#0b2545]">
            <Heart className="size-4 fill-current text-[#e5a93c]" />
          </div>
        </div>

        <h3 className="mt-4 font-heading text-xl font-extrabold text-[#0b2545] leading-snug">
          {campaign.name}
        </h3>

        <p className="mt-2.5 text-xs text-[#5a6e85] leading-relaxed flex-1">
          {campaign.text}
        </p>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-[#0b2545]">Raised</span>
            <span className="text-[#c8891f] font-black">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#edf4fc]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0b2545] via-[#173b6c] to-[#e5a93c]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-right text-xs text-[#5a6e85]">
            Target Goal: <span className="font-extrabold text-[#0b2545]">{campaign.goal}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Link
            to={`/campaigns/${campaign.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2545] hover:text-[#c8891f] transition"
          >
            <span>View Details</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to={`/donate?campaign=${campaign.id}`}
            className="rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-4 py-2.5 text-xs font-black text-[#07162c] shadow hover:brightness-105 active:scale-95"
          >
            Support Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/campaigns`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.campaigns && data.campaigns.length > 0) {
          setCampaigns(data.campaigns);
        } else {
          setCampaigns(DEFAULT_CAMPAIGNS);
        }
      })
      .catch(() => setCampaigns(DEFAULT_CAMPAIGNS))
      .finally(() => setLoading(false));
  }, []);

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
              <Target className="size-3.5" />
              Active Campaigns &bull; Hanish Charity Foundation
            </span>
          </motion.div>
          <motion.h1 variants={heroChildVariants} className="mt-5 font-heading text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
            Together, We Can Make Change Happen.
          </motion.h1>
          <motion.p variants={heroChildVariants} className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base sm:leading-8 max-w-2xl mx-auto">
            Explore our community campaigns and see how every contribution helps move a goal closer to reality.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. CAMPAIGNS GRID */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="page-shell px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8891f]">
              On-Ground Drives
            </span>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0b2545] sm:text-4xl">
              Current Support Drives
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#5a6e85] sm:text-base">
              Direct assistance programs providing education kits, hot meals, health check-ups, and family aid.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. GLOBAL CALL TO ACTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#051020] via-[#0b2545] to-[#173b6c] text-white">
        <div className="page-shell px-4 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-extrabold text-white sm:text-4xl">
            Be the Reason Someone Smiles Today.
          </h2>
          <p className="mt-4 text-sm text-white/90 sm:text-base leading-relaxed">
            Your kindness can bring hope to someone who needs it. Join hands with Hanish Charity Foundation and become part of a movement that believes in humanity.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/donate"
              className="rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-8 py-3.5 text-sm font-black text-[#07162c] shadow hover:brightness-105 active:scale-95"
            >
              Donate Today
            </Link>
            <Link
              to="/volunteer"
              className="rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white shadow hover:bg-white/20 active:scale-95"
            >
              Join Our Mission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
