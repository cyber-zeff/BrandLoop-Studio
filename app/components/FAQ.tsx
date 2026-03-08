"use client";

import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface FaqItem {
  id: number;
  tag: string;
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    id: 1,
    tag: "general",
    q: "how fast do you actually deliver?",
    a: "depends on the scope, but we don't do the whole 'it'll be ready in 6-8 weeks' thing. starter projects ship in 5–7 days, studio tier in 2 weeks, full send / brandstack in 2–3 weeks. we move fast because we stay focused — one project doesn't sit in a queue while we're on a call with someone else.",
  },
  {
    id: 2,
    tag: "process",
    q: "what does the process actually look like?",
    a: "quick onboarding call → we send a vibe deck to align on direction → first draft drops → you react, we revise → final files delivered. no 47-step agency process, no endless discovery phases. we get in, we build, we ship. you're always in the loop but we don't need your hand to hold ours.",
  },
  {
    id: 3,
    tag: "pricing",
    q: "why no prices shown on the site?",
    a: "we added placeholder spots in the rates section because every project is a little different — the scope, complexity and how fast you need it all affect the number. the tiers give you a real framework though. drop us a message with what you're building and we'll give you a straight-up quote within 24 hours. no fluff, no discovery call just to get a number.",
  },
  {
    id: 4,
    tag: "revisions",
    q: "what counts as a revision?",
    a: "a revision is any round of feedback you send back after a draft. on studio and full send tiers it's unlimited — meaning we keep going until it's right, not until we hit an arbitrary cap. the only thing that triggers a scope change is if you fundamentally pivot the brief mid-project. which is totally fine, we'll just reprice that part.",
  },
  {
    id: 5,
    tag: "files",
    q: "do we get the source files?",
    a: "yes on studio, full send, and brandstack. starter gives you the finished export files (png, mp4, deployed site etc) but not the raw figma / premiere / webflow source. honestly for most starter clients that's all they need. but if you want full ownership of the working files, go studio or above.",
  },
  {
    id: 6,
    tag: "saas",
    q: "for web / saas — what stack do you build on?",
    a: "next.js + tailwind for most things. we use framer for marketing sites when speed matters, and webflow for client-editable sites. for saas apps we do full frontend with supabase or firebase on the backend. we don't lock you into some proprietary CMS you'll hate in 6 months.",
  },
  {
    id: 7,
    tag: "brandstack",
    q: "is brandstack really one team doing everything?",
    a: "yeah. same people who design your logo are briefing the video editor, are handing assets to the developer. the whole point is that nothing gets lost in translation — your brand colours in the site are the same ones in the reels are the same ones in the deck. coherence is the product.",
  },
  {
    id: 8,
    tag: "general",
    q: "can we start small and scale up later?",
    a: "100%. plenty of clients start on a starter project just to see how we work together, then move to a retainer once they're comfortable. no pressure to commit big upfront. we'd rather earn the bigger engagement than push you into it.",
  },
];

// ─── Typewriter hook ──────────────────────────────────────────────────────────

function useTypewriter(text: string, active: boolean, speed = 10) {
  const [displayed, setDisplayed] = useState("");
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) frameRef.current = setTimeout(tick, speed);
    };
    frameRef.current = setTimeout(tick, 60);
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [active, text, speed]);

  return displayed;
}

// ─── FAQ Row ──────────────────────────────────────────────────────────────────

