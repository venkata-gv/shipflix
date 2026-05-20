import { cn } from "@/lib/utils";

export function TechChip({
  label,
  flavor = "default",
  className,
}: {
  label: string;
  flavor?: "default" | "gold" | "cyan" | "red";
  className?: string;
}) {
  const styles = {
    default: "border-white/10 bg-surface-2/60 text-text/85",
    gold: "border-gold/40 bg-gold/10 text-gold-soft",
    cyan: "border-cyan/30 bg-cyan/5 text-cyan",
    red: "border-red/40 bg-red/10 text-red-glow",
  }[flavor];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
        styles,
        className,
      )}
    >
      {label}
    </span>
  );
}
