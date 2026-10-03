export interface TimelineEvent {
  date: string;
  title: string;
  speaker: string;
  summary: string;
  keyPoints: string[];
}

export interface ComparisonRow {
  tokoh: string;
  tanggal: string;
  pokokGagasan: string[];
  nilaiUtama: string;
  keterangan: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: '29 Mei 1945',
    title: 'Pidato Mohammad Yamin',
    speaker: 'Mr. Mohammad Yamin',
    summary: 'Yamin menyampaikan 5 asas dasar negara baik secara lisan dalam pidatonya maupun secara tertulis dalam konsep rancangan UUD.',
    keyPoints: [
      'Peri Kebangsaan',
      'Peri Kemanusiaan',
      'Peri Ketuhanan',
      'Peri Kerakyatan (Permusyawaratan, Perwakilan, Kebijaksanaan)',
      'Kesejahteraan Rakyat (Keadilan Sosial)'
    ]
  },
  {
    date: '30 Mei 1945',
    title: 'Pembahasan Anggota Sidang',
    speaker: 'Anggota BPUPK (Drs. Moh. Hatta, dll)',
    summary: 'Diskusi mendalam mengenai bentuk negara, kedaulatan rakyat, hubungan agama dan negara, serta hak-hak warga negara dalam suasana permusyawaratan.',
    keyPoints: [
      'Pendalaman arti kedaulatan rakyat',
      'Pemberian jaminan hak kemerdekaan berserikat dan berkumpul',
      'Penegasan kedaulatan ada di tangan rakyat'
    ]
  },
  {
    date: '31 Mei 1945',
    title: 'Pidato Prof. Dr. Soepomo',
    speaker: 'Prof. Dr. Mr. Soepomo',
    summary: 'Soepomo menguraikan teori kenegaraan integralistik (paham persatuan) yang menolak individualisme Barat dan teori kelas (Marxisme).',
    keyPoints: [
      'Persatuan (Staat Integralistik)',
      'Kekeluargaan',
      'Keseimbangan Lahir dan Batin',
      'Musyawarah',
      'Keadilan Rakyat'
    ]
  },
  {
    date: '1 Juni 1945',
    title: 'Pidato Ir. Soekarno (Lahirnya Pancasila)',
    speaker: 'Ir. Soekarno',
    summary: 'Soekarno mengusulkan lima prinsip dasar negara yang diberi nama "Pancasila" atas saran ahli bahasa, serta menawarkan pemerasan menjadi Trisila dan Ekasila.',
    keyPoints: [
      'Kebangsaan Indonesia (Nasionalisme)',
      'Internasionalisme (Peri Kemanusiaan)',
      'Mufakat atau Demokrasi',
      'Kesejahteraan Sosial',
      'Ketuhanan yang berkebudayaan'
    ]
  },
  {
    date: '22 Juni 1945',
    title: 'Piagam Jakarta (Jakarta Charter)',
    speaker: 'Panitia Sembilan',
    summary: 'Panitia Sembilan yang dipimpin Soekarno merumuskan naskah Piagam Jakarta sebagai sintesis pemikiran para pendiri bangsa yang kemudian menjadi cikal bakal Pembukaan UUD 1945.',
    keyPoints: [
      'Kesepakatan bersama antara golongan kebangsaan dan Islam',
      'Penyempurnaan rumusan lima sila dasar negara',
      'Fondasi konstitusi negara Republik Indonesia'
    ]
  }
];

export const COMPARISON_TABLE_DATA: ComparisonRow[] = [
  {
    tokoh: 'Mr. Mohammad Yamin',
    tanggal: '29 Mei 1945',
    pokokGagasan: [
      'Peri Kebangsaan',
      'Peri Kemanusiaan',
      'Peri Ketuhanan',
      'Peri Kerakyatan',
      'Kesejahteraan Rakyat'
    ],
    nilaiUtama: 'Nasionalisme Historis & Hukum Tata Negara',
    keterangan: 'Menyampaikan gagasan lisan dan lampiran tertulis rancangan Pembukaan Hukum Dasar yang berakar pada peradaban nusantara.'
  },
  {
    tokoh: 'Prof. Dr. Mr. Soepomo',
    tanggal: '31 Mei 1945',
    pokokGagasan: [
      'Persatuan',
      'Kekeluargaan',
      'Keseimbangan Lahir & Batin',
      'Musyawarah',
      'Keadilan Rakyat'
    ],
    nilaiUtama: 'Paham Integralistik (Kebersamaan Organis)',
    keterangan: 'Memandang negara sebagai satu kesatuan organis masyarakat tanpa mempertentangkan golongan, terinspirasi tradisi ketimuran.'
  },
  {
    tokoh: 'Ir. Soekarno',
    tanggal: '1 Juni 1945',
    pokokGagasan: [
      'Kebangsaan Indonesia',
      'Internasionalisme / Kemanusiaan',
      'Mufakat / Demokrasi',
      'Kesejahteraan Sosial',
      'Ketuhanan yang Berkebudayaan'
    ],
    nilaiUtama: 'Philosophische Grondslag & Gotong Royong',
    keterangan: 'Merumuskan filosofi mendasar yang dinamis, dapat diperas menjadi Trisila (Sosio-nasionalisme, Sosio-demokrasi, Ketuhanan) dan Ekasila (Gotong Royong).'
  }
];

