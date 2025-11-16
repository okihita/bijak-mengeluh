# Directory UX Specification v2.4

**Purpose:** Locked specification for problem-first directory navigation  
**Date:** November 16, 2025  
**Status:** ✅ Implemented & Locked

---

## Core Principles

**Problem-First, Not Agency-First**
- Users search by problem ("jalan rusak") not agency names
- Synonym translation: "aspal bolong" → "jalan rusak"
- Category-based browsing for exploration

**Mobile-First Design**
- Text sizing: `text-sm sm:text-base` (14px → 16px)
- Touch targets: 44x44px minimum
- Thumb-friendly interactions

**Zero Cognitive Load**
- Search autocomplete after 2 characters
- Visual category cards with emoji
- Active filter badges always visible
- One-tap clear all filters

---

## Information Architecture

### Dual-Path Model

**Path A: Problem-Led (Primary)**
- User types problem → synonym mapping → keyword matching → agencies
- Example: "aspal bolong" → ["jalan", "rusak"] → Dinas PU

**Path B: Directory-Led (Secondary)**
- Browse by category (6 categories)
- Filter by region
- Search by agency name

### Problem Categories

1. 🏗️ **Infrastruktur & Transportasi** - jalan, rusak, lubang, aspal, jembatan, parkir, transportasi, macet, trotoar, lampu jalan
2. 🌳 **Lingkungan & Kebersihan** - sampah, polusi, pohon, taman, banjir, sungai, kebersihan, lingkungan, air, drainase
3. 🏥 **Kesehatan & Sosial** - rumah sakit, puskesmas, bpjs, darurat, bantuan sosial, kesehatan, obat, vaksin
4. 📄 **Kependudukan & Dokumen** - ktp, kk, akta, surat, identitas, nikah, catatan sipil, kartu keluarga, kelahiran
5. 👮 **Keamanan & Ketertiban** - polisi, satpol pp, keamanan, ketertiban, razia, kepolisian, damkar, pemadam
6. 💡 **Layanan Lainnya** - catch-all for uncategorized

---

## UI Components

### Search Bar
- Placeholder: "Coba: jalan rusak, sampah, ktp..."
- Autocomplete dropdown after 2 characters
- Shows suggestions with emoji + text
- Suggestions from categories and synonyms

### Region Filter
- **For 5-7 regions:** Horizontal chip row (implemented)
- **For 30+ provinces:** Dropdown select (see scaling section)
- Filter logic: AND operation with category/search

### Category Grid
- 2 columns mobile, 3 columns desktop
- Each card: emoji + label
- Click to filter, click again to deselect
- Active state: orange border + background tint

### Active Filter Badges
- Show below search bar when filters applied
- Blue badge for region
- Orange badge for category
- Gray badge for search query
- "Hapus semua" button to clear all

### Agency Cards
- Emoji + name + location
- Up to 3 keyword tags
- Responsive text sizing
- Dark mode support

---

## Filter Logic

### Single Filters
- Region only: filter by province or level
- Category only: filter by keyword matching
- Search only: match name or keywords with synonyms

### Combined Filters (AND Operation)
- Region + Category: show agencies matching both
- Region + Search: search within region
- Category + Search: search within category
- All three: intersection of all conditions

### Special Cases
- "Semua" region = no filter
- "Nasional" region = `level === 'national'`
- Empty results = show "Tidak ada instansi" with clear button

---

## User Flows

### Flow 1: Problem Search
1. User types "jalan rusak"
2. Autocomplete shows suggestions
3. User selects or continues typing
4. Results show matching agencies
5. User finds agency in <3 taps

### Flow 2: Category Browse
1. User taps "Infrastruktur" category
2. Results filter to infrastructure agencies
3. User optionally adds region filter
4. User finds agency

### Flow 3: Region + Category
1. User selects region (e.g., "Jakarta")
2. User selects category (e.g., "Lingkungan")
3. Results show environmental agencies in Jakarta
4. User finds specific agency

---

## Data Layer

### Synonym Map
- Casual → Formal translation
- Examples: "aspal bolong" → ["jalan", "rusak"]
- "ktp" → ["kependudukan", "identitas", "catatan sipil"]

### Search Algorithm
1. Check if query exists in synonym map
2. If yes, use mapped keywords
3. If no, use query as-is
4. Match against agency name and keywords
5. Return filtered results

### Category Matching
- Each category has keyword array
- Agency keywords matched against category keywords
- Partial match sufficient (includes check)

---

## Accessibility

- WCAG 2.1 AA compliant
- 4.5:1 text contrast minimum
- 3:1 UI control contrast
- 44x44px touch targets
- Keyboard navigation support
- Screen reader labels

---

## Performance

- Load all 386 agencies once (limit=500)
- Client-side filtering (instant)
- No pagination needed (<500 agencies)
- Autocomplete debounced (optional)

---

## Implementation Status

✅ Search with autocomplete  
✅ Synonym mapping (25+ terms)  
✅ Category filtering (6 categories)  
✅ Region chip filtering (7 regions)  
✅ Combined filter logic (AND)  
✅ Active filter badges  
✅ Mobile-first responsive design  
✅ Dark mode support  

---

## Scaling Considerations

**When expanding to 30+ provinces:**
- Replace chip row with dropdown select
- Keep "Semua" and "Nasional" as first options
- Alphabetically sort provinces
- Maintain same filter logic
- See DIRECTORY_UX_SPEC_v2.4_SCALING.md for details
