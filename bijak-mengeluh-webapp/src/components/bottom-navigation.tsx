import { usePathname } from "next/navigation";
import Link from "next/link";
import { History, Home, Map } from "lucide-react";

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:hidden z-50">
      <div className="flex justify-around h-16 items-center">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 text-xs ${pathname === "/" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          <Home className="h-5 w-5" />
          <span>Beranda</span>
        </Link>
        <Link
          href="/directory"
          className={`flex flex-col items-center justify-center gap-1 text-xs ${pathname === "/directory" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          <Map className="h-5 w-5" />
          <span>Direktori</span>
        </Link>
        <Link
          href="/history"
          className={`flex flex-col items-center justify-center gap-1 text-xs ${pathname === "/history" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          <History className="h-5 w-5" />
          <span>Riwayat</span>
        </Link>
      </div>
    </div>
  );
}
