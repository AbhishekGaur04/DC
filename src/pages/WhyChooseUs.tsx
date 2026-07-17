// src/pages/WhyChooseUs.tsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

/* ── Animated counter ── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
}

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

const reasons = [
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    title: "Proven Track Record",
    desc: "Nearly two decades of successfully delivering complex industrial projects on time and within budget across 8+ Indian states.",
    color: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: "Skilled Workforce",
    desc: "500+ trained professionals equipped with modern tools and techniques, supervised by experienced project managers and engineers.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "Quality Assurance",
    desc: "Rigorous multi-point quality control at every stage ensures world-class standards in every deliverable. ISO 9001:2015 certified.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    title: "Safety First",
    desc: "Zero-compromise safety protocols protecting our team and your investment at all times. OHSAS 18001 compliant.",
    color: "from-rose-500/20 to-pink-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    title: "Trusted Partnerships",
    desc: "Preferred contractor for industry leaders like NTPC, Reliance, BHEL, L&T, and Aditya Birla Group.",
    color: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: "Timely Delivery",
    desc: "Our structured 10-step execution process guarantees milestones are met without compromising quality or safety.",
    color: "from-yellow-500/20 to-amber-500/20",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
  },
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemV = { hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

export default function WhyChooseUs() {
  const yearsCounter = useCounter(20, 2200);
  const projectsCounter = useCounter(150, 2200);
  const clientsCounter = useCounter(35, 2200);
  const workersCounter = useCounter(500, 2200);

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
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">Our Advantage</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Why Choose <GradientText>Us</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Decades of trust, precision, and world-class quality make Diamond Construction
            the partner of choice for India's leading infrastructure companies.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative bg-primary py-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(212,149,42,0.05) 50%, transparent)" }} />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { counter: yearsCounter, suffix: "+", label: "Years Experience", icon: "🏗️" },
            { counter: projectsCounter, suffix: "+", label: "Projects Completed", icon: "🔧" },
            { counter: clientsCounter, suffix: "+", label: "Happy Clients", icon: "🤝" },
            { counter: workersCounter, suffix: "+", label: "Workers Deployed", icon: "👷" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              ref={stat.counter.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm mb-1.5">{stat.icon}</p>
              <p className="text-3xl lg:text-5xl font-bold text-white tabular-nums">
                {stat.counter.count}<span className="text-secondary">{stat.suffix}</span>
              </p>
              <p className="text-xs text-white/40 mt-1.5 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Reasons Grid ── */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-primary-dark relative overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary text-xs uppercase tracking-[5px] font-semibold mb-4">What Sets Us Apart</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              The Diamond Difference
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-secondary to-secondary-light rounded-full mx-auto mt-5" />
          </motion.div>

          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                variants={itemV}
                className="group relative rounded-2xl border border-white/[0.06] p-7 overflow-hidden cursor-default transition-all duration-500 hover:border-opacity-50"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  animation: "glow-pulse 4s ease-in-out infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`} />

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
                    className={`w-14 h-14 rounded-xl ${r.iconBg} ${r.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                    style={{ animation: `float 4s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
                  >
                    {r.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {r.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                {/* Bottom accent */}
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
              Experience the Difference
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto">
              Partner with a team that treats every project as its own. Let's build something extraordinary together.
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
