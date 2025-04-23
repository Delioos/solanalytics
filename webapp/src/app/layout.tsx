import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/nav/MainNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
  variable: "--font-roboto",
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
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-white via-purple-blue/20 to-purple-hard/10 font-sans">
        <MainNav />
        {children}
      </body>
    </html>
  );
}
