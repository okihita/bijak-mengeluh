# Product Spec: v2.4 - Agency Directory

## Implementation Status

**✅ Completed:**
- 386 agencies in database (98 DKI Jakarta + 288 Java provinces)
- Basic directory page with search and filter
- Province filtering (5 provinces)
- Agency cards with emoji, name, location, keywords
- Bottom navigation integration
- Real-time agency count on homepage
- Fixed API limit issue (50 → 500)

**❌ Not Implemented (Future):**
- Agency detail pages (`/agency/[id]`)
- Map view with city grouping
- Category icons and colors
- "Buat Keluhan" button (pre-fill form)
- Share to Instagram Story
- Deep links for agencies
- Popular agencies carousel
- AI fallback integration

---

## Testing Requirements

### Agency Count Verification

**Problem:** Homepage claimed 424 agencies, but directory only showed 41.

**Root Cause:** API had default limit too low (50), and frontend used `limit=50`.

**Fix:** Frontend now uses `limit=500` to fetch all agencies.

**Test Checklist:**
- [ ] Homepage shows correct total (should match API `/agencies?limit=1` total field)
- [ ] Directory page shows all agencies (not just first 50)
- [ ] Filter by province shows correct count per province
- [ ] Search results aren't limited to 50
- [ ] Verify: `curl "https://brain.bijakmengeluh.id/agencies?limit=500" | jq '.agencies | length'` returns 386

**Actual Breakdown:**
- DKI Jakarta: 98
- Central Java: 74
- East Java: 85
- West Java: 85
- Banten: 44
- **Total: 386**

---

### Agency Level Filtering

**Problem:** National agencies (Kementerian) were incorrectly grouped under "DKI Jakarta" province.

