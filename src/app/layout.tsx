import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { RouteLoadingIndicator } from "@/components/common/RouteLoadingIndicator";
import { CookieBanner } from "@/components/common/CookieBanner";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Golf for Good | Play for Better, Golf for Good",
  description: "Track your golf performance, support your favorite charity, and win exclusive monthly prizes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <RouteLoadingIndicator />
        </Suspense>
        {children}
        <CookieBanner />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
