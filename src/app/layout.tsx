import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const rubikFont = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cronoenem - Seu cronograma para o ENEM",
  description: "Seu cronograma para o ENEM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <script async src="https://umami-sand-omega.vercel.app/script.js" data-website-id={process.env.UMAMI_WEBSITE_ID}></script>
      </head>
      <body
        className={`${rubikFont.variable} antialiased`}
      >
        <Header />
        <div className="max-w-5xl min-h-screen mx-auto px-6 xl:px-0">
          {children}
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
