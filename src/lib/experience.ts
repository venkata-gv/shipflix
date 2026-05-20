export type Experience = {
  org: string;
  role: string;
  dates: string;
  highlight: string;
};

export const EXPERIENCE: Experience[] = [
  {
    org: "CHiEAC",
    role: "AI & Data Science Fellow",
    dates: "Jul 2025 — Present",
    highlight:
      "Enterprise financial-risk AI: LLM + RAG pipelines, FastAPI microservices, SHAP explainability, AWS MLOps.",
  },
  {
    org: "DePaul University",
    role: "Machine Learning Consultant",
    dates: "Mar 2025 — Jun 2025",
    highlight:
      "Built LabelLanche GPT — RAG system enriching 200K+ CRM records via LangChain + OpenAI, Snowflake-integrated.",
  },
  {
    org: "Quari Ice",
    role: "Machine Learning Engineer",
    dates: "Jun 2024 — Mar 2025",
    highlight:
      "Demand forecasting & supply-chain ML across 150+ retail locations. Jenkins CI/CD + MLflow lifecycle.",
  },
  {
    org: "WNS Global Solutions",
    role: "Data Scientist",
    dates: "May 2021 — Jun 2023",
    highlight:
      "Predictive maintenance — regression ML cut unexpected production downtime 12%. Automated 40+ hrs/mo of manual reporting.",
  },
];
