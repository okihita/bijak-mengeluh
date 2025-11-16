#!/usr/bin/env node

/**
 * Java Agency Scraper
 * Budget: < Rp 100,000
 * Strategy: Rule-based categorization (free, no AI costs)
 */

const fs = require('fs');
const path = require('path');

// Province data
const PROVINCES = [
  {
    name: 'West Java',
    code: 'jabar',
    cities: ['Bandung', 'Bekasi', 'Bogor', 'Depok', 'Cirebon', 'Sukabumi', 'Tasikmalaya']
  },
  {
    name: 'Central Java',
    code: 'jateng',
    cities: ['Semarang', 'Solo', 'Magelang', 'Pekalongan', 'Tegal', 'Purwokerto']
  },
  {
    name: 'East Java',
    code: 'jatim',
    cities: ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik', 'Mojokerto', 'Kediri', 'Jember']
  },
  {
    name: 'Banten',
    code: 'banten',
    cities: ['Tangerang', 'Serang', 'Cilegon', 'Tangerang Selatan']
  }
];

// Common agency types
const AGENCY_TYPES = [
  { name: 'Dinas Perhubungan', categories: ['transportation', 'infrastructure'], keywords: ['jalan', 'transportasi', 'macet', 'parkir', 'angkot', 'bus', 'terminal'] },
  { name: 'Dinas Kesehatan', categories: ['health'], keywords: ['rumah sakit', 'puskesmas', 'dokter', 'obat', 'vaksin', 'kesehatan'] },
  { name: 'Dinas Pendidikan', categories: ['education'], keywords: ['sekolah', 'guru', 'siswa', 'ujian', 'pendidikan'] },
  { name: 'Dinas Pekerjaan Umum', categories: ['infrastructure', 'public_works'], keywords: ['jalan', 'jembatan', 'drainase', 'banjir', 'infrastruktur', 'rusak'] },
  { name: 'Dinas Lingkungan Hidup', categories: ['environment', 'waste'], keywords: ['sampah', 'lingkungan', 'polusi', 'limbah', 'kebersihan'] },
  { name: 'Dinas Sosial', categories: ['social'], keywords: ['bantuan', 'sosial', 'kemiskinan', 'disabilitas'] },
  { name: 'Dinas Kependudukan', categories: ['civil_registration'], keywords: ['ktp', 'kk', 'akta', 'penduduk', 'administrasi'] },
  { name: 'Satpol PP', categories: ['public_order'], keywords: ['ketertiban', 'pkl', 'razia', 'pelanggaran'] },
  { name: 'Dinas Kebersihan', categories: ['sanitation', 'waste'], keywords: ['sampah', 'kebersihan', 'tpa', 'tps'] },
  { name: 'Dinas Perumahan', categories: ['housing'], keywords: ['rumah', 'perumahan', 'rusun', 'sewa'] },
  { name: 'Dinas Pariwisata', categories: ['tourism'], keywords: ['wisata', 'pariwisata', 'hotel', 'tempat wisata'] },
  { name: 'Dinas Komunikasi dan Informatika', categories: ['technology', 'communication'], keywords: ['internet', 'website', 'aplikasi', 'teknologi'] },
  { name: 'Badan Penanggulangan Bencana', categories: ['disaster'], keywords: ['bencana', 'banjir', 'gempa', 'kebakaran', 'darurat'] }
];

function generateAgencies() {
  console.log('🚀 Generating Java agencies...\n');
  
  const agencies = [];
  
  for (const province of PROVINCES) {
    console.log(`📍 ${province.name}: ${province.cities.length} cities`);
    
    for (const city of province.cities) {
      for (const agencyType of AGENCY_TYPES) {
        agencies.push({
          name: `${agencyType.name} ${city}`,
          province: province.name,
          city: city,
          type: agencyType.name.split(' ')[0],
          categories: agencyType.categories,
          keywords: agencyType.keywords
        });
      }
    }
  }
  
  return agencies;
}

function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Java Agency Database Generator');
  console.log('  Cost: Rp 0 (rule-based, no AI)');
  console.log('═══════════════════════════════════════\n');
  
  const agencies = generateAgencies();
  
  console.log(`\n📊 Summary:`);
  console.log(`- Provinces: ${PROVINCES.length}`);
  console.log(`- Cities: ${PROVINCES.reduce((sum, p) => sum + p.cities.length, 0)}`);
  console.log(`- Agency types: ${AGENCY_TYPES.length}`);
  console.log(`- Total agencies: ${agencies.length}`);
  console.log(`- Cost: Rp 0 💰\n`);
  
  // Save results
  const outputPath = path.join(__dirname, '../data/agencies-java.json');
  fs.writeFileSync(outputPath, JSON.stringify(agencies, null, 2));
  console.log(`✅ Saved to: ${outputPath}`);
  
  // Sample output
  console.log(`\n📝 Sample agencies:`);
  agencies.slice(0, 3).forEach(a => {
    console.log(`  - ${a.name}`);
    console.log(`    Categories: ${a.categories.join(', ')}`);
    console.log(`    Keywords: ${a.keywords.slice(0, 4).join(', ')}...`);
  });
}

main();
