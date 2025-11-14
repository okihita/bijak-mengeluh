export type ComplaintScore = {
  overall: number;
  completeness: number;
  clarity: number;
  length: number;
  suggestions: string[];
};

export function scoreComplaint(text: string): ComplaintScore {
  const suggestions: string[] = [];
  
  // Completeness check (has key elements)
  let completeness = 0;
  const hasLocation = /\b(di|lokasi|alamat|jalan|kelurahan|kecamatan)\b/i.test(text);
  const hasTime = /\b(sejak|tanggal|bulan|tahun|hari|minggu|waktu)\b/i.test(text);
  const hasImpact = /\b(mengganggu|merugikan|dampak|akibat|pengaruh)\b/i.test(text);
  const hasRequest = /\b(mohon|tolong|harap|minta|segera)\b/i.test(text);
  
  if (hasLocation) completeness += 25;
  else suggestions.push("Tambahkan lokasi spesifik");
  
  if (hasTime) completeness += 25;
  else suggestions.push("Sebutkan kapan masalah terjadi");
  
  if (hasImpact) completeness += 25;
  else suggestions.push("Jelaskan dampak yang ditimbulkan");
  
  if (hasRequest) completeness += 25;
  else suggestions.push("Tambahkan permintaan tindakan");
  
  // Clarity check (sentence structure)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = text.length / Math.max(sentences.length, 1);
  let clarity = 100;
  
  if (avgSentenceLength > 150) {
    clarity -= 30;
    suggestions.push("Gunakan kalimat yang lebih pendek");
  } else if (avgSentenceLength < 20) {
    clarity -= 20;
    suggestions.push("Kembangkan penjelasan lebih detail");
  }
  
  // Length check
  const length = text.length;
  let lengthScore = 0;
  
  if (length < 50) {
    lengthScore = 30;
    suggestions.push("Komplain terlalu singkat, tambahkan detail");
  } else if (length < 100) {
    lengthScore = 60;
  } else if (length < 300) {
    lengthScore = 100;
  } else if (length < 500) {
    lengthScore = 90;
  } else {
    lengthScore = 70;
    suggestions.push("Komplain terlalu panjang, ringkas jika perlu");
  }
  
  const overall = Math.round((completeness + clarity + lengthScore) / 3);
  
  return {
    overall,
    completeness,
    clarity,
    length: lengthScore,
    suggestions: suggestions.slice(0, 3), // Max 3 suggestions
  };
}
