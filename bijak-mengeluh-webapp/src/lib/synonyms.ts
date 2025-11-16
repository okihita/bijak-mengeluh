export const SYNONYM_MAP: Record<string, string[]> = {
  // Infrastructure
  'aspal bolong': ['jalan', 'rusak'],
  'jalanan': ['jalan'],
  'trotoar': ['jalan', 'pejalan kaki'],
  'lampu jalan': ['jalan', 'penerangan'],
  'jembatan': ['jalan', 'jembatan'],
  'macet': ['transportasi', 'lalu lintas'],
  'parkir': ['transportasi', 'parkir'],
  
  // Environment
  'sampah': ['kebersihan', 'lingkungan'],
  'kotor': ['kebersihan'],
  'bau': ['kebersihan', 'lingkungan'],
  'banjir': ['air', 'drainase', 'banjir'],
  'got': ['drainase', 'air'],
  'selokan': ['drainase', 'air'],
  
  // Civil
  'ktp': ['kependudukan', 'identitas', 'catatan sipil'],
  'kk': ['kependudukan', 'kartu keluarga'],
  'akta': ['catatan sipil', 'kependudukan'],
  'nikah': ['catatan sipil', 'pernikahan'],
  'kelahiran': ['catatan sipil', 'akta'],
  
  // Health
  'rs': ['rumah sakit', 'kesehatan'],
  'puskesmas': ['kesehatan'],
  'obat': ['kesehatan', 'farmasi'],
  
  // Security
  'polisi': ['kepolisian', 'keamanan'],
  'damkar': ['pemadam', 'kebakaran'],
  'kebakaran': ['pemadam', 'damkar'],
};
