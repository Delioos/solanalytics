import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/nav/MainNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Medaillon Analytics",
  description: "Data-driven protocol development and analytics platform for Solana ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-[#E9EEEA] text-black font-sans">
        <MainNav />
        {children}
      </body>
    </html>
  );
}
