export type ComplaintCategory = {
  id: string;
  label: string;
  icon: string;
  template: string;
};

export const complaintTemplates: ComplaintCategory[] = [
  {
    id: "jalan",
    label: "Jalan Rusak",
    icon: "🛣️",
    template: "Saya ingin melaporkan kondisi jalan yang rusak di [lokasi]. Kerusakan berupa [lubang/retak/berlubang] dengan ukuran sekitar [ukuran]. Kondisi ini sudah berlangsung sejak [waktu] dan sangat mengganggu aktivitas warga. Mohon segera diperbaiki.",
  },
  {
    id: "sampah",
    label: "Sampah",
    icon: "🗑️",
    template: "Saya ingin melaporkan masalah sampah di [lokasi]. Sampah menumpuk dan tidak diangkut sejak [waktu]. Kondisi ini menimbulkan bau tidak sedap dan berpotensi menjadi sarang penyakit. Mohon petugas kebersihan segera menangani.",
  },
  {
    id: "listrik",
    label: "Listrik",
    icon: "⚡",
    template: "Saya ingin melaporkan gangguan listrik di [lokasi]. Listrik sering padam sejak [waktu] dengan durasi [durasi]. Hal ini sangat mengganggu aktivitas sehari-hari. Mohon segera dilakukan perbaikan jaringan listrik.",
  },
  {
    id: "air",
    label: "Air Bersih",
    icon: "💧",
    template: "Saya ingin melaporkan masalah air bersih di [lokasi]. Air tidak mengalir/keruh/berbau sejak [waktu]. Kondisi ini sangat menyulitkan warga untuk kebutuhan sehari-hari. Mohon segera dilakukan perbaikan.",
  },
  {
    id: "kesehatan",
    label: "Kesehatan",
    icon: "🏥",
    template: "Saya ingin melaporkan masalah pelayanan kesehatan di [nama fasilitas]. Masalah yang saya alami adalah [deskripsi masalah]. Kejadian ini terjadi pada [tanggal/waktu]. Mohon ditindaklanjuti untuk meningkatkan kualitas pelayanan.",
  },
  {
    id: "pendidikan",
    label: "Pendidikan",
    icon: "🎓",
    template: "Saya ingin melaporkan masalah di [nama sekolah/institusi]. Masalah yang terjadi adalah [deskripsi masalah]. Hal ini berdampak pada [dampak]. Mohon segera ditindaklanjuti demi kepentingan pendidikan.",
  },
  {
    id: "transportasi",
    label: "Transportasi",
    icon: "🚌",
    template: "Saya ingin melaporkan masalah transportasi umum [jenis transportasi] di [lokasi/rute]. Masalahnya adalah [deskripsi masalah]. Kondisi ini terjadi sejak [waktu] dan sangat merugikan penumpang. Mohon segera diperbaiki.",
  },
  {
    id: "birokrasi",
    label: "Birokrasi",
    icon: "📋",
    template: "Saya ingin melaporkan masalah pelayanan administrasi di [nama instansi]. Saya mengurus [jenis urusan] pada [tanggal]. Masalah yang saya alami adalah [deskripsi masalah]. Mohon ditingkatkan kualitas pelayanannya.",
  },
];
