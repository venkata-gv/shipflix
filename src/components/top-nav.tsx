"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useShipFlix } from "@/lib/store";
import { getPersona, PERSONAS } from "@/lib/personas";
import { useState, useRef, useEffect } from "react";
import { Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopNav() {
  const persona = useShipFlix((s) => s.persona);
  const setPersona = useShipFlix((s) => s.setPersona);
  const reset = useShipFlix((s) => s.reset);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const current = persona ? getPersona(persona) : null;
  const CurrentIcon = current?.icon;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-white/5"
          : "bg-gradient-to-b from-bg/95 via-bg/60 to-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-10">
          <Link href="/browse" className="display select-none text-3xl tracking-tight">
            <span className="text-text">SHIP</span>
            <span className="text-red">F</span>
            <span className="text-text">LIX</span>
          </Link>
          <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:flex">
            <Link href="/browse" className="transition-colors hover:text-text">Browse</Link>
            <Link href="#why-me" className="transition-colors hover:text-text">Why Me</Link>
            <Link href="/about" className="transition-colors hover:text-text">About</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text transition-all hover:border-gold/50 hover:text-gold md:flex"
          >
            <Download className="h-3 w-3" />
            Resume
          </a>

          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-surface/80 p-1 pr-3 transition-colors hover:bg-surface-2"
              aria-label="Switch persona"
            >
              {current && CurrentIcon && (
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${current.gradient}`}
                >
                  <CurrentIcon className="h-4 w-4 text-white" />
                </span>
              )}
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-text md:inline">
                {current?.label ?? "Pick"}
              </span>
            </button>

            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-surface/95 p-2 shadow-2xl backdrop-blur-xl"
              >
                <div className="px-3 pb-2 pt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-faint">
                  Switch profile
                </div>
                {PERSONAS.map((p) => {
                  const Icon = p.icon;
                  const active = p.id === persona;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPersona(p.id);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                        active ? "bg-white/5" : "hover:bg-white/5",
                      )}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${p.gradient}`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </span>
                      <div className="flex-1">
                        <div className={cn("display text-base tracking-wide", active ? "text-gold" : "text-text")}>
                          {p.label}
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                          {p.pitch}
                        </div>
                      </div>
                    </button>
                  );
                })}
                <div className="my-1 border-t border-white/5" />
                <button
                  onClick={() => {
                    reset();
                    window.location.href = "/";
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  <RotateCcw className="h-3 w-3" />
                  Replay intro
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
