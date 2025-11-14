"use client";

import { FormEvent, JSX, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, Spinner } from "@/components/icons";
import { History, Share, X } from "lucide-react";
import Link from "next/link";
import { BottomNavigation } from "@/components/bottom-navigation";
import { complaintTemplates } from "@/lib/templates";
import { usePersistentState, useAutoSave } from "@/lib/hooks";
import { suggestionPhrases } from "@/lib/suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { scoreComplaint } from "@/lib/scorer";
import confetti from "canvas-confetti";

type SuggestedContact = {
  name: string;
  score: number;
  description: string;
};

type SocialHandleInfo = {
  handle: string;
  status: "verified" | "unverified" | "none" | "error";
};

export type ApiResponse = {
  generated_text: string;
  suggested_contacts: SuggestedContact[];
  rationale: string;
  social_handle_info: SocialHandleInfo;
};

export type AnalysisStep = {
  text: string;
  status: "pending" | "loading" | "complete";
};

const initialSteps: AnalysisStep[] = [
  { text: "Lagi ngecek komplainan", status: "pending" },
  { text: "Nyari-nyari di gudang ilmu", status: "pending" },
  { text: "Milih-milih kementerian paling top", status: "pending" },
  { text: "Bikin alesan yang ciamik", status: "pending" },
  { text: "Nyari akun sosmednya", status: "pending" },
];

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return { copied, copy };
};

const useWebShare = () => {
  const share = (text: string) => {
    if (navigator.share) {
      navigator
        .share({ text })
        .catch((error) => console.error("Error sharing:", error));
    }
  };

  return { share };
};

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

