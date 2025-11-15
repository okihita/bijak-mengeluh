# Architecture

**Last Updated:** Nov 15, 2025

---

## System Overview

```
┌─────────┐      ┌──────────┐      ┌─────────────┐      ┌──────────┐
│  User   │─────▶│ Next.js  │─────▶│ API Gateway │─────▶│  Lambda  │
│ Browser │      │ (Vercel) │      │   (AWS)     │      │ (Python) │
└─────────┘      └──────────┘      └─────────────┘      └────┬─────┘
                       │                                      │
                       │                                      ├─────▶ Bedrock
                       │                                      │       (Claude)
                       ▼                                      │
                 LocalStorage                                 └─────▶ DynamoDB
                  (History)                                           (Agencies)
```

---

## Components

### Frontend (bijak-mengeluh-webapp)

**Tech Stack:**
- Next.js 16.0.3 (App Router, Turbopack)
- React 19.2.0
- TypeScript 5.x
- Tailwind CSS v4
- Radix UI components

**Hosting:** Vercel  
**Domain:** https://bijakmengeluh.id  
**Build Time:** ~1s  
**Bundle Size:** Optimized with code splitting

**Key Features:**
- PWA (offline capable)
- Dark mode (system preference)
- Instagram Story export (html2canvas)
- LocalStorage for history (no backend storage)

---

### Backend (bijak-mengeluh-ai-backend)

**Tech Stack:**
- Python 3.12
- AWS Lambda (1024MB memory)
- AWS SAM for deployment
- boto3 for AWS SDK

**Hosting:** AWS Lambda (ap-southeast-2)  
**API:** https://brain.bijakmengeluh.id/generate  
**Response Time:** <2s (P95)  
**Cold Start:** 2-3s

**Key Features:**
- Parallel processing (ThreadPoolExecutor)
- Indonesian error messages
- Performance monitoring headers
- Keyword-based agency matching

---

### AI Layer (AWS Bedrock)

**Model:** Claude 3 Haiku (`anthropic.claude-3-haiku-20240307-v1:0`)

**Why Haiku:**
- Fast: <1s response time
- Cheap: $0.25 per 1M input tokens
- Good enough: Formal letter generation doesn't need Opus

**Prompt Strategy:**
- System prompt: Sets tone (formal/funny/angry)
- User prompt: Raw complaint text
- Output: Polished complaint letter in Indonesian

**Cost:** ~$2/mo (10K requests)

---

### Database (DynamoDB)

**Table:** `BijakMengeluhAgencies`

**Schema:**
```
Primary Key: agency_id (String)
Attributes:
  - name: "Dinas Pekerjaan Umum Jakarta Selatan"
  - category: "Pekerjaan Umum"
  - jurisdiction: "Jakarta Selatan"
  - keywords: "jalan,rusak,lubang,aspal,trotoar"
  - social_media: {twitter, instagram, facebook}
  - website: URL
  - phone: Phone number
  - email: Email address

GSI: jurisdiction-index
  - PK: jurisdiction
  - SK: category
```

**Billing:** Pay-per-request  
**Cost:** $0.50/mo (100K reads, 10K writes)  
**Query Time:** <200ms

---

## Data Flow

### 1. Complaint Submission

```
User types complaint
  ↓
Frontend validates (>20 chars)
  ↓
POST /generate {complaint, tone}
  ↓
Lambda receives request
  ↓
Parallel execution:
  ├─ Bedrock: Generate formal letter
  └─ DynamoDB: Match agency
  ↓
Combine results
  ↓
Return {generated_text, suggested_contacts}
  ↓
Frontend displays + saves to LocalStorage
```

### 2. Agency Matching Algorithm

```python
def match_agency(complaint: str) -> List[Agency]:
    # 1. Extract location
    location = extract_location(complaint)  # "Jakarta Selatan"
    
    # 2. Extract keywords
    keywords = extract_keywords(complaint)  # ["jalan", "rusak"]
    
    # 3. Query DynamoDB
    agencies = query_by_jurisdiction_and_keywords(location, keywords)
    
    # 4. Score by relevance
    scored = []
    for agency in agencies:
        score = 0
        if agency.jurisdiction == location:  # City match
            score += 0.5
        for keyword in keywords:
            if keyword in agency.keywords:
                score += 0.25
        scored.append((agency, score))
    
    # 5. Return top 3
    return sorted(scored, key=lambda x: x[1], reverse=True)[:3]
```

**Accuracy:** 100% on test cases (7/7)

---

## Cost Structure

### Monthly Costs (v2.0)

