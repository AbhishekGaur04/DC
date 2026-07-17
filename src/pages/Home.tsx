// src/pages/Home.tsx
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { companyInfo, services } from "../constants/companyData";
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

/* ── Particle canvas ── */
function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 149, 42, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 149, 42, ${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ── Gradient shimmer text ── */
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

/* ── Service icons (SVG) ── */
const serviceIconMap: Record<string, React.ReactElement> = {
  "Civil Construction Work": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  ),
  "Thermal Insulation Work": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
  ),
  "Refractory Work": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
  ),
  "Industrial Painting": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
  ),
  "Thermal Power Plant Work": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  "Metro Project Work": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17l4 4 4-4m-4-5v9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" /></svg>
  ),
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const yearsCounter = useCounter(20, 2200);
  const projectsCounter = useCounter(150, 2200);
  const clientsCounter = useCounter(35, 2200);
  const workersCounter = useCounter(500, 2200);

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
        @keyframes grid-fade {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-primary-dark">
        {/* Particle field */}
        <HeroParticles />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(212,149,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,149,42,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "grid-fade 6s ease-in-out infinite",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "800px",
            height: "800px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(212,149,42,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/85 to-primary-dark/95" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-8">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">
                Since 2005 — Kota, Rajasthan
              </span>
            </div>
          </motion.div>

          {/* Company name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {companyInfo.name}
          </motion.h1>

          {/* Hero description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-white/50 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            Nearly two decades of proven mastery across Civil, Mechanical, and Structural works.
            Specializing in mission-critical infrastructure, from Thermal Power Plants and Metro
            Systems to extensive new 6-lane highway projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-4"
          >
            <GradientText className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide">
              Uncompromising Quality in Every Layer
            </GradientText>
          </motion.div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-8"
          />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <NavLink
              to="/services"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
            >
              Our Services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              Get In Touch
            </NavLink>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-2 mt-14"
          >
            <span className="text-white/25 text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-white/15 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-secondary/70 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Animated Stats Bar ── */}
      <section className="relative bg-primary py-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212,149,42,0.05) 50%, transparent)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { counter: yearsCounter, suffix: "+", label: "Years Experience", icon: "🏗️" },
            { counter: projectsCounter, suffix: "+", label: "Projects Delivered", icon: "🔧" },
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
              <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                {stat.counter.count}
                <span className="text-secondary">{stat.suffix}</span>
              </p>
              <p className="text-xs text-white/40 mt-1.5 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What We Do Preview ── */}
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
            <p className="text-secondary text-xs uppercase tracking-[5px] font-semibold mb-4">
              What We Do
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Expertise
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-secondary to-secondary-light rounded-full mx-auto mt-4 mb-6" />
            <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
              Comprehensive construction solutions spanning mechanical, civil, insulation, and
              structural disciplines across India's most critical infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.slice(0, 6).map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl border border-white/[0.06] p-6 overflow-hidden cursor-default transition-all duration-500 hover:border-secondary/30"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary/10 group-hover:border-secondary/20 transition-all duration-500"
                    style={{ animation: `float 4s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
                  >
                    {serviceIconMap[svc.title] || (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-secondary-light transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Expert {svc.title.toLowerCase()} services with precision and world-class quality standards.
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-secondary to-secondary-light group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <NavLink
              to="/services"
              className="group inline-flex items-center gap-2 text-sm text-secondary font-medium hover:text-secondary-light transition-colors duration-300"
            >
              View All Services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* ── Key Clients ── */}
      <section className="py-16 bg-primary-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212,149,42,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[5px] text-white/30 font-semibold mb-8"
          >
            Trusted By Industry Leaders
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {companyInfo.keyClients.map((client, i) => (
              <motion.span
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/50 text-sm font-semibold hover:bg-secondary/10 hover:border-secondary/25 hover:text-secondary transition-all duration-400 cursor-default"
              >
                {client}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-24 bg-gradient-to-b from-primary-dark to-[#060d18] overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-px h-full pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.1) 50%, transparent)" }}
        />
        <div
          className="absolute top-0 right-1/4 w-px h-full pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.05) 50%, transparent)" }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="inline-block mb-8"
              style={{
                background: "linear-gradient(135deg, rgba(212,149,42,0.1), rgba(212,149,42,0.02))",
                borderRadius: "16px",
                padding: "2px",
              }}
            >
              <div className="bg-primary-dark/80 backdrop-blur-xl rounded-[14px] px-6 py-3">
                <p className="text-secondary text-sm font-medium">
                  Ready to start your next project?
                </p>
              </div>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let's Build the{" "}
              <GradientText>Future</GradientText>
              {" "}Together
            </h2>

            <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
              Whether it's a thermal power plant, metro rail project, or industrial
              infrastructure — Diamond Construction delivers world-class quality in every layer.
            </p>

            <NavLink
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5"
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
