"use client";

import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

export function TokenEconChip({ project, compact = false }: { project: Project; compact?: boolean }) {
  const econ = project.tokenEcon;
  return (
    <div
      className={cn(
        "group/te inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gradient-to-br from-gold/15 to-gold/5 px-2.5 py-1 backdrop-blur-sm",
        compact && "px-2 py-0.5",
      )}
      title={econ.why}
    >
      <Coins className={cn("text-gold", compact ? "h-3 w-3" : "h-3.5 w-3.5")} />
      <div className="flex flex-col leading-none">
        <span className={cn("font-mono uppercase tracking-[0.14em] text-gold-soft", compact ? "text-[9px]" : "text-[10px]")}>
          {econ.cost}
        </span>
        {!compact && (
          <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-gold/70">
            {econ.model}
          </span>
        )}
      </div>
    </div>
  );
}
