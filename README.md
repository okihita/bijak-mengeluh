# Bijak Mengeluh

> 🇮🇩 AI-powered complaint letter generator for Indonesian public services

**Helping Indonesian citizens write effective complaints and find the right government agencies.**

**Live:** https://bijakmengeluh.id | **Version:** 1.5.0

---

## 📊 Current Status

### ✅ Production Ready
- **Frontend:** Next.js 16 + React 19 (Vercel)
- **Backend:** AWS Lambda + Bedrock (ap-southeast-2)
- **Coverage:** 34 National Ministries
- **Cost:** ~$77-85/month

### 🎯 Next Priority: Cost Reduction
**Target:** <$50/month (35% reduction)  
**Plan:** [LOCAL_GOVT_EXPANSION_SPEC.md](./LOCAL_GOVT_EXPANSION_SPEC.md)
- Replace Pinecone ($70/mo) → DynamoDB ($0.50/mo)
- Expand to 604 agencies (38 provinces)
- **Save $840/year**

---

## 🚀 Quick Start

### Frontend
```bash
cd aic-complaint-app
npm install && npm run dev
```

### Backend
```bash
cd bijak-mengeluh-ai-backend
sam build && sam deploy --profile bijak-mengeluh-aws-iam
```

---

## 📦 Architecture

```
User → Next.js (Vercel) → API Gateway → Lambda → Bedrock AI
                                           ├─→ Pinecone (Vector DB)
                                           └─→ DynamoDB (Metadata)
```

**Tech Stack:**
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind v4
- **Backend:** Python 3.12, AWS Bedrock, Pinecone, DynamoDB
- **Features:** PWA, Instagram sharing, real-time scoring, dark mode

---

## 📖 Documentation

### Essential
- **[LOCAL_GOVT_EXPANSION_SPEC.md](./LOCAL_GOVT_EXPANSION_SPEC.md)** - Next major feature
- **[COST_ANALYSIS.md](./COST_ANALYSIS.md)** - Cost breakdown & optimization
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Coding standards

### Reference
- [Frontend README](./aic-complaint-app/README.md)
- [Backend README](./bijak-mengeluh-ai-backend/README.MD)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Roadmap](./docs/ROADMAP.md)

---

## 🎯 Roadmap (User Priority)

### Phase 1: Cost Optimization (NEXT)
**Timeline:** 4 weeks | **Impact:** High | **Cost:** -$70/month

1. ✅ Spec complete: [LOCAL_GOVT_EXPANSION_SPEC.md](./LOCAL_GOVT_EXPANSION_SPEC.md)
2. ⏳ Replace Pinecone with DynamoDB keyword matching
3. ⏳ Expand to 604 agencies (38 provinces)
4. ⏳ Deploy & monitor (parallel run)

**User Benefit:** Find local agencies (Dinas Kesehatan, Dinas PU, etc.)

---

### Phase 2: Local Coverage (Q1 2026)
**Timeline:** 8 weeks | **Impact:** Very High | **Cost:** $0

1. Add 514 cities/regencies (7,744 agencies total)
2. Location-aware routing ("Jakarta Selatan" → local Dinas)
3. Crowdsourced data updates

**User Benefit:** Precise local agency matching

---

### Phase 3: User Experience (Q2 2026)
**Timeline:** 4 weeks | **Impact:** Medium | **Cost:** $0

1. Complaint history with search
2. Follow-up tracking
3. Success stories showcase
4. Mobile app (PWA → native)

**User Benefit:** Track complaint progress

---

### Phase 4: Community (Q2 2026)
**Timeline:** 6 weeks | **Impact:** High | **Cost:** $0

1. Public complaint database (anonymized)
2. Upvote similar complaints
3. Agency response tracking
4. Community moderation

**User Benefit:** Collective voice, transparency

---

## 💰 Cost Breakdown

| Service | Current | After Phase 1 | Savings |
|---------|---------|---------------|---------|
| Pinecone | $70/mo | $0 | $70/mo |
| DynamoDB | $5/mo | $5.50/mo | -$0.50/mo |
| Bedrock | $2-5/mo | $2-5/mo | $0 |
| Lambda | $0-3/mo | $0-3/mo | $0 |
| **Total** | **$77-85/mo** | **$7-13/mo** | **$70/mo** |

**Annual Savings:** $840

---

## 🤝 Contributing

### For AI Agents
- Keep docs under 500 lines (move history to `docs/archive/`)
- Follow [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- Update this README when adding features
- Prioritize user needs over technical elegance

### For Humans
- Report issues: GitHub Issues
- Suggest features: Discussions
- Contribute: Pull Requests welcome

---

## 📝 Naming Conventions

| Concept | Term | Example |
|---------|------|---------|
| User input | `complaint` | "Jalan rusak..." |
| AI output | `generatedComplaint` | "Kepada Yth..." |
| Agency | `ministry` | "Kementerian PUPR" |
| Match confidence | `matchScore` | 0.85 (85%) |

---

**Last Updated:** Nov 15, 2025  
**Maintainer:** @okihita  
**License:** MIT
