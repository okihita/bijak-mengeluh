"use client";

import { FormEvent, JSX, useEffect, useState, useRef } from "react";
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
import { History, Share, X, Instagram } from "lucide-react";
import Link from "next/link";
import { BottomNavigation } from "@/components/bottom-navigation";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
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

  const shareAsImage = async (text: string, ministry?: string) => {
    try {
      const { generateShareImage } = await import("@/lib/share-image");
      const blob = await generateShareImage(text, ministry);
      const file = new File([blob], "keluhan.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ 
          files: [file],
          title: "Surat Keluhan",
          text: "Surat keluhan dari bijakmengeluh.id"
        });
      } else {
        // Fallback: download image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "keluhan-bijakmengeluh.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("Gagal membuat gambar. Silakan coba lagi.");
    }
  };

  return { share, shareAsImage };
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
  ministry?: string;
};

const GeneratedComplaint = ({
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
      {/* Screen reader announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isLoading && "Sedang memproses keluhan Anda"}
        {generatedText && !isLoading && "Komplain berhasil dibuat"}
        {error && `Error: ${error}`}
      </div>
      
      <main className="container mx-auto p-4 sm:p-6 md:p-8 pb-14">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <PwaInstallPrompt />
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
                ministry={suggestedContacts[0]?.name}
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
