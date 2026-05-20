"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Play, Info, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import { VideoPreview } from "./video-preview";
import type { Project } from "@/lib/projects";

const ROTATE_MS = 7500;

export default function HeroBanner({ projects }: { projects: Project[] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || projects.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % projects.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, projects.length]);

  const p = projects[idx];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[85vh] min-h-[640px] w-full overflow-hidden"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={p.slug + "-bg"}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{ background: p.hero.gradient }}
        >
          {/* Poster always visible — video fades in on top */}
          {p.poster && (
            <img
              src={p.poster}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
          )}
          {p.preview && (
            <VideoPreview
              src={p.preview}
              poster={p.poster}
              mode="autoplay"
              active={!paused}
              className="object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,11,15,0.4)_60%,#0b0b0f_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* decorative geometric mark */}
      <motion.div
        key={p.slug + "-mark"}
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 0.12, rotate: 0 }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute right-[5%] top-[18%] h-[420px] w-[420px] rounded-[3rem] border-2"
        style={{ borderColor: p.hero.accent }}
      />
      <motion.div
        key={p.slug + "-mark2"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="pointer-events-none absolute right-[14%] top-[28%] h-[260px] w-[260px] rounded-[2rem]"
        style={{ background: p.hero.accent }}
      />

      <div className="relative z-10 flex h-full max-w-[1600px] flex-col justify-end px-6 pb-32 md:px-12 md:pb-40">
        <motion.div
          key={p.slug + "-meta"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 rounded-full bg-red" style={{ boxShadow: `0 0 12px ${p.hero.accent}` }} />
            {p.status === "live" ? "Now Streaming · Live" : "Shipped"}
          </span>
          <span className="text-faint">·</span>
          <span>{p.year}</span>
          <span className="text-faint">·</span>
          <span>{p.runtime}</span>
        </motion.div>

        <motion.h1
          key={p.slug + "-title"}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="display hero-shadow mt-3 max-w-4xl text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] tracking-tight"
        >
          {p.title}
        </motion.h1>

        <motion.p
          key={p.slug + "-tag"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="hero-shadow mt-4 max-w-2xl text-lg leading-snug text-text/95 md:text-2xl"
        >
          {p.tagline}
        </motion.p>

        <motion.p
          key={p.slug + "-one"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="hero-shadow mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base"
        >
          {p.oneLiner}
        </motion.p>

        <motion.div
          key={p.slug + "-cta"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2 rounded-md bg-text px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-all hover:bg-text/90"
            >
              <Play className="h-4 w-4 fill-bg" />
              Watch Live Demo
              <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          )}
          <Link
            href={`/watch/${p.slug}`}
            className="flex items-center gap-2 rounded-md bg-surface/80 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text backdrop-blur-md transition-all hover:bg-surface-2"
          >
            <Info className="h-4 w-4" />
            More Info
          </Link>
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-md border border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text/90 transition-all hover:border-white/20 hover:bg-white/5"
          >
            <GithubIcon className="h-4 w-4" />
            Code
          </a>
        </motion.div>
      </div>

      {/* slide indicators */}
      {projects.length > 1 && (
        <div className="absolute bottom-10 right-6 z-10 flex gap-1.5 md:right-12">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-[3px] w-12 overflow-hidden rounded-full bg-white/15"
            >
              {i === idx && !paused && (
                <motion.span
                  key={p.slug + i}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-text"
                />
              )}
              {i === idx && paused && <span className="absolute inset-0 bg-text" />}
              {i !== idx && <span className="absolute inset-0 bg-transparent transition-colors group-hover:bg-white/30" />}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
