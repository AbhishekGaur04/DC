// src/pages/Services.tsx
import { motion } from "framer-motion";
import { services } from "../constants/companyData";
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

/* ── Service SVG icons ── */
const serviceIcons: React.ReactElement[] = [
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17l4 4 4-4m-4-5v9M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
];

const serviceDescriptions = [
  "Complete civil construction including foundations, structural concrete, building works, and allied civil activities for industrial and infrastructure projects.",
  "Comprehensive thermal insulation solutions for boilers, pipelines, tanks, and industrial equipment to optimize energy efficiency and safety.",
  "High-performance refractory lining and installation for furnaces, boilers, and high-temperature industrial applications.",
  "Protective industrial coating and painting services using advanced materials for corrosion prevention and aesthetic finishing.",
  "End-to-end mechanical and civil works for thermal power plant construction, including boiler erection, piping, and structural steel.",
  "Civil and structural construction for metro rail projects including viaducts, stations, tunnels, and allied infrastructure.",
  "Mechanical and civil construction works for refineries and petrochemical plants, including piping, structural, and maintenance services.",
  "Design and fabrication of structural steel frameworks, heavy steel erection, and precision structural welding for industrial complexes.",
  "Skilled manpower deployment for mechanical and civil operations, supervised by experienced project managers and engineers.",
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemV = { hidden: { opacity: 0, y: 30, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

export default function Services() {
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
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">What We Do</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our <GradientText>Services</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive construction and engineering solutions for India's most demanding
            industrial and infrastructure projects.
          </motion.p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-primary-dark relative overflow-hidden">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 -left-32 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((svc, i) => (
              <motion.div
                key={i}
                variants={itemV}
                className="group relative rounded-2xl border border-white/[0.06] p-7 overflow-hidden cursor-default transition-all duration-500 hover:border-secondary/25"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  animation: "glow-pulse 4s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

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
                    className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary/10 group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-500"
                    style={{ animation: `float 4s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
                  >
                    {serviceIcons[i] || serviceIcons[0]}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-secondary-light transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {serviceDescriptions[i] || `Expert ${svc.title.toLowerCase()} services with precision and world-class quality standards.`}
                  </p>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-secondary to-secondary-light group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-[#060d18] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.1) 50%, transparent)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Need Our Expertise?
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto">
              Let us put our decades of experience to work on your next construction or infrastructure project.
            </p>
            <NavLink
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              Get In Touch
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
