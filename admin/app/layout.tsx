import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { inter } from "./fonts";
import { Providers } from "./providers";
import { Navbar } from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "γ - Watch your TV shows and movies",
  description: "An online video-streaming platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="dark relative">
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
