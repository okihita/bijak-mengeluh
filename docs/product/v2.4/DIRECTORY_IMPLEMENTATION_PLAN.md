# Directory Page: Technical Implementation Plan

**Based on:** dirspec.md v1.0  
**Date:** 2025-11-16  
**Status:** Ready for implementation

---

## Overview

This plan translates the UX specification into actionable development tasks while maintaining:
- ✅ Current brand (orange primary, typography system)
- ✅ Tech stack (Next.js, TypeScript, Tailwind, Radix UI)
- ✅ Implementation guidelines (TYPOGRAPHY.md, IMPLEMENTATION_GUIDE.md)
- ✅ Mobile-first approach (375px minimum)

---

## Phase 1: Data Layer (2-3 hours)

### 1.1 Create Problem Categories Mapping

**File:** `src/lib/problem-categories.ts`

```typescript
export const PROBLEM_CATEGORIES = [
  {
    id: 'infrastructure',
    label: 'Infrastruktur & Transportasi',
    emoji: '🏗️',
    keywords: ['jalan', 'rusak', 'lubang', 'aspal', 'jembatan', 'parkir', 'transportasi', 'macet'],
  },
  {
    id: 'environment',
    label: 'Lingkungan & Kebersihan',
    emoji: '🌳',
    keywords: ['sampah', 'polusi', 'pohon', 'taman', 'banjir', 'sungai', 'kebersihan'],
  },
  {
    id: 'health',
    label: 'Kesehatan & Sosial',
    emoji: '🏥',
    keywords: ['rumah sakit', 'puskesmas', 'bpjs', 'darurat', 'bantuan sosial', 'kesehatan'],
  },
  {
    id: 'civil',
    label: 'Kependudukan & Dokumen',
    emoji: '📄',
    keywords: ['ktp', 'kk', 'akta', 'surat', 'identitas', 'nikah', 'catatan sipil'],
  },
  {
    id: 'security',
    label: 'Keamanan & Ketertiban',
    emoji: '👮',
    keywords: ['polisi', 'satpol pp', 'keamanan', 'ketertiban', 'razia'],
  },
  {
    id: 'other',
    label: 'Layanan Lainnya',
    emoji: '💡',
    keywords: [],
  },
] as const;
```

### 1.2 Create Synonym Map

**File:** `src/lib/synonyms.ts`

```typescript
export const SYNONYM_MAP: Record<string, string[]> = {
  // Infrastructure
  'aspal bolong': ['jalan', 'rusak'],
  'jalanan': ['jalan'],
  'trotoar': ['jalan', 'pejalan kaki'],
  'lampu jalan': ['jalan', 'penerangan'],
  
  // Environment
  'sampah': ['kebersihan', 'lingkungan'],
  'kotor': ['kebersihan'],
  'bau': ['kebersihan', 'lingkungan'],
  
  // Civil
  'ktp': ['kependudukan', 'identitas', 'catatan sipil'],
  'kk': ['kependudukan', 'kartu keluarga'],
  'akta': ['catatan sipil', 'kependudukan'],
  
  // Add more as needed
};
```

### 1.3 Create Search Utility

**File:** `src/lib/search-utils.ts`

```typescript
import { Agency } from '@/types/agency';
import { SYNONYM_MAP } from './synonyms';
import { PROBLEM_CATEGORIES } from './problem-categories';

export function searchAgencies(query: string, agencies: Agency[]) {
  const queryLower = query.toLowerCase().trim();
  
  // 1. Check synonym map
  const mappedKeywords = SYNONYM_MAP[queryLower] || [queryLower];
  
  // 2. Search in agency names and keywords
  return agencies.filter(agency => {
    // Match agency name
    if (agency.name.toLowerCase().includes(queryLower)) return true;
    
    // Match keywords (including synonyms)
    if (agency.keywords) {
      return mappedKeywords.some(keyword =>
        agency.keywords!.some(k => k.toLowerCase().includes(keyword))
      );
    }
    
    return false;
  });
}

export function getAutocomplete(query: string, agencies: Agency[]) {
  const queryLower = query.toLowerCase().trim();
  
  if (queryLower.length < 3) return { problems: [], agencies: [] };
  
  // Problem suggestions (from categories)
  const problems = PROBLEM_CATEGORIES
    .flatMap(cat => cat.keywords.map(k => ({ keyword: k, category: cat.label })))
    .filter(({ keyword }) => keyword.includes(queryLower))
    .slice(0, 3);
  
  // Agency suggestions
  const agencySuggestions = agencies
    .filter(a => a.name.toLowerCase().includes(queryLower))
    .slice(0, 3);
  
  return { problems, agencies: agencySuggestions };
}
```

---

## Phase 2: UI Components (4-5 hours)

### 2.1 Agency Card Component

**File:** `src/components/agency-card.tsx`

