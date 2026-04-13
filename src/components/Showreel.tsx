"use client";

import { useState } from "react";
import { palette as P, VIDEOS } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import Glass from "@/components/ui/Glass";
import SectionHeader from "@/components/ui/SectionHeader";

interface VideoPlaceholderProps {
  video: (typeof VIDEOS)[number];
  isFeatured?: boolean;
  playing: boolean;
  onToggle: () => void;
}

function VideoPlaceholder({ video, isFeatured = false, playing, onToggle }: VideoPlaceholderProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-video"
      style={{ background: `linear-gradient(145deg, ${P.yale}30, ${P.bg})`, border: `1px solid ${P.border}` }}
      onClick={onToggle}
    >
      {playing && video.embed ? (
        <iframe
          src={video.embed}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={video.title}
        />
      ) : (
        <>
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${P.yale}20 0%, transparent 40%, ${P.pacific}08 100%)` }} />
          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)" }} />
          {/* Film strips */}
          <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 opacity-[0.06]" style={{ background: `repeating-linear-gradient(180deg, ${P.pacific} 0px, ${P.pacific} 4px, transparent 4px, transparent 12px)` }} />
          <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 opacity-[0.06]" style={{ background: `repeating-linear-gradient(180deg, ${P.pacific} 0px, ${P.pacific} 4px, transparent 4px, transparent 12px)` }} />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              className="flex items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
              style={{
                width: isFeatured ? 80 : 56,
                height: isFeatured ? 80 : 56,
                background: `rgba(98,182,203,0.12)`,
                border: `2px solid ${P.pacific}50`,
                boxShadow: `0 0 40px ${P.pacific}15`,
                backdropFilter: "blur(8px)",
              }}
            >
              <svg width={isFeatured ? 28 : 20} height={isFeatured ? 28 : 20} viewBox="0 0 24 24" fill={P.pacific}>
                <polygon points="8 5 19 12 8 19" />
              </svg>
            </div>
          </div>

          {/* Info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10" style={{ background: `linear-gradient(to top, ${P.bg}ee, transparent)` }}>
            <h4 className={`font-heading font-bold mb-1 ${isFeatured ? "text-base sm:text-lg" : "text-sm"}`} style={{ color: P.pale }}>
              {video.title}
            </h4>
            <p className="text-[11px] sm:text-xs" style={{ color: P.muted, fontWeight: 300 }}>
              {video.description}
            </p>
          </div>

          {/* Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className="px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.15em] font-medium"
              style={{ background: `${P.pacific}12`, color: P.pacific, border: `1px solid ${P.pacific}20` }}
            >
              {video.embed ? "Watch" : "Coming Soon"}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default function Showreel() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section id="showreel" className="py-20 sm:py-32 px-5 sm:px-8" style={{ background: P.bg }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Video Work"
          title={<>Show<span style={{ color: P.frozen }}>reel</span></>}
          subtitle="Promotional edits, documentaries, and brand content — see the work in motion."
        />

        {/* Featured */}
        <Reveal delay={0.15}>
          <div className="mb-6">
            <VideoPlaceholder
              video={VIDEOS[0]}
              isFeatured
              playing={playing === VIDEOS[0].id}
              onToggle={() => setPlaying(playing === VIDEOS[0].id ? null : VIDEOS[0].id)}
            />
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {VIDEOS.slice(1).map((video, i) => (
            <Reveal key={video.id} delay={0.1 + i * 0.08}>
              <VideoPlaceholder
                video={video}
                playing={playing === video.id}
                onToggle={() => setPlaying(playing === video.id ? null : video.id)}
              />
            </Reveal>
          ))}
        </div>

        {/* Tip */}
        <Reveal delay={0.3}>
          <div className="mt-10 sm:mt-14 text-center">
            <Glass className="inline-block px-6 py-4">
              <p className="text-xs" style={{ color: P.soft }}>
                <span style={{ color: P.pacific }}>Tip:</span> Replace the{" "}
                <code
                  className="text-[11px] rounded px-1.5 py-0.5"
                  style={{ color: P.frozen, background: `${P.pacific}12` }}
                >
                  embed: null
                </code>{" "}
                values in <code className="text-[11px] rounded px-1.5 py-0.5" style={{ color: P.frozen, background: `${P.pacific}12` }}>src/lib/constants.ts</code> with YouTube or Vimeo embed URLs.
              </p>
            </Glass>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
