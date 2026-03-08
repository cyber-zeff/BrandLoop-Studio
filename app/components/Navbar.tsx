"use client";

import { useEffect, useState, useRef } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Rates", href: "#offers" },
  { label: "Praise", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

function LiveClock() {
  const [time, setTime] = useState<string | null>(null);
  const [tz, setTz] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        })
      );
    };
    const offset = -new Date().getTimezoneOffset() / 60;
    setTz(`UTC${offset >= 0 ? "+" : ""}${offset}`);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="clock-wrap">
      <span className="clock-dot" />
      <span className="clock-label">YOUR TIME</span>
      <span className="clock-time">{time}</span>
      <span className="clock-tz">{tz}</span>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── Theme tokens ──────────────────────────── */
        :root {
          --bg-primary:    #110C29;
          --bg-black:      #000000;
          --text-primary:  #ffffff;
          --accent:        #AA7DFC;
          --accent-glow:   rgba(170,125,252,0.4);
          --accent-subtle: rgba(170,125,252,0.1);
          --accent-border: rgba(170,125,252,0.2);
          --accent-border-mid: rgba(170,125,252,0.35);
        }

        /* ─── Nav shell ─────────────────────────────── */
        .bl-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Geist Mono', monospace;
          border-bottom: 1px solid transparent;
          transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
        }

        .bl-nav.scrolled {
          background: rgba(17, 12, 41, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-color: var(--accent-border);
        }

        /* hairline that draws in — purple gradient */
        .bl-nav::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 1px; width: 0;
          background: linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%);
          animation: draw-line 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        @keyframes draw-line { to { width: 100%; } }

        /* ─── Logo ──────────────────────────────────── */
        .bl-logo {
          display: flex;
          flex-direction: column;
          gap: 1px;
          text-decoration: none;
          opacity: 0;
          animation: fade-drop 0.5s ease forwards 0.5s;
        }
        .bl-logo-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          line-height: 1;
        }
        .bl-logo-sub {
          font-size: 8px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          /* accent colour for the sub-label */
          color: var(--accent);
          opacity: 0.75;
        }

        /* ─── Nav links ─────────────────────────────── */
        .bl-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .bl-links li {
          opacity: 0;
          animation: fade-drop 0.4s ease forwards;
        }
        .bl-links li:nth-child(1) { animation-delay: 0.55s; }
        .bl-links li:nth-child(2) { animation-delay: 0.62s; }
        .bl-links li:nth-child(3) { animation-delay: 0.69s; }
        .bl-links li:nth-child(4) { animation-delay: 0.76s; }
        .bl-links li:nth-child(5) { animation-delay: 0.83s; }

        @keyframes fade-drop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bl-link {
          display: block;
          position: relative;
          padding: 6px 14px;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          border: 1px solid transparent;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }

        .bl-link:hover,
        .bl-link.active {
          color: var(--accent);
          border-color: var(--accent-border-mid);
          background: var(--accent-subtle);
        }

        /* accent underline draws left → right */
        .bl-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 14px; right: 14px;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .bl-link:hover::after,
        .bl-link.active::after { transform: scaleX(1); }

        /* ─── Right cluster ─────────────────────────── */
        .bl-right {
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0;
          animation: fade-drop 0.5s ease forwards 0.9s;
        }

        /* ─── Clock ─────────────────────────────────── */
        .clock-wrap {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border: 1px solid var(--accent-border);
          background: var(--accent-subtle);
        }

        .clock-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #90EE90;
          box-shadow: 0 0 8px var(--accent-glow);
          animation: pulse 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { opacity: 1;   box-shadow: 0 0 8px var(--accent-glow); }
          50%      { opacity: 0.4; box-shadow: 0 0 2px var(--accent-glow); }
        }

        .clock-label {
          font-size: 7px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .clock-time {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--text-primary);
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .clock-tz {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: var(--accent);
          opacity: 0.5;
        }

        /* ─── CTA ───────────────────────────────────── */
        .bl-cta {
          position: relative;
          padding: 8px 20px;
          font-family: 'Geist Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          /* filled with accent, text is dark purple */
          color: var(--bg-primary);
          background: var(--accent);
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        /* hover: inverse — dark bg, accent text + border */
        .bl-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--bg-primary);
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .bl-cta:hover::before { transform: translateX(0); }
        .bl-cta:hover          { color: var(--accent); }
        .bl-cta span           { position: relative; z-index: 1; }

        /* ─── Hamburger ─────────────────────────────── */
        .bl-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 32px; height: 32px;
          background: none;
          border: 1px solid var(--accent-border-mid);
          padding: 6px;
          cursor: pointer;
        }
        .bl-burger span {
          display: block;
          height: 1px;
          background: var(--accent);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .bl-burger span:nth-child(2) { width: 60%; }
        .bl-burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .bl-burger.open span:nth-child(2) { opacity: 0; }
        .bl-burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ─── Mobile drawer ─────────────────────────── */
        .bl-drawer {
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--accent-border);
          padding: 24px 40px 32px;
          display: none;
          flex-direction: column;
          gap: 4px;
          z-index: 999;
          transform: translateY(-10px);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .bl-drawer.open {
          display: flex;
          transform: translateY(0);
          opacity: 1;
        }
        .bl-drawer .bl-link {
          font-size: 11px;
          padding: 12px 0;
          border: none;
          border-bottom: 1px solid var(--accent-border);
          background: none !important;
        }
        .bl-drawer .bl-link::after { display: none; }
        .bl-drawer-clock { margin-top: 20px; padding-top: 20px; }

        /* ─── Responsive ────────────────────────────── */
        @media (max-width: 768px) {
          .bl-links  { display: none; }
          .bl-right  { display: none; }
          .bl-burger { display: flex; }
          .bl-nav    { padding: 0 24px; }
        }

        /* ─── Demo page ─────────────────────────────── */
        .demo-page {
          min-height: 100vh;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        /* ambient purple radial behind hero */
        .demo-page::after {
          content: '';
          position: fixed;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(170,125,252,0.09) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }

        /* grain */
        .demo-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          opacity: 0.2;
          z-index: 0;
        }

        .demo-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          position: relative;
          z-index: 1;
          text-align: center;
          gap: 16px;
          opacity: 0;
          transform: scale(0.9) translateY(10px);
          animation: heroPop 0.7s cubic-bezier(.17,.67,.3,1.33) forwards;
        }
        @keyframes heroPop {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .demo-hero-eyebrow {
          font-family: 'Geist Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.75;
        }

        .demo-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 14vw, 160px);
          letter-spacing: 0.06em;
          color: var(--text-primary);
          line-height: 0.9;
        }
        /* second word pops in accent */
        .demo-hero-title span {
          color: var(--accent);
        }

        .demo-hero-sub {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
        }

        /* vertical rail lines — purple tint */
        .v-rule {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(170,125,252,0.07);
        }
        .v-rule-l { left: 40px; }
        .v-rule-r { right: 40px; }
      `}</style>

      <div className="demo-page">
        <div className="v-rule v-rule-l" />
        <div className="v-rule v-rule-r" />

        {/* ── NAVBAR ──────────────────────────────────── */}
        <nav ref={navRef} className={`bl-nav${scrolled ? " scrolled" : ""}`}>

          <a href="#" className="bl-logo">
            <span className="bl-logo-name">BrandLoop</span>
            <span className="bl-logo-sub">Creative Studio</span>
          </a>

          <ul className="bl-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`bl-link${activeLink === link.href ? " active" : ""}`}
                  onClick={() => setActiveLink(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="bl-right">
            <LiveClock />
            <a href="#contact" className="bl-cta">
              <span>Let's Talk</span>
            </a>
          </div>

          <button
            className={`bl-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile drawer */}
        <div className={`bl-drawer${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="bl-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="bl-drawer-clock">
            <LiveClock />
          </div>
        </div>

        {/* Demo hero */}
        <div className="demo-hero">
          <p className="demo-hero-eyebrow">Creative Studio — Est. 2026</p>
          <h1 className="demo-hero-title">Brand<br /><span>Loop</span></h1>
          <p className="demo-hero-sub">We build brands that move</p>
        </div>
      </div>
    </>
  );
}