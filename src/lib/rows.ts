import type { Persona } from "./store";
import { PROJECTS, type Project } from "./projects";

export type Row = {
  id: string;
  title: string;
  caption?: string;
  projects: Project[];
};

const bySlug = (slugs: string[]): Project[] =>
  slugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p));

const RAG_RETRIEVAL = PROJECTS.filter((p) => p.categories.includes("rag"));
const AI_AGENTS = PROJECTS.filter((p) =>
  p.categories.some((c) => c === "agents" || c === "multi-agent"),
);
const BUSINESS = bySlug(["roi-calc", "data-port", "dora-mifid"]);

export type PersonaConfig = {
  heroSlugs: string[];
  rows: Row[];
  showWhyMe: boolean;
  showTokenEconRow: boolean;
};

const baseRows = {
  rag: {
    id: "rag",
    title: "RAG & Retrieval",
    caption: "Where vector search alone fails",
    projects: RAG_RETRIEVAL,
  },
  ai: {
    id: "ai",
    title: "AI Agents",
    caption: "Reasoning loops that actually ship",
    projects: AI_AGENTS,
  },
  business: {
    id: "biz",
    title: "Business Tools",
    caption: "ROI you can put in a deck",
    projects: BUSINESS,
  },
} as const;

export const PERSONA_CONFIG: Record<Persona, PersonaConfig> = {
  recruiter: {
    heroSlugs: ["filingsiq", "evidenceiq", "roi-calc"],
    rows: [baseRows.rag, baseRows.ai, baseRows.business],
    showWhyMe: true,
    showTokenEconRow: false,
  },
  "hiring-manager": {
    heroSlugs: ["sarops", "dora-mifid", "filingsiq"],
    rows: [baseRows.ai, baseRows.rag, baseRows.business],
    showWhyMe: true,
    showTokenEconRow: true,
  },
};
