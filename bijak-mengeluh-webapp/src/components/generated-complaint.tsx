"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCopyToClipboard, useWebShare } from "@/lib/hooks";
import { Check, Spinner } from "@/components/icons";
import { Share, Instagram } from "lucide-react";

type GeneratedComplaintProps = {
  generatedText: string;
  isLoading: boolean;
  originalText: string;
  agency?: string;
};

const thinkingMessages = [
  "🤔 Membaca keluhan Anda...",
  "🔍 Mencari instansi yang tepat dari 121 pilihan...",
  "✍️ Menulis surat formal...",
  "🎩 Merapikan bahasa biar sopan...",
  "📝 Menambahkan 'Kepada Yth.'...",
  "🧐 Memastikan tidak ada typo...",
  "💼 Menyiapkan format resmi...",
  "🎯 Mencocokkan dengan database instansi...",
  "😤 Menerjemahkan kekesalan Anda...",
  "🎭 Mengubah 'anjir' jadi 'dengan hormat'...",
  "🧙 Menyulap rant jadi surat resmi...",
  "🚀 Hampir selesai...",
];

export const GeneratedComplaint = ({
  generatedText,
  isLoading,
  originalText,
  agency,
}: GeneratedComplaintProps) => {
  const { copied, copy } = useCopyToClipboard();
  const { share, shareAsImage } = useWebShare();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cycle through thinking messages
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % thinkingMessages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Reset message index when loading starts
  useEffect(() => {
    if (isLoading) {
      setCurrentMessageIndex(0);
    }
  }, [isLoading]);

  useEffect(() => {
    if (generatedText && !isLoading && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [generatedText, isLoading]);

  return (
    <>
      <Card ref={cardRef} className="shadow-xl dark:bg-card border-2 border-primary/20">
        <CardHeader className="space-y-4 pb-4 pt-6 px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <CardTitle className="text-xl font-bold">✨ Sudah Jadi!</CardTitle>
              <CardDescription className="text-sm">Salin & kirim ke instansi terkait</CardDescription>
            </div>
          </div>
          
          {generatedText && (
            <div className="flex gap-2 flex-wrap">
              <Button
                size="lg"
                onClick={() => copy(generatedText)}
                className="flex-1 sm:flex-none font-semibold min-w-[140px]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    📋 Salin
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => share(generatedText)}
                className="min-w-[100px]"
              >
                <Share className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={async () => {
                  setIsGeneratingImage(true);
                  try {
                    await shareAsImage(generatedText, agency);
                  } finally {
                    setIsGeneratingImage(false);
                  }
                }}
                disabled={isGeneratingImage}
                className="min-w-[110px]"
              >
                <Instagram className="h-4 w-4 mr-2" />
                {isGeneratingImage ? "Membuat..." : "Instagram"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowComparison(!showComparison)}
                className="min-w-[120px]"
              >
                {showComparison ? "Sembunyikan" : "Bandingkan"}
              </Button>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="px-6 pb-6 min-h-[200px]">
          {isLoading && (
            <div className="space-y-3 py-6">
              {thinkingMessages.slice(0, 4).map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ease-in-out ${
                    index === currentMessageIndex % 4
                      ? "text-blue-600 dark:text-blue-400 font-semibold scale-[1.02] translate-x-1"
                      : "text-gray-400 dark:text-gray-600 opacity-60"
                  }`}
                >
                  {index === currentMessageIndex % 4 ? (
                    <div className="relative">
                      <Spinner className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
                      <div className="absolute inset-0 h-5 w-5 animate-ping opacity-20">
                        <Spinner className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-5 w-5 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
                    </div>
                  )}
                  <span className="text-sm leading-relaxed">{msg}</span>
                </div>
              ))}
            </div>
          )}
          
          {generatedText && !showComparison && (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap m-0">
                {generatedText}
              </p>
            </div>
          )}
          
          {generatedText && showComparison && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Original</Badge>
                  <span className="text-xs text-gray-500">{originalText.length} karakter</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {originalText}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="text-xs">AI Generated</Badge>
                  <span className="text-xs text-gray-500">{generatedText.length} karakter</span>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {generatedText}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Komplain</DialogTitle>
          </DialogHeader>
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="whitespace-pre-wrap">{generatedText}</p>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <Button onClick={() => copy(generatedText)} size="sm">
                Salin
              </Button>
              <Button onClick={() => window.print()} size="sm" variant="outline">
                Print
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};