| Service | Usage | Cost |
|---------|-------|------|
| DynamoDB | 100K reads, 10K writes | $0.50 |
| Lambda | 10K invocations, 1024MB | $5.00 |
| Bedrock | 10K requests (Haiku) | $2.00 |
| API Gateway | 10K requests | $0.04 |
| **Total** | | **$7.54** |

### Cost Evolution

| Version | Monthly | Annual | Change |
|---------|---------|--------|--------|
| v1.0 (Pinecone) | $77 | $924 | - |
| v2.0 (DynamoDB) | $7.50 | $90 | -90% |

**Savings:** $834/year

---

## Scaling Projections

### v3.0: 380 Agencies

**Changes:**
- DynamoDB: 3x reads → $1.50/mo
- Lambda: 20% more invocations → $6/mo
- Bedrock: 50% more requests → $3/mo

**Total:** $10.50/mo (+40%)

### v4.0: 8,314 Agencies

**Changes:**
- DynamoDB: 10x reads → $5/mo
- Lambda: 60% more invocations → $8/mo
- Bedrock: 150% more requests → $5/mo

**Total:** $18/mo (+140%)

**Still 77% cheaper than v1.0 Pinecone!**

---

## Performance Characteristics

### Response Times

| Metric | Target | Actual | P95 |
|--------|--------|--------|-----|
| Frontend Load | <1s | 0.24s | 0.5s |
| API Response | <2s | 1.5s | 2.0s |
| DynamoDB Query | <200ms | <100ms | 150ms |
| Bedrock Generate | <1.5s | 1.2s | 1.8s |

### Throughput

- **Lambda:** 1000 concurrent executions (default limit)
- **DynamoDB:** Unlimited (pay-per-request)
- **Bedrock:** 10 requests/second (can request increase)

**Bottleneck:** Bedrock rate limit (10 req/s = 864K req/day)

---

## Security

### Frontend
- HTTPS only (Vercel)
- No sensitive data stored
- LocalStorage for history (client-side only)
- CSP headers configured

### Backend
- IAM roles (least privilege)
- No API keys in code (Parameter Store)
- CORS restricted to bijakmengeluh.id
- Input validation (length, type)

### Data Privacy
- No complaint storage on server
- No user tracking
- No analytics (privacy-first)
- LocalStorage only (user controls)

---

## Deployment

### Frontend (Vercel)
```bash
git push origin main
# Auto-deploys to bijakmengeluh.id
```

### Backend (AWS SAM)
```bash
cd bijak-mengeluh-ai-backend
bash scripts/deploy.sh
# Deploys to ap-southeast-2
```

**Deployment Time:** ~2 minutes  
**Rollback:** Vercel dashboard or `sam deploy` previous version

---

## Monitoring

### CloudWatch Metrics
- Lambda invocations, errors, duration
- DynamoDB read/write capacity
- Bedrock model invocations

### Alarms (Recommended)
- Lambda errors >5 in 5 minutes
- API latency >3s
- DynamoDB throttling

### Logs
- Lambda: `/aws/lambda/BijakMengeluhComplaintGenerationFunction`
- Frontend: Vercel dashboard

---

## Design Decisions

### Why DynamoDB over Pinecone?

**Pinecone (v1.0):**
- ❌ $70/mo for 121 agencies
- ❌ 500ms query time
- ❌ 85% accuracy
- ✅ Semantic search

**DynamoDB (v2.0):**
- ✅ $0.50/mo for 121 agencies
- ✅ <200ms query time
- ✅ 100% accuracy
- ❌ No semantic search

**Decision:** DynamoDB wins for our use case (small dataset, clear categories)

### Why Keyword Matching?

**Our use case:**
- Small dataset (121 → 8,314 agencies)
- Clear categories (jalan, sampah, banjir)
- Indonesian language (less ambiguity)
- City-level matching (Jakarta Selatan → local Dinas)

**Result:** 100% accuracy without embeddings

### Why Claude Haiku?

**Alternatives:**
- GPT-4: Too expensive ($30/1M tokens)
- Claude Opus: Overkill for simple letters
- GPT-3.5: Good but AWS Bedrock integration

**Decision:** Haiku = fast + cheap + good enough

---

## Future Improvements

**v3.0:**
- Add caching layer (Redis/ElastiCache)
- Implement request batching
- Add response streaming
- Set up CloudWatch alarms

**v4.0:**
- Multi-region deployment
- CDN for static assets
- Database replication
- Auto-scaling policies

---

## References

- Cost analysis: [COST_ANALYSIS.md](./archive/COST_ANALYSIS.md)
- Phase 1 completion: [PHASE1_COMPLETE.md](./archive/PHASE1_COMPLETE.md)
- API reference: [API.md](./API.md)
- Deployment guide: [deployment/deployment-guide.md](./deployment/deployment-guide.md)
