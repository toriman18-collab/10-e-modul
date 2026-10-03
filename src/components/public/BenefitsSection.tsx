import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Brain, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Flame, 
  Sparkles,
  ChevronRight 
} from 'lucide-react';
import { LEARNING_BENEFITS } from '../../data/learningContent';

interface BenefitsSectionProps {
  onContinue: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onContinue }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-6 h-6 text-blue-800" />,
    MessageSquare: <MessageSquare className="w-6 h-6 text-blue-800" />,
    Brain: <Brain className="w-6 h-6 text-blue-800" />,
    BookOpen: <BookOpen className="w-6 h-6 text-blue-800" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-blue-800" />,
    Award: <Award className="w-6 h-6 text-blue-800" />,
    Flame: <Flame className="w-6 h-6 text-blue-800" />
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Aplikasi Nilai dalam Kehidupan Nyata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Manfaat Mempelajari Materi
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-center">
            Mempelajari dialektika ide para pendiri bangsa bukan sekadar menghafal tahun dan nama, melainkan membangun kecakapan hidup (life skills) serta karakter Pelajar Pancasila:
          </p>
        </div>

        {/* 7 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_BENEFITS.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group ${
                idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-amber-100 group-hover:border-amber-300 transition-colors">
                    {iconMap[item.icon]}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 group-hover:bg-amber-200/60 group-hover:text-amber-900 transition-colors">
                    Aspek 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors text-left">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 text-justify leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs text-blue-700 font-semibold gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Penerapan Profil Pelajar Pancasila</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-800 text-white font-bold text-sm sm:text-base hover:bg-blue-900 border-2 border-amber-400 shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <span>Buka Materi Pembelajaran Lengkap</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
