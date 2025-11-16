/**
 * Validate database schema and data quality
 */

async function main() {
  console.log('Fetching agencies from API...\n');
  
  const response = await fetch('https://brain.bijakmengeluh.id/agencies?limit=500');
  const data = await response.json();
  const agencies = data.agencies || [];
  
  console.log(`Total agencies: ${agencies.length}\n`);
  
  // Check schema fields
  const stats = {
    total: agencies.length,
    with_phone: 0,
    with_email: 0,
    with_website: 0,
    with_social: 0,
    with_instagram: 0,
    with_twitter: 0,
    with_facebook: 0,
    with_description: 0,
    with_address: 0,
    with_coordinates: 0,
    verified: 0,
  };
  
  agencies.forEach(a => {
    if (a.phone) stats.with_phone++;
    if (a.email) stats.with_email++;
    if (a.website) stats.with_website++;
    if (a.social_media || a.social) stats.with_social++;
    if (a.social_media?.instagram || a.social?.instagram) stats.with_instagram++;
    if (a.social_media?.twitter || a.social?.twitter) stats.with_twitter++;
    if (a.social_media?.facebook || a.social?.facebook) stats.with_facebook++;
    if (a.description || a.reasoning) stats.with_description++;
    if (a.address) stats.with_address++;
    if (a.coordinates) stats.with_coordinates++;
    if (a.verified || a.confidence >= 0.8) stats.verified++;
  });
  
  console.log('=== Database Validation ===\n');
  console.log(`Total: ${stats.total}`);
  console.log(`Phone: ${stats.with_phone} (${Math.round(stats.with_phone/stats.total*100)}%)`);
  console.log(`Email: ${stats.with_email} (${Math.round(stats.with_email/stats.total*100)}%)`);
  console.log(`Website: ${stats.with_website} (${Math.round(stats.with_website/stats.total*100)}%)`);
  console.log(`Social Media: ${stats.with_social} (${Math.round(stats.with_social/stats.total*100)}%)`);
  console.log(`  - Instagram: ${stats.with_instagram} (${Math.round(stats.with_instagram/stats.total*100)}%)`);
  console.log(`  - Twitter: ${stats.with_twitter} (${Math.round(stats.with_twitter/stats.total*100)}%)`);
  console.log(`  - Facebook: ${stats.with_facebook} (${Math.round(stats.with_facebook/stats.total*100)}%)`);
  console.log(`Description: ${stats.with_description} (${Math.round(stats.with_description/stats.total*100)}%)`);
  console.log(`Address: ${stats.with_address} (${Math.round(stats.with_address/stats.total*100)}%)`);
  console.log(`Coordinates: ${stats.with_coordinates} (${Math.round(stats.with_coordinates/stats.total*100)}%)`);
  console.log(`Verified: ${stats.verified} (${Math.round(stats.verified/stats.total*100)}%)`);
  
  // Sample agency
  console.log('\n=== Sample Agency ===');
  const sample = agencies.find(a => a.phone && a.email && a.website);
  if (sample) {
    console.log(JSON.stringify({
      name: sample.name,
      phone: sample.phone,
      email: sample.email,
      website: sample.website,
      social: sample.social_media || sample.social,
    }, null, 2));
  }
}

main().catch(console.error);
