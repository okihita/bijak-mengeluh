# Indonesian Government Agency Structure

**Purpose:** Reference guide for understanding Indonesian government hierarchy and agency terminology  
**Audience:** Developers, contributors, researchers  
**Last Updated:** 2025-11-16

---

## Overview

Indonesia has a multi-tiered government structure. Understanding this hierarchy is critical for accurate complaint routing.

---

## Government Levels

### 1. National (Nasional)
**Scope:** Entire Indonesia  
**Agencies:** Kementerian (Ministries), Lembaga (Institutions)  
**Examples:**
- Kementerian Lingkungan Hidup dan Kehutanan (Ministry of Environment and Forestry)
- Kementerian Pekerjaan Umum dan Perumahan Rakyat (Ministry of Public Works and Housing)
- Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)

**Coverage in Bijak Mengeluh:** 31 agencies

---

### 2. Provincial (Provinsi)
**Scope:** Province-level (34 provinces in Indonesia)  
**Agencies:** Dinas Provinsi (Provincial Departments)  
**Example Province:** DKI Jakarta (Special Capital Region of Jakarta)  
**Examples:**
- Dinas Lingkungan Hidup DKI Jakarta
- Dinas Perhubungan DKI Jakarta

**Note:** DKI Jakarta is both a province and a city (special status)

---

### 3. City/Regency (Kota/Kabupaten)
**Scope:** City or regency level  
**Agencies:** Dinas Kota/Kabupaten (City/Regency Departments)  
**Example Cities in DKI Jakarta:**
- Jakarta Pusat (Central Jakarta)
- Jakarta Selatan (South Jakarta)
- Jakarta Timur (East Jakarta)
- Jakarta Barat (West Jakarta)
- Jakarta Utara (North Jakarta)
- Kepulauan Seribu (Thousand Islands)

**Examples:**
- Dinas Pekerjaan Umum Jakarta Selatan
- Dinas Kebersihan Jakarta Pusat

**Coverage in Bijak Mengeluh:** 90 agencies (DKI Jakarta only)

---

### 4. District (Kecamatan)
**Scope:** Sub-city level  
**Agencies:** Kantor Kecamatan (District Offices)  
**Note:** Not yet covered in Bijak Mengeluh

---

### 5. Village (Kelurahan/Desa)
**Scope:** Neighborhood level  
**Agencies:** Kantor Kelurahan/Desa (Village Offices)  
**Note:** Not yet covered in Bijak Mengeluh

---

## Terminology

### Agency Types

| Indonesian | English | Level | Description |
|------------|---------|-------|-------------|
| Kementerian | Ministry | National | Cabinet-level department |
| Lembaga | Institution | National | Non-ministerial government body |
| Badan | Agency/Board | National/Provincial | Specialized government agency |
| Dinas | Department | Provincial/City | Local government department |
| Kantor | Office | District/Village | Local administrative office |

### Geographic Terms

| Indonesian | English | Example |
|------------|---------|---------|
| Nasional | National | Indonesia |
| Provinsi | Province | DKI Jakarta |
| Kota | City | Jakarta Selatan |
| Kabupaten | Regency | Bogor |
| Kecamatan | District | Kebayoran Baru |
| Kelurahan | Urban Village | Senayan |
| Desa | Rural Village | Cibodas |

---

## DKI Jakarta Structure

```
DKI Jakarta (Province)
├── Jakarta Pusat (Central Jakarta)
│   ├── Dinas Pekerjaan Umum Jakarta Pusat
│   ├── Dinas Kebersihan Jakarta Pusat
│   └── ...
├── Jakarta Selatan (South Jakarta)
│   ├── Dinas Pekerjaan Umum Jakarta Selatan
│   ├── Dinas Kebersihan Jakarta Selatan
│   └── ...
├── Jakarta Timur (East Jakarta)
├── Jakarta Barat (West Jakarta)
├── Jakarta Utara (North Jakarta)
└── Kepulauan Seribu (Thousand Islands)
```

**Total DKI Jakarta agencies in database:** 90

---

## Jurisdiction Hierarchy

When routing complaints, follow this priority:

1. **City-level** (most specific)
   - Example: "Jalan rusak di Jakarta Selatan" → Dinas PU Jakarta Selatan

2. **Provincial-level** (if city not specified)
   - Example: "Jalan rusak di Jakarta" → Dinas PU DKI Jakarta

3. **National-level** (fallback)
   - Example: "Polusi udara" → Kementerian LHK

---

## Common Categories

### Infrastructure (Infrastruktur)
- **Dinas Pekerjaan Umum (PU)** - Public Works
  - Roads, bridges, sidewalks
  - Keywords: jalan, rusak, lubang, aspal, trotoar

### Sanitation (Kebersihan)
- **Dinas Kebersihan** - Sanitation Department
  - Garbage, waste management
  - Keywords: sampah, kotor, bau

### Water Resources (Sumber Daya Air)
- **Dinas Sumber Daya Air (SDA)** - Water Resources
  - Flooding, drainage, rivers
  - Keywords: banjir, air, sungai, got

### Environment (Lingkungan Hidup)
- **Dinas Lingkungan Hidup (LH)** - Environment
  - Air pollution, noise, environmental damage
  - Keywords: polusi, udara, bising, lingkungan

### Transportation (Perhubungan)
- **Dinas Perhubungan (Dishub)** - Transportation
  - Traffic, parking, public transport
  - Keywords: macet, parkir, angkot, busway

---

## Coverage Status

| Level | Agencies | Status |
|-------|----------|--------|
| DKI Jakarta | 98 | ✅ Complete |
| Central Java | 74 | ✅ Complete |
| East Java | 85 | ✅ Complete |
| West Java | 85 | ✅ Complete |
| Banten | 44 | ✅ Complete |
| Other Provinces | 0 | ⏳ Planned |
| Districts | 0 | ⏳ Future |
| Villages | 0 | ⏳ Future |

**Total:** 386 agencies
**Target:** 8,314 agencies (all Indonesia)

---

## References

- [Struktur Pemerintahan Indonesia](https://www.indonesia.go.id)
- [DKI Jakarta Government Structure](https://jakarta.go.id)
- [List of Indonesian Provinces](https://en.wikipedia.org/wiki/Provinces_of_Indonesia)

---

**See also:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical implementation
- [API.md](./API.md) - Agency matching logic
