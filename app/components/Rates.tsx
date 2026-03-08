"use client";

import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Feature {
  text: string;
}

interface Offer {
  id: string;
  emoji: string;
  discipline: string;
  title: string;
  tagline: string;
  price: string;
  billing: string;
  features: Feature[];
  accent: string;
}

const OFFERS: Offer[] = [
  {
    id: "web",
    emoji: "⌗",
    discipline: "Web / SaaS",
    title: "Build",
    tagline: "your site or saas, designed and shipped end-to-end",
    price: "— add yours —",
    billing: "per project",
    accent: "#AA7DFC",
    features: [
      { text: "Next.js + Tailwind build" },
      { text: "Fully responsive design" },
      { text: "Source files + deployment" },
      { text: "Unlimited revisions until launch" },
      { text: "14-day post-launch support" },
    ],
  },
  {
    id: "graphic",
    emoji: "◈",
    discipline: "Graphic Design",
    title: "Visual",
    tagline: "brand identity and design assets that actually hit",
    price: "— add yours —",
    billing: "per project",
    accent: "#AA7DFC",
    features: [
      { text: "Logo + full identity system" },
      { text: "Colour, type & usage guide" },
      { text: "Social + print asset kit" },
      { text: "All source files (Figma / AI)" },
      { text: "3 revision rounds included" },
    ],
  },
  {
    id: "video",
    emoji: "▶",
    discipline: "Video Editing",
    title: "Reel",
    tagline: "cuts that stop the scroll and get people talking",
    price: "— add yours —",
    billing: "per video",
    accent: "#AA7DFC",
    features: [
      { text: "Full edit — cut, colour & sound" },
      { text: "Captions + motion text overlays" },
      { text: "Optimised for IG, TikTok & YT" },
      { text: "2 revision rounds" },
      { text: "Raw + final export files" },
    ],
  },
];

const BS_FEATURES = [
  "Full brand identity — logo, marks, palette",
  "Social media kit — templates + story frames",
  "Short-form video editing — reels, ads, promos",
  "SaaS / marketing website — designed + shipped",
  "Brand guidelines doc (the bible for your brand)",
  "Copywriting across all touchpoints",
];

const BS_PLANS = [
  {
    id: "launch",
    name: "Launch",
    support: "7 days",
    revisions: "2 rounds",
    turnaround: "3 weeks",
    price: "— add yours —",
  },
  {
    id: "orbit",
    name: "Orbit",
    support: "30 days",
    revisions: "unlimited",
    turnaround: "2 weeks",
    price: "— add yours —",
    hot: true,
  },
  {
    id: "signal",
    name: "Signal",
    support: "90 days",
    revisions: "unlimited",
    turnaround: "10 days",
    price: "— add yours —",
  },
];

// ─── Solo Offer Card ──────────────────────────────────────────────────────────

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`oc-card${hovered ? " oc-card--hovered" : ""}`}
      style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="oc-noise" />

      {/* top */}
      <div className="oc-top">
        <span className="oc-emoji">{offer.emoji}</span>
        <span className="oc-discipline">{offer.discipline}</span>
      </div>

      {/* title */}
      <div className="oc-mid">
        <h3 className="oc-title">{offer.title}</h3>
        <p className="oc-tagline">{offer.tagline}</p>
      </div>

      {/* features */}
      <ul className="oc-features">
        {offer.features.map((f, i) => (
          <li key={i} className="oc-feat">
            <span className="oc-feat-dot" />
            {f.text}
          </li>
        ))}
      </ul>

      {/* price + cta */}
      <div className="oc-bottom">
        <div className="oc-price-block">
          <span className="oc-price">{offer.price}</span>
          <span className="oc-billing">{offer.billing}</span>
        </div>
        <a href="#contact" className="oc-cta">
          <span>start →</span>
          <div className="oc-cta-fill" />
        </a>
      </div>

      {/* hover accent line */}
      <div className="oc-line" />
    </div>
  );
}

// ─── BrandStack ───────────────────────────────────────────────────────────────

