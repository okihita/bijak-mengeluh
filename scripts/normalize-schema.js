/**
 * Normalize existing agency data to new schema
 * 
 * Old schema has: social_media, phone, email, website
 * New schema needs: social { instagram, twitter, facebook }, phone, email, website, description
 */

const fs = require('fs');

async function main() {
  console.log('Fetching all agencies...\n');
  
  const response = await fetch('https://brain.bijakmengeluh.id/agencies?limit=500');
  const data = await response.json();
  const agencies = data.agencies || [];
  
  console.log(`Found ${agencies.length} agencies\n`);
  
  // Normalize schema
  const normalized = agencies.map(agency => {
    const result = {
      // Core fields (unchanged)
      agency_id: agency.agency_id,
      name: agency.name,
      province: agency.province,
      city: agency.city,
      level: agency.level,
      keywords: agency.keywords,
      emoji: agency.emoji,
      
      // NEW: Description (use reasoning field if available)
      description: agency.reasoning || undefined,
      
      // Contact (already exists)
      phone: agency.phone,
      email: agency.email,
      website: agency.website,
      
      // NEW: Social (normalize from social_media)
      social: agency.social_media ? {
        instagram: agency.social_media.instagram?.replace('@', ''),
        twitter: agency.social_media.twitter?.replace('@', ''),
        facebook: agency.social_media.facebook,
      } : undefined,
      
      // Metadata
      verified: agency.confidence >= 0.8, // Consider high confidence as verified
      last_updated: agency.updated_at || new Date().toISOString(),
      data_source: 'legacy_migration',
    };
    
    // Remove undefined fields
    Object.keys(result).forEach(key => {
      if (result[key] === undefined) delete result[key];
    });
    
    return result;
  });
  
  // Stats
  const withPhone = normalized.filter(a => a.phone).length;
  const withEmail = normalized.filter(a => a.email).length;
  const withWebsite = normalized.filter(a => a.website).length;
  const withSocial = normalized.filter(a => a.social).length;
  const withDescription = normalized.filter(a => a.description).length;
  const verified = normalized.filter(a => a.verified).length;
  
  console.log('=== Normalization Summary ===');
  console.log(`Total agencies: ${normalized.length}`);
  console.log(`With phone: ${withPhone} (${Math.round(withPhone/normalized.length*100)}%)`);
  console.log(`With email: ${withEmail} (${Math.round(withEmail/normalized.length*100)}%)`);
  console.log(`With website: ${withWebsite} (${Math.round(withWebsite/normalized.length*100)}%)`);
  console.log(`With social media: ${withSocial} (${Math.round(withSocial/normalized.length*100)}%)`);
  console.log(`With description: ${withDescription} (${Math.round(withDescription/normalized.length*100)}%)`);
  console.log(`Verified: ${verified} (${Math.round(verified/normalized.length*100)}%)`);
  
  // Save normalized data
  fs.writeFileSync('normalized-agencies.json', JSON.stringify(normalized, null, 2));
  console.log('\n✓ Saved to normalized-agencies.json');
  
  // Export to CSV for review
  const headers = [
    'agency_id',
    'name',
    'province',
    'city',
    'phone',
    'email',
    'website',
    'instagram',
    'twitter',
    'facebook',
    'verified',
  ];
  
  const rows = normalized.map(a => [
    a.agency_id,
    a.name,
    a.province || '',
    a.city || '',
    a.phone || '',
    a.email || '',
    a.website || '',
    a.social?.instagram || '',
    a.social?.twitter || '',
    a.social?.facebook || '',
    a.verified ? 'true' : 'false',
  ]);
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  
  fs.writeFileSync('normalized-agencies.csv', csv);
  console.log('✓ Saved to normalized-agencies.csv');
  
  // Show sample
  console.log('\n=== Sample Normalized Agency ===');
  console.log(JSON.stringify(normalized[0], null, 2));
}

main().catch(console.error);
