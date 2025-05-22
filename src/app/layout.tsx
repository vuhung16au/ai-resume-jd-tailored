import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "AI✨resume+jd=tailored",
  description: "Customize your resume to match job descriptions with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col dark:text-white">
          {children}
          
          <footer className="mt-auto py-4 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} AI✨resume+jd=tailored
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