function FaqRow({ item, index, isOpen, onToggle }: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerText = useTypewriter(item.a, isOpen);
  const innerRef   = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!innerRef.current) return;
    setHeight(isOpen ? innerRef.current.scrollHeight + 48 : 0);
  }, [isOpen, answerText]);

  return (
    <div
      className={`fq-row${isOpen ? " fq-row--open" : ""}`}
      style={{ "--fq-delay": `${index * 0.055}s` } as React.CSSProperties}
    >
      {/* question bar */}
      <button className="fq-bar" onClick={onToggle} aria-expanded={isOpen}>
        <div className="fq-bar-left">
          <span className="fq-idx">
            <span className="fq-idx-path">~/faq</span>
            <span className="fq-idx-num">[{String(index + 1).padStart(2,"0")}]</span>
          </span>
          <span className="fq-tag">{item.tag}</span>
          <span className="fq-question">{item.q}</span>
        </div>
        <div className="fq-icon" aria-hidden>
          <span className="fq-icon-h" />
          <span className={`fq-icon-v${isOpen ? " fq-icon-v--hide" : ""}`} />
        </div>
      </button>

      {/* answer */}
      <div className="fq-answer-wrap" style={{ maxHeight: `${height}px` }}>
        <div className="fq-answer-inner" ref={innerRef}>
          <div className="fq-terminal-prompt">
            <span className="fq-prompt-sym">▶</span>
            <span className="fq-prompt-cmd">brandloop --answer</span>
          </div>
          <p className="fq-answer-text">
            {answerText}
            {isOpen && answerText.length < item.a.length && (
              <span className="fq-cursor">▌</span>
            )}
          </p>
        </div>
      </div>

      <div className="fq-border-bottom" />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const tags    = ["all", ...Array.from(new Set(FAQS.map(f => f.tag)))];
  const visible = filter === "all" ? FAQS : FAQS.filter(f => f.tag === filter);

  const toggle = (id: number) => setOpenId(prev => prev === id ? null : id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* ── Section ─────────────────────────────── */
        #faq {
          background: #110C29;
          padding: 120px 40px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
        }

        #faq::before, #faq::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(170,125,252,0.06);
        }
        #faq::before { left: 40px; }
        #faq::after  { right: 40px; }

        /* ghost bg text */
        .fq-ghost {
          position: absolute;
          top: 80px; right: -20px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 18vw, 220px);
          color: rgba(170,125,252,0.03);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        /* ambient glow */
        .fq-glow {
          position: absolute;
          bottom: -100px; left: -100px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(170,125,252,0.06) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ──────────────────────────────── */
        .fq-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 52px;
          position: relative;
          z-index: 1;
        }

        .fq-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #AA7DFC;
          opacity: 0.75;
          margin-bottom: 10px;
        }

        .fq-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 100px);
          letter-spacing: 0.04em;
          color: #ffffff;
          line-height: 0.9;
        }

        .fq-title em {
          font-style: normal;
          -webkit-text-stroke: 1px #AA7DFC;
          color: transparent;
        }

        .fq-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 220px;
        }

        /* ── Filter tabs ─────────────────────────── */
        .fq-filters {
          display: flex;
          gap: 4px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .fq-filter-btn {
          padding: 6px 16px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          background: none;
          border: 1px solid rgba(170,125,252,0.14);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }

        .fq-filter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #AA7DFC;
          transform: translateY(101%);
          transition: transform 0.25s cubic-bezier(0.77,0,0.18,1);
        }

        .fq-filter-btn span { position: relative; z-index: 1; }

        .fq-filter-btn:hover:not(.fq-filter-btn--active) {
          color: #AA7DFC;
          border-color: rgba(170,125,252,0.3);
        }

        .fq-filter-btn--active {
          color: #110C29;
          border-color: #AA7DFC;
        }
        .fq-filter-btn--active::before { transform: translateY(0); }

        /* ── FAQ list ────────────────────────────── */
        .fq-list {
          border-top: 1px solid rgba(170,125,252,0.1);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        /* ── Row ─────────────────────────────────── */
        .fq-row {
          position: relative;
          animation: fq-in 0.45s cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: var(--fq-delay);
        }

        @keyframes fq-in {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .fq-border-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(170,125,252,0.08);
          transition: background 0.2s;
        }
        .fq-row--open .fq-border-bottom { background: rgba(170,125,252,0.22); }

        /* ── Question bar ────────────────────────── */
        .fq-bar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }

        .fq-bar:hover         { background: rgba(170,125,252,0.03); }
        .fq-row--open .fq-bar { background: rgba(170,125,252,0.04); }

        .fq-bar-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          flex-wrap: wrap;
        }

        /* terminal index */
        .fq-idx {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .fq-idx-path {
          font-size: 8px;
          letter-spacing: 0.1em;
          color: rgba(170,125,252,0.3);
          font-family: 'Geist Mono', monospace;
        }

        .fq-idx-num {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #AA7DFC;
          opacity: 0.65;
          font-family: 'Geist Mono', monospace;
          min-width: 32px;
        }

        /* category tag chip */
        .fq-tag {
          font-size: 7px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(170,125,252,0.3);
          border: 1px solid rgba(170,125,252,0.1);
          padding: 2px 7px;
          flex-shrink: 0;
          transition: color 0.2s, border-color 0.2s;
        }
        .fq-row--open .fq-tag {
          color: #AA7DFC;
          border-color: rgba(170,125,252,0.3);
        }

        /* question text */
        .fq-question {
          font-family: 'Geist Mono', monospace;
          font-size: clamp(11px, 1.4vw, 14px);
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.5);
          text-transform: lowercase;
          transition: color 0.2s;
          line-height: 1.4;
        }
        .fq-row--open .fq-question,
        .fq-bar:hover .fq-question { color: #ffffff; }

        /* +/− icon */
        .fq-icon {
          width: 18px; height: 18px;
          position: relative;
          flex-shrink: 0;
          margin-right: 4px;
        }

        .fq-icon-h,
        .fq-icon-v {
          position: absolute;
          background: rgba(255,255,255,0.25);
          transition: transform 0.3s ease, opacity 0.3s ease, background 0.2s;
        }

        .fq-icon-h {
          width: 18px; height: 1px;
          top: 50%; left: 0;
          transform: translateY(-50%);
        }

        .fq-icon-v {
          width: 1px; height: 18px;
          left: 50%; top: 0;
          transform: translateX(-50%);
        }

        .fq-icon-v--hide {
          transform: translateX(-50%) rotate(90deg);
          opacity: 0;
        }

        .fq-row--open .fq-icon-h,
        .fq-row--open .fq-icon-v { background: #AA7DFC; }

        /* ── Answer ──────────────────────────────── */
        .fq-answer-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        .fq-answer-inner {
          padding: 0 0 28px 60px;
          position: relative;
        }

        /* left gradient bar */
        .fq-answer-inner::before {
          content: '';
          position: absolute;
          left: 26px;
          top: 0; bottom: 28px;
          width: 1px;
          background: linear-gradient(180deg, #AA7DFC 0%, transparent 100%);
          opacity: 0.3;
        }

        /* terminal prompt */
        .fq-terminal-prompt {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .fq-prompt-sym {
          font-size: 8px;
          color: #AA7DFC;
          opacity: 0.65;
        }

        .fq-prompt-cmd {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(170,125,252,0.3);
          font-family: 'Geist Mono', monospace;
        }

        /* answer text — typewriter output */
        .fq-answer-text {
          font-size: clamp(10px, 1.2vw, 12px);
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.45);
          line-height: 1.9;
          font-family: 'Geist Mono', monospace;
          max-width: 680px;
        }

        /* blinking cursor */
        .fq-cursor {
          display: inline-block;
          color: #AA7DFC;
          animation: fq-blink 0.7s steps(1) infinite;
          font-size: 11px;
          vertical-align: text-bottom;
          margin-left: 2px;
        }

        @keyframes fq-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Bottom CTA ──────────────────────────── */
        .fq-bottom {
          margin-top: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          border-top: 1px solid rgba(170,125,252,0.08);
          padding-top: 32px;
          position: relative;
          z-index: 1;
        }

        .fq-bottom-text {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          line-height: 1.9;
          max-width: 380px;
        }

        .fq-bottom-text strong {
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }

        .fq-bottom-cta {
          position: relative;
          display: inline-block;
          padding: 12px 28px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #110C29;
          background: #AA7DFC;
          text-decoration: none;
          overflow: hidden;
          transition: color 0.3s;
          white-space: nowrap;
        }

        .fq-bottom-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #110C29;
          border: 1px solid #AA7DFC;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }

        .fq-bottom-cta span { position: relative; z-index: 1; }
        .fq-bottom-cta:hover { color: #AA7DFC; }
        .fq-bottom-cta:hover::before { transform: translateX(0); }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 600px) {
          #faq { padding: 80px 20px 80px; }
          .fq-title { font-size: 52px; }
          .fq-answer-inner { padding-left: 22px; }
          .fq-answer-inner::before { left: 6px; }
          .fq-idx-path { display: none; }
          .fq-bar-left { gap: 8px; }
        }
      `}</style>

      <section id="faq">
        <div className="fq-ghost" aria-hidden>FAQ</div>
        <div className="fq-glow" />

        {/* ── Header ──────────────────────────────── */}
        <div className="fq-header">
          <div>
            <p className="fq-eyebrow">faq — we read your mind</p>
            <h2 className="fq-title">
              stuff you're<br />
              probably<br />
              <em>wondering</em>
            </h2>
          </div>
          <p className="fq-sub">
            real answers,<br />
            not corporate<br />
            non-answers.
          </p>
        </div>

        {/* ── Filters ─────────────────────────────── */}
        <div className="fq-filters">
          {tags.map(tag => (
            <button
              key={tag}
              className={`fq-filter-btn${filter === tag ? " fq-filter-btn--active" : ""}`}
              onClick={() => { setFilter(tag); setOpenId(null); }}
            >
              <span>{tag}</span>
            </button>
          ))}
        </div>

        {/* ── List ────────────────────────────────── */}
        <div className="fq-list">
          {visible.map((item, i) => (
            <FaqRow
              key={item.id}
              item={item}
              index={i}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

        {/* ── Bottom ──────────────────────────────── */}
        <div className="fq-bottom">
          <p className="fq-bottom-text">
            still got a question that's not up there?{" "}
            <strong>just message us directly</strong> — we reply same day,
            no autoresponder, actual humans.
          </p>
          <a href="#contact" className="fq-bottom-cta">
            <span>ask us anything →</span>
          </a>
        </div>
      </section>
    </>
  );
}