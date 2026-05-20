"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Mode = "hover" | "autoplay";

export function VideoPreview({
  src,
  poster,
  mode,
  active = false,
  className,
  hoverTarget,
}: {
  src: string;
  poster?: string;
  mode: Mode;
  active?: boolean;
  className?: string;
  /** For mode="hover": ref of the element whose hover/focus triggers playback. */
  hoverTarget?: React.RefObject<HTMLElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);

  // Autoplay mode (hero): start/stop based on `active`.
  useEffect(() => {
    if (mode !== "autoplay") return;
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, mode]);

  // Hover mode: wire pointer/focus events to the target element.
  useEffect(() => {
    if (mode !== "hover") return;
    const target = hoverTarget?.current;
    const v = videoRef.current;
    if (!target || !v) return;
    let playTimer: ReturnType<typeof setTimeout> | null = null;
    const play = () => {
      playTimer = setTimeout(() => {
        v.currentTime = 0;
        void v.play().catch(() => {});
      }, 180);
    };
    const pause = () => {
      if (playTimer) clearTimeout(playTimer);
      v.pause();
      v.currentTime = 0;
    };
    target.addEventListener("pointerenter", play);
    target.addEventListener("pointerleave", pause);
    target.addEventListener("focusin", play);
    target.addEventListener("focusout", pause);
    return () => {
      if (playTimer) clearTimeout(playTimer);
      target.removeEventListener("pointerenter", play);
      target.removeEventListener("pointerleave", pause);
      target.removeEventListener("focusin", play);
      target.removeEventListener("focusout", pause);
    };
  }, [mode, hoverTarget]);

  if (errored) return null;

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload={mode === "autoplay" ? "metadata" : "none"}
      poster={poster}
      onLoadedData={() => setReady(true)}
      onError={() => setErrored(true)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:!opacity-0",
        ready ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <source src={src} />
    </video>
  );
}
