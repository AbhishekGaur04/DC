// src/pages/Contact.tsx
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { contactDetails, companyInfo } from "../constants/companyData";

/* ─── Animated counter hook ─── */
function useCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

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

/* ─── Floating particles canvas ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const PARTICLE_COUNT = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
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

        // connect nearby
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 149, 42, ${0.08 * (1 - dist / 120)})`;
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
      style={{ opacity: 0.7 }}
    />
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated gradient text ─── */
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

/* ─── Pulse ring animation for map marker ─── */
function PulseMarker() {
  return (
    <div className="relative">
      <div className="w-4 h-4 bg-secondary rounded-full relative z-10 shadow-lg shadow-secondary/50" />
      <div className="absolute inset-0 w-4 h-4 bg-secondary/40 rounded-full animate-ping" />
      <div
        className="absolute -inset-2 bg-secondary/20 rounded-full"
        style={{ animation: "pulse-ring 2s ease-out infinite" }}
      />
    </div>
  );
}

/* ─── Contact info data ─── */
const contactCards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Visit Us",
    value: contactDetails.address,
    sublabel: "Headquarters",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    value: contactDetails.email,
    sublabel: "We reply within 24 hours",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    value: contactDetails.phones.join("\n"),
    sublabel: "Mon – Sat, 9AM – 6PM",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    isMultiLine: true,
  },
];

