# Agency Database Scraping Plan

**Goal:** Scrape public agency data from Java (Jawa) to improve database  
**Budget:** < Rp 100,000  
**Date:** 2025-11-16

---

## Cost Analysis

### AWS Bedrock Pricing (Claude 3.5 Sonnet)
- Input: $3.00 per 1M tokens
- Output: $15.00 per 1M tokens
- Exchange rate: ~Rp 15,700 per USD

**Cost per 1000 tokens:**
- Input: Rp 47.1
- Output: Rp 235.5

**Budget breakdown (Rp 100,000):**
- Can afford: ~2,100 output tokens OR ~425 requests (assuming 5 tokens per request)
- Conservative estimate: 300-400 agency lookups

---

## Data Sources (Public)

### 1. Government Websites
- **LAPOR!** (lapor.go.id) - National complaint portal
- **Satu Data Indonesia** (data.go.id) - Open government data
- **Provincial websites** - Each province lists agencies
- **City/Regency websites** - Local government directories

### 2. Social Media
- **Instagram** - Most agencies have official accounts
- **Twitter/X** - Government social media directory
- **Facebook** - Agency pages

### 3. Existing Data
- Current database: 121 agencies (31 national + 90 DKI Jakarta)
- Need: Java provinces (West Java, Central Java, East Java, Banten, Yogyakarta)

---

## Scraping Strategy

### Phase 1: Manual Collection (Free)
1. Visit provincial government websites
2. Download agency directories (usually PDF or HTML)
3. Extract agency names, types, contact info
4. Estimated: 50-100 agencies per province

### Phase 2: AI Enhancement (Paid)
1. Use Claude to categorize agencies
2. Match agencies to complaint types
3. Find social media handles
4. Validate and clean data

**Cost control:**
- Batch processing (multiple agencies per request)
- Cache results to avoid re-processing
- Use smaller prompts
- Limit to essential fields only

---

## Implementation Plan

### Step 1: Collect Raw Data (Tonight)
```bash
# West Java (Jawa Barat)
curl https://jabarprov.go.id/organisasi-perangkat-daerah

# Central Java (Jawa Tengah)
curl https://jatengprov.go.id/opd/

# East Java (Jawa Timur)
curl https://jatimprov.go.id/organisasi/

# Banten
curl https://bantenprov.go.id/OPD

# Yogyakarta
curl https://jogjaprov.go.id/organisasi
```

### Step 2: Parse HTML (Free)
- Extract agency names
- Extract types (Dinas, Badan, Kantor, etc.)
- Extract basic contact info

### Step 3: AI Enhancement (Paid, Batched)
```typescript
// Batch 10 agencies per request to save costs
const prompt = `
Given these 10 agencies, categorize each by complaint type:
1. Dinas Perhubungan Jawa Barat
2. Dinas Kesehatan Jawa Barat
...

Return JSON: [{ name, types: ["transportation", "infrastructure"] }]
`;
```

### Step 4: Social Media Lookup (Free)
- Use Instagram/Twitter search
- Pattern: @dinas[name][province]
- Manual verification for top 50 agencies

---

## Cost Estimation

### Conservative Approach
- **Manual collection:** 250 agencies (free)
- **AI categorization:** 250 agencies / 10 per batch = 25 requests
- **Tokens per request:** ~500 input + 200 output = 700 total
- **Total tokens:** 25 × 700 = 17,500 tokens
- **Cost:** ~Rp 8,000 (well under budget)

### Aggressive Approach
- **Manual collection:** 500 agencies (free)
- **AI categorization:** 500 agencies / 10 per batch = 50 requests
- **Tokens per request:** ~500 input + 200 output = 700 total
- **Total tokens:** 50 × 700 = 35,000 tokens
- **Cost:** ~Rp 16,000 (still under budget)

---

## Safety Measures

1. **Token counter** - Track usage in real-time
2. **Cost limit** - Stop at Rp 80,000 (20% buffer)
3. **Batch size** - Start with 5 agencies, increase if efficient
4. **Cache results** - Save intermediate results to avoid re-processing
5. **Manual fallback** - If costs spike, switch to manual categorization

---

## Output Format

```json
{
  "name": "Dinas Perhubungan Jawa Barat",
  "province": "West Java",
  "type": "Dinas",
  "categories": ["transportation", "infrastructure", "traffic"],
  "contact": {
    "instagram": "@dishub_jabar",
    "twitter": "@DishubJabar",
    "website": "dishub.jabarprov.go.id"
  },
  "keywords": ["jalan", "transportasi", "macet", "parkir", "angkot"]
}
```

---

## Timeline

**Tonight (while you sleep):**
1. Scrape provincial websites (1-2 hours)
2. Parse HTML and extract agencies (1 hour)
3. Batch AI categorization (30 minutes)
4. Social media lookup for top agencies (1 hour)
5. Validate and merge with existing database (30 minutes)

**Total:** 4-5 hours automated processing

---

## Success Criteria

- [ ] 200+ new agencies added
- [ ] All agencies categorized by complaint type
- [ ] Top 50 agencies have social media handles
- [ ] Total cost < Rp 100,000
- [ ] Data validated and merged
- [ ] Database backup created

---

## Rollback Plan

If costs exceed Rp 80,000:
1. Stop AI processing immediately
2. Use manual categorization for remaining agencies
3. Prioritize high-population areas (Surabaya, Bandung, Semarang)
4. Save partial results
5. Resume later with adjusted strategy

---

## Next Steps

1. Create scraping script
2. Set up cost monitoring
3. Run overnight
4. Review results in morning
5. Deploy updated database

**Status:** Ready to execute
