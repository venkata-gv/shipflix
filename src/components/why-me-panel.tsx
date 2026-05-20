"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/pillars";

export function WhyMePanel() {
  return (
    <section id="why-me" className="px-6 py-10 md:px-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-soft">
            Why this candidate · Why now
          </div>
          <h2 className="display mt-1 text-3xl tracking-tight md:text-4xl">
            Three Things I Bring You
          </h2>
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-faint md:block">
          The FDE / AI Engineer Profile
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-xl bg-surface/70 p-6 ring-1 ring-white/5 backdrop-blur-md transition-colors hover:ring-white/15"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                style={{ background: p.accent }}
              />
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg ring-1"
                  style={{ background: `${p.accent}1A`, color: p.accent, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Pillar {i + 1}
                </div>
              </div>
              <h3 className="display mt-4 text-2xl leading-none tracking-tight" style={{ color: p.accent }}>
                {p.title}
              </h3>
              <div className="mt-1 text-sm text-text">{p.headline}</div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{p.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.evidence.map((e) => (
                  <span
                    key={e}
                    className="rounded-md border border-white/10 bg-bg/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text/80"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
