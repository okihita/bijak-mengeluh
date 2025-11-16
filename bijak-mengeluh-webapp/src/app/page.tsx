"use client";

import { FormEvent, JSX, useEffect, useState, useRef, useReducer } from "react";
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
import { History, Share, X, Instagram, Map } from "lucide-react";
import Link from "next/link";
import { BottomNavigation } from "@/components/bottom-navigation";
import { TopBar } from "@/components/top-bar";
import { ComplaintForm } from "@/components/complaint-form";
import { GeneratedComplaint } from "@/components/generated-complaint";
import { SuggestedContacts } from "@/components/suggested-contacts";
import { ErrorMessage } from "@/components/error-message";
import { complaintTemplates } from "@/lib/templates";
import { usePersistentState, useAutoSave } from "@/lib/hooks";
import { suggestionPhrases } from "@/lib/suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { scoreComplaint } from "@/lib/scorer";
import confetti from "canvas-confetti";
import { Onboarding } from "@/components/onboarding";
import { SettingsPanel } from "@/components/settings-panel";

export type SuggestedContact = {
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


// Reducer state and actions
interface ComplaintState {
  isLoading: boolean;
  error: string | null;
  lastSubmittedInput: string;
  generatedText: string;
  suggestedContacts: SuggestedContact[];
  rationale: string;
  socialHandle: SocialHandleInfo | null;
}

type ComplaintAction =
  | { type: 'SUBMIT'; payload: string }
  | { type: 'SUCCESS'; payload: ApiResponse }
  | { type: 'ERROR'; payload: string }
  | { type: 'FINISH' };

const initialState: ComplaintState = {
  isLoading: false,
  error: null,
  lastSubmittedInput: "",
  generatedText: "",
  suggestedContacts: [],
  rationale: "",
  socialHandle: null,
};

function complaintReducer(state: ComplaintState, action: ComplaintAction): ComplaintState {
  switch (action.type) {
    case 'SUBMIT':
      return {
        ...initialState,
        isLoading: true,
        lastSubmittedInput: action.payload,
      };
    case 'SUCCESS':
      return {
        ...state,
        generatedText: action.payload.generated_text,
        suggestedContacts: action.payload.suggested_contacts,
        rationale: action.payload.rationale,
        socialHandle: action.payload.social_handle_info,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'FINISH':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default function HomePage() {
  const [userInput, setUserInput] = usePersistentState("userInput", "");
  const { lastSaved, isSaving } = useAutoSave(userInput, "draft", 10000);
  const [tone, setTone] = useState<string>("formal");
  const [promptHistory, setPromptHistory] = usePersistentState<string[]>(
    "promptHistory",
    [],
  );
  const [state, dispatch] = useReducer(complaintReducer, initialState);
  const {
    isLoading,
    error,
    lastSubmittedInput,
    generatedText,
    suggestedContacts,
    rationale,
    socialHandle,
  } = state;

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim().length <= 20) {
      dispatch({ type: 'ERROR', payload: "Isi dulu keluhannya, bos. Minimal 20 karakter, ya." });
      return;
    }

    dispatch({ type: 'SUBMIT', payload: userInput });

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
        dispatch({ type: 'ERROR', payload: errorMessage });
        return;
      }

      const data: ApiResponse = await response.json();
      dispatch({ type: 'SUCCESS', payload: data });

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
      dispatch({ type: 'ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'FINISH' });
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
        className="flex items-center p-2 bg-muted rounded-md border border-border transition-all hover:bg-muted/80 dark:bg-muted dark:border-border dark:hover:bg-muted/80"
      >
        <X className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="font-mono text-sm text-foreground dark:text-foreground font-medium">
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
      <Onboarding />
      <SettingsPanel />
      {/* Screen reader announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isLoading && "Sedang memproses keluhan Anda"}
        {generatedText && !isLoading && "Komplain berhasil dibuat"}
        {error && `Error: ${error}`}
      </div>
      
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <TopBar />
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

          {/* Directory CTA */}
          {!isLoading && !generatedText && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-border dark:border-blue-800">
              <CardContent className="pt-6 text-center">
                <p className="text-lg font-semibold mb-2">Atau cari instansi manual</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Jelajahi 1100+ instansi berdasarkan lokasi dan kategori
                </p>
                <Link href="/directory">
                  <Button className="gap-2">
                    <Map className="h-4 w-4" />
                    Buka Direktori
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <ErrorMessage error={error} onRetry={handleRetry} />

          {(isLoading || generatedText) && (
            <div className="w-full space-y-6">
              {/* Generated Complaint - Primary Focus */}
              <GeneratedComplaint
                generatedText={generatedText}
                isLoading={isLoading}
                originalText={lastSubmittedInput}
                agency={suggestedContacts[0]?.name}
              />
              
              {/* Suggested Contacts */}
              <SuggestedContacts
                contacts={suggestedContacts}
                rationale={rationale}
                isLoading={isLoading}
                renderSocialHandle={renderSocialHandle}
                generatedText={generatedText}
              />
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
