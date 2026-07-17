// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/projects", label: "Projects" },
  { to: "/why-choose-us", label: "Why Us" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary-dark/98 backdrop-blur-xl shadow-2xl shadow-black/20"
          : "bg-primary-dark/80 backdrop-blur-md"
      }`}
    >
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent" />

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo + Brand */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-12 w-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-md"
          >
            <img
              src="/diamond-icon.png"
              alt="Diamond Construction"
              className="h-9 w-9 object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-wide text-white group-hover:text-secondary-light transition-colors duration-300">
              Diamond Construction
            </span>
            <span className="block text-[10px] uppercase tracking-[3px] text-secondary-light/80">
              World-Class Quality
            </span>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-secondary-light"
                    : "text-white/70 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Hover background */}
                  <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-white/10"
                      : "bg-transparent hover:bg-white/5"
                  }`} />
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 w-5 h-[2px] bg-secondary rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden p-2.5 rounded-xl hover:bg-white/10 transition-colors relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 relative flex flex-col justify-center items-center">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute w-5 h-[1.5px] bg-white rounded-full"
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              className="absolute w-5 h-[1.5px] bg-white rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="absolute w-5 h-[1.5px] bg-white rounded-full"
              transition={{ duration: 0.25 }}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile menu — fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-primary-dark/98 backdrop-blur-2xl border-l border-white/10 z-40 lg:hidden overflow-y-auto"
            >
              <div className="px-6 py-20 space-y-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-secondary/15 text-secondary-light border-l-2 border-secondary"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Bottom branding */}
                <div className="pt-8 mt-8 border-t border-white/10">
                  <p className="text-white/30 text-xs text-center tracking-widest uppercase">
                    Diamond Construction
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
