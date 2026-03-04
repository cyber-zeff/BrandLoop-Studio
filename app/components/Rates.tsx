"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Discipline = "web" | "graphic" | "video";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  tier: string;           // e.g. "Starter", "Studio", "Full Send"
  tagline: string;
  price: Record<"web" | "graphic" | "video", string>;
  note: Record<"web" | "graphic" | "video", string>;
  features: PlanFeature[];
  accent: string;
  hot?: boolean;          // "most popular" badge
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DISCIPLINES: { id: Discipline; label: string; emoji: string }[] = [
  { id: "web",     label: "Web / SaaS",       emoji: "⌗" },
  { id: "graphic", label: "Graphic Design",   emoji: "◈" },
  { id: "video",   label: "Video Editing",    emoji: "▶" },
];

const PLANS: Plan[] = [
  {
    id: "starter",
    tier: "Starter",
    tagline: "dip your toes in, low risk",
    price: { web: "— add yours —", graphic: "— add yours —", video: "— add yours —" },
    note:  { web: "one-time", graphic: "one-time", video: "per video" },
    accent: "rgba(255,255,255,0.12)",
    features: [
      { text: "1 deliverable",                    included: true  },
      { text: "2 revision rounds",                included: true  },
      { text: "7-day turnaround",                 included: true  },
      { text: "Source files included",            included: false },
      { text: "Priority support",                 included: false },
      { text: "Monthly retainer option",          included: false },
      { text: "Dedicated project manager",        included: false },
    ],
  },
  {
    id: "studio",
    tier: "Studio",
    tagline: "the sweet spot — most squads pick this",
    price: { web: "— add yours —", graphic: "— add yours —", video: "— add yours —" },
    note:  { web: "per project", graphic: "per project", video: "per package" },
    accent: "#4fffb0",
    hot: true,
    features: [
      { text: "Up to 3 deliverables",             included: true  },
      { text: "Unlimited revisions",              included: true  },
      { text: "5-day turnaround",                 included: true  },
      { text: "Source files included",            included: true  },
      { text: "Priority support",                 included: true  },
      { text: "Monthly retainer option",          included: false },
      { text: "Dedicated project manager",        included: false },
    ],
  },
  {
    id: "fullsend",
    tier: "Full Send",
    tagline: "we go all in — you just approve",
    price: { web: "— add yours —", graphic: "— add yours —", video: "— add yours —" },
    note:  { web: "monthly retainer", graphic: "monthly retainer", video: "monthly retainer" },
    accent: "#c9a96e",
    features: [
      { text: "Unlimited deliverables",           included: true  },
      { text: "Unlimited revisions",              included: true  },
      { text: "48-hour turnaround",               included: true  },
      { text: "Source files included",            included: true  },
      { text: "Priority support",                 included: true  },
      { text: "Monthly retainer option",          included: true  },
      { text: "Dedicated project manager",        included: true  },
    ],
  },
];

// ─── Feature Row ─────────────────────────────────────────────────────────────

function FeatureRow({ f }: { f: PlanFeature }) {
  return (
    <li className={`feat-row${f.included ? "" : " feat-row--off"}`}>
      <span className="feat-icon">{f.included ? "✓" : "—"}</span>
      <span className="feat-text">{f.text}</span>
    </li>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ plan, disc, index }: { plan: Plan; disc: Discipline; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`plan-card${plan.hot ? " plan-card--hot" : ""}${hovered ? " plan-card--hovered" : ""}`}
      style={{
        "--accent": plan.accent,
        "--delay": `${index * 0.1}s`,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* noise */}
      <div className="plan-noise" />

      {plan.hot && (
        <div className="plan-badge">
          <span className="plan-badge-dot" />
          most picked
        </div>
      )}

      {/* tier */}
      <div className="plan-header">
        <p className="plan-tier">{plan.tier}</p>
        <p className="plan-tagline">{plan.tagline}</p>
      </div>

      {/* price */}
      <div className="plan-price-block">
        <div className="plan-price">{plan.price[disc]}</div>
        <div className="plan-note">{plan.note[disc]}</div>
      </div>

      {/* divider */}
      <div className="plan-divider" />

      {/* features */}
      <ul className="plan-features">
        {plan.features.map((f, i) => <FeatureRow key={i} f={f} />)}
      </ul>

      {/* CTA */}
      <a href="#contact" className="plan-cta">
        <span>get started</span>
        <div className="plan-cta-fill" />
      </a>
    </div>
  );
}

// ─── BrandStack Data ─────────────────────────────────────────────────────────

const BS_WHAT_YOU_GET = [
  "Full brand identity — logo, marks, palette, type",
  "Social media kit — templates, covers, story frames",
  "Short-form video editing — reels, ads, promos",
  "SaaS / marketing website — design + dev, fully shipped",
  "Copywriting across all touchpoints",
  "Brand guidelines doc (the bible for your brand)",
];

