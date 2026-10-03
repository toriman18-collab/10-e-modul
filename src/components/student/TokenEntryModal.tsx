import React, { useState } from 'react';
import { KeyRound, X, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { TokenType, ExamToken } from '../../types';
import { api } from '../../services/api';

interface TokenEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  examType: TokenType;
  onTokenValidated: (token: ExamToken) => void;
}

export const TokenEntryModal: React.FC<TokenEntryModalProps> = ({
  isOpen,
  onClose,
  examType,
  onTokenValidated
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    token?: ExamToken;
  } | null>(null);

  if (!isOpen) return null;

  const examTitle = examType === 'quiz' ? 'Game Kuis (5 Soal)' : 'Uji Kompetensi (20 Soal AKM)';

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setValidationResult({
        valid: false,
        message: 'Silakan ketikkan kode token terlebih dahulu.'
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    const res = await api.validateToken(tokenInput.trim(), examType);
    setIsValidating(false);

    if (res.success && res.token) {
      setValidationResult({
        valid: true,
        message: 'Kode token valid! Silakan tekan tombol Mulai.',
        token: res.token
      });
    } else {
      setValidationResult({
        valid: false,
        message: res.message || 'Kode token tidak valid atau sudah tidak aktif.'
      });
    }
  };

  const handleStartExam = () => {
    if (validationResult?.valid && validationResult.token) {
      onTokenValidated(validationResult.token);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-amber-400 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
          aria-label="Tutup Dialog Token"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold shadow-md">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
              Autentikasi Ujian Pengawas
            </span>
            <h3 className="text-xl font-black text-slate-900">
              {examTitle}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 text-justify leading-relaxed mb-4">
          Sebelum memulai ujian, masukkan kode token aktif yang telah dibagikan oleh guru pengawas Anda.
        </p>

        {/* Form Validation */}
        <form onSubmit={handleValidate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Masukkan Kode Token
            </label>
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => {
                setTokenInput(e.target.value.toUpperCase());
                setValidationResult(null);
              }}
              placeholder="Contoh: PPKN-XXXXXX"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:outline-none focus:border-blue-700 font-mono text-center tracking-widest text-lg font-bold uppercase bg-slate-50 text-slate-900"
            />
          </div>

          {/* Validation Feedback */}
          {validationResult && (
            <div
              className={`p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 ${
                validationResult.valid
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'bg-red-50 text-red-900 border border-red-300'
              }`}
            >
              {validationResult.valid ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="leading-snug">{validationResult.message}</div>
            </div>
          )}

          {/* Buttons: Validasi or Mulai */}
          <div className="space-y-2 pt-2">
            {!validationResult?.valid ? (
              <button
                type="submit"
                disabled={isValidating || !tokenInput.trim()}
                className="w-full py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm shadow-md border-2 border-amber-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memvalidasi Token...</span>
                  </>
                ) : (
                  <span>Validasi Token</span>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartExam}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg border-2 border-amber-300 transition-all flex items-center justify-center gap-2 animate-bounceOnce"
              >
                <span>Mulai Ujian Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Format: PPKN-XXXXXX</span>
          <span>Dibuat oleh Guru Pengawas</span>
        </div>

      </div>
    </div>
  );
};
