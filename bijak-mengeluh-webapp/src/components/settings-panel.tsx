"use client";

import { useState } from "react";
import { Settings, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [autoSave, setAutoSave] = useState(
    localStorage.getItem("autoSave") !== "false"
  );
  const [showConfidence, setShowConfidence] = useState(
    localStorage.getItem("showConfidence") === "true"
  );

  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSave(checked);
    localStorage.setItem("autoSave", checked.toString());
  };

  const handleConfidenceChange = (checked: boolean) => {
    setShowConfidence(checked);
    localStorage.setItem("showConfidence", checked.toString());
  };

  const handleReset = () => {
    if (confirm("Reset semua pengaturan ke default?")) {
      localStorage.removeItem("autoSave");
      localStorage.removeItem("showConfidence");
      localStorage.removeItem("preferredTone");
      setAutoSave(true);
      setShowConfidence(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-4 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>Pengaturan</CardTitle>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto-save draft</Label>
                  <input
                    id="auto-save"
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => handleAutoSaveChange(e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-confidence">
                    Tampilkan tingkat keyakinan AI
                  </Label>
                  <input
                    id="show-confidence"
                    type="checkbox"
                    checked={showConfidence}
                    onChange={(e) => handleConfidenceChange(e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full"
                >
                  Reset ke Default
                </Button>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>Pengaturan disimpan di browser Anda.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
