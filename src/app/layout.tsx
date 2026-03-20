import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GTA Casino Utility - Diamond Casino & Resort",
  description: "Découvrez le véhicule du podium et les bonus exclusifs du Diamond Casino de GTA Online. Mise à jour hebdomadaire avec toutes les récompenses.",
  keywords: ["GTA", "GTA Online", "Diamond Casino", "Podium Vehicle", "GTA V", "Rockstar Games", "Casino", "Bonus"],
  authors: [{ name: "GTA Casino Utility" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23fbbf24' rx='20' width='100' height='100'/><text x='50' y='70' font-size='60' text-anchor='middle' fill='black'>💎</text></svg>",
  },
  openGraph: {
    title: "GTA Casino Utility",
    description: "Votre source pour les bonus du Diamond Casino",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA Casino Utility",
    description: "Votre source pour les bonus du Diamond Casino",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${rajdhani.variable} antialiased bg-black text-foreground font-sans`}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
