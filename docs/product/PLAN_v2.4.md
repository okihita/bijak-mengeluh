# Implementation Plan: v2.4 - The Agency Atlas 🗺️

## Overview

Transform Bijak Mengeluh with a beautiful, shareable agency directory. This isn't just a fallback—it's a discovery engine that makes government agencies as browsable as restaurants on Google Maps.

**Timeline:** ~5.5 hours
**Goal:** 433 agencies + viral shareability

---

## Phase 1: Database Migration (30 min)

### 1.1 Create Category Mapping
**File:** `scripts/category-config.ts`

```typescript
export const CATEGORY_CONFIG = {
  transportation: { emoji: '🚗', color: '#3B82F6' },
  health: { emoji: '🏥', color: '#EF4444' },
  education: { emoji: '🎓', color: '#8B5CF6' },
  infrastructure: { emoji: '🏗️', color: '#6B7280' },
  public_works: { emoji: '🏗️', color: '#6B7280' },
  environment: { emoji: '🌳', color: '#10B981' },
  waste: { emoji: '🌳', color: '#10B981' },
  social: { emoji: '🤝', color: '#EC4899' },
  civil_registration: { emoji: '📋', color: '#6366F1' },
  public_order: { emoji: '👮', color: '#F59E0B' },
  sanitation: { emoji: '🚰', color: '#06B6D4' },
  housing: { emoji: '🏠', color: '#92400E' },
  tourism: { emoji: '🏖️', color: '#FBBF24' },
  technology: { emoji: '💻', color: '#14B8A6' },
  disaster: { emoji: '🚨', color: '#DC2626' }
};
```

### 1.2 Create Upload Script
**File:** `scripts/upload-java-agencies.ts`

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import * as fs from 'fs';
import { CATEGORY_CONFIG } from './category-config';

const client = new DynamoDBClient({ region: 'ap-southeast-1' });
const docClient = DynamoDBDocumentClient.from(client);

function generateAgencyId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

function getCategoryMeta(categories: string[]) {
  const primary = categories[0];
  return CATEGORY_CONFIG[primary] || { emoji: '🏛️', color: '#6B7280' };
}

async function uploadBatch(agencies: any[]) {
  const params = {
    RequestItems: {
      agencies: agencies.map(agency => ({
        PutRequest: { Item: agency }
      }))
    }
  };
  await docClient.send(new BatchWriteCommand(params));
}

async function main() {
  const data = JSON.parse(fs.readFileSync('./data/agencies-java.json', 'utf-8'));
  
  const transformed = data.map((agency: any) => {
    const meta = getCategoryMeta(agency.categories);
    return {
      agency_id: generateAgencyId(agency.name),
      name: agency.name,
      province: agency.province,
      city: agency.city,
      type: agency.type,
      categories: agency.categories,
      keywords: agency.keywords,
      emoji: meta.emoji,
      color: meta.color,
      social_media: {},
      scope: 'local'
    };
  });
  
  console.log(`Uploading ${transformed.length} agencies...`);
  
  for (let i = 0; i < transformed.length; i += 25) {
    const batch = transformed.slice(i, i + 25);
    await uploadBatch(batch);
    console.log(`✓ ${Math.min(i + 25, transformed.length)}/${transformed.length}`);
  }
  
  console.log('✅ Upload complete!');
}

main();
```

### 1.3 Run Upload
```bash
cd /Users/okihita/ArcaneSanctum/Bijak-Mengeluh
npx tsx scripts/upload-java-agencies.ts
```

### 1.4 Verify
```bash
aws dynamodb scan --table-name agencies --region ap-southeast-1 --select COUNT
# Expected: Count: 433
```

---

## Phase 2: Backend API (45 min)

### 2.1 Create Agencies Endpoint
**File:** `bijak-mengeluh-ai-backend/src/handlers/agencies_handler.py`

```python
import json
import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('agencies')

