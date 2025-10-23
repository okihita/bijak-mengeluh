'use client';

import {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from '@/components/ui/badge';
import {Check, Spinner} from '@/components/icons'; // Assumes icons.tsx is created

// --- Type Definitions (to match your JSON structure) ---
type SuggestedContact = {
    name: string;
    score: number;
    description: string; // <-- From your JSON
};

// This matches the top-level structure of your JSON response
type ApiResponse = {
    generated_text: string;
    suggested_contacts: SuggestedContact[];
    rationale: string;
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
];
// --- End of Type Definitions ---

export default function HomePage() {
    // --- State Management ---
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // --- NEW: State variables that map directly to your JSON ---
    const [generatedText, setGeneratedText] = useState<string>('');
    const [suggestedContacts, setSuggestedContacts] = useState<SuggestedContact[]>([]);
    const [rationale, setRationale] = useState<string>('');
    // --- End of NEW State Variables ---

    const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>(initialSteps);

    // --- Visualization Effect (Same as before) ---
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

            return () => timeouts.forEach(clearTimeout);
        }
    }, [isLoading]);
    // --- End of Visualization Effect ---


    // --- Form Submission Handler (Reworked for your JSON) ---
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userInput.trim().length === 0) {
            setError("Please enter a description of your issue.");
            return;
        }

        setIsLoading(true);
        // Clear all previous results
        setGeneratedText('');
        setSuggestedContacts([]);
        setRationale('');
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
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            }

            // --- Here is the mapping from your JSON ---
            const data: ApiResponse = await response.json();

            setGeneratedText(data.generated_text);         // <-- Maps to data.generated_text
            setSuggestedContacts(data.suggested_contacts); // <-- Maps to data.suggested_contacts
            setRationale(data.rationale);                 // <-- Maps to data.rationale
            // --- End of mapping ---

        } catch (err: unknown) {
            let errorMessage = 'Failed to generate response. Please try again.'; // Default message

            // Type Guard: Check if err is an instance of Error
            if (err instanceof Error) {
                errorMessage = err.message; // Now it's safe to access .message
            }
            // You could add checks for other potential error types if needed
            // else if (typeof err === 'string') { errorMessage = err; }

            console.error("Caught error:", err); // Log the original error for debugging
            setError(errorMessage); // Set the user-facing message            setGeneratedText('');
        } finally {
            setIsLoading(false);
            setAnalysisSteps(prev => prev.map(s => ({...s, status: 'complete'})));
        }
    };

    return (
        <main className="container mx-auto p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-3xl mx-auto">
                <Card className="shadow-lg">
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
                    <Card className="w-full mt-6 shadow-md bg-red-50 border-red-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-red-700">Error</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-red-600">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {(isLoading || generatedText) && (
                    <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="lg:col-span-1 space-y-6">
                            <Card className="shadow-md">
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
                                                    step.status === 'pending' ? 'text-gray-400' :
                                                        step.status === 'loading' ? 'text-blue-600 font-medium' :
                                                            'text-gray-700'
                                                }>
                                                    {step.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-xl">Suggested Contacts</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    {isLoading && !suggestedContacts.length && (
                                        <p className="text-base text-gray-500">Searching...</p>
                                    )}
                                    {suggestedContacts.length > 0 && (
                                        <div className="space-y-4">
                                            {suggestedContacts.map((contact, index) => (
                                                <div key={index} className="p-3 border rounded-lg">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-base">{contact.name}</span>
                                                        <Badge variant="secondary">
                                                            {Math.round(contact.score * 100)}%
                                                        </Badge>
                                                    </div>
                                                    {index === 0 && rationale && (
                                                        <p className="text-sm text-gray-600 mt-2 pt-2 border-t">
                                                            <span className="font-semibold">Why?</span> {rationale}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {!isLoading && !suggestedContacts.length && generatedText && (
                                        <p className="text-base text-gray-500">No specific contacts found.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="lg:col-span-2 shadow-lg">
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
                                    <p className="text-base text-gray-800 whitespace-pre-wrap">{generatedText}</p>}
                            </CardContent>
                        </Card>

                    </div>
                )}
            </div>
        </main>
    );
}
