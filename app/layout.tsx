import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { Bakbak_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const bakbakOne = Bakbak_One({
//   weight: "400", // Bakbak One only has 400 weight
//   subsets: ["latin"],
// })

export const metadata: Metadata = {
  title: "YNOTNOW",
  description: "YNOTNOW was born from the idea that there’s never a perfect time but only now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
