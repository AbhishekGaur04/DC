// src/pages/Certifications.tsx
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

/* ── Gradient text ── */
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

const GSTIN = "08BOGPA8472K1ZM";

const certifications = [
  {
    title: "ISO 9001:2015",
    category: "Quality Management",
    description: "Certified quality management system ensuring consistent delivery of world-class construction services across all project phases.",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/15",
  },
  {
    title: "ISO 14001:2015",
    category: "Environmental Management",
    description: "Committed to minimizing environmental impact through sustainable construction practices and responsible resource utilization.",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/15",
  },
  {
    title: "OHSAS 18001",
    category: "Health & Safety",
    description: "Rigorous occupational health and safety management ensuring the well-being of our workforce and all project stakeholders.",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    color: "from-rose-500/20 to-pink-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/15",
  },
  {
    title: "PF & ESI Registration",
    category: "Statutory Compliance",
    description: "Fully compliant with all statutory requirements for employee welfare, provident fund, and social security contributions.",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/15",
  },
  {
    title: "GST Registration",
    category: "Tax Compliance",
    description: "Registered and fully compliant with India's Goods and Services Tax framework for transparent business operations.",
    gstin: GSTIN,
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    color: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/15",
  },
  {
    title: "MSME Registered",
    category: "Enterprise Registration",
    description: "Recognized as a Micro, Small & Medium Enterprise by the Government of India, supporting national development initiatives.",
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    color: "from-sky-500/20 to-blue-500/20",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    borderColor: "border-sky-500/15",
  },
];

const licenses = [
  {
    title: "Labour License",
    detail: "Valid labour license under the Contract Labour Act for deployment of manpower across project sites nationwide.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  },
  {
    title: "Trade License",
    detail: "Active trade license issued by local municipal authority, permitting construction and allied business activities.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  },
  {
    title: "Shops & Establishment Act",
    detail: "Registered under the Shops & Establishment Act for lawful operation of office premises and administration.",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemV = { hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

export default function Certifications() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(212,149,42,0.05); }
          50% { box-shadow: 0 0 40px rgba(212,149,42,0.1); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/85 to-primary-dark" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,149,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,149,42,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute pointer-events-none" style={{ width: "600px", height: "600px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(212,149,42,0.07) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-8">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">Trust & Compliance</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Certifications & <GradientText>Licenses</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Fully certified and compliant — ensuring quality, safety, and
            transparency across every project we undertake.
          </motion.p>
        </div>
      </section>

      {/* ── GSTIN Banner ── */}
      <section className="relative bg-primary py-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(212,149,42,0.05) 50%, transparent)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-white/70 font-medium uppercase tracking-wider">GSTIN</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white tracking-[3px] font-mono">
              {GSTIN}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Certifications Grid ── */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-primary-dark relative overflow-hidden">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 -left-32 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary text-xs uppercase tracking-[5px] font-semibold mb-4">Accreditations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Our Certifications
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-secondary to-secondary-light rounded-full mx-auto mt-5" />
            <p className="text-white/35 mt-4 max-w-xl mx-auto text-sm">
              Industry-recognized certifications demonstrating our commitment to quality, safety, and compliance.
            </p>
          </motion.div>

          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemV}
                className={`group relative rounded-2xl border ${cert.borderColor} p-7 overflow-hidden cursor-default transition-all duration-500 hover:border-opacity-50 text-center`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  animation: "glow-pulse 4s ease-in-out infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`} />

                {/* Shine sweep */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 mx-auto rounded-xl ${cert.iconBg} ${cert.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}
                    style={{ animation: `float 4s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
                  >
                    {cert.icon}
                  </div>
                  <p className="text-xs uppercase tracking-[3px] text-secondary font-semibold mb-2">{cert.category}</p>
                  <h3 className="text-lg font-bold text-white mb-3">{cert.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-3">{cert.description}</p>
                  {'gstin' in cert && cert.gstin && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-[10px] uppercase tracking-wider text-white/35 font-semibold">GSTIN</span>
                      <span className="text-sm font-bold text-secondary font-mono tracking-wide">{cert.gstin}</span>
                    </div>
                  )}
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-secondary to-secondary-light group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Licenses ── */}
      <section className="py-24 bg-primary-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212,149,42,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-secondary text-xs uppercase tracking-[5px] font-semibold mb-4">Registrations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Licenses & Registrations
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-secondary to-secondary-light rounded-full mx-auto mt-5" />
          </motion.div>

          {/* GSTIN display */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/[0.08] rounded-full">
              <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">GSTIN:</span>
              <span className="text-sm font-bold text-secondary font-mono tracking-wider">{GSTIN}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {licenses.map((lic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-white/[0.06] p-7 hover:border-secondary/20 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary/20 transition-colors duration-300">
                    {lic.icon}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-secondary-light transition-colors duration-300">{lic.title}</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{lic.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-[#060d18] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.1) 50%, transparent)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Verified & Trusted
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto">
              Work with a fully certified and compliant construction partner. All documentation available on request.
            </p>
            <NavLink
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              Request Documents
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
          </motion.div>
        </div>
      </section>
    </>
  );
}
