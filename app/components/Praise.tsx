"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  handle: string;
  role: string;
  serviceLabel: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "bro they just UNDERSTOOD the assignment. sent a vibe board on monday, had a full brand kit by friday. no cap the logo alone made our whole team stop and go 'wait that's actually fire'",
    name: "Zara Ahmed",
    handle: "@zaraahmedd",
    role: "Founder, Void Apparel",
    serviceLabel: "Brand Identity",
    initials: "ZA",
  },
  {
    id: 2,
    quote:
      "we were lowkey skeptical because we'd been burned before by agencies that over-promise. brandloop actually delivered ahead of schedule?? our saas conversion went up 34% after the new landing page. still shook.",
    name: "Karan Mehta",
    handle: "@karanbuilds",
    role: "CEO, Clerq",
    serviceLabel: "SaaS Website",
    initials: "KM",
  },
  {
    id: 3,
    quote:
      "the reels they made for us hit different. like genuinely different from every other agency edit we've seen — the pacing, the cuts, the music sync. our instagram engagement literally tripled in the first month.",
    name: "Nadia Yusuf",
    handle: "@nadiayusuf_",
    role: "Head of Marketing, ByteSnack",
    serviceLabel: "Social Reels",
    initials: "NY",
  },
  {
    id: 4,
    quote:
      "went with the full brandstack deal and honestly it was the best decision for our launch. one team handled everything — no briefing 4 different people, no miscommunication. the brand feels so cohesive it's scary.",
    name: "Omar Siddiqui",
    handle: "@omarsidq",
    role: "Co-founder, Flo Dashboard",
    serviceLabel: "BrandStack",
    initials: "OS",
  },
  {
    id: 5,
    quote:
      "they redesigned our entire packaging and the response at launch was insane. customers were literally posting unboxings without us even asking. the design did the marketing for us.",
    name: "Lena Strauss",
    handle: "@lenastrauss",
    role: "Product Lead, Pulse Energy",
    serviceLabel: "Packaging",
    initials: "LS",
  },
  {
    id: 6,
    quote:
      "i was ready to just use a template for our site but my co-founder convinced me to try brandloop. genuinely cannot imagine where we'd be with a generic site. the attention to detail is on another level.",
    name: "Tariq Noor",
    handle: "@tariqnoor_dev",
    role: "CTO, Orbit CMS",
    serviceLabel: "Marketing Site",
    initials: "TN",
  },
  {
    id: 7,
    quote:
      "okay the brand film?? i cried a little. we showed it at our investor deck and two people asked about it after. it captured exactly what we were trying to say in 60 seconds. absolute magic.",
    name: "Priya Sharma",
    handle: "@priyabuilds",
    role: "Founder, Solstice",
    serviceLabel: "Brand Film",
    initials: "PS",
  },
];

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars() {
  return (
    <div className="pr-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="pr-star">
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestiCard({
  t,
  stackPos,
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
  const offsetY = stackPos * 10;
  const offsetX = stackPos * 5;
  const scale = 1 - stackPos * 0.04;
  const zIndex = total - stackPos;
  const opacity = stackPos > 2 ? 0 : 1 - stackPos * 0.18;

  return (
    <div
      className={`pr-card${stackPos === 0 ? " pr-card--front" : ""}${isLeaving ? " pr-card--leave" : ""}`}
      style={{
        transform: `translateY(${offsetY}px) translateX(${offsetX}px) scale(${scale})`,
        zIndex,
        opacity,
        pointerEvents: stackPos === 0 ? "auto" : "none",
      }}
      onClick={stackPos === 0 ? onClick : undefined}
    >
      <div className="pr-card-noise" />

      <div className="pr-card-top">
        <span className="pr-service-tag">{t.serviceLabel}</span>
        <Stars />
      </div>

      <div className="pr-quote-wrap">
        <span className="pr-open-q" aria-hidden>
          "
        </span>
        <p className="pr-quote">{t.quote}</p>
      </div>

      <div className="pr-author">
        <div className="pr-avatar">
          <span className="pr-initials">{t.initials}</span>
        </div>
        <div className="pr-author-info">
          <div className="pr-name">{t.name}</div>
          <div className="pr-role">{t.role}</div>
          <div className="pr-handle">{t.handle}</div>
        </div>
      </div>

      {stackPos === 0 && (
        <div className="pr-hint">
          tap to read next <span className="pr-hint-arr">→</span>
        </div>
      )}

      <div className="pr-bottom-line" />
    </div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

const MARQUEE_WORDS = [
  "loved it",
  "fire",
  "shipped on time",
  "no cap",
  "actually different",
  "goated",
  "came through",
  "10/10",
  "loved it",
  "fire",
  "shipped on time",
  "no cap",
  "actually different",
  "goated",
  "came through",
  "10/10",
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PraiseSection() {
  const [deck, setDeck] = useState(TESTIMONIALS);
  const [leaving, setLeaving] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setDeck((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setLeaving(false);
    }, 380);
  }, [leaving]);

  useEffect(() => {
    autoRef.current = setTimeout(advance, 5000);
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [deck, advance]);

  const jumpTo = (idx: number) => {
    const target = TESTIMONIALS[idx];
    const currentIdx = deck.findIndex((t) => t.id === target.id);
    setDeck([...deck.slice(currentIdx), ...deck.slice(0, currentIdx)]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* All selectors scoped — no :root bleed */

        /* ── Section ─────────────────────────────── */
        #testimonials {
          background: #110C29;
          padding: 120px 40px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
        }

        #testimonials::before,
        #testimonials::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(170,125,252,0.06);
        }
        #testimonials::before { left: 40px; }
        #testimonials::after  { right: 40px; }

        .pr-glow {
          position: absolute;
          top: -120px; right: -120px;
          width: 550px; height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(170,125,252,0.08) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ──────────────────────────────── */
        .pr-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }

        .pr-eyebrow {
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #AA7DFC;
          opacity: 0.75;
          margin-bottom: 10px;
        }

        .pr-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 100px);
          letter-spacing: 0.04em;
          color: #ffffff;
          line-height: 0.9;
        }

        .pr-title em {
          font-style: normal;
          -webkit-text-stroke: 1px #AA7DFC;
          color: transparent;
        }

        .pr-sub {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 240px;
        }

        /* ── Body layout ─────────────────────────── */
        .pr-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 860px) {
          .pr-body { grid-template-columns: 1fr; gap: 56px; }
          #testimonials { padding: 80px 24px 80px; }
          .pr-title { font-size: 52px; }
        }

        /* ── Stack wrapper ───────────────────────── */
        .pr-stack {
          position: relative;
          height: 360px;
          cursor: pointer;
        }

        @media (max-width: 600px) { .pr-stack { height: 420px; } }

        /* ── Card ────────────────────────────────── */
        .pr-card {
          position: absolute;
          inset: 0;
          padding: 26px 26px 20px;
          border: 1px solid rgba(170,125,252,0.16);
          background: linear-gradient(140deg, #1c1245 0%, #110C29 100%);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          user-select: none;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      opacity  0.4s ease,
                      box-shadow 0.3s ease;
        }

        .pr-card--front {
          border-color: rgba(170,125,252,0.35);
        }

        .pr-card--front:hover {
          box-shadow: 0 0 0 1px #AA7DFC, 0 20px 60px rgba(170,125,252,0.14);
        }

        .pr-card--leave.pr-card--front {
          animation: pr-fling 0.38s cubic-bezier(0.55,0,1,0.45) forwards;
        }

        @keyframes pr-fling {
          to { transform: translateY(-120%) translateX(20px) scale(0.92) rotate(3deg); opacity: 0; }
        }

        .pr-card-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        .pr-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .pr-service-tag {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #AA7DFC;
          border: 1px solid rgba(170,125,252,0.3);
          padding: 3px 8px;
        }

        .pr-stars { display: flex; gap: 2px; }
        .pr-star  { color: #c9a96e; font-size: 10px; line-height: 1; }

        .pr-quote-wrap {
          flex: 1;
          position: relative;
          z-index: 1;
          margin-bottom: 16px;
        }

        .pr-open-q {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 56px;
          color: #AA7DFC;
          opacity: 0.1;
          line-height: 0.7;
          display: block;
          margin-bottom: -4px;
        }

        .pr-quote {
          font-size: 15px;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.62);
          line-height: 1.8;
        }

        .pr-author {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          margin-bottom: 12px;
        }

        .pr-avatar {
          width: 36px; height: 36px;
          border: 1px solid rgba(170,125,252,0.4);
          background: rgba(170,125,252,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pr-initials {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          color: #AA7DFC;
          letter-spacing: 0.08em;
        }

        .pr-name {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 2px;
        }

        .pr-role {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 2px;
        }

        .pr-handle {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #AA7DFC;
          opacity: 0.5;
        }

        .pr-hint {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.16);
          position: relative;
          z-index: 1;
        }

        .pr-hint-arr {
          display: inline-block;
          transition: transform 0.2s;
        }
        .pr-card--front:hover .pr-hint-arr { transform: translateX(4px); }

        /* bottom accent line draws on hover */
        .pr-bottom-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: #AA7DFC;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          z-index: 3;
        }
        .pr-card--front:hover .pr-bottom-line { transform: scaleX(1); }

        /* ── Right panel ─────────────────────────── */
        .pr-right {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        /* dot nav */
        .pr-dots { display: flex; flex-direction: column; }

        .pr-dot-row {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          padding: 10px 0;
          border-bottom: 1px solid rgba(170,125,252,0.08);
          position: relative;
          transition: border-color 0.2s;
        }
        .pr-dot-row:hover      { border-color: rgba(170,125,252,0.22); }
        .pr-dot-row--active    { border-color: rgba(170,125,252,0.25); }

        .pr-pip {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(170,125,252,0.2);
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .pr-dot-row--active .pr-pip {
          background: #AA7DFC;
          transform: scale(1.4);
          box-shadow: 0 0 6px rgba(170,125,252,0.5);
        }

        .pr-dot-name {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          transition: color 0.2s;
          flex: 1;
        }
        .pr-dot-row--active .pr-dot-name { color: rgba(255,255,255,0.75); }

        .pr-dot-svc {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(170,125,252,0.2);
          padding: 2px 7px;
          border: 1px solid rgba(170,125,252,0.1);
          transition: color 0.2s, border-color 0.2s;
        }
        .pr-dot-row--active .pr-dot-svc {
          color: #AA7DFC;
          border-color: rgba(170,125,252,0.3);
        }

        .pr-dot-progress {
          position: absolute;
          bottom: -1px; left: 0;
          height: 1px;
          background: #AA7DFC;
          width: 0;
          animation: pr-prog 5s linear forwards;
        }
        @keyframes pr-prog { to { width: 100%; } }

        /* ── Stats ───────────────────────────────── */
        .pr-stats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1px;
          background: rgba(170,125,252,0.1);
          border: 1px solid rgba(170,125,252,0.18);
        }

        .pr-stat {
          background: #110C29;
          padding: 18px 14px;
        }

        .pr-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 0.05em;
          color: #AA7DFC;
          line-height: 1;
          margin-bottom: 4px;
        }

        .pr-stat-lbl {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        /* ── Marquee ─────────────────────────────── */
        .pr-marquee {
          border-top: 1px solid rgba(170,125,252,0.08);
          border-bottom: 1px solid rgba(170,125,252,0.08);
          margin-top: 80px;
          overflow: hidden;
          padding: 13px 0;
          position: relative;
          z-index: 1;
        }

        .pr-marquee::before,
        .pr-marquee::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .pr-marquee::before { left: 0;  background: linear-gradient(90deg, #110C29, transparent); }
        .pr-marquee::after  { right: 0; background: linear-gradient(270deg, #110C29, transparent); }

        .pr-marquee-track {
          display: flex;
          white-space: nowrap;
          animation: pr-scroll 22s linear infinite;
          will-change: transform;
        }
        @keyframes pr-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .pr-marquee-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(170,125,252,0.2);
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          gap: 22px;
        }

        .pr-marquee-sep { font-size: 7px; color: rgba(170,125,252,0.1); }
      `}</style>

      <section id="testimonials">
        <div className="pr-glow" />

        {/* Header */}
        <div className="pr-header">
          <div>
            <p className="pr-eyebrow">praise — straight from the clients</p>
            <h2 className="pr-title">
              they said
              <br />
              what they
              <br />
              <em>said</em>
            </h2>
          </div>
          <p className="pr-sub">
            no cherry-picking,
            <br />
            no paid reviews —<br />
            just actual people
            <br />
            we actually helped.
          </p>
        </div>

        {/* Body */}
        <div className="pr-body">
          {/* Stack */}
          <div className="pr-stack" onClick={advance}>
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

          {/* Right panel */}
          <div className="pr-right">
            <div className="pr-dots">
              {TESTIMONIALS.map((t, i) => {
                const isActive = deck[0]?.id === t.id;
                return (
                  <div
                    key={t.id}
                    className={`pr-dot-row${isActive ? " pr-dot-row--active" : ""}`}
                    onClick={() => jumpTo(i)}
                  >
                    <div className="pr-pip" />
                    <span className="pr-dot-name">{t.name}</span>
                    <span className="pr-dot-svc">{t.serviceLabel}</span>
                    {isActive && (
                      <div className="pr-dot-progress" key={`${t.id}-p`} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pr-stats">
              {[
                { num: "7+", lbl: "client stories" },
                { num: "★★★★★", lbl: "avg rating" },
                { num: "100%", lbl: "would refer us" },
              ].map((s, i) => (
                <div key={i} className="pr-stat">
                  <div className="pr-stat-num">{s.num}</div>
                  <div className="pr-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="pr-marquee">
          <div className="pr-marquee-track">
            {MARQUEE_WORDS.map((w, i) => (
              <span key={i} className="pr-marquee-item">
                {w} <span className="pr-marquee-sep">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
