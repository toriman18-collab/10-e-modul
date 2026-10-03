import React, { useState, useEffect } from 'react';
import { 
  User, 
  GraduationCap, 
  LogOut, 
  Gamepad2, 
  FileCheck2, 
  Clock, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound,
  History,
  BookOpen
} from 'lucide-react';
import { StudentProfile, TokenType, ExamResult, ExamToken } from '../../types';
import { TokenEntryModal } from './TokenEntryModal';
import { api } from '../../services/api';

interface StudentDashboardProps {
  student: StudentProfile;
  onLogout: () => void;
  onStartExam: (type: TokenType, token: ExamToken) => void;
  onGoToMaterial: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  onLogout,
  onStartExam,
  onGoToMaterial
}) => {
  const [selectedExamType, setSelectedExamType] = useState<TokenType | null>(null);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [studentHistory, setStudentHistory] = useState<ExamResult[]>([]);

  useEffect(() => {
    loadHistory();
  }, [student]);

  const loadHistory = async () => {
    const results = await api.getResults();
    const myResults = results.filter(
      r => r.studentName.toLowerCase() === student.name.toLowerCase() && r.studentClass === student.studentClass
    );
    setStudentHistory(myResults);
  };

  const handleOpenExam = (type: TokenType) => {
    setSelectedExamType(type);
    setIsTokenModalOpen(true);
  };

  const handleTokenValidated = (token: ExamToken) => {
    setIsTokenModalOpen(false);
    if (selectedExamType) {
      onStartExam(selectedExamType, token);
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Blue Header Dashboard */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-amber-200">
              <GraduationCap className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-amber-300 text-xs font-bold border border-amber-400/40 mb-1">
                <User className="w-3.5 h-3.5" />
                <span>Portal Siswa Kelas X Fase E</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {student.name}
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 font-semibold mt-0.5">
                Rombongan Belajar: <span className="text-amber-400 font-black">{student.studentClass}</span> · SMAN 1 / Kurikulum Merdeka
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToMaterial}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm border border-blue-600 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Baca Modul</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* 2 Main Examination Options */}
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Pilihan Evaluasi Pembelajaran
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih jenis ujian di bawah ini. Anda membutuhkan token pengawas dari guru untuk memulai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OPTION 1: GAME KUIS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 hover:border-amber-400 shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-blue-950 group-hover:scale-105 transition-transform">
                    <Gamepad2 className="w-8 h-8 text-amber-600" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-extrabold text-xs">
                    Live Quiz
                  </span>
                </div>

                <h4 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors text-left">
                  1. Game Kuis Interaktif
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 text-justify leading-relaxed mb-4">
                  Kuis cepat berkecepatan tinggi menguji penguasaan dasar materi sidang BPUPK. Setiap soal dibatasi waktu hitung mundur 20 detik secara realtime.
                </p>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Jumlah Soal:</span>
                    <span className="font-bold text-slate-900">5 Soal (3 PG + 2 B/S)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Batas Waktu per Soal:</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 20 Detik
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Syarat Masuk:</span>
                    <span className="font-bold text-blue-800 flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-amber-500" /> Token Game Kuis
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleOpenExam('quiz')}
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm border border-amber-300 shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-102"
                >
                  <span>Mulai Game Kuis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* OPTION 2: UJI KOMPETENSI */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 hover:border-amber-400 shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900 group-hover:scale-105 transition-transform">
                    <FileCheck2 className="w-8 h-8 text-blue-800" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 font-extrabold text-xs">
                    Asesmen AKM
                  </span>
                </div>

                <h4 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors text-left">
                  2. Uji Kompetensi (AKM)
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 text-justify leading-relaxed mb-4">
                  Asesmen komprehensif berbasis stimulus dan HOTS untuk mengukur daya analisis mendalam mengenai pemikiran Mohammad Yamin, Soepomo, dan Soekarno.
                </p>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Jumlah Soal:</span>
                    <span className="font-bold text-slate-900">20 Soal (PG, B/S, Kompleks, Menjodohkan)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Durasi Ujian:</span>
                    <span className="font-bold text-blue-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 90 Menit Realtime
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Syarat Masuk:</span>
                    <span className="font-bold text-blue-800 flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-amber-500" /> Token Uji Kompetensi
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleOpenExam('competency')}
                  className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm border-2 border-amber-400 shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-102"
                >
                  <span>Mulai Uji Kompetensi</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Student History Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
            <History className="w-5 h-5 text-blue-800" />
            <h4 className="text-lg font-bold text-slate-900">
              Riwayat Hasil Evaluasi Anda
            </h4>
          </div>

          {studentHistory.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
              Belum ada riwayat pengerjaan ujian untuk akun Anda. Silakan ikuti Game Kuis atau Uji Kompetensi di atas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-3 px-4 font-bold">Jenis Ujian</th>
                    <th className="py-3 px-4 font-bold">Token Digunakan</th>
                    <th className="py-3 px-4 font-bold">Nilai</th>
                    <th className="py-3 px-4 font-bold">Benar / Salah</th>
                    <th className="py-3 px-4 font-bold">Kategori</th>
                    <th className="py-3 px-4 font-bold">Waktu Pengumpulan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {item.examType === 'quiz' ? 'Game Kuis (5 Soal)' : 'Uji Kompetensi (20 Soal)'}
                      </td>
                      <td className="py-3 px-4 font-mono text-blue-700">
                        {item.tokenUsed}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-base text-blue-900">
                          {item.score}
                        </span>
                        <span className="text-slate-400 text-xs">/100</span>
                      </td>
                      <td className="py-3 px-4 text-xs font-semibold">
                        <span className="text-emerald-700">{item.correctCount} Benar</span>
                        <span className="mx-1 text-slate-300">·</span>
                        <span className="text-red-700">{item.wrongCount} Salah</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">
                        {new Date(item.submittedAt).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Token Entry Modal */}
      {selectedExamType && (
        <TokenEntryModal
          isOpen={isTokenModalOpen}
          onClose={() => setIsTokenModalOpen(false)}
          examType={selectedExamType}
          onTokenValidated={handleTokenValidated}
        />
      )}
    </div>
  );
};
