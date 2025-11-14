# Local Government Expansion Spec
**Feature:** Expand from National Ministries to Local Government (Pemda & Dinas)

**Date:** 2025-11-15  
**Status:** Planning Phase  
**Priority:** High Impact, Cost-Sensitive

---

## 📊 Current State Analysis

### Existing Infrastructure
- **Database:** Pinecone (Vector DB) - $70/month
- **Scope:** ~34 National Ministries
- **Matching:** Semantic search via embeddings
- **Backend:** AWS Lambda + Bedrock
- **Cost:** ~$77-85/month total

### Current Pain Points
1. Pinecone is 82% of total cost ($70/$85)
2. Limited to national level only
3. Users can't find local agencies (Dinas Kesehatan, Dinas PU, etc.)

---

## 🎯 Expansion Scope

### Target Coverage
**National Level (Current):**
- 34 Ministries ✅

**Provincial Level (NEW):**
- 38 Provinces
- ~15 Dinas per province
- Total: ~570 agencies

**City/Regency Level (FUTURE - Phase 2):**
- 514 Cities/Regencies
- ~15 Dinas each
- Total: ~7,710 agencies

**TOTAL PHASE 1:** 34 + 570 = **604 agencies**

---

## 💰 Cost Analysis & Options

### Option 1: Keep Pinecone (Current)
**Pros:**
- Already implemented
- Fast semantic search
- No migration needed

**Cons:**
- $70/month for 604 agencies = $0.12 per agency
- Scales poorly (Phase 2 = 7,744 agencies still $70/month)
- Overkill for simple keyword matching

**Verdict:** ❌ Not cost-effective for this use case

---

### Option 2: DynamoDB + Simple Keyword Matching
**Architecture:**
```
DynamoDB Table: agencies
- PK: agency_id
- SK: province#city
- name: "Dinas Kesehatan DKI Jakarta"
- keywords: ["kesehatan", "rumah sakit", "puskesmas", "vaksin"]
- level: "provincial" | "city" | "national"
- social_media: {...}
- GSI: keywords (for search)
```

**Matching Logic:**
1. Extract keywords from complaint (simple tokenization)
2. Query DynamoDB GSI by keywords
3. Score by keyword overlap
4. Return top 3 matches

**Cost:**
- Storage: 604 agencies × 5KB = 3MB = **$0.00075/month**
- Reads: 1000 complaints/month × 2 reads = 2000 RCU = **$0.50/month**
- **TOTAL: ~$0.50/month** (140x cheaper!)

**Pros:**
- ✅ 140x cost reduction
- ✅ Simple, maintainable
- ✅ Fast enough (50-100ms)
- ✅ Scales to millions of agencies
- ✅ No vector embeddings needed

**Cons:**
- Less "smart" than semantic search
- Requires good keyword curation
- May miss nuanced complaints

**Verdict:** ✅ **RECOMMENDED** - Best price/value

---

### Option 3: Hybrid (DynamoDB + Bedrock Embeddings On-Demand)
**Architecture:**
- Store agencies in DynamoDB (cheap)
- Generate embeddings only when needed
- Cache embeddings in DynamoDB
- Use cosine similarity in Lambda

**Cost:**
- Storage: $0.50/month (DynamoDB)
- Embeddings: $0.0001 per 1000 tokens
- 1000 complaints × 100 tokens = **$0.01/month**
- **TOTAL: ~$0.51/month**

**Pros:**
- ✅ Semantic search capability
- ✅ No Pinecone cost
- ✅ Pay-per-use model

**Cons:**
- More complex implementation
- Slower (embedding generation + similarity calc)
- Still need to manage embeddings

**Verdict:** ⚠️ Consider if keyword matching fails

---

## 🏗️ Recommended Architecture (Option 2)

### Database Schema

```typescript
// DynamoDB Table: agencies
{
  agency_id: "dki-dinkes",
  province: "DKI Jakarta",
  city: null, // null for provincial
  name: "Dinas Kesehatan Provinsi DKI Jakarta",
  level: "provincial", // national | provincial | city
  keywords: [
    "kesehatan", "rumah sakit", "puskesmas", "vaksin",
    "imunisasi", "posyandu", "covid", "obat", "dokter"
  ],
  social_media: {
    twitter: "@DinkesJakarta",
    instagram: "@dinkes.jakarta",
    facebook: "DinkesJakarta"
  },
  website: "https://dinkes.jakarta.go.id",
  phone: "021-1234567",
  email: "info@dinkes.jakarta.go.id",
  created_at: "2025-11-15T00:00:00Z",
  updated_at: "2025-11-15T00:00:00Z"
}

// GSI: keywords-index
// PK: keyword
// SK: agency_id
```

