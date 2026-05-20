"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Persona = "recruiter" | "hiring-manager";

type State = {
  persona: Persona | null;
  bootSeen: boolean;
  soundEnabled: boolean;
  setPersona: (p: Persona) => void;
  markBootSeen: () => void;
  toggleSound: () => void;
  reset: () => void;
};

export const useShipFlix = create<State>()(
  persist(
    (set) => ({
      persona: null,
      bootSeen: false,
      soundEnabled: false,
      setPersona: (persona) => set({ persona }),
      markBootSeen: () => set({ bootSeen: true }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      reset: () => set({ persona: null, bootSeen: false }),
    }),
    { name: "shipflix-state", version: 2 },
  ),
);
