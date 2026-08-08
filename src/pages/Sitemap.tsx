// src/pages/Sitemap.tsx
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { companyInfo, contactDetails, services } from "../constants/companyData";

/* ── Gradient text helper ── */
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: "linear-gradient(135deg, #d4952a 0%, #e8b04a 40%, #ffffff 50%, #e8b04a 60%, #d4952a 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 3s ease-in-out infinite",
      }}
    >
      {children}
    </span>
  );
}

const mainPages = [
  {
    to: "/",
    title: "Home",
    description: "Welcome to Diamond Construction (DC) — Industry leader in Mechanical, Civil, Insulation & Structural works.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: "/about",
    title: "About Us",
    description: "Nearly two decades of heritage, core values, leadership team, and infrastructure capabilities in Kota, Rajasthan.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: "/services",
    title: "Services",
    description: "Civil, Insulation, Refractory, Painting, Thermal Power, Refinery, Metro, and Skilled Manpower supply.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: "/projects",
    title: "Projects Showcase",
    description: "Completed and ongoing major industrial projects with clients like NTPC, Reliance, BHEL, L&T, and Aditya Birla.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    to: "/process",
    title: "Our Process",
    description: "Our 10-stage execution methodology ensuring zero compromise on safety, compliance, and quality.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    to: "/why-choose-us",
    title: "Why Choose Us",
    description: "Key competitive advantages, safety statistics, quality benchmarks, and industry reliability.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    to: "/certifications",
    title: "Certifications",
    description: "ISO compliance, safety standards, statutory registrations, and client appreciation certificates.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457-.39-2.823-1.07-4" />
      </svg>
    ),
  },
  {
    to: "/contact",
    title: "Contact Us",
    description: "Get in touch with our Kota headquarters for business inquiries, RFPs, and site support.",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const itemV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Sitemap() {
  return (
    <div className="bg-primary-dark text-white min-h-screen pb-20">
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
      `}</style>

      {/* Hero Header Banner */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212,149,42,0.5) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-secondary/90 font-semibold">
              SEO & Site Architecture
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Sitemap & <GradientText>Structure</GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Explore the complete directory of pages, specialized industrial services, and legal
            information for {companyInfo.name}.
          </motion.p>

          {/* Quick Actions / Download XML */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/10 border border-secondary/30 rounded-xl text-secondary font-medium text-sm hover:bg-secondary hover:text-white transition-all duration-300 shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Raw XML Sitemap (sitemap.xml)
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 font-medium text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              View robots.txt
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-6 pt-12 space-y-16">
        {/* Section 1: Main Pages */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Main Navigation Pages</h2>
              <p className="text-xs text-white/50">Primary pages accessible across the site</p>
            </div>
          </div>

          <motion.div
            variants={containerV}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {mainPages.map((page) => (
              <motion.div key={page.to} variants={itemV}>
                <NavLink
                  to={page.to}
                  className="group block h-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-secondary/50 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-secondary/10 transition-colors">
                      {page.icon}
                    </div>
                    <svg className="w-4 h-4 text-white/30 group-hover:text-secondary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-secondary transition-colors mb-1">
                    {page.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {page.description}
                  </p>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Section 2: Core Industrial Services */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Specialized Industrial Services</h2>
              <p className="text-xs text-white/50">Detailed scope of engineering and execution capabilities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((svc, idx) => (
              <NavLink
                key={idx}
                to="/services"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-secondary/40 hover:bg-white/[0.05] transition-all group"
              >
                <span className="w-2 h-2 rounded-full bg-secondary/60 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {svc.title}
                </span>
              </NavLink>
            ))}
          </div>
        </section>

        {/* Section 3: Company & Contact Summary */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Corporate Details */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Corporate Info & Governance
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Legal Name:</span>
                <strong className="text-white font-medium">{companyInfo.name}</strong>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>GSTIN Number:</span>
                <span className="font-mono text-secondary font-bold">08BOGPA8472K1ZM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Headquarters:</span>
                <span className="text-white">{companyInfo.headquarters}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Experience:</span>
                <span className="text-white">{companyInfo.experience}</span>
              </li>
            </ul>
          </div>

          {/* Key Clients & Reach */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Key Industrial Partners
            </h3>
            <p className="text-xs text-white/50 mb-4">
              Proven track record delivering mega projects for top Indian conglomerates:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {companyInfo.keyClients.map((client) => (
                <span
                  key={client}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-secondary"
                >
                  {client}
                </span>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span>Contact: {contactDetails.phone}</span>
              <span>{contactDetails.email}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
