"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ExternalLink, ArrowRight, Cpu } from "lucide-react";
import { GithubIcon } from "./icons";
import { TechChip } from "./tech-chip";
import { TokenEconChip } from "./token-econ-chip";
import { VideoPreview } from "./video-preview";
import { PROJECTS, type Project } from "@/lib/projects";

export default function ProjectDetail({
  project,
  standalone = false,
}: {
  project: Project;
  standalone?: boolean;
}) {
  const related = project.related
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p));

  return (
    <article className={standalone ? "pb-20" : ""}>
      {/* Hero panel */}
      <motion.div
        layoutId={`card-art-${project.slug}`}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[60vh] min-h-[420px] w-full overflow-hidden"
        style={{ background: project.hero.gradient }}
      >
        {project.preview && (
          <VideoPreview
            src={project.preview}
            poster={project.poster}
            mode="autoplay"
            active
            className="object-cover opacity-85"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,11,15,0.5)_70%,#0b0b0f_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/85 to-transparent" />

        <div
          className="pointer-events-none absolute right-[6%] top-[18%] h-[280px] w-[280px] rounded-[3rem] border-2 opacity-25"
          style={{ borderColor: project.hero.accent }}
        />
        <div
          className="pointer-events-none absolute right-[14%] top-[28%] h-[180px] w-[180px] rounded-[2rem] opacity-15"
          style={{ background: project.hero.accent }}
        />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            {project.status === "live" && (
              <span className="flex items-center gap-2">
                <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                <span className="text-gold-soft">Now Streaming · Live</span>
              </span>
            )}
            <span className="text-faint">·</span>
            <span>{project.year}</span>
            <span className="text-faint">·</span>
            <span>{project.runtime}</span>
            <span className="text-faint">·</span>
            <span className="text-text/80">{project.categories.join(" · ")}</span>
          </div>
          <h1 className="display hero-shadow mt-3 max-w-4xl text-[clamp(3rem,8vw,6rem)] leading-[0.92] tracking-tight">
            {project.title}
          </h1>
          <p className="hero-shadow mt-3 max-w-2xl text-lg text-text/95 md:text-2xl">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-md bg-text px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-all hover:bg-text/90"
              >
                <Play className="h-4 w-4 fill-bg" />
                Watch Live Demo
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 rounded-md border border-white/15 bg-surface/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text transition-all hover:border-white/30 hover:bg-surface"
            >
              <GithubIcon className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </motion.div>

      {/* Body */}
      <div className="mx-auto max-w-[1200px] px-6 pt-10 md:px-12">
        {/* Metrics strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg bg-surface/60 p-4 ring-1 ring-white/5 backdrop-blur-md"
            >
              <div
                className="display text-3xl tracking-tight"
                style={{
                  color:
                    m.flavor === "gold"
                      ? "#E2C887"
                      : m.flavor === "cyan"
                      ? "#5BE0E0"
                      : m.flavor === "red"
                      ? "#FF1F2D"
                      : "#EDEDED",
                }}
              >
                {m.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two-col layout: copy + token-econ panel */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <Section label="The Problem">
              <p className="text-base leading-relaxed text-text/90">{project.problem}</p>
            </Section>

            <Section label="The Approach">
              <ul className="space-y-2.5">
                {project.approach.map((step, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-text/90">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="The Outcome">
              <p className="text-base leading-relaxed text-text">{project.outcome}</p>
            </Section>

            <Section label="Architecture">
              <pre className="overflow-x-auto rounded-lg border border-white/5 bg-bg/60 p-4 font-mono text-[11px] leading-relaxed text-text/85">
                {project.architecture}
              </pre>
            </Section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* Why this model — the headline USP signal */}
            <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-soft">
                <Cpu className="h-3.5 w-3.5" />
                Why this model
              </div>
              <div className="mt-3">
                <TokenEconChip project={project} />
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-text/90">
                {project.tokenEcon.why}
              </p>
            </div>

            <div className="rounded-xl bg-surface/60 p-5 ring-1 ring-white/5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                Stack
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <TechChip key={s} label={s} />
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related row */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-white/5 pt-10">
            <div className="mb-4 flex items-end justify-between">
              <h3 className="display text-2xl tracking-tight md:text-3xl">More Like This</h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                {related.length} titles
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/watch/${r.slug}`}
                  scroll={false}
                  className="group block overflow-hidden rounded-lg bg-surface ring-1 ring-white/5 transition-all hover:ring-white/15"
                >
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden"
                    style={{ background: r.hero.gradient }}
                  >
                    <div
                      className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-2xl border opacity-25"
                      style={{ borderColor: r.hero.accent }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent px-3 pb-2 pt-10">
                      <div className="display text-xl leading-none tracking-tight">{r.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span className="text-[12px] text-text/85">{r.tagline}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-gold" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-soft">
        {label}
      </div>
      {children}
    </div>
  );
}
