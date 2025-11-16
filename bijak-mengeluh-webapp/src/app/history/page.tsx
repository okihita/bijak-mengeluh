"use client";

import { Home, Trash2, Search, Copy, Edit, Calendar } from "lucide-react";
import Link from "next/link";
import { TopBar } from "@/components/top-bar";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePersistentState } from "@/lib/hooks";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";

export default function HistoryPage() {
  const [promptHistory, setPromptHistory] = usePersistentState<string[]>("promptHistory", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [swipedIndex, setSwipedIndex] = useState<number | null>(null);

  const filteredHistory = promptHistory.filter((prompt) =>
    prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedHistory = [...filteredHistory].reverse();
  if (sortOrder === "oldest") {
    sortedHistory.reverse();
  }

  const clearHistory = () => {
    if (confirm("Yakin mau hapus semua riwayat?")) {
      setPromptHistory([]);
    }
  };

  const deleteItem = (index: number) => {
    const actualIndex = promptHistory.length - 1 - index;
    setPromptHistory(promptHistory.filter((_, i) => i !== actualIndex));
    setSwipedIndex(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0];
    (e.currentTarget as HTMLElement).dataset.startX = touch.clientX.toString();
  };

  const handleTouchMove = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0];
    const startX = parseFloat((e.currentTarget as HTMLElement).dataset.startX || "0");
    const diff = touch.clientX - startX;
    
    if (diff < -50) {
      setSwipedIndex(index);
    } else if (diff > 50) {
      setSwipedIndex(null);
    }
  };

  const totalComplaints = promptHistory.length;
  const avgLength = promptHistory.length > 0
    ? Math.round(promptHistory.reduce((sum, p) => sum + p.length, 0) / promptHistory.length)
    : 0;

  return (
    <>
      <main className="container mx-auto p-4 sm:p-6 md:p-8 pb-16">
        <div className="w-full max-w-3xl mx-auto">
          <TopBar />

          <h1 className="text-3xl font-bold mb-6">Riwayat Komplain</h1>

          {/* Analytics Dashboard */}
          <AnalyticsDashboard />

          {/* Statistics Card */}
          {totalComplaints > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Statistik</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Komplain</p>
                  <p className="text-2xl font-bold">{totalComplaints}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rata-rata Panjang</p>
                  <p className="text-2xl font-bold">{avgLength} karakter</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filter */}
          {totalComplaints > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari komplain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortOrder === "newest" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOrder("newest")}
                >
                  Terbaru
                </Button>
                <Button
                  variant={sortOrder === "oldest" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOrder("oldest")}
                >
                  Terlama
                </Button>
                <Button variant="destructive" size="sm" onClick={clearHistory}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* History List */}
          {sortedHistory.length > 0 ? (
            <div className="space-y-3">
              {sortedHistory.map((prompt, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-md transition-all relative overflow-hidden"
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchMove={(e) => handleTouchMove(e, index)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-3">
                      <p className="text-sm flex-1 line-clamp-2">{prompt}</p>
                      <div className={`flex gap-1 transition-opacity ${swipedIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(prompt)}
                          title="Salin"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem(index)}
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {prompt.length} karakter
                      </Badge>
                    </div>
                  </CardContent>
                  {swipedIndex === index && (
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-red-500 flex items-center justify-center">
                      <Trash2 className="h-5 w-5 text-white" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : searchQuery ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Gak nemu komplain dengan kata "{searchQuery}"
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Belum ada riwayat komplain
                </p>
                <Link href="/">
                  <Button>Buat Komplain Pertama</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
