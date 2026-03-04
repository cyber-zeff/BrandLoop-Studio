"use client";

import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

const SERVICES = [
  "Web / SaaS",
  "Graphic Design",
  "Video Editing",
  "BrandStack (all-in)",
  "something else",
];

const BUDGETS = [
  "just exploring rn",
  "under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
];

// ─── Animated label input ────────────────────────────────────────────────────

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className={`cf-field${focused ? " cf-field--focused" : ""}${lifted ? " cf-field--lifted" : ""}`}>
      <label className="cf-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete="off"
        required={required}
        className="cf-input"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => onChange(e.target.value)}
      />
      <div className="cf-underline">
        <div className="cf-underline-fill" />
      </div>
    </div>
  );
}

function SelectField({
  label,
  id,
  options,
  value,
  onChange,
}: {
  label: string;
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className={`cf-field${focused ? " cf-field--focused" : ""}${lifted ? " cf-field--lifted" : ""}`}>
      <label className="cf-label" htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        className="cf-input cf-select"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" disabled />
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div className="cf-underline">
        <div className="cf-underline-fill" />
      </div>
      <span className="cf-select-arrow">↓</span>
    </div>
  );
}

function TextareaField({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className={`cf-field cf-field--area${focused ? " cf-field--focused" : ""}${lifted ? " cf-field--lifted" : ""}`}>
      <label className="cf-label" htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        rows={4}
        className="cf-input cf-textarea"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => onChange(e.target.value)}
      />
      <div className="cf-underline">
        <div className="cf-underline-fill" />
      </div>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="cf-success">
      <div className="cf-success-icon">
        <svg viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="#4fffb0" strokeWidth="1" />
          <path d="M11 20.5l6 6 12-12" stroke="#4fffb0" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            className="cf-check-path"
          />
        </svg>
      </div>
      <p className="cf-success-title">message received 🫡</p>
      <p className="cf-success-sub">
        we'll be in your inbox within 24hrs.<br />
        no autoresponder, actual humans.
      </p>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", service: "", budget: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof FormState) => (v: string) =>
    setForm(prev => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // simulate — replace with your actual form endpoint
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* ── Section ─────────────────────────────── */
        #contact {
          background: #0a0a0a;
          padding: 120px 40px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
        }

        #contact::before, #contact::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.04);
        }
        #contact::before { left: 40px; }
        #contact::after  { right: 40px; }

        /* animated top gradient line */
        #contact > .ct-topline {
          position: absolute;
          top: 0; left: 0;
          height: 1px;
          width: 0;
          background: linear-gradient(90deg, #4fffb0, #c9a96e, transparent);
          animation: ct-draw 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
        }
        @keyframes ct-draw { to { width: 100%; } }

        /* ghost text */
        .ct-ghost {
          position: absolute;
          bottom: 40px;
          right: -10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(100px, 16vw, 200px);
          color: rgba(255,255,255,0.018);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        /* ── Layout ──────────────────────────────── */
        .ct-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .ct-layout { grid-template-columns: 1fr; gap: 56px; }
          #contact { padding: 80px 24px 80px; }
        }

        /* ── Left info ───────────────────────────── */
        .ct-left {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: sticky;
          top: 80px;
        }

        .ct-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 10px;
        }

        .ct-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 8vw, 92px);
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 0.9;
        }

        .ct-title em {
          font-style: normal;
          -webkit-text-stroke: 1px rgba(255,255,255,0.28);
          color: transparent;
        }

        .ct-desc {
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          line-height: 2;
        }

        /* response promise */
        .ct-promise {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(79,255,176,0.03);
          border-left: 2px solid rgba(79,255,176,0.4);
        }

        .ct-promise-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4fffb0;
          box-shadow: 0 0 8px #4fffb0;
          animation: pulse 2s ease infinite;
          flex-shrink: 0;
          margin-top: 2px;
        }
        @keyframes pulse {
          0%,100% { opacity:1; box-shadow: 0 0 8px #4fffb0; }
          50%      { opacity:.4; box-shadow: 0 0 3px #4fffb0; }
        }

        .ct-promise-text {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          line-height: 1.8;
        }

        .ct-promise-text strong {
          color: #4fffb0;
          font-weight: 500;
        }

        /* socials row */
        .ct-socials {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .ct-social-link {
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 6px 14px;
          transition: color 0.2s, border-color 0.2s;
        }
        .ct-social-link:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.3);
        }

        /* ── Form ────────────────────────────────── */
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .ct-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        @media (max-width: 540px) {
          .ct-form-row { grid-template-columns: 1fr; gap: 36px; }
        }

        /* ── Field ───────────────────────────────── */
        .cf-field {
          position: relative;
          padding-top: 20px;
        }

        .cf-label {
          position: absolute;
          top: 28px;
          left: 0;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          transition: top 0.25s cubic-bezier(0.16,1,0.3,1),
                      font-size 0.25s ease,
                      color 0.25s ease;
          transform-origin: left;
        }

        .cf-field--lifted .cf-label {
          top: 0;
          font-size: 7px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.3em;
        }

        .cf-field--focused .cf-label {
          color: #4fffb0;
        }

        .cf-input {
          display: block;
          width: 100%;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 8px 0 10px;
          font-family: 'Geist Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: #fff;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          transition: border-color 0.2s;
        }

        .cf-input:focus { border-color: transparent; }

        .cf-select {
          cursor: pointer;
        }

        .cf-select option {
          background: #111;
          color: #fff;
        }

        .cf-select-arrow {
          position: absolute;
          right: 0;
          bottom: 14px;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          pointer-events: none;
          font-family: 'Geist Mono', monospace;
          transition: color 0.2s;
        }
        .cf-field--focused .cf-select-arrow { color: #4fffb0; }

        .cf-textarea {
          resize: none;
          line-height: 1.8;
          padding-top: 8px;
        }

        .cf-field--area { padding-top: 20px; }

        /* animated underline */
        .cf-underline {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          overflow: hidden;
        }

        .cf-underline-fill {
          position: absolute;
          inset: 0;
          background: #4fffb0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }

        .cf-field--focused .cf-underline-fill { transform: scaleX(1); }

        /* ── Submit ──────────────────────────────── */
        .ct-submit-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .ct-submit-note {
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
        }

        .ct-submit-btn {
          position: relative;
          padding: 14px 36px;
          font-family: 'Geist Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #fff;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.3s;
          min-width: 180px;
          text-align: center;
        }

        .ct-submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #4fffb0;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
        }

        .ct-submit-btn:hover::before { transform: translateX(0); }
        .ct-submit-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .ct-submit-btn span { position: relative; z-index: 1; }

        /* sending dots */
        .ct-sending-dots span {
          animation: dot-blink 1.2s ease infinite;
          display: inline-block;
        }
        .ct-sending-dots span:nth-child(2) { animation-delay: 0.2s; }
        .ct-sending-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot-blink {
          0%,80%,100% { opacity: 0.2; }
          40%          { opacity: 1; }
        }

        /* ── Success ─────────────────────────────── */
        .cf-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 60px 20px;
          text-align: center;
          animation: fade-up 0.5s ease forwards;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cf-success-icon svg {
          width: 56px; height: 56px;
        }

        .cf-check-path {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: check-draw 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        @keyframes check-draw { to { stroke-dashoffset: 0; } }

        .cf-success-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          letter-spacing: 0.1em;
          color: #fff;
        }

        .cf-success-sub {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          line-height: 1.9;
        }

        /* ── Footer strip ────────────────────────── */
        .ct-footer-strip {
          margin-top: 100px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .ct-footer-copy {
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
        }

        .ct-footer-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.08);
        }
      `}</style>

      <section id="contact">
        <div className="ct-topline" />
        <div className="ct-ghost" aria-hidden>HI</div>

        <div className="ct-layout">

          {/* ── Left ────────────────────────────────── */}
          <div className="ct-left">
            <div>
              <p className="ct-eyebrow">contact — let's build something</p>
              <h2 className="ct-title">
                drop us<br />a <em>line</em>
              </h2>
            </div>

            <p className="ct-desc">
              got a project in mind?<br />
              even just a vibe?<br />
              send it over — we don't bite<br />
              and we actually reply.
            </p>

            <div className="ct-promise">
              <div className="ct-promise-dot" />
              <p className="ct-promise-text">
                <strong>reply within 24 hours.</strong><br />
                no bots, no ticketing system,<br />
                no 'we'll get back to you soon'.
              </p>
            </div>

            <div className="ct-socials">
              {["instagram", "twitter/x", "linkedin", "behance"].map(s => (
                <a key={s} href="#" className="ct-social-link">{s}</a>
              ))}
            </div>
          </div>

          {/* ── Right: Form ─────────────────────────── */}
          {sent ? <SuccessScreen /> : (
            <form
              ref={formRef}
              className="ct-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="ct-form-row">
                <Field
                  id="ct-name"
                  label="your name"
                  value={form.name}
                  onChange={set("name")}
                  required
                />
                <Field
                  id="ct-email"
                  label="email address"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </div>

              <div className="ct-form-row">
                <SelectField
                  id="ct-service"
                  label="what do you need?"
                  options={SERVICES}
                  value={form.service}
                  onChange={set("service")}
                />
                <SelectField
                  id="ct-budget"
                  label="rough budget"
                  options={BUDGETS}
                  value={form.budget}
                  onChange={set("budget")}
                />
              </div>

              <TextareaField
                id="ct-message"
                label="tell us what you're building"
                value={form.message}
                onChange={set("message")}
              />

              <div className="ct-submit-wrap">
                <p className="ct-submit-note">
                  no spam, no newsletter,<br />just a reply from us.
                </p>
                <button
                  type="submit"
                  className="ct-submit-btn"
                  disabled={sending}
                >
                  <span>
                    {sending ? (
                      <span className="ct-sending-dots">
                        sending<span>.</span><span>.</span><span>.</span>
                      </span>
                    ) : "send it →"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── Footer strip ──────────────────────────── */}
        <div className="ct-footer-strip">
          <p className="ct-footer-copy">© 2026 BrandLoop Studio — all rights reserved</p>
          <span className="ct-footer-name">BRANDLOOP</span>
          <p className="ct-footer-copy">made with intention, shipped with care</p>
        </div>
      </section>
    </>
  );
}