// src/pages/NotFound.tsx
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

/* ── Minimal particle canvas ── */
function Particles() {
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
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 149, 42, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />;
}

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-primary-dark">
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
      `}</style>

      <Particles />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,149,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,149,42,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(212,149,42,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 relative z-10"
      >
        {/* 404 number */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-[120px] sm:text-[160px] font-bold leading-none mb-2"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #d4952a 0%, #e8b04a 40%, #ffffff 50%, #e8b04a 60%, #d4952a 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-xl sm:text-2xl text-white/50 mb-3 font-medium"
        >
          Page Not Found
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-white/30 text-sm mb-10 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <NavLink
            to="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Return to Home
          </NavLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
