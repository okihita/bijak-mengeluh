import { usePathname } from "next/navigation";
import Link from "next/link";
import { History, Home, Map } from "lucide-react";

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border sm:hidden z-50">
      <div className="flex justify-around h-16 items-center">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 text-xs ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Home className="h-5 w-5" />
          <span>Beranda</span>
        </Link>
        <Link
          href="/directory"
          className={`flex flex-col items-center justify-center gap-1 text-xs ${pathname === "/directory" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Map className="h-5 w-5" />
          <span>Direktori</span>
        </Link>
        <Link
          href="/history"
          className={`flex flex-col items-center justify-center gap-1 text-xs ${pathname === "/history" ? "text-primary" : "text-muted-foreground"}`}
        >
          <History className="h-5 w-5" />
          <span>Riwayat</span>
        </Link>
      </div>
    </div>
  );
}
