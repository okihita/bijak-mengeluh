"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { History, Home, Map } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Escape to clear focus
      if (e.key === "Escape") {
        (document.activeElement as HTMLElement)?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <header className="hidden sm:block sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg hover:text-primary transition-colors">
          Bijak Mengeluh
        </Link>
        <nav className="flex gap-2">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              pathname === "/"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Buat Keluhan</span>
          </Link>
          <Link
            href="/directory"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              pathname === "/directory"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <Map className="h-4 w-4" />
            <span className="text-sm font-medium">Direktori</span>
          </Link>
          <Link
            href="/history"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              pathname === "/history"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <History className="h-4 w-4" />
            <span className="text-sm font-medium">Riwayat</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
