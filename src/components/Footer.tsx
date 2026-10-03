import React from 'react';
import { BookOpen, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenTeacherLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTeacherLogin }) => {
  return (
    <footer className="bg-blue-950 text-white border-t-2 border-amber-400/60 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-blue-900">
          
          {/* Brand */}
          <div className="md:col-span-6 space-y-2 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-blue-950 flex items-center justify-center font-black text-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white">e-modul-PPKn</span>
            </div>
            <p className="text-xs text-blue-200/80 leading-relaxed max-w-md">
              Modul Pembelajaran Interaktif Pendidikan Pancasila SMA Kelas X Fase E Semester Ganjil. Dirancang berdasarkan Kurikulum Merdeka untuk menumbuhkan Profil Pelajar Pancasila.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-x-6 gap-y-2 text-xs font-semibold text-blue-200">
            <button onClick={() => onNavigate('home')} className="hover:text-amber-300 transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate('tujuan')} className="hover:text-amber-300 transition-colors">
              Tujuan
            </button>
            <button onClick={() => onNavigate('materi')} className="hover:text-amber-300 transition-colors">
              Materi 17 Bab
            </button>
            <button onClick={() => onNavigate('kesimpulan')} className="hover:text-amber-300 transition-colors">
              Kesimpulan
            </button>
            <button onClick={() => onNavigate('dashboard-siswa')} className="hover:text-amber-300 transition-colors">
              Dashboard Siswa
            </button>
            <button onClick={onOpenTeacherLogin} className="hover:text-amber-300 transition-colors text-amber-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Login Guru</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300/70">
          <p>© {new Date().getFullYear()} e-modul-PPKn SMA Kelas X. SMAN 1 Indonesia.</p>
          <p className="flex items-center gap-1">
            <span>Mengabdi untuk Pendidikan Kebangsaan Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
