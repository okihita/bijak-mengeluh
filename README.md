# Bijak Mengeluh 🇮🇩

> Turn your angry rants into polite government complaints. AI-powered, actually works.

**Live:** https://bijakmengeluh.id

---

## Why This Exists

Ever tried complaining to the government? You write an angry WhatsApp message, realize it won't work, give up. We fix that.

**What it does:**

- Takes your casual complaint ("Jalan rusak parah anjir 😤")
- Generates formal letter ("Kepada Yth. Bapak/Ibu...")
- Finds the right agency (Dinas PU Jakarta Selatan)
- Gives you their Twitter/Instagram to actually send it

**Result:** Your complaint gets heard. Roads get fixed. Democracy works.

---

## Quick Start

```bash
# Frontend
cd bijak-mengeluh-webapp && npm install && npm run dev

# Backend (requires AWS credentials + secrets in Parameter Store)
cd bijak-mengeluh-ai-backend && bash scripts/deploy.sh
```

See [docs/deployment/](./docs/deployment/) for full setup.

---

## Status

**🎉 Production (v2.0)**

- 121 agencies (31 national + 90 DKI Jakarta)
- $7-13/mo (saved $840/year by ditching Pinecone 💰)
- 100% match accuracy
- <2s response time

**🚧 Next (Phase 2)**

- Expand to 8,314 agencies (all Indonesia)
- Top 10 provinces (380 agencies)
- Timeline: Q1 2026

---

## Architecture

```
User types rant → Next.js → Lambda → Claude AI → DynamoDB
                                         ↓
                              Polite letter + Agency contact
```

**Stack:** Next.js 16, React 19, Python 3.12, AWS Bedrock, DynamoDB

**Cost Evolution:**
```
v1.0: $77-85/mo (Pinecone was expensive 😭)
v2.0: $7-13/mo  (DynamoDB FTW 🎉)
```

---

## Features

✅ AI complaint generation (formal/funny/angry tones)  
✅ Instagram Story sharing (9:16 viral format)  
✅ PWA (works offline)  
✅ Dark mode  
✅ Complaint history  
✅ Smart agency matching (city-level: "Jakarta Selatan" → local Dinas)  

---

## Documentation

- [ROADMAP.md](./ROADMAP.md) - What's next
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Code standards
- [docs/NOTES.md](./docs/NOTES.md) - Dev diary
- [docs/deployment/](./docs/deployment/) - Deployment guide
- [docs/testing/](./docs/testing/) - Testing guide

---

## Fun Facts

- **Saved $840/year** by replacing Pinecone with DynamoDB keyword matching
- **100% accuracy** on test cases (better than vector search!)
- **Instagram sharing** gets 3x more engagement than copy-paste
- **Most complained about:** Jalan rusak (broken roads) 🛣️

---

**Made by:** [@okihita](https://github.com/okihita) | **License:** MIT | **Complaints welcome:** GitHub Issues
