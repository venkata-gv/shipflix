import type { Persona } from "./store";
import { Briefcase, Users, type LucideIcon } from "lucide-react";

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
];

export const getPersona = (id: Persona): PersonaMeta =>
  PERSONAS.find((p) => p.id === id) ?? PERSONAS[0];
