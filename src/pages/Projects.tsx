// src/pages/Projects.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { currentProjects, previousWorks, galleryImages } from "../constants/companyData";
import type { PreviousClientGroup } from "../constants/companyData";
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

const totalPrevious = previousWorks.reduce((n, g) => n + g.projects.length, 0);
const totalCurrent = currentProjects.reduce((n, g) => n + g.projects.length, 0);

export default function Projects() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const toggleClient = (client: string) =>
    setExpandedClient((c) => (c === client ? null : client));

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
      `}</style>

      {/* ═══════════ Hero ═══════════ */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-primary-dark">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/85 to-primary-dark" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,149,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,149,42,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute pointer-events-none" style={{ width: "600px", height: "600px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(212,149,42,0.07) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-8">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">Our Portfolio</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our <GradientText>Projects</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From thermal power plants to metro rail corridors — delivering
            world-class excellence across India's most critical infrastructure.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10"
          >
            {[
              { n: totalCurrent, label: "Active Projects" },
              { n: totalPrevious, label: "Completed Projects" },
              { n: previousWorks.length + currentProjects.length, label: "Clients Served" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-secondary">{s.n}+</p>
                <p className="text-xs text-white/35 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ Active Projects ═══════════ */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-primary-dark relative overflow-hidden" id="current-projects">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-400/20 bg-amber-500/5 mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[2.5px] text-amber-400">Active Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Currently Working On
            </h2>
            <p className="text-white/35 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Our teams are deployed across these ongoing projects, delivering excellence on schedule.
            </p>
          </motion.div>

          <div className="space-y-14">
            {currentProjects.map((cg, gIdx) => (
              <motion.div
                key={cg.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: gIdx * 0.1, duration: 0.5 }}
              >
                {/* Client label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cg.client}</h3>
                    <p className="text-xs text-white/35">
                      {cg.projects.length} active project{cg.projects.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
                </div>

                {/* Project cards */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {cg.projects.map((proj, pIdx) => (
                    <motion.article
                      key={proj.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pIdx * 0.08, duration: 0.4 }}
                      className="group rounded-2xl overflow-hidden border border-white/[0.06] hover:border-amber-400/25 transition-all duration-500"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />

                        {/* Status badge */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md bg-amber-500/20 text-amber-200 border border-amber-400/25 shadow-lg">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                            </span>
                            {proj.status}
                          </span>
                        </div>

                        {/* Category */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[1.5px] font-bold text-white/80 backdrop-blur-md bg-white/10 border border-white/15">
                            {proj.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-secondary-light transition-colors duration-300">
                          {proj.title}
                        </h4>
                        <p className="text-sm text-white/40 leading-relaxed mb-4">
                          {proj.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-white/35">
                          <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {proj.location}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Previous Works ═══════════ */}
      <section className="py-24 bg-primary-dark relative overflow-hidden" id="previous-works">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212,149,42,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-[2.5px] text-emerald-400">Completed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Previous Works
            </h2>
            <p className="text-white/35 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              A comprehensive portfolio of {totalPrevious}+ successfully delivered projects across {previousWorks.length} clients,
              spanning thermal power, industrial, and infrastructure sectors.
            </p>
          </motion.div>

          {/* Client Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {previousWorks.map((group: PreviousClientGroup, gIdx) => {
              const isOpen = expandedClient === group.client;

              return (
                <motion.div
                  key={group.client}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: gIdx * 0.04, duration: 0.4 }}
                  className={`rounded-2xl border overflow-hidden transition-all duration-400 ${
                    isOpen
                      ? "border-secondary/30 bg-white/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                  }`}
                >
                  {/* Client Header */}
                  <button
                    onClick={() => toggleClient(group.client)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left cursor-pointer group"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-secondary to-secondary-light text-white shadow-md shadow-secondary/20"
                          : "bg-white/5 text-secondary group-hover:bg-white/10"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-bold transition-colors duration-200 ${isOpen ? "text-secondary" : "text-white group-hover:text-white/90"}`}>
                        {group.client}
                      </h3>
                      <p className="text-xs text-white/35 mt-0.5">
                        {group.projects.length} project{group.projects.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-400/15">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Completed
                      </span>
                      <svg
                        className={`w-5 h-5 text-white/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded list */}
                  <div
                    className="overflow-hidden transition-all duration-400 ease-in-out"
                    style={{
                      maxHeight: isOpen ? `${group.projects.length * 56 + 24}px` : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-6 pb-5">
                      <div className="border-t border-white/[0.06] pt-3">
                        {group.projects.map((proj, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-3 py-2.5 group/item">
                            <span className="w-6 h-6 rounded-md bg-secondary/10 text-secondary text-[11px] font-bold flex items-center justify-center shrink-0">
                              {pIdx + 1}
                            </span>
                            <span className="text-sm text-white/60 font-medium flex-1 min-w-0 truncate group-hover/item:text-white transition-colors">
                              {proj.title}
                            </span>
                            {proj.year && (
                              <span className="text-[11px] text-white/30 font-mono bg-white/5 px-2 py-0.5 rounded shrink-0">
                                {proj.year}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setExpandedClient(expandedClient ? null : previousWorks[0]?.client ?? null)}
              className="text-sm text-secondary font-medium hover:text-secondary-light transition-colors flex items-center gap-1.5"
            >
              {expandedClient ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Collapse
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Click any client to view projects
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ Gallery ═══════════ */}
      <section className="py-24 bg-gradient-to-b from-primary-dark to-[#0a1628] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-secondary text-xs uppercase tracking-[5px] font-semibold mb-3">Visual Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Site Gallery
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-secondary to-secondary-light rounded-full mx-auto mt-5" />
          </motion.div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] border border-white/[0.06]"
                onClick={() => setLightboxImg(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end">
                  <div className="p-4 w-full">
                    <p className="text-white text-sm font-semibold">{img.label}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Lightbox ═══════════ */}
      {lightboxImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-24 bg-[#060d18] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.1) 50%, transparent)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Have a Project in Mind?
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto leading-relaxed">
              Let's discuss how Diamond Construction can deliver world-class
              quality for your next infrastructure project.
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
