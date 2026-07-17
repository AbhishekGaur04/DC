// src/pages/About.tsx
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { companyInfo, coreValues } from "../constants/companyData";
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

/* ── Core value icons ── */
const valueIcons: Record<string, React.ReactElement> = {
  "Quality First": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  "Safety Always": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  "Commitment to Deadlines": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  "Integrity": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
  "Innovation": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  "Client Satisfaction": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  "Technical Excellence": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  "Team Excellence": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
};

/* ── Milestones ── */
const milestones = [
  { year: "2005", title: "Founded", desc: "Diamond Construction established in Kota, Rajasthan." },
  { year: "2008", title: "First Major Project", desc: "Secured first thermal power plant contract with leading EPC firms." },
  { year: "2012", title: "Pan-India Expansion", desc: "Operations expanded across 8+ states including Bihar, MP, Maharashtra." },
  { year: "2017", title: "Metro Projects", desc: "Entered metro infrastructure with L&T partnerships." },
  { year: "2020", title: "500+ Workforce", desc: "Grew to deploy 500+ skilled workers across concurrent projects." },
  { year: "2024", title: "Highway & Bridge", desc: "Expanded into highway infrastructure and bridge construction." },
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemV = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function About() {
  const yearsCounter = useCounter(20, 2200);
  const projectsCounter = useCounter(150, 2200);
  const statesCounter = useCounter(8, 1800);

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
      `}</style>

      {/* ── Hero ── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-primary-dark">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/85 to-primary-dark" />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,149,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,149,42,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-8">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">Who We Are</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About <GradientText>Diamond Construction</GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Nearly two decades of building India's critical infrastructure with
            uncompromising quality, safety, and technical excellence.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative bg-primary py-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(212,149,42,0.05) 50%, transparent)" }} />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8">
          {[
            { counter: yearsCounter, suffix: "+", label: "Years of Trust", icon: "🏗️" },
            { counter: projectsCounter, suffix: "+", label: "Projects Delivered", icon: "🔧" },
            { counter: statesCounter, suffix: "+", label: "States Covered", icon: "📍" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              ref={stat.counter.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center"
            >
              <p className="text-sm mb-1">{stat.icon}</p>
              <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                {stat.counter.count}<span className="text-secondary">{stat.suffix}</span>
              </p>
              <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-primary-dark relative overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-secondary text-xs uppercase tracking-[4px] font-semibold mb-4">Our Journey</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Story
              </h2>
              <div className="w-12 h-[2px] bg-gradient-to-r from-secondary to-transparent mb-8" />

              <p className="text-white/50 leading-relaxed mb-6">
                Founded in 2005 in Kota, Rajasthan, Diamond Construction has grown from a regional
                construction firm into a trusted national partner for India's most demanding infrastructure
                projects. With nearly two decades of experience, we've built a legacy on the foundation
                of uncompromising quality, unwavering safety, and meticulous execution.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Headquarters", value: companyInfo.headquarters },
                  { label: "Core Specialty", value: companyInfo.coreSpecialty },
                  { label: "Secondary", value: companyInfo.secondarySpecialty },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-secondary/20 transition-colors duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                    <div>
                      <span className="text-xs text-secondary font-semibold uppercase tracking-wider">{item.label}</span>
                      <p className="text-sm text-white/60 mt-0.5 leading-relaxed">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Core Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-secondary text-xs uppercase tracking-[4px] font-semibold mb-4">What Drives Us</p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Core Values
              </h2>
              <div className="w-12 h-[2px] bg-gradient-to-r from-secondary to-transparent mb-8" />

              <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {coreValues.map((value, i) => (
                  <motion.div
                    key={i}
                    variants={itemV}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-secondary/25 hover:bg-white/[0.04] transition-all duration-400 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/15 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary/20 transition-colors duration-300">
                      {valueIcons[value] || <span className="text-secondary text-sm font-bold">✦</span>}
                    </div>
                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">{value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Milestones Timeline ── */}
      <section className="py-24 bg-primary-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212,149,42,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary text-xs uppercase tracking-[5px] font-semibold mb-4">Our Growth</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Key Milestones
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-secondary to-secondary-light rounded-full mx-auto mt-5" />
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/20 to-transparent hidden md:block" />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`relative flex items-center gap-6 mb-10 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                {/* Content card */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-secondary/20 transition-all duration-400">
                    <span className="text-secondary font-mono text-sm font-bold">{m.year}</span>
                    <h3 className="text-white font-bold text-base mt-1">{m.title}</h3>
                    <p className="text-white/40 text-sm mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-secondary border-4 border-primary-dark shadow-lg shadow-secondary/30 shrink-0 hidden md:block" />

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Clients ── */}
      <section className="py-16 bg-gradient-to-b from-primary-dark to-[#0a1628] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs uppercase tracking-[5px] text-white/30 font-semibold mb-4">Our Partners</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Key Clients
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {companyInfo.keyClients.map((client, i) => (
              <motion.span
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/50 text-sm font-semibold hover:bg-secondary/10 hover:border-secondary/25 hover:text-secondary transition-all duration-400 cursor-default"
              >
                {client}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-[#060d18] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.1) 50%, transparent)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Want to Work With Us?
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto">
              Join the roster of India's top industrial and infrastructure clients who trust Diamond Construction.
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
