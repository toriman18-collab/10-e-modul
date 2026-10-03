import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  AlertCircle, 
  Trophy, 
  X, 
  FileCheck2,
  Shuffle
} from 'lucide-react';
import { COMPETENCY_QUESTIONS } from '../../data/competencyQuestions';
import { ExamResult, ExamToken, StudentProfile, StudentAnswerState } from '../../types';
import { api } from '../../services/api';

interface CompetencyExamViewProps {
  student: StudentProfile;
  token: ExamToken;
  onFinish: (result: ExamResult) => void;
  onBackToDashboard: () => void;
}

const TOTAL_DURATION_SECONDS = 90 * 60; // 90 menit = 5400 detik
const STORAGE_PREFIX = 'emodul_ppkn_competency_';

export const CompetencyExamView: React.FC<CompetencyExamViewProps> = ({
  student,
  token,
  onFinish,
  onBackToDashboard
}) => {
  const sessionKey = `${STORAGE_PREFIX}${student.name}_${student.studentClass}_${token.code}`;
  
  // Initialize timer and state from storage or fresh
  const [startTime] = useState<string>(() => {
    const saved = localStorage.getItem(`${sessionKey}_start`);
    if (saved) return saved;
    const now = new Date().toISOString();
    localStorage.setItem(`${sessionKey}_start`, now);
    return now;
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  
  const [answersState, setAnswersState] = useState<StudentAnswerState>(() => {
    try {
      const saved = localStorage.getItem(`${sessionKey}_answers`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Calculate elapsed time from start
  const getInitialRemainingSeconds = () => {
    const startTimestamp = new Date(startTime).getTime();
    const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
    const rem = TOTAL_DURATION_SECONDS - elapsedSeconds;
    return rem > 0 ? rem : 0;
  };

  const [secondsLeft, setSecondsLeft] = useState<number>(getInitialRemainingSeconds);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState<ExamResult | null>(null);

  // Realtime Countdown Timer
  useEffect(() => {
    if (finalResult || isSubmitting) return;

    const interval = setInterval(() => {
      const startTimestamp = new Date(startTime).getTime();
      const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
      const rem = Math.max(0, TOTAL_DURATION_SECONDS - elapsedSeconds);
      
      setSecondsLeft(rem);

      if (rem <= 0) {
        clearInterval(interval);
        handleAutoSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, finalResult, isSubmitting]);

  // Persist answers
  useEffect(() => {
    try {
      localStorage.setItem(`${sessionKey}_answers`, JSON.stringify(answersState));
    } catch (e) {
      console.warn(e);
    }
  }, [answersState, sessionKey]);

  const currentQuestion = COMPETENCY_QUESTIONS[currentIdx];
  const totalQuestions = COMPETENCY_QUESTIONS.length;

  const currentAnswerData = answersState[currentQuestion.id] || { answer: null, isFlagged: false };

  // Handlers for Answers
  const handleSingleSelect = (optionIdx: number | boolean) => {
    setAnswersState(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        answer: optionIdx
      }
    }));
  };

  const handleMultipleSelectToggle = (optionIdx: number) => {
    const current = (currentAnswerData.answer as number[]) || [];
    let updated: number[];
    if (current.includes(optionIdx)) {
      updated = current.filter(x => x !== optionIdx);
    } else {
      updated = [...current, optionIdx];
    }
    setAnswersState(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        answer: updated
      }
    }));
  };

  const handleMatchingSelect = (pairId: string, targetRightText: string) => {
    const current = (currentAnswerData.answer as Record<string, string>) || {};
    setAnswersState(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        answer: {
          ...current,
          [pairId]: targetRightText
        }
      }
    }));
  };

  const toggleFlag = () => {
    setAnswersState(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isFlagged: !currentAnswerData.isFlagged
      }
    }));
  };

  const handleAutoSubmit = () => {
    submitExam();
  };

  const submitExam = async () => {
    setIsSubmitting(true);
    setShowSubmitModal(false);

    const endTime = new Date().toISOString();
    const res = await api.submitCompetency({
      studentName: student.name,
      studentClass: student.studentClass,
      tokenUsed: token.code,
      answers: answersState,
      startTime,
      endTime
    });

    setIsSubmitting(false);

    if (res.success && res.result) {
      setFinalResult(res.result);
      // clean local storage for session
      try {
        localStorage.removeItem(`${sessionKey}_start`);
        localStorage.removeItem(`${sessionKey}_answers`);
      } catch (e) {
        console.warn(e);
      }

      if (res.result.score >= 70) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  // Format Time (HH:MM:SS)
  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine Nav Box Status Color
  const getNavBoxColor = (qId: number, index: number) => {
    const isCurrent = currentIdx === index;
    const itemState = answersState[qId];
    const isFlagged = itemState?.isFlagged;
    
    // Check if answered
    let hasAnswer = false;
    if (itemState && itemState.answer !== undefined && itemState.answer !== null) {
      if (Array.isArray(itemState.answer)) {
        hasAnswer = itemState.answer.length > 0;
      } else if (typeof itemState.answer === 'object') {
        hasAnswer = Object.keys(itemState.answer).length > 0;
      } else {
        hasAnswer = true;
      }
    }

    if (isCurrent) {
      return 'bg-blue-600 text-white ring-2 ring-amber-400 font-extrabold shadow-md'; // Biru: sedang dikerjakan
    }
    if (isFlagged) {
      return 'bg-amber-400 text-blue-950 font-bold'; // Kuning: ditandai / ragu
    }
    if (hasAnswer) {
      return 'bg-emerald-600 text-white font-bold'; // Hijau: sudah dijawab
    }
    // Merah jika waktu < 5 menit dan belum dijawab
    if (secondsLeft < 300 && !hasAnswer) {
      return 'bg-red-500 text-white font-bold animate-pulse'; // Merah: belum dijawab saat waktu kritis
    }
    // Abu-abu: belum dikerjakan
    return 'bg-slate-200 text-slate-700 font-medium hover:bg-slate-300';
  };

  // Calculate answered count
  const answeredCount = Object.keys(answersState).filter(qId => {
    const a = answersState[Number(qId)]?.answer;
    if (a === null || a === undefined) return false;
    if (Array.isArray(a)) return a.length > 0;
    if (typeof a === 'object') return Object.keys(a).length > 0;
    return true;
  }).length;

  return (
    <div className="py-6 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sticky Top Bar with Realtime Timer */}
        <div className="sticky top-20 z-40 bg-blue-950 text-white border-2 border-amber-400 rounded-2xl p-4 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Uji Kompetensi AKM · 20 Soal
              </span>
              <div className="text-sm font-bold text-white">
                {student.name} · <span className="text-amber-300">Kelas {student.studentClass}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Realtime 90 Mins Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-mono font-black text-lg ${
              secondsLeft < 300 
                ? 'bg-red-600/40 text-red-300 border-red-500 animate-pulse' 
                : 'bg-blue-900 text-amber-300 border-amber-400/60'
            }`}>
              <Clock className="w-5 h-5 text-amber-400" />
              <span>{formatTime(secondsLeft)}</span>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-blue-950 font-black text-xs sm:text-sm hover:bg-amber-300 border border-amber-300 shadow-md transition-all flex items-center gap-2"
            >
              <span>Kumpulkan Ujian</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Active Question */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md space-y-6">
            
            {/* Header Soal */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-900 text-white font-extrabold text-xs">
                  Soal No. {currentIdx + 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                  Tingkat: {currentQuestion.difficulty}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold">
                  {currentQuestion.type === 'single_choice' && 'Pilihan Ganda'}
                  {currentQuestion.type === 'true_false' && 'Benar / Salah'}
                  {currentQuestion.type === 'multiple_choice' && 'Pilihan Ganda Kompleks'}
                  {currentQuestion.type === 'matching' && 'Menjodohkan Pasangan'}
                </span>
              </div>

              {/* Ragu-ragu Checkbox Button */}
              <button
                onClick={toggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  currentAnswerData.isFlagged
                    ? 'bg-amber-400 text-blue-950 border-amber-500'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{currentAnswerData.isFlagged ? 'Ditandai Ragu-ragu' : 'Tandai Ragu-ragu'}</span>
              </button>
            </div>

            {/* Stimulus with text-justify */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border-l-4 border-blue-700 text-xs sm:text-sm text-slate-800 text-justify leading-relaxed">
              <span className="font-extrabold text-blue-900 block mb-1">
                Stimulus & Narasi Konteks:
              </span>
              {currentQuestion.stimulus}
            </div>

            {/* Question Text with text-justify */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 text-justify leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options according to type */}
            <div className="pt-2">
              {/* 1. SINGLE CHOICE */}
              {currentQuestion.type === 'single_choice' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((opt, oIdx) => {
                    const isSelected = currentAnswerData.answer === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSingleSelect(oIdx)}
                        className={`w-full text-left p-4 rounded-2xl border-2 font-medium text-xs sm:text-sm transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-900 text-white border-amber-400 shadow-md scale-[1.01]'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-blue-50/40'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-amber-400 text-blue-950' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="mt-1 leading-snug text-justify flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. TRUE / FALSE */}
              {currentQuestion.type === 'true_false' && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Benar', val: true },
                    { label: 'Salah', val: false }
                  ].map((item) => {
                    const isSelected = currentAnswerData.answer === item.val;
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleSingleSelect(item.val)}
                        className={`p-6 rounded-2xl border-2 text-center font-extrabold text-base transition-all ${
                          isSelected
                            ? 'bg-blue-900 text-amber-300 border-amber-400 shadow-lg scale-102'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 3. MULTIPLE CHOICE COMPLEX */}
              {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                <div className="space-y-3">
                  <div className="text-xs text-amber-800 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    Petunjuk: Anda dapat memilih lebih dari satu opsi jawaban yang benar.
                  </div>
                  {currentQuestion.options.map((opt, oIdx) => {
                    const selectedArr = (currentAnswerData.answer as number[]) || [];
                    const isSelected = selectedArr.includes(oIdx);
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleMultipleSelectToggle(oIdx)}
                        className={`w-full text-left p-4 rounded-2xl border-2 font-medium text-xs sm:text-sm transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-900 text-white border-amber-400 shadow-md'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-amber-400 border-amber-300 text-blue-950 font-black' : 'border-slate-400 bg-white'
                        }`}>
                          {isSelected && '✓'}
                        </div>
                        <span className="leading-snug text-justify flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 4. MATCHING (MENJODOHKAN) */}
              {currentQuestion.type === 'matching' && currentQuestion.matchingPairs && (
                <div className="space-y-4">
                  <div className="text-xs text-blue-800 font-bold bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                    Petunjuk: Pilih pasangan yang tepat pada menu dropdown untuk setiap pernyataan di sebelah kiri.
                  </div>
                  <div className="space-y-3">
                    {currentQuestion.matchingPairs.map((pair) => {
                      const userPairs = (currentAnswerData.answer as Record<string, string>) || {};
                      const selectedRight = userPairs[pair.id] || '';

                      return (
                        <div key={pair.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 text-justify">
                            {pair.left}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                              Pasangan:
                            </span>
                            <select
                              value={selectedRight}
                              onChange={(e) => handleMatchingSelect(pair.id, e.target.value)}
                              className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-700"
                            >
                              <option value="">-- Pilih Jawaban Pasangan --</option>
                              {currentQuestion.matchingPairs?.map((opt) => (
                                <option key={opt.right} value={opt.right}>
                                  {opt.right}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigator Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentIdx + 1 < totalQuestions ? (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-800 text-white font-bold text-xs hover:bg-blue-900 border border-amber-400"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 text-blue-950 font-black text-xs hover:bg-amber-300 shadow-md"
                >
                  <span>Selesai & Kumpulkan</span>
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: 20-Question Grid Navigation */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-md space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Navigasi 20 Soal
              </span>
              <span className="text-xs font-bold text-blue-800">
                {answeredCount} / {totalQuestions} Terjawab
              </span>
            </div>

            {/* Color Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-600 shrink-0"></span>
                <span>Aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 shrink-0"></span>
                <span>Terjawab</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400 shrink-0"></span>
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-200 shrink-0"></span>
                <span>Belum</span>
              </div>
            </div>

            {/* 20 Soal Grid (5 x 4) */}
            <div className="grid grid-cols-5 gap-2.5 pt-1">
              {COMPETENCY_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-11 rounded-xl flex items-center justify-center text-xs transition-all ${getNavBoxColor(q.id, idx)}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm border-2 border-amber-400 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Kumpulkan Ujian Sekarang</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* CONFIRMATION SUBMIT MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-slate-900 border-2 border-amber-400 shadow-2xl relative text-left">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              Konfirmasi Pengumpulan Ujian
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 text-justify leading-relaxed mb-4">
              Apakah Anda yakin ingin menyelesaikan dan mengirim jawaban Uji Kompetensi ini? Setelah dikirim, jawaban tidak dapat diubah kembali.
            </p>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 mb-6 space-y-1">
              <div>Total Soal: <span className="font-bold">{totalQuestions}</span></div>
              <div>Soal Terjawab: <span className="font-bold text-emerald-700">{answeredCount}</span></div>
              <div>Belum Terjawab: <span className="font-bold text-red-700">{totalQuestions - answeredCount}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
              >
                Periksa Kembali
              </button>
              <button
                onClick={submitExam}
                disabled={isSubmitting}
                className="py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs border border-amber-400 shadow-md"
              >
                {isSubmitting ? 'Mengirim...' : 'Ya, Kumpulkan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULT POPUP */}
      {finalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 border-4 border-amber-400 shadow-2xl relative text-center">
            
            <div className="w-20 h-20 rounded-3xl bg-amber-400 text-blue-950 flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-amber-200">
              <Trophy className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              Hasil Uji Kompetensi
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
              {student.name}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Kelas {student.studentClass} · Token: {token.code}
            </p>

            {/* Score Big Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white border-2 border-amber-400 shadow-inner mb-6">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                Nilai Akhir (Skala 0–100)
              </div>
              <div className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight">
                {finalResult.score}
              </div>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white border border-amber-400/40">
                Kategori: {finalResult.category} ({finalResult.percentage}%)
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="text-lg font-black text-emerald-800 font-mono">
                  {finalResult.correctCount}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">Benar</div>
              </div>

              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <div className="text-lg font-black text-red-800 font-mono">
                  {finalResult.wrongCount}
                </div>
                <div className="text-[11px] font-semibold text-red-700">Salah</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-300">
                <HelpCircle className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                <div className="text-lg font-black text-slate-700 font-mono">
                  {finalResult.unansweredCount}
                </div>
                <div className="text-[11px] font-semibold text-slate-600">Tidak Dijawab</div>
              </div>
            </div>

            <button
              onClick={() => {
                onFinish(finalResult);
                onBackToDashboard();
              }}
              className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm border-2 border-amber-400 shadow-md"
            >
              Kembali ke Dashboard Siswa
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
