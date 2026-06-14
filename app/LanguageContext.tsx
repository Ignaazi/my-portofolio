"use client";

import React, { createContext, useContext, useState } from "react";

// 1. Definisikan tipe bahasa yang didukung (string singkatan)
export type LanguageCode = "ID" | "EN" | "JP";

// 2. Interface yang mendefinisikan apa saja yang bisa diakses oleh komponen lain
interface LanguageContextType {
  currentLang: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void; // <--- INI YANG MEMBUAT ERROR NAVBAR HILANG
  t: Record<string, string>;
}

// 3. Kamus bahasa / Translation dictionary untuk seluruh tulisan di web
const translations: Record<LanguageCode, Record<string, string>> = {
  ID: {
    searchPlaceholder: "Cari proyek, riwayat, pengguna...",
    homeTitle: "Selamat Datang di Portofolio Saya",
    aboutTitle: "Tentang Saya",
    projectsTitle: "Proyek Terbaik",
    contactTitle: "Hubungi Saya",
    // Tambahkan teks halamanmu di sini untuk ditranslate
  },
  EN: {
    searchPlaceholder: "Search projects, history, users...",
    homeTitle: "Welcome to My Portfolio",
    aboutTitle: "About Me",
    projectsTitle: "Best Projects",
    contactTitle: "Contact Me",
    // Tambahkan teks halamanmu di sini untuk ditranslate
  },
  JP: {
    searchPlaceholder: "プロジェクト、履歴、ユーザーを検索...",
    homeTitle: "ポートフォリオへようこそ",
    aboutTitle: "私について",
    projectsTitle: "ベストプロジェクト",
    contactTitle: "お問い合わせ",
    // Tambahkan teks halamanmu di sini untuk ditranslate
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("ID");

  // Fungsi untuk mengubah state bahasa global
  const changeLanguage = (lang: LanguageCode) => {
    setCurrentLang(lang);
  };

  // Mengambil data kamus bahasa yang sedang aktif
  const t = translations[currentLang];

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage harus digunakan di dalam LanguageProvider");
  }
  return context;
}