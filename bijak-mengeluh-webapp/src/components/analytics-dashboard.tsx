"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePersistentState } from "@/lib/hooks";

export function AnalyticsDashboard() {
  const [promptHistory] = usePersistentState<string[]>("promptHistory", []);

  if (promptHistory.length === 0) return null;

  const totalComplaints = promptHistory.length;
  const avgLength = Math.round(
    promptHistory.reduce((sum, p) => sum + p.length, 0) / promptHistory.length
  );

  // Calculate complaints per week (last 4 weeks)
  const now = new Date();
  const weeklyData = [0, 0, 0, 0];
  
  // Simple trend (just showing total for now since we don't store timestamps)
  const trend = totalComplaints > 5 ? "📈 Aktif" : totalComplaints > 2 ? "📊 Sedang" : "📉 Jarang";

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Analitik Lokal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold">{totalComplaints}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rata-rata</p>
            <p className="text-2xl font-bold">{avgLength}</p>
            <p className="text-xs text-gray-400">karakter</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Terpanjang</p>
            <p className="text-2xl font-bold">{Math.max(...promptHistory.map(p => p.length))}</p>
            <p className="text-xs text-gray-400">karakter</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Aktivitas</p>
            <p className="text-2xl font-bold">{trend}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
