"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PERSONAS, type PersonaMeta } from "@/lib/personas";
import { useShipFlix } from "@/lib/store";

export default function ProfilePicker() {
  const router = useRouter();
  const setPersona = useShipFlix((s) => s.setPersona);
  const [selecting, setSelecting] = useState<PersonaMeta | null>(null);

  const choose = (p: PersonaMeta) => {
    setSelecting(p);
    setPersona(p.id);
    setTimeout(() => router.push("/browse"), 650);
  };

  if (selecting) {
    const Icon = selecting.icon;
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-bg">
        <motion.div
          layoutId={`persona-${selecting.id}`}
          className={`flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br ${selecting.gradient} shadow-2xl`}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ scale: [1, 12], opacity: [1, 0] }}
            transition={{ delay: 0.35, duration: 0.4, ease: "easeIn" }}
            className="flex h-full w-full items-center justify-center"
          >
            <Icon className="h-14 w-14 text-white" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="display mb-2 text-center text-[clamp(2.5rem,6vw,5rem)] tracking-tight"
      >
        Who&apos;s Shipping Today?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-16 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
      >
        Pick a profile · the binge adapts to you
      </motion.p>

      <div className="grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
        {PERSONAS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => choose(p)}
              className="group relative flex flex-col items-center gap-4 outline-none"
            >
              <motion.div
                layoutId={`persona-${p.id}`}
                className={`relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} shadow-lg transition-all duration-300 group-hover:shadow-2xl md:h-40 md:w-40`}
                style={{
                  boxShadow: `0 0 0 0px ${p.ringColor}`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `0 0 0 3px ${p.ringColor}, 0 0 40px ${p.ringColor}55` }}
                />
                <Icon className="h-14 w-14 text-white md:h-16 md:w-16" strokeWidth={1.5} />
              </motion.div>
              <div className="text-center">
                <div className="display text-2xl tracking-wide text-text transition-colors group-hover:text-gold md:text-3xl">
                  {p.label}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {p.pitch}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
      >
        Built by Venkata Surendra Reddy G · gvsr32@gmail.com
      </motion.div>
    </div>
  );
}
