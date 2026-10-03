import React from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  User, 
  Shield, 
  Sparkles, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Award
} from 'lucide-react';

interface HomeSectionProps {
  onStartLearning: () => void;
  onOpenStudentDashboard: () => void;
  onOpenTeacherLogin: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onStartLearning,
  onOpenStudentDashboard,
  onOpenTeacherLogin
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white">
      {/* Background Decorative Polygons & Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
      </div>

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Kurikulum Merdeka · Fase E Semester Ganjil</span>
            </div>

            {/* Main App Title */}
            <div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                <span className="text-amber-400">e-modul-PPKn</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-100 mt-1">
                  Pendidikan Pancasila SMA Kelas X
                </span>
              </div>
            </div>

            {/* Sub Bab Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border-2 border-amber-400/60 backdrop-blur-md shadow-xl">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block mb-1">
                Sub Bab Pembelajaran:
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                Menganalisis ide-ide para pendiri bangsa tentang dasar negara pada sidang Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan (BPUPK)
              </h2>
            </div>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl text-justify">
              Selamat datang di modul interaktif Pendidikan Pancasila. Modul ini dirancang khusus untuk memandu siswa SMA menganalisis perdebatan luhur, sintesis pemikiran Mohammad Yamin, Prof. Soepomo, dan Ir. Soekarno, serta menghayati teladan musyawarah mufakat demi persatuan bangsa Indonesia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartLearning}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-blue-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 border border-amber-300"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenStudentDashboard}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-blue-800 text-white font-bold text-sm sm:text-base border border-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-md"
              >
                <User className="w-4 h-4 text-amber-300" />
                <span>Dashboard Siswa</span>
              </button>

              <button
                onClick={onOpenTeacherLogin}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 text-amber-300 font-bold text-sm sm:text-base border border-amber-400/40 hover:bg-slate-800 transition-all hover:scale-105"
              >
                <Shield className="w-4 h-4" />
                <span>Login Guru</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Illustration & Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl group bg-blue-950">
              <img
                src="/src/assets/images/bpupk_historic_hall_1790981135685.jpg"
                alt="Ilustrasi Gedung Chuo Sangi In (Gedung Pancasila) Sidang BPUPK 1945"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent"></div>
              
              <div className="absolute bottom-3 left-4 right-4 text-left">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Gedung Chuo Sangi In (Gedung Pancasila, Pejambon)</span>
                </div>
                <p className="text-xs text-blue-100 font-medium leading-tight">
                  Saksi bisu perumusan lima asas dasar negara Republik Indonesia oleh para pendiri bangsa.
                </p>
              </div>
            </div>

            {/* Feature Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/10 border border-blue-400/30 backdrop-blur-sm text-left">
                <div className="flex items-center gap-2 text-amber-300 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold">29 Mei – 1 Juni 1945</span>
                </div>
                <div className="text-xs text-blue-200">Sidang Pertama Perumusan Dasar Negara</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-blue-400/30 backdrop-blur-sm text-left">
                <div className="flex items-center gap-2 text-emerald-300 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold">3 Tokoh Utama</span>
                </div>
                <div className="text-xs text-blue-200">Mohammad Yamin, Soepomo, & Soekarno</div>
              </div>
            </div>

            {/* Quick Points Banner */}
            <div className="p-3.5 rounded-xl bg-amber-400/15 border border-amber-400/40 text-left flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-100 leading-snug">
                <span className="font-bold text-amber-300">Dilengkapi Fitur Evaluasi: </span>
                Game Kuis 5 soal bertimer 20s, serta Uji Kompetensi 20 soal AKM (PG, Benar/Salah, Kompleks, Menjodohkan) dengan token pengawas guru.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Hero Bottom Strip */}
      <div className="border-t border-blue-800/80 bg-blue-950/80 backdrop-blur-sm py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Aplikasi Interaktif Siap Digunakan Laptop, Tablet, & Smartphone</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Standar Kurikulum Merdeka</span>
            <span>·</span>
            <span>Fase E SMA</span>
            <span>·</span>
            <span className="text-amber-300 font-semibold">Tahun Ajaran 2024/2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};
