import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import AuthSync from "./components/AuthSync";
import { AppProviders } from "./providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pokebooster",
    description:
        "Ouvrez des boosters pokemon et créez votre collection avec vos cartes préférées",
    keywords: [
        "Pokémon",
        "booster",
        "cartes",
        "collection",
        "TCG",
        "Pokebooster",
    ],
    authors: [{ name: "Pokebooster Team", url: "https://pokebooster.com" }],
    metadataBase: new URL("https://pokebooster.com"),
    openGraph: {
        title: "Pokebooster",
        description:
            "Ouvrez des boosters Pokémon et créez votre collection avec vos cartes préférées.",
        url: "https://pokebooster.com",
        siteName: "Pokebooster",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Pokebooster - Ouvrez des boosters Pokémon en ligne",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pokebooster",
        description:
            "Ouvrez des boosters Pokémon et créez votre collection avec vos cartes préférées.",
        creator: "@Pokebooster",
        images: ["/og-image.png"],
    },
    /*
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    */
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AppProviders>
                    {/* Ajoute le composant de synchro entre next-auth et redux */}
                    <AuthSync />

                    {/* Header */}
                    <Header />

                    {/* Contenu principal */}
                    <main className="flex-1 container mx-auto px-4 py-8">
                        {children}
                    </main>
                </AppProviders>
            </body>
        </html>
    );
}
