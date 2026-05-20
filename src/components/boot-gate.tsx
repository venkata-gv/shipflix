"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BootIntro from "./boot-intro";
import ProfilePicker from "./profile-picker";
import { useShipFlix } from "@/lib/store";

export default function BootGate() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  const { persona, bootSeen, markBootSeen } = useShipFlix();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (bootSeen) setShowBoot(false);
    if (persona) router.replace("/browse");
  }, [hydrated, bootSeen, persona, router]);

  if (!hydrated) {
    return <div className="min-h-screen bg-bg" aria-hidden />;
  }

  if (persona) {
    return <div className="min-h-screen bg-bg" aria-hidden />;
  }

  if (showBoot) {
    return (
      <BootIntro
        onDone={() => {
          markBootSeen();
          setShowBoot(false);
        }}
      />
    );
  }

  return <ProfilePicker />;
}
