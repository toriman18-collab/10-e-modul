import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy,
  Award,
  AlertTriangle
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizQuestions';
import { ExamResult, ExamToken, StudentProfile } from '../../types';
import { api } from '../../services/api';

interface GameQuizViewProps {
  student: StudentProfile;
  token: ExamToken;
  onFinish: (result: ExamResult) => void;
  onBackToDashboard: () => void;
}

export const GameQuizView: React.FC<GameQuizViewProps> = ({
  student,
  token,
  onFinish,
  onBackToDashboard
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [startTime] = useState<string>(new Date().toISOString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState<ExamResult | null>(null);

  const question = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Countdown Timer 20s
  useEffect(() => {
    if (finalResult || isSubmitting) return;

    setTimeLeft(20);
    setIsAnswerLocked(false);
    setSelectedOption(null);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIdx, finalResult]);

  // Handle when time reaches 0
  const handleTimeExpire = () => {
    setIsAnswerLocked(true);
    // save as unanswered if not answered
    const currentAns = selectedOption !== null ? selectedOption : null;
    saveAndNext(currentAns);
  };

  const handleSelectOption = (val: any) => {
    if (isAnswerLocked) return;
    setSelectedOption(val);
  };

  const handleConfirmAnswer = () => {
    if (isAnswerLocked) return;
    setIsAnswerLocked(true);
    saveAndNext(selectedOption);
  };

  const saveAndNext = async (ans: any) => {
    const updatedAnswers = { ...answers, [question.id]: ans };
    setAnswers(updatedAnswers);

    if (currentIdx + 1 < totalQuestions) {
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1);
      }, 400);
    } else {
      // Final question complete, submit exam
      submitExam(updatedAnswers);
    }
  };

  const submitExam = async (allAnswers: Record<number, any>) => {
    setIsSubmitting(true);
    const endTime = new Date().toISOString();
    const res = await api.submitQuiz({
      studentName: student.name,
      studentClass: student.studentClass,
      tokenUsed: token.code,
      answers: allAnswers,
      startTime,
      endTime
    });

    setIsSubmitting(false);

    if (res.success && res.result) {
      setFinalResult(res.result);
      if (res.result.score >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const getOptionLetter = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D, E
  };

  // Timer Bar Color Calculation
  const timerPercentage = (timeLeft / 20) * 100;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="py-8 bg-slate-900 min-h-screen text-white flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center">
        
        {/* Top Game Header Bar */}
        <div className="flex items-center justify-between bg-blue-950/80 border-2 border-amber-400/80 rounded-2xl p-4 mb-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-amber-300 font-bold block uppercase tracking-wider">
                Live Game Kuis (20s / Soal)
              </span>
              <div className="text-sm font-bold text-white">
                {student.name} · <span className="text-amber-300">{student.studentClass}</span>
              </div>
            </div>
          </div>

          {/* Realtime 20s Timer Badge */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-mono font-black text-xl transition-all ${
              isUrgent
                ? 'bg-red-600/30 text-red-400 border-red-500 animate-pulse'
                : 'bg-blue-900/60 text-amber-300 border-amber-400/60'
            }`}>
              <Clock className={`w-5 h-5 ${isUrgent ? 'text-red-400 animate-spin' : 'text-amber-400'}`} />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Timer Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-6 border border-slate-700">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isUrgent ? 'bg-red-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'
            }`}
            style={{ width: `${timerPercentage}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 border-2 border-amber-400 shadow-2xl relative">
          {/* Question Index & Type */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <span className="px-3 py-1 rounded-full bg-blue-900 text-amber-300 font-bold text-xs uppercase tracking-wider">
              Soal {currentIdx + 1} dari {totalQuestions}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {question.type === 'single_choice' ? 'Pilihan Ganda (5 Opsi)' : 'Benar / Salah'}
            </span>
          </div>

          {/* Stimulus */}
          {question.stimulus && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 text-justify leading-relaxed mb-4">
              <span className="font-bold text-blue-900 block mb-1">Stimulus Soal:</span>
              {question.stimulus}
            </div>
          )}

          {/* Question Title text-justify */}
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-6 text-justify">
            {question.question}
          </h3>

          {/* Options Grid */}
          {question.type === 'single_choice' ? (
            <div className="space-y-3">
              {question.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isAnswerLocked}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 font-medium text-xs sm:text-sm transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-900 text-white border-amber-400 shadow-md scale-[1.01]'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-amber-400 text-blue-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {getOptionLetter(oIdx)}
                    </span>
                    <span className="mt-1 leading-snug text-justify">{opt}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Benar', val: true, color: 'emerald' },
                { label: 'Salah', val: false, color: 'rose' }
              ].map((opt) => {
                const isSelected = selectedOption === opt.val;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelectOption(opt.val)}
                    disabled={isAnswerLocked}
                    className={`p-6 rounded-2xl border-2 text-center font-extrabold text-base transition-all ${
                      isSelected
                        ? 'bg-blue-900 text-amber-300 border-amber-400 shadow-lg scale-105'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Confirm Button */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Jawaban otomatis tersimpan jika waktu habis (20s)
            </span>
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedOption === null || isAnswerLocked}
              className="px-6 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm border-2 border-amber-400 shadow-md disabled:opacity-40 transition-all flex items-center gap-2"
            >
              <span>{currentIdx + 1 === totalQuestions ? 'Kirim Jawaban' : 'Simpan & Lanjut'}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>

      </div>

      {/* POPUP HASIL GAME KUIS */}
      {finalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-900 border-4 border-amber-400 shadow-2xl relative text-center">
            
            {/* Header Trophy */}
            <div className="w-20 h-20 rounded-3xl bg-amber-400 text-blue-950 flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-amber-200">
              <Trophy className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              Hasil Game Kuis Selesai
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
              {student.name}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Kelas {student.studentClass} · Token: {token.code}
            </p>

            {/* Score Big Display */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 text-white border-2 border-amber-400 shadow-inner mb-6">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                Skor Akhir Kamu
              </div>
              <div className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight">
                {finalResult.score}
                <span className="text-xl text-blue-200">/100</span>
              </div>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white border border-amber-400/40">
                Kategori: {finalResult.category}
              </div>
            </div>

            {/* Statistics Breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="text-lg font-black text-emerald-800 font-mono">
                  {finalResult.correctCount}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">Benar</div>
              </div>

              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
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

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  onFinish(finalResult);
                  onBackToDashboard();
                }}
                className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm border-2 border-amber-400 shadow-md transition-all"
              >
                Kembali ke Dashboard Siswa
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-3">
              Data nilai kamu telah berhasil disimpan di server guru dan siap dipantau.
            </p>

          </div>
        </div>
      )}

    </div>
  );
};