const ComplaintForm = ({
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

  const handleSuggestionClick = (phrase: string) => {
    const newText = userInput ? `${userInput} ${phrase}` : phrase;
    setUserInput(newText);
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

  const formatLastSaved = (date: Date | null) => {
    if (!date) return "";
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="shadow-lg dark:bg-card">
      <CardHeader className="text-center space-y-3 pb-4">
        <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Curhatin Aja Keluhanmu
        </CardTitle>
        <CardDescription className="text-base sm:text-lg px-4 max-w-2xl mx-auto">
          Tulis keluhan kamu, AI kami akan bantu bikin surat yang profesional dan kasih tau harus lapor ke mana 🎯
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 p-4 sm:p-6">
          
          {/* Main Textarea - Most Important Element */}
          <div className="space-y-3">
            <Label htmlFor="complaint-description" className="text-base font-semibold">
              Tulis Keluhan Kamu
            </Label>
            <Textarea
              id="complaint-description"
              placeholder="Contoh: Jalanan depan rumah saya di Jalan Sudirman Jakarta rusak parah sudah 3 bulan tidak diperbaiki..."
              className="min-h-[160px] text-base resize-none focus:ring-2 focus:ring-primary/50"
              value={userInput}
              onChange={handleTextChange}
              disabled={isLoading}
              aria-label="Tulis keluhan Anda di sini"
              aria-describedby="char-count quality-feedback"
              aria-invalid={isTooShort}
              autoComplete="off"
            />
            
            {/* Progress bar - Visual feedback */}
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  {mounted && (
                    <>
                      {isSaving ? (
                        <span className="flex items-center gap-1 text-gray-500">
                          <Spinner className="h-3 w-3" />
                          Menyimpan...
                        </span>
                      ) : lastSaved ? (
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <Check className="h-3 w-3" />
                          Tersimpan {formatLastSaved(lastSaved)}
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
                <p
                  id="char-count"
                  className={`font-medium ${
                    isTooShort
                      ? "text-red-500 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                  aria-live="polite"
                >
                  {charCount} / {minChars} karakter
                </p>
              </div>
            </div>
          </div>

          {/* Quality Score - Immediate Feedback */}
          {qualityScore && qualityScore.suggestions.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 space-y-2" id="quality-feedback" role="status" aria-live="polite">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                  💡 Tips untuk Komplain Lebih Baik
                </span>
                <Badge variant={qualityScore.overall >= 80 ? "default" : qualityScore.overall >= 60 ? "secondary" : "destructive"} className="text-xs">
                  {qualityScore.overall}/100
                </Badge>
              </div>
              <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                {qualityScore.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tone Selector - Clear Visual Hierarchy */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Pilih Nada Komplain
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant={tone === "formal" ? "default" : "outline"}
                size="lg"
                onClick={() => setTone("formal")}
                disabled={isLoading}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <span className="text-2xl">😐</span>
                <span className="text-sm font-medium">Formal</span>
              </Button>
              <Button
                type="button"
                variant={tone === "funny" ? "default" : "outline"}
                size="lg"
                onClick={() => setTone("funny")}
                disabled={isLoading}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <span className="text-2xl">😄</span>
                <span className="text-sm font-medium">Lucu</span>
              </Button>
              <Button
                type="button"
                variant={tone === "angry" ? "default" : "outline"}
                size="lg"
                onClick={() => setTone("angry")}
                disabled={isLoading}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <span className="text-2xl">😠</span>
                <span className="text-sm font-medium">Kesel</span>
              </Button>
            </div>
          </div>

          {/* Category Templates - Collapsed by Default */}
          <details className="group">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="text-sm font-medium">📋 Atau pilih template kategori</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </div>
            </summary>
            <div className="mt-3 flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              {complaintTemplates.map((template) => (
                <Button
                  key={template.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template.template)}
                  disabled={isLoading}
                  className="text-sm"
                >
                  <span className="mr-1">{template.icon}</span>
                  {template.label}
                </Button>
              ))}
            </div>
          </details>

          {/* Suggestion Phrases - Only Show When Empty */}
          {showSuggestions && charCount < 10 && (
            <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Label className="text-sm font-medium text-blue-800 dark:text-blue-200">
                💬 Mulai dengan frasa ini:
              </Label>
              <div className="flex flex-wrap gap-2">
                {suggestionPhrases.map((phrase, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(phrase)}
                    disabled={isLoading}
                    className="text-xs bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    {phrase}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button - Clear CTA */}
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
            disabled={isLoading || isTooShort}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Sedang Diproses...
              </>
            ) : (
              <>
                ✨ Bikinin Komplain Sekarang
              </>
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

type ErrorMessageProps = {
  error: string | null;
  onRetry?: () => void;
};

const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  if (!error) {
    return null;
  }

  return (
    <Card className="w-full mt-6 shadow-md bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50">
      <CardHeader>
        <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Waduh, Eror
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            Coba Lagi
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

type AnalysisStepsProps = {
  steps: AnalysisStep[];
};

const AnalysisSteps = ({ steps }: AnalysisStepsProps) => (
  <Card className="shadow-md dark:bg-card">
    <CardHeader>
      <CardTitle className="text-xl">Analisa</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center text-base">
            {step.status === "pending" && (
              <Spinner className="h-5 w-5 mr-3 text-gray-300" />
            )}
            {step.status === "loading" && (
              <Spinner className="h-5 w-5 mr-3 text-blue-500" />
            )}
            {step.status === "complete" && (
              <Check className="h-5 w-5 mr-3 text-green-500" />
            )}
            <span
              className={
                step.status === "pending"
                  ? "text-gray-400 dark:text-gray-600"
                  : step.status === "loading"
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300"
              }
            >
              {step.text}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

type SuggestedContactsProps = {
  contacts: SuggestedContact[];
  rationale: string;
  isLoading: boolean;
  renderSocialHandle: () => JSX.Element;
  generatedText: string;
};

const SuggestedContacts = ({
  contacts,
  rationale,
  isLoading,
  renderSocialHandle,
  generatedText,
}: SuggestedContactsProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <Card className="shadow-md dark:bg-card">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          🎯 Saran Kontak
        </CardTitle>
        <CardDescription>
          Kementerian yang paling cocok untuk keluhan kamu
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading && !contacts.length && (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}
        {contacts.length > 0 && (
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                  index === 0
                    ? "bg-primary/5 border-primary/30 dark:bg-primary/10"
                    : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                } ${expandedIndex === index ? "ring-2 ring-primary/50" : ""}`}
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 space-y-1">
                    {index === 0 && (
                      <Badge className="mb-2 text-xs">Rekomendasi Utama</Badge>
                    )}
                    <h3 
                      className="font-semibold text-base line-clamp-2" 
                      title={contact.name}
                    >
                      {contact.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className="text-sm font-bold"
                    >
                      {Math.round(contact.score * 100)}%
                    </Badge>
                    <span className={`text-gray-400 transition-transform ${expandedIndex === index ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {expandedIndex === index && (
                  <div className="mt-4 space-y-4 animate-in fade-in duration-200 border-t pt-4 dark:border-gray-700">
                    {index === 0 && rationale && (
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          💡 Kenapa kementerian ini?
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {rationale}
                        </p>
                      </div>
                    )}

                    {index === 0 && (
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          📱 Akun Resmi X/Twitter
                        </p>
                        {isLoading ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Mencari akun resmi...
                          </p>
                        ) : (
                          renderSocialHandle()
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {!isLoading && !contacts.length && generatedText && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            Tidak menemukan kontak spesifik untuk keluhan ini
          </p>
        )}
      </CardContent>
    </Card>
  );
};

type GeneratedComplaintProps = {
  generatedText: string;
  isLoading: boolean;
  originalText: string;
};

const GeneratedComplaint = ({
  generatedText,
  isLoading,
  originalText,
}: GeneratedComplaintProps) => {
  const { copied, copy } = useCopyToClipboard();
  const { share } = useWebShare();
  const [showPreview, setShowPreview] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <>
      <Card className="shadow-xl dark:bg-card border-2 border-primary/20">
        <CardHeader className="space-y-4 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                ✨ Komplain Kamu Sudah Jadi!
              </CardTitle>
              <CardDescription className="text-base">
                Salin dan kirim ke akun resmi kementerian terkait
              </CardDescription>
            </div>
          </div>
          
          {generatedText && (
            <div className="flex gap-2 flex-wrap">
              <Button
                size="lg"
                onClick={() => copy(generatedText)}
                className="flex-1 sm:flex-none font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    📋 Salin Komplain
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => share(generatedText)}
              >
                <Share className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowComparison(!showComparison)}
              >
                {showComparison ? "Sembunyikan" : "Bandingkan"}
              </Button>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-6 min-h-[200px]">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          )}
          
          {generatedText && !showComparison && (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100 whitespace-pre-wrap m-0">
                  {generatedText}
                </p>
              </div>
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
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-4 rounded-lg border-2 border-primary/20">
                  <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">
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

export default function HomePage() {
  const [userInput, setUserInput] = usePersistentState("userInput", "");
  const { lastSaved, isSaving } = useAutoSave(userInput, "draft", 10000);
  const [tone, setTone] = useState<string>("formal");
  const [promptHistory, setPromptHistory] = usePersistentState<string[]>(
    "promptHistory",
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmittedInput, setLastSubmittedInput] = useState<string>("");

  const [generatedText, setGeneratedText] = useState<string>("");
  const [suggestedContacts, setSuggestedContacts] = useState<
    SuggestedContact[]
  >([]);
  const [rationale, setRationale] = useState<string>("");
  const [socialHandle, setSocialHandle] = useState<SocialHandleInfo | null>(
    null,
  );

  const [analysisSteps, setAnalysisSteps] =
    useState<AnalysisStep[]>(initialSteps);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("complaint-description")?.focus();
      }
      // Escape to clear focus
      if (e.key === "Escape") {
        (document.activeElement as HTMLElement)?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setAnalysisSteps(initialSteps.map((s) => ({ ...s, status: "pending" })));
      const timeouts: NodeJS.Timeout[] = [];

      timeouts.push(
        setTimeout(
          () =>
            setAnalysisSteps((prev) =>
              prev.map((s, i) =>
                i === 0
                  ? {
                      ...s,
                      status: "loading",
                    }
                  : s,
              ),
            ),
          0,
        ),
      );
      timeouts.push(
        setTimeout(
          () =>
            setAnalysisSteps((prev) =>
              prev.map((s, i) =>
                i === 0
                  ? {
                      ...s,
                      status: "complete",
                    }
                  : i === 1
                    ? { ...s, status: "loading" }
                    : s,
              ),
            ),
          700,
        ),
      );
      timeouts.push(
        setTimeout(
          () =>
            setAnalysisSteps((prev) =>
              prev.map((s, i) =>
                i <= 1
                  ? {
                      ...s,
                      status: "complete",
                    }
                  : i === 2
                    ? { ...s, status: "loading" }
                    : s,
              ),
            ),
          2000,
        ),
      );
      timeouts.push(
        setTimeout(
          () =>
            setAnalysisSteps((prev) =>
              prev.map((s, i) =>
                i <= 2
                  ? {
                      ...s,
                      status: "complete",
                    }
                  : i === 3
                    ? { ...s, status: "loading" }
                    : s,
              ),
            ),
          2900,
        ),
      );
      timeouts.push(
        setTimeout(
          () =>
            setAnalysisSteps((prev) =>
              prev.map((s, i) =>
                i <= 3
                  ? {
                      ...s,
                      status: "complete",
                    }
                  : i === 4
                    ? { ...s, status: "loading" }
                    : s,
              ),
            ),
          3700,
        ),
      );

      return () => timeouts.forEach(clearTimeout);
    }
  }, [isLoading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim().length <= 20) {
      setError("Isi dulu keluhannya, bos. Minimal 20 karakter, ya.");
      return;
    }

    setLastSubmittedInput(userInput);
    setIsLoading(true);
    setGeneratedText("");
    setSuggestedContacts([]);
    setRationale("");
    setSocialHandle(null);
    setError(null);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/generate`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          complaint: userInput,
          tone: tone 
        }),
      });

      if (!response.ok) {
        const errData = await response
          .json()
          .catch(() => ({ error: "Jaringannya lagi ngambek." }));
        const errorMessage =
          errData.error || `Waduh, eror HTTP! status: ${response.status}`;
        console.error("API Error:", errorMessage);
        setError(errorMessage);
        return;
      }

      const data: ApiResponse = await response.json();

      setGeneratedText(data.generated_text);
      setSuggestedContacts(data.suggested_contacts);
      setRationale(data.rationale);
      setSocialHandle(data.social_handle_info);

      // Celebrate success with confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Save prompt to history
      setPromptHistory((prevHistory) =>
        [userInput, ...prevHistory].slice(0, 20),
      );
    } catch (err: unknown) {
      let errorMessage = "Gagal bikin respons. Coba lagi, ya.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Caught error:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setAnalysisSteps((prev) =>
        prev.map((s) => ({ ...s, status: "complete" })),
      );
    }
  };

  const handleRetry = () => {
    if (lastSubmittedInput) {
      setUserInput(lastSubmittedInput);
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }
  };

  const renderSocialHandle = () => {
    if (
      !socialHandle ||
      socialHandle.status === "none" ||
      socialHandle.status === "error"
    ) {
      return (
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
          Gak nemu akun terverifikasi.
        </div>
      );
    }

    const isVerified = socialHandle.status === "verified";

    return (
      <a
        href={`https://x.com/${socialHandle.handle.substring(1)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-2 bg-blue-50 rounded-md border border-blue-200 transition-all hover:bg-blue-100 dark:bg-blue-950/50 dark:border-blue-800/70 dark:hover:bg-blue-950"
      >
        <X className="h-4 w-4 mr-2 text-blue-500" />
        <span className="font-mono text-sm text-blue-700 dark:text-blue-400 font-medium">
          {socialHandle.handle}
        </span>
        {isVerified && (
          <Badge
            variant="secondary"
            className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800"
          >
            <Check className="h-3 w-3 mr-1" />
            Terverifikasi
          </Badge>
        )}
        {!isVerified && socialHandle.status === "unverified" && (
          <Badge
            variant="outline"
            className="ml-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800"
          >
            Belum Diverifikasi
          </Badge>
        )}
      </a>
    );
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>
      
      {/* Screen reader announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isLoading && "Sedang memproses keluhan Anda"}
        {generatedText && !isLoading && "Komplain berhasil dibuat"}
        {error && `Error: ${error}`}
      </div>
      
      <main id="main-content" className="container mx-auto p-4 sm:p-6 md:p-8 pb-16">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex justify-end items-center mb-4">
            {/* Desktop navigation link */}
            <div className="hidden sm:block mr-4">
              <Link
                href="/history"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
              >
                <History className="h-5 w-5" />
                Riwayat
              </Link>
            </div>
            <ThemeToggle />
          </div>
          <ComplaintForm
            handleSubmit={handleSubmit}
            userInput={userInput}
            setUserInput={setUserInput}
            isLoading={isLoading}
            lastSaved={lastSaved}
            isSaving={isSaving}
            tone={tone}
            setTone={setTone}
          />

          <ErrorMessage error={error} onRetry={handleRetry} />

          {(isLoading || generatedText) && (
            <div className="w-full mt-8 space-y-6">
              {/* Generated Complaint - Primary Focus */}
              <GeneratedComplaint
                generatedText={generatedText}
                isLoading={isLoading}
                originalText={lastSubmittedInput}
              />
              
              {/* Secondary Info in 2-column grid on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalysisSteps steps={analysisSteps} />
                <SuggestedContacts
                  contacts={suggestedContacts}
                  rationale={rationale}
                  isLoading={isLoading}
                  renderSocialHandle={renderSocialHandle}
                  generatedText={generatedText}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
