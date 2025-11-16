'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Agency } from '@/types/agency';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🗺️ Direktori Instansi</h1>
          <p className="text-gray-600">Jelajahi instansi pemerintah</p>
        </div>

        <input
          type="text"
          placeholder="Cari instansi..."
          className="w-full p-4 border rounded-lg mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setProvince('')}
              className={`px-4 py-2 rounded-full ${!province ? 'bg-blue-600 text-white' : 'bg-white border'}`}
            >
              Semua
            </button>
            {PROVINCES.map(p => (
              <button
                key={p}
                onClick={() => setProvince(p)}
                className={`px-4 py-2 rounded-full ${province === p ? 'bg-blue-600 text-white' : 'bg-white border'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔄</div>
            <p>Memuat...</p>
          </div>
        ) : agencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agencies.map(agency => (
              <div
                key={agency.agency_id}
                className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer bg-white"
                onClick={() => handleSelect(agency)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{agency.emoji || '🏛️'}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{agency.name}</h3>
                    {agency.city && <p className="text-sm text-gray-600">📍 {agency.city}</p>}
                  </div>
                </div>
                {agency.keywords && agency.keywords.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {agency.keywords.slice(0, 3).join(', ')}
                  </p>
                )}
                <button
                  className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
            <p className="text-gray-600">Tidak ada instansi yang cocok</p>
          </div>
        )}
      </div>
    </div>
  );
}
