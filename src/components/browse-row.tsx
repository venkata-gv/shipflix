"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/projects";

export function BrowseRow({
  title,
  caption,
  projects,
}: {
  title: string;
  caption?: string;
  projects: Project[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scroller.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (projects.length === 0) return null;

  return (
    <section className="group/row relative py-5">
      <div className="mb-3 flex items-end justify-between px-6 md:px-12">
        <div>
          <h2 className="display text-2xl tracking-tight md:text-3xl">{title}</h2>
          {caption && (
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {caption}
            </div>
          )}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          {projects.length} {projects.length === 1 ? "title" : "titles"}
        </div>
      </div>

      <div className="relative">
        {canLeft && (
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-30 hidden h-[calc(100%-2rem)] w-12 -translate-y-1/2 items-center justify-center bg-gradient-to-r from-bg via-bg/80 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 md:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/80 ring-1 ring-white/10 transition-all hover:scale-110 hover:bg-bg">
              <ChevronLeft className="h-5 w-5 text-text" />
            </span>
          </button>
        )}
        {canRight && (
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-30 hidden h-[calc(100%-2rem)] w-12 -translate-y-1/2 items-center justify-center bg-gradient-to-l from-bg via-bg/80 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 md:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/80 ring-1 ring-white/10 transition-all hover:scale-110 hover:bg-bg">
              <ChevronRight className="h-5 w-5 text-text" />
            </span>
          </button>
        )}

        <div
          ref={scroller}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-6 pb-8 pt-1 [scroll-snap-type:x_mandatory] md:gap-4 md:px-12"
        >
          {projects.map((p, i) => (
            <div key={p.slug} className="[scroll-snap-align:start]">
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
