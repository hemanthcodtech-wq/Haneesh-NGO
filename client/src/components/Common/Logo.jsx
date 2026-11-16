// Hanish Charity Foundation logo component
export default function Logo({ className = "", variant = "color" }) {
  return (
    <img
      className={`object-contain transition-transform duration-300 ${className}`}
      src="/images/logo.png"
      alt="Hanish Charity Foundation logo"
      loading="eager"
      decoding="async"
    />
  )
}