interface BsPackage {
  id: string;
  name: string;
  badge: string;
  support: string;   // e.g. "7 days"
  reviews: string;   // revision rounds
  turnaround: string;
  price: string;
  perks: string[];
  accent: string;
  featured?: boolean;
}

const BS_PACKAGES: BsPackage[] = [
  {
    id: "launch",
    name: "Launch",
    badge: "get it done",
    support: "7 days",
    reviews: "2 rounds",
    turnaround: "3 weeks",
    price: "— add yours —",
    accent: "rgba(255,255,255,0.15)",
    perks: [
      "Everything in the stack",
      "2 revision rounds per deliverable",
      "7-day post-launch support",
      "Figma + source files",
      "WhatsApp / email support",
    ],
  },
  {
    id: "orbit",
    name: "Orbit",
    badge: "most booked",
    support: "30 days",
    reviews: "unlimited",
    turnaround: "2 weeks",
    price: "— add yours —",
    accent: "#4fffb0",
    featured: true,
    perks: [
      "Everything in the stack",
      "Unlimited revisions for 30 days",
      "30-day dedicated support window",
      "Priority Slack channel",
      "Figma + source files",
      "1 free social content drop / week",
    ],
  },
  {
    id: "signal",
    name: "Signal",
    badge: "full ownership",
    support: "90 days",
    reviews: "unlimited",
    turnaround: "10 days",
    price: "— add yours —",
    accent: "#c9a96e",
    perks: [
      "Everything in the stack",
      "Unlimited revisions for 90 days",
      "90-day ongoing support retainer",
      "Dedicated project manager",
      "48hr emergency turnaround",
      "Monthly strategy call",
      "4 social drops / week",
    ],
  },
];

// ─── BrandStack Component ─────────────────────────────────────────────────────