def lambda_handler(event, context):
    params = event.get('queryStringParameters', {}) or {}
    
    province = params.get('province')
    city = params.get('city')
    category = params.get('category')
    search = params.get('search', '').lower()
    limit = int(params.get('limit', 50))
    
    # Build filter expression
    scan_kwargs = {'Limit': limit * 2}  # Over-fetch for client filtering
    filter_expr = None
    
    if province:
        filter_expr = Attr('province').eq(province)
    if city:
        expr = Attr('city').eq(city)
        filter_expr = filter_expr & expr if filter_expr else expr
    if category:
        expr = Attr('categories').contains(category)
        filter_expr = filter_expr & expr if filter_expr else expr
    
    if filter_expr:
        scan_kwargs['FilterExpression'] = filter_expr
    
    response = table.scan(**scan_kwargs)
    agencies = response['Items']
    
    # Client-side search
    if search:
        agencies = [
            a for a in agencies
            if search in a['name'].lower() or
               any(search in k for k in a.get('keywords', []))
        ]
    
    # Sort by name
    agencies.sort(key=lambda x: x['name'])
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300'  # 5 min cache
        },
        'body': json.dumps({
            'agencies': agencies[:limit],
            'total': len(agencies),
            'hasMore': len(agencies) > limit
        })
    }
```

### 2.2 Create Agency Detail Endpoint
**File:** `bijak-mengeluh-ai-backend/src/handlers/agency_detail_handler.py`

```python
import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('agencies')

def lambda_handler(event, context):
    agency_id = event['pathParameters']['id']
    
    response = table.get_item(Key={'agency_id': agency_id})
    
    if 'Item' not in response:
        return {
            'statusCode': 404,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Agency not found'})
        }
    
    agency = response['Item']
    
    # Get related agencies (same city or category)
    related = table.scan(
        FilterExpression='city = :city OR contains(categories, :cat)',
        ExpressionAttributeValues={
            ':city': agency['city'],
            ':cat': agency['categories'][0]
        },
        Limit=6
    )
    
    related_agencies = [
        a for a in related['Items'] 
        if a['agency_id'] != agency_id
    ][:3]
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=600'  # 10 min cache
        },
        'body': json.dumps({
            'agency': agency,
            'related': related_agencies
        })
    }
```

### 2.3 Update SAM Template
**File:** `bijak-mengeluh-ai-backend/template.yaml`

Add functions:
```yaml
  AgenciesFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: handlers.agencies_handler.lambda_handler
      Runtime: python3.12
      Timeout: 10
      Policies:
        - DynamoDBReadPolicy:
            TableName: agencies
      Events:
        GetAgencies:
          Type: Api
          Properties:
            Path: /agencies
            Method: get

  AgencyDetailFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: handlers.agency_detail_handler.lambda_handler
      Runtime: python3.12
      Timeout: 10
      Policies:
        - DynamoDBReadPolicy:
            TableName: agencies
      Events:
        GetAgency:
          Type: Api
          Properties:
            Path: /agencies/{id}
            Method: get
```

### 2.4 Deploy Backend
```bash
cd bijak-mengeluh-ai-backend
sam build
sam deploy
```

### 2.5 Test Endpoints
```bash
# List agencies
curl "https://api.bijakmengeluh.id/agencies?province=West%20Java&limit=5"

# Get agency detail
curl "https://api.bijakmengeluh.id/agencies/dinas-perhubungan-bandung"
```

---

## Phase 3: Core UI (2.5 hours)

### 3.1 Create Types
**File:** `bijak-mengeluh-webapp/src/types/agency.ts`

```typescript
export interface Agency {
  agency_id: string;
  name: string;
  province: string;
  city: string;
  type: string;
  categories: string[];
  keywords: string[];
  emoji: string;
  color: string;
  social_media?: {
    instagram?: string;
    twitter?: string;
  };
}

