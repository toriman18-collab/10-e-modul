import React from 'react';
import { 
  CheckCircle2, 
  BookOpen, 
  Gamepad2, 
  Award, 
  Users, 
  HeartHandshake, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';

interface ConclusionSectionProps {
  onBackToMaterial: () => void;
  onContinueToQuiz: () => void;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({
  onBackToMaterial,
  onContinueToQuiz
}) => {
  const summaryPoints = [
    {
      title: 'Badan Penyelidik (BPUPK)',
      text: 'BPUPK dibentuk pada 1 Maret 1945 dan dilantik 28 Mei 1945 di Gedung Chuo Sangi In, dipimpin oleh Dr. Radjiman Wedyodiningrat, untuk menyelidiki dan merancang fondasi negara merdeka.',
      icon: <ShieldCheck className="w-5 h-5 text-blue-800" />
    },
    {
      title: 'Sidang Pertama (29 Mei - 1 Juni 1945)',
      text: 'Fokus menjawab pertanyaan mendasar mengenai philosophische grondslag (dasar falsafah) negara Indonesia merdeka, menghadirkan perdebatan bermartabat para negarawan.',
      icon: <BookOpen className="w-5 h-5 text-blue-800" />
    },
    {
      title: 'Gagasan Mr. Mohammad Yamin (29 Mei 1945)',
      text: 'Mengusulkan 5 asas dasar negara (Peri Kebangsaan, Peri Kemanusiaan, Peri Ketuhanan, Peri Kerakyatan, Kesejahteraan Rakyat) serta naskah tertulis rancangan hukum dasar.',
      icon: <Award className="w-5 h-5 text-blue-800" />
    },
    {
      title: 'Gagasan Prof. Dr. Mr. Soepomo (31 Mei 1945)',
      text: 'Menolak individualisme barat dan teori pertarungan kelas, memilih Teori Negara Integralistik dengan prinsip: Persatuan, Kekeluargaan, Keseimbangan Lahir Batin, Musyawarah, dan Keadilan Rakyat.',
      icon: <Users className="w-5 h-5 text-blue-800" />
    },
    {
      title: 'Gagasan Ir. Soekarno (1 Juni 1945)',
      text: 'Mencetuskan nama Pancasila: Kebangsaan, Internasionalisme, Mufakat/Demokrasi, Kesejahteraan Sosial, dan Ketuhanan yang berkebudayaan, yang dapat diperas menjadi Trisila dan Ekasila (Gotong Royong).',
      icon: <Flame className="w-5 h-5 text-blue-800" />
    },
    {
      title: 'Gagasan Dasar Negara yang Berakar',
      text: 'Meskipun berbeda pendekatan, ketiga tokoh sepakat bahwa dasar negara harus mencerminkan kepribadian asli bangsa Indonesia, religiusitas, kedaulatan rakyat, dan keadilan sosial.',
      icon: <CheckCircle2 className="w-5 h-5 text-blue-800" />
    },
    {
      title: 'Menghargai Perbedaan Pendapat',
      text: 'Perbedaan pandangan tajam antara golongan Islam dan kebangsaan diselesaikan melalui musyawarah mufakat, tanpa permusuhan, melahirkan konsensus luhur Piagam Jakarta.',
      icon: <HeartHandshake className="w-5 h-5 text-blue-800" />
    },
    {
      title: 'Kelahiran Resmi Pancasila',
      text: 'Melalui kompromi agung pada sidang PPKI 18 Agustus 1945, disahkan Pembukaan UUD 1945 dengan rumusan resmi Pancasila yang abadi memayungi NKRI.',
      icon: <Award className="w-5 h-5 text-blue-800" />
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-300 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Rangkuman Intisari Materi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kesimpulan Pembelajaran
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-justify sm:text-center">
            Poin-poin fundamental mengenai proses sidang pertama BPUPK dan pemikiran luhur para pendiri bangsa dalam merumuskan dasar negara Indonesia:
          </p>
        </div>

        {/* 8 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {summaryPoints.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-left space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 text-justify leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Navigation Buttons */}
        <div className="p-8 rounded-3xl bg-blue-900 border-2 border-amber-400 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-xl font-bold text-white mb-1">
              Siap Menguji Penguasaan Materi?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100">
              Ikuti Game Kuis interaktif dengan timer 20 detik atau masuk ke Dashboard Siswa untuk Uji Kompetensi.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onBackToMaterial}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-950 font-bold text-xs sm:text-sm hover:bg-blue-50 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-blue-800" />
              <span>Kembali ke Materi</span>
            </button>
            <button
              onClick={onContinueToQuiz}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-blue-950 font-extrabold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md hover:scale-105"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Lanjut ke Game Kuis</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
