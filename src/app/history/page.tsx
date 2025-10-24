"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function HistoryPage() {
  return (
    <>
      <main className="container mx-auto p-4 sm:p-6 md:p-8 pb-16">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex justify-end items-center mb-4">
            {/* Desktop navigation link */}
            <div className="hidden sm:block mr-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
              >
                <Home className="h-5 w-5" />
                Complaint
              </Link>
            </div>
            <ThemeToggle />
          </div>
          <h1 className="text-3xl font-bold text-center">History Page</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            This is where your complaint history will be displayed.
          </p>
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
