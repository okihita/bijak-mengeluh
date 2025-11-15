# Bijak Mengeluh

> AI-powered complaint letter generator for Indonesian public services

**Live:** https://bijakmengeluh.id

---

## Quick Start

```bash
# Frontend
cd aic-complaint-app && npm install && npm run dev

# Backend
cd bijak-mengeluh-ai-backend && sam build && sam deploy
```

---

## Status

**Production**
- 124 agencies (34 national + 90 DKI Jakarta)
- $7-13/mo (down from $77-85/mo)
- 100% match accuracy

**In Progress**
- Remove Pinecone dependency
- Expand to 8,314 agencies

---

## Documentation

- [ROADMAP.md](./ROADMAP.md) - Development plan
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Coding standards
- [LOCAL_GOVT_EXPANSION_SPEC.md](./LOCAL_GOVT_EXPANSION_SPEC.md) - Expansion plan
- [docs/HISTORY.md](./docs/HISTORY.md) - Timeline
- [docs/ARCHIVE.md](./docs/ARCHIVE.md) - Historical summary

---

## Architecture

```
User → Next.js → API Gateway → Lambda → Bedrock + DynamoDB
```

**Stack:** Next.js 16, React 19, Python 3.12, AWS Bedrock, DynamoDB

---

**Maintainer:** @okihita | **License:** MIT