function BrandStackOffer() {
  const [active, setActive] = useState<string>("orbit");

  const selected = BS_PACKAGES.find((p) => p.id === active)!;

  return (
    <>
      <style>{`
        /* ── BrandStack wrapper ────────────────────── */
        .bs-wrap {
          margin-top: 80px;
          border: 1px solid rgba(255,255,255,0.07);
          padding: 56px 48px 48px;
          position: relative;
          background: #0c0c0c;
          overflow: hidden;
        }

        /* animated corner accent */
        .bs-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #4fffb0, #c9a96e);
          animation: draw-top 1s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
        }
        @keyframes draw-top { to { width: 100%; } }

        .bs-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header row ──────────────────────────── */
        .bs-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .bs-label {
          font-size: 8px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #4fffb0;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bs-label::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: #4fffb0;
        }

        .bs-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px, 7vw, 80px);
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 0.9;
        }

        .bs-title span {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }

        .bs-desc {
          font-size: 9px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 280px;
          flex-shrink: 0;
        }

        /* ── What's included grid ────────────────── */
        .bs-includes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255,255,255,0.06);
        }

        @media (max-width: 760px) {
          .bs-includes { grid-template-columns: 1fr; }
          .bs-wrap { padding: 40px 24px 36px; }
        }

        .bs-inc-item {
          background: #0c0c0c;
          padding: 18px 20px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .bs-inc-bullet {
          color: #4fffb0;
          font-size: 14px;
          line-height: 1.2;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .bs-inc-text {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
        }

        /* ── Sub-plan selector ───────────────────── */
        .bs-sub-label {
          font-size: 8px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .bs-tabs {
          display: flex;
          gap: 2px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
        }

        .bs-tab {
          flex: 1;
          min-width: 140px;
          padding: 14px 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background: none;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'Geist Mono', monospace;
        }

        .bs-tab:hover { border-color: rgba(255,255,255,0.2); }

        .bs-tab.active {
          border-color: var(--tab-accent);
          background: rgba(255,255,255,0.03);
        }

        .bs-tab-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 0.08em;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
          transition: color 0.2s;
        }
        .bs-tab.active .bs-tab-name { color: var(--tab-accent); }

        .bs-tab-meta {
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .bs-tab-badge {
          font-size: 7px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--tab-accent);
          border: 1px solid currentColor;
          padding: 2px 6px;
          margin-top: 8px;
          display: inline-block;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .bs-tab.active .bs-tab-badge { opacity: 1; }

        /* ── Detail panel ────────────────────────── */
        .bs-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          border: 1px solid rgba(255,255,255,0.07);
          position: relative;
          z-index: 1;
          animation: panel-in 0.3s ease;
        }

        @keyframes panel-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .bs-detail { grid-template-columns: 1fr; }
        }

        .bs-detail-left {
          padding: 32px 28px;
          background: #0e0e0e;
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .bs-detail-right {
          padding: 32px 28px;
          background: #0e0e0e;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
        }

        .bs-detail-perks {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bs-perk {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
        }

        .bs-perk-icon {
          color: var(--detail-accent);
          font-size: 9px;
          flex-shrink: 0;
          margin-top: 1px;
          font-family: 'Geist Mono', monospace;
        }

        .bs-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .bs-stat {
          background: #0e0e0e;
          padding: 16px 14px;
        }

        .bs-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 0.06em;
          color: var(--detail-accent);
          line-height: 1;
          margin-bottom: 4px;
        }

        .bs-stat-key {
          font-size: 7px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        .bs-price-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .bs-price-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          letter-spacing: 0.04em;
          color: var(--detail-accent);
          line-height: 1;
        }

        .bs-price-note {
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 6px;
        }

        .bs-cta {
          display: inline-block;
          padding: 12px 28px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: var(--detail-accent);
          text-decoration: none;
          border: none;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .bs-cta:hover { opacity: 0.85; }
      `}</style>

      <div className="bs-wrap">
        <div className="bs-noise" />

        {/* header */}
        <div className="bs-header">
          <div>
            <p className="bs-label">the master offer</p>
            <h3 className="bs-title">Brand<br /><span>Stack</span></h3>
          </div>
          <p className="bs-desc">
            the whole deal in one package —
            branding, social, video
            and a fully shipped saas or site.
            one team, one price, zero
            coordination headaches.
          </p>
        </div>

        {/* what's inside grid */}
        <div className="bs-includes">
          {BS_WHAT_YOU_GET.map((item, i) => (
            <div key={i} className="bs-inc-item">
              <span className="bs-inc-bullet">◆</span>
              <span className="bs-inc-text">{item}</span>
            </div>
          ))}
        </div>

        {/* sub-plan selector */}
        <p className="bs-sub-label">choose your support window</p>

        <div className="bs-tabs">
          {BS_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              className={`bs-tab${active === pkg.id ? " active" : ""}`}
              style={{ "--tab-accent": pkg.accent } as React.CSSProperties}
              onClick={() => setActive(pkg.id)}
            >
              <div className="bs-tab-name">{pkg.name}</div>
              <div className="bs-tab-meta">
                <span>{pkg.support} support</span>
                <span>·</span>
                <span>{pkg.reviews} revisions</span>
              </div>
              <div className="bs-tab-badge">{pkg.badge}</div>
            </button>
          ))}
        </div>

        {/* detail panel — key animates on tab switch */}
        <div
          key={selected.id}
          className="bs-detail"
          style={{ "--detail-accent": selected.accent } as React.CSSProperties}
        >
          {/* perks */}
          <div className="bs-detail-left">
            <ul className="bs-detail-perks">
              {selected.perks.map((p, i) => (
                <li key={i} className="bs-perk">
                  <span className="bs-perk-icon">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* stats + price + CTA */}
          <div className="bs-detail-right">
            <div>
              <div className="bs-stat-grid">
                {[
                  { val: selected.support,    key: "support" },
                  { val: selected.reviews,    key: "revisions" },
                  { val: selected.turnaround, key: "turnaround" },
                ].map((s, i) => (
                  <div key={i} className="bs-stat">
                    <div className="bs-stat-val">{s.val}</div>
                    <div className="bs-stat-key">{s.key}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bs-price-row">
              <div>
                <div className="bs-price-note">starting from</div>
                <div className="bs-price-num">{selected.price}</div>
              </div>
              <a href="#contact" className="bs-cta">
                book this →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function RatesSection() {
  const [disc, setDisc] = useState<Discipline>("web");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* ── Section shell ───────────────────────────── */
        #offers {
          background: #0a0a0a;
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
          background: rgba(255,255,255,0.04);
        }
        #offers::before { left: 40px; }
        #offers::after  { right: 40px; }

        /* faint diagonal rule */
        .rates-diag {
          position: absolute;
          top: -40px; right: -40px;
          width: 500px; height: 500px;
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Header ──────────────────────────────────── */
        .rates-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }

        .rates-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 10px;
        }

        .rates-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 100px);
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 0.9;
        }

        .rates-title em {
          font-style: normal;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }

        .rates-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 260px;
        }

        /* ── Discipline switcher ─────────────────────── */
        .disc-switcher {
          display: flex;
          gap: 2px;
          margin-bottom: 52px;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 3px;
          width: fit-content;
        }

        .disc-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
          position: relative;
        }

        .disc-btn-emoji {
          font-size: 12px;
          font-style: normal;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .disc-btn:hover { color: rgba(255,255,255,0.7); }

        .disc-btn.active {
          color: #0a0a0a;
          background: #fff;
        }
        .disc-btn.active .disc-btn-emoji { opacity: 1; }

        /* ── Grid ─────────────────────────────────────── */
        .rates-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .rates-grid { grid-template-columns: 1fr; max-width: 480px; }
          #offers { padding: 80px 24px 80px; }
        }

        /* ── Card ─────────────────────────────────────── */
        .plan-card {
          position: relative;
          padding: 32px 28px 28px;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          transition: border-color 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
          animation: card-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: var(--delay);
          background: #0d0d0d;
        }

        .plan-card--hovered {
          border-color: var(--accent);
          transform: translateY(-4px);
        }

        .plan-card--hot {
          border-color: rgba(79,255,176,0.25);
          background: #0a120e;
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* noise */
        .plan-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        /* hot badge */
        .plan-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #4fffb0;
          border: 1px solid rgba(79,255,176,0.3);
          padding: 3px 10px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .plan-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #4fffb0;
          box-shadow: 0 0 6px #4fffb0;
          animation: pulse 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { opacity:1; box-shadow: 0 0 6px #4fffb0; }
          50%      { opacity:.4; box-shadow: 0 0 2px #4fffb0; }
        }

        /* header */
        .plan-header {
          position: relative;
          z-index: 1;
          margin-bottom: 24px;
        }

        .plan-tier {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          letter-spacing: 0.08em;
          color: #fff;
          line-height: 1;
          margin-bottom: 6px;
        }

        .plan-tagline {
          font-size: 9px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          line-height: 1.6;
        }

        /* price */
        .plan-price-block {
          position: relative;
          z-index: 1;
          margin-bottom: 24px;
        }

        .plan-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          letter-spacing: 0.04em;
          color: var(--accent);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .plan-note {
          font-size: 8px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-top: 4px;
        }

        /* divider */
        .plan-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        /* features */
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feat-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feat-row--off .feat-icon,
        .feat-row--off .feat-text {
          opacity: 0.2;
        }

        .feat-icon {
          font-size: 9px;
          color: var(--accent);
          width: 14px;
          text-align: center;
          flex-shrink: 0;
          font-family: 'Geist Mono', monospace;
        }

        .feat-text {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }

        /* CTA */
        .plan-cta {
          position: relative;
          display: block;
          width: 100%;
          padding: 12px 20px;
          text-align: center;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.2);
          overflow: hidden;
          z-index: 1;
          transition: color 0.3s ease, border-color 0.3s ease;
        }

        .plan-cta span { position: relative; z-index: 1; }

        .plan-cta-fill {
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
          z-index: 0;
        }

        .plan-cta:hover { color: #0a0a0a; border-color: var(--accent); }
        .plan-cta:hover .plan-cta-fill { transform: translateX(0); }

        /* ── Custom note ─────────────────────────────── */
        .rates-custom {
          margin-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .rates-custom-text {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          line-height: 1.9;
          max-width: 420px;
        }

        .rates-custom-text strong {
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        .rates-custom-link {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.25);
          padding-bottom: 2px;
          transition: border-color 0.2s;
          white-space: nowrap;
        }
        .rates-custom-link:hover { border-color: #fff; }
      `}</style>

      <section id="offers">
        <div className="rates-diag" />

        {/* ── Header ────────────────────────────────── */}
        <div className="rates-header">
          <div>
            <p className="rates-eyebrow">pricing — no hidden fees ever</p>
            <h2 className="rates-title">
              pick your<br />
              <em>level</em>
            </h2>
          </div>
          <p className="rates-sub">
            flat rates, zero surprises.<br />
            switch disciplines below —<br />
            prices update live.
          </p>
        </div>

        {/* ── Discipline switcher ───────────────────── */}
        <div className="disc-switcher">
          {DISCIPLINES.map((d) => (
            <button
              key={d.id}
              className={`disc-btn${disc === d.id ? " active" : ""}`}
              onClick={() => setDisc(d.id)}
            >
              <span className="disc-btn-emoji">{d.emoji}</span>
              {d.label}
            </button>
          ))}
        </div>

        {/* ── Cards ─────────────────────────────────── */}
        <div className="rates-grid">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} disc={disc} index={i} />
          ))}
        </div>

        {/* ── Custom footer ─────────────────────────── */}
        <div className="rates-custom">
          <p className="rates-custom-text">
            got something bigger in mind? <strong>we do custom scopes</strong> —
            drop us a message and we'll figure out a number that works for both sides.
            no gatekeeping, just a real convo.
          </p>
          <a href="#contact" className="rates-custom-link">
            let's talk custom →
          </a>
        </div>

        {/* ══ BRANDSTACK — MASTER OFFER ═══════════════ */}
        <BrandStackOffer />
      </section>
    </>
  );
}