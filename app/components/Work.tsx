"use client";

import { useState, useRef, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: "all", label: "all drops" },
    { id: "graphic", label: "visuals" },
    { id: "video", label: "reels" },
    { id: "web", label: "builds" },
] as const;

type CatId = "all" | "graphic" | "video" | "web";

interface Project {
    id: number;
    cat: "graphic" | "video" | "web";
    title: string;
    sub: string;
    tag: string;
    year: string;
    size: "big" | "small"; // big = spans 2 cols on desktop
    accent: string;        // CSS colour
    videoUrl?: string;     // for video projects, embed or external link
    // decorative gradient stops
    grad: [string, string];
}

const PROJECTS: Project[] = [
    // ── Graphic ─────────────────────────────────
    {
        id: 1,
        cat: "graphic",
        title: "Void Apparel",
        sub: "Full brand identity — logo, palette, motion marks",
        tag: "Brand Identity",
        year: "2024",
        size: "big",
        accent: "#ffffff",
        grad: ["#1a1a1a", "#0a0a0a"],
    },
    {
        id: 2,
        cat: "graphic",
        title: "Noor x Bloom",
        sub: "Wedding stationery suite + social kit",
        tag: "Print & Digital",
        year: "2025",
        size: "small",
        accent: "#c9a96e",
        grad: ["#1c1509", "#0a0a0a"],
    },
    {
        id: 3,
        cat: "graphic",
        title: "Pulse Energy",
        sub: "Packaging design + launch campaign assets",
        tag: "Packaging",
        year: "2025",
        size: "small",
        accent: "#4fffb0",
        grad: ["#001a0e", "#0a0a0a"],
    },
    // ── Video ────────────────────────────────────
    {
        id: 4,
        cat: "video",
        title: "Solstice Reel",
        sub: "60s brand film — shot, cut & colour graded",
        tag: "Brand Film",
        year: "2024",
        size: "big",
        accent: "#ff6b35",
        grad: ["#1a0800", "#0a0a0a"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
        id: 5,
        cat: "video",
        title: "ByteSnack",
        sub: "15 x short-form reels for Instagram & TikTok",
        tag: "Social Content",
        year: "2025",
        size: "small",
        accent: "#e040fb",
        grad: ["#12001a", "#0a0a0a"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
        id: 6,
        cat: "video",
        title: "Kinetic Type",
        sub: "Motion typography series for product drops",
        tag: "Motion Design",
        year: "2025",
        size: "small",
        accent: "#40c4ff",
        grad: ["#00101a", "#0a0a0a"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    // ── Web / SaaS ───────────────────────────────
    {
        id: 7,
        cat: "web",
        title: "Flo Dashboard",
        sub: "SaaS analytics platform — design system + full frontend build",
        tag: "SaaS / Web App",
        year: "2025",
        size: "big",
        accent: "#4fffb0",
        grad: ["#001a0e", "#0a0a0a"],
    },
    {
        id: 8,
        cat: "web",
        title: "Clerq",
        sub: "AI invoicing SaaS — landing page + onboarding flow",
        tag: "SaaS Landing",
        year: "2025",
        size: "small",
        accent: "#ffffff",
        grad: ["#111111", "#0a0a0a"],
    },
    {
        id: 9,
        cat: "web",
        title: "Orbit CMS",
        sub: "Headless CMS marketing site with interactive 3D hero",
        tag: "Marketing Site",
        year: "2024",
        size: "small",
        accent: "#c9a96e",
        grad: ["#1c1509", "#0a0a0a"],
    },
];

// ─── Video Modal ─────────────────────────────────────────────────────────────

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <div className="vid-overlay" onClick={onClose}>
            <div className="vid-modal" onClick={(e) => e.stopPropagation()}>
                <button className="vid-close" onClick={onClose}>✕</button>
                <iframe
                    src={url + "?autoplay=1"}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none" }}
                />
            </div>
        </div>
    );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ p, index, onVideoClick }: {
    p: Project;
    index: number;
    onVideoClick: (url: string) => void;
}) {
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
        setTilt({ x, y });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            className={`proj-card proj-card--${p.size}`}
            style={{
                "--accent": p.accent,
                "--g1": p.grad[0],
                "--g2": p.grad[1],
                "--delay": `${index * 0.07}s`,
                transform: hovered
                    ? `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-4px)`
                    : "perspective(600px) rotateX(0) rotateY(0) translateY(0)",
            } as React.CSSProperties}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => p.videoUrl && onVideoClick(p.videoUrl)}
        >
            {/* background gradient */}
            <div className="proj-bg" />

            {/* noise */}
            <div className="proj-noise" />

            {/* top meta */}
            <div className="proj-meta-top">
                <span className="proj-tag">{p.tag}</span>
                <span className="proj-year">{p.year}</span>
            </div>

            {/* decorative index */}
            <div className="proj-index">0{p.id}</div>

            {/* title block */}
            <div className="proj-body">
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-sub">{p.sub}</p>
            </div>

            {/* bottom bar */}
            <div className="proj-footer">
                <div className="proj-accent-bar" />
                {p.videoUrl ? (
                    <span className="proj-cta">▶ watch it</span>
                ) : (
                    <span className="proj-cta">view →</span>
                )}
            </div>

            {/* hover border glow */}
            <div className={`proj-glow${hovered ? " proj-glow--on" : ""}`} />
        </div>
    );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function WorkSection() {
    const [active, setActive] = useState<CatId>("all");
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const visible = PROJECTS.filter(
        (p) => active === "all" || p.cat === active
    );

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400;500&display=swap');

        /* ── Section ─────────────────────────────────── */
        #projects {
          background: #0a0a0a;
          padding: 120px 40px 100px;
          position: relative;
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
        }

        /* vertical rail lines */
        #projects::before, #projects::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.04);
        }
        #projects::before { left: 40px; }
        #projects::after  { right: 40px; }

        /* ── Header ──────────────────────────────────── */
        .work-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 56px;
          gap: 24px;
          flex-wrap: wrap;
        }

        .work-eyebrow {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 10px;
        }

        .work-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 100px);
          letter-spacing: 0.04em;
          color: #fff;
          line-height: 0.9;
        }

        .work-title em {
          font-style: normal;
          -webkit-text-stroke: 1px rgba(255,255,255,0.35);
          color: transparent;
        }

        .work-tagline {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.3);
          max-width: 220px;
          line-height: 1.8;
          text-transform: uppercase;
        }

        /* ── Filter tabs ─────────────────────────────── */
        .work-filters {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .wf-btn {
          padding: 7px 18px;
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .wf-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateY(101%);
          transition: transform 0.25s cubic-bezier(0.77,0,0.18,1);
        }

        .wf-btn span { position: relative; z-index: 1; }

        .wf-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.4);
        }

        .wf-btn.active {
          color: #0a0a0a;
          border-color: #fff;
        }
        .wf-btn.active::before { transform: translateY(0); }

        /* count badge */
        .wf-count {
          font-size: 7px;
          color: rgba(255,255,255,0.25);
          margin-left: 6px;
          vertical-align: top;
          margin-top: 1px;
          display: inline-block;
        }
        .wf-btn.active .wf-count { color: rgba(0,0,0,0.4); }

        /* ── Grid ─────────────────────────────────────── */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
        }

        @media (max-width: 1024px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .work-grid { grid-template-columns: 1fr; }
          #projects  { padding: 80px 20px 80px; }
          .work-title { font-size: 52px; }
        }

        /* ── Card ─────────────────────────────────────── */
        .proj-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
          animation: card-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
          animation-delay: var(--delay);
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
        }

        .proj-card--big {
          grid-column: span 2;
          min-height: 340px;
        }

        @media (max-width: 600px) {
          .proj-card--big { grid-column: span 1; }
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* gradient bg */
        .proj-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--g1) 0%, var(--g2) 100%);
          z-index: 0;
        }

        /* noise layer */
        .proj-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity: 0.5;
          z-index: 1;
          pointer-events: none;
        }

        /* glow border */
        .proj-glow {
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          z-index: 5;
          pointer-events: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .proj-glow--on {
          border-color: var(--accent);
          box-shadow: inset 0 0 40px rgba(255,255,255,0.03), 0 0 0 1px var(--accent);
        }

        /* content layers */
        .proj-meta-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .proj-tag {
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.8;
          padding: 3px 8px;
          border: 1px solid currentColor;
        }

        .proj-year {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
        }

        .proj-index {
          position: absolute;
          bottom: 24px;
          right: 24px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          z-index: 2;
          pointer-events: none;
          user-select: none;
        }

        .proj-body {
          position: relative;
          z-index: 3;
          margin-top: auto;
          padding-bottom: 16px;
        }

        .proj-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
        }

        .proj-sub {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          line-height: 1.7;
          max-width: 340px;
        }

        .proj-footer {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .proj-accent-bar {
          height: 2px;
          width: 32px;
          background: var(--accent);
          opacity: 0.7;
          transition: width 0.3s ease;
        }
        .proj-card:hover .proj-accent-bar { width: 60px; }

        .proj-cta {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          transition: color 0.2s ease;
        }
        .proj-card:hover .proj-cta { color: var(--accent); }

        /* ── Count strip ─────────────────────────────── */
        .work-count-strip {
          margin-top: 48px;
          display: flex;
          align-items: center;
          gap: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 28px;
          flex-wrap: wrap;
        }

        .wcs-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .wcs-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #fff;
          line-height: 1;
          letter-spacing: 0.05em;
        }

        .wcs-label {
          font-size: 8px;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }

        .wcs-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.1);
        }

        /* ── Video Modal ─────────────────────────────── */
        .vid-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9998;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          animation: fade-in 0.2s ease;
        }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

        .vid-modal {
          position: relative;
          width: min(880px, 90vw);
          aspect-ratio: 16/9;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .vid-close {
          position: absolute;
          top: -36px;
          right: 0;
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-size: 11px;
          padding: 4px 10px;
          cursor: pointer;
          font-family: 'Geist Mono', monospace;
          letter-spacing: 0.1em;
          transition: background 0.2s;
        }
        .vid-close:hover { background: rgba(255,255,255,0.1); }
      `}</style>

            <section id="projects">
                {/* ── Header ────────────────────────────────── */}
                <div className="work-header">
                    <div>
                        <p className="work-eyebrow">our work — selected drops</p>
                        <h2 className="work-title">
                            stuff we<br />
                            <em>actually</em><br />
                            shipped
                        </h2>
                    </div>
                    <p className="work-tagline">
                        no filler, no stock photos — just real projects we went full send on
                    </p>
                </div>

                {/* ── Filters ───────────────────────────────── */}
                <div className="work-filters">
                    {CATEGORIES.map((c) => {
                        const cnt = c.id === "all"
                            ? PROJECTS.length
                            : PROJECTS.filter((p) => p.cat === c.id).length;
                        return (
                            <button
                                key={c.id}
                                className={`wf-btn${active === c.id ? " active" : ""}`}
                                onClick={() => setActive(c.id as CatId)}
                            >
                                <span>
                                    {c.label}
                                    <sup className="wf-count">{cnt}</sup>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ── Grid ──────────────────────────────────── */}
                <div className="work-grid">
                    {visible.map((p, i) => (
                        <ProjectCard
                            key={p.id}
                            p={p}
                            index={i}
                            onVideoClick={setVideoUrl}
                        />
                    ))}
                </div>

                {/* ── Stats strip ───────────────────────────── */}
                <div className="work-count-strip">
                    {[
                        { num: "40+", label: "projects delivered" },
                        { num: "3", label: "disciplines" },
                        { num: "100%", label: "client retention" },
                        { num: "2026", label: "and counting" },
                    ].map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                            {i > 0 && <div className="wcs-divider" />}
                            <div className="wcs-item">
                                <span className="wcs-num">{s.num}</span>
                                <span className="wcs-label">{s.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Video modal ───────────────────────────── */}
            {videoUrl && (
                <VideoModal url={videoUrl} onClose={() => setVideoUrl(null)} />
            )}
        </>
    );
}