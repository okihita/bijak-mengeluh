import { usePathname } from "next/navigation";
import Link from "next/link";
import { History, Home } from "lucide-react";

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:hidden z-50">
      <div className="flex justify-around h-12 items-center">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-0.5 text-xs ${pathname === "/" ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          <Home className="h-4 w-4" />
          <span>Complaint</span>
        </Link>
        <Link
          href="/history"
          className={`flex flex-col items-center justify-center gap-0.5 text-xs ${pathname === "/history" ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          <History className="h-4 w-4" />
          <span>History</span>
        </Link>
      </div>
    </div>
  );
}
