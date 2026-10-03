import React, { useState } from 'react';
import { User, X, GraduationCap, ArrowRight } from 'lucide-react';
import { StudentClass, StudentProfile } from '../../types';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentProfile) => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState<StudentClass | ''>('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama lengkap tidak boleh kosong.');
      return;
    }
    if (!studentClass) {
      setError('Silakan pilih kelas terlebih dahulu.');
      return;
    }

    setError('');
    const profile: StudentProfile = {
      name: name.trim(),
      studentClass: studentClass as StudentClass,
      loggedInAt: new Date().toISOString()
    };
    onLoginSuccess(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-amber-400 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
          aria-label="Tutup Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-900 text-amber-300 flex items-center justify-center font-bold shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Masuk Dashboard Siswa
            </h3>
            <p className="text-xs text-slate-500">
              Pendidikan Pancasila Kelas X Fase E
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Siswa
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Contoh: Ahmad Rifai"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-700 text-sm font-medium bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Pilih Rombongan Belajar (Kelas)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['X-A', 'X-B', 'X-C'] as StudentClass[]).map((cls) => (
                <button
                  type="button"
                  key={cls}
                  onClick={() => {
                    setStudentClass(cls);
                    setError('');
                  }}
                  className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    studentClass === cls
                      ? 'bg-blue-900 text-amber-300 border-amber-400 shadow-md scale-102'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-sm border-2 border-amber-400 shadow-lg hover:shadow-xl transition-all"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </form>

        <p className="text-[11px] text-slate-400 text-center mt-4">
          Data nama dan kelas akan digunakan untuk pencatatan skor evaluasi resmi.
        </p>

      </div>
    </div>
  );
};
