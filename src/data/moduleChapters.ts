export interface ModuleChapter {
  id: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
  keyHighlight?: string;
  bulletPoints?: string[];
  summaryNote?: string;
}

export const MODULE_CHAPTERS: ModuleChapter[] = [
  {
    id: 1,
    title: '1. Pengantar: Fondasi Sebuah Negara Merdeka',
    subtitle: 'Makna Penting Dasar Negara bagi Bangsa yang Akan Lahir',
    paragraphs: [
      'Setiap bangunan kokoh selalu didirikan di atas fondasi yang kuat, tahan uji, dan berakar mendalam. Demikian pula halnya dengan sebuah negara merdeka. Ketika bangsa Indonesia berada di ambang pintu kemerdekaan pada pertengahan tahun 1945, pertanyaan paling fundamental yang diajukan oleh ketua sidang BPUPK, Dr. K.R.T. Radjiman Wedyodiningrat, adalah: "Apakah dasar negara Indonesia merdeka yang akan kita bangun?"',
      'Pertanyaan ini bukan sekadar persoalan administratif atau prosedural, melainkan pencarian jati diri, pandangan hidup (weltanschauung), dan fondasi filsafat (philosophische grondslag) yang akan memayungi seluruh rakyat Indonesia yang majemuk dari Sabang sampai Merauke. Bab ini menelusuri bagaimana para pendiri bangsa mencurahkan segenap ketajaman intelektual, ketulusan budi, dan cinta tanah air untuk merumuskan dasar negara tersebut.'
    ],
    keyHighlight: 'Dasar negara berfungsi sebagai philosophische grondslag (dasar filsafat) dan weltanschauung (pandangan hidup bersama) yang menentukan arah seluruh tata kelola bangsa merdeka.'
  },
  {
    id: 2,
    title: '2. Latar Belakang Pembentukan BPUPK',
    subtitle: 'Situasi Perang Pasifik dan Tekanan terhadap Pendudukan Jepang',
    paragraphs: [
      'Menjelang akhir tahun 1944, posisi militer kekaisaran Jepang dalam Perang Pasifik (Perang Asia Timur Raya) semakin terdesak oleh kekuatan Sekutu yang dipimpin oleh Amerika Serikat. Pulau demi pulau pertahanan Jepang di Samudra Pasifik mulai jatuh, armada laut dan udara Jepang mengalami kehancuran drastis, serta krisis ekonomi melanda negeri sakura.',
      'Dalam kondisi yang serba genting tersebut, tentara pendudukan Jepang di Indonesia sangat membutuhkan bantuan tenaga manusia (romusha dan milisi pemuda) serta sumber daya logistik dari rakyat Indonesia. Untuk menarik simpati dan dukungan rakyat Indonesia agar bersedia membantu pertahanan Jepang, Perdana Menteri Kuniaki Koiso pada tanggal 7 September 1944 mengumumkan di depan parlemen Tokyo (Teikoku Gikai) bahwa wilayah Hindia Timur (Indonesia) diperkenankan merdeka di kemudian hari.'
    ],
    keyHighlight: 'Janji Koiso adalah strategi Jepang untuk meredam perlawanan rakyat Indonesia sekaligus menggalang dukungan logistik dan militer di tengah kekalahan Sekutu yang kian mendekat.'
  },
  {
    id: 3,
    title: '3. Pembentukan Resmi BPUPK (Dokuritsu Junbi Cosakai)',
    subtitle: 'Dekrit 1 Maret 1945 dan Peresmian di Gedung Chuo Sangi In',
    paragraphs: [
      'Sebagai tindak lanjut dari janji Perdana Menteri Koiso, Letnan Jenderal Kumakichi Harada (Panglima Tentara Keenam Belas di Jawa) pada tanggal 1 Maret 1945 mengumumkan rencana pembentukan Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan (BPUPK), yang dalam bahasa Jepang disebut Dokuritsu Junbi Cosakai.',
      'Badan ini resmi dibentuk dan dilantik pada tanggal 28 Mei 1945, bertepatan dengan hari peringatan kelahiran Kaisar Hirohito (Tencho Setsu). Upacara peresmian diadakan di Gedung Chuo Sangi In, yang terletak di Jalan Pejambon 6 Jakarta (sekarang dikenal sebagai Gedung Pancasila, Kementerian Luar Negeri RI). Pengibaran bendera Merah Putih di samping bendera Hinomaru dalam pembukaan tersebut membangkitkan kobaran semangat nasionalisme yang tak terbendung.'
    ],
    keyHighlight: 'Pembentukan BPUPK menjadi sarana formal legal pertama di mana para tokoh bangsa dari berbagai wilayah dan golongan dapat berkumpul secara sah untuk merancang kemerdekaan.'
  },
  {
    id: 4,
    title: '4. Tujuan Utama Pembentukan BPUPK',
    subtitle: 'Antara Kepentingan Militer Jepang dan Agenda Kemerdekaan Bangsa',
    paragraphs: [
      'Secara formal, pemerintah pendudukan militer Jepang menugaskan BPUPK untuk menyelidiki, mempelajari, dan merancang hal-hal penting yang berhubungan dengan tata pemerintahan, ekonomi, politik, dan tata hukum dalam rangka pembentukan negara Indonesia merdeka.',
      'Namun bagi para pemimpin pergerakan nasional Indonesia, BPUPK bukanlah boneka politik Jepang. Para pendiri bangsa memanfaatkan momentum ini secara cerdas dan berdaulat sebagai wahana sah untuk meletakkan dasar-dasar negara merdeka menurut kehendak murni rakyat Indonesia sendiri, bukan mengikuti rancangan pemerintah militer Jepang. Badan ini bertekad mempersiapkan kemerdekaan sejati yang lahir dari rahim perjuangan bangsa.'
    ],
    bulletPoints: [
      'Menyelidiki aspek politik, ketatanegaraan, dan dasar falsafah negara merdeka.',
      'Menyusun rancangan hukum dasar (konstitusi) bagi Republik Indonesia.',
      'Menjembatani aspirasi seluruh golongan kebangsaan, agama, dan kedaerahan.',
      'Menegakkan kedaulatan rakyat terlepas dari intervensi kekuasaan asing.'
    ]
  },
  {
    id: 5,
    title: '5. Keanggotaan dan Struktur Organisasi BPUPK',
    subtitle: 'Komposisi Tokoh Intelektual, Agama, Budayawan, dan Perwakilan Jepang',
    paragraphs: [
      'BPUPK memiliki 67 orang anggota yang terdiri atas 60 orang tokoh bangsa Indonesia yang mewakili berbagai daerah, golongan sosial, dan latar belakang pemikiran (golongan nasionalis sekuler, golongan Islam, cendekiawan, pamong praja, dan tokoh adat), serta 7 orang perwakilan Jepang yang bertindak sebagai pengamat pasif tanpa hak suara.',
      'Struktur pimpinan BPUPK diketuai oleh Dr. K.R.T. Radjiman Wedyodiningrat, seorang dokter senior dan tokoh Boedi Oetomo yang disegani karena kebijaksanaan budinya. Beliau didampingi oleh dua orang wakil ketua, yaitu Raden Panji Soeroso (tokoh pergerakan Indonesia) dan Ichibangase Yosio (pejabat perwakilan Jepang).'
    ],
    summaryNote: 'Komposisi anggota yang majemuk mencerminkan representasi kebangsaan yang utuh, memastikan setiap elemen bangsa memiliki ruang menyampaikan pandangannya.'
  },
  {
    id: 6,
    title: '6. Sidang Pertama BPUPK (29 Mei - 1 Juni 1945)',
    subtitle: 'Empat Hari Bersejarah Merumuskan Filosofi Negara Merdeka',
    paragraphs: [
      'Sidang pertama BPUPK berlangsung selama empat hari berturut-turut, mulai tanggal 29 Mei sampai dengan 1 Juni 1945. Pada pembukaan sidang, Ketua BPUPK Dr. Radjiman Wedyodiningrat meminta para peserta sidang untuk menyampaikan pandangan mengenai: "Apa yang akan menjadi dasar bagi negara Indonesia yang akan merdeka?"',
      'Pertanyaan tersebut dijawab dengan penuh kesungguhan oleh puluhan anggota sidang yang berpidato secara bergantian. Suasana sidang dipenuhi perdebatan intelek yang hangat, penuh gairah kemerdekaan, namun tetap dilandasi sikap saling menghormati dan menjunjung tinggi kesantunan tradisi luhur bangsa. Dari sekian banyak pembicara, terdapat tiga tokoh utama yang secara khusus menguraikan rumusan konseptual dasar negara secara komprehensif.'
    ]
  },
  {
    id: 7,
    title: '7. Tokoh Utama Pengusul Gagasan Dasar Negara',
    subtitle: 'Tiga Tokoh Agung dengan Perspektif Keilmuan dan Perjuangan yang Khas',
    paragraphs: [
      'Tiga tokoh besar yang tampil menyampaikan pidato komprehensif mengenai dasar negara adalah Mr. Mohammad Yamin pada tanggal 29 Mei 1945, Prof. Dr. Mr. Soepomo pada tanggal 31 Mei 1945, dan Ir. Soekarno pada tanggal 1 Juni 1945.',
      'Masing-masing tokoh ini membawa latar belakang keilmuan yang kuat: Yamin bertolak dari hukum tata negara, sastra, dan kontinuitas sejarah kebesaran Sriwijaya-Majapahit; Soepomo berakar pada sosiologi hukum adat dan teori kenegaraan integralistik; sementara Soekarno meramu filsafat pergerakan rakyat, anti-kolonialisme global, serta kearifan gotong royong nusantara.'
    ]
  },
  {
    id: 8,
    title: '8. Gagasan Mr. Mohammad Yamin (29 Mei 1945)',
    subtitle: 'Asas Kebangsaan, Kemanusiaan, Ketuhanan, Kerakyatan, dan Kesejahteraan',
    paragraphs: [
      'Pada hari pertama persidangan, 29 Mei 1945, Mr. Mohammad Yamin menyampaikan pidato berjudul "Asas dan Dasar Negara Kebangsaan Republik Indonesia". Beliau menekankan bahwa rakyat Indonesia telah memiliki peradaban luhur yang mandiri selama ribuan tahun sehingga negara yang merdeka tidak boleh menjiplak mentah-mentah sistem konstitusi negara barat.',
      'Dalam pidato lisannya, Yamin menguraikan lima asas dasar: pertama, Peri Kebangsaan; kedua, Peri Kemanusiaan; ketiga, Peri Ketuhanan; keempat, Peri Kerakyatan; dan kelima, Kesejahteraan Rakyat. Pada penutup sidang, Yamin juga menyerahkan lampiran tertulis berupa rancangan Undang-Undang Dasar yang memuat lima dasar: Ketuhanan Yang Maha Esa, Kebangsaan Persatuan Indonesia, Rasa Kemanusiaan yang Adil dan Beradab, Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan, serta Keadilan sosial bagi seluruh rakyat Indonesia.'
    ],
    bulletPoints: [
      'Peri Kebangsaan: Menjaga kedaulatan bangsa berdasarkan sejarah kesatuan nusantara.',
      'Peri Kemanusiaan: Mengakui martabat kemanusiaan yang beradab dan universal.',
      'Peri Ketuhanan: Landasan moral religius bangsa yang meyakini keberadaan Tuhan.',
      'Peri Kerakyatan: Penjelmaan permusyawaratan, perwakilan, dan kearifan musyawarah.',
      'Kesejahteraan Rakyat: Terwujudnya keadilan sosial bagi seluruh lapisan masyarakat.'
    ]
  },
  {
    id: 9,
    title: '9. Gagasan Prof. Dr. Mr. Soepomo (31 Mei 1945)',
    subtitle: 'Teori Negara Integralistik: Paham Kebersamaan Organis dan Kekeluargaan',
    paragraphs: [
      'Pada tanggal 31 Mei 1945, Prof. Dr. Mr. Soepomo, seorang pakar hukum adat Indonesia terkemuka lulusan Universitas Leiden, menyampaikan pidatonya. Soepomo membandingkan tiga aliran teori kenegaraan dunia: teori individualistis (Thomas Hobbes, John Locke, Rousseau), teori pertarungan kelas (Karl Marx, Engels, Lenin), dan teori integralistik (Spinoza, Adam Müller, Hegel).',
      'Soepomo menegaskan bahwa bagi bangsa Indonesia, aliran yang paling tepat adalah Aliran Integralistik (Paham Negara Kekeluargaan). Menurut teori ini, negara bukan organisasi untuk menjamin kepentingan perorangan belaka, bukan pula alat kelas tertentu untuk menindas kelas lain. Negara adalah kesatuan organis seluruh rakyat yang bersatu padu lahir batin, di mana pemimpin dan rakyat senantiasa bersatu dalam ikatan kekeluargaan dan musyawarah.'
    ],
    bulletPoints: [
      'Persatuan: Seluruh rakyat bersatu tanpa mempertentangkan suku atau golongan.',
      'Kekeluargaan: Hubungan antara warga dan pemimpin dilandasi rasa asih dan gotong royong.',
      'Keseimbangan Lahir dan Batin: Menjaga harmoni antara kebutuhan materi dan nilai spiritual/budi pekerti.',
      'Musyawarah: Pengambilan keputusan kenegaraan didasarkan pada perbincangan keluarga.',
      'Keadilan Rakyat: Keadilan terwujud ketika setiap orang menyatu dengan tertib masyarakat.'
    ]
  },
  {
    id: 10,
    title: '10. Gagasan Ir. Soekarno (1 Juni 1945)',
    subtitle: 'Philosophische Grondslag, Pancasila, Trisila, dan Intisari Ekasila',
    paragraphs: [
      'Pada tanggal 1 Juni 1945, Ir. Soekarno menyampaikan pidato monumental tanpa teks yang berlangsung secara memukau. Soekarno menegaskan bahwa Indonesia merdeka membutuhkan philosophische grondslag (dasar falsafah yang sedalam-dalamnya) dan weltanschauung (pandangan hidup bersama) tempat berdirinya gedung Indonesia merdeka yang kekal dan abadi.',
      'Soekarno mengusulkan lima prinsip yang beliau namakan "Pancasila" (Sila artinya asas atau dasar, dan di atas kelima dasar itulah kita mendirikan negara Indonesia yang kekal dan abadi). Kelima sila tersebut adalah: 1. Kebangsaan Indonesia (Nasionalisme), 2. Internasionalisme atau Peri Kemanusiaan, 3. Mufakat atau Demokrasi, 4. Kesejahteraan Sosial, dan 5. Ketuhanan yang berkebudayaan.',
      'Lebih lanjut, Soekarno menerangkan bahwa jika lima sila itu ingin diperas menjadi tiga, maka jadilah Trisila: Sosio-nasionalisme, Sosio-demokrasi, dan Ketuhanan. Dan jika Trisila itu diperas lagi menjadi satu sila, maka intisarinya adalah "Gotong Royong". Pidato 1 Juni inilah yang kelak diperingati oleh bangsa Indonesia sebagai Hari Lahir Pancasila.'
    ],
    bulletPoints: [
      'Kebangsaan Indonesia: Nasionalisme inklusif yang melintasi sekat primordial suku dan kedaerahan.',
      'Internasionalisme (Peri Kemanusiaan): Kebangsaan yang hidup dalam taman sarinya kemanusiaan dunia, tidak chauvinistik.',
      'Mufakat atau Demokrasi: Kedaulatan rakyat yang dijalankan melalui perwakilan dan perdebatan jujur dalam permusyawaratan.',
      'Kesejahteraan Sosial: Kemerdekaan politik harus membawa keadilan ekonomi tanpa kapitalisme yang menindas.',
      'Ketuhanan yang Berkebudayaan: Setiap pemeluk agama beribadah dengan leluasa dan saling menghormati secara beradab.'
    ]
  },
  {
    id: 11,
    title: '11. Perbandingan Komparatif Gagasan Para Tokoh',
    subtitle: 'Memetakan Titik Tolak, Struktur Pemikiran, dan Corak Gagasan',
    paragraphs: [
      'Secara komparatif, ketiga pendiri bangsa mendekati dasar negara dari sudut pandang yang saling melengkapi. Mohammad Yamin menyoroti kontinuitas historis kebesaran kerajaan-kerajaan nusantara masa lalu dan memformulasikan prinsip-prinsip hukum tata negara yang menjamin hak-hak asasi dan kedaulatan rakyat.',
      'Soepomo lebih menitikberatkan pada sosiologi hukum adat dan harmoni kosmis ketimuran, menekankan perlunya negara kesatuan yang tidak terpecah oleh persaingan partai atau individualisme yang egoistis. Di sisi lain, Soekarno menyajikan sintesis politik yang sangat dinamis, menyatukan kekuatan ideologi besar (kebangsaan, Islam, dan sosialisme) ke dalam satu wadah pemersatu yang berpuncak pada semangat gotong royong.'
    ]
  },
  {
    id: 12,
    title: '12. Persamaan Gagasan Para Pendiri Bangsa',
    subtitle: 'Benang Merah Kesepakatan Luhur Para Negarawan Sejati',
    paragraphs: [
      'Meskipun menggunakan istilah, urutan, dan pendekatan bahasa yang berbeda, terdapat benang merah kesepakatan substansial di antara ketiga tokoh tersebut:',
      'Pertama, ketiganya sepakat bahwa negara Indonesia yang merdeka harus berlandaskan pada prinsip Persatuan dan Kebangsaan yang kokoh, bukan negara federalistis yang terpecah-pecah. Kedua, ketiganya sepakat bahwa Ketuhanan dan nilai-nilai religiusitas merupakan fondasi moral yang mutlak bagi kehidupan bangsa. Ketiga, ketiganya menolak eksploitasi manusia atas manusia dan menuntut adanya Keadilan dan Kesejahteraan Sosial bagi seluruh rakyat. Keempat, ketiganya menjunjung tinggi musyawarah dan kedaulatan rakyat sebagai cara hidup bermasyarakat.'
    ],
    keyHighlight: 'Persamaan gagasan para pendiri bangsa membuktikan bahwa ada kesadaran kolektif yang matang mengenai karakter sejati kepribadian bangsa Indonesia.'
  },
  {
    id: 13,
    title: '13. Perbedaan Gagasan dan Dialektika Pemikiran',
    subtitle: 'Perdebatan Hubungan Agama dan Negara serta Konsepsi Kedaulatan',
    paragraphs: [
      'Di samping persamaan, terdapat dialektika perbedaan konseptual yang sangat penting. Perbedaan paling tajam berkisar pada relasi antara agama (khususnya Islam sebagai agama mayoritas) dengan institusi negara. Golongan Islam mengusulkan agar Indonesia didirikan sebagai negara yang berlandaskan syariat Islam, sementara golongan kebangsaan menginginkan negara nasional sekuler yang netral terhadap agama namun tetap melindungi kebebasan beribadah seluruh pemeluknya.',
      'Perbedaan lain terlihat pada gagasan integralistik Soepomo yang tidak terlalu menghendaki pencantuman jaminan hak-hak asasi individu secara eksplisit karena khawatir memicu individualisme, sementara Mohammad Yamin dan Mohammad Hatta bersikukuh bahwa jaminan kemerdekaan berserikat, berkumpul, dan berpendapat wajib dicantumkan dalam konstitusi untuk mencegah lahirnya negara otoriter.'
    ]
  },
  {
    id: 14,
    title: '14. Dinamika Diskusi dan Semangat Mufakat dalam Sidang',
    subtitle: 'Teladan Kematangan Demokrasi: Berdebat Keras Tanpa Menyimpan Dendam',
    paragraphs: [
      'Sidang BPUPK merupakan potret paling mempesona dari kedewasaan berdemokrasi. Perdebatan antar-anggota berlangsung dengan argumentasi yang sangat berbobot, bernas, dan kadang memanas karena menyangkut keyakinan iman dan visi masa depan bangsa.',
      'Namun yang luar biasa, tidak ada satu pun tokoh yang memaksakan kehendak dengan ancaman boikot, kekerasan, atau pemaksaan kehendak. Ketika sidang pertama berakhir pada 1 Juni 1945 tanpa kesepakatan final mengenai teks hukum dasar, para tokoh membentuk Panitia Kecil (Panitia Delapan) yang kemudian disempurnakan menjadi Panitia Sembilan. Melalui Panitia Sembilan inilah kompromi agung (gentlemen’s agreement) dicapai pada 22 Juni 1945 dalam wujud Piagam Jakarta.'
    ]
  },
  {
    id: 15,
    title: '15. Nilai-Nilai Keteladanan Para Pendiri Bangsa',
    subtitle: 'Integritas, Pengorbanan, Kebijaksanaan, dan Cinta Tanah Air Tanpa Batas',
    paragraphs: [
      'Generasi muda saat ini dapat memetik pelajaran berharga dari nilai keteladanan para pendiri bangsa: pertama, Mengutamakan Kepentingan Bangsa di atas kepentingan pribadi atau golongan; para tokoh rela menurunkan ego kelompoknya demi keselamatan republik.',
      'Kedua, Kebiasaan Berliterasi dan Berpikir Mendalam; para pendiri bangsa membaca buku-buku filsafat dunia, menguasai berbagai bahasa asing, serta memahami kebudayaan lokal secara mendalam. Ketiga, Jiwa Kesatria dan Menghormati Lawan Debat; mereka saling mengkritik secara tajam di forum resmi, namun tetap bersahabat karib dalam pergaulan sehari-hari.'
    ]
  },
  {
    id: 16,
    title: '16. Relevansi Gagasan dalam Kehidupan Abad ke-21',
    subtitle: 'Menjawab Tantangan Globalisasi, Polarisasi Sosial, dan Disrupsi Digital',
    paragraphs: [
      'Gagasan dasar negara yang dirumuskan pada tahun 1945 bukan artefak sejarah masa lalu yang usang, melainkan kompas penuntun yang sangat relevan menghadapi dinamika abad ke-21. Di tengah ancaman polarisasi akibat media sosial, fanatisme sempit, dan disinformasi digital, nilai musyawarah mufakat mengajarkan kita untuk mengedepankan tabayyun (verifikasi), mendengarkan sudut pandang berbeda, dan menolak ujaran kebencian.',
      'Prinsip kesejahteraan sosial mengingatkan negara dan masyarakat agar kemajuan teknologi informasi tidak memperlebar jurang ketimpangan ekonomi, melainkan dimanfaatkan untuk mencerdaskan kehidupan seluruh anak bangsa tanpa diskriminasi.'
    ]
  },
  {
    id: 17,
    title: '17. Hubungan Gagasan Para Pendiri Bangsa dengan Pancasila',
    subtitle: 'Dari Sidang BPUPK Menuju Penetapan Konstitusional 18 Agustus 1945',
    paragraphs: [
      'Pancasila yang kita kenal dan junjung tinggi hari ini adalah hasil akhir dari proses dialektika kebangsaan yang panjang dan matang. Gagasan Mohammad Yamin (29 Mei), Prof. Soepomo (31 Mei), dan pidato Ir. Soekarno (1 Juni) digodok bersama dalam Panitia Sembilan menghasilkan Piagam Jakarta (22 Juni 1945).',
      'Pada tanggal 18 Agustus 1945, sehari setelah proklamasi kemerdekaan, Panitia Persiapan Kemerdekaan Indonesia (PPKI) dengan kebesaran hati para tokoh Islam mengubah tujuh kata dalam sila pertama Piagam Jakarta menjadi: "Ketuhanan Yang Maha Esa". Dengan demikian, disahkanlah Pancasila dalam Pembukaan UUD 1945 sebagai dasar falsafah resmi Negara Kesatuan Republik Indonesia yang abadi.'
    ],
    keyHighlight: 'Pancasila lahir bukan atas kehendak satu individu semata, melainkan sintesis agung dari dialog jujur, ketulusan budi, dan kehendak bersatu seluruh elemen bangsa.'
  }
];
