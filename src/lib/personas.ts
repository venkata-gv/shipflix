import type { Persona } from "./store";
import { Briefcase, Users, Code2, Rocket, type LucideIcon } from "lucide-react";

export type PersonaMeta = {
  id: Persona;
  label: string;
  pitch: string;
  icon: LucideIcon;
  gradient: string;
  ringColor: string;
};

export const PERSONAS: PersonaMeta[] = [
  {
    id: "recruiter",
    label: "Recruiter",
    pitch: "Resume + outcomes first",
    icon: Briefcase,
    gradient: "from-cyan-400 via-cyan-500 to-cyan-700",
    ringColor: "#5BE0E0",
  },
  {
    id: "hiring-manager",
    label: "Hiring Manager",
    pitch: "Architecture + trade-offs",
    icon: Users,
    gradient: "from-emerald-400 via-emerald-500 to-emerald-700",
    ringColor: "#34D399",
  },
  {
    id: "engineer",
    label: "Engineer",
    pitch: "Code + token economics",
    icon: Code2,
    gradient: "from-red-500 via-red-600 to-red-800",
    ringColor: "#E50914",
  },
  {
    id: "founder",
    label: "Founder",
    pitch: "ROI + ship-to-revenue",
    icon: Rocket,
    gradient: "from-amber-400 via-yellow-500 to-amber-700",
    ringColor: "#C9A961",
  },
];

export const getPersona = (id: Persona): PersonaMeta =>
  PERSONAS.find((p) => p.id === id) ?? PERSONAS[0];
