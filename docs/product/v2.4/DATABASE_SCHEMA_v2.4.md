# Database Schema Update v2.4

**Purpose:** Expand agency data to include contact information, social media, and location  
**Date:** November 16, 2025  
**Status:** 🔄 Planning

---

## Current Schema

```typescript
interface Agency {
  agency_id: string;
  name: string;
  province?: string;
  city?: string;
  level?: 'national' | 'provincial' | 'city';
  keywords?: string[];
  emoji?: string;
}
```

**Limitations:**
- No contact information
- No social media links
- No physical location
- No agency description
- Cannot route users to actual agency channels

---

## New Schema

```typescript
interface Agency {
  // Existing fields (unchanged)
  agency_id: string;
  name: string;
  province?: string;
  city?: string;
  level?: 'national' | 'provincial' | 'city';
  keywords?: string[];
  emoji?: string;
  
  // NEW: Description
  description?: string;              // Brief description of agency function
  
  // NEW: Location
  address?: string;                  // Physical address
  google_maps_url?: string;          // Google Maps link
  coordinates?: {                    // Lat/long for mapping
    lat: number;
    lng: number;
  };
  
  // NEW: Contact
  phone?: string;                    // Primary phone number
  phone_alt?: string;                // Alternative phone
  email?: string;                    // Official email
  website?: string;                  // Official website
  
  // NEW: Social Media
  social?: {
    instagram?: string;              // Instagram handle or URL
    twitter?: string;                // Twitter/X handle or URL
    facebook?: string;               // Facebook page URL
    youtube?: string;                // YouTube channel URL
    tiktok?: string;                 // TikTok handle or URL
  };
  
  // NEW: Metadata
  verified?: boolean;                // Data verified by team
  last_updated?: string;             // ISO timestamp
  data_source?: string;              // Where data came from
}
```

---

## DynamoDB Table Structure

### Primary Table: `agencies`

**Partition Key:** `agency_id` (String)

**Attributes:**
```json
{
  "agency_id": "dpu-jakarta-selatan",
  "name": "Dinas Pekerjaan Umum Jakarta Selatan",
  "province": "DKI Jakarta",
  "city": "Jakarta Selatan",
  "level": "city",
  "keywords": ["jalan", "rusak", "infrastruktur"],
  "emoji": "🏗️",
  
  "description": "Menangani pembangunan dan pemeliharaan infrastruktur jalan, jembatan, dan fasilitas umum di Jakarta Selatan",
  
  "address": "Jl. Prapanca Raya No. 10, Kebayoran Baru, Jakarta Selatan",
  "google_maps_url": "https://maps.app.goo.gl/xxxxx",
  "coordinates": {
    "lat": -6.2425,
    "lng": 106.7991
  },
  
  "phone": "021-7203171",
  "phone_alt": "021-7203172",
  "email": "dpu@jakarta.go.id",
  "website": "https://dpu.jakarta.go.id",
  
  "social": {
    "instagram": "dpujaksel",
    "twitter": "dpujaksel",
    "facebook": "https://facebook.com/dpujaksel"
  },
  
  "verified": true,
  "last_updated": "2025-11-16T20:26:00+07:00",
  "data_source": "manual_verification"
}
```

### GSI (Global Secondary Index) - Optional

**GSI-1:** `province-level-index`
- Partition Key: `province`
- Sort Key: `level`
- Use case: Fast queries by location

---

## Data Collection Strategy

### Phase 1: Automated Scraping (Week 1-2)

**Sources:**
1. **Official Websites** - Scrape contact pages
2. **Social Media APIs** - Verify accounts exist
3. **Google Maps API** - Get coordinates and addresses
4. **Government Portals** - LAPOR!, JAKI, etc.

**Tools:**
```bash
# Scraping stack
- Puppeteer (website scraping)
- Instagram Graph API (verify accounts)
- Twitter API v2 (verify accounts)
- Google Maps Places API (location data)
```

