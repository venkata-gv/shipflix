"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = "SHIPFLIX".split("");

export default function BootIntro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 350);
    }, 1850);
    const skip = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape" && e.key !== "Enter" && e.key !== " ") return;
      clearTimeout(t);
      setVisible(false);
      setTimeout(onDone, 200);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          {/* red sweep */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.7, 1], ease: "easeInOut", delay: 0.5 }}
            className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-red"
            style={{ boxShadow: "0 0 24px #E50914, 0 0 64px #E50914" }}
          />

          <div className="relative flex items-end overflow-hidden px-6">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="display block text-[clamp(4rem,18vw,16rem)] leading-none"
                style={{
                  color: i === 4 ? "#E50914" : "#EDEDED",
                  textShadow: i === 4 ? "0 0 40px rgba(229,9,20,0.5)" : "none",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
          >
            Streaming production-grade AI
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute bottom-10 font-mono text-[10px] uppercase tracking-[0.25em] text-faint"
          >
            click or press any key to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
