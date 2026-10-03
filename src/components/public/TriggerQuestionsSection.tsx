import React, { useState } from 'react';
import { HelpCircle, Lightbulb, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { TRIGGER_QUESTIONS } from '../../data/learningContent';

interface TriggerQuestionsSectionProps {
  onContinue: () => void;
}

export const TriggerQuestionsSection: React.FC<TriggerQuestionsSectionProps> = ({ onContinue }) => {
  const [activeClue, setActiveClue] = useState<number | null>(null);

  const toggleClue = (id: number) => {
    setActiveClue(activeClue === id ? null : id);
  };

  return (
    <div className="py-12 bg-gradient-to-b from-slate-50 to-blue-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 mb-3">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Refleksi Awal Pembelajaran</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pertanyaan Pemantik
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-center">
            Sebelum menelaah materi lebih mendalam, renungkan dua pertanyaan kritis berikut untuk melatih kemampuan bernalar tingkat tinggi (HOTS):
          </p>
        </div>

        {/* 2 Big Cards */}
        <div className="space-y-6">
          {TRIGGER_QUESTIONS.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-200 hover:border-amber-400 shadow-md transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-amber-400 to-blue-700"></div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Number Badge */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center font-black text-xl shrink-0 shadow-sm border border-amber-400/40">
                  #{q.id}
                </div>

                <div className="flex-1 space-y-4 text-left">
                  {/* Question */}
                  <div className="flex items-start gap-2">
                    <MessageSquareQuote className="w-6 h-6 text-amber-500 shrink-0 mt-1 hidden sm:block" />
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Context text-justify */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 text-justify leading-relaxed">
                    <span className="font-bold text-blue-900 block mb-1">Konteks Historis:</span>
                    {q.context}
                  </div>

                  {/* Clue button toggle */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleClue(q.id)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300 text-xs font-bold transition-colors"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>{activeClue === q.id ? 'Sembunyikan Petunjuk Diskusi' : 'Buka Petunjuk Berpikir'}</span>
                    </button>

                    {activeClue === q.id && (
                      <div className="mt-3 p-4 rounded-xl bg-amber-50/80 border border-amber-300/80 text-xs sm:text-sm text-amber-950 text-justify leading-relaxed animate-fadeIn">
                        <span className="font-bold block mb-1">Petunjuk Refleksi Guru:</span>
                        {q.clue}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-10 text-center">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-800 text-white font-bold text-sm sm:text-base hover:bg-blue-900 border-2 border-amber-400 shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <span>Lanjut ke Manfaat Pembelajaran</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
