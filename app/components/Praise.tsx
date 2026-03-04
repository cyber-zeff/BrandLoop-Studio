"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  handle: string;
  role: string;
  service: "web" | "graphic" | "video" | "brandstack";
  serviceLabel: string;
  accent: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "bro they just UNDERSTOOD the assignment. sent a vibe board on monday, had a full brand kit by friday. no cap the logo alone made our whole team stop and go 'wait that's actually fire'",
    name: "Zara Ahmed",
    handle: "@zaraahmedd",
    role: "Founder, Void Apparel",
    service: "graphic",
    serviceLabel: "Brand Identity",
    accent: "#ffffff",
    initials: "ZA",
  },
  {
    id: 2,
    quote: "we were lowkey skeptical because we'd been burned before by agencies that over-promise. brandloop actually delivered ahead of schedule?? our saas conversion went up 34% after the new landing page. still shook.",
    name: "Karan Mehta",
    handle: "@karanbuilds",
    role: "CEO, Clerq",
    service: "web",
    serviceLabel: "SaaS Website",
    accent: "#4fffb0",
    initials: "KM",
  },
  {
    id: 3,
    quote: "the reels they made for us hit different. like genuinely different from every other agency edit we've seen — the pacing, the cuts, the music sync. our instagram engagement literally tripled in the first month.",
    name: "Nadia Yusuf",
    handle: "@nadiayusuf_",
    role: "Head of Marketing, ByteSnack",
    service: "video",
    serviceLabel: "Social Reels",
    accent: "#e040fb",
    initials: "NY",
  },
  {
    id: 4,
    quote: "went with the full brandstack deal and honestly it was the best decision for our launch. one team handled everything — no briefing 4 different people, no miscommunication. the brand feels so cohesive it's scary.",
    name: "Omar Siddiqui",
    handle: "@omarsidq",
    role: "Co-founder, Flo Dashboard",
    service: "brandstack",
    serviceLabel: "BrandStack",
    accent: "#c9a96e",
    initials: "OS",
  },
  {
    id: 5,
    quote: "they redesigned our entire packaging and the response at launch was insane. customers were literally posting unboxings without us even asking. the design did the marketing for us.",
    name: "Lena Strauss",
    handle: "@lenastrauss",
    role: "Product Lead, Pulse Energy",
    service: "graphic",
    serviceLabel: "Packaging",
    accent: "#ffffff",
    initials: "LS",
  },
  {
    id: 6,
    quote: "i was ready to just use a template for our site but my co-founder convinced me to try brandloop. genuinely cannot imagine where we'd be with a generic site. the attention to detail is on another level.",
    name: "Tariq Noor",
    handle: "@tariqnoor_dev",
    role: "CTO, Orbit CMS",
    service: "web",
    serviceLabel: "Marketing Site",
    accent: "#4fffb0",
    initials: "TN",
  },
  {
    id: 7,
    quote: "okay the brand film?? i cried a little. we showed it at our investor deck and two people asked about it after. it captured exactly what we were trying to say in 60 seconds. absolute magic.",
    name: "Priya Sharma",
    handle: "@priyabuilds",
    role: "Founder, Solstice",
    service: "video",
    serviceLabel: "Brand Film",
    accent: "#ff6b35",
    initials: "PS",
  },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────

function Stars() {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );
}

// ─── Single Card ──────────────────────────────────────────────────────────────

function TestiCard({
  t,
  stackPos,  // 0 = front, 1 = behind-1, 2 = behind-2
  total,
  onClick,
  isLeaving,
}: {
  t: Testimonial;
  stackPos: number;
  total: number;
  onClick: () => void;
  isLeaving: boolean;
}) {
  const offsetY  = stackPos * 10;
  const offsetX  = stackPos * 4;
  const scale    = 1 - stackPos * 0.04;
  const zIndex   = total - stackPos;
  const opacity  = stackPos > 2 ? 0 : 1 - stackPos * 0.15;

  return (
    <div
      className={`tc-card${stackPos === 0 ? " tc-card--front" : ""}${isLeaving ? " tc-card--leave" : ""}`}
      style={{
        "--accent": t.accent,
        transform: `translateY(${offsetY}px) translateX(${offsetX}px) scale(${scale})`,
        zIndex,
        opacity,
        pointerEvents: stackPos === 0 ? "auto" : "none",
      } as React.CSSProperties}
      onClick={stackPos === 0 ? onClick : undefined}
    >
      <div className="tc-noise" />

      {/* top row */}
      <div className="tc-top">
        <div className="tc-service-tag">{t.serviceLabel}</div>
        <Stars />
      </div>

      {/* quote */}
      <div className="tc-quote-wrap">
        <span className="tc-open-q">"</span>
        <p className="tc-quote">{t.quote}</p>
      </div>

      {/* author */}
      <div className="tc-author">
        <div className="tc-avatar">
          <span className="tc-initials">{t.initials}</span>
        </div>
        <div className="tc-author-info">
          <div className="tc-name">{t.name}</div>
          <div className="tc-role">{t.role}</div>
          <div className="tc-handle">{t.handle}</div>
        </div>
      </div>

      {/* bottom hint — only on front */}
      {stackPos === 0 && (
        <div className="tc-hint">
          tap to read next <span className="tc-hint-arrow">→</span>
        </div>
      )}

      {/* accent line bottom */}
      <div className="tc-accent-line" />
    </div>
  );
}

