import { Briefcase, Cpu, Coins, type LucideIcon } from "lucide-react";

export type Pillar = {
  id: string;
  title: string;
  headline: string;
  body: string;
  evidence: string[];
  icon: LucideIcon;
  accent: string;
};

export const PILLARS: Pillar[] = [
  {
    id: "business",
    title: "Business-Fluent",
    headline: "MS Business Analytics. Translates ROI into systems.",
    body:
      "I don't build AI for the model leaderboard — I build it for the income statement. Comfortable in compliance reviews, finance reviews, and engineering reviews, often in the same week.",
    evidence: ["AI ROI Calculator", "DORA & MiFID II Compliance-as-Code"],
    icon: Briefcase,
    accent: "#C9A961",
  },
  {
    id: "shipper",
    title: "Full-Stack AI Shipper",
    headline: "Six shipped GenAI projects. Three live and deployed.",
    body:
      "Agents (SAROps), RAG (FilingsIQ), MCP (Data Port), Multi-Agent orchestration (EvidenceIQ), Compliance-as-Code (DORA). End-to-end: data → retrieval → reasoning → guardrails → UI → deploy.",
    evidence: ["6 projects", "3 live demos", "Across 5 AI patterns"],
    icon: Cpu,
    accent: "#E50914",
  },
  {
    id: "token-aware",
    title: "Token-Aware Engineer",
    headline: "Model routing as a product decision, not a default.",
    body:
      "Groq llama-3.1-8b for high-throughput retrieval ($0.05/1M, sub-2s P95). Claude Sonnet where a wrong fact is legal liability (EvidenceIQ). Gemini 2.5 Flash for playbook gen ($0.075/1M). Zero-API mock fallback for regulated-industry demos. Each choice is justified in the project's modal.",
    evidence: [
      "Cross-provider routing per use case",
      "Mock-mode fallbacks for regulated demos",
      "Cost-per-query surfaced on every project card",
    ],
    icon: Coins,
    accent: "#5BE0E0",
  },
];
