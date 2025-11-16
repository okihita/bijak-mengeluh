export const PROBLEM_CATEGORIES = [
  {
    id: 'infrastructure',
    label: 'Infrastruktur & Transportasi',
    emoji: '🏗️',
    keywords: ['jalan', 'rusak', 'lubang', 'aspal', 'jembatan', 'parkir', 'transportasi', 'macet', 'trotoar', 'lampu jalan'],
  },
  {
    id: 'environment',
    label: 'Lingkungan & Kebersihan',
    emoji: '🌳',
    keywords: ['sampah', 'polusi', 'pohon', 'taman', 'banjir', 'sungai', 'kebersihan', 'lingkungan', 'air', 'drainase'],
  },
  {
    id: 'health',
    label: 'Kesehatan & Sosial',
    emoji: '🏥',
    keywords: ['rumah sakit', 'puskesmas', 'bpjs', 'darurat', 'bantuan sosial', 'kesehatan', 'obat', 'vaksin'],
  },
  {
    id: 'civil',
    label: 'Kependudukan & Dokumen',
    emoji: '📄',
    keywords: ['ktp', 'kk', 'akta', 'surat', 'identitas', 'nikah', 'catatan sipil', 'kartu keluarga', 'kelahiran'],
  },
  {
    id: 'security',
    label: 'Keamanan & Ketertiban',
    emoji: '👮',
    keywords: ['polisi', 'satpol pp', 'keamanan', 'ketertiban', 'razia', 'kepolisian', 'damkar', 'pemadam'],
  },
  {
    id: 'other',
    label: 'Layanan Lainnya',
    emoji: '💡',
    keywords: [],
  },
] as const;