function BrandStack() {
  const [active, setActive] = useState("orbit");
  const selected = BS_PLANS.find((p) => p.id === active)!;

  return (
    <div className="bs-wrap">
      <div className="bs-noise" />
      <div className="bs-top-line" />

      {/* header */}
      <div className="bs-header">
        <div>
          <p className="bs-eyebrow">grand offer</p>
          <h3 className="bs-title">Brand<span>Stack</span></h3>
          <p className="bs-sub">everything under one roof. one team. zero handoff drama.</p>
        </div>

        {/* what's included */}
        <div className="bs-includes">
          {BS_FEATURES.map((f, i) => (
            <div key={i} className="bs-inc">
              <span className="bs-inc-dot">◆</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* plan selector */}
      <div className="bs-plans-label">pick your support window</div>
      <div className="bs-plans">
        {BS_PLANS.map((p) => (
          <button
            key={p.id}
            className={`bs-plan-btn${active === p.id ? " bs-plan-btn--active" : ""}`}
            onClick={() => setActive(p.id)}
          >
            {p.hot && <span className="bs-hot-dot" />}
            <span className="bs-plan-name">{p.name}</span>
            <span className="bs-plan-meta">{p.support} support · {p.revisions}</span>
          </button>
        ))}
      </div>

      {/* detail row */}
      <div className="bs-detail" key={selected.id}>
        <div className="bs-stats">
          {[
            { val: selected.support,    label: "support"    },
            { val: selected.revisions,  label: "revisions"  },
            { val: selected.turnaround, label: "turnaround" },
          ].map((s, i) => (
            <div key={i} className="bs-stat">
              <span className="bs-stat-val">{s.val}</span>
              <span className="bs-stat-key">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bs-price-cta">
          <div>
            <p className="bs-price-note">starting from</p>
            <p className="bs-price">{selected.price}</p>
          </div>
          <a href="#contact" className="bs-cta">
            <span>book this →</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function RatesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        :root {
          --bg-primary:    #110C29;
          --bg-card:       #150F30;
          --text-primary:  #ffffff;
          --accent:        #AA7DFC;
          --accent-glow:   rgba(170,125,252,0.35);
          --accent-subtle: rgba(170,125,252,0.08);
          --accent-border: rgba(170,125,252,0.18);
          --accent-mid:    rgba(170,125,252,0.3);
        }

        /* ── Section ─────────────────────────────── */
        #offers {
          background: var(--bg-primary);
          padding: 120px 40px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
        }

        #offers::before, #offers::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(170,125,252,0.06);
        }
        #offers::before { left: 40px; }
        #offers::after  { right: 40px; }

        /* ambient glow */
        .rates-glow {
          position: absolute;
          bottom: -150px; left: -150px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(170,125,252,0.06) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ──────────────────────────────── */
        .rates-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 56px;
          position: relative;
          z-index: 1;
        }

        .rates-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.7;
          margin-bottom: 10px;
        }

        .rates-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 100px);
          letter-spacing: 0.04em;
          color: var(--text-primary);
          line-height: 0.9;
        }

        .rates-title em {
          font-style: normal;
          -webkit-text-stroke: 1px var(--accent);
          color: transparent;
        }

        .rates-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 220px;
        }

        /* ── 3-col grid for solo offers ──────────── */
        .rates-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          position: relative;
          z-index: 1;
          margin-bottom: 2px;
        }

        @media (max-width: 860px) { .rates-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) {
          #offers { padding: 80px 20px 80px; }
          .rates-title { font-size: 52px; }
        }

        /* ── Offer card ──────────────────────────── */
        .oc-card {
          position: relative;
          padding: 32px 28px 28px;
          background: var(--bg-card);
          border: 1px solid var(--accent-border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: border-color 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
          animation: card-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .oc-card:nth-child(1) { animation-delay: 0.05s; }
        .oc-card:nth-child(2) { animation-delay: 0.12s; }
        .oc-card:nth-child(3) { animation-delay: 0.19s; }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .oc-card--hovered {
          border-color: var(--accent);
          transform: translateY(-3px);
        }

        /* noise */
        .oc-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        /* top row */
        .oc-top {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .oc-emoji {
          font-size: 14px;
          color: var(--accent);
          opacity: 0.8;
          font-style: normal;
        }

        .oc-discipline {
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.65;
        }

        /* mid */
        .oc-mid { position: relative; z-index: 1; }

        .oc-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          letter-spacing: 0.06em;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 6px;
        }

        .oc-tagline {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          line-height: 1.7;
        }

        /* features */
        .oc-features {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .oc-feat {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          line-height: 1.4;
        }

        .oc-feat-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.5;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .oc-card--hovered .oc-feat-dot { opacity: 1; }

        /* bottom */
        .oc-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          position: relative;
          z-index: 1;
          padding-top: 16px;
          border-top: 1px solid var(--accent-border);
        }

        .oc-price-block { display: flex; flex-direction: column; gap: 3px; }

        .oc-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 0.04em;
          color: var(--accent);
          line-height: 1;
        }

        .oc-billing {
          font-size: 7px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        /* cta */
        .oc-cta {
          position: relative;
          padding: 9px 18px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--bg-primary);
          background: var(--accent);
          text-decoration: none;
          overflow: hidden;
          transition: color 0.3s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .oc-cta span { position: relative; z-index: 1; }

        .oc-cta-fill {
          position: absolute;
          inset: 0;
          background: var(--bg-primary);
          border: 1px solid var(--accent);
          transform: translateX(-101%);
          transition: transform 0.32s cubic-bezier(0.77,0,0.18,1);
        }
        .oc-cta:hover { color: var(--accent); }
        .oc-cta:hover .oc-cta-fill { transform: translateX(0); }

        /* hover accent line at bottom of card */
        .oc-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: 3;
        }
        .oc-card--hovered .oc-line { transform: scaleX(1); }

        /* ── BrandStack ───────────────────────────── */
        .bs-wrap {
          position: relative;
          background: #0d0920;
          border: 1px solid var(--accent-border);
          overflow: hidden;
          z-index: 1;
          animation: card-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.28s both;
        }

        /* gradient top line */
        .bs-top-line {
          position: absolute;
          top: 0; left: 0;
          height: 1px; width: 0;
          background: linear-gradient(90deg, var(--accent), rgba(170,125,252,0.2), transparent);
          animation: draw-line 1s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
          z-index: 2;
        }
        @keyframes draw-line { to { width: 100%; } }

        .bs-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.3;
          pointer-events: none;
        }

        /* bs header — 2 col */
        .bs-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 40px 40px 32px;
          position: relative;
          z-index: 1;
          border-bottom: 1px solid var(--accent-border);
          align-items: start;
        }

        @media (max-width: 760px) {
          .bs-header { grid-template-columns: 1fr; gap: 28px; padding: 32px 24px 28px; }
          .bs-detail  { flex-direction: column; padding: 24px; gap: 24px; }
          .bs-plans   { flex-direction: column; }
          .bs-plans-label, .bs-plans { padding-left: 24px; padding-right: 24px; }
        }

        .bs-eyebrow {
          font-size: 8px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.65;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bs-eyebrow::before {
          content: '';
          display: inline-block;
          width: 18px; height: 1px;
          background: var(--accent);
          opacity: 0.5;
        }

        .bs-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px, 6vw, 72px);
          letter-spacing: 0.06em;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 10px;
        }
        .bs-title span {
          -webkit-text-stroke: 1px var(--accent);
          color: transparent;
        }

        .bs-sub {
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          line-height: 1.8;
        }

        /* includes grid */
        .bs-includes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          align-content: start;
        }

        .bs-inc {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 9px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          line-height: 1.5;
        }

        .bs-inc-dot {
          color: var(--accent);
          font-size: 7px;
          flex-shrink: 0;
          margin-top: 2px;
          opacity: 0.7;
        }

        /* plan selector */
        .bs-plans-label {
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          padding: 20px 40px 10px;
          position: relative;
          z-index: 1;
        }

        .bs-plans {
          display: flex;
          gap: 2px;
          padding: 0 40px 24px;
          position: relative;
          z-index: 1;
        }

        .bs-plan-btn {
          flex: 1;
          padding: 14px 18px;
          background: none;
          border: 1px solid var(--accent-border);
          cursor: pointer;
          text-align: left;
          font-family: 'Geist Mono', monospace;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
        }
        .bs-plan-btn:hover { border-color: var(--accent-mid); }
        .bs-plan-btn--active {
          border-color: var(--accent);
          background: var(--accent-subtle);
        }

        .bs-hot-dot {
          position: absolute;
          top: 10px; right: 10px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; box-shadow: 0 0 6px var(--accent-glow); }
          50%      { opacity:.4; box-shadow: 0 0 2px var(--accent-glow); }
        }

        .bs-plan-name {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 4px;
          transition: color 0.2s;
        }
        .bs-plan-btn--active .bs-plan-name { color: var(--accent); }

        .bs-plan-meta {
          display: block;
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }

        /* detail panel */
        .bs-detail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 24px 40px;
          border-top: 1px solid var(--accent-border);
          position: relative;
          z-index: 1;
          animation: panel-in 0.3s ease;
        }
        @keyframes panel-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bs-stats {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }

        .bs-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .bs-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 0.06em;
          color: var(--accent);
          line-height: 1;
        }

        .bs-stat-key {
          font-size: 7px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        .bs-price-cta {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          flex-shrink: 0;
        }

        .bs-price-note {
          font-size: 7px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          margin-bottom: 3px;
        }

        .bs-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40px;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          line-height: 1;
        }

        .bs-cta {
          position: relative;
          padding: 12px 24px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--bg-primary);
          background: var(--accent);
          text-decoration: none;
          overflow: hidden;
          transition: color 0.3s;
          white-space: nowrap;
        }
        .bs-cta span { position: relative; z-index: 1; }
        .bs-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--bg-primary);
          border: 1px solid var(--accent);
          transform: translateX(-101%);
          transition: transform 0.32s cubic-bezier(0.77,0,0.18,1);
        }
        .bs-cta:hover { color: var(--accent); }
        .bs-cta:hover::before { transform: translateX(0); }

        /* ── Custom note ─────────────────────────── */
        .rates-custom {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 28px;
          border-top: 1px solid rgba(170,125,252,0.08);
          position: relative;
          z-index: 1;
        }

        .rates-custom-text {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          line-height: 1.9;
        }
        .rates-custom-text strong { color: rgba(255,255,255,0.5); font-weight: 500; }

        .rates-custom-link {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid var(--accent-border);
          padding-bottom: 2px;
          transition: border-color 0.2s, opacity 0.2s;
          white-space: nowrap;
        }
        .rates-custom-link:hover { border-color: var(--accent); opacity: 0.8; }
      `}</style>

      <section id="offers">
        <div className="rates-glow" />

        {/* ── Header ──────────────────────────────── */}
        <div className="rates-header">
          <div>
            <p className="rates-eyebrow">pricing — no hidden fees ever</p>
            <h2 className="rates-title">
              pick your<br /><em>level</em>
            </h2>
          </div>
          <p className="rates-sub">
            flat rates.<br />
            zero surprises.<br />
            four offers total.
          </p>
        </div>

        {/* ── 3 solo cards ────────────────────────── */}
        <div className="rates-grid">
          {OFFERS.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        {/* ── BrandStack grand offer ───────────────── */}
        <BrandStack />

        {/* ── Custom scope ────────────────────────── */}
        <div className="rates-custom">
          <p className="rates-custom-text">
            need something outside these boxes?{" "}
            <strong>we do custom scopes</strong> — just tell us what you're building.
          </p>
          <a href="#contact" className="rates-custom-link">let's talk custom →</a>
        </div>
      </section>
    </>
  );
}