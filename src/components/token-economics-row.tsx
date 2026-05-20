"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

const COST_DATA = [
  { slug: "data-port", cost: 0, label: "$0" },
  { slug: "filingsiq", cost: 0.05, label: "$0.05" },
  { slug: "roi-calc", cost: 0.075, label: "$0.075" },
  { slug: "dora-mifid", cost: 0.5, label: "$0.50" },
  { slug: "sarops", cost: 1.0, label: "varies" },
  { slug: "evidenceiq", cost: 3.0, label: "$3.00" },
];

const MAX = 3.0;

export function TokenEconomicsRow() {
  return (
    <section className="px-6 py-12 md:px-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-soft">
            The rare signal · Why I cost less per query
          </div>
          <h2 className="display mt-1 text-3xl tracking-tight md:text-4xl">
            Model Routing Decisions
          </h2>
          <p className="mt-2 max-w-xl font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Cost per 1M input tokens. Same problem, six choices, each justified.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-surface/60 p-6 ring-1 ring-white/5 backdrop-blur-md">
        <div className="space-y-3">
          {COST_DATA.map((d, i) => {
            const project = PROJECTS.find((p) => p.slug === d.slug);
            if (!project) return null;
            const pct = (d.cost / MAX) * 100;
            return (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="grid grid-cols-[140px_1fr_auto] items-center gap-4 md:grid-cols-[200px_1fr_auto]"
              >
                <Link
                  href={`/watch/${project.slug}`}
                  scroll={false}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-text/90 transition-colors hover:text-gold"
                >
                  {project.title}
                </Link>
                <div className="relative h-6 overflow-hidden rounded-md bg-bg/60 ring-1 ring-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(pct, 3)}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 rounded-md"
                    style={{ background: `linear-gradient(90deg, ${project.hero.accent}99, ${project.hero.accent}44)` }}
                  />
                  <div className="relative flex h-full items-center px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-text/90">
                    {project.tokenEcon.model}
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] uppercase tracking-[0.18em] text-gold-soft">
                  {d.label}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-6 border-t border-white/5 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          $0 · MCP / governance layer  ·  $0.05–0.50 · throughput tier  ·  $3+ · quality-critical tier
        </div>
      </div>
    </section>
  );
}
