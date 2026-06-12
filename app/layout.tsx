import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Load Font Nunito untuk tipografi dasar web kamu
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "AJITECH ® | Portfolio",
  description: "Muhammad Ignazi - Fullstack Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}