### Matching Algorithm

```python
def match_agency(complaint_text: str) -> List[Agency]:
    # 1. Extract keywords (simple tokenization)
    tokens = complaint_text.lower().split()
    keywords = [t for t in tokens if len(t) > 3]
    
    # 2. Query DynamoDB for each keyword
    matches = {}
    for keyword in keywords:
        results = dynamodb.query(
            IndexName='keywords-index',
            KeyConditionExpression='keyword = :kw',
            ExpressionAttributeValues={':kw': keyword}
        )
        for item in results['Items']:
            agency_id = item['agency_id']
            matches[agency_id] = matches.get(agency_id, 0) + 1
    
    # 3. Score by keyword overlap
    scored = sorted(matches.items(), key=lambda x: x[1], reverse=True)
    
    # 4. Fetch top 3 agencies
    top_agencies = []
    for agency_id, score in scored[:3]:
        agency = dynamodb.get_item(Key={'agency_id': agency_id})
        top_agencies.append({
            'agency': agency,
            'score': score / len(keywords) * 100  # percentage match
        })
    
    return top_agencies
```

---

## 📦 Data Collection Strategy

### Phase 1: Provincial Dinas (570 agencies)

**Data Sources (FREE):**
1. **Wikipedia:** List of Indonesian provinces + common dinas
2. **Government Portals:** satu.indonesia.go.id
3. **Manual Curation:** Top 10 provinces first (380 agencies)

**Social Media Collection:**
1. **Twitter/X API:** Free tier (1500 requests/month)
2. **Instagram:** Manual scraping (no API needed)
3. **Facebook:** Graph API (free tier)
4. **Manual Entry:** Crowdsource via form

**Timeline:**
- Week 1: Setup DynamoDB schema
- Week 2: Collect top 10 provinces (380 agencies)
- Week 3: Implement matching algorithm
- Week 4: Test & deploy
- Month 2-3: Complete all 38 provinces

---

## 🔄 Migration Plan

### Step 1: Parallel Run (Week 1-2)
```
User Complaint
    ↓
┌───────────────┐
│ Try DynamoDB  │ (new)
│ keyword match │
└───────────────┘
    ↓
  Found?
    ↓
  YES → Return result
    ↓
   NO → Fallback to Pinecone (old)
```

### Step 2: Monitor & Tune (Week 3-4)
- Track match rate: DynamoDB vs Pinecone
- Tune keywords based on misses
- Add synonyms (e.g., "jalan rusak" → "infrastruktur", "PU")

### Step 3: Full Cutover (Week 5)
- If match rate > 85%: Remove Pinecone
- Save $70/month immediately
- Keep Pinecone data as backup

### Step 4: Cleanup (Week 6)
- Delete Pinecone index
- Archive embeddings to S3 (if needed)
- Update documentation

---

## 📋 Data Structure Example

### National Ministry
```json
{
  "agency_id": "kemenhub",
  "level": "national",
  "name": "Kementerian Perhubungan",
  "keywords": ["transportasi", "jalan", "bandara", "pelabuhan", "kereta"],
  "social_media": {
    "twitter": "@kemenhub151",
    "instagram": "@kemenhub151"
  }
}
```

### Provincial Dinas
```json
{
  "agency_id": "dki-dishub",
  "level": "provincial",
  "province": "DKI Jakarta",
  "name": "Dinas Perhubungan DKI Jakarta",
  "keywords": ["transjakarta", "busway", "parkir", "tilang", "macet"],
  "social_media": {
    "twitter": "@DishubJakarta",
    "instagram": "@dishub.jakarta"
  }
}
```

### City Dinas (Phase 2)
```json
{
  "agency_id": "jaksel-dishub",
  "level": "city",
  "province": "DKI Jakarta",
  "city": "Jakarta Selatan",
  "name": "Dinas Perhubungan Jakarta Selatan",
  "keywords": ["transjakarta", "busway", "parkir", "jaksel"],
  "social_media": {
    "twitter": "@DishubJaksel"
  }
}
```

---

## 🎯 Success Metrics

### Phase 1 Goals
- ✅ Match rate: >85% (vs current Pinecone)
- ✅ Response time: <200ms (vs current 100ms)
- ✅ Cost: <$1/month (vs current $70/month)
- ✅ Coverage: 604 agencies (vs current 34)

