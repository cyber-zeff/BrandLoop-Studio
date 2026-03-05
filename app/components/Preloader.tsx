"use client";

import { useEffect, useState } from "react";

export default function Preloader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [exit, setExit] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2200;
        const stepTime = 30; // bumped from 16ms — less thrash, still smooth
        const steps = duration / stepTime;
        const increment = 100 / steps;

        const counterInterval = setInterval(() => {
            start += increment;
            if (start >= 100) {
                setCounter(100);
                clearInterval(counterInterval);
            } else {
                setCounter(Math.floor(start));
            }
        }, stepTime);

        const exitTimer = setTimeout(() => setExit(true), 2600);
        const removeTimer = setTimeout(() => setLoading(false), 3400);

        return () => {
            clearInterval(counterInterval);
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!loading) return <>{children}</>;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Geist+Mono:wght@300;400&display=swap');
                @import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap");

                .preloader-root {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: #110c29;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    /* translateY instead of clip-path — GPU composited, no repaint */
                    transform: translateY(0);
                    transition: transform 0.75s cubic-bezier(0.77, 0, 0.18, 1);
                    will-change: transform;
                }

                .preloader-root.exit {
                    transform: translateY(-100%);
                }

                /*
                  Grain: tiny fixed SVG tiled as background-image.
                  Shift background-position instead of transforming a giant element.
                  Much cheaper — no layout, no paint, just a texture offset.
                */
                .preloader-root::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
                    background-size: 200px 200px;
                    pointer-events: none;
                    opacity: 0.4;
                    animation: grain 0.5s steps(1) infinite;
                    will-change: background-position;
                }

                @keyframes grain {
                    0%   { background-position: 0 0; }
                    20%  { background-position: -40px -20px; }
                    40%  { background-position: 20px -40px; }
                    60%  { background-position: -20px 40px; }
                    80%  { background-position: 40px 20px; }
                    100% { background-position: 0 0; }
                }

                .scan-line {
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: rgba(255,255,255,0.05);
                    animation: scan 3s linear infinite;
                    will-change: top;
                }

                @keyframes scan {
                    0%   { top: -1%; }
                    100% { top: 101%; }
                }

                .agency-name {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(64px, 12vw, 140px);
                    letter-spacing: 0.08em;
                    color: #fff;
                    line-height: 1;
                    overflow: hidden;
                }

                .agency-name .char {
                    display: inline-block;
                    transform: translateY(110%);
                    animation: char-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    will-change: transform;
                }

                .agency-name .char:nth-child(1)  { animation-delay: 0.05s; }
                .agency-name .char:nth-child(2)  { animation-delay: 0.10s; }
                .agency-name .char:nth-child(3)  { animation-delay: 0.15s; }
                .agency-name .char:nth-child(4)  { animation-delay: 0.20s; }
                .agency-name .char:nth-child(5)  { animation-delay: 0.25s; }
                .agency-name .char:nth-child(6)  { animation-delay: 0.30s; }
                .agency-name .char:nth-child(7)  { animation-delay: 0.35s; }
                .agency-name .char:nth-child(8)  { animation-delay: 0.40s; }
                .agency-name .char:nth-child(9)  { animation-delay: 0.45s; }
                .agency-name .char:nth-child(10) { animation-delay: 0.50s; }
                .agency-name .char:nth-child(11) { animation-delay: 0.52s; }
                .agency-name .char:nth-child(12) { animation-delay: 0.54s; }
                .agency-name .char:nth-child(13) { animation-delay: 0.56s; }
                .agency-name .char:nth-child(14) { animation-delay: 0.58s; }
                .agency-name .char:nth-child(15) { animation-delay: 0.60s; }
                .agency-name .char:nth-child(16) { animation-delay: 0.62s; }

                @keyframes char-rise {
                    to { transform: translateY(0); }
                }

                .tagline {
                    font-family: 'Geist Mono', monospace;
                    font-size: clamp(10px, 1.2vw, 13px);
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    margin-top: 16px;
                    opacity: 0;
                    animation: fade-up 0.6s ease forwards 0.7s;
                }

                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .progress-container {
                    position: absolute;
                    bottom: 48px;
                    left: 48px;
                    right: 48px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .progress-track {
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                    position: relative;
                    overflow: hidden;
                }

                .progress-fill {
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    transform-origin: left;
                    /* 100ms ease-out — smooth "catching up" feel without fighting the interval */
                    transition: transform 0.1s ease-out;
                    will-change: transform;
                }

                .progress-counter {
                    font-family: 'Geist Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 0.1em;
                    color: rgba(255,255,255,0.4);
                    min-width: 36px;
                    text-align: right;
                }

                .corner {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    opacity: 0.2;
                }
                .corner-tl { top: 32px; left: 32px; border-top: 1px solid #fff; border-left: 1px solid #fff; }
                .corner-tr { top: 32px; right: 32px; border-top: 1px solid #fff; border-right: 1px solid #fff; }
                .corner-bl { bottom: 32px; left: 32px; border-bottom: 1px solid #fff; border-left: 1px solid #fff; }
                .corner-br { bottom: 32px; right: 32px; border-bottom: 1px solid #fff; border-right: 1px solid #fff; }

                .flicker {
                    animation: flicker 0.15s steps(1) 1.8s 3;
                }
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
            `}</style>

            <div className={`preloader-root${exit ? " exit" : ""}`}>
                <div className="scan-line" />

                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />

                <div style={{ textAlign: "center", position: "relative" }}>
                    <div className="agency-name flicker" aria-label="brandloop.studio">
                        {"brandloop.studio".split("").map((char, i) => (
                            <span className="char" key={i}>
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                    <div className="tagline">Creative Studio — Est. 2026</div>
                </div>

                <div className="progress-container">
                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{ transform: `scaleX(${counter / 100})` }}
                        />
                    </div>
                    <div className="progress-counter">{counter}%</div>
                </div>
            </div>
        </>
    );
}