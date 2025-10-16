'use client'; // This directive is necessary for using React hooks

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Spinner} from '@/components/icons'; // Import our spinner

export default function HomePage() {
    // --- State Management ---
    // Stores the user's complaint description
    const [userInput, setUserInput] = useState<string>('');
    // Toggles the loading state for the button and output
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Stores the AI-generated complaint text
    const [aiOutput, setAiOutput] = useState<string>('');
    // Stores potential errors
    const [error, setError] = useState<string | null>(null);

    // --- Form Submission Handler ---
    // This function will be connected to the backend in Part 4
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setAiOutput('');

        try {
            const response = await fetch('/api'!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt: userInput}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAiOutput(data.generated_text);

        } catch (error) {
            console.error('Failed to fetch:', error);
            setAiOutput('Failed to generate complaint. Please try again.');
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
                        Describe your public service issue, and our AI will draft a professional complaint for you.
                    </CardDescription>
                </CardHeader>
                <form
                    suppressHydrationWarning
                    onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="complaint-description">Describe Your Issue</Label>
                            <Textarea
                                id="complaint-description"
                                placeholder="Example: 'Jalan di depan rumah saya di Palmerah sudah rusak parah selama 3 bulan dan menyebabkan banyak kecelakaan...'"
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
                                    Generating...
                                </>
                            ) : (
                                'Generate Complaint'
                            )}
                        </Button>
                    </CardContent>
                </form>
                <CardFooter>
                    <p className="text-xs text-gray-500">
                        Results are AI-generated. Please review and edit before posting.
                    </p>
                </CardFooter>
            </Card>

            {/* --- Output Section --- */}
            {(isLoading || aiOutput || error) && (
                <Card className="w-full max-w-2xl mt-6 shadow-lg">
                    <CardHeader>
                        <CardTitle>Generated Complaint</CardTitle>
                    </CardHeader>
                    <CardContent className="min-h-[120px]">
                        {isLoading && (
                            <div className="flex items-center justify-center h-full">
                                <Spinner className="h-8 w-8 text-gray-400"/>
                            </div>
                        )}
                        {error && <p className="text-red-600">{error}</p>}
                        {aiOutput && <p className="text-gray-700 whitespace-pre-wrap">{aiOutput}</p>}
                    </CardContent>
                </Card>
            )}
        </main>
    );
}