### KPIs to Track
1. **Match Accuracy:** % of complaints matched correctly
2. **User Satisfaction:** Feedback on agency suggestions
3. **Cost per Match:** Total cost / matches per month
4. **Coverage:** % of complaints that find a match

---

## 🚨 Risks & Mitigations

### Risk 1: Keyword Matching Too Simple
**Impact:** Users get wrong agencies  
**Mitigation:**
- Start with top 10 provinces (high volume)
- Collect user feedback
- Iterate on keywords
- Add synonym mapping
- Fallback to Bedrock embeddings if needed

### Risk 2: Data Collection Takes Too Long
**Impact:** Delayed launch  
**Mitigation:**
- Prioritize top 10 provinces (80% of users)
- Crowdsource via public form
- Use Wikipedia as baseline
- Launch incrementally

### Risk 3: Social Media Data Outdated
**Impact:** Users contact wrong accounts  
**Mitigation:**
- Add "last verified" timestamp
- Crowdsource updates
- Monthly verification script
- Show warning if >6 months old

---

## 💡 Future Enhancements (Post-Launch)

### Phase 2: City/Regency Level
- Add 514 cities (7,710 agencies)
- Still <$1/month with DynamoDB
- Better local coverage

### Phase 3: Smart Routing
- "Jalan rusak di Jakarta Selatan" → Jakarta Selatan Dinas PU
- Location extraction from complaint
- Hierarchical matching (city → province → national)

### Phase 4: Crowdsourced Updates
- Public form to submit agency info
- Verification workflow
- Community-maintained database

### Phase 5: ML-Enhanced Matching (Optional)
- Train small model on complaint → agency pairs
- Deploy on Lambda (no Pinecone needed)
- Only if keyword matching <85% accuracy

---

## 📊 Cost Comparison Summary

| Solution | Setup Cost | Monthly Cost | Match Quality | Speed |
|----------|-----------|--------------|---------------|-------|
| **Pinecone (Current)** | $0 | $70 | Excellent | Fast (50ms) |
| **DynamoDB Keywords** | $0 | $0.50 | Good (85%+) | Fast (100ms) |
| **DynamoDB + Bedrock** | $0 | $0.51 | Excellent | Medium (200ms) |
| **PostgreSQL + pgvector** | $15 (RDS) | $15 | Excellent | Fast (50ms) |

**Winner:** DynamoDB Keywords - **140x cheaper, good enough quality**

---

## 🎬 Action Plan

### Immediate (This Week)
1. ✅ Create this spec document
2. ⏳ Get approval on approach
3. ⏳ Setup DynamoDB table schema
4. ⏳ Create data collection spreadsheet

### Week 1-2: MVP
1. Implement DynamoDB schema
2. Collect top 10 provinces data (380 agencies)
3. Implement keyword matching algorithm
4. Deploy parallel run (DynamoDB + Pinecone fallback)

### Week 3-4: Testing
1. Monitor match rates
2. Tune keywords based on feedback
3. Add synonym mapping
4. Optimize query performance

### Week 5: Cutover
1. If match rate >85%: Remove Pinecone
2. Save $70/month
3. Update documentation
4. Announce new feature

### Month 2-3: Complete Coverage
1. Add remaining 28 provinces
2. Reach 604 agencies total
3. Collect user feedback
4. Plan Phase 2 (city level)

---

## 🤔 Decision: Vector DB or Not?

### Analysis
**Do we need semantic search?**
- Current: "jalan rusak" → Kementerian PUPR ✅
- With keywords: "jalan rusak" → ["jalan", "rusak"] → Dinas PU ✅
- Edge case: "lampu merah mati" → Dinas Perhubungan (needs "traffic light" synonym)

**Verdict:** 
- ❌ **Don't need vector DB** for 90% of cases
- ✅ **Keyword + synonyms** is sufficient
- ✅ **Save $70/month** immediately
- ⚠️ **Keep Bedrock as fallback** for complex cases

### Recommendation
**Start with DynamoDB keywords, add Bedrock embeddings only if needed**

---

## 📝 Next Steps

**Awaiting Approval:**
1. Confirm DynamoDB approach
2. Approve $0.50/month budget (vs $70/month)
3. Prioritize top 10 provinces
4. Start data collection

**Questions to Answer:**
1. Should we crowdsource data collection?
2. How to verify social media accounts?
3. What's the minimum viable coverage? (10 provinces? 38?)
4. Should we launch incrementally or wait for full coverage?

---

**Prepared by:** Amazon Q  
**Review by:** Product Team  
**Approval needed:** Technical Lead, Finance

