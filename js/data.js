/**
 * data.js
 * ───────
 * Artwork data and Cloudinary URL helpers.
 *
 * To use your real images:
 *   1. Set CLOUD_NAME to your Cloudinary cloud name.
 *   2. Replace pid values with your actual Cloudinary public IDs.
 *   3. For Music artworks, replace the audio URL strings.
 */

'use strict';

// ── Cloudinary Config ─────────────────────────────
const CLOUD_NAME = 'dbbjz0mjx';
const _BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Generate Cloudinary image URLs at different sizes.
 * Cloudinary transforms the image on-the-fly — no manual resizing needed.
 */
function thumbUrl(pid) {
  // 300×450 portrait crop — Home screen thumbnail row
  return `${_BASE}/w_300,h_450,c_fill,q_auto,f_auto/${pid}`;
}
function cardUrl(pid) {
  // 600×900 portrait crop — Gallery 2-column grid card
  return `${_BASE}/w_600,h_900,c_fill,q_auto,f_auto/${pid}`;
}
function fullUrl(pid) {
  // 1200px wide — Image Detail full view
  return `${_BASE}/w_800,q_auto,f_auto/${pid}`;
}

// ── Artwork Data ──────────────────────────────────
/**
 * ARTWORKS[category] = array of artwork objects.
 *
 * Each artwork has:
 *   id    {number}  — index within its category
 *   title {string}  — display title
 *   desc  {string}  — long description for the detail page
 *   pid   {string}  — Cloudinary public ID  (folder/filename)
 *   audio {string}  — (Music only) audio URL (mp3 / m4a / ogg)
 */