// ─── Marquee strip ────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const words = ["loved it", "fire", "shipped on time", "no cap", "actually different", "goated", "came through", "10/10"];
  const doubled = [...words, ...words];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((w, i) => (
          <span key={i} className="marquee-item">
            {w} <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PraiseSection() {
  const [deck, setDeck] = useState(TESTIMONIALS);
  const [leaving, setLeaving] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setDeck(prev => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setLeaving(false);
    }, 380);
  }, [leaving]);

  // auto-advance every 5s
  useEffect(() => {
    autoRef.current = setTimeout(advance, 5000);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [deck, advance]);

  const jumpTo = (idx: number) => {
    setDeck(prev => {
      const front = prev.findIndex((_, i) => i === 0);
      // rotate until target is at front
      const target = TESTIMONIALS[idx];
      const currentIdx = prev.findIndex(t => t.id === target.id);
      const rotated = [...prev.slice(currentIdx), ...prev.slice(0, currentIdx)];
      return rotated;
    });
  };

  const frontId = deck[0]?.id;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* ── Section ─────────────────────────────── */
        #testimonials {
          background: #0a0a0a;
          padding: 120px 40px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
        }

        #testimonials::before, #testimonials::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.04);
        }
        #testimonials::before { left: 40px; }
        #testimonials::after  { right: 40px; }

        /* ── Header ──────────────────────────────── */
        .praise-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }

        .praise-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 10px;
        }

        .praise-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 100px);
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 0.9;
        }

        .praise-title em {
          font-style: normal;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }

        .praise-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 240px;
        }

        /* ── Layout ──────────────────────────────── */
        .praise-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        @media (max-width: 860px) {
          .praise-body { grid-template-columns: 1fr; gap: 64px; }
          #testimonials { padding: 80px 24px 80px; }
        }

        /* ── Stack area ──────────────────────────── */
        .tc-stack-wrap {
          position: relative;
          height: 360px;
          cursor: pointer;
        }

        /* ── Card ────────────────────────────────── */
        .tc-card {
          position: absolute;
          inset: 0;
          padding: 28px 28px 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0e0e0e;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      opacity  0.4s ease,
                      box-shadow 0.3s ease;
          overflow: hidden;
          user-select: none;
        }

        .tc-card--front {
          border-color: rgba(255,255,255,0.14);
        }

        .tc-card--front:hover {
          box-shadow: 0 0 0 1px var(--accent), 0 20px 60px rgba(0,0,0,0.6);
        }

        /* leave animation — flings card up and off */
        .tc-card--leave.tc-card--front {
          animation: card-fling 0.38s cubic-bezier(0.55,0,1,0.45) forwards;
        }

        @keyframes card-fling {
          0%   { transform: translateY(0) translateX(0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-120%) translateX(20px) scale(0.92) rotate(3deg); opacity: 0; }
        }

        /* noise */
        .tc-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        /* top row */
        .tc-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .tc-service-tag {
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid currentColor;
          padding: 3px 8px;
          opacity: 0.8;
        }

        /* stars */
        .stars { display: flex; gap: 2px; }
        .star {
          color: #c9a96e;
          font-size: 10px;
          line-height: 1;
        }

        /* quote */
        .tc-quote-wrap {
          flex: 1;
          position: relative;
          z-index: 1;
          margin-bottom: 20px;
        }

        .tc-open-q {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 64px;
          color: var(--accent);
          opacity: 0.15;
          line-height: 0.7;
          display: block;
          margin-bottom: -8px;
        }

        .tc-quote {
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          font-style: italic;
        }

        /* author */
        .tc-author {
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          z-index: 1;
          margin-bottom: 16px;
        }

        .tc-avatar {
          width: 38px;
          height: 38px;
          border: 1px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255,255,255,0.03);
        }

        .tc-initials {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          color: var(--accent);
          letter-spacing: 0.1em;
        }

        .tc-name {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 3px;
        }

        .tc-role {
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 2px;
        }

        .tc-handle {
          font-size: 8px;
          letter-spacing: 0.1em;
          color: var(--accent);
          opacity: 0.6;
        }

        /* hint */
        .tc-hint {
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          position: relative;
          z-index: 1;
        }

        .tc-hint-arrow {
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .tc-card--front:hover .tc-hint-arrow { transform: translateX(4px); }

        /* accent bottom line */
        .tc-accent-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          z-index: 2;
        }
        .tc-card--front:hover .tc-accent-line { transform: scaleX(1); }

        /* ── Right panel ─────────────────────────── */
        .praise-right {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* dot nav */
        .praise-dots {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .praise-dot-row {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: border-color 0.2s;
          position: relative;
        }

        .praise-dot-row:hover { border-color: rgba(255,255,255,0.15); }

        .praise-dot-row.dot-active { border-color: rgba(255,255,255,0.2); }

        .dot-pip {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .dot-active .dot-pip {
          background: #fff;
          transform: scale(1.4);
        }

        .dot-name {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          transition: color 0.2s;
          flex: 1;
        }
        .dot-active .dot-name { color: rgba(255,255,255,0.8); }

        .dot-service {
          font-size: 7px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
          padding: 2px 7px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: color 0.2s, border-color 0.2s;
        }
        .dot-active .dot-service {
          color: rgba(255,255,255,0.4);
          border-color: rgba(255,255,255,0.2);
        }

        .dot-progress {
          position: absolute;
          bottom: -1px; left: 0;
          height: 1px;
          background: #fff;
          width: 0%;
          transition: none;
        }
        .dot-active .dot-progress {
          animation: dot-fill 5s linear forwards;
        }

        @keyframes dot-fill { from { width: 0%; } to { width: 100%; } }

        /* ── Stat block ──────────────────────────── */
        .praise-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .praise-stat {
          background: #0a0a0a;
          padding: 18px 14px;
        }

        .praise-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 0.05em;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }

        .praise-stat-label {
          font-size: 7px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        /* ── Marquee ─────────────────────────────── */
        .marquee-wrap {
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-top: 80px;
          overflow: hidden;
          padding: 14px 0;
          position: relative;
        }

        .marquee-wrap::before,
        .marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrap::before { left: 0; background: linear-gradient(90deg, #0a0a0a, transparent); }
        .marquee-wrap::after  { right: 0; background: linear-gradient(270deg, #0a0a0a, transparent); }

        .marquee-track {
          display: flex;
          gap: 0;
          white-space: nowrap;
          animation: marquee-scroll 22s linear infinite;
          will-change: transform;
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.12);
          padding: 0 20px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 20px;
        }

        .marquee-dot {
          font-size: 8px;
          color: rgba(255,255,255,0.08);
        }

        @media (max-width: 600px) {
          .praise-title { font-size: 52px; }
          .tc-stack-wrap { height: 400px; }
          .praise-stats { grid-template-columns: repeat(3,1fr); }
        }
      `}</style>

      <section id="testimonials">

        {/* ── Header ──────────────────────────────── */}
        <div className="praise-header">
          <div>
            <p className="praise-eyebrow">praise — straight from the clients</p>
            <h2 className="praise-title">
              they said<br />
              what they<br />
              <em>said</em>
            </h2>
          </div>
          <p className="praise-sub">
            no cherry-picking,<br />
            no paid reviews —<br />
            just actual people<br />
            we actually helped.
          </p>
        </div>

        {/* ── Body ────────────────────────────────── */}
        <div className="praise-body">

          {/* stacked cards */}
          <div className="tc-stack-wrap" onClick={advance}>
            {[...deck].reverse().map((t, revIdx) => {
              const stackPos = deck.length - 1 - revIdx;
              return (
                <TestiCard
                  key={t.id}
                  t={t}
                  stackPos={stackPos}
                  total={deck.length}
                  onClick={advance}
                  isLeaving={leaving && stackPos === 0}
                />
              );
            })}
          </div>

          {/* right panel */}
          <div className="praise-right">

            {/* dot navigation */}
            <div className="praise-dots">
              {TESTIMONIALS.map((t, i) => {
                const isActive = deck[0]?.id === t.id;
                return (
                  <div
                    key={t.id}
                    className={`praise-dot-row${isActive ? " dot-active" : ""}`}
                    onClick={() => jumpTo(i)}
                  >
                    <div className="dot-pip" />
                    <span className="dot-name">{t.name}</span>
                    <span className="dot-service">{t.serviceLabel}</span>
                    {isActive && <div className="dot-progress" key={`${t.id}-prog`} />}
                  </div>
                );
              })}
            </div>

            {/* stats */}
            <div className="praise-stats">
              {[
                { num: "7+",   label: "client stories"  },
                { num: "★★★★★", label: "avg rating"      },
                { num: "100%", label: "would refer us"   },
              ].map((s, i) => (
                <div key={i} className="praise-stat">
                  <div className="praise-stat-num">{s.num}</div>
                  <div className="praise-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Marquee ─────────────────────────────── */}
        <MarqueeStrip />

      </section>
    </>
  );
}