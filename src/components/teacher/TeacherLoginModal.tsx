import React, { useState } from 'react';
import { Shield, X, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

interface TeacherLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (teacherData: any) => void;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Username dan password harus diisi.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await api.loginTeacher(username.trim(), password);
    setLoading(false);

    if (res.success && res.teacher) {
      onLoginSuccess(res.teacher);
    } else {
      setError(res.message || 'Username atau password salah.');
    }
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
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Autentikasi Guru
            </h3>
            <p className="text-xs text-slate-500">
              Panel Pengawas & Rekap Nilai Evaluasi
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
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="Masukkan username Anda"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-700 text-sm font-medium bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Masukkan password Anda"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-700 text-sm font-medium bg-slate-50"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm border-2 border-amber-400 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-[11px] text-slate-400 text-center mt-5">
          Akses khusus pendidik mata pelajaran Pendidikan Pancasila.
        </p>

      </div>
    </div>
  );
};