const ARTWORKS = {
  'Seni Tradisional': [
    {
      id: 0,
      title: 'Potret Diri 1',
      desc: 'Sketsa narsis menggunakan pensil pada medium kertas coklat. Sketsa dari wajah lelah diri sendiri.',
      pid: 'Tradi1-Self1_yi5jne',
    },
    {
      id: 1,
      title: 'Potret Diri 2',
      desc: 'Sketsa narsis menggunakan pensil pada medium kertas putih ukuran B5. Sketsa wajah sendiri dengan modifikasi di bagian jenggot. Eksplorasi penambahan elemen pada objek.',
      pid: 'Tradi2-Self2_cqtfij',
    },
    {
      id: 2,
      title: 'Potret Diri 3',
      desc: 'Sketsa narsis menggunakan pensil pada medium kertas putih ukuran A5. Sketsa wajah dan profil sendiri dengan penyesuaian pakaian dari beberapa referensi',
      pid: 'Tradi3-Self3_cuochx',
    },
    {
      id: 3,
      title: 'Potret Diri 4',
      desc: 'Sketsa narsis menggunakan pensil pada medium kertas putih ukuran A5. Sketsa diri menjadi karakter musisi bermain gitar.',
      pid: 'Tradi4-Self4_tt0mao',
    },
  ],

  'Seni Digital': [
    {
      id: 0,
      title: 'In Suit',
      desc: 'Potret digital dengan teknik rendering realistis menggunakan Procreate. Ini adalah lukisan narsis pertama saya buat secara digital.',
      pid: 'Paint_3_Self_1_kzxmir',
    },
    {
      id: 1,
      title: 'Bermain Gitar',
      desc: 'Potret digital dengan teknik rendering realistis menggunakan Procreate. Lukisan narsis dibuat karena tidak pernah punya kesempatan untuk bermain gitar lagi. Berandai-andai jika bisa bermain gitar kembali.',
      pid: 'Paint_4_Self_2_w07ypd',
    },
    {
      id: 2,
      title: 'Atar Samurai',
      desc: 'Potret digital dengan teknik rendering realistis menggunakan Procreate. Lukisan narsis dengan eksperimen penggabungan wajah dan kepala dengan tubuh milik orang lain dan tambahan.',
      pid: 'Paint_5_Self_3_nbuf40',
    },
    {
      id: 3,
      title: 'Looks Like A Slave',
      desc: 'Potret digital dengan teknik rendering realistis menggunakan Procreate. Lukisan narsis terakhir dibuat di Procreate (iPadnya dijual krn BU), hasilnya terlihat seperti african american slave. Penggambaran tidak langsung dari realita sebagai budak banyak orang.',
      pid: 'Paint_6_Self_4_qy1jtb',
    },
  ],

  'Fotografi': [
    {
      id: 0,
      title: 'Tak Ada Kemenangan di Hari Kemenanganku',
      desc: 'Beberapa hari sebelum Idul Fitri tiba, seorang ibu setiap hari duduk di tempat yang sama terlihat lelah, masih mengharapkan sedikit pemberian dari orang lain untuk menyisihkan sedikit miliknya untuk sang ibu. Tidak ada yang berbeda dari harinya saat itu, tidak ada kemenangan untuknya di Hari Kemenangan.',
      pid: 'fotografi1_hbgidm',
    },
    {
      id: 1,
      title: 'Fantasy Land',
      desc: 'Pengalaman pertama memotret model di kesempatan para penggemar fotografi berkumpul. Seorang model sedang duduk di komedi putar melihat ke arah fotografer lain mengambil fotonya dengan kamera proper mereka. Mencoba untuk tidak bersaing mengambil perhatian sang model dengan kamera poket saya, di sudut itu dimana saya melihat komposisi yang indah untuk diabadikan, seorang wanita di Fantasy Land.',
      pid: 'fotografi2_tgddzb',
    },
    {
      id: 2,
      title: 'Which Side Do You Want',
      desc: 'Seperti biasa di hari-hari dimana sedang berkendara di kota Bandung dengan motor tanpa tujuan tanpa kawan, saya sampai di sebuah jalan kecil yang menyita perhatian. Sebuah bangunan kumuh dengan pemandangan bangunan apartemen tinggi di belakangnya dan membuat bertanya "Sisi mana yang aku inginkan?"',
      pid: 'fotografi3_sf0lpu',
    },
    {
      id: 3,
      title: 'After The Sunset',
      desc: 'Sedang di perjalanan naik motor dibonceng kawan ke arah melewati alun-alun kota Bandung, bias cahaya matahari senja yang indah tersaring oleh awan menyinari jalan dengan latar belakang bangunan tua tidak dapat dilewatkan untuk diabadikan.',
      pid: 'fotografi4_ygz9ga',
    },
    {
      id: 4,
      title: 'Mengintip Senja',
      desc: 'Sore hari itu langit senja di kota Bandung benar-benar berwarna jingga. Menggunakan kamera poket digital, pemandangan ini diambil dari teras rumah masa kecil penuh dengan kenangan.',
      pid: 'fotografi5_cj0k5v',
    },
    {
      id: 5,
      title: 'Climb To Victory',
      desc: 'Melintasi jalan Peta Bandung di siang hari, di suasana hari kemerdekaan, sekelompok masyarakat sedang merayakannya dengan lomba panjat pinang. Saat itu langit dan cahaya matahari berpartisipasi untuk menambahkan efek dramatis dari perjuangan anak-anak mencapai puncak.',
      pid: 'fotografi6_bsbna8',
    },
    {
      id: 6,
      title:'Euforia',
      desc: 'Para mahasiswa baru merayakan keberhasilan mereka mencapai kebersamaan semu pada waktu masa orientasi. Ketua angkatan dielu-elukan sebagai simbol apa yang mereka anggap sebagai pencapaian.',
      pid: 'fotografi7_ryhg9a',
    },
    {
      id: 7,
      title:'Berlari Di Kala Hujan',
      desc: 'Kabut tebal dan hujan turun di area perkemahan secara tiba-tiba membuat semua orang berlari ke dalam tenda, Seorang kawan membuka baju dan berlari ke arah tenda sebelum dia basah terkena guyuran air hujan.',
      pid: 'fotografi8_esb274',
    },
    {
      id: 8,
      title:'Bermain Bass',
      desc: 'Salah satu penampil di acara festival jazz yang dibuat bersama dengan kawan-kawan kampus. Pemain bass dari salah satu band bermain sembari duduk ditemani sorotan cahaya lampu berwarna.',
      pid: 'fotografi9_sulj3k',
    },
    {
      id: 9,
      title:'Sing From Heart',
      desc: 'Di teras belakang Kineruku, band Efek Rumah Kaca tampil membawakan lagu-lagu mereka. Para penonton duduk di taman depan teras belakang menikmati penampilan mereka, terutama sang vokalis yang terlihat bernyanyi dari hati.',
      pid: 'fotografi10_kvzo14',
    },
    {
      id: 10,
      title:'Mengaum',
      desc: 'Salah satu beruang di dalam kebun binatang Ragunan, mengaum dari dalam kandangnya. Memberikan kesan iba kepada sang binatang buas yang seharusnya bebas hidup di alam liar dan bukan terkungkung di balik jeruji dan dinding tebal.',
      pid: 'fotografi11_jxeout',
    },
    {
      id: 11,
      title:'Kucing Garong',
      desc: 'Di lorong sempit belakang rumah, seekor kucing duduk terdiam mencari dan menunggu mangsanya muncul untuk diterkam. Sayangnya hewan pemalas ini lebih memilih belas kasihan dari manusia untuk diberikan makanan.',
      pid: 'fotografi12_wtl7fo',
    },
    {
      id: 12,
      title:'Burung Hantu di Tangga',
      desc: 'Di momen menaiki tangga menuju Henderson Bridge, Singapura, seekor burung hantu berwarna coklat hinggap di salah satu anak tangga. Mencoba tidur dan beristirahat di siang hari yang terik.',
      pid: 'fotografi13_gupcjo',
    },
    {
      id: 13,
      title:'Caring Bird',
      desc: 'Dua ekor burung saling menyayangi di dalam sangkar burung yang besar. Menikmati momen bersama berdua, rasa sayang penuh untuk satu sama lain meskipun terkurung di dalam sangkar.',
      pid: 'fotografi14_qxytge',
    },
    {
      id: 14,
      title:'Di Balik Jeruji',
      desc: 'Seekor burung kakatua terjebak di dalam kandang, wajahnya ditempelkan ke jeruji besi, sorot matanya menatap tajam ke depan. Seolah-olah ia ingin sekali keluar dari kandang yang mengikat kebebasannya untuk terbang.',
      pid: 'fotografi15_flrqv7',
    },
    {
      id: 15,
      title:'Esplanade',
      desc: 'Di persimpangan salah satu jalan di Singapura yang kebetulan sedang kosong tanpa kendaraan dengan latar belakang bangunan Esplanade terlihat jelas. Sebuah momen langka yang harus diabadikan.',
      pid: 'fotografi16_sqi9mh',
    },
    {
      id: 16,
      title:'Red & White',
      desc: 'Lokasi ini entah ada di titik mana dari Sentosa Island, Singapura. Komposisi warna yang menarik perhatian antara warna merah, putih dan batu alam tersusun dengan proporsi yang seimbang.',
      pid: 'fotografi17_cmykcr',
    },
    {
      id: 17,
      title:'Smoke',
      desc: 'Kumpulan bungkus-bungkus rokok. Asbak dari kemasan bekas. Korek mini market. Saksi bisu perjalanan awal menjadi seorang perokok setelah bertahun-tahun membenci perokok. Awal mula semua berjalan dengan tidak semestinya. c.2010',
      pid: 'fotografi18_euyf7m',
    },
    {
      id: 18,
      title:'Potret Diri',
      desc: 'Potret diri sendiri bersama gitar di depan jendela rumah dengan sedikit bias cahaya pagi. Terkesan seperti pose alay pada masanya, foto ini berusaha menangkap momen untuk mengingatkan saat masih memiliki kesempatan bermain gitar.',
      pid: 'fotografi19_f4uifa',
    },
    {
      id: 19,
      title:'Model Sendiri',
      desc: 'Eksperimen fotografi model. Karena tidak ada model betulan, akhirnya diri sendiri dijadikan model dengan pengambilan foto menggunakan pengatur waktu kamera.',
      pid: 'fotografi20_x8g3ai',
    },
    {
      id: 20,
      title:'Berdoa',
      desc: 'Mencoba fotografi artistik akibat dari melihat bias cahaya pagi yang masuk melewati jendela. Diri sendiri dijadikan sebagai objek foto karena tidak ada orang lain. Meskipun hasilnya terkesan pose alay, tapi saya suka foto ini...hehehe...',
      pid: 'fotografi21_nkm2if',
    },
    {
      id: 21,
      title:'Mirror Selfie',
      desc: 'Pertama kalinya bisa membeli kamera DSLR meskipun bekas. Seperti yang dilakukan beberapa fotografer terkenal melakukan foto sendiri di cermin, saya juga tidak mau ketinggalan supaya bisa merasa sudah menjadi fotografer.',
      pid: 'fotografi22_b9y0cg',
    },
  ],

  'Musik': [
    {
      id: 0,
      title: 'Jalan Pulang',
      desc: 'Musik ini tercipta dari gabungan dua permainan gitar yang direkam secara terpisah. Hanya berisi suara rhytm dan melodi dimana proses kreasi belum rampung. Musik ini adalah salah satu data digital yang tersisa dari beberapa lagu tercipta yang terekam. Karena musik ini satu-satunya yang tersisa, maka diberi judul "Jalan Pulang", terakhir kali saya meciptakan musik dan terasa seperti ingin pulang ke suatu tempat.',
      pid: 'jalan_pulang_hgsu4j',
      audio: 'https://res.cloudinary.com/dbbjz0mjx/video/upload/v1775367552/Jalan_Pulang_qxyg4h.mp3',
    },
  ],

  'Arsitektur': [
    {
      id: 0,
      title: 'Spazio Tower',
      desc: 'Bangunan mixed use di Surabaya dengan proses desain dikerjakan tanpa tim. Ini adalah konsep desain awal bangunan sebelum diubah dan menjadi seperti apa yang sudah terbangun.',
      pid: 'spazio_pzv406',
    },
    {
      id: 1,
      title: 'Setiabudi Mixed Use',
      desc: 'Konsep bangunan mixed use di Semarang dengan proses desain dikerjakan tanpa tim dalam waktu satu minggu. Sebuat proses berkreasi yang sungguh saya benci.',
      pid: 'setiabudi-1_an1sxs',
    },
    {
      id: 2,
      title: 'Surabaya Time Square',
      desc: 'Modifikasi desain bangunan mixed use di Surabaya yang desain orisinalnya dibuat oleh tim perencana arsitektur dari negara lain. Penyesuaian denah, tinggi bangunan dan tampak. ',
      pid: 'sts-1_zwpbzz',
    },
    {
      id: 3,
      title: 'Batu Art Gallery',
      desc: 'Satu-satunya konsep desain bangunan yang saya cukup menikmati proses desainnya. Meskipun hanya menjadi konsep, hasilnya cukup memberikan rasa puas.',
      pid: 'art-gallery-1_rpsjj6',
    },
    {
      id: 4,
      title: 'Patra Residence',
      desc: 'Desain master plan blok apartemen dan konsep desain bangunan apartemen di kawasan Patra Kuningan, Jakarta. ',
      pid: 'ptr-4_hv7e8u',
    },
    {
      id: 5,
      title: 'Siloam Hospital Manado',
      desc: 'Perencanaan mengubah department store menjadi rumah sakit. Penambahan elemen pada facade menjadi perubahan signifikan pada bangunan.',
      pid: 'shm-0_pvg2xb',
    },
    {
      id: 6,
      title: 'Kramat Jati Indah Refurbishment',
      desc: 'Desain renovasi pusat perbelanjaan di Kramat Jati, Jakarta. Proses desain yang sangat membagongkan karena ini benar-benar proyek yang saya kerjakan sendiri tanpa tim, mulai dari konsep, desain, sampai gambar kerja dan inspeksi lapangan.',
      pid: 'kji-1_kcoydw',
    },
    {
      id: 7,
      title: 'Signage',
      desc: 'Desain signage untuk sebuah pusat perbelanjaan di Kuta, Bali. Proses desain yang cukup menyenangkan dan tidak terlalu rumit karena hanya desain elemen signage saja tanpa harus memikirkan keseluruhan bangunan. Hasilnya cukup memuaskan karena bisa memberikan kesan yang kuat untuk sebuah elemen kecil di dalam bangunan.',
      pid: 'signage-0_slzrto',
    },
    {
      id: 8,
      title: 'Rumah Bandung',
      desc: 'Desain rumah pribadi di Bandung. Rumah nyaman kalau untuk tinggal sendiri atau keluarga penuh kasih Kristus dan bukan tunduk pada adat istiadat.',
      pid: 'ph-1_sd5l8b',
    },
  ],
};

const CATEGORIES     = Object.keys(ARTWORKS);
const HOME_CATEGORIES = CATEGORIES;

/**
 * Look up a single artwork by category name and numeric id.
 * Returns null if not found.
 */
function getArtwork(cat, id) {
  const list = ARTWORKS[cat];
  if (!list) return null;
  return list.find(a => a.id === Number(id)) || null;
}
