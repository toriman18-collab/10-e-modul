import { CompetencyQuestion } from '../types';

export const COMPETENCY_QUESTIONS: CompetencyQuestion[] = [
  // --- BAGIAN 1: PILIHAN GANDA (5 SOAL) ---
  {
    id: 1,
    type: 'single_choice',
    difficulty: 'Low',
    stimulus: 'Dalam pidato pembukaan sidang pertama BPUPK tanggal 29 Mei 1945, Dr. K.R.T. Radjiman Wedyodiningrat mengajukan pertanyaan mendasar kepada seluruh anggota mengenai fondasi negara yang akan didirikan.',
    question: 'Istilah teknis dalam bahasa Belanda yang digunakan Ir. Soekarno untuk menerangkan "dasar falsafah yang sedalam-dalamnya" tempat berdirinya negara Indonesia merdeka adalah...',
    options: [
      'Staatsfundamentalnorm',
      'Philosophische Grondslag',
      'Rechtmatigheid van Bestuur',
      'Algemene Beginselen van Behoorlijk Bestuur',
      'Weltanschauung der Völker'
    ],
    correctAnswer: 1,
    explanation: 'Ir. Soekarno menggunakan istilah Philosophische Grondslag (dasar falsafah negara) dan Weltanschauung (pandangan hidup/pandangan dunia) sebagai landasan mendasar negara Indonesia merdeka.'
  },
  {
    id: 2,
    type: 'single_choice',
    difficulty: 'Medium',
    stimulus: 'Perhatikan petikan isi pidato salah seorang pendiri bangsa berikut: "Negara tidak mempersatukan diri dengan golongan yang terbesar dalam masyarakat, pun tidak mempersatukan diri dengan golongan yang paling kuat (golongan politik atau ekonomi yang paling kuat). Akan tetapi negara mempersatukan diri dengan segala golongan dan segala bagian dari seluruh rakyat."',
    question: 'Petikan pidato di atas disampaikan oleh Prof. Dr. Mr. Soepomo pada 31 Mei 1945. Konsepsi pokok kenegaraan yang terkandung dalam kutipan tersebut adalah...',
    options: [
      'Negara federasi yang membagi kekuasaan pada daerah otonom',
      'Negara totaliter yang mengekang kebebasan seluruh masyarakat',
      'Paham negara integralistik yang mengutamakan persatuan seluruh rakyat',
      'Sistem parlementer yang mengedepankan koalisi partai politik',
      'Negara borjuis yang membela kepentingan pemilik modal'
    ],
    correctAnswer: 2,
    explanation: 'Kutipan tersebut mencerminkan inti teori negara integralistik Soepomo, di mana negara mengatasi semua golongan dan individu serta memandang masyarakat sebagai satu kesatuan organis yang utuh.'
  },
  {
    id: 3,
    type: 'single_choice',
    difficulty: 'Medium',
    stimulus: 'Meskipun Mohammad Yamin, Soepomo, dan Soekarno memiliki latar belakang keilmuan dan pendekatan yang berbeda, terdapat benang merah kesamaan prinsip yang dipegang teguh oleh ketiganya.',
    question: 'Prinsip persamaan mendasar yang disepakati oleh Mohammad Yamin, Soepomo, maupun Soekarno dalam merumuskan dasar negara adalah...',
    options: [
      'Menetapkan hukum agama tertentu sebagai hukum formal positif negara',
      'Menolak konsep kedaulatan rakyat dan menggantinya dengan monarki absolut',
      'Menjadikan persatuan kebangsaan, kemanusiaan, dan keadilan sosial sebagai pilar bangsa',
      'Mengadopsi sistem liberalisme pasar bebas tanpa intervensi pemerintah',
      'Membatasi perwakilan rakyat hanya untuk kalangan bangsawan dan pamong praja'
    ],
    correctAnswer: 2,
    explanation: 'Ketiga tokoh sepakat bahwa negara Indonesia harus bersatu (nasionalisme), berkeadaban kemanusiaan, serta menjamin keadilan sosial bagi seluruh rakyat melalui musyawarah.'
  },
  {
    id: 4,
    type: 'single_choice',
    difficulty: 'High',
    stimulus: 'Dalam sidang BPUPK timbul perdebatan sengit antara golongan Islam yang menghendaki dasar negara Islam dan golongan kebangsaan yang menghendaki negara kesatuan netral agama. Perdebatan ini tidak berujung pada perpecahan melainkan diselesaikan secara damai melalui Panitia Sembilan.',
    question: 'Faktor determinan yang memungkinkan para pendiri bangsa mencapai kesepakatan (konsensus) luhur meskipun berbeda pandangan ideologis yang sangat tajam adalah...',
    options: [
      'Adanya paksaan dan tekanan fisik dari perwakilan militer Jepang di ruang sidang',
      'Tingginya komitmen kebangsaan serta kerelaan menempatkan keselamatan bangsa di atas ego golongan',
      'Kepasrahan salah satu pihak karena kalah jumlah suara dalam sistem voting tertutup',
      'Ketiadaan pemahaman mengenai hukum tata negara modern di kalangan anggota sidang',
      'Ketakutan para anggota sidang terhadap sanksi hukum dari pemerintah kolonial'
    ],
    correctAnswer: 1,
    explanation: 'Para pendiri bangsa berjiwa negarawan sejati. Mereka rela berkorban, menundukkan ego kelompok, dan mengutamakan keutuhan serta keselamatan persatuan Indonesia merdeka.'
  },
  {
    id: 5,
    type: 'single_choice',
    difficulty: 'High',
    stimulus: 'Mohammad Yamin menyampaikan usul dasar negara melalui dua cara: pidato lisan pada 29 Mei 1945 dan penyerahan naskah tertulis rancangan hukum dasar pembukaan UUD.',
    question: 'Jika dicermati secara saksama, perbedaan paling mencolok antara usul lisan dan usul tertulis Mohammad Yamin terletak pada...',
    options: [
      'Penambahan prinsip monarki pada usulan tertulis',
      'Sistematika dan redaksi rumusan sila yang pada naskah tertulis sangat mirip dengan naskah Pancasila saat ini',
      'Penolakan terhadap prinsip ketuhanan dalam naskah tertulis',
      'Pemisahan wilayah Jawa dan luar Jawa dalam rumusan kedaulatan tertulis',
      'Penggantian prinsip peri kemanusiaan dengan pertahanan militer'
    ],
    correctAnswer: 1,
    explanation: 'Dalam naskah tertulis rancangan UUD yang diserahkan Yamin, rumusan 5 dasarnya berbunyi: 1. Ketuhanan Yang Maha Esa, 2. Kebangsaan Persatuan Indonesia, 3. Rasa Kemanusiaan yang Adil dan Beradab, 4. Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan, 5. Keadilan sosial bagi seluruh rakyat Indonesia.'
  },

  // --- BAGIAN 2: BENAR / SALAH (5 SOAL) ---
  {
    id: 6,
    type: 'true_false',
    difficulty: 'Low',
    stimulus: 'Struktur kepemimpinan BPUPK dirancang dengan melibatkan tokoh pergerakan nasional serta perwakilan dari pemerintah bala tentara pendudukan Jepang.',
    question: 'Ketua BPUPK dijabat oleh Dr. K.R.T. Radjiman Wedyodiningrat dengan didampingi oleh dua wakil ketua, yaitu R.P. Soeroso dan Ichibangase Yosio.',
    options: ['Benar', 'Salah'],
    correctAnswer: true,
    explanation: 'Pernyataan BENAR. Dr. Radjiman Wedyodiningrat adalah ketua BPUPK, didampingi R.P. Soeroso (Indonesia) dan Ichibangase Yosio (Jepang) sebagai wakil ketua.'
  },
  {
    id: 7,
    type: 'true_false',
    difficulty: 'Medium',
    stimulus: 'Dalam teori negara integralistik yang dipaparkan Prof. Soepomo, negara dipandang sebagai susunan masyarakat yang tersusun atas ikatan perjanjian perorangan (kontrak sosial liberal).',
    question: 'Menurut Prof. Soepomo, negara integralistik mengadopsi konsep kontrak sosial individualistis dari John Locke demi menjamin hak privat warga negara di atas kepentingan umum.',
    options: ['Benar', 'Salah'],
    correctAnswer: false,
    explanation: 'Pernyataan SALAH. Prof. Soepomo justru menolak teori individualisme dan kontrak sosial individualistis. Bagi Soepomo, negara bukan gabungan individu, melainkan kesatuan organis kekeluargaan.'
  },
  {
    id: 8,
    type: 'true_false',
    difficulty: 'Medium',
    stimulus: 'Ir. Soekarno dalam pidato 1 Juni 1945 menjelaskan bahwa kebangsaan Indonesia yang beliau kehendaki bukanlah nasionalisme yang sempit atau chauvinisme yang menindas bangsa lain.',
    question: 'Ir. Soekarno menegaskan bahwa prinsip Kebangsaan Indonesia (Nasionalisme) harus bergandengan erat dengan prinsip Internasionalisme (Peri Kemanusiaan), karena kebangsaan Indonesia harus tumbuh dalam tamansarinya peradaban dunia.',
    options: ['Benar', 'Salah'],
    correctAnswer: true,
    explanation: 'Pernyataan BENAR. Soekarno menyatakan: "Nasionalisme tidak dapat hidup subur kalau tidak hidup dalam tamansarinya internasionalisme. Internasionalisme tidak dapat hidup subur kalau tidak berakar di dalam buminya nasionalisme."'
  },
  {
    id: 9,
    type: 'true_false',
    difficulty: 'High',
    stimulus: 'Sidang BPUPK memiliki keanggotaan 67 orang yang semuanya memiliki hak suara penuh dalam menetapkan konstitusi Indonesia.',
    question: 'Tujuh orang anggota perwakilan Jepang di dalam keanggotaan BPUPK memiliki hak suara voting yang sama dengan anggota bangsa Indonesia dalam menentukan rumusan dasar negara.',
    options: ['Benar', 'Salah'],
    correctAnswer: false,
    explanation: 'Pernyataan SALAH. Tujuh anggota dari pihak Jepang bertindak sebagai pengamat pasif dan tidak memiliki hak suara dalam pengambilan keputusan atau perumusan hukum dasar.'
  },
  {
    id: 10,
    type: 'true_false',
    difficulty: 'High',
    stimulus: 'Perumusan sila pertama dalam Piagam Jakarta sempat menimbulkan keberatan dari perwakilan Indonesia bagian timur karena dianggap eksklusif terhadap pemeluk agama tertentu.',
    question: 'Pada tanggal 18 Agustus 1945, para tokoh Islam dalam PPKI menunjukkan kebesaran jiwa kenegarawanan dengan menyetujui penghapusan tujuh kata dalam Piagam Jakarta demi menjaga keutuhan Negara Kesatuan Republik Indonesia.',
    options: ['Benar', 'Salah'],
    correctAnswer: true,
    explanation: 'Pernyataan BENAR. Kalimat "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya" diganti menjadi "Ketuhanan Yang Maha Esa" atas usulan Drs. Moh. Hatta setelah bermusyawarah dengan para tokoh Islam (Ki Bagus Hadikusumo, Wahid Hasjim, Kasman Singodimedjo, Teuku Moh. Hasan).'
  },

  // --- BAGIAN 3: PILIHAN GANDA KOMPLEKS (5 SOAL - PILIH LEBIH DARI SATU BENAR) ---
  {
    id: 11,
    type: 'multiple_choice',
    difficulty: 'Medium',
    stimulus: 'Mr. Mohammad Yamin mengemukakan pidato penting pada hari pertama sidang BPUPK (29 Mei 1945) mengenai dasar kebangsaan Indonesia merdeka.',
    question: 'Manakah di antara pernyataan berikut yang termasuk lima asas lisan dasar negara yang diusulkan oleh Mr. Mohammad Yamin pada tanggal 29 Mei 1945? (Pilihlah SEMUA jawaban yang benar!)',
    options: [
      'Peri Kebangsaan',
      'Peri Kemanusiaan',
      'Ekasila dan Gotong Royong',
      'Peri Ketuhanan',
      'Paham Negara Integralistik'
    ],
    correctAnswer: [0, 1, 3], // Peri Kebangsaan, Peri Kemanusiaan, Peri Ketuhanan
    explanation: 'Lima asas lisan Yamin adalah: 1. Peri Kebangsaan, 2. Peri Kemanusiaan, 3. Peri Ketuhanan, 4. Peri Kerakyatan, dan 5. Kesejahteraan Rakyat. Poin C adalah gagasan Soekarno dan poin E adalah gagasan Soepomo.'
  },
  {
    id: 12,
    type: 'multiple_choice',
    difficulty: 'Medium',
    stimulus: 'Prof. Dr. Mr. Soepomo mengusulkan lima prinsip dasar negara yang berakar pada karakteristik kebudayaan dan hukum adat masyarakat nusantara pada 31 Mei 1945.',
    question: 'Manakah prinsip-prinsip berikut yang secara eksplisit merupakan bagian dari lima gagasan dasar negara yang disampaikan Prof. Soepomo? (Pilihlah SEMUA jawaban yang benar!)',
    options: [
      'Persatuan',
      'Kekeluargaan',
      'Internasionalisme',
      'Keseimbangan Lahir dan Batin',
      'Keadilan Rakyat'
    ],
    correctAnswer: [0, 1, 3, 4], // Persatuan, Kekeluargaan, Keseimbangan Lahir dan Batin, Keadilan Rakyat (plus Musyawarah)
    explanation: 'Lima prinsip gagasan Soepomo adalah: 1. Persatuan, 2. Kekeluargaan, 3. Keseimbangan Lahir dan Batin, 4. Musyawarah, dan 5. Keadilan Rakyat. Internasionalisme adalah gagasan Ir. Soekarno.'
  },
  {
    id: 13,
    type: 'multiple_choice',
    difficulty: 'High',
    stimulus: 'Ir. Soekarno dalam pidato 1 Juni 1945 memberikan tawaran pemikiran filosofis yang dapat dipadatkan sesuai kebutuhan penghayatan hidup bernegara.',
    question: 'Pernyataan mana sajakah yang BENAR terkait penjelasan konsep Pancasila, Trisila, dan Ekasila oleh Ir. Soekarno? (Pilihlah SEMUA jawaban yang benar!)',
    options: [
      'Pancasila terdiri atas lima asas yang diusulkan sebagai philosophische grondslag Indonesia merdeka.',
      'Trisila merupakan pemerasan Pancasila menjadi: Sosio-nasionalisme, Sosio-demokrasi, dan Ketuhanan.',
      'Ekasila adalah pemerasan lebih lanjut dari Trisila yang intisarinya berwujud "Gotong Royong".',
      'Soekarno menolak prinsip Ketuhanan karena beranggapan negara modern harus sepenuhnya agnostik.',
      'Nama "Pancasila" diperoleh Soekarno atas petunjuk dari salah seorang temannya ahli bahasa.'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Pernyataan A, B, C, dan E benar. Pernyataan D salah karena Soekarno justru memasukkan prinsip "Ketuhanan yang berkebudayaan" sebagai salah satu dari lima dasar negara.'
  },
  {
    id: 14,
    type: 'multiple_choice',
    difficulty: 'High',
    stimulus: 'Panitia Sembilan dibentuk pada masa reses antara sidang pertama dan kedua BPUPK untuk menyelaraskan pandangan antara golongan kebangsaan dan golongan Islam.',
    question: 'Siapa sajakah tokoh-tokoh bangsa yang termasuk ke dalam keanggotaan Panitia Sembilan yang merumuskan Piagam Jakarta 22 Juni 1945? (Pilihlah SEMUA jawaban yang benar!)',
    options: [
      'Ir. Soekarno dan Drs. Mohammad Hatta',
      'K.H. A. Wahid Hasjim dan K.H. Kahar Muzakkir',
      'Mr. Achmad Soebardjo dan Mr. Mohammad Yamin',
      'Prof. Dr. Mr. Soepomo dan Dr. K.R.T. Radjiman Wedyodiningrat',
      'Mr. A.A. Maramis dan H. Agus Salim'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Anggota Panitia Sembilan adalah: Soekarno, Hatta, A.A. Maramis, Abikoesno Tjokrosoejoso, Abdulkahar Muzakkir, Agus Salim, Achmad Soebardjo, Wahid Hasjim, dan Mohammad Yamin. Soepomo dan Radjiman BUKAN anggota Panitia Sembilan.'
  },
  {
    id: 15,
    type: 'multiple_choice',
    difficulty: 'Medium',
    stimulus: 'Nilai-nilai keteladanan yang ditunjukkan para pendiri bangsa dalam sidang BPUPK sangat relevan untuk dipraktikkan oleh peserta didik kelas X SMA dalam kehidupan bermasyarakat.',
    question: 'Tindakan manakah yang mencerminkan keteladanan para pendiri bangsa dalam perumusan dasar negara di lingkungan sekolah saat ini? (Pilihlah SEMUA jawaban yang benar!)',
    options: [
      'Menghargai hasil musyawarah OSIS meskipun keputusan tersebut tidak sesuai dengan usulan pribadi.',
      'Memaksakan kehendak kelompok sendiri dalam pemilihan ketua kelas dengan cara mengancam teman.',
      'Mendengarkan dengan santun saat teman menyampaikan pendapat berbeda dalam diskusi kelompok.',
      'Menjaga persatuan dan solidaritas kelas tanpa membedakan suku, agama, dan latar belakang ekonomi.',
      'Melakukan walkout atau mogok belajar saat pendapat diri sendiri tidak diterima dalam rapat kelas.'
    ],
    correctAnswer: [0, 2, 3],
    explanation: 'Tindakan yang meneladani pendiri bangsa adalah menghormati keputusan musyawarah, santun mendengar pendapat orang lain, dan merawat persatuan kelas tanpa diskriminasi. Opsi B dan E adalah tindakan negatif yang bertolak belakang.'
  },

  // --- BAGIAN 4: MENJODOHKAN (5 SOAL) ---
  {
    id: 16,
    type: 'matching',
    difficulty: 'Low',
    stimulus: 'Sidang pertama BPUPK diwarnai oleh pidato-pidato penting dari tiga tokoh perumus utama dasar negara pada tanggal-tanggal bersejarah di tahun 1945.',
    question: 'Jodohkanlah nama tokoh pendiri bangsa di kolom kiri dengan tanggal penyampaian pidatonya yang tepat di kolom kanan!',
    matchingPairs: [
      { id: 'p1', left: 'Mr. Mohammad Yamin', right: '29 Mei 1945' },
      { id: 'p2', left: 'Prof. Dr. Mr. Soepomo', right: '31 Mei 1945' },
      { id: 'p3', left: 'Ir. Soekarno', right: '1 Juni 1945' },
      { id: 'p4', left: 'Panitia Sembilan (Piagam Jakarta)', right: '22 Juni 1945' }
    ],
    explanation: 'Mohammad Yamin berpidato pada 29 Mei 1945, Soepomo pada 31 Mei 1945, Soekarno pada 1 Juni 1945, dan Piagam Jakarta disepakati Panitia Sembilan pada 22 Juni 1945.'
  },
  {
    id: 17,
    type: 'matching',
    difficulty: 'Medium',
    stimulus: 'Masing-masing pendiri bangsa menekankan konsep utama yang menjadi ciri khas dan kontribusi orisinal dalam pemikiran ketatanegaraan Indonesia merdeka.',
    question: 'Jodohkanlah tokoh bangsa berikut dengan konsep pemikiran kunci yang beliau kemukakan!',
    matchingPairs: [
      { id: 'c1', left: 'Ir. Soekarno', right: 'Philosophische Grondslag & Gotong Royong' },
      { id: 'c2', left: 'Prof. Dr. Mr. Soepomo', right: 'Teori Negara Integralistik & Paham Kekeluargaan' },
      { id: 'c3', left: 'Mr. Mohammad Yamin', right: 'Asas Peri Kebangsaan & Hukum Adat Tertulis' },
      { id: 'c4', left: 'Dr. K.R.T. Radjiman Wedyodiningrat', right: 'Pemantik Pertanyaan Fondasi Dasar Negara' }
    ],
    explanation: 'Soekarno menggagas Philosophische Grondslag dan Ekasila Gotong Royong; Soepomo mengajukan negara integralistik; Yamin mengusulkan asas peri kebangsaan dan rancangan tertulis; Radjiman memantik pertanyaan dasar negara sebagai ketua sidang.'
  },
  {
    id: 18,
    type: 'matching',
    difficulty: 'Medium',
    stimulus: 'Dalam pidatonya tanggal 1 Juni 1945, Ir. Soekarno mengajukan lima sila dasar negara yang kemudian dapat diperas menjadi formula yang lebih ringkas.',
    question: 'Jodohkanlah tingkatan konsep pemikiran Ir. Soekarno berikut dengan isi rumusan atau intisari nilainya!',
    matchingPairs: [
      { id: 's1', left: 'Pancasila (Lima Prinsip)', right: 'Kebangsaan, Kemanusiaan, Mufakat, Kesejahteraan, Ketuhanan' },
      { id: 's2', left: 'Trisila (Tiga Prinsip)', right: 'Sosio-nasionalisme, Sosio-demokrasi, dan Ketuhanan' },
      { id: 's3', left: 'Ekasila (Satu Asas Tunggal)', right: 'Gotong Royong' },
      { id: 's4', left: 'Internasionalisme', right: 'Peri Kemanusiaan dalam Tamansari Dunia' }
    ],
    explanation: 'Pancasila memuat lima prinsip, Trisila memerasnya menjadi 3 pilar (Sosio-nasionalisme, Sosio-demokrasi, Ketuhanan), dan Ekasila memerasnya menjadi nilai luhur tunggal: Gotong Royong.'
  },
  {
    id: 19,
    type: 'matching',
    difficulty: 'High',
    stimulus: 'BPUPK dibentuk dalam konteks dinamika Perang Dunia II antara kekaisaran Jepang dan Sekutu, serta melibatkan struktur kelembagaan khusus.',
    question: 'Jodohkanlah istilah atau jabatan penting seputar BPUPK di kolom kiri dengan deskripsi atau padanan yang sesuai di kolom kanan!',
    matchingPairs: [
      { id: 'b1', left: 'Dokuritsu Junbi Cosakai', right: 'Nama resmi BPUPK dalam bahasa Jepang' },
      { id: 'b2', left: 'Gedung Chuo Sangi In', right: 'Tempat berlangsungnya sidang pertama BPUPK di Pejambon' },
      { id: 'b3', left: 'Kuniaki Koiso', right: 'Perdana Menteri Jepang pencetus janji kemerdekaan 1944' },
      { id: 'b4', left: 'Kumakichi Harada', right: 'Panglima Tentara Ke-16 pembentuk resmi BPUPK' }
    ],
    explanation: 'Dokuritsu Junbi Cosakai adalah sebutan BPUPK dalam bahasa Jepang; Gedung Chuo Sangi In (kini Gedung Pancasila); Kuniaki Koiso memberi janji kemerdekaan; Kumakichi Harada mengumumkan pembentukan BPUPK di Jawa.'
  },
  {
    id: 20,
    type: 'matching',
    difficulty: 'High',
    stimulus: 'Sila-sila yang dirumuskan para pendiri bangsa memiliki keterkaitan erat dengan pengamalan nilai-nilai Profil Pelajar Pancasila di era modern.',
    question: 'Jodohkanlah gagasan para pendiri bangsa berikut dengan dimensi Profil Pelajar Pancasila yang paling relevan!',
    matchingPairs: [
      { id: 'd1', left: 'Peri Ketuhanan & Ketuhanan yang Berkebudayaan', right: 'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia' },
      { id: 'd2', left: 'Internasionalisme & Peri Kemanusiaan', right: 'Berkebinekaan Global' },
      { id: 'd3', left: 'Ekasila Gotong Royong & Paham Kekeluargaan', right: 'Bergotong Royong' },
      { id: 'd4', left: 'Mufakat Demokrasi & Musyawarah', right: 'Bernalar Kritis dan Menghargai Dialog' }
    ],
    explanation: 'Prinsip ketuhanan berpadanan dengan Beriman dan Berakhlak Mulia; Peri kemanusiaan dengan Berkebinekaan Global; Gotong royong dan kekeluargaan dengan Bergotong Royong; Musyawarah mufakat dengan Bernalar Kritis.'
  }
];
