# Bijak Mengeluh

> 🇮🇩 AI-powered complaint letter generator for Indonesian public services

**Live:** https://bijakmengeluh.id | **Version:** 1.5.0

---

## 🚀 Quick Start

```bash
# Frontend
cd aic-complaint-app && npm install && npm run dev

# Backend
cd bijak-mengeluh-ai-backend && sam build && sam deploy
```

---

## 📊 Status

### Production
- **Stack:** Next.js 16 + AWS Lambda + Bedrock
- **Coverage:** 124 agencies (34 national + 90 DKI Jakarta)
- **Cost:** $7-13/mo (down from $77-85/mo)
- **Savings:** $840/year 🎉

### In Progress (75% complete)
- ✅ DynamoDB migration (replace Pinecone)
- ✅ Keyword-based matching (100% accuracy)
- ⏳ Full DKI scrape (90 agencies)
- ⏳ Remove Pinecone dependency

---

## 📖 Documentation

### Start Here
- **[ROADMAP.md](./ROADMAP.md)** - Development priorities
- **[docs/HISTORY.md](./docs/HISTORY.md)** - Complete timeline
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Coding standards

### Deep Dive
- [Cost Analysis](./COST_ANALYSIS.md) - Monthly cost breakdown
- [Local Govt Expansion](./LOCAL_GOVT_EXPANSION_SPEC.md) - Phase 1 spec
- [Frontend README](./aic-complaint-app/README.md)
- [Backend README](./bijak-mengeluh-ai-backend/README.MD)

### Archive
- [docs/archive/](./docs/archive/) - Historical docs

---

## 🎯 Roadmap

### Phase 1: Cost Optimization (NOW - 75% done)
**Goal:** <$50/mo | **Savings:** $840/year

- ✅ DynamoDB setup
- ✅ Matching algorithm
- ⏳ Full DKI scrape
- ⏳ Remove Pinecone

### Phase 2: Local Coverage (Q1 2026)
**Goal:** 8,314 agencies | **Cost:** $0

- Top 10 provinces (380 agencies)
- All 38 provinces (570 agencies)
- 514 cities (7,710 agencies)

### Phase 3: User Experience (Q2 2026)
**Goal:** Track complaints | **Cost:** $0

- Complaint history
- Follow-up tracking
- Success stories
- Mobile app

### Phase 4: Community (Q2 2026)
**Goal:** Collective voice | **Cost:** $0

- Public database
- Upvote system
- Agency rankings
- Community moderation

---

## 💰 Cost Savings

| Service | Before | After | Savings |
|---------|--------|-------|---------|
| Pinecone | $70/mo | $0 | $70/mo |
| DynamoDB | $5/mo | $0.50/mo | $4.50/mo |
| **Total** | **$77-85/mo** | **$7-13/mo** | **$70/mo** |

**Annual:** $840 saved

---

## 🏗️ Architecture

```
User → Next.js (Vercel) → API Gateway → Lambda → Bedrock AI
                                           └─→ DynamoDB (Keyword Index)
```

**Tech:**
- Frontend: Next.js 16, React 19, TypeScript, Tailwind v4
- Backend: Python 3.12, AWS Bedrock, DynamoDB
- Features: PWA, Instagram sharing, dark mode

---

## 🤝 Contributing

### AI Agents
- Keep docs <500 lines
- Move history to `docs/archive/`
- Follow [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- Prioritize user needs

### Humans
- Issues: GitHub Issues
- Features: Discussions
- Code: Pull Requests

---

**Maintainer:** @okihita | **License:** MIT
