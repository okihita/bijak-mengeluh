"use client";

import { FormEvent, useEffect, useState } from "react";
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
  const charCount = userInput.trim().length;
  const minChars = 20;
  const isTooShort = charCount <= minChars;
  const progress = Math.min((charCount / 200) * 100, 100);
  
  // Calculate quality score
  const qualityScore = charCount > minChars ? scoreComplaint(userInput) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTemplateSelect = (template: string) => {
    setUserInput(template);
    setShowSuggestions(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value;
    
    // Auto-capitalize first letter of sentences
    text = text.replace(/(^\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
    
    setUserInput(text);
    if (text.length > 10) {
      setShowSuggestions(false);
    }
  };

  return (
    <Card className="shadow-lg dark:bg-card">
      <CardHeader className="text-center pb-2 pt-3">
        <CardTitle className="text-xl font-bold">Curhatin Aja Keluhanmu</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">AI bantu bikin surat & kasih tau lapor ke mana 🎯</p>
        <p className="text-xs text-muted-foreground/60">Bijak sana, bijak sini, bijak di mana-mana!</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3 p-4 pt-0">
          
          {/* Main Textarea - Most Important Element */}
          <div className="relative">
            <Textarea
              id="complaint-description"
              placeholder="Tulis keluhan kamu di sini..."
              className="min-h-[80px] text-base resize-none focus:ring-2 focus:ring-primary/50"
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
                className="absolute bottom-1.5 right-2 text-xs text-red-500 bg-white dark:bg-gray-950 px-1 rounded"
                aria-live="polite"
              >
                {charCount}/{minChars}
              </p>
            )}
            
            {/* Progress bar - Visual feedback */}
            <div className="mt-2">
              <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
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
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2 text-xs" id="quality-feedback" role="status" aria-live="polite">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">💡 Tips</span>
                <Badge variant={qualityScore.overall >= 80 ? "default" : qualityScore.overall >= 60 ? "secondary" : "destructive"} className="text-xs h-4">
                  {qualityScore.overall}
                </Badge>
              </div>
              <ul className="space-y-0.5 text-yellow-700 dark:text-yellow-300">
                {qualityScore.suggestions.slice(0, 2).map((suggestion, i) => (
                  <li key={i}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Category Templates - Open by Default */}
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">📋 Template:</p>
            <div className="flex flex-wrap gap-1.5">
              {complaintTemplates.map((template) => (
                <Button
                  key={template.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template.template)}
                  disabled={isLoading}
                  className="text-xs h-7"
                >
                  {template.icon} {template.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tone Selector - Clear Visual Hierarchy */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={tone === "formal" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("formal")}
              disabled={isLoading}
              className="flex flex-col items-center gap-0.5 h-auto py-2"
            >
              <span className="text-xl">😐</span>
              <span className="text-xs">Formal</span>
            </Button>
            <Button
              type="button"
              variant={tone === "funny" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("funny")}
              disabled={isLoading}
              className="flex flex-col items-center gap-0.5 h-auto py-2"
            >
              <span className="text-xl">😄</span>
              <span className="text-xs">Lucu</span>
            </Button>
            <Button
              type="button"
              variant={tone === "angry" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("angry")}
              disabled={isLoading}
              className="flex flex-col items-center gap-0.5 h-auto py-2"
            >
              <span className="text-xl">😠</span>
              <span className="text-xs">Kesel</span>
            </Button>
          </div>

          {/* Submit Button - Clear CTA */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            disabled={isLoading || isTooShort}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
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