/* ─── Stagger container variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ─── Page ─── */
export default function Contact() {
  const yearsCounter = useCounter(20, 2200);
  const projectsCounter = useCounter(150, 2200);
  const clientsCounter = useCounter(35, 2200);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    }
  }, []);

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes grid-fade {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(212,149,42,0.1), 0 0 60px rgba(212,149,42,0.05); }
          50% { box-shadow: 0 0 30px rgba(212,149,42,0.2), 0 0 80px rgba(212,149,42,0.1); }
        }
      `}</style>

      {/* ── Hero Section ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-primary-dark">
        {/* Particle field */}
        <ParticleField />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(212,149,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,149,42,0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "grid-fade 6s ease-in-out infinite",
          }}
        />

        {/* Radial gradient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "700px",
            height: "700px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(212,149,42,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-8">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary text-xs uppercase tracking-[4px] font-semibold">
                Let's Connect
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Build Something{" "}
            <GradientText>Extraordinary</GradientText>
            <br />
            <span className="text-white/80">With Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From thermal power plants to metro infrastructure — we bring nearly
            two decades of precision engineering and unwavering commitment to
            every project we touch.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2 mt-8"
          >
            <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-secondary/80 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Animated Stats Bar ── */}
      <section className="relative bg-primary py-10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212,149,42,0.05) 50%, transparent)",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8">
          {[
            { counter: yearsCounter, suffix: "+", label: "Years of Trust", icon: "🏗️" },
            { counter: projectsCounter, suffix: "+", label: "Projects Delivered", icon: "🔧" },
            { counter: clientsCounter, suffix: "+", label: "Valued Clients", icon: "🤝" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              ref={stat.counter.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <p className="text-sm mb-1">{stat.icon}</p>
              <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">
                {stat.counter.count}
                <span className="text-secondary">{stat.suffix}</span>
              </p>
              <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="py-24 bg-gradient-to-b from-[#0a1628] to-primary-dark relative overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary text-xs uppercase tracking-[5px] font-semibold mb-4">
              Reach Out
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-secondary to-secondary-light rounded-full mx-auto mt-6" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {contactCards.map((card, i) => (
              <motion.div key={i} variants={itemVariants}>
                <TiltCard className="h-full perspective-[1000px]">
                  <div
                    className={`relative h-full rounded-2xl border ${card.borderColor} p-8 backdrop-blur-xl overflow-hidden group cursor-default transition-all duration-500 hover:border-opacity-50`}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      animation: "glow-pulse 4s ease-in-out infinite",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`} />

                    {/* Shine sweep */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 60%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 3s ease-in-out infinite",
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                        style={{ animation: "float 4s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}
                      >
                        {card.icon}
                      </div>

                      {/* Label */}
                      <p className="text-white/40 text-xs uppercase tracking-[3px] font-medium mb-2">
                        {card.sublabel}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-3">{card.label}</h3>
                      {'isMultiLine' in card && card.isMultiLine ? (
                        <div className="space-y-1.5">
                          {card.value.split("\n").map((line, idx) => (
                            <button
                              key={idx}
                              onClick={() => copyToClipboard(line)}
                              className="flex items-center gap-2 text-white/70 text-sm leading-relaxed hover:text-white transition-colors cursor-pointer group/copy"
                            >
                              <span>{line}</span>
                              <span className={`text-[10px] transition-all duration-300 ${copiedText === line ? 'text-emerald-400 opacity-100' : 'opacity-0 group-hover/copy:opacity-50'}`}>
                                {copiedText === line ? '✓ Copied' : 'Copy'}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() => copyToClipboard(card.value)}
                          className="text-white/70 text-sm leading-relaxed break-all hover:text-white transition-colors cursor-pointer text-left flex items-center gap-2 group/copy"
                        >
                          <span>{card.value}</span>
                          <span className={`text-[10px] shrink-0 transition-all duration-300 ${copiedText === card.value ? 'text-emerald-400 opacity-100' : 'opacity-0 group-hover/copy:opacity-50'}`}>
                            {copiedText === card.value ? '✓ Copied' : 'Copy'}
                          </span>
                        </button>
                      )}

                      {/* Bottom accent line */}
                      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-500" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Map / Location Section ── */}
      <section className="py-24 bg-primary-dark relative overflow-hidden">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(212,149,42,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: location visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative rounded-2xl overflow-hidden border border-white/5"
                style={{
                  background: "linear-gradient(135deg, rgba(26,58,92,0.8), rgba(15,36,64,0.9))",
                  minHeight: "380px",
                }}
              >
                {/* Abstract map pattern */}
                <div className="absolute inset-0">
                  {/* Horizontal lines */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`h${i}`}
                      className="absolute w-full h-px bg-white/[0.04]"
                      style={{ top: `${(i + 1) * 11}%` }}
                    />
                  ))}
                  {/* Vertical lines */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`v${i}`}
                      className="absolute h-full w-px bg-white/[0.04]"
                      style={{ left: `${(i + 1) * 14}%` }}
                    />
                  ))}

                  {/* Abstract route lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 380">
                    <motion.path
                      d="M 80 300 Q 150 250 200 200 T 350 120 Q 400 100 450 80"
                      fill="none"
                      stroke="rgba(212,149,42,0.15)"
                      strokeWidth="2"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 50 200 Q 120 180 180 160 T 300 180 Q 380 190 460 150"
                      fill="none"
                      stroke="rgba(212,149,42,0.08)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 3, ease: "easeInOut", delay: 0.3 }}
                    />
                  </svg>

                  {/* Location markers (project sites) */}
                  <motion.div
                    className="absolute"
                    style={{ top: "30%", left: "65%" }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  >
                    <div className="relative group cursor-default">
                      <PulseMarker />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10">
                        <p className="text-white text-xs font-medium">📍 RSEB Area, Kota</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Secondary markers */}
                  {[
                    { top: "55%", left: "45%", label: "Patna Metro" },
                    { top: "42%", left: "78%", label: "NTPC Barh" },
                    { top: "70%", left: "30%", label: "Kodarma" },
                  ].map((marker, i) => (
                    <motion.div
                      key={i}
                      className="absolute group cursor-default"
                      style={{ top: marker.top, left: marker.left }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.3 + i * 0.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="w-2.5 h-2.5 bg-white/30 rounded-full border border-white/20" />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10">
                        <p className="text-white/80 text-[10px]">{marker.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Main label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <span className="text-secondary text-sm">📍</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Diamond Construction HQ</p>
                        <p className="text-white/40 text-xs">A-31, Jay Prakash Kumar, Landmark City Road, RSEB Area, Kota (Raj.) 324008</p>
                      </div>
                    </div>
                    <p className="text-white/30 text-xs">
                      Operating across India — Bihar, MP, Maharashtra, Odisha, Punjab & more
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: working hours & quick info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div>
                <p className="text-secondary text-xs uppercase tracking-[4px] font-semibold mb-3">
                  Our Presence
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Pan-India Operations
                </h2>
                <p className="text-white/50 leading-relaxed">
                  Headquartered in Kota, Rajasthan, our teams are actively deployed across
                  multiple states — delivering Thermal Power, Metro, Refinery, and Industrial
                  Infrastructure projects with precision and commitment.
                </p>
              </div>

              {/* Working hours card */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Working Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday – Saturday", time: "9:00 AM – 6:00 PM", active: true },
                    { day: "Sunday", time: "Closed", active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{item.day}</span>
                      <span className={`text-sm font-medium flex items-center gap-2 ${item.active ? "text-emerald-400" : "text-white/30"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-emerald-400" : "bg-white/20"}`} />
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key clients ticker */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Trusted Partners
                </h3>
                <div className="flex flex-wrap gap-2">
                  {companyInfo.keyClients.map((client, i) => (
                    <motion.span
                      key={client}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-medium hover:bg-secondary/10 hover:border-secondary/30 hover:text-secondary transition-all duration-300 cursor-default"
                    >
                      {client}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-24 bg-gradient-to-b from-primary-dark to-[#060d18] overflow-hidden">
        {/* Decorative beams */}
        <div
          className="absolute top-0 left-1/4 w-px h-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.1) 50%, transparent)",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-px h-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(212,149,42,0.05) 50%, transparent)",
          }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => copyToClipboard(contactDetails.email)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light transition-colors shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 cursor-pointer"
              >
                {copiedText === contactDetails.email ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Us an Email
                  </>
                )}
              </motion.button>
              {contactDetails.phone && (
                <motion.button
                  onClick={() => copyToClipboard(contactDetails.phone)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                >
                  {copiedText === contactDetails.phone ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Number Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Us Now
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-3"
          >
            <div className="w-12 h-px bg-white/10" />
            <span className="text-white/20 text-xs tracking-widest uppercase">
              {companyInfo.name}
            </span>
            <div className="w-12 h-px bg-white/10" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
