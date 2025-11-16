/**
 * Agency Data Enrichment Script
 * 
 * Automates collection of:
 * - Official websites
 * - Contact information (phone, email, address)
 * - Social media accounts
 * - Google Maps location
 * 
 * Usage: npm run enrich-agencies
 */

import { Agency } from '../bijak-mengeluh-webapp/src/types/agency';

// ============================================================================
// Configuration
// ============================================================================

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
const SERPER_API_KEY = process.env.SERPER_API_KEY || ''; // For Google search

// ============================================================================
// Search Functions
// ============================================================================

async function searchGoogle(query: string): Promise<string[]> {
  // Use Serper.dev API for Google search results
  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': SERPER_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query }),
  });
  
  const data = await response.json();
  return data.organic?.map((r: any) => r.link) || [];
}

async function findOfficialWebsite(agencyName: string): Promise<string | undefined> {
  const query = `${agencyName} site:go.id OR site:.go.id`;
  const results = await searchGoogle(query);
  return results[0]; // First .go.id result is usually official
}

async function findInstagram(agencyName: string): Promise<string | undefined> {
  // Search for Instagram profile
  const query = `${agencyName} site:instagram.com`;
  const results = await searchGoogle(query);
  
  if (results[0]) {
    const match = results[0].match(/instagram\.com\/([^\/\?]+)/);
    return match ? match[1] : undefined;
  }
  
  return undefined;
}

async function findTwitter(agencyName: string): Promise<string | undefined> {
  const query = `${agencyName} site:twitter.com OR site:x.com`;
  const results = await searchGoogle(query);
  
  if (results[0]) {
    const match = results[0].match(/(?:twitter|x)\.com\/([^\/\?]+)/);
    return match ? match[1] : undefined;
  }
  
  return undefined;
}

async function findFacebook(agencyName: string): Promise<string | undefined> {
  const query = `${agencyName} site:facebook.com`;
  const results = await searchGoogle(query);
  return results[0];
}

// ============================================================================
// Scraping Functions
// ============================================================================

async function scrapeContactInfo(url: string): Promise<{
  phone?: string;
  email?: string;
  address?: string;
}> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract phone numbers (Indonesian format)
    const phoneMatch = html.match(/(\+62|0)[0-9]{8,13}/);
    const phone = phoneMatch ? phoneMatch[0] : undefined;
    
    // Extract email addresses
    const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : undefined;
    
    // Extract address (basic pattern)
    const addressMatch = html.match(/Jl\.\s+[^<>\n]{10,100}/);
    const address = addressMatch ? addressMatch[0].trim() : undefined;
    
    return { phone, email, address };
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return {};
  }
}

// ============================================================================
// Google Maps Functions
// ============================================================================

async function geocodeAddress(address: string): Promise<{
  lat: number;
  lng: number;
  google_maps_url: string;
} | undefined> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.results?.[0]) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        google_maps_url: `https://maps.google.com/?q=${location.lat},${location.lng}`,
      };
    }
  } catch (error) {
    console.error(`Failed to geocode ${address}:`, error);
  }
  
  return undefined;
}

// ============================================================================
// Main Enrichment Function
// ============================================================================

export async function enrichAgency(agency: Agency): Promise<Agency> {
  console.log(`Enriching: ${agency.name}`);
  
  const enriched = { ...agency };
  
  // 1. Find official website
  console.log('  → Searching for website...');
  enriched.website = await findOfficialWebsite(agency.name);
  
  // 2. Scrape contact info from website
  if (enriched.website) {
    console.log('  → Scraping contact info...');
    const contact = await scrapeContactInfo(enriched.website);
    enriched.phone = contact.phone;
    enriched.email = contact.email;
    enriched.address = contact.address || enriched.address;
  }
  
  // 3. Find social media accounts
  console.log('  → Searching social media...');
  enriched.social = {
    instagram: await findInstagram(agency.name),
    twitter: await findTwitter(agency.name),
    facebook: await findFacebook(agency.name),
  };
  
  // 4. Geocode address
  if (enriched.address) {
    console.log('  → Geocoding address...');
    const location = await geocodeAddress(enriched.address);
    if (location) {
      enriched.coordinates = { lat: location.lat, lng: location.lng };
      enriched.google_maps_url = location.google_maps_url;
    }
  }
  
  // 5. Add metadata
  enriched.verified = false; // Requires manual verification
  enriched.last_updated = new Date().toISOString();
  enriched.data_source = 'automated_scraping';
  
  console.log('  ✓ Done\n');
  
  return enriched;
}

// ============================================================================
// Batch Processing
// ============================================================================

export async function enrichAgencies(agencies: Agency[]): Promise<Agency[]> {
  const enriched: Agency[] = [];
  
  for (const agency of agencies) {
    try {
      const result = await enrichAgency(agency);
      enriched.push(result);
      
      // Rate limiting: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to enrich ${agency.name}:`, error);
      enriched.push(agency); // Keep original if enrichment fails
    }
  }
  
  return enriched;
}

// ============================================================================
// Export to CSV for Manual Review
// ============================================================================

export function exportToCSV(agencies: Agency[]): string {
  const headers = [
    'agency_id',
    'name',
    'description',
    'address',
    'phone',
    'email',
    'website',
    'instagram',
    'twitter',
    'facebook',
    'verified',
  ];
  
  const rows = agencies.map(a => [
    a.agency_id,
    a.name,
    a.description || '',
    a.address || '',
    a.phone || '',
    a.email || '',
    a.website || '',
    a.social?.instagram || '',
    a.social?.twitter || '',
    a.social?.facebook || '',
    a.verified ? 'true' : 'false',
  ]);
  
  return [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
}

// ============================================================================
// CLI Runner
// ============================================================================

if (require.main === module) {
  (async () => {
    // Load existing agencies
    const response = await fetch('https://brain.bijakmengeluh.id/agencies?limit=500');
    const data = await response.json();
    const agencies: Agency[] = data.agencies || [];
    
    console.log(`Loaded ${agencies.length} agencies\n`);
    
    // Enrich first 10 as test
    const testAgencies = agencies.slice(0, 10);
    const enriched = await enrichAgencies(testAgencies);
    
    // Export to CSV
    const csv = exportToCSV(enriched);
    console.log('\n=== CSV Output ===\n');
    console.log(csv);
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('enriched-agencies.csv', csv);
    console.log('\n✓ Saved to enriched-agencies.csv');
  })();
}