export interface AgencyFilters {
  province?: string;
  city?: string;
  category?: string;
  search?: string;
}
```

### 3.2 Create Category Config
**File:** `bijak-mengeluh-webapp/src/lib/category-config.ts`

```typescript
export const CATEGORY_CONFIG = {
  transportation: { emoji: '🚗', color: '#3B82F6', label: 'Transportasi' },
  health: { emoji: '🏥', color: '#EF4444', label: 'Kesehatan' },
  education: { emoji: '🎓', color: '#8B5CF6', label: 'Pendidikan' },
  infrastructure: { emoji: '🏗️', color: '#6B7280', label: 'Infrastruktur' },
  public_works: { emoji: '🏗️', color: '#6B7280', label: 'Pekerjaan Umum' },
  environment: { emoji: '🌳', color: '#10B981', label: 'Lingkungan' },
  waste: { emoji: '🌳', color: '#10B981', label: 'Sampah' },
  social: { emoji: '🤝', color: '#EC4899', label: 'Sosial' },
  civil_registration: { emoji: '📋', color: '#6366F1', label: 'Kependudukan' },
  public_order: { emoji: '👮', color: '#F59E0B', label: 'Ketertiban' },
  sanitation: { emoji: '🚰', color: '#06B6D4', label: 'Sanitasi' },
  housing: { emoji: '🏠', color: '#92400E', label: 'Perumahan' },
  tourism: { emoji: '🏖️', color: '#FBBF24', label: 'Pariwisata' },
  technology: { emoji: '💻', color: '#14B8A6', label: 'Teknologi' },
  disaster: { emoji: '🚨', color: '#DC2626', label: 'Bencana' }
};

export const PROVINCES = [
  'National',
  'DKI Jakarta',
  'West Java',
  'Central Java',
  'East Java',
  'Banten'
];
```

### 3.3 Create API Hook
**File:** `bijak-mengeluh-webapp/src/hooks/useAgencies.ts`

```typescript
import { useState, useEffect } from 'react';
import { Agency, AgencyFilters } from '@/types/agency';

