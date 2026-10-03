import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'single_choice',
    stimulus: 'Pada tanggal 29 Mei 1945, seorang tokoh pergerakan nasional menyampaikan pidato tentang lima asas kelengkapan negara kebangsaan Indonesia merdeka.',
    question: 'Siapakah tokoh yang mengusulkan lima asas dasar negara yang meliputi Peri Kebangsaan, Peri Kemanusiaan, Peri Ketuhanan, Peri Kerakyatan, dan Kesejahteraan Rakyat pada tanggal 29 Mei 1945?',
    options: [
      'Mr. Mohammad Yamin',
      'Prof. Dr. Mr. Soepomo',
      'Ir. Soekarno',
      'Drs. Mohammad Hatta',
      'Mr. Achmad Soebardjo'
    ],
    correctAnswer: 0,
    explanation: 'Mr. Mohammad Yamin menyampaikan pidato pada 29 Mei 1945 yang memuat lima asas: Peri Kebangsaan, Peri Kemanusiaan, Peri Ketuhanan, Peri Kerakyatan, dan Kesejahteraan Rakyat.'
  },
  {
    id: 2,
    type: 'single_choice',
    stimulus: 'Prof. Dr. Mr. Soepomo dalam pidatonya pada tanggal 31 Mei 1945 menguraikan pandangannya mengenai struktur sosial dan falsafah hidup ketimuran bangsa Indonesia.',
    question: 'Teori kenegaraan manakah yang ditolak oleh Prof. Soepomo dalam pidatonya karena dianggap bertentangan dengan semangat kekeluargaan bangsa Indonesia?',
    options: [
      'Teori Negara Integralistik dan Paham Kekeluargaan',
      'Teori Individualisme Liberal dan Teori Pertarungan Kelas (Marxisme)',
      'Teori Musyawarah untuk Mufakat dan Keadilan Sosial',
      'Teori Demokrasi Terpimpin dan Gotong Royong',
      'Teori Kedaulatan Rakyat berdasarkan Hukum Adat'
    ],
    correctAnswer: 1,
    explanation: 'Soepomo menolak teori individualisme barat (yang mementingkan perorangan) dan teori kelas Marxisme (yang mempertentangkan kaum borjuis dan proletar), dan memilih teori integralistik.'
  },
  {
    id: 3,
    type: 'single_choice',
    stimulus: 'Pada 1 Juni 1945, Ir. Soekarno memperkenalkan istilah "Pancasila" sebagai philosophische grondslag bagi Indonesia merdeka. Beliau juga menjelaskan bahwa lima prinsip tersebut dapat diperas menjadi prinsip yang lebih ringkas.',
    question: 'Berdasarkan uraian Ir. Soekarno, apabila konsep Trisila (Sosio-nasionalisme, Sosio-demokrasi, dan Ketuhanan) diperas menjadi Ekasila (satu prinsip tunggal), maka intisari nilai tersebut adalah...',
    options: [
      'Kedaulatan Hukum',
      'Musyawarah Mufakat',
      'Gotong Royong',
      'Kesejahteraan Rakyat',
      'Persatuan Indonesia'
    ],
    correctAnswer: 2,
    explanation: 'Ir. Soekarno menjelaskan bahwa jika Pancasila diperas menjadi Trisila, lalu Trisila diperas lagi menjadi satu asas tunggal (Ekasila), maka intisarinya adalah "Gotong Royong".'
  },
  {
    id: 4,
    type: 'true_false',
    stimulus: 'BPUPK dibentuk oleh pemerintah pendudukan militer Jepang sebagai tindak lanjut atas pengumuman Perdana Menteri Kuniaki Koiso pada September 1944 mengenai janji kemerdekaan di kemudian hari.',
    question: 'Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan (Dokuritsu Junbi Cosakai) resmi dibentuk dan diumumkan pada tanggal 1 Maret 1945 oleh Panglima Tentara Ke-16 Jepang, Letnan Jenderal Kumakichi Harada.',
    options: [
      'Benar',
      'Salah'
    ],
    correctAnswer: true,
    explanation: 'Pernyataan ini BENAR. Letnan Jenderal Kumakichi Harada mengumumkan pembentukan BPUPK pada 1 Maret 1945, kemudian anggotanya dilantik secara resmi pada 28 Mei 1945.'
  },
  {
    id: 5,
    type: 'true_false',
    stimulus: 'Sidang pertama BPUPK (29 Mei - 1 Juni 1945) langsung menghasilkan naskah final Pembukaan UUD 1945 dan rumusan resmi Pancasila yang langsung disahkan pada hari terakhir persidangan.',
    question: 'Pada akhir sidang pertama BPUPK tanggal 1 Juni 1945, seluruh peserta sidang telah menyepakati naskah Pembukaan UUD 1945 secara bulat tanpa perlu dibentuk panitia perumus lanjutan.',
    options: [
      'Benar',
      'Salah'
    ],
    correctAnswer: false,
    explanation: 'Pernyataan ini SALAH. Sidang pertama belum menghasilkan naskah final, melainkan masih berupa usulan-usulan. Oleh karena itu, dibentuk Panitia Kecil dan Panitia Sembilan yang baru menyepakati Piagam Jakarta pada 22 Juni 1945.'
  }
];
