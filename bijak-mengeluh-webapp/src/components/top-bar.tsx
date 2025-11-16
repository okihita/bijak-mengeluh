import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopBar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <PwaInstallPrompt />
      <ThemeToggle />
    </div>
  );
}
