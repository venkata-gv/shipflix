"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useShipFlix } from "@/lib/store";
import { PERSONA_CONFIG } from "@/lib/rows";
import { PROJECTS } from "@/lib/projects";
import TopNav from "./top-nav";
import HeroBanner from "./hero-banner";
import { BrowseRow } from "./browse-row";
import { WhyMePanel } from "./why-me-panel";
import { TokenEconomicsRow } from "./token-economics-row";
import Footer from "./footer";
import KeyboardNav from "./keyboard-nav";

export default function BrowseShell() {
  const router = useRouter();
  const persona = useShipFlix((s) => s.persona);

  useEffect(() => {
    if (persona === null) router.replace("/");
  }, [persona, router]);

  const config = useMemo(() => (persona ? PERSONA_CONFIG[persona] : null), [persona]);
  const featured = useMemo(() => {
    if (!config) return [];
    return config.heroSlugs
      .map((slug) => PROJECTS.find((p) => p.slug === slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
  }, [config]);

  if (!persona || !config) {
    return <div className="min-h-screen bg-bg" />;
  }

  return (
    <main className="min-h-screen bg-bg">
      <KeyboardNav />
      <TopNav />
      <HeroBanner projects={featured} />
      <div className="relative z-20 -mt-24 space-y-2 pb-20 md:-mt-32">
        {config.showWhyMe && <WhyMePanel />}
        {config.rows.map((row) => (
          <BrowseRow key={row.id} title={row.title} caption={row.caption} projects={row.projects} />
        ))}
        {config.showTokenEconRow && <TokenEconomicsRow />}
      </div>
      <Footer />
    </main>
  );
}
