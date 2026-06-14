import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script"; // <--- Wajib diimport untuk memasukkan script otomatis
import { LanguageProvider } from "./LanguageContext"; // Panggilan sejajar karena satu folder di /app
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
    /* TIPS 1: Menambahkan bg-white secara global pada <html> untuk mencegah background default browser bocor.
      TIPS 2: Menambahkan 'overscroll-none' jika kamu ingin mematikan total efek membal/bocor saat di-scroll mentok.
    */
    <html lang="id" className="bg-white dark:bg-[#0b1425] overscroll-none">
      {/* TIPS 3: Berikan warna background dasar pada body yang sinkron dengan aplikasi kamu.
        Di sini kita set 'bg-[#f6f9ff] dark:bg-[#0b1425]' agar kalau user scroll mentok, 
        warna yang bocor adalah warna tema portofoliomu sendiri, bukan garis hitam default browser.
      */}
      <body className={`${nunito.className} min-h-screen flex flex-col bg-[#f6f9ff] dark:bg-[#0b1425] transition-colors duration-300`}>
        {/* Bungkus children dengan LanguageProvider agar state bahasa aktif di semua halaman */}
        <LanguageProvider>
          {children}
        </LanguageProvider>

        {/* ==================== GOOGLE TRANSLATE ENGINE (AUTO) ==================== */}
        {/* Wadah asli Google Translate kita sembunyikan via CSS (display: none) agar tampilan web tetap rapi dan premium */}
        <div id="google_translate_element" style={{ display: "none" }} />
        
        {/* Memuat script core translator utama */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Menginisialisasi setelan bahasa dasar (id) dan bahasa target (id, en, ja) */}
        <Script id="google-translate-custom" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'id',
                includedLanguages: 'id,en,ja',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  );
}