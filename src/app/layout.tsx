import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/system/SmoothScroll";
import CustomCursor from "@/components/system/CustomCursor";
import DisablePinchZoom from "@/components/system/DisablePinchZoom";

// A variable, high-personality display face — swapped in for the flatter
// Space Grotesk to give headings real character instead of reading generic.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// maximumScale/userScalable stop the standard pinch-zoom gesture on
// Chrome/Firefox/Samsung Internet (Android) and most iOS Safari versions.
// iOS Safari has ignored user-scalable=no for accessibility reasons on and
// off across versions, so DisablePinchZoom below adds a JS-level backstop.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Muhammad Abdullah — Software & AI Engineer",
  description:
    "Full-stack software engineer specializing in React, TypeScript, and the .NET/Azure ecosystem — building cloud-native systems and applied AI products.",
  metadataBase: new URL("https://abdullahbutt.dev"),
  openGraph: {
    title: "Muhammad Abdullah — Software & AI Engineer",
    description:
      "Full-stack software engineer specializing in React, TypeScript, and the .NET/Azure ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body className="bg-bg-void text-fg antialiased">
        <DisablePinchZoom />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
