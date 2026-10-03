import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Table, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Award, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { MODULE_CHAPTERS } from '../../data/moduleChapters';
import { TIMELINE_EVENTS, COMPARISON_TABLE_DATA } from '../../data/learningContent';

interface MaterialSectionProps {
  onGoToConclusion: () => void;
  onGoToQuiz: () => void;
}

export const MaterialSection: React.FC<MaterialSectionProps> = ({
  onGoToConclusion,
  onGoToQuiz
}) => {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [searchFilter, setSearchFilter] = useState('');

  const currentTimeline = TIMELINE_EVENTS[selectedTimelineIndex];

  const filteredChapters = MODULE_CHAPTERS.filter(ch => 
    ch.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    ch.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
    ch.paragraphs.some(p => p.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Module */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300 mb-3">
            <BookOpen className="w-4 h-4 text-blue-800" />
            <span>Modul Pembelajaran Mandiri & Kolaboratif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Materi Pembelajaran Lengkap
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed text-center">
            Pendidikan Pancasila Kelas X SMA Fase E · Sidang BPUPK & Gagasan Dasar Negara
          </p>
        </div>

        {/* ============================================================== */}
        {/* TIMELINE INTERAKTIF PROSES SIDANG PERTAMA BPUPK               */}
        {/* ============================================================== */}
        <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Kronik Sejarah Sidang Pertama BPUPK</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Timeline Sidang BPUPK 1945
              </h3>
            </div>
            <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              Klik tanggal untuk membuka dokumen detail
            </div>
          </div>

          {/* Desktop Timeline (Horizontal) */}
          <div className="hidden md:flex items-center justify-between relative mb-8 px-4">
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
            
            {TIMELINE_EVENTS.map((event, idx) => {
              const isSelected = selectedTimelineIndex === idx;
              return (
                <button
                  key={event.date}
                  onClick={() => setSelectedTimelineIndex(idx)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none cursor-pointer"
                >
                  <div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isSelected 
                        ? 'bg-blue-800 text-amber-300 ring-4 ring-amber-300 shadow-lg scale-110' 
                        : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-800'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <span className={`mt-2 text-xs font-bold whitespace-nowrap transition-colors ${
                    isSelected ? 'text-blue-900' : 'text-slate-500 group-hover:text-slate-800'
                  }`}>
                    {event.date}
                  </span>
                  <span className="text-[11px] text-slate-400 max-w-[110px] text-center truncate">
                    {event.title.split(' ')[0]} {event.title.split(' ')[1] || ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Timeline Selector (Scrollable horizontally / pill selector) */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isSelected = selectedTimelineIndex === idx;
              return (
                <button
                  key={event.date}
                  onClick={() => setSelectedTimelineIndex(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-blue-900 text-amber-300 border-2 border-amber-400'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {event.date}
                </button>
              );
            })}
          </div>

          {/* Selected Timeline Card Info */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white border-2 border-amber-400 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-blue-950 font-black text-xs">
                {currentTimeline.date}
              </span>
              <span className="text-xs text-blue-200 font-medium flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Pembicara: {currentTimeline.speaker}</span>
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
              {currentTimeline.title}
            </h4>

            <p className="text-sm text-blue-100/90 text-justify leading-relaxed mb-4">
              {currentTimeline.summary}
            </p>

            <div className="pt-3 border-t border-blue-800/80">
              <span className="text-xs font-bold text-amber-300 block mb-2 uppercase tracking-wider">
                Pokok Poin Penting:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentTimeline.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TABEL OTOMATIS PERBANDINGAN GAGASAN PARA TOKOH               */}
        {/* ============================================================== */}
        <div className="mb-14 bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Tabel Komparasi Gagasan Pendiri Bangsa
              </h3>
              <p className="text-xs text-slate-500">
                Perbandingan sistematis pokok gagasan, tanggal, dan nilai utama ketatanegaraan
              </p>
            </div>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto mt-6 rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-blue-900 text-white border-b-2 border-amber-400">
                  <th className="py-3.5 px-4 font-bold">Tokoh Bangsa</th>
                  <th className="py-3.5 px-4 font-bold whitespace-nowrap">Tanggal Pidato</th>
                  <th className="py-3.5 px-4 font-bold">Pokok Gagasan</th>
                  <th className="py-3.5 px-4 font-bold">Nilai Utama</th>
                  <th className="py-3.5 px-4 font-bold min-w-[220px]">Keterangan Konstitusional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {COMPARISON_TABLE_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>{row.tokoh}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-blue-800 whitespace-nowrap">
                      {row.tanggal}
                    </td>
                    <td className="py-4 px-4">
                      <ol className="list-decimal list-inside space-y-1 text-slate-700 font-medium">
                        {row.pokokGagasan.map((g, gi) => (
                          <li key={gi}>{g}</li>
                        ))}
                      </ol>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      <span className="inline-block p-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs">
                        {row.nilaiUtama}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-justify leading-relaxed">
                      {row.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 17 BAB MATERI LENGKAP DENGAN NAVIGATOR & ACCORDION             */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Sticky Navigator (Desktop) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Daftar 17 Sub-Materi
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                17 Bab
              </span>
            </div>

            {/* Quick Filter */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari topik atau kata kunci..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 bg-slate-50"
              />
            </div>

            {/* Sub-materi List */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
              {filteredChapters.map((ch) => {
                const isActive = activeChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterId(ch.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-800 text-white font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                    }`}
                  >
                    <span className="truncate pr-2">{ch.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Reading Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Visual concept banner */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-md bg-blue-950">
              <img
                src="/src/assets/images/pancasila_founding_concept_1790981145804.jpg"
                alt="Konsep Musyawarah Pendiri Bangsa Merumuskan Pancasila"
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-56 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent flex items-end p-4">
                <p className="text-xs text-blue-100 font-medium">
                  Musyawarah dan dialektika luhur para pendiri bangsa melahirkan sintesis agung: Pancasila.
                </p>
              </div>
            </div>

            {/* Active Chapter Details */}
            {filteredChapters.map((ch) => {
              const isCurrent = activeChapterId === ch.id;
              if (!isCurrent) return null;

              return (
                <article
                  key={ch.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-md space-y-5 animate-fadeIn"
                >
                  {/* Badge & Number */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                      Bab {ch.id} dari 17
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Kurikulum Merdeka SMA
                    </span>
                  </div>

                  {/* Chapter Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      {ch.title}
                    </h3>
                    <p className="text-sm font-semibold text-amber-700 mt-1">
                      {ch.subtitle}
                    </p>
                  </div>

                  {/* Paragraphs with text-align: justify */}
                  <div className="space-y-4 pt-2">
                    {ch.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-slate-700 text-justify leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Optional Highlight Box */}
                  {ch.keyHighlight && (
                    <div className="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-xs sm:text-sm text-amber-950 leading-relaxed text-justify">
                      <span className="font-extrabold text-amber-800 block mb-1">
                        Poin Kunci Konseptual:
                      </span>
                      {ch.keyHighlight}
                    </div>
                  )}

                  {/* Optional Bullet Points */}
                  {ch.bulletPoints && (
                    <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                        Rincian Pokok Bahasan:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {ch.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-blue-800 text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {bIdx + 1}
                            </span>
                            <span className="text-justify leading-relaxed">{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Optional Summary Note */}
                  {ch.summaryNote && (
                    <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-600 font-medium text-justify">
                      {ch.summaryNote}
                    </div>
                  )}

                  {/* Navigation Buttons to Next / Prev Chapter */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveChapterId(Math.max(1, ch.id - 1))}
                      disabled={ch.id === 1}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ← Bab Sebelumnya
                    </button>
                    
                    {ch.id < 17 ? (
                      <button
                        onClick={() => setActiveChapterId(ch.id + 1)}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-800 text-white hover:bg-blue-900 border border-amber-400"
                      >
                        Bab Selanjutnya →
                      </button>
                    ) : (
                      <button
                        onClick={onGoToConclusion}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 text-blue-950 hover:bg-amber-300"
                      >
                        Lanjut ke Kesimpulan
                      </button>
                    )}
                  </div>

                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Dual Action Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-blue-900 text-white border-2 border-amber-400 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-amber-300">
              Selesai Membaca Materi?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100">
              Pelajari rangkuman materi di bagian Kesimpulan atau uji pemahamanmu dengan Game Kuis!
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGoToConclusion}
              className="px-5 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-50 shadow-md"
            >
              Buka Kesimpulan
            </button>
            <button
              onClick={onGoToQuiz}
              className="px-6 py-3 rounded-xl bg-amber-400 text-blue-950 font-extrabold text-xs sm:text-sm hover:bg-amber-300 shadow-lg border border-amber-300"
            >
              Mainkan Game Kuis (5 Soal) →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
