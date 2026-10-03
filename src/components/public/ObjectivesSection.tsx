import React from 'react';
import { 
  History, 
  Users, 
  FileText, 
  GitCompare, 
  Scale, 
  HeartHandshake,
  Target
} from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../../data/learningContent';

interface ObjectivesSectionProps {
  onContinue: () => void;
}

export const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({ onContinue }) => {
  const icons = [
    <History key="1" className="w-6 h-6 text-blue-700" />,
    <Users key="2" className="w-6 h-6 text-blue-700" />,
    <FileText key="3" className="w-6 h-6 text-blue-700" />,
    <GitCompare key="4" className="w-6 h-6 text-blue-700" />,
    <Scale key="5" className="w-6 h-6 text-blue-700" />,
    <HeartHandshake key="6" className="w-6 h-6 text-blue-700" />
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 mb-3">
            <Target className="w-4 h-4 text-blue-700" />
            <span>Capaian & Kompetensi Siswa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tujuan Pembelajaran
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-center">
            Setelah mempelajari modul ini, peserta didik diharapkan mampu menguasai 6 kemampuan analitis dan sikap afektif berikut sesuai standar Kurikulum Merdeka Fase E:
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_OBJECTIVES.map((item, idx) => (
            <div
              key={item.number}
              className="group bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                {/* Header Card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-amber-100 group-hover:border-amber-300 transition-colors">
                    {icons[idx]}
                  </div>
                  <span className="text-2xl font-black text-blue-900/40 group-hover:text-amber-500 transition-colors">
                    0{item.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors text-left">
                  {item.title}
                </h3>

                {/* Description with text-justify */}
                <p className="text-sm text-slate-600 text-justify leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Footer Line */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-800 font-semibold">
                <span>Kompetensi Esensial</span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
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
            <span>Lanjut ke Pertanyaan Pemantik</span>
            <span className="text-amber-400">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};
