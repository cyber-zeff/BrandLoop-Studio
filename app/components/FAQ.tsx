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

function useTypewriter(text: string, active: boolean, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    setDisplayed("");
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        frameRef.current = setTimeout(tick, speed);
      }
    };
    frameRef.current = setTimeout(tick, 60); // small initial delay
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [active, text, speed]);

  return displayed;
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqRow({ item, index, isOpen, onToggle }: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerText = useTypewriter(item.a, isOpen, 10);
  const answerRef  = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // measure real height for smooth expand
  useEffect(() => {
    if (!answerRef.current) return;
    if (isOpen) {
      // give typewriter time to fill — re-measure on every char change
      setHeight(answerRef.current.scrollHeight + 48);
    } else {
      setHeight(0);
    }
  }, [isOpen, answerText]);

  return (
    <div
      className={`faq-row${isOpen ? " faq-row--open" : ""}`}
      style={{ "--delay": `${index * 0.06}s` } as React.CSSProperties}
    >
      {/* question bar */}
      <button className="faq-q-bar" onClick={onToggle} aria-expanded={isOpen}>

        {/* left: index + tag */}
        <div className="faq-q-left">
          <span className="faq-idx">
            <span className="faq-idx-prompt">~/faq</span>
            <span className="faq-idx-num">[{String(index + 1).padStart(2, "0")}]</span>
          </span>
          <span className="faq-tag">{item.tag}</span>
          <span className="faq-q-text">{item.q}</span>
        </div>

        {/* right: animated toggle icon */}
        <div className="faq-icon" aria-hidden>
          <span className={`faq-icon-h`} />
          <span className={`faq-icon-v${isOpen ? " faq-icon-v--hide" : ""}`} />
        </div>
      </button>

      {/* answer — height-animated container */}
      <div
        className="faq-a-wrap"
        style={{ maxHeight: `${height}px` }}
      >
        <div className="faq-a-inner" ref={answerRef}>
          {/* terminal prompt line */}
          <div className="faq-terminal-line">
            <span className="faq-prompt-sym">▶</span>
            <span className="faq-prompt-cmd">brandloop --answer</span>
          </div>

          <p className="faq-a-text">
            {answerText}
            {isOpen && answerText.length < item.a.length && (
              <span className="faq-cursor">▌</span>
            )}
          </p>
        </div>
      </div>

      {/* bottom border draw animation */}
      <div className="faq-border-draw" />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const tags = ["all", ...Array.from(new Set(FAQS.map(f => f.tag)))];
  const visible = filter === "all" ? FAQS : FAQS.filter(f => f.tag === filter);

  const toggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* ── Section ─────────────────────────────── */
        #faq {
          background: #0a0a0a;
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
          background: rgba(255,255,255,0.04);
        }
        #faq::before { left: 40px; }
        #faq::after  { right: 40px; }

        /* big ghost text bg */
        .faq-ghost {
          position: absolute;
          top: 80px;
          right: -20px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(120px, 18vw, 220px);
          color: rgba(255,255,255,0.02);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        /* ── Header ──────────────────────────────── */
        .faq-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }

        .faq-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 10px;
        }

        .faq-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 100px);
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 0.9;
        }

        .faq-title em {
          font-style: normal;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }

        .faq-sub {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          line-height: 1.9;
          max-width: 240px;
        }

        /* ── Filter tabs ─────────────────────────── */
        .faq-filters {
          display: flex;
          gap: 4px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .faq-filter-btn {
          padding: 6px 16px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }

        .faq-filter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateY(101%);
          transition: transform 0.25s cubic-bezier(0.77,0,0.18,1);
        }

        .faq-filter-btn span { position: relative; z-index: 1; }

        .faq-filter-btn.active {
          color: #0a0a0a;
          border-color: #fff;
        }
        .faq-filter-btn.active::before { transform: translateY(0); }
        .faq-filter-btn:hover:not(.active) { color: #fff; border-color: rgba(255,255,255,0.3); }

        /* ── FAQ list ────────────────────────────── */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        /* ── Row ─────────────────────────────────── */
        .faq-row {
          position: relative;
          animation: row-in 0.45s cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: var(--delay);
        }

        @keyframes row-in {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* bottom border that draws in on hover/open */
        .faq-border-draw {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          width: 100%;
          background: rgba(255,255,255,0.07);
        }

        .faq-row--open .faq-border-draw {
          background: rgba(255,255,255,0.15);
        }

        /* ── Question bar ────────────────────────── */
        .faq-q-bar {
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

        .faq-q-bar:hover { background: rgba(255,255,255,0.015); }
        .faq-row--open .faq-q-bar { background: rgba(255,255,255,0.02); }

        .faq-q-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          flex-wrap: wrap;
        }

        /* terminal index */
        .faq-idx {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .faq-idx-prompt {
          font-size: 8px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.15);
          font-family: 'Geist Mono', monospace;
        }

        .faq-idx-num {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #4fffb0;
          opacity: 0.7;
          font-family: 'Geist Mono', monospace;
          min-width: 32px;
        }

        .faq-tag {
          font-size: 7px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 2px 7px;
          flex-shrink: 0;
          transition: color 0.2s, border-color 0.2s;
        }

        .faq-row--open .faq-tag {
          color: rgba(255,255,255,0.5);
          border-color: rgba(255,255,255,0.2);
        }

        .faq-q-text {
          font-family: 'Geist Mono', monospace;
          font-size: clamp(11px, 1.4vw, 14px);
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.6);
          text-transform: lowercase;
          transition: color 0.2s;
          line-height: 1.4;
        }

        .faq-row--open .faq-q-text,
        .faq-q-bar:hover .faq-q-text {
          color: #fff;
        }

        /* plus/minus icon */
        .faq-icon {
          width: 18px;
          height: 18px;
          position: relative;
          flex-shrink: 0;
          margin-right: 4px;
        }

        .faq-icon-h,
        .faq-icon-v {
          position: absolute;
          background: rgba(255,255,255,0.35);
          transition: transform 0.3s ease, opacity 0.3s ease, background 0.2s;
        }

        .faq-icon-h {
          width: 18px; height: 1px;
          top: 50%; left: 0;
          transform: translateY(-50%);
        }

        .faq-icon-v {
          width: 1px; height: 18px;
          left: 50%; top: 0;
          transform: translateX(-50%);
        }

        .faq-icon-v--hide {
          transform: translateX(-50%) rotate(90deg);
          opacity: 0;
        }

        .faq-row--open .faq-icon-h,
        .faq-row--open .faq-icon-v { background: #4fffb0; }

        /* ── Answer wrapper ──────────────────────── */
        .faq-a-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        .faq-a-inner {
          padding: 0 0 28px 60px;
          position: relative;
        }

        /* left accent bar */
        .faq-a-inner::before {
          content: '';
          position: absolute;
          left: 26px;
          top: 0; bottom: 28px;
          width: 1px;
          background: linear-gradient(180deg, #4fffb0 0%, transparent 100%);
          opacity: 0.4;
        }

        /* terminal prompt line */
        .faq-terminal-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .faq-prompt-sym {
          font-size: 8px;
          color: #4fffb0;
          opacity: 0.7;
        }

        .faq-prompt-cmd {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          font-family: 'Geist Mono', monospace;
        }

        /* answer text */
        .faq-a-text {
          font-size: clamp(10px, 1.2vw, 12px);
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.5);
          line-height: 1.9;
          font-family: 'Geist Mono', monospace;
          max-width: 680px;
        }

        /* blinking cursor */
        .faq-cursor {
          display: inline-block;
          color: #4fffb0;
          animation: blink 0.7s steps(1) infinite;
          font-size: 11px;
          vertical-align: text-bottom;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Bottom CTA ──────────────────────────── */
        .faq-bottom {
          margin-top: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 36px;
        }

        .faq-bottom-left p {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          line-height: 1.9;
          max-width: 360px;
        }

        .faq-bottom-left p strong {
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }

        .faq-contact-btn {
          position: relative;
          display: inline-block;
          padding: 12px 28px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #fff;
          text-decoration: none;
          overflow: hidden;
          transition: color 0.3s;
          white-space: nowrap;
        }

        .faq-contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #4fffb0;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
        }

        .faq-contact-btn span { position: relative; z-index: 1; }
        .faq-contact-btn:hover::before { transform: translateX(0); }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 600px) {
          #faq { padding: 80px 20px 80px; }
          .faq-title { font-size: 52px; }
          .faq-a-inner { padding-left: 20px; }
          .faq-a-inner::before { left: 6px; }
          .faq-idx-prompt { display: none; }
          .faq-q-left { gap: 10px; }
        }
      `}</style>

      <section id="faq">
        {/* ghost bg text */}
        <div className="faq-ghost" aria-hidden>FAQ</div>

        {/* ── Header ──────────────────────────────── */}
        <div className="faq-header">
          <div>
            <p className="faq-eyebrow">faq — we read your mind</p>
            <h2 className="faq-title">
              stuff you're<br />
              probably<br />
              <em>wondering</em>
            </h2>
          </div>
          <p className="faq-sub">
            real answers,<br />
            not corporate<br />
            non-answers.
          </p>
        </div>

        {/* ── Filters ─────────────────────────────── */}
        <div className="faq-filters">
          {tags.map(tag => (
            <button
              key={tag}
              className={`faq-filter-btn${filter === tag ? " active" : ""}`}
              onClick={() => { setFilter(tag); setOpenId(null); }}
            >
              <span>{tag}</span>
            </button>
          ))}
        </div>

        {/* ── List ────────────────────────────────── */}
        <div className="faq-list">
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
        <div className="faq-bottom">
          <div className="faq-bottom-left">
            <p>
              still got a question that's not up there?{" "}
              <strong>just message us directly</strong> — we reply same day,
              no autoresponder, actual humans.
            </p>
          </div>
          <a href="#contact" className="faq-contact-btn">
            <span>ask us anything →</span>
          </a>
        </div>
      </section>
    </>
  );
}