import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

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
      <body
        className={`${rubikFont.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
