import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Favicon from "./portfolio-logo-white.png";
import Footer from "./components/Footer";
import { usePageTracking } from "../lib/usePageTracking";

const sourceSans = localFont({
  src: "./fonts/SourceSans3-VariableFont_wght.ttf",
  variable: "--font-body",
  weight: "200 900",
});

const playfairDisplay = localFont({
  src: "./fonts/PlayfairDisplay-VariableFont_wght.ttf",
  variable: "--font-headings",
  weight: "400 900",
});

const lora = localFont({
  src: "./fonts/Lora-VariableFont_wght.ttf",
  variable: "--font-highlights",
  weight: "400 900",
});

const dmSans = localFont({
  src: "./fonts/DMSans-VariableFont_opsz,wght.ttf",
  variable: "--font-cta",
  weight: "100 900",
});

const engagement = localFont({
  src: "./fonts/Engagement-Regular.ttf",
  variable: "--font-special",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Eberechi Omeje",
  description: "My portfolio website",
  icons: [{ rel: "icon", type: "image/png", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // usePageTracking();

  return (
    <html lang="en">
      <body
        className={`${sourceSans.variable} ${playfairDisplay.variable} ${lora.variable} ${dmSans.variable} ${engagement.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
