'use client';

import {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Spinner} from '@/components/icons';
import {Badge} from '@/components/ui/badge'; // Import the new component

type SuggestedContact = {
    name: string;
    score: number;
};

export default function HomePage() {

    // --- State Management ---
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const [suggestedContacts, setSuggestedContacts] = useState<SuggestedContact[]>([]);
    const [error, setError] = useState<string | null>(null);

    // --- Form Submission Handler ---
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userInput.trim().length === 0) {
            setError("Please enter a description of your issue.");
            return;
        }

        setIsLoading(true);
        setAiOutput('');
        setSuggestedContacts([]); // Clear previous suggestions
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
        const apiUrl = `${baseUrl}/generate`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({prompt: userInput}),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Network response was not ok');
            }

            const data = await response.json();

            setAiOutput(data.generated_text);
            setSuggestedContacts(data.suggested_contacts);

        } catch (err: unknown) {
            let errorMessage = 'Failed to generate response. Please try again.'; // Default message

            // Type Guard: Check if err is an instance of Error
            if (err instanceof Error) {
                errorMessage = err.message; // Now it's safe to access .message
            }
            // You could add checks for other potential error types if needed
            // else if (typeof err === 'string') { errorMessage = err; }

            console.error("Caught error:", err); // Log the original error for debugging
            setError(errorMessage); // Set the user-facing message
            setAiOutput('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-gray-50/50">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">AI Complaint Assistant</CardTitle>
                    <CardDescription>
                        Describe your public service issue. Our AI will draft a professional complaint and suggest the
                        right agencies to contact.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="complaint-description">Describe Your Issue</Label>
                            <Textarea
                                id="complaint-description"
                                placeholder="Example: 'Jalan di depan rumah saya di Palmerah sudah rusak parah selama 3 bulan...'"
                                className="min-h-[120px]"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Spinner className="mr-2 h-4 w-4"/>
                                    Analyzing & Generating...
                                </>
                            ) : (
                                'Generate Complaint'
                            )}
                        </Button>
                    </CardContent>
                </form>
            </Card>

            {/* --- Error Display --- */}
            {error && (
                <Card className="w-full max-w-2xl mt-6 shadow-md bg-red-50 border-red-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-red-700">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-600">{error}</p>
                    </CardContent>
                </Card>
            )}

            {/* --- Output Section (Visible when loading or has content) --- */}
            {(isLoading || aiOutput) && (
                <div className="w-full max-w-2xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* --- Suggested Contacts Card (NEW) --- */}
                    <Card className="md:col-span-1 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg">Suggested Contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading && (
                                <div className="flex items-center justify-center h-full py-4">
                                    <Spinner className="h-6 w-6 text-gray-400"/>
                                </div>
                            )}
                            {suggestedContacts.length > 0 && (
                                <div className="space-y-3">
                                    {suggestedContacts.map((contact, index) => (
                                        <div key={index} className="p-2 border rounded-md">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm">{contact.name}</span>
                                                <Badge variant="secondary">
                                                    {Math.round(contact.score * 100)}%
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {!isLoading && suggestedContacts.length === 0 && aiOutput && (
                                <p className="text-sm text-gray-500">No specific contacts found.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* --- Generated Complaint Card --- */}
                    <Card className="md:col-span-2 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg">Generated Complaint Draft</CardTitle>
                        </CardHeader>
                        <CardContent className="min-h-[200px]">
                            {isLoading && (
                                <div className="flex items-center justify-center h-full py-10">
                                    <Spinner className="h-8 w-8 text-gray-400"/>
                                </div>
                            )}
                            {aiOutput && <p className="text-gray-700 whitespace-pre-wrap">{aiOutput}</p>}
                        </CardContent>
                    </Card>

                </div>
            )}
        </main>
    );
}