export type Category =
  | "rag"
  | "agents"
  | "mcp"
  | "compliance"
  | "business"
  | "multi-agent";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  oneLiner: string;
  year: number;
  runtime: string;
  status: "live" | "shipped" | "demo";
  liveUrl?: string;
  repoUrl: string;
  hero: { gradient: string; accent: string };
  /** Optional looping muted trailer. Drop a file at public/projects/{slug}/preview.webm,
   *  then set preview: "/projects/{slug}/preview.webm" here. Falls back to the gradient
   *  hero when absent. Recommended: 1280x720, 8-12s, .webm (VP9) or .mp4 (H.264). */
  preview?: string;
  /** Optional poster frame shown while video loads / when paused. */
  poster?: string;
  categories: Category[];
  stack: string[];
  tokenEcon: {
    model: string;
    cost: string;
    why: string;
  };
  problem: string;
  approach: string[];
  outcome: string;
  metrics: { label: string; value: string; flavor?: "gold" | "cyan" | "red" }[];
  architecture: string;
  related: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "filingsiq",
    title: "FilingsIQ",
    tagline: "Structure-aware RAG that beats naive vector search on 10-Ks",
    oneLiner:
      "Cross-year SEC 10-K trend analyzer proving table-aware retrieval beats naive vector RAG by 40pp.",
    year: 2025,
    runtime: "8 min read",
    status: "live",
    liveUrl: "https://filingsiq.vercel.app",
    repoUrl: "https://github.com/surendra-gvsr/sec-analyzer",
    preview: "/projects/filingsiq/preview.webm",
    poster: "/projects/filingsiq/poster.webp",
    hero: {
      gradient:
        "radial-gradient(ellipse at 30% 25%, #059669 0%, #064E3B 45%, #0B0B0F 100%), linear-gradient(135deg, #047857 0%, #022C22 50%, #0B0B0F 100%)",
      accent: "#10B981",
    },
    categories: ["rag"],
    stack: [
      "FastAPI",
      "LlamaIndex 0.12",
      "Pinecone Serverless",
      "Groq Cloud",
      "fastembed (ONNX)",
      "flashrank",
      "LlamaParse",
      "Next.js 14",
      "Fly.io",
    ],
    tokenEcon: {
      model: "Groq llama-3.1-8b-instant",
      cost: "$0.05 / $0.08 per 1M",
      why: "Sub-2s P95 synthesis. Chose Groq's speed-first inference over GPT-4 — 60× cheaper, 8× faster, and the gap on financial-domain reasoning was inside our eval noise floor.",
    },
    problem:
      "Apple's & Microsoft's 10-K filings hide critical signals in tables — segment revenue, R&D spend, contractual obligations. Naive vector RAG splits these tables mid-row at 512 tokens, destroying the row context an analyst needs.",
    approach: [
      "Table-aware chunking: every table is one chunk, never split mid-row, with row+column headers preserved in metadata",
      "HyDE rewrite to expand sparse user queries into dense hypothetical answers",
      "Hybrid retrieval: vector top-40 + BM25 top-40 → Reciprocal Rank Fusion → flashrank cross-encoder rerank to top-8",
      "Groq llama-3.1-8b synthesis with citation-required prompting",
      "Cross-year diff prompt template surfaces Δ%, YoY trends, and inflection points",
    ],
    outcome:
      "+40pp Table Retrieval Accuracy, +28pp Answer Correctness Score over naive 512-token RAG baseline — measured on a 60-question eval set of analyst-style 10-K questions.",
    metrics: [
      { label: "Table Retrieval Acc.", value: "+40pp", flavor: "gold" },
      { label: "Answer Correctness", value: "+28pp", flavor: "gold" },
      { label: "P95 Synthesis", value: "<2s", flavor: "cyan" },
      { label: "$ / 1M tokens", value: "$0.05", flavor: "cyan" },
    ],
    architecture:
      "User query → HyDE rewrite → [Pinecone vector top-40 ∥ BM25 top-40] → RRF fusion → flashrank rerank top-8 → Groq llama-3.1-8b synthesis with citations → answer + source rows",
    related: ["evidenceiq", "dora-mifid", "data-port"],
  },
  {
    slug: "evidenceiq",
    title: "EvidenceIQ",
    tagline: "AI-powered claims evidence platform for adjusters & SIU",
    oneLiner:
      "Multi-agent system that turns scattered claim documents into defensible PDF evidence packets — built with a 5-agent Claude Code architecture.",
    year: 2025,
    runtime: "6 min read",
    status: "live",
    liveUrl: "https://evidenceiq-psi.vercel.app",
    repoUrl: "https://github.com/surendra-gvsr/my-project-ui",
    preview: "/projects/evidenceiq/preview.webm",
    poster: "/projects/evidenceiq/poster.webp",
    hero: {
      gradient:
        "radial-gradient(ellipse at 70% 30%, #2563EB 0%, #1E3A5F 45%, #0B0B0F 100%), linear-gradient(135deg, #1D4ED8 0%, #0F1B2D 50%, #0B0B0F 100%)",
      accent: "#60A5FA",
    },
    categories: ["multi-agent"],
    stack: [
      "Next.js 15",
      "TypeScript",
      "shadcn/ui",
      "Tailwind CSS",
      "Claude AI API",
      "@react-pdf/renderer",
      "Rate limiting + input validation",
    ],
    tokenEcon: {
      model: "Claude Sonnet (highest quality tier)",
      cost: "$3 / $15 per 1M",
      why: "Adjuster-facing artifacts are legal evidence. The cost of a wrong fact in a deposition dwarfs the cost of a more expensive model — quality bias is justified here, unlike in the cheap-rerank cases.",
    },
    problem:
      "Claims adjusters and SIU investigators spend 4–8 hours per case assembling evidence — manually extracting facts, dates, people, and dollar amounts from PDFs/images/notes, then formatting a defensible packet for opposing counsel review.",
    approach: [
      "Multi-agent Claude Code build: Orchestrator + backend agent + frontend agent + code-reviewer agent + Playwright E2E tester",
      "Claude API document intelligence extracts entities, dates, amounts; each fact source-linked back to its document",
      "Chronological evidence timeline auto-generated from extracted dates",
      "@react-pdf/renderer produces professional packet with cover page, TOC, claim summary, citation appendix",
    ],
    outcome:
      "End-to-end: upload mixed media → AI extraction → source-linked timeline → downloadable evidence PDF. Multi-agent build pattern itself is a portfolio artifact for any FDE role requiring orchestration.",
    metrics: [
      { label: "Agents", value: "5", flavor: "gold" },
      { label: "File types", value: "PDF · IMG · TXT", flavor: "cyan" },
      { label: "Output", value: "Defensible PDF", flavor: "cyan" },
    ],
    architecture:
      "Upload → Claude API entity+timeline extraction → source-linking → React-PDF render → downloadable evidence packet",
    related: ["sarops", "filingsiq", "dora-mifid"],
  },
  {
    slug: "dora-mifid",
    title: "DORA & MiFID II",
    tagline: "Agentic RAG that maps ICT controls to EU regulation in real time",
    oneLiner:
      "Compliance-as-code: ReAct agent + PII Kill-Switch + SHA-256 forensic snapshots — purpose-built for EU financial regulation.",
    year: 2025,
    runtime: "9 min read",
    status: "live",
    liveUrl: "https://dora-mifid-compliance.vercel.app",
    repoUrl: "https://github.com/surendra-gvsr/dora-mifid-compliance",
    preview: "/projects/dora-mifid/preview.webm",
    poster: "/projects/dora-mifid/poster.webp",
    hero: {
      gradient:
        "radial-gradient(ellipse at 50% 0%, #7C3AED 0%, #312E81 45%, #0B0B0F 100%), linear-gradient(135deg, #6D28D9 0%, #1E1B4B 50%, #0B0B0F 100%)",
      accent: "#A78BFA",
    },
    categories: ["rag", "agents", "compliance"],
    stack: [
      "Python 3.11+",
      "FastAPI",
      "SQLAlchemy",
      "PyJWT",
      "Gemini API",
      "Zero-API mock mode",
      "Vercel",
    ],
    tokenEcon: {
      model: "Gemini Pro · zero-API mock fallback",
      cost: "$0.50 / $1.50 per 1M (paid) · $0 (mock)",
      why: "Auditor-safe demo mode runs the whole flow with no API key — critical for regulated-industry sales pitches where the prospect can't enable outbound LLM calls during the trial. Same product, two modes.",
    },
    problem:
      "EU financial firms must map ICT security controls to DORA Articles 5/6/7/9/11/17 and MiFID II Art. 16. Today this is a manual quarterly exercise — error-prone, lacks audit trail, and PII frequently leaks into LLM context.",
    approach: [
      "ReAct agent loop reasons over an ICT controls database against regulation text",
      "PII Kill-Switch blocks or anonymizes sensitive data in-flight before it ever reaches the LLM",
      "Every analysis produces a SHA-256-signed forensic snapshot — tamper-proof, timestamped, auditor-ready",
      "Role-based PII clearance matrix: ANALYST / COMPLIANCE_OFFICER / DPO see different fields",
      "Gap analysis + compliance scoring per regulation article",
    ],
    outcome:
      "Auditor-ready forensic snapshots replace manual quarterly mapping. Three roles see appropriately-fenced views. Demo runs without an API key.",
    metrics: [
      { label: "DORA articles", value: "6", flavor: "gold" },
      { label: "PII fence", value: "In-flight", flavor: "red" },
      { label: "Snapshot hash", value: "SHA-256", flavor: "cyan" },
      { label: "Demo cost", value: "$0", flavor: "cyan" },
    ],
    architecture:
      "Controls DB + Regulation corpus → ReAct agent → PII Kill-Switch (in-flight) → Gemini reasoning → gap-analysis output → SHA-256 forensic snapshot ledger",
    related: ["data-port", "sarops", "filingsiq"],
  },
  {
    slug: "sarops",
    title: "SAROps Agent",
    tagline: "Agentic AML investigation workbench with human-review gate",
    oneLiner:
      "7-step agentic workflow turning fragmented KYC + transaction + sanctions data into reviewer-ready SAR drafts — automated investigation, never automated filing.",
    year: 2025,
    runtime: "11 min read",
    status: "shipped",
    repoUrl: "https://github.com/surendra-gvsr/sarops-agent",
    preview: "/projects/sarops/preview.webm",
    poster: "/projects/sarops/poster.webp",
    hero: {
      gradient:
        "radial-gradient(ellipse at 20% 80%, #DC2626 0%, #7F1D1D 45%, #0B0B0F 100%), linear-gradient(135deg, #B91C1C 0%, #450A0A 50%, #0B0B0F 100%)",
      accent: "#F87171",
    },
    categories: ["agents"],
    stack: [
      "Python 3.11+",
      "FastAPI",
      "Pydantic v2",
      "NetworkX",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Recharts",
      "Docker Compose",
      "Postgres",
      "Neo4j",
    ],
    tokenEcon: {
      model: "Structured outputs (Pydantic schemas) over any LLM",
      cost: "Model-agnostic",
      why: "In regulated AML, explainability > raw model capability. Pydantic-typed structured outputs let any provider plug in, every reasoning step is auditable, and graph reasoning happens in NetworkX/Neo4j (deterministic) rather than the LLM (probabilistic).",
    },
    problem:
      "AML investigators drown in fragmented data — KYC profiles, transactions, sanctions hits, adverse media — with no defensible audit trail. SAR drafts take hours and inconsistency across analysts creates regulatory exposure.",
    approach: [
      "Step 1 — Triage: ingest synthetic KYC + transactions + sanctions/PEP + adverse media",
      "Step 2 — Entity Resolution: deduplicate and link parties across sources",
      "Step 3 — Transaction Graph: NetworkX graph reasoning surfaces layering & smurfing patterns",
      "Step 4 — Typology Detection: classify against AML typology library",
      "Step 5 — Evidence Assembly: source-linked evidence packet",
      "Step 6 — SAR Draft: structured narrative generation",
      "Step 7 — Human Review Gate: HARD STOP — no automated filing decisions, ever",
    ],
    outcome:
      "Reviewer-ready investigation packets + SAR-style draft narratives. The human-review gate is the headline design choice: this is what a regulated AI system looks like.",
    metrics: [
      { label: "Workflow steps", value: "7", flavor: "gold" },
      { label: "Filing gate", value: "Human-only", flavor: "red" },
      { label: "Graph engine", value: "NetworkX + Neo4j", flavor: "cyan" },
    ],
    architecture:
      "Synthetic data → Triage → Entity Res → NetworkX Tx Graph → Typology → Evidence → SAR Draft → 🛑 Human Review Gate (no auto-file)",
    related: ["dora-mifid", "data-port", "evidenceiq"],
  },
  {
    slug: "data-port",
    title: "Enterprise Data Port",
    tagline: "MCP server with HMAC-fenced PII and full audit ledger",
    oneLiner:
      "Governed Model Context Protocol gateway exposing enterprise data to agents — PII fenced at the transport boundary, every read/write logged to a tamper-evident ledger.",
    year: 2025,
    runtime: "7 min read",
    status: "shipped",
    repoUrl: "https://github.com/surendra-gvsr/unified-enterprise-data-port",
    hero: {
      gradient:
        "radial-gradient(ellipse at 75% 75%, #0891B2 0%, #164E63 45%, #0B0B0F 100%), linear-gradient(135deg, #0E7490 0%, #083344 50%, #0B0B0F 100%)",
      accent: "#22D3EE",
    },
    categories: ["mcp", "compliance"],
    stack: [
      "Python 3.11+",
      "MCP SDK",
      "SQLite (operational + audit)",
      "Docker",
      "HMAC PII fencing",
    ],
    tokenEcon: {
      model: "No LLM cost — pure governance layer",
      cost: "$0 / 1M tokens",
      why: "Token-aware engineering isn't just choosing the cheapest model — it's knowing when not to use an LLM at all. PII fencing, audit logging, and HMAC tokenization are deterministic primitives. Putting them in front of every agent call is what makes enterprise AI deployable.",
    },
    problem:
      "AI agents pulling from CRM/warehouse leak PII, lack a write audit trail, and silently fail policy checks. Compliance teams won't approve agentic deployments without a defensible governance layer.",
    approach: [
      "Exposes enterprise tables to agents as MCP tools: list_exposed_tables, read_records, safe_select, update_record, create_customer_interaction",
      "Direct identifiers (email/phone/SSN) become HMAC tokens at the transport boundary — agents see opaque IDs, never raw values",
      "Free-text payloads scanned for PII patterns and redacted before exiting the boundary",
      "Every read/write logged to a separate audit ledger DB: source, destination, fields touched, PII categories, policy decision",
      "Writes blocked on PII columns or PII-containing payloads",
      "Inspection tools: recent_data_flows, data_flow_summary, data_lineage_graph",
    ],
    outcome:
      "Agents get a governed, auditable gateway into enterprise data. Compliance gets a tamper-evident ledger. The boundary itself is the product.",
    metrics: [
      { label: "MCP tools", value: "8", flavor: "gold" },
      { label: "PII strategy", value: "HMAC tokens", flavor: "red" },
      { label: "Audit ledger", value: "Separate DB", flavor: "cyan" },
    ],
    architecture:
      "Agent → MCP tool call → PII Fence (HMAC tokens + redaction) → Operational DB ↔ Audit Ledger DB → policy decision → response",
    related: ["dora-mifid", "sarops", "evidenceiq"],
  },
  {
    slug: "roi-calc",
    title: "AI ROI Calculator",
    tagline: "Day-by-day burndown of building AI vs. keeping employees",
    oneLiner:
      "Business decision tool that models 4 scenarios, generates a 6–8 phase rollout playbook, and falls back to a bundled sample when no key is set.",
    year: 2025,
    runtime: "5 min read",
    status: "live",
    liveUrl: "https://ai-roi-calculator-fawn.vercel.app",
    repoUrl: "https://github.com/surendra-gvsr/ai-roi-calculator",
    preview: "/projects/roi-calc/preview.webm",
    poster: "/projects/roi-calc/poster.webp",
    hero: {
      gradient:
        "radial-gradient(ellipse at 40% 70%, #D97706 0%, #78350F 45%, #0B0B0F 100%), linear-gradient(135deg, #B45309 0%, #451A03 50%, #0B0B0F 100%)",
      accent: "#FBBF24",
    },
    categories: ["business"],
    stack: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Gemini 2.5 Flash",
      "Zod",
      "Vitest",
    ],
    tokenEcon: {
      model: "Gemini 2.5 Flash",
      cost: "~$0.075 / $0.30 per 1M",
      why: "Cheapest serious LLM for playbook generation — and the no-key fallback to a bundled sample playbook means the demo never costs the user a cent. Token-aware product design, not just token-aware engineering.",
    },
    problem:
      "Business leaders can't quantify the day-by-day tradeoff between 'build AI' and 'keep / hire employees.' Spreadsheets exist but don't surface the break-even point or generate a rollout plan.",
    approach: [
      "4 scenarios: Replace 1 employee · Augment a team · Avoid a future hire · Reduce errors",
      "Cumulative cost burndown chart with break-even reference line (Recharts)",
      "Gemini 2.5 Flash generates a 6–8 phase rollout playbook (Week 1 → Month 6+) with cost, owner, and risks per phase",
      "Falls back to a built-in sample playbook if no API key is set — demo always works",
      "Zod-validated inputs, Vitest unit tests",
    ],
    outcome:
      "Decision-maker plugs in headcount + AI cost assumptions, sees instant burndown + a defensible rollout playbook in one screen.",
    metrics: [
      { label: "Scenarios", value: "4", flavor: "gold" },
      { label: "Playbook phases", value: "6–8", flavor: "cyan" },
      { label: "Demo cost", value: "$0 (mock)", flavor: "cyan" },
    ],
    architecture:
      "Inputs (Zod) → scenario engine → Recharts burndown + Gemini 2.5 Flash playbook gen (or bundled sample fallback)",
    related: ["dora-mifid", "evidenceiq", "filingsiq"],
  },
];

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "rag", label: "RAG" },
  { id: "agents", label: "Agents" },
  { id: "multi-agent", label: "Multi-Agent" },
  { id: "mcp", label: "MCP" },
  { id: "compliance", label: "Compliance" },
  { id: "business", label: "Business" },
];
