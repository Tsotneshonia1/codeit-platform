import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeIT - პროგრამირების პლატფორმა", 
  description: "ისწავლე და ატვირთე დავალებები მარტივად",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ka"> 
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0f1a] text-slate-200`}
        >
          <Navbar /> 
          <main className="min-h-screen">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}