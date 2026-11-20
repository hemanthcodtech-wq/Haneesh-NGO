import { useState } from "react"
import { NavLink } from "react-router-dom"
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, Heart } from "lucide-react"
import { foundationInfo } from "../data/content"
import Logo from "./Common/Logo"

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Causes", to: "/causes" },
  { label: "Programs", to: "/programs" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Donate", to: "/donate" },
  { label: "Volunteer", to: "/volunteer" },
  { label: "Gallery", to: "/gallery" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact" }
]

const CAUSES_LINKS = [
  { label: "Education Support", to: "/programs#education-support" },
  { label: "Healthcare Assistance", to: "/programs#healthcare-assistance" },
  { label: "Food & Hunger Relief", to: "/programs#food-hunger-relief" },
  { label: "Women Empowerment", to: "/programs#women-empowerment" },
  { label: "Child Welfare", to: "/programs#child-welfare" },
  { label: "Community Development", to: "/programs#elderly-needy-support" }
]

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Refund & Cancellation Policy", to: "/refund" },
  { label: "Disclaimer", to: "/disclaimer" }
]

export default function Footer() {
  return (
    <footer id="footer" className="relative mt-0 overflow-hidden bg-[#07162c] text-white border-t border-white/10">
      
      {/* Main Multi-Column Body */}
      <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-2 shadow-sm">
                <Logo className="h-12 w-auto object-contain" />
              </div>
            </div>
            
            <h3 className="font-heading text-lg font-extrabold tracking-wide text-white">
              HANISH CHARITY FOUNDATION
            </h3>
            
            <p className="text-xs font-bold text-[#fcd34d]">
              Together, We Can Make a Difference.
            </p>
            
            <p className="text-xs leading-relaxed text-white/75 sm:text-sm">
              Building a compassionate society through humanity, kindness and meaningful support for those in need.
            </p>

            <div className="pt-2 text-xs font-semibold text-[#fcd34d]">
              Tagline: {foundationInfo.tagline}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#fcd34d]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/80 sm:text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <NavLink to={link.to} className="hover:text-[#fcd34d] transition">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Causes */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#fcd34d]">
              Our Causes
            </h4>
            <ul className="space-y-2 text-xs text-white/80 sm:text-sm">
              {CAUSES_LINKS.map((link) => (
                <li key={link.label}>
                  <NavLink to={link.to} className="hover:text-[#fcd34d] transition">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#fcd34d]">
              Contact Information
            </h4>
            <div className="space-y-2.5 text-xs text-white/80 sm:text-sm">
              <p className="flex items-start gap-2.5">
                <MapPin className="size-4 text-[#e5a93c] shrink-0 mt-0.5" />
                <span>Address: {foundationInfo.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="size-4 text-[#e5a93c] shrink-0" />
                <span>Phone: {foundationInfo.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="size-4 text-[#e5a93c] shrink-0" />
                <span>Email: {foundationInfo.email}</span>
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-[#fcd34d]/90 font-medium">
                <div><strong className="text-white">PAN:</strong> {foundationInfo.pan}</div>
                <div><strong className="text-white">URN:</strong> {foundationInfo.registrationNumber}</div>
              </div>
            </div>

            <div className="pt-3">
              <NavLink
                to="/donate"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d49528] via-[#e5a93c] to-[#f5b74c] px-4 py-2 text-xs font-extrabold text-[#07162c] shadow hover:brightness-105"
              >
                <Heart className="size-3.5 fill-current" />
                <span>Donate to Foundation</span>
              </NavLink>
            </div>
          </div>

        </div>
      </div>

      {/* Legal & Copyright Sub-Bar */}
      <div className="border-t border-white/10 bg-[#051020] py-6 text-xs text-white/70">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Hanish Charity Foundation. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4 text-xs">
            {LEGAL_LINKS.map((item) => (
              <NavLink key={item.label} to={item.to} className="hover:text-white transition">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