```typescript
import { Agency } from '@/types/agency';

export function AgencyCard({ agency }: { agency: Agency }) {
  // Parse agency name to extract function
  const parseFunction = (name: string) => {
    return name
      .replace(/^(Dinas|Kementerian|Badan)\s+/i, '')
      .replace(/\s+(Kota|Kabupaten|Provinsi)\s+.+$/i, '')
      .trim();
  };

  const functionName = parseFunction(agency.name);
  const keywords = agency.keywords?.slice(0, 4).join(', ') || '';
  const location = agency.city || agency.province;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* Row 1: Emoji + Title */}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-3xl">{agency.emoji || '🏛️'}</span>
        <h3 className="text-base sm:text-lg font-semibold dark:text-white flex-1">
          {functionName}
        </h3>
      </div>
      
      {/* Row 2: Keywords */}
      {keywords && (
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
          Menangani: {keywords}
        </p>
      )}
      
      {/* Row 3: Level + Location */}
      <div className="flex items-center gap-2 flex-wrap">
        {agency.level && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            agency.level === 'national'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : agency.level === 'provincial'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
          }`}>
            {agency.level === 'national' ? 'Nasional' : agency.level === 'provincial' ? 'Provinsi' : 'Kota'}
          </span>
        )}
        {location && (
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            📍 {location}
          </span>
        )}
      </div>
    </div>
  );
}
```

### 2.2 Search Bar with Autocomplete

**File:** `src/components/directory-search.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getAutocomplete } from '@/lib/search-utils';
import { Agency } from '@/types/agency';

