'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Agency } from '@/types/agency';
import { TopBar } from '@/components/top-bar';
import { BottomNavigation } from '@/components/bottom-navigation';

export default function AgencyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://brain.bijakmengeluh.id/agencies?limit=500')
      .then(r => r.json())
      .then(data => {
        const found = data.agencies?.find((a: Agency) => a.agency_id === params.id);
        setAgency(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <>
        <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
          <div className="w-full max-w-3xl mx-auto text-center py-12">
            <div className="text-4xl mb-4">🔄</div>
            <p className="text-sm sm:text-base dark:text-gray-400">Memuat...</p>
          </div>
        </main>
        <BottomNavigation />
      </>
    );
  }

  if (!agency) {
    return (
      <>
        <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
          <div className="w-full max-w-3xl mx-auto text-center py-12">
            <div className="text-4xl mb-4">❌</div>
            <p className="text-sm sm:text-base dark:text-gray-400 mb-4">Instansi tidak ditemukan</p>
            <button
              onClick={() => router.push('/directory')}
              className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
            >
              Kembali ke direktori
            </button>
          </div>
        </main>
        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <TopBar />
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            ← Kembali
          </button>

          {/* Header */}
          <div className="flex items-start gap-4">
            <span className="text-5xl">{agency.emoji || '🏛️'}</span>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold dark:text-white mb-2">
                {agency.name}
              </h1>
              {(agency.city || agency.province) && (
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  📍 {agency.city || agency.province}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          {agency.description && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm sm:text-base dark:text-gray-200">{agency.description}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Kontak</h2>
            
            {agency.phone && (
              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Telepon</p>
                  <a
                    href={`tel:${agency.phone}`}
                    className="text-sm sm:text-base text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    {agency.phone}
                  </a>
                </div>
              </div>
            )}

            {agency.phone_alt && (
              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Telepon Alternatif</p>
                  <a
                    href={`tel:${agency.phone_alt}`}
                    className="text-sm sm:text-base text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    {agency.phone_alt}
                  </a>
                </div>
              </div>
            )}

            {agency.email && (
              <div className="flex items-start gap-3">
                <span className="text-xl">✉️</span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <a
                    href={`mailto:${agency.email}`}
                    className="text-sm sm:text-base text-orange-600 dark:text-orange-400 hover:underline break-all"
                  >
                    {agency.email}
                  </a>
                </div>
              </div>
            )}

            {agency.website && (
              <div className="flex items-start gap-3">
                <span className="text-xl">🌐</span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Website</p>
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-orange-600 dark:text-orange-400 hover:underline break-all"
                  >
                    {agency.website}
                  </a>
                </div>
              </div>
            )}

            {!agency.phone && !agency.email && !agency.website && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Informasi kontak belum tersedia
              </p>
            )}
          </div>

          {/* Social Media */}
          {agency.social && Object.values(agency.social).some(v => v) && (
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Media Sosial</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {agency.social.instagram && (
                  <a
                    href={`https://instagram.com/${agency.social.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <span className="text-2xl">📷</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Instagram</p>
                      <p className="text-sm dark:text-white truncate">@{agency.social.instagram.replace('@', '')}</p>
                    </div>
                  </a>
                )}

                {agency.social.twitter && (
                  <a
                    href={`https://twitter.com/${agency.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <span className="text-2xl">🐦</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Twitter</p>
                      <p className="text-sm dark:text-white truncate">@{agency.social.twitter.replace('@', '')}</p>
                    </div>
                  </a>
                )}

                {agency.social.facebook && (
                  <a
                    href={agency.social.facebook.startsWith('http') ? agency.social.facebook : `https://facebook.com/${agency.social.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <span className="text-2xl">👥</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Facebook</p>
                      <p className="text-sm dark:text-white truncate">{agency.social.facebook}</p>
                    </div>
                  </a>
                )}

                {agency.social.youtube && (
                  <a
                    href={agency.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <span className="text-2xl">📺</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 dark:text-gray-400">YouTube</p>
                      <p className="text-sm dark:text-white truncate">YouTube</p>
                    </div>
                  </a>
                )}

                {agency.social.tiktok && (
                  <a
                    href={`https://tiktok.com/@${agency.social.tiktok.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                  >
                    <span className="text-2xl">🎵</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 dark:text-gray-400">TikTok</p>
                      <p className="text-sm dark:text-white truncate">@{agency.social.tiktok.replace('@', '')}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          {(agency.address || agency.google_maps_url) && (
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Lokasi</h2>
              
              {agency.address && (
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <p className="text-sm sm:text-base dark:text-gray-200">{agency.address}</p>
                </div>
              )}

              {agency.google_maps_url && (
                <a
                  href={agency.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
                >
                  🗺️ Buka di Google Maps
                </a>
              )}
            </div>
          )}

          {/* Keywords */}
          {agency.keywords && agency.keywords.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold dark:text-white">Layanan</h2>
              <div className="flex flex-wrap gap-2">
                {agency.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </>
  );
}
