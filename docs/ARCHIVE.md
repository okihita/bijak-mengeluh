# Archive Summary

Historical documentation with implementation dates and key outcomes.

---

## Phase 1: Foundation (Oct 2025)

**Style Unification** (Nov 14, 2025)
- Unified naming: `complaint` (not `prompt`), `ministry` (not `contact`)
- API backward compatibility maintained
- Conventional commit format adopted

**Cost Analysis** (Nov 14, 2025)
- Before: $77-85/mo (Pinecone $70 + DynamoDB $5 + Bedrock $2-5 + Lambda $0-3)
- Target: <$50/mo
- Plan: Replace Pinecone with DynamoDB keyword matching

**Technical Debt** (Nov 14, 2025)
- Identified: Pinecone dependency, scattered docs, verbose commits
- Resolved: DynamoDB migration started, docs organized

---

## Phase 2: DynamoDB Migration (Nov 2025)

**Database Population** (Nov 14, 2025)
- Target: 8,314 agencies (34 national + 570 provincial + 7,710 city)
- Cost: $0.61 one-time + $0.006/mo ongoing
- Method: Automated scraping + manual verification

**DKI Jakarta Scraping** (Nov 14, 2025)
- Scope: 90 agencies (15 provincial + 75 municipal)
- Cost: $0.03 (Serper API free tier + Bedrock $0.02)
- Status: Completed

**Phase 1 Completion** (Nov 14, 2025)
- ✅ DynamoDB setup
- ✅ Keyword matching (100% accuracy)
- ✅ Production deployment
- ⏳ Pinecone removal pending

**Test Cases** (Nov 14, 2025)
- 3 DKI Jakarta test prompts validated
- Match accuracy: 100% (7/7 cases)
- Response time: <200ms

---

## Phase 3: UX & Features (Oct-Nov 2025)

**Instagram Sharing** (Oct 22-24, 2025)
- 9:16 viral Story format
- html2canvas image generation
- Isolated iframe rendering

**Usability Testing** (Oct-Nov 2025)
- Score: 9.0/10
- Key improvements: Auto-scroll, compact layout, character counter
- Production ready

**Project Summary** (Nov 2025)
- Version: 1.0.0 → 1.5.0
- Coverage: 34 → 124 agencies
- Cost: $77-85/mo → $7-13/mo (target)

---

## Deployment

**Phase 4 Deployment** (Nov 2025)
- Platform: Vercel (frontend) + AWS Lambda (backend)
- Region: ap-southeast-2 (Sydney)
- Auto-deploy: GitHub main branch

**Deployment Summary** (Nov 14, 2025)
- Frontend: https://bijakmengeluh.id
- Backend: https://brain.bijakmengeluh.id
- Status: Production

---

## Key Outcomes

**Cost Savings**
- Pinecone removal: -$70/mo
- DynamoDB optimization: -$4.50/mo
- Total savings: $840/year

**Coverage Expansion**
- National: 34 agencies ✅
- DKI Jakarta: 90 agencies ✅
- Future: 8,314 agencies (planned)

**Performance**
- Match accuracy: 100%
- Response time: <2s
- Uptime: 99.9%

---

**Full historical docs:** `docs/archive/`