export const LEARNING_OBJECTIVES = [
  {
    number: 1,
    title: 'Latar Belakang BPUPK',
    description: 'Menjelaskan latar belakang pembentukan BPUPK di tengah situasi Perang Pasifik dan janji kemerdekaan oleh Perdana Menteri Kuniaki Koiso.'
  },
  {
    number: 2,
    title: 'Identifikasi Tokoh Bangsa',
    description: 'Mengidentifikasi tokoh-tokoh utama yang menyampaikan gagasan tentang dasar negara dalam sidang pertama BPUPK.'
  },
  {
    number: 3,
    title: 'Gagasan Sidang Pertama',
    description: 'Menjelaskan gagasan para pendiri bangsa (Mohammad Yamin, Soepomo, dan Soekarno) dalam merumuskan dasar negara Indonesia merdeka.'
  },
  {
    number: 4,
    title: 'Perbandingan Pemikiran',
    description: 'Membandingkan pokok-pokok gagasan para tokoh mengenai fondasi filosofis dan yuridis ketatanegaraan Indonesia.'
  },
  {
    number: 5,
    title: 'Analisis Persamaan & Perbedaan',
    description: 'Menganalisis titik temu (persamaan) dan dialektika perbedaan gagasan serta bagaimana jalan mufakat tercapai.'
  },
  {
    number: 6,
    title: 'Sikap Menghargai & Teladan',
    description: 'Menunjukkan sikap keteladanan, penghargaan terhadap musyawarah, dan komitmen kebangsaan para pendiri bangsa dalam kehidupan sehari-hari.'
  }
];

export const TRIGGER_QUESTIONS = [
  {
    id: 1,
    question: 'Mengapa para pendiri bangsa memiliki gagasan yang berbeda tentang dasar negara Indonesia?',
    context: 'Perbedaan latar belakang pendidikan, tradisi keilmuan, pengalaman perjuangan, dan visi geopolitik melahirkan keragaman perspektif yang justru memperkaya konsepsi negara Indonesia merdeka.',
    clue: 'Pikirkan perbedaan antara pandangan hukum barat, teori integralistik adat timur, dan sintesis filosofis pergerakan rakyat.'
  },
  {
    id: 2,
    question: 'Bagaimana perbedaan gagasan para pendiri bangsa dapat menjadi kekuatan dalam proses lahirnya Pancasila?',
    context: 'Perbedaan pendapat dalam sidang BPUPK tidak memicu perpecahan, melainkan diolah melalui musyawarah mufakat yang santun dan berkeadaban tinggi demi kepentingan persatuan seluruh tumpah darah Indonesia.',
    clue: 'Pikirkan bagaimana semangat kompromi luhur melahirkan naskah Piagam Jakarta dan Pembukaan UUD 1945.'
  }
];

export const LEARNING_BENEFITS = [
  {
    title: 'Menghargai Perbedaan Pendapat',
    description: 'Melatih diri untuk mendengarkan, menghormati, dan mencari titik temu saat menghadapi pandangan yang beragam dalam pergaulan sekolah dan masyarakat.',
    icon: 'Users'
  },
  {
    title: 'Belajar Bermusyawarah',
    description: 'Menerapkan musyawarah untuk mufakat dalam pengambilan keputusan bersama tanpa memaksakan kehendak pribadi atau kelompok.',
    icon: 'MessageSquare'
  },
  {
    title: 'Berpikir Kritis & Analitis',
    description: 'Mampu menganalisis argumen kebangsaan secara objektif, mendalam, dan berbasis bukti sejarah yang dapat dipertanggungjawabkan.',
    icon: 'Brain'
  },
  {
    title: 'Menghargai Sejarah Bangsa',
    description: 'Menumbuhkan kesadaran historis bahwa kemerdekaan dan dasar negara dirumuskan dengan pengorbanan serta kejeniusan intelektual yang luar biasa.',
    icon: 'BookOpen'
  },
  {
    title: 'Membangun Persatuan Nasional',
    description: 'Menjaga keutuhan Negara Kesatuan Republik Indonesia di atas keberagaman suku, agama, ras, dan antargolongan.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Tanggung Jawab Warga Negara',
    description: 'Memahami hak dan kewajiban konstitusional untuk berkontribusi positif bagi kemajuan masyarakat, bangsa, dan negara.',
    icon: 'Award'
  },
  {
    title: 'Memahami Proses Lahirnya Pancasila',
    description: 'Mengetahui benang merah perumusan Pancasila secara utuh sejak sidang BPUPK hingga penetapan resmi pada 18 Agustus 1945.',
    icon: 'Flame'
  }
];
