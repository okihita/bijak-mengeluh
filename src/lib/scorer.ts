export type QualityScore = {
  overall: number
  suggestions: string[]
}

export function scoreComplaint(text: string): QualityScore {
  const suggestions: string[] = []
  let score = 100
  
  const trimmed = text.trim()
  const wordCount = trimmed.split(/\s+/).length
  const hasLocation = /\b(di|jalan|jl\.|kelurahan|kecamatan|kota|kabupaten)\b/i.test(trimmed)
  const hasTimeframe = /\b(\d+\s*(hari|minggu|bulan|tahun)|sejak|sudah|kemarin|tadi)\b/i.test(trimmed)
  const hasSpecifics = /\b(nomor|no\.|nama|tanggal|jam|rupiah|rp)\b/i.test(trimmed)
  
  // Length check
  if (wordCount < 15) {
    score -= 20
    suggestions.push("Tambahkan lebih banyak detail")
  }
  
  // Location check
  if (!hasLocation) {
    score -= 15
    suggestions.push("Sebutkan lokasi kejadian")
  }
  
  // Timeframe check
  if (!hasTimeframe) {
    score -= 15
    suggestions.push("Tambahkan kapan kejadian terjadi")
  }
  
  // Specifics check
  if (!hasSpecifics && wordCount > 10) {
    score -= 10
    suggestions.push("Tambahkan detail spesifik (nomor, nama, dll)")
  }
  
  return {
    overall: Math.max(0, score),
    suggestions
  }
}
