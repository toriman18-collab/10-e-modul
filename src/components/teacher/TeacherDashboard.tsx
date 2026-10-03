import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  User, 
  LogOut, 
  KeyRound, 
  Copy, 
  Check, 
  PowerOff, 
  Download, 
  Trash2, 
  RotateCcw, 
  Trophy, 
  BarChart3, 
  Users, 
  FileSpreadsheet, 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  FileText,
  Eye,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { ExamResult, ExamToken, StudentClass, TokenType } from '../../types';
import { api } from '../../services/api';

interface TeacherDashboardProps {
  teacher: any;
  onLogout: () => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  onLogout,
  onShowToast
}) => {
  const [tokens, setTokens] = useState<ExamToken[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);
  
  // Modals state
  const [resetModalData, setResetModalData] = useState<ExamResult | null>(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [viewClassRekap, setViewClassRekap] = useState<StudentClass | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fetchedTokens = await api.getTokens();
    const fetchedResults = await api.getResults();
    setTokens(fetchedTokens);
    setResults(fetchedResults);
  };

  // Generate Token
  const handleGenerateToken = async (type: TokenType) => {
    const res = await api.generateToken(type);
    if (res.success && res.token) {
      await loadData();
      onShowToast(`Token ${type === 'quiz' ? 'Game Kuis' : 'Uji Kompetensi'} berhasil dibuat!`, 'success');
    } else {
      onShowToast('Gagal membuat token baru.', 'error');
    }
  };

  // Deactivate Token
  const handleDeactivateToken = async (id: string) => {
    const success = await api.deactivateToken(id);
    if (success) {
      await loadData();
      onShowToast('Token berhasil dinonaktifkan.', 'info');
    }
  };

  // Copy Token Code
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTokenId(id);
    onShowToast(`Kode ${code} disalin ke clipboard!`, 'success');
    setTimeout(() => setCopiedTokenId(null), 2000);
  };

  // Reset Student Result
  const handleConfirmReset = async () => {
    if (!resetModalData) return;
    const success = await api.resetResult(resetModalData.id);
    if (success) {
      await loadData();
      onShowToast(`Hasil ujian ${resetModalData.studentName} berhasil direset.`, 'success');
    } else {
      onShowToast('Gagal mereset hasil ujian.', 'error');
    }
    setResetModalData(null);
  };

  // Delete All Data
  const handleConfirmDeleteAll = async () => {
    const success = await api.deleteAllResults();
    if (success) {
      await loadData();
      onShowToast('Seluruh data respon siswa berhasil dihapus.', 'warning');
    }
    setShowDeleteAllModal(false);
  };

  // Export handlers
  const handleExportCSV = () => {
    api.downloadCSV();
    onShowToast('Mengunduh rekap-nilai-ppkn.csv...', 'success');
  };

  const handleExportExcel = () => {
    api.downloadExcel();
    onShowToast('Mengunduh rekap-nilai-ppkn.xlsx...', 'success');
  };

  const handleDownloadClassExcel = (cls: StudentClass) => {
    api.downloadExcel(cls);
    onShowToast(`Mengunduh rekap-nilai-ppkn-${cls}.xlsx...`, 'success');
  };

  // Filter Active Tokens
  const latestQuizToken = tokens.find(t => t.type === 'quiz' && t.status === 'active') || tokens.find(t => t.type === 'quiz');
  const latestCompetencyToken = tokens.find(t => t.type === 'competency' && t.status === 'active') || tokens.find(t => t.type === 'competency');

  // Top 5 Results
  const quizResults = results.filter(r => r.examType === 'quiz');
  const competencyResults = results.filter(r => r.examType === 'competency');

  const top5Quiz = [...quizResults].sort((a, b) => b.score - a.score).slice(0, 5);
  const top5Competency = [...competencyResults].sort((a, b) => b.score - a.score).slice(0, 5);

  // Class Aggregation Helper
  const getClassStats = (cls: StudentClass) => {
    const classResults = results.filter(r => r.studentClass === cls);
    const studentsMap = new Map<string, { quizScore?: number; compScore?: number }>();

    classResults.forEach(r => {
      const current = studentsMap.get(r.studentName) || {};
      if (r.examType === 'quiz') current.quizScore = r.score;
      if (r.examType === 'competency') current.compScore = r.score;
      studentsMap.set(r.studentName, current);
    });

    return {
      totalResponses: classResults.length,
      uniqueStudentsCount: studentsMap.size,
      studentEntries: Array.from(studentsMap.entries()).map(([name, scores]) => {
        const q = scores.quizScore !== undefined ? scores.quizScore : '-';
        const c = scores.compScore !== undefined ? scores.compScore : '-';
        let finalScore = '-';
        if (scores.quizScore !== undefined && scores.compScore !== undefined) {
          finalScore = String(Math.round((scores.quizScore * 0.3) + (scores.compScore * 0.7)));
        } else if (scores.compScore !== undefined) {
          finalScore = String(scores.compScore);
        } else if (scores.quizScore !== undefined) {
          finalScore = String(scores.quizScore);
        }
        return { name, quiz: q, competency: c, finalScore };
      })
    };
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ============================================================== */}
        {/* 1. HEADER DASHBOARD GURU                                       */}
        {/* ============================================================== */}
        <div className="bg-blue-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-lg">
              <Shield className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-amber-300 text-xs font-bold border border-amber-400/40 mb-1">
                <span>Panel Pendidik & Administrasi Ujian</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {teacher?.name || 'Drs. Supriyanto, M.Pd.'}
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 font-semibold mt-0.5">
                Guru Mata Pelajaran: Pendidikan Pancasila · SMAN 1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm border border-blue-600 transition-colors shadow-sm"
              title="Perbarui Data Realtime"
            >
              <RefreshCw className="w-4 h-4 text-amber-300" />
              <span>Segarkan Data</span>
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

        {/* ============================================================== */}
        {/* 2. CARD GENERATE TOKEN (DUA CARD TERPISAH)                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CARD 1: TOKEN GAME KUIS */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                      Token Akses 01
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      Generate Token Game Kuis
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerateToken('quiz')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-xs shadow-sm transition-all"
                >
                  Generate Kode
                </button>
              </div>

              {latestQuizToken ? (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">Kode Token Aktif:</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      latestQuizToken.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {latestQuizToken.status === 'active' ? '● Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-200">
                    <span className="font-mono text-xl font-black text-blue-950 tracking-wider">
                      {latestQuizToken.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyCode(latestQuizToken.id, latestQuizToken.code)}
                        className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-blue-950 text-xs font-bold flex items-center gap-1"
                        title="Salin Kode Token"
                      >
                        {copiedTokenId === latestQuizToken.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedTokenId === latestQuizToken.id ? 'Tersalin' : 'Salin'}</span>
                      </button>

                      {latestQuizToken.status === 'active' && (
                        <button
                          onClick={() => handleDeactivateToken(latestQuizToken.id)}
                          className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold"
                          title="Nonaktifkan Token"
                        >
                          <PowerOff className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5">
                    <div>Waktu Dibuat: {new Date(latestQuizToken.createdAt).toLocaleTimeString('id-ID')} WIB</div>
                    <div>Masa Berlaku: 12 Jam sejak pembuatan</div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  Belum ada token aktif. Tekan "Generate Kode" untuk membuat token.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Hanya berlaku untuk: Game Kuis (5 Soal)</span>
              <span className="text-amber-600 font-bold">Terpisah</span>
            </div>
          </div>

          {/* CARD 2: TOKEN UJI KOMPETENSI */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                      Token Akses 02
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      Generate Token Uji Kompetensi
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerateToken('competency')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs shadow-sm border border-amber-400 transition-all"
                >
                  Generate Kode
                </button>
              </div>

              {latestCompetencyToken ? (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">Kode Token Aktif:</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      latestCompetencyToken.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {latestCompetencyToken.status === 'active' ? '● Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-200">
                    <span className="font-mono text-xl font-black text-blue-950 tracking-wider">
                      {latestCompetencyToken.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyCode(latestCompetencyToken.id, latestCompetencyToken.code)}
                        className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-950 text-xs font-bold flex items-center gap-1"
                        title="Salin Kode Token"
                      >
                        {copiedTokenId === latestCompetencyToken.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedTokenId === latestCompetencyToken.id ? 'Tersalin' : 'Salin'}</span>
                      </button>

                      {latestCompetencyToken.status === 'active' && (
                        <button
                          onClick={() => handleDeactivateToken(latestCompetencyToken.id)}
                          className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold"
                          title="Nonaktifkan Token"
                        >
                          <PowerOff className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5">
                    <div>Waktu Dibuat: {new Date(latestCompetencyToken.createdAt).toLocaleTimeString('id-ID')} WIB</div>
                    <div>Masa Berlaku: 12 Jam sejak pembuatan</div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  Belum ada token aktif. Tekan "Generate Kode" untuk membuat token.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Hanya berlaku untuk: Uji Kompetensi AKM (20 Soal)</span>
              <span className="text-blue-800 font-bold">Terpisah</span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 3. DASHBOARD STATISTIK GURU (TOP 5 REALTIME)                   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Game Kuis Top 5 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200 hover:border-amber-400 shadow-md transition-all hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-black text-slate-900">
                  Top 5 Nilai Game Kuis
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {quizResults.length} Respon Masuk
              </span>
            </div>

            {top5Quiz.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Belum ada data nilai Game Kuis.
              </div>
            ) : (
              <div className="space-y-2">
                {top5Quiz.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        idx === 0 ? 'bg-amber-400 text-blue-950 font-black' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.studentName}</div>
                        <div className="text-[10px] text-slate-500">Kelas {item.studentClass}</div>
                      </div>
                    </div>
                    <span className="font-mono font-black text-sm text-blue-900">
                      {item.score} / 100
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card Uji Kompetensi Top 5 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200 hover:border-amber-400 shadow-md transition-all hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-black text-slate-900">
                  Top 5 Nilai Uji Kompetensi
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {competencyResults.length} Respon Masuk
              </span>
            </div>

            {top5Competency.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Belum ada data nilai Uji Kompetensi.
              </div>
            ) : (
              <div className="space-y-2">
                {top5Competency.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        idx === 0 ? 'bg-amber-400 text-blue-950 font-black' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.studentName}</div>
                        <div className="text-[10px] text-slate-500">Kelas {item.studentClass}</div>
                      </div>
                    </div>
                    <span className="font-mono font-black text-sm text-blue-900">
                      {item.score} / 100
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ============================================================== */}
        {/* 4. GRAFIK NILAI OTOMATIS TERBARU (TANPA DATA PALSU)           */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Grafik Sebaran Nilai Siswa
                </h3>
                <p className="text-xs text-slate-500">
                  Otomatis terbarui saat ada pengumpulan respon ujian baru
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Total {results.length} Respon
            </span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              Belum ada data nilai yang masuk. Grafik akan otomatis tampil ketika siswa telah menyelesaikan ujian.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Chart 1: Game Kuis */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Distribusi Nilai: Game Kuis (5 Soal)
                </span>
                {quizResults.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border">
                    Belum ada nilai kuis.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {quizResults.slice(0, 6).map((item) => (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-700">
                          <span className="truncate max-w-[200px]">{item.studentName} ({item.studentClass})</span>
                          <span className="font-mono font-bold text-blue-900">{item.score}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(5, item.score)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chart 2: Uji Kompetensi */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Distribusi Nilai: Uji Kompetensi (AKM 20 Soal)
                </span>
                {competencyResults.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border">
                    Belum ada nilai uji kompetensi.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {competencyResults.slice(0, 6).map((item) => (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-700">
                          <span className="truncate max-w-[200px]">{item.studentName} ({item.studentClass})</span>
                          <span className="font-mono font-bold text-blue-900">{item.score}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-700 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(5, item.score)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 5. REKAP NILAI PER KELAS (X-A, X-B, X-C)                       */}
        {/* ============================================================== */}
        <div>
          <div className="text-left mb-4">
            <h3 className="text-xl font-black text-slate-900">
              Rekapitulasi Nilai per Rombel Kelas
            </h3>
            <p className="text-xs text-slate-500">
              Lihat rangkuman per kelas dan unduh lembar kerja Excel khusus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['X-A', 'X-B', 'X-C'] as StudentClass[]).map((cls) => {
              const stats = getClassStats(cls);
              return (
                <div
                  key={cls}
                  className="bg-white rounded-3xl p-6 border-2 border-blue-200 hover:border-amber-400 shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-black text-blue-950">
                        Kelas {cls}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                        {stats.uniqueStudentsCount} Siswa Terdata
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mb-4">
                      Total respon terkirim: {stats.totalResponses} kali pengerjaan.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setViewClassRekap(cls)}
                      className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Rekap</span>
                    </button>
                    <button
                      onClick={() => handleDownloadClassExcel(cls)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Excel {cls}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 6. MONITORING SISWA REALTIME & AKSI RESET                     */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Monitoring Siswa Realtime
              </h3>
              <p className="text-xs text-slate-500">
                Daftar seluruh respon siswa yang telah submit ujian
              </p>
            </div>

            {/* Global Actions: Export & Delete All */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportExcel}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Excel</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => setShowDeleteAllModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Semua Data</span>
              </button>
            </div>
          </div>

          {/* Table */}
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              Belum ada data siswa yang mengerjakan ujian.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white border-b-2 border-amber-400">
                    <th className="py-3.5 px-4 font-bold">No</th>
                    <th className="py-3.5 px-4 font-bold">Nama Lengkap</th>
                    <th className="py-3.5 px-4 font-bold">Kelas</th>
                    <th className="py-3.5 px-4 font-bold">Jenis Ujian</th>
                    <th className="py-3.5 px-4 font-bold">Nilai</th>
                    <th className="py-3.5 px-4 font-bold">Kategori</th>
                    <th className="py-3.5 px-4 font-bold">Waktu Submit</th>
                    <th className="py-3.5 px-4 font-bold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {results.map((r, idx) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{r.studentName}</td>
                      <td className="py-3 px-4 font-semibold text-blue-800">{r.studentClass}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          r.examType === 'quiz' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                        }`}>
                          {r.examType === 'quiz' ? 'Game Kuis' : 'Uji Kompetensi'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-black text-sm text-slate-900">
                        {r.score}
                      </td>
                      <td className="py-3 px-4 text-xs">{r.category}</td>
                      <td className="py-3 px-4 text-xs text-slate-500">
                        {new Date(r.submittedAt).toLocaleTimeString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setResetModalData(r)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors"
                          title="Reset Ujian Siswa Ini"
                        >
                          Reset Ujian
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL RESET UJIAN SPESIFIK                                     */}
      {/* ============================================================== */}
      {resetModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 border-2 border-amber-400 shadow-2xl relative text-left">
            <button
              onClick={() => setResetModalData(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              Konfirmasi Reset Ujian
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 text-justify">
              Apakah Anda yakin ingin mereset hasil ujian untuk siswa <strong>{resetModalData.studentName}</strong> (Kelas {resetModalData.studentClass}) pada ujian <strong>{resetModalData.examType === 'quiz' ? 'Game Kuis' : 'Uji Kompetensi'}</strong>? Data nilai siswa ini akan dihapus dan siswa dapat mengulang ujian kembali.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setResetModalData(null)}
                className="py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReset}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md"
              >
                Ya, Reset Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL HAPUS SEMUA DATA                                         */}
      {/* ============================================================== */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 border-2 border-red-500 shadow-2xl relative text-left">
            <button
              onClick={() => setShowDeleteAllModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              Hapus Seluruh Data Respon Siswa
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 text-justify">
              Apakah Anda yakin ingin menghapus seluruh data respon siswa? Tindakan ini akan mengosongkan seluruh riwayat ujian dan nilai yang telah masuk.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowDeleteAllModal(false)}
                className="py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDeleteAll}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md"
              >
                Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL LIHAT REKAP KELAS (X-A, X-B, X-C)                         */}
      {/* ============================================================== */}
      {viewClassRekap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 border-2 border-blue-400 shadow-2xl relative text-left max-h-[85vh] flex flex-col">
            <button
              onClick={() => setViewClassRekap(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                  Rekapitulasi Nilai Siswa
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Kelas {viewClassRekap}
                </h3>
              </div>
              <button
                onClick={() => handleDownloadClassExcel(viewClassRekap)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Excel</span>
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-1">
              {getClassStats(viewClassRekap).studentEntries.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
                  Belum ada siswa kelas {viewClassRekap} yang menyelesaikan ujian.
                </div>
              ) : (
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="py-2.5 px-3 font-bold">No</th>
                      <th className="py-2.5 px-3 font-bold">Nama Lengkap</th>
                      <th className="py-2.5 px-3 font-bold">Kelas</th>
                      <th className="py-2.5 px-3 font-bold">Game Kuis</th>
                      <th className="py-2.5 px-3 font-bold">Uji Kompetensi</th>
                      <th className="py-2.5 px-3 font-bold">Nilai Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {getClassStats(viewClassRekap).studentEntries.map((st, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-500 font-bold">{i + 1}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{st.name}</td>
                        <td className="py-2.5 px-3 text-blue-800 font-semibold">{viewClassRekap}</td>
                        <td className="py-2.5 px-3 font-mono">{st.quiz}</td>
                        <td className="py-2.5 px-3 font-mono">{st.competency}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-900">{st.finalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setViewClassRekap(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
