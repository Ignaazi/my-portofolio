"use client";

interface AboutPageProps {
  isDarkMode: boolean;
}

export default function AboutPage({ isDarkMode }: AboutPageProps) {
  const textTitleColor = isDarkMode ? "text-white" : "text-[#012970]";
  const textBodyColor = isDarkMode ? "text-slate-300" : "text-slate-700";
  
  // Menggunakan warna garis yang sama persis dengan sidebar kamu
  const niceAdminBorder = isDarkMode ? "border-slate-800/80" : "border-[#e0e9f7]";

  return (
    <div className="w-full flex flex-col gap-6 py-6 animate-fade-in">
      
      {/* ==================== JUDUL DI TENGAH (FONT DIGEDEIN) & GARIS FULL ==================== */}
      <div className={`flex flex-col items-center justify-center border-b pb-4 ${niceAdminBorder}`}>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight text-center ${textTitleColor}`}>
          ABOUT ME
        </h1>
      </div>

      {/* ==================== NARASI UTAMA (TETAP RATA KIRI & LEBAR FULL) ==================== */}
      <div className={`flex flex-col gap-4 text-sm md:text-base leading-relaxed font-medium text-left ${textBodyColor}`}>
        
        <p>
          Saya adalah seorang penyedia jasa layanan pembuatan aplikasi yang saat ini bekerja sebagai Programmer SMT di PT SIIX. Memiliki pengalaman kerja selama 4 tahun di industri, perjalanan karir saya dimulai dari bawah sebagai pengguna sistem operasional perusahaan.
        </p>

        <p>
          Latar belakang tersebut memotivasi saya kuliah di President University jurusan Sistem Informasi dengan konsentrasi ERP. Dari ilmu yang didapatkan, saya mulai melakukan improvisasi langsung di perusahaan tempat saya bekerja untuk mengembangkan skill.
        </p>

        <p>
          Melalui pengamatan pada sistem perusahaan yang sudah canggih, kini misi saya adalah membantu usaha UMKM maupun perusahaan lain yang ingin melakukan upgrade otomatisasi menggunakan sistem digital. Saya berharap aplikasi yang saya bangun dapat mempermudah pekerjaan operasional harian Anda.
        </p>

      </div>

    </div>
  );
}