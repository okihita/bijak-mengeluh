import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {AddToHomeScreen} from "@/components/pwa/add-to-home-screen";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bijak Mengeluh",
    description: "Sampaikan 😡keluhan😡 dengan tepat",
    manifest: "/manifest.json",
};

export default function RootLayout({children,}: { readonly children: React.ReactNode; }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
        </ThemeProvider>
        <AddToHomeScreen/>
        </body>
        </html>
    );
}
