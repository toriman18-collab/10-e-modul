import React, { useState } from 'react';
import { 
  BookOpen, 
  Menu, 
  X, 
  User, 
  Shield, 
  GraduationCap, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  student: StudentProfile | null;
  isTeacherLoggedIn: boolean;
  onStudentLogout: () => void;
  onTeacherLogout: () => void;
  onOpenStudentLogin: () => void;
  onOpenTeacherLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  student,
  isTeacherLoggedIn,
  onStudentLogout,
  onTeacherLogout,
  onOpenStudentLogin,
  onOpenTeacherLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tujuan', label: 'Tujuan Pembelajaran' },
    { id: 'pemantik', label: 'Pertanyaan Pemantik' },
    { id: 'manfaat', label: 'Manfaat Pembelajaran' },
    { id: 'materi', label: 'Materi' },
    { id: 'kesimpulan', label: 'Kesimpulan' },
    { id: 'kuis-intro', label: 'Game Kuis' },
    { id: 'dashboard-siswa', label: 'Dashboard Siswa' },
    { id: 'dashboard-guru', label: 'Dashboard Guru' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'dashboard-siswa') {
      if (student) {
        onNavigate('dashboard-siswa');
      } else {
        onOpenStudentLogin();
      }
    } else if (id === 'dashboard-guru') {
      if (isTeacherLoggedIn) {
        onNavigate('dashboard-guru');
      } else {
        onOpenTeacherLogin();
      }
    } else {
      onNavigate(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-900/95 backdrop-blur-md text-white border-b-2 border-amber-400/80 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Zone */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black text-xl shadow-sm transition-transform duration-200 group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-blue-950" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>e-modul-PPKn</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-800 text-amber-300 border border-amber-400/30">Fase E</span>
              </div>
              <p className="text-xs text-blue-200 font-medium">Pendidikan Pancasila Kelas X SMA</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 7).map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'bg-amber-400 text-blue-950 shadow-sm' 
                      : 'text-blue-100 hover:text-white hover:bg-blue-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="hidden md:flex items-center gap-2">
            {student ? (
              <div className="flex items-center gap-2 bg-blue-800/80 border border-blue-700 px-3 py-1.5 rounded-lg text-xs">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <div className="text-left">
                  <div className="font-bold text-white leading-tight max-w-[110px] truncate">{student.name}</div>
                  <div className="text-[10px] text-amber-300 font-semibold">{student.studentClass}</div>
                </div>
                <button
                  onClick={() => onNavigate('dashboard-siswa')}
                  className="ml-1 text-[11px] bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded text-white font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={onStudentLogout}
                  title="Keluar Akun Siswa"
                  className="p-1 hover:text-red-300 text-blue-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenStudentLogin}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-blue-800 text-amber-300 hover:bg-blue-700 border border-amber-400/40 shadow-sm transition-all hover:scale-[1.02]"
              >
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>Dashboard Siswa</span>
              </button>
            )}

            {isTeacherLoggedIn ? (
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-400/60 px-3 py-1.5 rounded-lg text-xs">
                <Shield className="w-4 h-4 text-amber-300" />
                <button
                  onClick={() => onNavigate('dashboard-guru')}
                  className="font-bold text-amber-200 hover:text-white"
                >
                  Panel Guru
                </button>
                <button
                  onClick={onTeacherLogout}
                  title="Logout Guru"
                  className="p-1 hover:text-red-300 text-amber-300"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenTeacherLogin}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-amber-400 text-blue-950 hover:bg-amber-300 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Login Guru</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-800 focus:outline-none"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-blue-950 border-t border-blue-800/80 px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-3 py-1">
            Menu Pembelajaran
          </div>
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-blue-950'
                    : 'text-slate-100 hover:bg-blue-900'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-blue-800/80 space-y-2">
            {student ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-900 border border-blue-700">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-300" />
                  <div>
                    <div className="text-sm font-bold text-white">{student.name}</div>
                    <div className="text-xs text-amber-300 font-semibold">{student.studentClass}</div>
                  </div>
                </div>
                <button
                  onClick={onStudentLogout}
                  className="px-3 py-1.5 text-xs bg-red-600/80 hover:bg-red-600 text-white rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudentLogin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-800 text-amber-300 font-bold text-sm border border-amber-400/40"
              >
                <User className="w-4 h-4" />
                <span>Masuk Dashboard Siswa</span>
              </button>
            )}

            {isTeacherLoggedIn ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/20 border border-amber-400/50">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-300" />
                  <div className="text-sm font-bold text-white">Panel Guru Aktif</div>
                </div>
                <button
                  onClick={onTeacherLogout}
                  className="px-3 py-1.5 text-xs bg-red-600/80 hover:bg-red-600 text-white rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTeacherLogin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 text-blue-950 font-bold text-sm"
              >
                <Shield className="w-4 h-4" />
                <span>Login Panel Guru</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
