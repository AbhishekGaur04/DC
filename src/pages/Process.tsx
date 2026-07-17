// src/pages/Process.tsx
import { motion } from "framer-motion";
import { processStages } from "../constants/companyData";
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

/* ── Step icons ── */
const stepIcons: React.ReactElement[] = [
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
];

const stepDescriptions = [
  "Building trust through transparent communication and aligning goals from day one.",
  "Understanding scope, budget, timelines, and technical requirements for optimal planning.",
  "Thorough on-site assessment of terrain, utilities, and environmental conditions.",
  "Strategic deployment of skilled workers, supervisors, and specialized equipment.",
  "Procurement and logistics management ensuring timely delivery of quality materials.",
  "Comprehensive safety protocols, PPE deployment, and hazard mitigation measures.",
  "Active project management with daily progress tracking and quality oversight.",
  "Multi-point quality checks and safety audits at every milestone.",
  "Rigorous testing of all systems and final inspection before handover.",
  "Complete project documentation and seamless handover to the client.",
];

export default function Process() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
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
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">How We Work</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our <GradientText>Execution Process</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A proven 10-step methodology that ensures every project is delivered
            with precision, safety, and world-class quality.
          </motion.p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-primary-dark relative overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 -right-32 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-secondary/30 via-secondary/15 to-transparent" />

            {processStages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Content card */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"} pl-14 md:pl-0`}>
                  <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-secondary/25 transition-all duration-500 hover:bg-white/[0.04]">
                    {/* Step number */}
                    <span className="inline-block text-secondary font-mono text-xs font-bold mb-2 px-2 py-0.5 bg-secondary/10 border border-secondary/15 rounded-md">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary-light transition-colors duration-300">
                      {stage}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {stepDescriptions[i]}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-light to-primary border-4 border-primary-dark flex items-center justify-center text-secondary shadow-lg shadow-secondary/10">
                    {stepIcons[i]}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
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
              Ready to Start a Project?
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto">
              Experience our structured execution process firsthand. Let's discuss your next project.
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
