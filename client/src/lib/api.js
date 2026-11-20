// Central API base URL — switch between local dev and production
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : "https://haneesh-ngo-ikwc.vercel.app")

export default API_BASE






