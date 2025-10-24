"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, XCircle } from "lucide-react";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const isStandaloneIOS =
      "standalone" in navigator &&
      (navigator as { standalone?: boolean }).standalone;
    // Check if already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      isStandaloneIOS
    ) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismissClick = () => {
    setIsVisible(false);
    // Optionally, you could store a flag in localStorage to prevent showing it again for a while
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 flex justify-center p-4 sm:bottom-4">
      <Alert className="max-w-md bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 shadow-lg">
        <Download className="h-4 w-4" />
        <AlertTitle>Install App</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Add this app to your home screen for quick access!</span>
          <div className="flex gap-2 ml-4">
            <Button
              onClick={handleInstallClick}
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Install
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismissClick}
              className="text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
