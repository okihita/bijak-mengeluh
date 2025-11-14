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
};

const ComplaintForm = ({
  handleSubmit,
  userInput,
  setUserInput,
  isLoading,
  lastSaved,
  isSaving,
}: ComplaintFormProps) => {
  const [mounted, setMounted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const charCount = userInput.trim().length;
  const minChars = 20;
  const isTooShort = charCount <= minChars;
  const progress = Math.min((charCount / 200) * 100, 100);

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
      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-3xl font-bold">
          Curhatin Aja Keluhanmu
        </CardTitle>
        <CardDescription className="px-4">
          Ketik aja unek-unekmu soal layanan publik. Ntar AI kita bikinin surat
          komplain yang keren plus ngasih tau harus lapor ke mana.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4 p-4 sm:p-6">
          <div className="grid gap-2">
            <Label className="text-sm font-medium">
              Pilih Kategori (Opsional)
            </Label>
            <div className="flex flex-wrap gap-2">
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
          </div>

          {showSuggestions && charCount < 10 && (
            <div className="grid gap-2">
              <Label className="text-sm font-medium">
                Atau mulai dengan frasa ini:
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
                    className="text-xs"
                  >
                    {phrase}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="complaint-description" className="sr-only">
              Isi Keluhanmu di Sini
            </Label>
            <Textarea
              id="complaint-description"
              placeholder="Contoh: 'Jalanan depan rumah gue di Palmerah ancur banget udah 3 bulan...'"
              className="min-h-[140px] text-base"
              value={userInput}
              onChange={handleTextChange}
              disabled={isLoading}
            />
            
            {/* Progress bar */}
            <div className="space-y-1">
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

            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {mounted && (
                  <>
                    {isSaving ? (
                      <span className="flex items-center gap-1">
                        <Spinner className="h-3 w-3" />
                        Menyimpan...
                      </span>
                    ) : lastSaved ? (
                      <span className="flex items-center gap-1">
                        <Check className="h-3 w-3 text-green-500" />
                        Tersimpan {formatLastSaved(lastSaved)}
                      </span>
                    ) : null}
                  </>
                )}
              </p>
              <p
                className={`text-xs pr-1 ${
                  isTooShort
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {charCount} / {minChars} karakter minimum
              </p>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-lg py-6"
            disabled={isLoading || isTooShort}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Meme-proses...
              </>
            ) : (
              "Bikinin Komplain"
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

type ErrorMessageProps = {
  error: string | null;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) {
    return null;
  }

  return (
    <Card className="w-full mt-6 shadow-md bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50">
      <CardHeader>
        <CardTitle className="text-lg text-red-700 dark:text-red-400">
          Waduh, Eror
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
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
}: SuggestedContactsProps) => (
  <Card className="shadow-md dark:bg-card">
    <CardHeader>
      <CardTitle className="text-xl">Saran Kontak</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      {isLoading && !contacts.length && (
        <p className="text-base text-gray-500 dark:text-gray-400">
          Lagi nyari...
        </p>
      )}
      {contacts.length > 0 && (
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-base">{contact.name}</span>
                <Badge
                  variant="secondary"
                  className="dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  {Math.round(contact.score * 100)}%
                </Badge>
              </div>
              {index === 0 && rationale && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t dark:border-gray-700">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Nape?
                  </span>{" "}
                  {rationale}
                </p>
              )}

              {index === 0 && (
                <div className="pt-2 mt-2 border-t dark:border-gray-700">
                  <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Akun Resmi X/Twitter
                  </Label>
                  <div className="mt-1">
                    {isLoading ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lagi nyari...
                      </p>
                    ) : (
                      renderSocialHandle()
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!isLoading && !contacts.length && generatedText && (
        <p className="text-base text-gray-500 dark:text-gray-400">
          Gak nemu kontak spesifik.
        </p>
      )}
    </CardContent>
  </Card>
);

type GeneratedComplaintProps = {
  generatedText: string;
  isLoading: boolean;
};

const GeneratedComplaint = ({
  generatedText,
  isLoading,
}: GeneratedComplaintProps) => {
  const { copied, copy } = useCopyToClipboard();
  const { share } = useWebShare();

  return (
    <Card className="lg:col-span-2 shadow-lg dark:bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Draf Komplain Buatan AI</CardTitle>
        {generatedText && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copy(generatedText)}
            >
              {copied ? <Check className="h-4 w-4 mr-2" /> : null}
              {copied ? "Udah dicopy!" : "Salin"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => share(generatedText)}
            >
              <Share className="h-4 w-4 mr-2" />
              Bagiin
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 min-h-[300px]">
        {isLoading && (
          <div className="flex items-center justify-center h-full py-10">
            <Spinner className="h-10 w-10 text-gray-400" />
          </div>
        )}
        {generatedText && (
          <p className="text-base text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
            {generatedText}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  const [userInput, setUserInput] = usePersistentState("userInput", "");
  const { lastSaved, isSaving } = useAutoSave(userInput, "draft", 10000);
  const [promptHistory, setPromptHistory] = usePersistentState<string[]>(
    "promptHistory",
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
        body: JSON.stringify({ prompt: userInput }),
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

      // Save prompt to history
      setPromptHistory((prevHistory) =>
        [userInput, ...prevHistory].slice(0, 20),
      ); // Keep last 10 prompts
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
      <main className="container mx-auto p-4 sm:p-6 md:p-8 pb-16">
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
          />

          <ErrorMessage error={error} />

          {(isLoading || generatedText) && (
            <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <AnalysisSteps steps={analysisSteps} />
                <SuggestedContacts
                  contacts={suggestedContacts}
                  rationale={rationale}
                  isLoading={isLoading}
                  renderSocialHandle={renderSocialHandle}
                  generatedText={generatedText}
                />
              </div>
              <GeneratedComplaint
                generatedText={generatedText}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
