'use client';

import { useState, useEffect } from 'react';
import type { Agency } from '@/types/agency';
import { TopBar } from '@/components/top-bar';
import { BottomNavigation } from '@/components/bottom-navigation';
import { PROBLEM_CATEGORIES } from '@/lib/problem-categories';
import { searchAgencies, getAutocomplete } from '@/lib/search-utils';

const REGIONS = [
  { id: 'all', label: 'Semua Wilayah', emoji: '🇮🇩' },
  { id: 'national', label: 'Nasional', emoji: '🏛️' },
  { id: 'divider', label: '──────────', emoji: '', disabled: true },
  { id: 'aceh', label: 'Aceh', emoji: '🏙️', province: 'Aceh' },
  { id: 'bali', label: 'Bali', emoji: '🏙️', province: 'Bali' },
  { id: 'banten', label: 'Banten', emoji: '🏙️', province: 'Banten' },
  { id: 'bengkulu', label: 'Bengkulu', emoji: '🏙️', province: 'Bengkulu' },
  { id: 'central-java', label: 'Jawa Tengah', emoji: '🏙️', province: 'Central Java' },
  { id: 'central-kalimantan', label: 'Kalimantan Tengah', emoji: '🏙️', province: 'Central Kalimantan' },
  { id: 'central-sulawesi', label: 'Sulawesi Tengah', emoji: '🏙️', province: 'Central Sulawesi' },
  { id: 'dki-jakarta', label: 'DKI Jakarta', emoji: '🏙️', province: 'DKI Jakarta' },
  { id: 'east-java', label: 'Jawa Timur', emoji: '🏙️', province: 'East Java' },
  { id: 'east-kalimantan', label: 'Kalimantan Timur', emoji: '🏙️', province: 'East Kalimantan' },
  { id: 'east-nusa-tenggara', label: 'Nusa Tenggara Timur', emoji: '🏙️', province: 'East Nusa Tenggara' },
  { id: 'gorontalo', label: 'Gorontalo', emoji: '🏙️', province: 'Gorontalo' },
  { id: 'jambi', label: 'Jambi', emoji: '🏙️', province: 'Jambi' },
  { id: 'lampung', label: 'Lampung', emoji: '🏙️', province: 'Lampung' },
  { id: 'maluku', label: 'Maluku', emoji: '🏙️', province: 'Maluku' },
  { id: 'north-kalimantan', label: 'Kalimantan Utara', emoji: '🏙️', province: 'North Kalimantan' },
  { id: 'north-maluku', label: 'Maluku Utara', emoji: '🏙️', province: 'North Maluku' },
  { id: 'north-sulawesi', label: 'Sulawesi Utara', emoji: '🏙️', province: 'North Sulawesi' },
  { id: 'north-sumatra', label: 'Sumatera Utara', emoji: '🏙️', province: 'North Sumatra' },
  { id: 'papua', label: 'Papua', emoji: '🏙️', province: 'Papua' },
  { id: 'riau', label: 'Riau', emoji: '🏙️', province: 'Riau' },
  { id: 'riau-islands', label: 'Kepulauan Riau', emoji: '🏙️', province: 'Riau Islands' },
  { id: 'south-kalimantan', label: 'Kalimantan Selatan', emoji: '🏙️', province: 'South Kalimantan' },
  { id: 'south-sulawesi', label: 'Sulawesi Selatan', emoji: '🏙️', province: 'South Sulawesi' },
  { id: 'south-sumatra', label: 'Sumatera Selatan', emoji: '🏙️', province: 'South Sumatra' },
  { id: 'southeast-sulawesi', label: 'Sulawesi Tenggara', emoji: '🏙️', province: 'Southeast Sulawesi' },
  { id: 'west-java', label: 'Jawa Barat', emoji: '🏙️', province: 'West Java' },
  { id: 'west-kalimantan', label: 'Kalimantan Barat', emoji: '🏙️', province: 'West Kalimantan' },
  { id: 'west-nusa-tenggara', label: 'Nusa Tenggara Barat', emoji: '🏙️', province: 'West Nusa Tenggara' },
  { id: 'west-papua', label: 'Papua Barat', emoji: '🏙️', province: 'West Papua' },
  { id: 'west-sulawesi', label: 'Sulawesi Barat', emoji: '🏙️', province: 'West Sulawesi' },
  { id: 'west-sumatra', label: 'Sumatera Barat', emoji: '🏙️', province: 'West Sumatra' },
  { id: 'yogyakarta', label: 'DI Yogyakarta', emoji: '🏙️', province: 'Yogyakarta' },
];