**Root Cause:** Database has `province: "DKI Jakarta"` for national agencies (since they're headquartered there), but they serve all of Indonesia.

**Solution:** Use `level` field instead of just `province` for filtering.

**Implementation:**
1. **Level Filter (Chips):** Semua | Nasional | Provinsi | Kota/Kabupaten
2. **Province Filter (Dropdown):** Only shown when level ≠ national
3. **Smart Filtering:**
   - `level: 'national'` → Show all Kementerian (ignore province)
   - `level: 'provincial'` → Filter by province
   - `level: 'city'` → Filter by province/city
   - No level selected → Show all

**Agency Levels:**
- National: 23 agencies (Kementerian)
- Provincial: 9 agencies (Dinas Provinsi)
- City: 66 agencies (Dinas Kota/Kabupaten)
- Unknown: 288 agencies (need level field added)

**UI Benefits:**
- Cleaner: 4 level chips instead of 6 province chips
- Scalable: Dropdown handles 34 provinces easily
- Accurate: National agencies not mixed with local ones
- Contextual: Province dropdown only appears when relevant

**Test Checklist:**
- [ ] "Nasional" filter shows only Kementerian (23 agencies)
- [ ] "Nasional" filter hides province dropdown
- [ ] "Provinsi" filter shows province dropdown
- [ ] "Kota" filter shows province dropdown
- [ ] Kementerian don't appear in DKI Jakarta filter
- [ ] Level badges show on agency cards (blue=national, purple=provincial, green=city)

---

## Original Vision

Transform Bijak Mengeluh from a single-purpose complaint tool into a **civic infrastructure map**. The directory isn't just a fallback—it's a discovery engine that shows citizens what government actually looks like.

**Original Tagline:** "433 ways to fix your city"  
**Actual:** 386 agencies

## Overview

**Goal:** Expand agency coverage and add browsable directory  
**Achieved:** 386 agencies (98 DKI Jakarta + 74 Central Java + 85 East Java + 85 West Java + 44 Banten)  
**Status:** Basic directory implemented, advanced features deferred

## Goals

1. **Increase coverage**: 121 → 433 agencies (257% increase)
2. **Make agencies shareable**: Deep links, Instagram Stories, "Send to Friend"
3. **Improve discoverability**: Browse by location like a map, not a database
4. **Create viral moments**: "I found the agency for that!" shareability
5. **Zero cost**: Use existing Java agencies JSON, no new scraping needed

## The Problem We're Solving

**Scenario 1: AI Fails**
User: "Lampu jalan mati seminggu"
AI: *can't match agency*
Current: Dead end. User gives up.
**New:** "Coba cari di Direktori" → finds Dinas PU in 10 seconds

**Scenario 2: Proactive Discovery**
User sees pothole, doesn't know who handles it.
Current: Must type complaint first, hope AI matches.
**New:** Opens directory, browses "Infrastructure" → finds 3 relevant agencies → picks closest one

**Scenario 3: Sharing Knowledge**
Friend: "Siapa yang urus sampah di Bandung?"
Current: User has to remember or search again.
**New:** User shares direct link: `bijakmengeluh.id/agency/dinas-kebersihan-bandung`

**Scenario 4: Viral Discovery**
User finds obscure agency (e.g., "Dinas Pariwisata handles beach trash?!")
Current: Knowledge stays private.
**New:** Shares to Instagram Story: "TIL this agency exists! 🤯" → friends discover tool

## User Flows

### Flow 1: Homepage → Directory (Discovery Mode)

```
Homepage
  ↓
[New] "Lihat 433 Instansi" button (below complaint form)
  ↓
Directory landing
  - Hero: "433 instansi siap bantu kamu"
  - Quick filters: Province chips (visual, not dropdown)
  - Popular agencies carousel
  - Search bar (prominent)
  ↓
User selects "West Java"
  ↓
Map view shows 91 agencies grouped by city
  - Bandung (13) | Bekasi (13) | Bogor (13)...
  ↓
User clicks "Bandung (13)"
  ↓
Grid of 13 Bandung agencies with category icons
  ↓
User clicks "Dinas Perhubungan Bandung"
  ↓
Agency detail page:
  - Name, location, categories
  - Keywords they handle
  - "Buat Keluhan" button → pre-fills form
  - Share button → Instagram Story / Copy Link
```

### Flow 2: Complaint Form → No Match → Directory (Fallback Mode)

```
User types complaint
  ↓
AI can't match agency
  ↓
Show generated complaint + message:
  "Kami belum yakin instansi mana yang tepat 🤔
   Tapi kamu bisa cari manual!"
  ↓
[Button] "Cari di Direktori"
  ↓
Directory opens with search pre-filled from complaint keywords
  Example: "jalan rusak" → search="jalan"
  ↓
Results show transportation/infrastructure agencies
  ↓
User picks agency → returns to form with agency selected
```

### Flow 3: Direct Agency Link (Shareable Mode)

```
User receives link: bijakmengeluh.id/agency/dinas-kesehatan-bandung
  ↓
Lands on agency detail page
  - Shows agency info
  - "Buat Keluhan ke Instansi Ini" CTA
  - Related agencies (same city/category)
  ↓
User clicks "Buat Keluhan"
  ↓
Redirects to homepage with agency pre-selected
  ↓
User types complaint → AI rewrites → ready to share
```

### Flow 4: Instagram Story Share (Viral Mode)

```
User on agency detail page
  ↓
Clicks "Share" button
  ↓
Options:
  1. Instagram Story (generates image)
  2. Copy Link
  3. WhatsApp
  ↓
Selects Instagram Story
  ↓
Generates story image:
  - Agency name + icon
  - "Ternyata ada instansi buat ini! 🤯"
  - QR code → bijakmengeluh.id/agency/[id]
  - Swipe up link
  ↓
Friend sees story → scans QR / swipes up → discovers tool
```

## Features

### 1. Integrate Java Agencies into DynamoDB

**What:**
- Upload 312 Java agencies to DynamoDB `agencies` table
- Maintain existing schema compatibility
- Add province/city fields for filtering

**Schema additions:**
```json
{
  "agency_id": "dinas-perhubungan-bandung",
  "name": "Dinas Perhubungan Bandung",
  "province": "West Java",
  "city": "Bandung",
  "type": "Dinas",
  "categories": ["transportation", "infrastructure"],
  "keywords": ["jalan", "transportasi", "macet", "parkir"],
  "social_media": {}, // empty for now
  "emoji": "🚗", // category emoji for visual identity
  "color": "#3B82F6" // category color for UI consistency
}
```

**Implementation:**
- Script: `scripts/upload-java-agencies.ts`
- Batch write to DynamoDB (25 items per batch)
- Idempotent: check if agency_id exists before inserting
- Add emoji/color mapping for 13 categories

### 2. Directory Landing Page (`/directory`)

**Hero Section:**
```
🗺️ 433 Instansi Siap Bantu Kamu

[Search bar: "Cari instansi atau masalah..."]

📍 Pilih Provinsi:
[National] [DKI Jakarta] [West Java] [Central Java] [East Java] [Banten]
(Visual chips with agency count badges)
```

**Popular Agencies Carousel:**
- Top 6 most-searched agencies (based on analytics later)
- For now: hand-picked diverse examples
  - Dinas Perhubungan DKI Jakarta 🚗
  - Dinas Kesehatan Bandung 🏥
  - Dinas Pendidikan Surabaya 🎓
  - Dinas Lingkungan Hidup Semarang 🌳
  - Satpol PP Jakarta 👮
  - Dinas Pariwisata Bali 🏖️

**Stats Section:**
```
433 instansi | 5 provinsi | 24 kota | 13 kategori
```

**Design:**
- Gradient background (subtle, not overwhelming)
- Large, friendly typography
- Mobile-first with smooth animations
- Skeleton loaders for perceived speed

### 3. Directory Results Page (`/directory?province=...`)

**Layout:**

**Left Sidebar (Desktop) / Top Filters (Mobile):**
```
📍 Provinsi: [West Java ▼]
🏙️ Kota: [Semua ▼]
🏛️ Kategori:
  [ ] Transportasi (24)
  [ ] Kesehatan (24)
  [ ] Pendidikan (24)
  ...

[Reset Filters]
```

**Main Content:**
```
Menampilkan 91 instansi di West Java

[Grid of Agency Cards]
```

**Agency Card Design:**
```
┌─────────────────────────────────┐
│ 🚗 Dinas Perhubungan Bandung   │
│                                 │
│ 📍 Bandung, West Java           │
│ 🏷️ [Transportasi] [Infrastruktur]│
│                                 │
│ Menangani: jalan, macet, parkir │
│                                 │
│ [Buat Keluhan] [Share 🔗]       │
└─────────────────────────────────┘
```

**Interactions:**
- Hover: Card lifts with shadow
- Click card → agency detail page
- Click "Buat Keluhan" → homepage with pre-fill
- Click "Share" → share modal

**Empty State:**
```
🔍 Tidak ada instansi yang cocok

Coba:
• Pilih provinsi lain
• Hapus filter kategori
• Gunakan kata kunci berbeda

[Reset Semua Filter]
```

### 4. Agency Detail Page (`/agency/[id]`)

**Layout:**
```
← Kembali ke Direktori

┌─────────────────────────────────────────┐
│ 🚗 Dinas Perhubungan Bandung           │
│                                         │
│ 📍 Bandung, West Java                   │
│ 🏛️ Dinas (Pemerintah Kota)             │
│                                         │
│ Kategori:                               │
│ [Transportasi] [Infrastruktur]          │
│                                         │
│ Menangani masalah:                      │
│ • Jalan rusak                           │
│ • Kemacetan                             │
│ • Parkir liar                           │
│ • Angkot tidak teratur                  │
│ • Terminal bus                          │
│                                         │
│ [Buat Keluhan ke Instansi Ini]          │
│ [Share 🔗]                               │
└─────────────────────────────────────────┘

Instansi Terkait:
[Dinas PU Bandung] [Dinas Perhubungan Jabar] [Satpol PP Bandung]
```

**Share Modal:**
```
Bagikan Instansi Ini

[Instagram Story] 📸
  → Generates branded image with QR code

[Copy Link] 🔗
  → bijakmengeluh.id/agency/dinas-perhubungan-bandung

[WhatsApp] 💬
  → "Cek instansi ini: [link]"

[Cancel]
```

**Instagram Story Image:**
```
┌─────────────────────────────┐
│  Gradient background        │
│                             │
│  🚗                          │
│  Dinas Perhubungan Bandung  │
│                             │
│  Ternyata ada instansi      │
│  buat masalah ini! 🤯       │
│                             │
│  [QR Code]                  │
│                             │
│  bijakmengeluh.id           │
└─────────────────────────────┘
```

### 5. Homepage Integration

**New Section (below complaint form):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Atau cari instansi manual

🗺️ Lihat 433 Instansi

Jelajahi semua instansi pemerintah
berdasarkan lokasi dan kategori

[Buka Direktori →]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Position:** Between complaint form and footer
**Design:** Subtle, not competing with primary action
**Copy:** Inviting, not desperate

### 6. No-Match Fallback (Enhanced)

**Current:** AI can't match → dead end

**New:** AI can't match → helpful nudge

```
┌─────────────────────────────────────────┐
│ Keluhan kamu sudah siap! ✅             │
│                                         │
│ [Generated complaint text...]           │
│                                         │
│ ⚠️ Kami belum yakin instansi mana       │
│    yang tepat untuk masalah ini         │
│                                         │
│ Tapi tenang! Kamu bisa:                 │
│                                         │
│ 1. [Cari Manual di Direktori →]         │
│    Kami bantu cari berdasarkan kata     │
│    kunci dari keluhan kamu              │
│                                         │
│ 2. Atau copy keluhan ini dan kirim      │
│    ke instansi yang kamu tahu           │
│                                         │
│ [Copy Keluhan]                          │
└─────────────────────────────────────────┘
```

**Smart pre-fill:**
- Extract keywords from complaint
- Pre-fill directory search
- Example: "jalan rusak" → search="jalan"

### 7. Navigation Updates

**Header (Desktop):**
```
[Logo] Bijak Mengeluh    [Direktori] [Riwayat]    [GitHub]
```

**Header (Mobile):**
```
[☰ Menu]  Bijak Mengeluh  [GitHub]

Menu drawer:
  🏠 Beranda
  🗺️ Direktori (NEW!)
  📜 Riwayat
  ━━━━━━━━━━
  💬 Feedback
  📖 Docs
```

**Footer:**
```
Bijak Mengeluh © 2024

[Lihat Semua Instansi] [Cara Kerja] [GitHub]
```

### 8. Deep Linking & SEO

**Agency URLs:**
- Format: `/agency/[agency-id]`
- Example: `/agency/dinas-perhubungan-bandung`
- SEO-friendly slugs (no UUIDs)

**Meta Tags (per agency):**
```html
<title>Dinas Perhubungan Bandung - Bijak Mengeluh</title>
<meta name="description" content="Laporkan masalah jalan, macet, parkir ke Dinas Perhubungan Bandung. 433 instansi siap bantu kamu." />
<meta property="og:image" content="[generated agency card image]" />
```

**Shareable URLs:**
- Directory: `/directory?province=West+Java&category=transportation`
- Agency: `/agency/dinas-perhubungan-bandung`
- Pre-filled complaint: `/agency/dinas-perhubungan-bandung?action=complain`

### 9. Analytics Hooks (for future optimization)

**Track:**
- Directory page views
- Search queries (what people look for)
- Filter usage (which provinces/categories)
- Agency card clicks
- "Buat Keluhan" clicks from directory
- Share button clicks
- Deep link visits

**Use cases:**
- Identify popular agencies → feature in carousel
- Identify search gaps → add more keywords
- Identify dead-end searches → improve matching
- Measure directory vs AI usage → optimize UX

## Technical Implementation

### Database Migration

**Script:** `scripts/upload-java-agencies.ts`

```typescript
// Read agencies-java.json
// Transform to DynamoDB schema
// Batch write with error handling
// Log success/failure counts
```

**Run once:** `npm run upload-agencies`

### API Changes

**Existing endpoint:** `POST /api/complaint` (no changes needed)

**New endpoint:** `GET /api/agencies`

Query params:
- `province` (optional)
- `city` (optional)
- `category` (optional)
- `search` (optional)
- `limit` (default: 50)
- `lastKey` (for pagination)

Response:
```json
{
  "agencies": [...],
  "lastKey": "...",
  "total": 433
}
```

### Frontend Components

**New page:** `src/app/directory/page.tsx`
**New component:** `src/components/AgencyDirectory.tsx`
**New component:** `src/components/AgencyCard.tsx`
**New component:** `src/components/AgencyFilters.tsx`

**Updated:** `src/components/GeneratedComplaint.tsx`
- Add no-match fallback UI

## Success Metrics

### Coverage Metrics
- ✅ 433 agencies live in production
- ✅ AI matcher searches all 433
- ✅ All 5 provinces represented
- ✅ All 13 categories have agencies

### Discovery Metrics
- Directory page views (target: 30% of homepage views)
- Search queries per session (target: 2-3)
- Filter usage rate (target: 60% use at least 1 filter)
- Agency detail page views (target: 50% of directory visitors)

### Conversion Metrics
- "Buat Keluhan" clicks from directory (target: 40%)
- Directory → complaint submission rate (target: 25%)
- No-match fallback → directory clicks (target: 70%)
- Pre-filled agency usage (target: 80% keep the selection)

### Shareability Metrics (NEW!)
- Share button clicks (target: 5% of agency page views)
- Instagram Story shares (target: 50% of shares)
- Deep link visits (target: 10% of total traffic)
- Returning visitors from shared links (target: 30%)

### Performance Metrics
- Directory page load <1s
- Search results appear <300ms
- Mobile filters smooth (60fps)
- No console errors

### Quality Metrics
- Zero duplicate agencies
- 100% agencies have valid categories
- 100% agencies have keywords
- All deep links resolve correctly

## Design System Consistency

### Color Scheme Unity

**Requirement:** All pages must use identical color schemes to create visual unity.

**Primary Colors:**
```css
/* Light Mode */
--background: white
--card: white
--border: #e5e7eb (gray-200)
--text-primary: #111827 (gray-900)
--text-secondary: #6b7280 (gray-500)
--accent: #2563eb (blue-600)
--accent-hover: #1d4ed8 (blue-700)

/* Dark Mode */
--background: #111827 (gray-900)
--card: #1f2937 (gray-800)
--border: #374151 (gray-700)
--text-primary: #f9fafb (gray-50)
--text-secondary: #9ca3af (gray-400)
--accent: #3b82f6 (blue-500)
--accent-hover: #2563eb (blue-600)
```

**Gradient Backgrounds:**
```css
/* Light Mode */
from-blue-50 to-white

/* Dark Mode */
from-gray-900 to-gray-800
```

**Apply to ALL pages:**
- Homepage
- Directory
- History
- Any future pages

### Spacing System

**Requirement:** Use consistent spacing across all pages for pixel-perfect unity.

**Container:**
```tsx
className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20"
```

**Max Width:**
```tsx
// Homepage & History
className="max-w-3xl mx-auto"

// Directory (wider for grid)
className="max-w-6xl mx-auto"
```

**Vertical Spacing:**
```tsx
// Between sections
className="space-y-6"

// Between elements
className="mb-6"  // Large gap
className="mb-4"  // Medium gap
className="mb-2"  // Small gap
```

**Card Padding:**
```tsx
// Standard card
className="p-4"

// Large card
className="p-6"

// Card with header
className="pt-6 px-6 pb-4"  // Header
className="px-6 pb-6"        // Content
```

### Typography System

**Requirement:** Consistent font sizes and weights across all pages.

**Headings:**
```tsx
// Page title (h1)
className="text-4xl font-bold mb-2 dark:text-white"

// Section title (h2)
className="text-3xl font-bold mb-6"

// Card title (h3)
className="text-xl font-bold"

// Subsection (h4)
className="text-lg font-semibold"
```

**Body Text:**
```tsx
// Primary text
className="text-base dark:text-white"

// Secondary text
className="text-sm text-gray-600 dark:text-gray-400"

// Tertiary text
className="text-xs text-gray-500 dark:text-gray-400"
```

### Component Consistency

**Buttons:**
```tsx
// Primary button
className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"

// Secondary button
className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"

// Large button
className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
```

**Input Fields:**
```tsx
className="w-full p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
```

**Cards:**
```tsx
className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition"
```

**Chips/Badges:**
```tsx
className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-gray-300"
```

### Border Radius System

**Requirement:** Consistent border radius for visual harmony.

```tsx
// Small elements (badges, chips)
className="rounded-full"

// Medium elements (buttons, inputs)
className="rounded-lg"  // 8px

// Large elements (cards)
className="rounded-lg"  // 8px
```

### Shadow System

**Requirement:** Consistent shadows for depth hierarchy.

```tsx
// Hover state
className="hover:shadow-lg"

// Active card
className="shadow-xl"

// Subtle elevation
className="shadow-sm"
```

### Transition System

**Requirement:** Smooth, consistent transitions.

```tsx
// Standard transition
className="transition-colors"

// All properties
className="transition-all"

// Custom duration
className="transition-all duration-300"
```

### Implementation Checklist

**Homepage:**
- [ ] Uses standard container padding
- [ ] Uses max-w-3xl
- [ ] Uses consistent card styling
- [ ] Uses standard button styles
- [ ] Uses standard spacing (space-y-6)

**Directory:**
- [ ] Uses standard container padding
- [ ] Uses max-w-6xl (wider for grid)
- [ ] Uses consistent card styling
- [ ] Uses standard button styles
- [ ] Uses standard spacing
- [ ] Matches gradient background style

**History:**
- [ ] Uses standard container padding
- [ ] Uses max-w-3xl
- [ ] Uses consistent card styling
- [ ] Uses standard button styles
- [ ] Uses standard spacing

**All Pages:**
- [ ] Identical color scheme (light/dark)
- [ ] Consistent typography scale
- [ ] Consistent border radius
- [ ] Consistent shadows
- [ ] Consistent transitions
- [ ] Consistent spacing rhythm

### Audit Process

Before shipping any page:
1. Compare side-by-side with other pages
2. Check color values match exactly
3. Verify spacing matches design system
4. Test dark mode consistency
5. Verify hover states match
6. Check mobile responsiveness matches

**Goal:** User should feel like they're in the same app on every page, not jumping between different designs.

---

## Deployment Protocol

### ⚠️ CRITICAL: Always Ask for Confirmation Before Push

**Rule:** NEVER push to GitHub without explicit user confirmation.

**Process:**
1. Make code changes
2. Test locally
3. Git commit locally
4. **STOP and ask:** "Ready to push to GitHub?"
5. Wait for user confirmation
6. Only then: `git push`

**Why:**
- Prevents premature deployments
- Allows user to review changes
- Gives time for additional testing
- Avoids breaking production

**Example:**
```
✅ Changes committed locally (commit: abc1234)
📝 Summary: [brief description]

⚠️ Ready to push to GitHub? (y/n)
```

**Never:**
- Push automatically after commit
- Assume user wants immediate deployment
- Skip confirmation step

This is a **hard requirement** for all future deployments.

---

## Mobile Excellence

### Bottom Navigation Integration

**Current State:**
- Homepage and History have bottom navigation bar
- Directory page has no bottom nav (inconsistent UX)

**Required:**
- Directory must show bottom navigation bar on mobile
- Consistent navigation across all pages
- Active state highlighting for current page

**Bottom Nav Items:**
```
[🏠 Beranda] [🗺️ Direktori] [📜 Riwayat]
```

### Top Bar Component (Mobile)

**Problem:**
- PWA install prompt and theme toggle are duplicated across pages
- No consistent top bar on mobile

**Solution:**
- Extract PWA install + theme toggle into reusable `<TopBar />` component
- Show on all pages (Homepage, Directory, History)
- Consistent positioning and styling

**Component Structure:**
```tsx
<TopBar>
  <PwaInstallPrompt />
  <ThemeToggle />
</TopBar>
```

**Usage:**
```tsx
// Homepage
<TopBar />
<ComplaintForm />

// Directory
<TopBar />
<DirectoryContent />

// History
<TopBar />
<HistoryList />
```

### Dark Theme Consistency

**Current Issue:**
- Directory page may not respect dark theme
- Inconsistent color schemes across pages

**Requirements:**
- Directory must fully support dark theme
- All components use theme-aware colors
- Smooth theme transitions
- No flash of wrong theme on load

**Theme-Aware Components:**
- Background: `bg-white dark:bg-gray-900`
- Cards: `bg-white dark:bg-gray-800`
- Text: `text-gray-900 dark:text-gray-100`
- Borders: `border-gray-200 dark:border-gray-700`
- Hover states: `hover:bg-gray-100 dark:hover:bg-gray-800`

### Mobile Layout Specifications

**Directory Page Mobile:**
```
┌─────────────────────────┐
│ [PWA] [Theme Toggle]    │ ← TopBar (fixed)
├─────────────────────────┤
│ 🗺️ Direktori Instansi   │
│                         │
│ [Search bar]            │
│                         │
│ [Province chips]        │
│                         │
│ [Agency cards...]       │
│                         │
│                         │
├─────────────────────────┤
│ [🏠] [🗺️] [📜]          │ ← BottomNav (fixed)
└─────────────────────────┘
```

**Responsive Breakpoints:**
- Mobile: < 640px (show bottom nav + top bar)
- Desktop: ≥ 640px (show header, hide bottom nav)

### Implementation Checklist

- [ ] Create `<TopBar />` component
- [ ] Extract PWA install + theme toggle
- [ ] Add `<TopBar />` to directory page
- [ ] Add `<BottomNavigation />` to directory page
- [ ] Verify dark theme on directory
- [ ] Test theme toggle on directory
- [ ] Test PWA install on directory
- [ ] Verify bottom nav active states
- [ ] Test on mobile viewport
- [ ] Test theme persistence across pages

## Creative Polish: Micro-Interactions & Delight Moments

### Visual Identity per Category

**Category Emojis & Colors:**
```
🚗 Transportation    - Blue (#3B82F6)
🏥 Health           - Red (#EF4444)
🎓 Education        - Purple (#8B5CF6)
🏗️ Infrastructure   - Gray (#6B7280)
🌳 Environment      - Green (#10B981)
🤝 Social Services  - Pink (#EC4899)
📋 Civil Registry   - Indigo (#6366F1)
👮 Public Order     - Orange (#F59E0B)
🚰 Sanitation       - Cyan (#06B6D4)
🏠 Housing          - Brown (#92400E)
🏖️ Tourism          - Yellow (#FBBF24)
💻 Technology       - Teal (#14B8A6)
🚨 Disaster         - Red (#DC2626)
```

**Usage:**
- Agency cards show category emoji prominently
- Hover effects use category color
- Instagram Story backgrounds use category gradient
- Search results group by color-coded categories

### Animations & Transitions

**Directory Landing:**
- Hero text fades in with slight upward motion
- Province chips animate in sequentially (stagger 50ms)
- Popular carousel auto-scrolls smoothly
- Stats counter animates from 0 → final number

**Search & Filter:**
- Search bar expands on focus
- Results fade in with stagger (50ms per card)
- Filter checkboxes have satisfying check animation
- "Reset Filters" button pulses when filters active

**Agency Cards:**
- Hover: Lift 4px with shadow
- Click: Scale down 0.98 then navigate
- Share button: Confetti animation on click
- Category badges: Subtle pulse on hover

**Agency Detail Page:**
- Page slides in from right
- Related agencies carousel smooth scroll
- Share modal slides up from bottom
- QR code generates with fade-in

### Empty States with Personality

**No Search Results:**
```
🔍 Hmm, tidak ketemu...

Sepertinya instansi yang kamu cari
belum ada di database kami.

Tapi jangan khawatir! Coba:
• Cek ejaan kata kunci
• Pilih provinsi yang berbeda
• Lihat kategori terkait

[Reset Pencarian]
```

**No Agencies in Filter:**
```
🏛️ Belum ada instansi di sini

Kami sedang memperluas jangkauan
ke lebih banyak kota.

Sementara itu, coba:
• Pilih provinsi lain
• Hapus filter kategori

[Lihat Semua Instansi]
```

**Loading States:**
```
🔄 Memuat instansi...

[Skeleton cards with shimmer effect]
```

### Shareable Moments

**Instagram Story Templates (3 variants):**

**Variant 1: Discovery**
```
┌─────────────────────────────┐
│  Gradient (category color)  │
│                             │
│  TIL ada instansi buat ini! │
│                             │
│  🚗                          │
│  Dinas Perhubungan Bandung  │
│                             │
│  Menangani:                 │
│  • Jalan rusak              │
│  • Macet                    │
│  • Parkir liar              │
│                             │
│  [QR Code]                  │
│  bijakmengeluh.id           │
└─────────────────────────────┘
```

**Variant 2: Problem-Solving**
```
┌─────────────────────────────┐
│  Solid background           │
│                             │
│  Ada masalah jalan rusak?   │
│  Lapor ke sini! 👇          │
│                             │
│  🚗 Dinas Perhubungan       │
│     Bandung                 │
│                             │
│  Bikin keluhan dalam        │
│  30 detik di:               │
│                             │
│  [QR Code]                  │
│  bijakmengeluh.id           │
└─────────────────────────────┘
```

**Variant 3: Stats Flex**
```
┌─────────────────────────────┐
│  Gradient background        │
│                             │
│  433 instansi               │
│  siap bantu kamu! 🚀        │
│                             │
│  5 provinsi                 │
│  24 kota                    │
│  13 kategori                │
│                             │
│  Cari instansi yang tepat:  │
│                             │
│  [QR Code]                  │
│  bijakmengeluh.id/directory │
└─────────────────────────────┘
```

### Copy That Converts

**Homepage CTA:**
```
Before: "Lihat Direktori"
After:  "🗺️ Jelajahi 433 Instansi"
```

**No-Match Fallback:**
```
Before: "Cari Manual di Direktori"
After:  "Bantu Aku Cari Instansi →"
```

**Agency Card Button:**
```
Before: "Use This Agency"
After:  "Buat Keluhan ke Sini"
```

**Share Modal:**
```
Before: "Share"
After:  "Kasih Tau Temen 💬"
```

### Easter Eggs & Surprises

**Search for "semua":**
- Shows all 433 agencies with confetti animation
- Message: "Wow, kamu mau lihat semuanya! 🎉"

**Visit 10th agency:**
- Subtle badge: "Explorer 🗺️"
- Tooltip: "Kamu udah cek 10 instansi!"

**Share 3 times:**
- Confetti animation
- Message: "Thanks for spreading the word! 🙏"

**First-time visitor:**
- Gentle tooltip on directory button
- "Psst... ada 433 instansi di sini 👀"

### Accessibility Polish

**Keyboard Navigation:**
- Tab through agency cards
- Enter to select
- Escape to close modals
- Arrow keys in carousel

**Screen Reader:**
- Descriptive labels for all buttons
- Announce filter changes
- Announce search results count
- Announce loading states

**Color Contrast:**
- All text meets WCAG AA
- Category colors tested for readability
- Focus indicators visible

**Mobile Touch Targets:**
- Minimum 44x44px
- Adequate spacing between cards
- Swipe gestures for carousel

## Out of Scope (v3.0)

- Social media links for Java agencies (requires manual research)
- Agency response tracking
- User-submitted agency additions
- Multi-language support

## Timeline

**Phase 1: Database (30 min)**
- Write upload script
- Test with 10 agencies
- Upload all 312 agencies
- Verify in DynamoDB

**Phase 2: API (30 min)**
- Create `/api/agencies` endpoint
- Add filtering logic
- Test pagination

**Phase 3: UI (2 hours)**
- Build directory page
- Add search/filters
- Style agency cards
- Add no-match fallback
- Update navigation

**Phase 4: Testing (30 min)**
- Test all filters
- Test search
- Test mobile responsiveness
- Test no-match flow

**Total: ~3.5 hours**

## Rollout

1. Deploy database changes (no user impact)
2. Deploy API endpoint (no user impact)
3. Deploy UI (feature flag: off)
4. Test in production
5. Enable feature flag
6. Monitor for 24 hours
7. Announce on social media

## Open Questions & Creative Decisions

### Navigation Strategy
**Q:** Should directory be equally prominent as complaint form?
**Decision:** No. Complaint form stays primary. Directory is discovery mode, not replacement.
**Rationale:** Most users know their problem, not the agency. AI matching is faster.

### Homepage Integration
**Q:** Where to place directory CTA on homepage?
**Options:**
1. Above fold (competes with complaint form)
2. Below complaint form (secondary action)
3. In header only (discoverable but not pushy)

**Decision:** Below complaint form + header link
**Rationale:** Doesn't distract from primary action, but visible for curious users.

### Search Behavior
**Q:** Should search be instant or require Enter key?
**Decision:** Instant with 300ms debounce
**Rationale:** Faster feedback, modern UX expectation.

**Q:** Should search match partial words?
**Decision:** Yes, fuzzy matching
**Example:** "keshat" matches "Kesehatan"

### Filter UX
**Q:** Dropdowns vs chips for provinces?
**Decision:** Chips (visual, clickable)
**Rationale:** More engaging, shows all options at once, mobile-friendly.

**Q:** Should filters be sticky on scroll?
**Decision:** Yes on desktop, collapsible on mobile
**Rationale:** Desktop has space, mobile needs content priority.

### Agency Cards
**Q:** Show social media links on cards?
**Decision:** No, only on detail page
**Rationale:** Cards should be scannable. Too much info = cognitive overload.

**Q:** Show keyword count or actual keywords?
**Decision:** Show 3-5 keywords, truncate rest
**Rationale:** Gives preview without overwhelming.

### Shareability
**Q:** Which share options to include?
**Options:** Instagram, Twitter, WhatsApp, Facebook, Copy Link, Email
**Decision:** Instagram Story, Copy Link, WhatsApp
**Rationale:** Top 3 for Indonesian users. Instagram for viral, WhatsApp for direct sharing, Copy for flexibility.

**Q:** Should shared links have preview images?
**Decision:** Yes, generate Open Graph images per agency
**Rationale:** Better click-through on social media.

**Q:** Should we track who shared what?
**Decision:** No (privacy)
**Alternative:** Track share button clicks only, not individual shares.

### Deep Linking
**Q:** Should agency URLs be human-readable?
**Decision:** Yes, use slugs not IDs
**Example:** `/agency/dinas-perhubungan-bandung` not `/agency/123`
**Rationale:** SEO, shareability, trust.

**Q:** Should we support query params for pre-filled complaints?
**Decision:** Yes, but v3.0
**Example:** `/agency/dinas-pu?complaint=jalan+rusak`
**Rationale:** Powerful but complex. Ship directory first.

### Performance
**Q:** Client-side filtering or server-side?
**Decision:** Server-side with client-side caching
**Rationale:** 433 agencies = ~200KB JSON. Too big for client-side.

**Q:** Pagination or infinite scroll?
**Decision:** Infinite scroll
**Rationale:** Better mobile UX, less friction.

### Analytics
**Q:** Should we track individual agency views?
**Decision:** Yes, aggregate only (no user tracking)
**Rationale:** Helps identify popular agencies for carousel.

**Q:** Should we track search queries?
**Decision:** Yes, anonymized
**Rationale:** Reveals what people look for → improve keywords.

### Mobile Experience
**Q:** Should mobile have different layout?
**Decision:** Yes, single column + bottom sheet filters
**Rationale:** Thumb-friendly, more screen space for content.

**Q:** Should we support swipe gestures?
**Decision:** Yes, swipe carousel, swipe to dismiss modals
**Rationale:** Native app feel.

### Viral Mechanics
**Q:** Should we gamify discovery? (badges, streaks, etc.)
**Decision:** Subtle only (easter eggs, no explicit gamification)
**Rationale:** Civic tool, not a game. Delight, don't distract.

**Q:** Should we add "Share your complaint" after submission?
**Decision:** Yes, but v3.0
**Rationale:** Powerful for accountability, but needs careful UX.

## Decisions Made

✅ **Directory is discovery mode, not replacement**
✅ **Chips for provinces, not dropdowns**
✅ **Instant search with debounce**
✅ **Instagram Story as primary share method**
✅ **Human-readable agency URLs**
✅ **Server-side filtering with caching**
✅ **Infinite scroll for results**
✅ **Category emojis & colors for visual identity**
✅ **Subtle easter eggs, no explicit gamification**
✅ **Mobile-first with swipe gestures**

## Questions

## Timeline (Revised for Polish)

**Phase 1: Database (30 min)**
- Write upload script with emoji/color mapping
- Test with 10 agencies
- Upload all 312 agencies
- Verify in DynamoDB

**Phase 2: API (45 min)**
- Create `/api/agencies` endpoint with filtering
- Add pagination support
- Test performance with 433 agencies
- Add caching headers

**Phase 3: Core UI (2.5 hours)**
- Build directory landing page
- Add search with debounce
- Build filter system (chips + checkboxes)
- Create agency card component
- Build agency detail page
- Add no-match fallback
- Update navigation

**Phase 4: Polish & Shareability (1.5 hours)**
- Add category emojis & colors
- Implement animations & transitions
- Build share modal with Instagram Story
- Generate Open Graph images
- Add empty states with personality
- Implement easter eggs
- Test mobile gestures

**Phase 5: Testing (45 min)**
- Test all filters
- Test search edge cases
- Test mobile responsiveness
- Test share functionality
- Test deep links
- Test accessibility (keyboard, screen reader)
- Performance testing

**Total: ~5.5 hours** (was 3.5, added 2 hours for polish)

## Rollout Strategy

**Soft Launch (Day 1):**
1. Deploy database changes
2. Deploy API endpoint
3. Deploy UI with feature flag OFF
4. Test in production with direct URLs
5. Fix any issues

**Public Launch (Day 2):**
1. Enable feature flag
2. Announce on homepage banner: "🆕 Jelajahi 433 Instansi!"
3. Post to social media with directory link
4. Monitor analytics for 24 hours

**Viral Push (Day 3-7):**
1. Share interesting agency discoveries
2. Post Instagram Stories with QR codes
3. Encourage users to share agencies
4. Track share metrics

**Optimization (Week 2):**
1. Analyze search queries → improve keywords
2. Identify popular agencies → update carousel
3. Fix any UX friction points
4. A/B test copy variations

## Success Criteria (Launch Week)

**Must Have:**
- ✅ 433 agencies in production
- ✅ Directory loads <1s
- ✅ All filters work correctly
- ✅ Mobile responsive
- ✅ Share functionality works
- ✅ No console errors
- ✅ Tests pass

**Nice to Have:**
- 🎯 30% of users visit directory
- 🎯 10% of users share an agency
- 🎯 5% of traffic from deep links
- 🎯 Zero bug reports

**Delight Moments:**
- 🎉 Users discover agencies they didn't know existed
- 🎉 Users share agencies to friends
- 🎉 Users compliment the design
- 🎉 Users find the easter eggs

## What Makes This Amazing

**1. It's a Map, Not a Database**
- Visual, browsable, explorable
- Like Google Maps for government
- Discovery over search

**2. It's Shareable Like a Restaurant**
- "Check out this agency!"
- Instagram Story integration
- Deep links that work

**3. It's Delightful, Not Bureaucratic**
- Emojis, colors, animations
- Personality in copy
- Easter eggs for explorers

**4. It's Accessible to Everyone**
- Keyboard navigation
- Screen reader support
- Mobile-first design

**5. It Creates Viral Moments**
- "TIL this agency exists!"
- "I found the perfect agency for that!"
- "433 agencies?! 🤯"

This isn't just a directory. It's a civic infrastructure map that makes government discoverable, shareable, and dare we say... fun? 🗺️✨