**Script Structure:**
```typescript
// scripts/scrape-agency-data.ts
async function enrichAgency(agency: Agency) {
  const enriched = { ...agency };
  
  // 1. Search Google for official website
  enriched.website = await findOfficialWebsite(agency.name);
  
  // 2. Scrape website for contact info
  if (enriched.website) {
    const contact = await scrapeContactPage(enriched.website);
    enriched.phone = contact.phone;
    enriched.email = contact.email;
    enriched.address = contact.address;
  }
  
  // 3. Search social media
  enriched.social = {
    instagram: await findInstagram(agency.name),
    twitter: await findTwitter(agency.name),
    facebook: await findFacebook(agency.name),
  };
  
  // 4. Get location from Google Maps
  if (enriched.address) {
    const location = await geocodeAddress(enriched.address);
    enriched.coordinates = location;
    enriched.google_maps_url = location.mapsUrl;
  }
  
  return enriched;
}
```

### Phase 2: Manual Verification (Week 3-4)

**Process:**
1. Export scraped data to CSV
2. Manual review of each agency (386 agencies)
3. Verify social media accounts are official
4. Test phone numbers and emails
5. Add descriptions (can use AI to draft)
6. Mark as `verified: true`

**CSV Template:**
```csv
agency_id,name,description,address,phone,email,website,instagram,twitter,facebook,verified
dpu-jakarta-selatan,Dinas PU Jaksel,"Handles roads...",Jl. Prapanca...,021-xxx,email@,https://,@handle,@handle,fb.com/,true
```

### Phase 3: Crowdsourcing (Ongoing)

**Community Contribution:**
- Add "Suggest Edit" button on agency detail page
- Users can submit corrections/additions
- Team reviews and approves changes
- Credit contributors

---

## Migration Plan

### Step 1: Update TypeScript Types

```typescript
// src/types/agency.ts
export interface AgencyContact {
  phone?: string;
  phone_alt?: string;
  email?: string;
  website?: string;
}

export interface AgencySocial {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export interface AgencyLocation {
  address?: string;
  google_maps_url?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Agency {
  // Existing
  agency_id: string;
  name: string;
  province?: string;
  city?: string;
  level?: 'national' | 'provincial' | 'city';
  keywords?: string[];
  emoji?: string;
  
  // New
  description?: string;
  address?: string;
  google_maps_url?: string;
  coordinates?: { lat: number; lng: number };
  phone?: string;
  phone_alt?: string;
  email?: string;
  website?: string;
  social?: AgencySocial;
  verified?: boolean;
  last_updated?: string;
  data_source?: string;
}
```

### Step 2: Update Lambda Functions

**GET /agencies:**
- No changes needed (returns all fields)
- New fields optional, backward compatible

**POST /agencies (new endpoint):**
```typescript
// For admin to add/update agency data
export const handler = async (event) => {
  const agency = JSON.parse(event.body);
  
  // Validate required fields
  if (!agency.agency_id || !agency.name) {
    return { statusCode: 400, body: 'Missing required fields' };
  }
  
  // Add metadata
  agency.last_updated = new Date().toISOString();
  agency.data_source = 'manual_entry';
  
  // Save to DynamoDB
  await dynamodb.put({
    TableName: 'agencies',
    Item: agency
  }).promise();
  
  return { statusCode: 200, body: JSON.stringify(agency) };
};
```

### Step 3: Backfill Existing Data

```typescript
// scripts/backfill-agencies.ts
import { agencies } from './existing-data.json';

async function backfill() {
  for (const agency of agencies) {
    // Keep existing data
    const updated = { ...agency };
    
    // Add new fields as null/undefined
    updated.description = null;
    updated.address = null;
    updated.phone = null;
    updated.email = null;
    updated.website = null;
    updated.social = {};
    updated.verified = false;
    updated.last_updated = new Date().toISOString();
    updated.data_source = 'legacy_import';
    
    // Update in DynamoDB
    await updateAgency(updated);
  }
}
```

### Step 4: Update Frontend

**Agency Card (Directory):**
- No changes needed initially
- New fields don't break existing UI