export default function DirectoryPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filtered, setFiltered] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ text: string; emoji: string; type: string }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  useEffect(() => {
    fetch('https://brain.bijakmengeluh.id/agencies?limit=500')
      .then(r => r.json())
      .then(data => {
        const all = data.agencies || [];
        setAgencies(all);
        setFiltered(all);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let results = agencies;

    // Apply region filter
    if (selectedRegion !== 'all') {
      const region = REGIONS.find(r => r.id === selectedRegion);
      if (region?.id === 'national') {
        results = results.filter(a => a.level === 'national');
      } else if (region?.province) {
        results = results.filter(a => a.province === region.province);
      }
    }

    // Apply category filter
    if (selectedCategory) {
      const cat = PROBLEM_CATEGORIES.find(c => c.id === selectedCategory);
      if (cat) {
        results = results.filter(a =>
          a.keywords?.some(k => cat.keywords.some(ck => k.toLowerCase().includes(ck)))
        );
      }
    }

    // Apply search query
    if (query.trim()) {
      setSuggestions(getAutocomplete(query));
      results = searchAgencies(query, results);
    } else {
      setSuggestions([]);
    }

    setFiltered(results);
  }, [query, agencies, selectedCategory, selectedRegion]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setQuery('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
    setSuggestions([]);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedRegion('all');
    setSuggestions([]);
  };

  const activeCategory = selectedCategory ? PROBLEM_CATEGORIES.find(c => c.id === selectedCategory) : null;
  const activeRegion = REGIONS.find(r => r.id === selectedRegion);

  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <TopBar />
          
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">🗺️ Direktori Instansi</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Cari berdasarkan masalah, bukan nama instansi
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Coba: jalan rusak, sampah, ktp..."
              className="w-full p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s.text)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-sm sm:text-base"
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span className="dark:text-white">{s.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Region Dropdown */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Wilayah:
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
            >
              {REGIONS.map(region => (
                <option 
                  key={region.id} 
                  value={region.id}
                  disabled={region.disabled}
                >
                  {region.emoji} {region.label}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Kategori masalah:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROBLEM_CATEGORIES.filter(c => c.id !== 'other').map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`p-4 border rounded-lg transition-colors text-left ${
                    selectedCategory === cat.id
                      ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'
                      : 'bg-white dark:bg-gray-800 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="text-xs sm:text-sm font-medium dark:text-white">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(query || selectedCategory || selectedRegion !== 'all') && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Filter:
              </span>
              {selectedRegion !== 'all' && activeRegion && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm flex items-center gap-1">
                  {activeRegion.emoji} {activeRegion.label}
                </span>
              )}
              {activeCategory && (
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-xs sm:text-sm flex items-center gap-1">
                  {activeCategory.emoji} {activeCategory.label}
                </span>
              )}
              {query && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm">
                  &quot;{query}&quot;
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 hover:underline"
              >
                Hapus semua
              </button>
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔄</div>
              <p className="text-sm sm:text-base dark:text-gray-400">Memuat...</p>
            </div>
          ) : filtered.length > 0 ? (
            <>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {filtered.length} instansi ditemukan
              </p>
              <div className="space-y-3">
                {filtered.map(agency => (
                  <button
                    key={agency.agency_id}
                    onClick={() => window.location.href = `/directory/${agency.agency_id}`}
                    className="w-full border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl sm:text-3xl">{agency.emoji || '🏛️'}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold dark:text-white text-sm sm:text-base mb-1">
                          {agency.name}
                        </h3>
                        {(agency.city || agency.province) && (
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                            📍 {agency.city || agency.province}
                          </p>
                        )}
                        {agency.keywords && agency.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {agency.keywords.slice(0, 3).map((k, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Contact preview */}
                        {(agency.phone || agency.email || agency.website) && (
                          <div className="flex gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {agency.phone && <span>📞</span>}
                            {agency.email && <span>✉️</span>}
                            {agency.website && <span>🌐</span>}
                          </div>
                        )}
                      </div>
                      <span className="text-gray-400 dark:text-gray-600">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                Tidak ada instansi yang cocok
              </p>
              <button
                onClick={clearFilters}
                className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
              >
                Lihat semua instansi
              </button>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
