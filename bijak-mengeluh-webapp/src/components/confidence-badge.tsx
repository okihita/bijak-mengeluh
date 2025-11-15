"use client";

import { Badge } from "@/components/ui/badge";
import { HelpTooltip } from "@/components/help-tooltip";

type ConfidenceBadgeProps = {
  confidence?: number; // 0-100
};

export function ConfidenceBadge({ confidence = 95 }: ConfidenceBadgeProps) {
  const showConfidence = typeof window !== "undefined" && 
    localStorage.getItem("showConfidence") === "true";

  if (!showConfidence) return null;

  const getColor = (conf: number) => {
    if (conf >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    if (conf >= 70) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  };

  const getLabel = (conf: number) => {
    if (conf >= 90) return "Tinggi";
    if (conf >= 70) return "Sedang";
    return "Rendah";
  };

  return (
    <div className="flex items-center gap-2">
      <Badge className={getColor(confidence)}>
        Keyakinan: {getLabel(confidence)} ({confidence}%)
      </Badge>
      <HelpTooltip 
        content="Tingkat keyakinan AI dalam pencocokan instansi. Tinggi (>90%) = sangat yakin, Sedang (70-90%) = cukup yakin, Rendah (<70%) = perlu verifikasi manual."
        side="right"
      />
    </div>
  );
}
