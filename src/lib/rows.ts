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

const TOP_PICKS = bySlug(["filingsiq", "evidenceiq", "dora-mifid", "sarops", "data-port", "roi-calc"]);
const LIVE_DEMOS = PROJECTS.filter((p) => p.status === "live");
const AGENTIC = PROJECTS.filter((p) =>
  p.categories.some((c) => c === "agents" || c === "multi-agent"),
);
const RAG_RETRIEVAL = PROJECTS.filter((p) => p.categories.includes("rag"));
const COMPLIANCE = PROJECTS.filter((p) => p.categories.includes("compliance"));
const BUSINESS = PROJECTS.filter((p) => p.categories.includes("business"));
const MCP_LAYER = PROJECTS.filter((p) => p.categories.includes("mcp"));

export type PersonaConfig = {
  heroSlugs: string[];
  rows: Row[];
  showWhyMe: boolean;
  showTokenEconRow: boolean;
};

const baseRows = {
  topPicks: { id: "top", title: "Top Picks", caption: "Hand-picked binge-worthy starts", projects: TOP_PICKS },
  live: { id: "live", title: "Now Streaming · Live Demos", caption: "Click → deployed, working", projects: LIVE_DEMOS },
  agentic: { id: "agentic", title: "Agentic Systems", caption: "Reasoning loops with guardrails", projects: AGENTIC },
  rag: { id: "rag", title: "Retrieval & RAG", caption: "Where vector search alone fails", projects: RAG_RETRIEVAL },
  compliance: { id: "comp", title: "Compliance & Governance", caption: "AI that auditors approve", projects: COMPLIANCE },
  mcp: { id: "mcp", title: "MCP & Tooling", caption: "Protocols, not pipelines", projects: MCP_LAYER },
  business: { id: "biz", title: "Business Tools", caption: "ROI you can put in a deck", projects: BUSINESS },
} as const;

export const PERSONA_CONFIG: Record<Persona, PersonaConfig> = {
  recruiter: {
    heroSlugs: ["evidenceiq", "filingsiq", "dora-mifid"],
    rows: [baseRows.live, baseRows.topPicks, baseRows.agentic, baseRows.rag, baseRows.business],
    showWhyMe: true,
    showTokenEconRow: false,
  },
  "hiring-manager": {
    heroSlugs: ["sarops", "data-port", "dora-mifid"],
    rows: [baseRows.agentic, baseRows.compliance, baseRows.mcp, baseRows.live, baseRows.rag],
    showWhyMe: true,
    showTokenEconRow: true,
  },
  engineer: {
    heroSlugs: ["filingsiq", "sarops", "data-port"],
    rows: [baseRows.rag, baseRows.agentic, baseRows.mcp, baseRows.live, baseRows.compliance],
    showWhyMe: false,
    showTokenEconRow: true,
  },
  founder: {
    heroSlugs: ["roi-calc", "evidenceiq", "filingsiq"],
    rows: [baseRows.business, baseRows.live, baseRows.compliance, baseRows.rag, baseRows.agentic],
    showWhyMe: true,
    showTokenEconRow: true,
  },
};
