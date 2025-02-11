import Dexie, { Table } from "dexie";

export interface DEX_Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  threadId: string;
  created_at: Date;
  thought: string;
}

export interface DEX_Thread {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface DEX_StatementData {
  id: string;
  keyword: string;
  description: string;
}

class ChatDB extends Dexie {
  messages!: Table<DEX_Message, string>;
  threads!: Table<DEX_Thread, string>;
  statementData!: Table<DEX_StatementData, string>;

  constructor() {
    super("chatdb");

    this.version(2).stores({
      messages: "id, role, content, threadId, created_at",
      threads: "id, title, created_at, updated_at",
      statementData: "id, keyword, description",
    });

    this.threads.hook("creating", (_key, obj) => {
      obj.created_at = new Date();
      obj.updated_at = new Date();
    });

    this.messages.hook("creating", (_key, obj) => {
      obj.created_at = new Date();
    });
    this.seedDatabase();
  }

  async seedDatabase() {
    await this.statementData.bulkPut([
      {
        id: crypto.randomUUID(),
        keyword: "Company Profile StarInc",
        description: 'Brand lokal Indonesia bidang kecantikan sesuai K-Beauty terkini.',
      },
      {
        id: crypto.randomUUID(),
        keyword: "Pendiri/Founder StarInc",
        description: 'Jean Michelle.',
      },
      {
        id: crypto.randomUUID(),
        keyword: "Contact Person StarInc",
        description: 'Budi Santoso (Customer Relations Manager), email: budi.santoso@StarInc.com, telepon: +62 812-3456-7890',
      },
      {
        id: crypto.randomUUID(),
        keyword: "Director StarInc",
        description: 'Ibu Siti Kartika',
      },

      {
        id: crypto.randomUUID(),
        keyword: "Jam Kerja/Operasional StarInc",
        description: 'Senin - Jumat : 08:00 - 18:00 WIB, Sabtu: 09:00 - 15:00 WIB, Minggu & Hari Libur Nasional: Tutup',
      },
      {
        id: crypto.randomUUID(),
        keyword: "Lokasi StarInc",
        description: "Jalan Teknologi No. 10, Jakarta, Indonesia. Google Maps: https://goo.gl/maps/example",
      },
      {
        id: crypto.randomUUID(),
        keyword: "Customer Support StarInc",
        description: [
          "Dukungan pelanggan tersedia melalui:",
          "- Email: support@StarInc.com",
          "- WhatsApp: +62 812-9876-5432",
          "- Live Chat: Kunjungi website kami di www.StarInc.com",
        ],
      },
      {
        id: crypto.randomUUID(),
        keyword: "Misi StarInc",
        description: [
          "Kecantikan tidak hanya terpancar dari luar, namun juga dari dalam.",
          "Dengan konsep “Holistic Healthy Beauty” StarInc menghadirkan produk-produk yang menyehatkan secara menyeluruh.",
          "Kami percaya, kecantikan sejati dapat terpancar dengan merawat tubuh dari luar dan dalam.",
          "StarInc berkomitmen memberikan produk-produk berkualitas dan mempercayakan formulasi produk di Korea Selatan.",
          "Kami yakin, produk-produk dari StarInc dapat menjadi alternatif terbaik di Indonesia.",
        ],
      },
      {
        id: crypto.randomUUID(),
        keyword: "Visi StarInc",
        description: [
          "Siap Memancarkan Pesona Cantikmu pada Dunia.",
          "Because We Believe, There’s a Star In You",
        ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, Dream Kissed",
      //   description: [
      //     "Harga: Rp. 185,000,",
      //     "Ukuran: 240 gram",
      //     "BPOM: NA18220110136",
      //     "Fungsi:",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi jerawat, penuaan, hiperpigmentasi dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingridient:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "5 % Niacinamide",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, Dream Kissed",
      //   description: [
      //     "Harga: Rp. 185,000,",
      //     "Ukuran: 240 gram",
      //     "BPOM: NA18220110136",
      //     "Fungsi:",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi jerawat, penuaan, hiperpigmentasi dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingridient:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "5 % Niacinamide",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, SNOW KISSED SEDUCE",
      //   description: [
      //     "Harga: Rp. 165,000,",
      //     "Body serum untuk mendapatkan “Snow White Skin” dengan aroma Seduce (King William Pear, Freesia, Patchouli) yang menggoda.",
      //     "Ukuran            : 230 gram",
      //     "BPOM              : NA18220110135",
      //     "Manfaat                      :",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi acne, penuaan, hiperpigmentasi dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingridient:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "3% Niacinamide",
      //     "Titanium Dioxide (Anti UV A & UV B)",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, SNOW KISSED BREEZE",
      //   description: [
      //     "Harga: Rp. 165,000,",
      //     "Body serum untuk mendapatkan “Snow White Skin” dengan aroma Breeze (Tangarine, Rose, Cedarwood, Peach, Vanilla) yang menggoda.",
      //     "Notes Breeze",
      //     "Mengandung Aroma yang Oriental, Fruity, Floral dan Musky. Karakter aroma ini dibentuk dengan Triangle pyramid:",
      //     "Top Note         : Tangarine, Rose, Sambac Jasmine, Coffee",
      //     "Middle Notes  : Praline, Cedarwood, Peach, Tonka Beans",
      //     "Bottom Notes  : Vanilla, Musk, Sandalwood, Patchouli",
      //     "Ukuran            : 230 gram",
      //     "BPOM             : NA18220112484",
      //     "Manfaat",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi acne, penuaan, hiperpigmentasi dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingridient:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "Niacinamide",
      //     "Titanium Dioxide",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, CONFIDENCE BURST",
      //   description: [
      //     "Harga: Rp. 135,000,",
      //     "Deodorant spray yang menghilangkan bau badan sampai 72 jam dan mencerahkan lipatan kulit.",
      //     "#BoostYourConfidence #STARInYou",
      //     "Harga              : Rp. 135.000",
      //     "Ukuran            : 60ml",
      //     "BPOM             : NA18220900367",
      //     "Manfaat:",
      //     "Menghilangkan bau badan sampai 72 Jam",
      //     "Menyamarkan kerutan",
      //     "Mencerahkan warna kulit",
      //     "Mudah digunakan karena berbentuk spray",
      //     "Tidak lengket dan mudah menyerap",
      //     "Tidak meninggalkan noda",
      //     "Dapat digunakan di setiap lipatan tubuh",
      //     "Aroma segar dan wangi",
      //     "Cara Pemakaian: Semprotkan di bagian lipatan kulit (ketiak, siku, lutut) yang sudah bersih dan kering secara rutin untuk hasil maksimal.",
      //     "Deodorizer Serum Spray",
      //     "Ingridient:",
      //     "Allantoin",
      //     "Aloe Vera",
      //     "Glutathione",
      //     "Castor Oil",
      //     "Niacinamide",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, C-STAR SERUM STICK",
      //   description: [
      //     "Harga: Rp. 285,000,",
      //     "Serum Stick pertama di Indonesia dengan 26% Vitamin C yang mencerahkan dan menghilangkan kerutan di wajah.",
      //     "Cocok juga sebagai primer agar make up lebih menawan.",
      //     "#VitCOnTheGo #STARInYou",
      //     "Harga: Rp. 285.000",
      //     "Ukuran: 11 gram",
      //     "BPOM: NA18231900060",
      //     "Manfaat:",
      //     "Mencerahkan kulit",
      //     "Menjadi primer agar make-up lebih tahan lama",
      //     "Menghilangkan dark spot & dark circle",
      //     "Anti-inflamasi",
      //     "Anti-bakteri",
      //     "Anti-aging",
      //     "Mengontrol minyak berlebih",
      //     "Meredakan jerawat",
      //     "Menghaluskan kulit",
      //     "Cara pemakaian: Oleskan dengan lembut pada area wajah (dahi, pipi, rahang, bawah mata) dan leher untuk mengencangkan & menutrisi.",
      //     "Dapat digunakan sebagai primer agar make up lebih tahan lama & menghasilkan dewy-look yang menawan.",
      //     "Serum Stick",
      //     "Ingridient:",
      //     "26% Vitamin C",
      //     "Kakadu Plum Extract",
      //     "Vitamin Tree Oil",
      //     "Licorice",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, COLLASTAR MIXED FRUIT - 5 Sachets",
      //   description: [
      //     "Harga: Rp. 118,000,",
      //     "Minuman kolagen bernutrisi dengan rasa mix fruit yang berkhasiat untuk mencegah penuaan, meningkatkan massa otot, meredakan nyeri sendi, mengurangi selulit dan menunjang kesehatan jantung.",
      //     "Ukuran: 75 gram (@15 gram)",
      //     "BPOM: 071282005500006",
      //     "Manfaat:",
      //     "Memperkuat sistem imun tubuh",
      //     "Mengencangkan kulit dan mencegah penuaan",
      //     "Meningkatkan massa otot",
      //     "Kaya antioksidan yang menangkal radikal bebas",
      //     "Meredakan nyeri sendi",
      //     "Mengurangi selulit",
      //     "Menunjang kesehatan jantung",
      //     "Mengoptimalkan penyerapan gizi",
      //     "Merangsang pembentukan kolagen & elastin kulit",
      //     "Collagen Infusion",
      //     "Ingridient:",
      //     "Tripeptide Collagen",
      //     "Premix Vitamin",
      //     "Premium L-Glutathione",
      //     "Extract Salmon",
      //     "Extract Saffron",
      //     "Sarang Burung Walet",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, COLLASTAR MIXED FRUIT - 15 Sachets",
      //   description: [
      //     "Harga: Rp. 328,000,",
      //     "Minuman kolagen bernutrisi dengan rasa mix fruit yang berkhasiat untuk mencegah penuaan, meningkatkan massa otot, meredakan nyeri sendi, mengurangi selulit dan menunjang kesehatan jantung.",
      //     "Ukuran: 225 gram (@15 gram)",
      //     "BPOM: 071282005500006",
      //     "Manfaat:",
      //     "Memperkuat sistem imun tubuh",
      //     "Mengencangkan kulit dan mencegah penuaan",
      //     "Meningkatkan massa otot",
      //     "Kaya antioksidan yang menangkal radikal bebas",
      //     "Meredakan nyeri sendi",
      //     "Mengurangi selulit",
      //     "Menunjang kesehatan jantung",
      //     "Mengoptimalkan penyerapan gizi",
      //     "Merangsang pembentukan kolagen & elastin kulit",
      //     "Cara penyajian: Tuangkan 150 ml air ke dalam 1 sachet Collastar",
      //     "Collagen Infusion",
      //     "Ingridient:",
      //     "Tripeptide Collagen",
      //     "Premix Vitamin",
      //     "Premium L-Glutathione",
      //     "Extract Salmon",
      //     "Extract Saffron",
      //     "Sarang Burung Walet",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, COLLASTAR HONEY - 5 Sachets",
      //   description: [
      //     "Harga: Rp. 118,000,",
      //     "Minuman kolagen bernutrisi dengan rasa honey yang berkhasiat untuk mencegah penuaan, meningkatkan massa otot, meredakan nyeri sendi, mengurangi selulit dan menunjang kesehatan jantung.",
      //     "Ukuran: 75 gram (@15 gram)",
      //     "BPOM: 071282005400006",
      //     "Manfaat:",
      //     "Memperkuat sistem imun tubuh",
      //     "Mengencangkan kulit dan mencegah penuaan",
      //     "Meningkatkan massa otot",
      //     "Kaya antioksidan yang menangkal radikal bebas",
      //     "Meredakan nyeri sendi",
      //     "Mengurangi selulit",
      //     "Menunjang kesehatan jantung",
      //     "Mengoptimalkan penyerapan gizi",
      //     "Merangsang pembentukan kolagen & elastin kulit",
      //     "Collagen Infusion",
      //     "Ingridient:",
      //     "Tripeptide Collagen",
      //     "Premix Vitamin",
      //     "Premium L-Glutathione",
      //     "Extract Salmon",
      //     "Extract Saffron",
      //     "Sarang Burung Walet",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, COLLASTAR HONEY - 15 Sachets",
      //   description: [
      //     "Harga: Rp. 328,000,",
      //     "Minuman kolagen bernutrisi dengan rasa honey yang berkhasiat untuk mencegah penuaan, meningkatkan massa otot, meredakan nyeri sendi, mengurangi selulit dan menunjang kesehatan jantung.",
      //     "#Refresh&Revitalize #STARInYou",
      //     "Harga: Rp. 328.000",
      //     "Ukuran: 225 gram (@15 gram)",
      //     "BPOM: 071282005400006",
      //     "Manfaat:",
      //     "Memperkuat sistem imun tubuh",
      //     "Mengencangkan kulit dan mencegah penuaan",
      //     "Meningkatkan massa otot",
      //     "Kaya antioksidan yang menangkal radikal bebas",
      //     "Meredakan nyeri sendi",
      //     "Mengurangi selulit",
      //     "Menunjang kesehatan jantung",
      //     "Mengoptimalkan penyerapan gizi",
      //     "Merangsang pembentukan kolagen & elastin kulit",
      //     "Cara penyajian: Tuangkan 150 ml air ke dalam 1 sachet Collastar",
      //     "Collagen Infusion",
      //     "Ingridient:",
      //     "Tripeptide Collagen",
      //     "Premix Vitamin",
      //     "Premium L-Glutathione",
      //     "Extract Salmon",
      //     "Extract Saffron",
      //     "Sarang Burung Walet",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, IN FUN SIZE DREAM KISSED",
      //   description: [
      //     "Harga: Rp. 65,000,",
      //     "Produk pertama STARINC yakni body cream 'Ultimate Skin Nutrition' yang mampu melembapkan dan menutrisi kulit secara optimal.",
      //     "Ukuran: 50 gram",
      //     "BPOM: NA18220110136",
      //     "Manfaat:",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi jerawat, penuaan, hiperpigmentasi dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingridient:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "5% Niacinamide",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, IN FUN SIZE SNOW KISSED SEDUCE",
      //   description: [
      //     "Harga: Rp. 55,000,",
      //     "Body serum untuk mendapatkan 'Snow White Skin' dengan aroma Seduce (King William Pear, Freesia, Patchouli) yang menggoda.",
      //     "Ukuran: 50 gram",
      //     "BPOM: NA18220110135",
      //     "Manfaat:",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi acne, penuaan, hiperpigmentasi dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingridient:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "3% Niacinamide",
      //     "Titanium Dioxide (Anti UV A & UV B)",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, IN FUN SIZE SNOW KISSED BREEZE",
      //   description: [
      //     "Harga: Rp. 55,000,",
      //     "Body serum untuk mendapatkan 'Snow White Skin' dengan aroma Breeze (Tangarine, Rose, Cedarwood, Peach, Vanilla) yang menggoda.",
      //     "Ukuran: 50 gram",
      //     "BPOM: NA18220112484",
      //     "Manfaat:",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi acne, penuaan, hiperpigmentasi dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingridient:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "Niacinamide",
      //     "Titanium Dioxide",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, KICKFATT - 5 sachets",
      //   description: [
      //     "Harga: Rp. 125,000,",
      //     "Minuman kaya serat pangan, zero sugar & mengandung 70% Vitamin C yang mampu detoksifikasi tubuh & membakar lemak jahat.",
      //     "Ukuran: 75 gram (@15 gram)",
      //     "BPOM: MD 867031149523",
      //     "Manfaat:",
      //     "Detoksifikasi tubuh",
      //     "Melancarkan peredaran darah",
      //     "Menurunkan kadar kolesterol",
      //     "Memberikan rasa kenyang lebih lama",
      //     "Meningkatkan sistem imun tubuh",
      //     "Mengurangi risiko kanker usus",
      //     "Healthy Drink",
      //     "Ingredients:",
      //     "Inulin Dietary Fiber",
      //     "Fruit And Vegetable Extract",
      //     "Gojiberry Extract",
      //     "Garcinia Atroviridis",
      //     "Red Beet",
      //     "Honey",
      //     "Vitamin Premix",
      //     "Enzyme",
      //     "Vitamin D",
      //     "Stevia",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, KICKFATT - 15 sachets",
      //   description: [
      //     "Harga: Rp. 335,000,",
      //     "Minuman kaya serat pangan, zero sugar & mengandung 70% Vitamin C yang mampu detoksifikasi tubuh & membakar lemak jahat.",
      //     "Ukuran: 225 gram (@15 gram)",
      //     "BPOM: MD 867031149523",
      //     "Manfaat:",
      //     "Detoksifikasi tubuh",
      //     "Melancarkan peredaran darah",
      //     "Menurunkan kadar kolesterol",
      //     "Memberikan rasa kenyang lebih lama",
      //     "Meningkatkan sistem imun tubuh",
      //     "Mengurangi risiko kanker usus",
      //     "Healthy Drink",
      //     "Ingredients:",
      //     "Inulin Dietary Fiber",
      //     "Fruit And Vegetable Extract",
      //     "Gojiberry Extract",
      //     "Garcinia Atroviridis",
      //     "Red Beet",
      //     "Honey",
      //     "Vitamin Premix",
      //     "Enzyme",
      //     "Vitamin D",
      //     "Stevia",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, CONVY SLIMMING BALM",
      //   description: [
      //     "Harga: Rp. 165,000,",
      //     "Solusi perawatan tubuh ideal dengan formulasi 11 bahan premium yang mampu:",
      //     "Melancarkan peredaran darah",
      //     "Membakar lemak",
      //     "Mengencangkan kulit",
      //     "Melembapkan kulit",
      //     "Membantu memperbaiki struktur kulit",
      //     "Mengecilkan lingkar tubuh",
      //     "Body Cream",
      //     "Ingredients:",
      //     "Schinus terebinthifolius extract (pink pepperslim)",
      //     "Ginger extract",
      //     "Vanillyl butyl ether",
      //     "Jojoba oil",
      //     "Arnica montana flower extract",
      //     "Acai berry oil",
      //     "Vitamin E",
      //     "Camelina oil",
      //     "Soybean oil",
      //     "Sunflower oil",
      //     "Pomegranate oil",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, SNOW KISSED SEDUCE X MILKLIFE",
      //   description: [
      //     "Harga: Rp. 65,000,",
      //     "Produk kolaborasi antara STARINC X MILKLIFE yakni Snow Kissed Seduce dengan desain packaging terbaru.",
      //     "Ukuran: 50 gram",
      //     "Manfaat:",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi acne, penuaan, hiperpigmentasi, dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingredients:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "3% Niacinamide",
      //     "Titanium Dioxide (Anti UV A & UV B)",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, SNOW KISSED BREEZE X MILKLIFE",
      //   description: [
      //     "Harga: Rp. 65,000,",
      //     "Produk kolaborasi antara STARINC X MILKLIFE yakni Snow Kissed Breeze dengan desain packaging terbaru.",
      //     "Ukuran: 50 gram",
      //     "Manfaat:",
      //     "Melembapkan kulit",
      //     "Meremajakan kulit",
      //     "Menutrisi kulit dengan Vit C, K, dan E",
      //     "Mencerahkan kulit",
      //     "Menenangkan kulit kemerahan",
      //     "Mempercepat penyembuhan bekas luka dan jerawat",
      //     "Memberikan perlindungan paparan sinar UV dan radikal bebas",
      //     "Mengurangi acne, penuaan, hiperpigmentasi, dan flek",
      //     "Memperbaiki tekstur kulit",
      //     "Body Cream",
      //     "Ingredients:",
      //     "Aqua Phytoplex 4-in-1 Essential Oil",
      //     "Sunflower Oil",
      //     "Argan Oil",
      //     "Canola Oil",
      //     "Meadowfoam Seed Oil",
      //     "3% Niacinamide",
      //     "Titanium Dioxide (Anti UV A & UV B)",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, PRIMEHERB 30 caps",
      //   description: [
      //     "Harga: Rp. 325,000,",
      //     "Produk unggulan STARINC berupa suplemen kesehatan '5 in 1' yang dirancang untuk meningkatkan kesehatan dan vitalitas secara menyeluruh dengan memanfaatkan kekuatan alami dari 5 herbal terbaik.",
      //     "Ukuran: 30 Vegecaps",
      //     "BPOM: TR243038521",
      //     "Manfaat PRIMEHERB:",
      //     "Meningkatkan Kekuatan dan Vitalitas: Memberikan energi, fokus, stamina, dan gairah hidup untuk aktivitas sehari-hari.",
      //     "Revitalisasi dan Pemulihan: Merevitalisasi sel-sel tubuh yang rusak dan meregenerasi dengan sel-sel baru yang sehat, memulihkan tubuh menjadi lebih segar dan aktif.",
      //     "Meningkatkan Kekebalan Tubuh: Meningkatkan sistem imun sebagai benteng dari penyakit, radikal bebas, infeksi bakteri, virus, dan jamur.",
      //     "Mendukung Metabolisme: Menjaga metabolisme tubuh tetap optimal, mengatur penyimpanan dan penggunaan energi.",
      //     "Menyeimbangkan Nutrisi Penting: Memberikan nutrisi penting yang dibutuhkan tubuh secara seimbang untuk mendukung kesehatan menyeluruh.",
      //     "Kandungan Herbal Premium:",
      //     "Saffron: Mendukung ketenangan dan vitalitas tubuh.",
      //     "Buah Tin (Ara): Kaya akan serat dan antioksidan untuk menjaga kesehatan tubuh.",
      //     "Panax Ginseng Korea: Meningkatkan energi, stamina, dan daya tahan tubuh.",
      //     "Habbatussauda: Mendukung sistem kekebalan tubuh dan melawan infeksi.",
      //     "Minyak Zaitun: Menjaga kesehatan jantung dan melindungi dari radikal bebas.",
      //     "Keunggulan PRIMEHERB:",
      //     "Menggunakan Vegecaps: Kapsul yang terbuat dari bahan nabati, 100% vegan-friendly, dan ramah lingkungan.",
      //     "Tanpa Bahan Tambahan Berbahaya: Bebas dari pengawet buatan, pewarna, dan perasa.",
      //     "Diproduksi dengan Praktik Berkelanjutan: Memastikan penggunaan metode pertanian dan produksi yang ramah lingkungan.",
      //     "PRIMEHERB, solusi kesehatan alami Anda dengan kombinasi herbal terbaik untuk menjaga kesehatan tubuh secara menyeluruh.",
      //     "Suplemen Makanan",
      //     "Kandungan Herbal Premium:",
      //     "Saffron: Mendukung ketenangan dan vitalitas tubuh.",
      //     "Buah Tin (Ara): Kaya akan serat dan antioksidan untuk menjaga kesehatan tubuh.",
      //     "Panax Ginseng Korea: Meningkatkan energi, stamina, dan daya tahan tubuh.",
      //     "Habbatussauda: Mendukung sistem kekebalan tubuh dan melawan infeksi.",
      //     "Minyak Zaitun: Menjaga kesehatan jantung dan melindungi dari radikal bebas.",
      //   ],
      // },
      // {
      //   id: crypto.randomUUID(),
      //   keyword: "Produk StarInc, PRIMEHERB 60 caps",
      //   description: [
      //     "Harga: Rp. 525,000,",
      //     "Produk unggulan STARINC berupa suplemen kesehatan '5 in 1' yang dirancang untuk meningkatkan kesehatan dan vitalitas secara menyeluruh dengan memanfaatkan kekuatan alami dari 5 herbal terbaik.",
      //     "Ukuran: 60 Vegecaps",
      //     "BPOM: TR243038521",
      //     "Manfaat PRIMEHERB:",
      //     "Meningkatkan Kekuatan dan Vitalitas: Memberikan energi, fokus, stamina, dan gairah hidup untuk aktivitas sehari-hari.",
      //     "Revitalisasi dan Pemulihan: Merevitalisasi sel-sel tubuh yang rusak dan meregenerasi dengan sel-sel baru yang sehat, memulihkan tubuh menjadi lebih segar dan aktif.",
      //     "Meningkatkan Kekebalan Tubuh: Meningkatkan sistem imun sebagai benteng dari penyakit, radikal bebas, infeksi bakteri, virus, dan jamur.",
      //     "Mendukung Metabolisme: Menjaga metabolisme tubuh tetap optimal, mengatur penyimpanan dan penggunaan energi.",
      //     "Menyeimbangkan Nutrisi Penting: Memberikan nutrisi penting yang dibutuhkan tubuh secara seimbang untuk mendukung kesehatan menyeluruh.",
      //     "Kandungan Herbal Premium:",
      //     "Saffron: Mendukung ketenangan dan vitalitas tubuh.",
      //     "Buah Tin (Ara): Kaya akan serat dan antioksidan untuk menjaga kesehatan tubuh.",
      //     "Panax Ginseng Korea: Meningkatkan energi, stamina, dan daya tahan tubuh.",
      //     "Habbatussauda: Mendukung sistem kekebalan tubuh dan melawan infeksi.",
      //     "Minyak Zaitun: Menjaga kesehatan jantung dan melindungi dari radikal bebas.",
      //     "Keunggulan PRIMEHERB:",
      //     "Menggunakan Vegecaps: Kapsul yang terbuat dari bahan nabati, 100% vegan-friendly, dan ramah lingkungan.",
      //     "Tanpa Bahan Tambahan Berbahaya: Bebas dari pengawet buatan, pewarna, dan perasa.",
      //     "Diproduksi dengan Praktik Berkelanjutan: Memastikan penggunaan metode pertanian dan produksi yang ramah lingkungan.",
      //     "PRIMEHERB, solusi kesehatan alami Anda dengan kombinasi herbal terbaik untuk menjaga kesehatan tubuh secara menyeluruh.",
      //     "Suplemen Makanan",
      //     "Kandungan Herbal Premium:",
      //     "Saffron: Mendukung ketenangan dan vitalitas tubuh.",
      //     "Buah Tin (Ara): Kaya akan serat dan antioksidan untuk menjaga kesehatan tubuh.",
      //     "Panax Ginseng Korea: Meningkatkan energi, stamina, dan daya tahan tubuh.",
      //     "Habbatussauda: Mendukung sistem kekebalan tubuh dan melawan infeksi.",
      //     "Minyak Zaitun: Menjaga kesehatan jantung dan melindungi dari radikal bebas.",
      //   ],
      },
    ]);
  }

  async createThread(title: string) {
    const id = crypto.randomUUID();

    await this.threads.add({
      id,
      title,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return id;
  }

  async getAllThreads() {
    return this.threads.reverse().sortBy("updated_at");
  }

  async createMessage(
    message: Pick<DEX_Message, "role" | "content" | "threadId" | "thought">
  ) {
    const messageId = crypto.randomUUID();

    await this.transaction("rw", [this.messages, this.threads], async () => {
      await this.messages.add({
        ...message,
        id: messageId,
        created_at: new Date(),
      });

      await this.threads.update(message.threadId, {
        updated_at: new Date(),
      });
    });

    return messageId;
  }

  async getMessagesForThread(threadId: string) {
    return this.messages
      .where("threadId")
      .equals(threadId)
      .sortBy("created_at");
  }

  async bulkAddstatementData(dataArray: Omit<DEX_StatementData, "id">[]) {
    const records = dataArray.map((data) => ({
      id: crypto.randomUUID(),
      ...data,
    }));

    await this.statementData.bulkPut(records);
  }


  async getstatementData() {
    return this.statementData.toArray();
  }
}

export const db = new ChatDB();