export function DirectorySearch({ 
  agencies, 
  onSearch 
}: { 
  agencies: Agency[]; 
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      const results = getAutocomplete(query, agencies);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, agencies]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari masalah atau nama agensi..."
          className="w-full h-12 pl-12 pr-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
        />
      </div>

      {/* Autocomplete Dropdown */}
      {showSuggestions && (suggestions.problems.length > 0 || suggestions.agencies.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50">
          {/* Problem Suggestions */}
          {suggestions.problems.length > 0 && (
            <div className="p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-1">Masalah</p>
              {suggestions.problems.map((p: any, i: number) => (
                <button
                  key={i}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm"
                  onClick={() => {
                    setQuery(p.keyword);
                    onSearch(p.keyword);
                    setShowSuggestions(false);
                  }}
                >
                  🔍 {p.keyword}
                </button>
              ))}
            </div>
          )}

          {/* Agency Suggestions */}
          {suggestions.agencies.length > 0 && (
            <div className="p-2 border-t dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-1">Agensi</p>
              {suggestions.agencies.map((a: Agency) => (
                <button
                  key={a.agency_id}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm"
                  onClick={() => {
                    setQuery(a.name);
                    onSearch(a.name);
                    setShowSuggestions(false);
                  }}
                >
                  {a.emoji || '🏛️'} {a.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

### 2.3 Filter Bottom Sheet

**File:** `src/components/filter-sheet.tsx`

```typescript
'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const PROVINCES = ['DKI Jakarta', 'West Java', 'Central Java', 'East Java', 'Banten'];

export function FilterSheet({ 
  open, 
  onOpenChange, 
  filters, 
  onFilterChange 
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: { province: string; level: string };
  onFilterChange: (filters: { province: string; level: string }) => void;
}) {
  const [expandedSection, setExpandedSection] = useState<'location' | 'level' | null>('location');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bottom-0 top-auto translate-y-0 rounded-t-2xl rounded-b-none">
        <div className="space-y-4">
          {/* Location Accordion */}
          <div>
            <button
              className="w-full flex items-center justify-between py-2"
              onClick={() => setExpandedSection(expandedSection === 'location' ? null : 'location')}
            >
              <span className="font-medium">Lokasi</span>
              {expandedSection === 'location' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {expandedSection === 'location' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Provinsi</label>
                  <select
                    value={filters.province}
                    onChange={(e) => onFilterChange({ ...filters, province: e.target.value })}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-sm"
                  >
                    <option value="">Semua Provinsi</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Level Accordion */}
          <div className="border-t pt-4">
            <button
              className="w-full flex items-center justify-between py-2"
              onClick={() => setExpandedSection(expandedSection === 'level' ? null : 'level')}
            >
              <span className="font-medium">Tingkat Agensi</span>
              {expandedSection === 'level' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {expandedSection === 'level' && (
              <div className="flex gap-2 flex-wrap pt-2">
                {['', 'national', 'provincial', 'city'].map(level => (
                  <button
                    key={level}
                    onClick={() => onFilterChange({ ...filters, level })}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      filters.level === level
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {level === '' ? 'Semua' : level === 'national' ? 'Nasional' : level === 'provincial' ? 'Provinsi' : 'Kota'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Terapkan
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Phase 3: Page Implementation (3-4 hours)

### 3.1 Directory Home (Default View)

**File:** `src/app/directory/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { TopBar } from '@/components/top-bar';
import { BottomNavigation } from '@/components/bottom-navigation';
import { DirectorySearch } from '@/components/directory-search';
import { AgencyCard } from '@/components/agency-card';
import { FilterSheet } from '@/components/filter-sheet';
import { PROBLEM_CATEGORIES } from '@/lib/problem-categories';
import { searchAgencies } from '@/lib/search-utils';
import { Agency } from '@/types/agency';
import Link from 'next/link';

export default function DirectoryPage() {
  const [allAgencies, setAllAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ province: '', level: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'default' | 'results'>('default');

  // Fetch agencies
  useEffect(() => {
    fetch('https://brain.bijakmengeluh.id/agencies?limit=500')
      .then(r => r.json())
      .then(data => {
        setAllAgencies(data.agencies || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply search and filters
  useEffect(() => {
    let results = allAgencies;

    // Search
    if (searchQuery) {
      results = searchAgencies(searchQuery, results);
    }

    // Filter by level
    if (filters.level) {
      results = results.filter(a => a.level === filters.level);
    }

    // Filter by province
    if (filters.province) {
      results = results.filter(a => a.province === filters.province);
    }

    setFilteredAgencies(results);
  }, [searchQuery, filters, allAgencies]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setViewMode('results');
  };

  const handleCategoryClick = (categoryId: string) => {
    const category = PROBLEM_CATEGORIES.find(c => c.id === categoryId);
    if (category && category.keywords.length > 0) {
      setSearchQuery(category.keywords[0]);
      setViewMode('results');
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <TopBar />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <TopBar />

          {/* Default View */}
          {viewMode === 'default' && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🗺️ Direktori Instansi</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Temukan instansi yang tepat untuk keluhan Anda
                </p>
              </div>

              <DirectorySearch agencies={allAgencies} onSearch={handleSearch} />

              {/* Browse by Topic */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Telusuri Berdasarkan Topik</h2>
                <div className="grid grid-cols-3 gap-3">
                  {PROBLEM_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors"
                    >
                      <span className="text-3xl">{cat.emoji}</span>
                      <span className="text-xs sm:text-sm text-center">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse All Link */}
              <div className="text-center">
                <button
                  onClick={() => setViewMode('results')}
                  className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-500"
                >
                  Atau lihat semua {allAgencies.length} agensi (A-Z) →
                </button>
              </div>
            </>
          )}

          {/* Results View */}
          {viewMode === 'results' && (
            <>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('default')}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  ← Kembali
                </button>
                <DirectorySearch agencies={allAgencies} onSearch={handleSearch} />
                <button
                  onClick={() => setShowFilters(true)}
                  className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              {/* Results */}
              {filteredAgencies.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredAgencies.length} agensi ditemukan
                  </p>
                  {filteredAgencies.map(agency => (
                    <AgencyCard key={agency.agency_id} agency={agency} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="text-lg font-semibold mb-2">Hasil tidak ditemukan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Coba periksa ejaan atau gunakan kata kunci yang lebih umum
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({ province: '', level: '' });
                      setViewMode('default');
                    }}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    Kembali ke halaman utama
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <FilterSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFilterChange={setFilters}
      />

      <BottomNavigation />
    </>
  );
}
```

---

## Implementation Checklist

### MVP (Must-Have)
- [ ] Create problem categories mapping
- [ ] Create synonym map (start with 20-30 common terms)
- [ ] Implement search utility with synonym support
- [ ] Build AgencyCard component with parsed name
- [ ] Build DirectorySearch with autocomplete
- [ ] Build FilterSheet with bottom sheet pattern
- [ ] Implement default view with category grid
- [ ] Implement results view with infinite scroll
- [ ] Add skeleton loading states
- [ ] Add empty state with actionable fallback
- [ ] Test on 375px mobile width
- [ ] Verify WCAG 2.1 AA compliance (44px touch targets, 4.5:1 contrast)

### v2 (Should-Have)
- [ ] Add fuzzy matching for typos
- [ ] Expand synonym map to 100+ terms
- [ ] Add agency detail page
- [ ] Add "Recent Searches" localStorage
- [ ] Improve autocomplete with highlighting

### Future (Nice-to-Have)
- [ ] Geolocation "Near Me" filter
- [ ] "Mulai Laporan" button on detail page
- [ ] Saved agencies feature

---

## Brand Compliance

- ✅ Orange primary color (`bg-orange-500`)
- ✅ Typography system (text-sm sm:text-base pattern)
- ✅ Spacing hierarchy (2/3/4/6 pattern)
- ✅ Dark mode support
- ✅ Mobile-first responsive
- ✅ Radix UI components (Dialog for bottom sheet)
- ✅ Consistent with TYPOGRAPHY.md and IMPLEMENTATION_GUIDE.md

---

## Testing Requirements

1. **Search Accuracy:**
   - "jalan rusak" → Returns Dinas PU
   - "aspal bolong" → Returns Dinas PU (synonym)
   - "ktp" → Returns Dinas Kependudukan (synonym)

2. **Filter Accuracy:**
   - "Nasional" level → Shows only 23 national agencies
   - "DKI Jakarta" province → Shows 98 agencies
   - Combined filters work correctly

3. **Mobile UX:**
   - All touch targets ≥44px
   - Bottom sheet slides smoothly
   - Autocomplete doesn't overflow
   - Keyboard doesn't cover input

4. **Accessibility:**
   - Screen reader can navigate
   - Contrast ratios meet WCAG AA
   - Focus states visible
   - ARIA labels present

---

**Ready to implement. Start with Phase 1 (Data Layer).**