**Agency Detail Page (New):**
- Show full contact information
- Display social media links
- Embed Google Maps
- Show description

---

## Data Collection Priorities

### Priority 1: High-Traffic Agencies (Week 1)
- DKI Jakarta agencies (98 agencies)
- National ministries (23 agencies)
- Total: ~120 agencies

### Priority 2: Java Provinces (Week 2-3)
- West Java (85 agencies)
- Central Java (74 agencies)
- East Java (85 agencies)
- Banten (44 agencies)
- Total: ~288 agencies

### Priority 3: Other Provinces (Week 4+)
- Remaining provinces as data becomes available
- Crowdsource from local users

---

## API Endpoints

### Existing (No Changes)
```
GET /agencies?limit=500
→ Returns all agencies with all fields (backward compatible)
```

### New Endpoints

```
GET /agencies/{agency_id}
→ Returns single agency with full details

POST /agencies (Admin only)
→ Create/update agency data

PATCH /agencies/{agency_id} (Admin only)
→ Partial update of agency fields

POST /agencies/{agency_id}/suggest-edit (Public)
→ Submit correction/addition for review
```

---

## Cost Estimate

### AWS Costs
- DynamoDB: ~$5/month (386 items, low traffic)
- Lambda: ~$2/month (existing)
- **Total: ~$7/month (no increase)**

### Data Collection Costs
- Google Maps API: $200 credit/month (free tier)
- Social Media APIs: Free (basic tier)
- Manual labor: 386 agencies × 10 min = ~64 hours
- **Total: $0 (DIY) or $500-1000 (outsource)**

---

## Validation Rules

```typescript
const VALIDATION = {
  phone: /^(\+62|0)[0-9]{8,13}$/,           // Indonesian phone
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,      // Basic email
  website: /^https?:\/\/.+/,                 // URL with protocol
  instagram: /^@?[a-zA-Z0-9._]{1,30}$/,     // IG handle
  twitter: /^@?[a-zA-Z0-9_]{1,15}$/,        // Twitter handle
  coordinates: {
    lat: { min: -11, max: 6 },               // Indonesia bounds
    lng: { min: 95, max: 141 }
  }
};
```

---

## Rollout Plan

### Week 1: Infrastructure
- [ ] Update TypeScript types
- [ ] Update DynamoDB schema (add new fields)
- [ ] Deploy updated Lambda functions
- [ ] Test backward compatibility

### Week 2-3: Data Collection
- [ ] Build scraping scripts
- [ ] Run automated collection
- [ ] Manual verification of Priority 1 agencies
- [ ] Import verified data

### Week 4: Frontend
- [ ] Build agency detail page
- [ ] Add contact information display
- [ ] Add social media links
- [ ] Add Google Maps embed

### Week 5+: Expansion
- [ ] Continue manual verification
- [ ] Add "Suggest Edit" feature
- [ ] Crowdsource missing data
- [ ] Monitor data quality

---

## Success Metrics

- **Coverage:** % of agencies with complete data
  - Target: 80% for Priority 1 (Jakarta + National)
  - Target: 50% for Priority 2 (Java provinces)
  
- **Accuracy:** % of verified contact info that works
  - Target: 95% (phone/email tested)
  
- **Freshness:** Average age of data
  - Target: <6 months for high-traffic agencies

---

## Risk Mitigation

**Risk 1: Scraped data is incorrect**
- Mitigation: Manual verification required before marking `verified: true`

**Risk 2: Social media accounts are fake/unofficial**
- Mitigation: Check for verification badges, follower count, post history

**Risk 3: Contact info changes over time**
- Mitigation: Add `last_updated` field, periodic re-verification

**Risk 4: 386 agencies is too many to verify manually**
- Mitigation: Prioritize high-traffic agencies, crowdsource the rest

---

## Next Steps

1. **Approve schema** - Review and finalize field names
2. **Build scraping scripts** - Start with 10 agencies as test
3. **Manual verification process** - Define workflow and tools
4. **Deploy infrastructure** - Update Lambda + DynamoDB
5. **Start data collection** - Priority 1 agencies first
