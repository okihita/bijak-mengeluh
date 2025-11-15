"use client";

import { FormEvent, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/icons";
import { complaintTemplates } from "@/lib/templates";
import { scoreComplaint } from "@/lib/scorer";

type ComplaintFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  userInput: string;
  setUserInput: (value: string) => void;
  isLoading: boolean;
  lastSaved: Date | null;
  isSaving: boolean;
  tone: string;
  setTone: (tone: string) => void;
};

const placeholderHints = [
  "Jalan rusak? Lampu mati? Sampah menumpuk? Tulis aja di sini...",
  "Contoh: Trotoar depan kampus rusak, bahaya buat pejalan kaki",
  "Ketik apa adanya. Nanti AI yang rapikan biar sopan 😎",
  "Komplain yang jelas = lebih cepat ditanggapi. Yuk mulai!",
  "Tidak usah mikir format. Tulis aja masalahnya, beres.",
  "Dari keluhan jadi solusi dalam 30 detik. Coba sekarang!",
  "Kamu punya suara. Kamu punya hak. Gunakan sekarang.",
  "Satu keluhan kamu bisa ubah lingkungan. Mulai dari sini.",
];

export const ComplaintForm = ({
  handleSubmit,
  userInput,
  setUserInput,
  isLoading,
  lastSaved,
  isSaving,
  tone,
  setTone,
}: ComplaintFormProps) => {
  const [mounted, setMounted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [placeholderText, setPlaceholderText] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const charCount = userInput.trim().length;
  const minChars = 20;
  const isTooShort = charCount <= minChars;
  const progress = Math.min((charCount / 200) * 100, 100);
  
  // Calculate quality score
  const qualityScore = charCount > minChars ? scoreComplaint(userInput) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    // Stop animation if user is typing
    if (userInput.length > 0) {
      setPlaceholderText("");
      return;
    }

    const currentHint = placeholderHints[hintIndex];
    
    if (isTyping) {
      // Typing phase
      if (charIndex < currentHint.length) {
        const timeout = setTimeout(() => {
          setPlaceholderText(currentHint.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 40); // Faster typing: 60ms → 40ms
        return () => clearTimeout(timeout);
      } else {
        // Pause after completion
        const timeout = setTimeout(() => {
          setIsTyping(false);
          setCharIndex(currentHint.length);
        }, 2000); // Stay for 2 seconds
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting phase
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setPlaceholderText(currentHint.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 20); // Faster backspace: 30ms → 20ms
        return () => clearTimeout(timeout);
      } else {
        // Move to next hint
        const timeout = setTimeout(() => {
          setHintIndex((hintIndex + 1) % placeholderHints.length);
          setIsTyping(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isTyping, hintIndex, userInput.length]);

  const handleTemplateSelect = useCallback((template: string) => {
    setUserInput(template);
    setShowSuggestions(false);
  }, [setUserInput]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value;
    
    // Auto-capitalize first letter of sentences
    text = text.replace(/(^\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
    
    setUserInput(text);
    if (text.length > 10) {
      setShowSuggestions(false);
    }
  }, [setUserInput]);

  return (
    <Card className="shadow-lg dark:bg-card">
      <CardHeader className="text-center pb-4 pt-6 px-6">
        <CardTitle className="text-2xl font-bold">Curhatin Aja Keluhanmu</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">AI rapikan bahasa & tunjukkan kontak yang tepat 🎯</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-6 pb-6">
          
          {/* Main Textarea - Most Important Element */}
          <div className="relative">
            <Textarea
              id="complaint-description"
              placeholder={placeholderText}
              className="min-h-[120px] text-base resize-none focus:ring-2 focus:ring-primary/50 leading-relaxed"
              value={userInput}
              onChange={handleTextChange}
              disabled={isLoading}
              aria-label="Tulis keluhan Anda di sini"
              aria-describedby="char-count quality-feedback"
              aria-invalid={isTooShort}
              autoComplete="off"
            />
            {isTooShort && charCount > 0 && (
              <p
                id="char-count"
                className="absolute bottom-2 right-3 text-xs text-red-500 bg-white dark:bg-gray-950 px-2 py-0.5 rounded"
                aria-live="polite"
              >
                {charCount}/{minChars}
              </p>
            )}
            
            {/* Progress bar - Visual feedback */}
            <div className="mt-3">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ease-out ${
                    progress < 30
                      ? "bg-red-500"
                      : progress < 70
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quality Score - Immediate Feedback */}
          {qualityScore && qualityScore.suggestions.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-xs" id="quality-feedback" role="status" aria-live="polite">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">💡 Tips</span>
                <Badge variant={qualityScore.overall >= 80 ? "default" : qualityScore.overall >= 60 ? "secondary" : "destructive"} className="text-xs h-5">
                  {qualityScore.overall}
                </Badge>
              </div>
              <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
                {qualityScore.suggestions.slice(0, 2).map((suggestion, i) => (
                  <li key={i}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Category Templates - Open by Default */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">📋 Template:</p>
            <div className="flex flex-wrap gap-2">
              {complaintTemplates.map((template) => (
                <Button
                  key={template.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template.template)}
                  disabled={isLoading}
                  className="text-xs h-8"
                >
                  {template.icon} {template.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tone Selector - Clear Visual Hierarchy */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              type="button"
              variant={tone === "formal" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("formal")}
              disabled={isLoading}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <span className="text-2xl">😐</span>
              <span className="text-xs font-medium">Formal</span>
            </Button>
            <Button
              type="button"
              variant={tone === "funny" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("funny")}
              disabled={isLoading}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <span className="text-2xl">😄</span>
              <span className="text-xs font-medium">Lucu</span>
            </Button>
            <Button
              type="button"
              variant={tone === "angry" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("angry")}
              disabled={isLoading}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <span className="text-2xl">😠</span>
              <span className="text-xs font-medium">Kesel</span>
            </Button>
          </div>

          {/* Submit Button - Clear CTA */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold text-base h-12"
            disabled={isLoading || isTooShort}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Diproses...
              </>
            ) : (
              "✨ Bikin Komplain"
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};