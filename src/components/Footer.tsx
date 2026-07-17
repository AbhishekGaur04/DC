// src/components/Footer.tsx
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { companyInfo, contactDetails } from "../constants/companyData";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  "Civil Construction",
  "Thermal Insulation",
  "Refractory Work",
  "Industrial Painting",
  "Structural Work",
  "Manpower Supply",
];

export default function Footer() {
  return (
    <footer className="relative bg-primary-dark text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(212,149,42,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-secondary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src="/diamond-icon.png"
                  alt="Diamond Construction"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Diamond Construction</h3>
                <p className="text-[10px] uppercase tracking-[2.5px] text-secondary/80">World-Class Quality</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              {companyInfo.tagline}. Delivering excellence in Mechanical, Civil, Insulation
              & Structural works with nearly two decades of proven expertise.
            </p>
            {/* GSTIN Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">GSTIN</span>
              <span className="text-xs font-bold text-secondary font-mono tracking-wide">08BOGPA8472K1ZM</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[3px] text-secondary mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary group-hover:scale-150 transition-all duration-300" />
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[3px] text-secondary mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((svc) => (
                <li key={svc}>
                  <span className="group flex items-center gap-2 text-sm text-white/50 hover:text-white/70 transition-colors duration-300 cursor-default">
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    {svc}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[3px] text-secondary mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/10 transition-colors duration-300">
                  <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="leading-relaxed group-hover:text-white/70 transition-colors">{contactDetails.address}</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/10 transition-colors duration-300">
                  <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="group-hover:text-white/70 transition-colors">{contactDetails.email}</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/10 transition-colors duration-300">
                  <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="group-hover:text-white/70 transition-colors">{contactDetails.phone}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/10" />
            <p className="text-[11px] text-white/20 tracking-widest uppercase">
              Crafted with Precision & Excellence
            </p>
            <div className="w-8 h-px bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
