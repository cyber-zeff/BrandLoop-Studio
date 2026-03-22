"use client";

import { useEffect, useState, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_COLS = [
  {
    heading: "explore",
    links: [
      { label: "Work",       href: "#projects"     },
      { label: "Services",   href: "#services"     },
      { label: "Rates",      href: "#offers"       },
      { label: "Praise",     href: "#testimonials" },
      { label: "FAQ",        href: "#faq"          },
    ],
  },
  {
    heading: "disciplines",
    links: [
      { label: "Web / SaaS Dev",     href: "#projects" },
      { label: "Graphic Design",     href: "#projects" },
      { label: "Video Editing",      href: "#projects" },
      { label: "BrandStack",         href: "#offers"   },
    ],
  },
  {
    heading: "connect",
    links: [
      { label: "Instagram",  href: "#" },
      { label: "Twitter / X",href: "#" },
      { label: "LinkedIn",   href: "#" },
      { label: "Behance",    href: "#" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
];

const MARQUEE_WORDS = [
  "ship it", "build different", "no templates", "full send",
  "we go first", "stay weird", "brand hard", "actually care",
  "ship it", "build different", "no templates", "full send",
  "we go first", "stay weird", "brand hard", "actually care",
];

// ─── Magnetic button ──────────────────────────────────────────────────────────

function MagneticCTA({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.28,
      y: (e.clientY - cy) * 0.28,
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      className="ft-cta-magnetic"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {children}
    </a>
  );
}

// ─── Live clock ───────────────────────────────────────────────────────────────

function FooterClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="ft-clock-val">{time}</span>;
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1400;
        const step = 16;
        const inc = target / (duration / step);
        const t = setInterval(() => {
          start += inc;
          if (start >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(start));
        }, step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  const [year] = useState(new Date().getFullYear());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* ── Footer shell ────────────────────────── */
        .ft-root {
          background: #0c0820;
          position: relative;
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
          border-top: 1px solid rgba(170,125,252,0.12);
        }

        /* noise */
        .ft-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        /* vertical rail lines */
        .ft-root::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: 40px;
          width: 1px;
          background: rgba(170,125,252,0.05);
        }

        /* ── BIG WORDMARK ─────────────────────────── */
        .ft-wordmark-wrap {
          position: relative;
          overflow: hidden;
          padding: 64px 40px 0;
          z-index: 1;
        }

        .ft-wordmark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 17vw, 220px);
          letter-spacing: 0.03em;
          line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 1px rgba(170,125,252,0.12);
          user-select: none;
          pointer-events: none;
          display: block;
          white-space: nowrap;
        }

        /* ── Marquee ─────────────────────────────── */
        .ft-marquee {
          position: relative;
          overflow: hidden;
          padding: 16px 0;
          border-top: 1px solid rgba(170,125,252,0.1);
          border-bottom: 1px solid rgba(170,125,252,0.1);
          z-index: 1;
        }

        .ft-marquee::before,
        .ft-marquee::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        .ft-marquee::before { left: 0;  background: linear-gradient(90deg, #0c0820, transparent); }
        .ft-marquee::after  { right: 0; background: linear-gradient(270deg, #0c0820, transparent); }

        .ft-marquee-track {
          display: flex;
          white-space: nowrap;
          animation: ft-scroll 28s linear infinite;
          will-change: transform;
        }
        @keyframes ft-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .ft-marquee-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(170,125,252,0.16);
          padding: 0 24px;
          display: inline-flex;
          align-items: center;
          gap: 24px;
        }

        .ft-marquee-sep {
          width: 4px; height: 4px;
          background: rgba(170,125,252,0.08);
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Main content ────────────────────────── */
        .ft-main {
          padding: 64px 40px 0;
          display: grid;
          grid-template-columns: 1.6fr repeat(3, 1fr);
          gap: 48px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 560px) {
          .ft-main { grid-template-columns: 1fr; gap: 40px; }
          .ft-wordmark-wrap { padding: 40px 24px 0; }
          .ft-main { padding: 48px 24px 0; }
          .ft-bottom { padding: 32px 24px; }
        }

        /* ── Brand col ───────────────────────────── */
        .ft-brand-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .ft-logo-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ft-logo-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 0.1em;
          color: #fff;
          line-height: 1;
        }

        .ft-logo-sub {
          font-size: 10px;
          letter-spacing: 0.35em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
        }

        .ft-tagline {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 220px;
        }

        /* CTA */
        .ft-cta-magnetic {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 22px;
          font-family: 'Geist Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #110C29;
          background: #AA7DFC;
          text-decoration: none;
          width: fit-content;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), color 0.3s;
          will-change: transform;
        }

        .ft-cta-magnetic::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #110C29;
          border: 1px solid #AA7DFC;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }
        .ft-cta-magnetic:hover::before { transform: translateX(0); }
        .ft-cta-magnetic:hover { color: #AA7DFC; }
        .ft-cta-magnetic span { position: relative; z-index: 1; }

        /* clock */
        .ft-clock {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
        }

        .ft-clock-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #AA7DFC;
          box-shadow: 0 0 6px #AA7DFC;
          animation: ft-pulse 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes ft-pulse {
          0%,100% { opacity:1; box-shadow: 0 0 6px #AA7DFC; }
          50%      { opacity:.4; box-shadow: 0 0 2px #AA7DFC; }
        }

        .ft-clock-label {
          font-size: 8px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }

        .ft-clock-val {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          font-variant-numeric: tabular-nums;
        }

        /* ── Nav col ─────────────────────────────── */
        .ft-nav-col { display: flex; flex-direction: column; gap: 20px; }

        .ft-nav-heading {
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(170,125,252,0.1);
        }

        .ft-nav-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
          padding: 0; margin: 0;
        }

        .ft-nav-link {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s, gap 0.2s;
          position: relative;
          width: fit-content;
        }

        .ft-nav-link::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 1px;
          background: #fff;
          transition: width 0.25s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }

        .ft-nav-link:hover {
          color: #fff;
          gap: 12px;
        }
        .ft-nav-link:hover::before { width: 14px; }

        /* ── Stats band ──────────────────────────── */
        .ft-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(170,125,252,0.04);
          border-top: 1px solid rgba(170,125,252,0.1);
          border-bottom: 1px solid rgba(170,125,252,0.1);
          margin: 48px 0 0;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 700px) {
          .ft-stats { grid-template-columns: repeat(2, 1fr); }
        }

        .ft-stat {
          background: #0c0820;
          padding: 24px 40px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ft-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40px;
          letter-spacing: 0.05em;
          color: #AA7DFC;
          line-height: 1;
        }

        .ft-stat-label {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }

        /* ── Bottom bar ──────────────────────────── */
        .ft-bottom {
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(170,125,252,0.1);
        }

        .ft-bottom-copy {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(170,125,252,0.2);
        }

        .ft-bottom-center {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ft-bottom-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(170,125,252,0.08);
          flex-shrink: 0;
        }

        .ft-scroll-top {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          background: none;
          border: 1px solid rgba(170,125,252,0.16);
          padding: 7px 14px;
          cursor: pointer;
          font-family: 'Geist Mono', monospace;
          transition: color 0.2s, border-color 0.2s;
        }
        .ft-scroll-top:hover {
          color: #fff;
          border-color: rgba(170,125,252,0.35);
        }

        .ft-scroll-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .ft-scroll-top:hover .ft-scroll-arrow { transform: translateY(-3px); }
      `}</style>

      <footer className="ft-root">

        {/* ── Giant outline wordmark ───────────────── */}
        <div className="ft-wordmark-wrap">
          <span className="ft-wordmark" aria-hidden>BRANDLOOP</span>
        </div>

        {/* ── Marquee ──────────────────────────────── */}
        <div className="ft-marquee">
          <div className="ft-marquee-track">
            {MARQUEE_WORDS.map((w, i) => (
              <span key={i} className="ft-marquee-item">
                {w}
                <span className="ft-marquee-sep" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Main grid ────────────────────────────── */}
        <div className="ft-main">

          {/* brand col */}
          <div className="ft-brand-col">
            <div className="ft-logo-block">
              <span className="ft-logo-name">BrandLoop</span>
              <span className="ft-logo-sub">Creative Studio · Est. 2026</span>
            </div>

            <p className="ft-tagline">
              we build brands that move —
              web, visuals &amp; video
              under one roof.
            </p>

            <MagneticCTA href="#contact">
              <span>start a project →</span>
            </MagneticCTA>

            <div className="ft-clock">
              <div className="ft-clock-dot" />
              <span className="ft-clock-label">your time</span>
              <FooterClock />
            </div>
          </div>

          {/* nav cols */}
          {NAV_COLS.map(col => (
            <div key={col.heading} className="ft-nav-col">
              <p className="ft-nav-heading">{col.heading}</p>
              <ul className="ft-nav-links">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="ft-nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Stats band ───────────────────────────── */}
        <div className="ft-stats">
          {[
            { target: 40,  suffix: "+", label: "projects shipped" },
            { target: 3,   suffix: "",  label: "disciplines"      },
            { target: 100, suffix: "%", label: "client retention" },
            { target: 24,  suffix: "h", label: "reply time"       },
          ].map((s, i) => (
            <div key={i} className="ft-stat">
              <div className="ft-stat-num">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="ft-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────── */}
        <div className="ft-bottom">
          <p className="ft-bottom-copy">© {year} BrandLoop Studio</p>
          <div className="ft-bottom-center">
            <span className="ft-bottom-copy">made with intention</span>
            <div className="ft-bottom-dot" />
            <span className="ft-bottom-copy">shipped with care</span>
          </div>
          <button
            className="ft-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="ft-scroll-arrow">↑</span>
            back to top
          </button>
        </div>

      </footer>
    </>
  );
}