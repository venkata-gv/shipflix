"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";
import type { Project } from "@/lib/projects";
import ProjectDetail from "./project-detail";

export default function ProjectModal({ project }: { project: Project }) {
  const router = useRouter();

  const close = () => router.back();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-8 w-full max-w-[1200px] overflow-hidden rounded-2xl bg-bg ring-1 ring-white/10"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="fixed right-6 top-6 z-[90] flex h-10 w-10 items-center justify-center rounded-full bg-bg/80 ring-1 ring-white/15 backdrop-blur-md transition-all hover:scale-105 hover:bg-bg"
          >
            <X className="h-5 w-5 text-text" />
          </button>
          <ProjectDetail project={project} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