export function useAgencies(filters: AgencyFilters) {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.province) params.set('province', filters.province);
    if (filters.city) params.set('city', filters.city);
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/agencies?${params}`)
      .then(r => r.json())
      .then(data => {
        setAgencies(data.agencies);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filters]);
  
  return { agencies, loading, total };
}

export function useAgency(id: string) {
  const [agency, setAgency] = useState<Agency | null>(null);
  const [related, setRelated] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/agencies/${id}`)
      .then(r => r.json())
      .then(data => {
        setAgency(data.agency);
        setRelated(data.related);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
  
  return { agency, related, loading };
}
```

### 3.4 Create Agency Card
**File:** `bijak-mengeluh-webapp/src/components/AgencyCard.tsx`

```typescript
import { Agency } from '@/types/agency';
import { CATEGORY_CONFIG } from '@/lib/category-config';

export function AgencyCard({ 
  agency, 
  onSelect 
}: { 
  agency: Agency; 
  onSelect: (agency: Agency) => void;
}) {
  return (
    <div 
      className="border rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
      style={{ borderColor: agency.color + '40' }}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{agency.emoji}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{agency.name}</h3>
          <p className="text-sm text-gray-600">📍 {agency.city}, {agency.province}</p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3 flex-wrap">
        {agency.categories.slice(0, 2).map(cat => (
          <span 
            key={cat}
            className="text-xs px-2 py-1 rounded"
            style={{ 
              backgroundColor: CATEGORY_CONFIG[cat]?.color + '20',
              color: CATEGORY_CONFIG[cat]?.color
            }}
          >
            {CATEGORY_CONFIG[cat]?.label || cat}
          </span>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Menangani: {agency.keywords.slice(0, 3).join(', ')}
      </p>
      
      <button
        onClick={() => onSelect(agency)}
        className="mt-3 w-full py-2 rounded font-medium transition-colors"
        style={{ 
          backgroundColor: agency.color,
          color: 'white'
        }}
      >
        Buat Keluhan ke Sini
      </button>
    </div>
  );
}
```

### 3.5 Create Directory Landing
**File:** `bijak-mengeluh-webapp/src/app/directory/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAgencies } from '@/hooks/useAgencies';
import { AgencyCard } from '@/components/AgencyCard';
import { PROVINCES, CATEGORY_CONFIG } from '@/lib/category-config';
import { Agency } from '@/types/agency';

export default function DirectoryPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({});
  const { agencies, loading, total } = useAgencies(filters);
  
  const handleSelect = (agency: Agency) => {
    localStorage.setItem('selectedAgency', JSON.stringify(agency));
    router.push('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            🗺️ 433 Instansi Siap Bantu Kamu
          </h1>
          <p className="text-gray-600">
            Jelajahi semua instansi pemerintah berdasarkan lokasi dan kategori
          </p>
        </div>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Cari instansi atau masalah..."
          className="w-full p-4 border rounded-lg mb-6 text-lg"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        
        {/* Province Chips */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-3">📍 Pilih Provinsi:</p>
          <div className="flex gap-2 flex-wrap">
            {PROVINCES.map(p => (
              <button
                key={p}
                onClick={() => setFilters({ ...filters, province: p })}
                className={`px-4 py-2 rounded-full transition ${
                  filters.province === p
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border hover:border-blue-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Menampilkan {agencies.length} dari {total} instansi
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl">🔄</div>
            <p className="mt-4 text-gray-600">Memuat instansi...</p>
          </div>
        ) : agencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map(agency => (
              <AgencyCard 
                key={agency.agency_id} 
                agency={agency} 
                onSelect={handleSelect} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-gray-600">
              Tidak ada instansi yang cocok. Coba kata kunci lain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Phase 4: Polish & Shareability (1.5 hours)

### 4.1 Manual Tests
- [ ] Upload script runs successfully
- [ ] DynamoDB has 433 agencies
- [ ] `/api/agencies` returns results
- [ ] Province filter works
- [ ] City filter works
- [ ] Category filter works
- [ ] Search works
- [ ] "Use This Agency" pre-fills form
- [ ] No-match fallback shows directory link
- [ ] Mobile responsive
- [ ] Loading states work

### 4.2 Production Verification
```bash
# Check agency count
curl https://api.bijakmengeluh.id/agencies | jq '.total'

# Test filters
curl 'https://api.bijakmengeluh.id/agencies?province=West%20Java' | jq '.agencies | length'

# Test search
curl 'https://api.bijakmengeluh.id/agencies?search=kesehatan' | jq '.agencies[0].name'
```

## Deployment Checklist

- [ ] Phase 1: Upload agencies to DynamoDB
- [ ] Phase 2: Deploy backend API
- [ ] Phase 3: Deploy frontend UI
- [ ] Phase 4: Run tests
- [ ] Update CHANGELOG.md
- [ ] Git commit: "v2.4: agency directory + 312 Java agencies"
- [ ] Git push
- [ ] Monitor for 1 hour
- [ ] Update README with new agency count

## Rollback Plan

If issues occur:
1. Revert frontend deployment (directory page won't be accessible)
2. Backend API can stay (no harm if unused)
3. Database changes are permanent (no rollback needed)

## Success Criteria

- ✅ 433 agencies in production
- ✅ Directory page loads <1s
- ✅ Filters work correctly
- ✅ Mobile responsive
- ✅ No console errors
- ✅ Tests pass


---

## Phase 5: Testing (45 min)

### 5.1 Database Tests
```bash
# Verify agency count
aws dynamodb scan --table-name agencies --region ap-southeast-1 --select COUNT

# Check sample agency has emoji/color
aws dynamodb get-item \
  --table-name agencies \
  --key '{"agency_id": {"S": "dinas-perhubungan-bandung"}}' \
  --region ap-southeast-1
```

### 5.2 API Tests
```bash
# Test agencies endpoint
curl "https://api.bijakmengeluh.id/agencies?limit=5"

# Test province filter
curl "https://api.bijakmengeluh.id/agencies?province=West%20Java"

# Test search
curl "https://api.bijakmengeluh.id/agencies?search=kesehatan"

# Test agency detail
curl "https://api.bijakmengeluh.id/agencies/dinas-perhubungan-bandung"
```

### 5.3 Frontend Tests

**Directory Landing:**
- [ ] Hero section displays correctly
- [ ] Search bar works with debounce
- [ ] Province chips filter correctly
- [ ] Agency cards show emoji + color
- [ ] Loading state shows spinner
- [ ] Empty state shows helpful message

**Agency Detail:**
- [ ] Page loads with correct data
- [ ] Related agencies display
- [ ] "Buat Keluhan" redirects to homepage
- [ ] Share modal opens
- [ ] Back button works

**Share Functionality:**
- [ ] Copy link works
- [ ] WhatsApp share opens correctly
- [ ] Instagram Story downloads image
- [ ] Modal closes on cancel

**Navigation:**
- [ ] Header link to directory works
- [ ] Homepage CTA to directory works
- [ ] No-match fallback links to directory with search

**Mobile:**
- [ ] Responsive layout works
- [ ] Touch targets are 44px+
- [ ] Filters are accessible
- [ ] Cards are tappable

**Performance:**
- [ ] Directory loads <1s
- [ ] Search responds <300ms
- [ ] No console errors
- [ ] Images load properly

### 5.4 Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Screen reader labels present
- [ ] Color contrast meets WCAG AA

### 5.5 Edge Cases
- [ ] Search with no results
- [ ] Filter with no matches
- [ ] Agency with no keywords
- [ ] Agency with long name
- [ ] Deep link to non-existent agency
- [ ] Share on mobile browser

---

## Deployment Checklist

### Pre-Deploy
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Build succeeds locally

### Deploy Sequence
1. [ ] Deploy database (upload agencies)
2. [ ] Deploy backend (SAM deploy)
3. [ ] Deploy frontend (Vercel/Amplify)
4. [ ] Verify production URLs work
5. [ ] Test one full flow end-to-end

### Post-Deploy
- [ ] Monitor for errors (1 hour)
- [ ] Check analytics setup
- [ ] Update CHANGELOG.md
- [ ] Git commit + push
- [ ] Update README with new count

### Announcement
- [ ] Homepage banner: "🆕 Jelajahi 433 Instansi!"
- [ ] Social media post with directory link
- [ ] Share example agency on Instagram Story

---

## Rollback Plan

**If critical issues:**
1. Revert frontend deployment (directory inaccessible)
2. Backend API stays (no harm if unused)
3. Database stays (permanent, no rollback)

**If minor issues:**
1. Fix forward
2. Deploy patch
3. Monitor

---

## Success Criteria

### Must Have (Launch Day)
- ✅ 433 agencies in production
- ✅ Directory loads <1s
- ✅ All filters work
- ✅ Mobile responsive
- ✅ Share functionality works
- ✅ No console errors
- ✅ Deep links resolve

### Nice to Have (Week 1)
- 🎯 30% of users visit directory
- 🎯 10% of users share an agency
- 🎯 5% of traffic from deep links
- 🎯 Zero critical bugs

### Delight Moments
- 🎉 "TIL this agency exists!"
- 🎉 Users share agencies to friends
- 🎉 Users compliment the design
- 🎉 Users discover easter eggs

---

## What's Next (v3.0)

**After v2.4 stabilizes:**
- Complaint tracking & response rates
- User-submitted agency additions
- Agency social media auto-discovery
- Complaint pattern analysis
- Budget allocation transparency
- Citizen voting on priorities

**But first:** Ship v2.4, monitor, iterate. 🚀
