import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "No Billionaires Club",
  description:
    "Politics, tech, and news from a 99% perspective. Podcast and blog by No Billionaires Club.",
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
        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-zinc-900">
              No Billionaires Club
            </Link>
            <nav className="flex gap-5 text-sm font-medium text-zinc-700">
              <Link href="/" className="hover:text-zinc-900">
                Home
              </Link>
              <Link href="/podcasts" className="hover:text-zinc-900">
                Podcasts
              </Link>
              <Link href="/blog" className="hover:text-zinc-900">
                Blog
              </Link>
              <Link href="/about" className="hover:text-zinc-900">
                About
              </Link>
              <Link href="/contact" className="hover:text-zinc-900">
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
