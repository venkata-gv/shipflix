"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Play, Info } from "lucide-react";
import { GithubIcon } from "./icons";
import { TokenEconChip } from "./token-econ-chip";
import { TechChip } from "./tech-chip";
import { VideoPreview } from "./video-preview";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project; index?: number }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const go = () => router.push(`/watch/${project.slug}`, { scroll: false });

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  };

  return (
    <div
      ref={cardRef}
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={onKey}
      aria-label={`Open ${project.title}`}
      className="group/card relative block min-w-[280px] shrink-0 cursor-pointer outline-none md:min-w-[340px] lg:min-w-[380px]"
    >
      <motion.article
        layoutId={`card-${project.slug}`}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-lg bg-surface ring-1 ring-white/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:z-20 group-hover/card:scale-[1.08] group-hover/card:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] group-hover/card:ring-white/15 group-focus-visible/card:scale-[1.08]"
      >
        <motion.div
          layoutId={`card-art-${project.slug}`}
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={{ background: project.hero.gradient }}
        >
          {/* Poster visible by default — replaced by video on hover */}
          {project.poster && (
            <img
              src={project.poster}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover/card:opacity-0"
            />
          )}
          {project.preview && (
            <VideoPreview
              src={project.preview}
              poster={project.poster}
              mode="hover"
              hoverTarget={cardRef}
            />
          )}
          {/* Accent decoration — only shown when no poster */}
          {!project.poster && (
            <>
              <div
                className="pointer-events-none absolute right-4 top-4 h-24 w-24 rounded-2xl border opacity-30"
                style={{ borderColor: project.hero.accent }}
              />
              <div
                className="pointer-events-none absolute right-8 top-8 h-16 w-16 rounded-xl opacity-20"
                style={{ background: project.hero.accent }}
              />
            </>
          )}

          {project.status === "live" && (
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md border border-gold/50 bg-bg/70 px-2 py-1 backdrop-blur-md">
              <span
                className="block h-1.5 w-1.5 animate-pulse rounded-full bg-gold"
                style={{ boxShadow: "0 0 8px #C9A961" }}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-soft">
                Live · Deployed
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/85 to-transparent px-4 pb-3 pt-16">
            <div
              className="display text-3xl leading-none tracking-tight md:text-4xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
            >
              {project.title}
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text/85">
              {project.tagline}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover/card:grid-rows-[1fr] group-focus-visible/card:grid-rows-[1fr] motion-reduce:!grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="space-y-3 border-t border-white/5 bg-surface px-4 pb-4 pt-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                <span>{project.year}</span>
                <span className="text-faint">·</span>
                <span>{project.runtime}</span>
                <span className="text-faint">·</span>
                <span className="text-text/85">{project.categories.join(" · ")}</span>
              </div>

              <p className="text-[13px] leading-snug text-text/90">{project.oneLiner}</p>

              <div className="flex flex-wrap gap-1.5">
                {project.metrics.slice(0, 3).map((m) => (
                  <TechChip
                    key={m.label}
                    flavor={m.flavor ?? "default"}
                    label={`${m.label}: ${m.value}`}
                  />
                ))}
              </div>

              <div className="pt-1">
                <TokenEconChip project={project} compact />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="flex h-8 items-center gap-1.5 rounded-md bg-text px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bg">
                  <Play className="h-3 w-3 fill-bg" />
                  {project.liveUrl ? "Watch" : "Open"}
                </span>
                <span className="flex h-8 items-center gap-1.5 rounded-md border border-white/15 bg-transparent px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text">
                  <Info className="h-3 w-3" />
                  Info
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.repoUrl, "_blank", "noopener");
                  }}
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-text/70 transition-colors hover:border-white/25 hover:text-text"
                  aria-label="View source on GitHub"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
