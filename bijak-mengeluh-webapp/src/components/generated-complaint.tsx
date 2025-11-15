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
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCopyToClipboard, useWebShare } from "@/lib/hooks";
import { Check } from "@/components/icons";
import { Share, Instagram } from "lucide-react";

type GeneratedComplaintProps = {
  generatedText: string;
  isLoading: boolean;
  originalText: string;
  ministry?: string;
};

export const GeneratedComplaint = ({
  generatedText,
  isLoading,
  originalText,
  ministry,
}: GeneratedComplaintProps) => {
  const { copied, copy } = useCopyToClipboard();
  const { share, shareAsImage } = useWebShare();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
        <CardHeader className="space-y-3 pb-3 pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold">✨ Sudah Jadi!</CardTitle>
              <CardDescription className="text-sm">Salin & kirim ke kementerian terkait</CardDescription>
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
                    await shareAsImage(generatedText, ministry);
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
        
        <CardContent className="p-4 min-h-[150px]">
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Original</Badge>
                  <span className="text-xs text-gray-500">{originalText.length} karakter</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {originalText}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="text-xs">AI Generated</Badge>
                  <span className="text-xs text-gray-500">{generatedText.length} karakter</span>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg border border-primary/20">
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