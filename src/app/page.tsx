'use client';

import {FormEvent, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {ThemeToggle} from '@/components/theme-toggle';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from '@/components/ui/badge';
import {Check, Spinner, AlertTriangle} from '@/components/icons'; // --- MODIFIED --- (Added AlertTriangle)
import { X } from 'lucide-react'; // --- ADDED ---

// --- Type Definitions (to match your JSON structure) ---
type SuggestedContact = {
    name: string;
    score: number;
    description: string;
};

// --- ADDED ---
type SocialHandleInfo = {
    handle: string;
    status: 'verified' | 'unverified' | 'none' | 'error';
};

// This matches the top-level structure of your JSON response
type ApiResponse = {
    generated_text: string;
    suggested_contacts: SuggestedContact[];
    rationale: string;
    social_handle_info: SocialHandleInfo; // --- ADDED ---
};

type AnalysisStep = {
    text: string;
    status: 'pending' | 'loading' | 'complete';
};

const initialSteps: AnalysisStep[] = [
    {text: 'Analyzing Complaint', status: 'pending'},
    {text: 'Searching Knowledge Core', status: 'pending'},
    {text: 'Identifying Top Ministry', status: 'pending'},
    {text: 'Generating Rationale', status: 'pending'},
    {text: 'Searching for Social Handle', status: 'pending'}, // --- ADDED ---
];
// --- End of Type Definitions ---

export default function HomePage() {
    // --- State Management ---
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [generatedText, setGeneratedText] = useState<string>('');
    const [suggestedContacts, setSuggestedContacts] = useState<SuggestedContact[]>([]);
    const [rationale, setRationale] = useState<string>('');
    const [socialHandle, setSocialHandle] = useState<SocialHandleInfo | null>(null); // --- ADDED ---

    const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>(initialSteps);

    // --- Visualization Effect ---
    useEffect(() => {
        if (isLoading) {
            setAnalysisSteps(initialSteps.map(s => ({...s, status: 'pending'})));
            const timeouts: NodeJS.Timeout[] = [];

            timeouts.push(setTimeout(() => setAnalysisSteps(prev => prev.map((s, i) => i === 0 ? {
                ...s,
                status: 'loading'
            } : s)), 0));
            timeouts.push(setTimeout(() => setAnalysisSteps(prev => prev.map((s, i) => i === 0 ? {
                ...s,
                status: 'complete'
            } : i === 1 ? {...s, status: 'loading'} : s)), 700));
            timeouts.push(setTimeout(() => setAnalysisSteps(prev => prev.map((s, i) => i <= 1 ? {
                ...s,
                status: 'complete'
            } : i === 2 ? {...s, status: 'loading'} : s)), 2000));
            timeouts.push(setTimeout(() => setAnalysisSteps(prev => prev.map((s, i) => i <= 2 ? {
                ...s,
                status: 'complete'
            } : i === 3 ? {...s, status: 'loading'} : s)), 2900));

            // --- ADDED ---
            timeouts.push(setTimeout(() => setAnalysisSteps(prev => prev.map((s, i) => i <= 3 ? {
                ...s,
                status: 'complete'
            } : i === 4 ? {...s, status: 'loading'} : s)), 3700)); // New 4th step

            return () => timeouts.forEach(clearTimeout);
        }
    }, [isLoading]);
    // --- End of Visualization Effect ---


    // --- Form Submission Handler ---
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userInput.trim().length === 0) {
            setError("Please enter a description of your issue.");
            return;
        }

        setIsLoading(true);
        setGeneratedText('');
        setSuggestedContacts([]);
        setRationale('');
        setSocialHandle(null); // --- ADDED ---
        setError(null);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/generate`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({prompt: userInput}),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({error: "Network response was not ok"}));
                const errorMessage = errData.error || `HTTP error! status: ${response.status}`;
                console.error("API Error:", errorMessage);
                setError(errorMessage);
                return;
            }

            const data: ApiResponse = await response.json();

            setGeneratedText(data.generated_text);
            setSuggestedContacts(data.suggested_contacts);
            setRationale(data.rationale);
            setSocialHandle(data.social_handle_info); // --- ADDED ---

        } catch (err: unknown) {
            let errorMessage = 'Failed to generate response. Please try again.';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            console.error("Caught error:", err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
            setAnalysisSteps(prev => prev.map(s => ({...s, status: 'complete'})));
        }
    };

    // --- ADDED: Helper function to render the social handle badge ---
    const renderSocialHandle = () => {
        if (!socialHandle || socialHandle.status === 'none' || socialHandle.status === 'error') {
            return (
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                    No verified handle found.
                </div>
            );
        }

        const isVerified = socialHandle.status === 'verified';

        return (
            <a
                href={`https://x.com/${socialHandle.handle.substring(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 bg-blue-50 rounded-md border border-blue-200 transition-all hover:bg-blue-100 dark:bg-blue-950/50 dark:border-blue-800/70 dark:hover:bg-blue-950"
            >
                <X className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-mono text-sm text-blue-700 dark:text-blue-400 font-medium">{socialHandle.handle}</span>
                {isVerified && (
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800">
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                    </Badge>
                )}
                {!isVerified && socialHandle.status === 'unverified' && (
                    <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800">
                        Unverified
                    </Badge>
                )}
            </a>
        );
    };
    // --- END ADDED ---

    return (
        <main className="container mx-auto p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-3xl mx-auto">
                <div className="flex justify-end mb-4">
                    <ThemeToggle />
                </div>
                <Card className="shadow-lg dark:bg-card">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl sm:text-3xl font-bold">Sampaikan Keluhanmu</CardTitle>
                        <CardDescription className="px-4">
                            Describe your public service issue. Our AI will draft a professional complaint and suggest
                            the right agencies to contact.
                        </CardDescription>
                    </CardHeader>
                    <form
                        suppressHydrationWarning
                        onSubmit={handleSubmit}>
                        <CardContent className="grid gap-4 p-4 sm:p-6">
                            <div className="grid gap-2">
                                <Label htmlFor="complaint-description" className="sr-only">Describe Your Issue</Label>
                                <Textarea
                                    suppressHydrationWarning
                                    id="complaint-description"
                                    placeholder="Example: 'Jalan di depan rumah saya di Palmerah sudah rusak parah selama 3 bulan...'"
                                    className="min-h-[140px] text-base"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Spinner className="mr-2 h-5 w-5"/>
                                        Analyzing...
                                    </>
                                ) : (
                                    'Generate Complaint'
                                )}
                            </Button>
                        </CardContent>
                    </form>
                </Card>

                {error && (
                    <Card className="w-full mt-6 shadow-md bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50">
                        <CardHeader>
                            <CardTitle className="text-lg text-red-700 dark:text-red-400">Error</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {(isLoading || generatedText) && (
                    <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="lg:col-span-1 space-y-6">
                            <Card className="shadow-md dark:bg-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="space-y-3">
                                        {analysisSteps.map((step, index) => (
                                            <div key={index} className="flex items-center text-base">
                                                {step.status === 'pending' &&
                                                    <Spinner className="h-5 w-5 mr-3 text-gray-300"/>}
                                                {step.status === 'loading' &&
                                                    <Spinner className="h-5 w-5 mr-3 text-blue-500"/>}
                                                {step.status === 'complete' &&
                                                    <Check className="h-5 w-5 mr-3 text-green-500"/>}
                                                <span className={
                                                    step.status === 'pending' ? 'text-gray-400 dark:text-gray-600' :
                                                        step.status === 'loading' ? 'text-blue-600 dark:text-blue-400 font-medium' :
                                                            'text-gray-700 dark:text-gray-300'
                                                }>
                                                    {step.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md dark:bg-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">Suggested Contacts</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    {isLoading && !suggestedContacts.length && (
                                        <p className="text-base text-gray-500 dark:text-gray-400">Searching...</p>
                                    )}
                                    {suggestedContacts.length > 0 && (
                                        <div className="space-y-4">
                                            {suggestedContacts.map((contact, index) => (
                                                <div key={index} className="p-3 border rounded-lg dark:border-gray-700">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-base">{contact.name}</span>
                                                        <Badge variant="secondary" className="dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                                                            {Math.round(contact.score * 100)}%
                                                        </Badge>
                                                    </div>
                                                    {index === 0 && rationale && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t dark:border-gray-700">
                                                            <span className="font-semibold text-gray-700 dark:text-gray-300">Why?</span> {rationale}
                                                        </p>
                                                    )}

                                                    {/* --- MODIFIED: ADDED THIS BLOCK --- */}
                                                    {index === 0 && (
                                                        <div className="pt-2 mt-2 border-t dark:border-gray-700">
                                                            <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Official X/Twitter</Label>
                                                            <div className="mt-1">
                                                                {isLoading ? (
                                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Searching...</p>
                                                                ) : (
                                                                    renderSocialHandle()
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* --- END MODIFIED --- */}

                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {!isLoading && !suggestedContacts.length && generatedText && (
                                        <p className="text-base text-gray-500 dark:text-gray-400">No specific contacts found.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="lg:col-span-2 shadow-lg dark:bg-card">
                            <CardHeader>
                                <CardTitle className="text-xl">Generated Complaint Draft</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 min-h-[300px]">
                                {isLoading && (
                                    <div className="flex items-center justify-center h-full py-10">
                                        <Spinner className="h-10 w-10 text-gray-400"/>
                                    </div>
                                )}
                                {generatedText &&
                                    <p className="text-base text-gray-800 dark:text-gray-300 whitespace-pre-wrap">{generatedText}</p>}
                            </CardContent>
                        </Card>

                    </div>
                )}
            </div>
        </main>
    );
}