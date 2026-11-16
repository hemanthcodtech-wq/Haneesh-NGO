import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SITE_URL = "https://www.hanishcharity.org"
const DEFAULT_TITLE = "Hanish Charity Foundation | Empowering Lives. Nurturing Hope. Serving Humanity."
const DEFAULT_DESC = "Hanish Charity Foundation is a community-driven initiative dedicated to protecting our humanitarian mission, supporting underprivileged underprivileged families, educating orphaned children, providing free meals and healthcare assistance."
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-community.png`

const ROUTE_SEO = {
  "/": {
    title: "Hanish Charity Foundation | A Strong Support System for Every Underprivileged Family",
    description: "United for Community Protection. Committed to Community Welfare. Join our ₹50 membership program, support underprivileged families, and protect our humanitarian mission.",
    keywords: "Hanish Charity Foundation, Community Welfare, ₹50 Membership, Empowering Underprivileged Families, Orphan Education, Annadanam, Free Meals, Local Community Support India",
  },
  "/about": {
    title: "About Us | Hanish Charity Foundation - Mission, Vision & Dharma Protection",
    description: "Learn about Hanish Charity Foundation's purpose, vision, transparent governance, lawful cultural protection, and grassroots community support network.",
    keywords: "About Hanish Charity Foundation, Community Care & Protection, Hindu NGO India, Hindu Charitable Trust, Cultural Preservation",
  },
  "/programs": {
    title: "Our Welfare Programs | Education, Healthcare & Food Support - Hanish Charity Foundation",
    description: "Explore our 4 major welfare initiatives: Child Education Assistance, Healthcare & Emergency Medical Aid, Food & Nutrition Drives, and Family Financial Support.",
    keywords: "Community Welfare Programs, Orphan Education Sponsorship, Free Medical Camp, Annadanam Food Drives, Underprivileged Family Financial Assistance",
  },
  "/campaigns": {
    title: "Active Campaigns & Seva Drives | Hanish Charity Foundation",
    description: "Participate in grassroots campaigns, child sponsorship drives, Annadanam, and cultural preservation initiatives across India.",
    keywords: "Hanish Charity Foundation Campaigns, Donate for Children, Seva Campaigns, Hindu Charity Drives",
  },
  "/donate": {
    title: "Donate & Membership Registration (₹50) | Hanish Charity Foundation",
    description: "Join Hanish Charity Foundation with an affordable ₹50 membership or donate to sponsor a child's education, healthcare, and family food kits.",
    keywords: "Donate Hanish Charity Foundation, ₹50 Foundation Membership, Sponsor a Child, Support Poor Underprivileged Family, Seva Contribution Online",
  },
  "/volunteer": {
    title: "Become a Volunteer Sevak | Join Hanish Charity Foundation Movement",
    description: "Dedicate your skills, time, and heart to community welfare, food distribution drives, education mentoring, and cultural awareness.",
    keywords: "Hanish Charity Foundation Volunteer, Sevak Registration, Volunteer in India, Community Seva, Volunteer with Hindu Trust",
  },
  "/teams": {
    title: "Our People & Leadership | Hanish Charity Foundation",
    description: "Meet the trustees, coordinators, active members, and volunteers driving Hanish Charity Foundation across India.",
    keywords: "Hanish Charity Foundation Team, Leadership, Trustees, Volunteers, Community Members",
  },
  "/events": {
    title: "Events & News | Hanish Charity Foundation",
    description: "Stay updated on upcoming community support gatherings, spiritual and cultural events, medical camps, and community relief activities.",
    keywords: "Hanish Charity Foundation Events, Community Programs, Community Welfare Gatherings, Welfare Camps",
  },
  "/support-us": {
    title: "Support Us | Ways to Contribute to Hanish Charity Foundation",
    description: "Discover ways you can stand with Hanish Charity Foundation: ₹50 membership, child sponsorships, volunteer seva, and institutional CSR partnerships.",
    keywords: "Support Hanish Charity Foundation, Ways to Help, CSR Partnership, our humanitarian mission Seva",
  },
  "/contact": {
    title: "Contact Us & Grievance Redressal | Hanish Charity Foundation",
    description: "Get in touch with Hanish Charity Foundation headquarters, partnership desk, volunteer helpdesk, or grievance redressal.",
    keywords: "Contact Hanish Charity Foundation, Office Address, Phone Number, WhatsApp Support, Grievance Contact",
  },
  "/about/terms": {
    title: "Terms & Conditions | Hanish Charity Foundation",
    description: "Terms and conditions, statutory framework, and operational policies governing Hanish Charity Foundation membership and contributions.",
  },
  "/about/privacy": {
    title: "Privacy Policy | Hanish Charity Foundation",
    description: "Privacy policy, data protection, and confidentiality commitments for members and donors of Hanish Charity Foundation.",
  },
  "/about/refund": {
    title: "Refund Policy | Hanish Charity Foundation",
    description: "Official donation, membership, and transaction cancellation and refund policies of Hanish Charity Foundation.",
  },
  "/about/disclaimer": {
    title: "Disclaimer & Statutory Notice | Hanish Charity Foundation",
    description: "Statutory disclaimers, legal representations, and operational notices of Hanish Charity Foundation.",
  },
}

function updateMeta(name, attrName, value) {
  let el = document.querySelector(`meta[${attrName}="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attrName, name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", value)
}

function updateLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export default function SEOUpdater() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Exact or matched path
    const meta = ROUTE_SEO[pathname] || {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESC,
      keywords: "Hanish Charity Foundation, Community Welfare, Empowering Underprivileged Families, Seva, India",
    }

    const pageUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`

    // 1. Title
    document.title = meta.title

    // 2. Standard Meta Tags
    updateMeta("description", "name", meta.description)
    if (meta.keywords) {
      updateMeta("keywords", "name", meta.keywords)
    }

    // 3. Canonical Link
    updateLink("canonical", pageUrl)

    // 4. Open Graph Tags
    updateMeta("og:title", "property", meta.title)
    updateMeta("og:description", "property", meta.description)
    updateMeta("og:url", "property", pageUrl)
    updateMeta("og:type", "property", "website")
    updateMeta("og:image", "property", DEFAULT_IMAGE)
    updateMeta("og:site_name", "property", "Hanish Charity Foundation")
    updateMeta("og:locale", "property", "en_IN")

    // 5. Twitter Card Tags
    updateMeta("twitter:card", "property", "summary_large_image")
    updateMeta("twitter:title", "property", meta.title)
    updateMeta("twitter:description", "property", meta.description)
    updateMeta("twitter:url", "property", pageUrl)
    updateMeta("twitter:image", "property", DEFAULT_IMAGE)
  }, [pathname])

  return null
}

