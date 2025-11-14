"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (!mounted || !deferredPrompt) return <div className="h-9 w-9" />;

  return (
    <Button
      onClick={handleInstallClick}
      variant="outline"
      size="icon"
      className="h-9 w-9"
      title="Unduh aplikasi ini"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
};
