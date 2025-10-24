"use client";

import { Home, Trash2 } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const usePersistentState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default function HistoryPage() {
  const [promptHistory, setPromptHistory] = usePersistentState<string[]>("promptHistory", []);

  const clearHistory = () => {
    setPromptHistory([]);
  };

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Complaint History</h1>
            {promptHistory.length > 0 && (
              <Button variant="destructive" onClick={clearHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            )}
          </div>

          {promptHistory.length > 0 ? (
            <ul className="space-y-4">
              {promptHistory.map((prompt, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm">
                  {prompt}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              You have no complaint history yet.
            </p>
          )}
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
