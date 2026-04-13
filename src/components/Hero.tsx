"use client";

import { useState, useEffect, useRef } from "react";
import { palette as P } from "@/lib/constants";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * 2;
      canvas.height = h * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 45 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 900,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.15,
      o: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(98,182,203,${d.o})`;
        ctx.fill();
      });
      dots.forEach((a, i) => {
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(98,182,203,${0.035 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: P.bg, minHeight: "100svh" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />

      {/* Gradient orbs */}
      <div
        className="absolute rounded-full hidden sm:block"
        style={{
          width: 500, height: 500, top: "-15%", right: "-10%",
          background: `radial-gradient(circle, ${P.yale}28, transparent 65%)`,
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 350, height: 350, bottom: "-10%", left: "-8%",
          background: `radial-gradient(circle, ${P.pacific}10, transparent 65%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Geometric decorations */}
      <div
        className="absolute hidden md:block"
        style={{
          top: "15%", left: "8%", width: 140, height: 140,
          border: `1px solid ${P.border}`, borderRadius: "50%",
          opacity: loaded ? 0.25 : 0, transition: "opacity 2s ease 1s",
        }}
      />
      <div
        className="absolute hidden md:block"
        style={{
          bottom: "20%", right: "10%", width: 80, height: 80,
          border: `1px solid ${P.border}`, transform: "rotate(45deg)",
          opacity: loaded ? 0.15 : 0, transition: "opacity 2s ease 1.2s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Intro line */}
        <div
          className="mx-auto mb-8"
          style={{
            width: 1, height: loaded ? 50 : 0,
            background: `linear-gradient(to bottom, transparent, ${P.pacific})`,
            transition: "height 1s cubic-bezier(.22,1,.36,1) 0.3s",
          }}
        />

        <p
          className="uppercase mb-6"
          style={{
            color: P.pacific, fontWeight: 500,
            fontSize: "clamp(9px, 1.5vw, 12px)", letterSpacing: "0.45em",
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
            transition: "all 1s cubic-bezier(.22,1,.36,1) 0.5s",
          }}
        >
          Advertising Specialist &nbsp;&bull;&nbsp; Marketing Specialist
        </p>

        <h1
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(40px)",
            transition: "all 1.2s cubic-bezier(.22,1,.36,1) 0.7s",
          }}
        >
          <span
            className="block font-heading font-light leading-[0.9] tracking-tight"
            style={{ color: P.pale, fontSize: "clamp(3rem, 10vw, 7.5rem)" }}
          >
            Mohamed
          </span>
          <span
            className="block font-heading font-bold leading-[0.9] tracking-tight mt-1"
            style={{
              fontSize: "clamp(3rem, 10vw, 7.5rem)",
              background: `linear-gradient(135deg, ${P.pacific}, ${P.frozen})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hazem
          </span>
        </h1>

        <p
          className="max-w-md mx-auto"
          style={{
            color: P.muted, lineHeight: 1.8, fontWeight: 300,
            fontSize: "clamp(13px, 2vw, 16px)", margin: "2rem auto 2.5rem",
            opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.1s",
          }}
        >
          Inspiring Brands through Storytelling & Strategy
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.4s" }}
        >
          <a
            href="#showreel"
            className="group inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`,
              color: P.deep,
              boxShadow: `0 8px 32px ${P.pacific}25`,
            }}
          >
            Watch Showreel
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
              <path d="M5 1l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500 w-full sm:w-auto justify-center"
            style={{ border: `1px solid ${P.border}`, color: P.soft }}
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 sm:h-32"
        style={{ background: `linear-gradient(to top, ${P.deep}, transparent)` }}
      />
      {/* Scroll */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: loaded ? 0.4 : 0, transition: "opacity 1s ease 2s" }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: P.muted }}>Scroll</span>
        <div className="w-px h-6 sm:h-8" style={{ background: `linear-gradient(to bottom, ${P.pacific}, transparent)` }} />
      </div>
    </section>
  );
}
