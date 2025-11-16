"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Onboarding() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setShow(true);
    }
  }, []);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("hasSeenOnboarding", "true");
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl">Selamat Datang di Bijak Mengeluh! 👋</CardTitle>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Apa yang bisa saya lakukan?</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✅ Mengubah keluhan kasual jadi surat formal</li>
              <li>✅ Menemukan instansi yang tepat (121 instansi tersedia)</li>
              <li>✅ Menyarankan kontak media sosial instansi</li>
              <li>✅ Membuat gambar untuk Instagram Story</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Apa yang TIDAK bisa saya lakukan?</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>❌ Mengirim keluhan langsung ke instansi</li>
              <li>❌ Melacak status keluhan Anda</li>
              <li>❌ Menjamin respons dari instansi</li>
            </ul>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Catatan:</strong> Hasil AI adalah draft. Harap tinjau sebelum mengirim. 
              Akurasi pencocokan instansi: ~100% untuk DKI Jakarta.
            </p>
          </div>

          <Button onClick={handleDismiss} className="w-full" size="lg">
            Mengerti, Mulai Sekarang
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
