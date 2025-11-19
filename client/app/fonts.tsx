import { Inter, PT_Mono, PT_Sans } from "next/font/google";

export const Pt_Sans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-sans",
});

export const Pt_Mono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pt-mono",
});

export const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});
