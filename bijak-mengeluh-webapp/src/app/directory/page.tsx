'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Agency } from '@/types/agency';
import { TopBar } from '@/components/top-bar';
import { BottomNavigation } from '@/components/bottom-navigation';

const PROVINCES = ['DKI Jakarta', 'West Java', 'Central Java', 'East Java', 'Banten'];

export default function DirectoryPage() {
  const router = useRouter();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (province) params.set('province', province);
    if (search) params.set('search', search);
    params.set('limit', '50');

    setLoading(true);
    fetch(`https://brain.bijakmengeluh.id/agencies?${params}`)
      .then(r => r.json())
      .then(data => {
        setAgencies(data.agencies || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [province, search]);

  const handleSelect = (agency: Agency) => {
    localStorage.setItem('selectedAgency', JSON.stringify(agency));
    router.push('/');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <TopBar />
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 dark:text-white">🗺️ Direktori Instansi</h1>
              <p className="text-gray-600 dark:text-gray-400">Jelajahi instansi pemerintah</p>
            </div>

            <input
              type="text"
              placeholder="Cari instansi..."
              className="w-full p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setProvince('')}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    !province 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-gray-300'
                  }`}
                >
                  Semua
                </button>
                {PROVINCES.map(p => (
                  <button
                    key={p}
                    onClick={() => setProvince(p)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      province === p 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔄</div>
                <p className="dark:text-gray-400">Memuat...</p>
              </div>
            ) : agencies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencies.map(agency => (
                  <div
                    key={agency.agency_id}
                    className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700"
                    onClick={() => handleSelect(agency)}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{agency.emoji || '🏛️'}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold dark:text-white">{agency.name}</h3>
                        {agency.city && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">📍 {agency.city}</p>
                        )}
                      </div>
                    </div>
                    {agency.keywords && agency.keywords.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        {agency.keywords.slice(0, 3).join(', ')}
                      </p>
                    )}
                    <button
                      className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(agency);
                      }}
                    >
                      Gunakan Instansi Ini
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-gray-600 dark:text-gray-400">Tidak ada instansi yang cocok</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}
