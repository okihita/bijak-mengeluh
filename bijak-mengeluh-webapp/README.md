# Bijak Mengeluh

> 🇮🇩 AI-powered complaint letter generator for Indonesian public services

**Helping Indonesian citizens write effective complaints and find the right government agencies to contact.**

---

## 🚨 Priority: Cost Optimization

**Current Monthly Cost:** ~$77-85  
**Target:** < $50/month

### Immediate Actions Needed
1. **Review Pinecone plan** - $70/month (biggest cost)
   - Check if serverless is cheaper than pod
   - Consider alternatives (Weaviate, Qdrant)
2. **Implement request caching** - Reduce Bedrock calls
3. **Add rate limiting** - Prevent abuse

See [COST_ANALYSIS.md](./COST_ANALYSIS.md) for details.

---

## 🤖 For AI Agents

### When Updating Documentation
**If any .md file exceeds 500 lines:**
1. Create a summary at the top (max 50 lines)
2. Move detailed history to `docs/archive/[filename]-archive.md`
3. Keep only current phase and next steps in main file
4. Link to archive for full history

**Example:**
```markdown
# Document Title

## Summary
[50 lines max - current status and key info]

## Current Phase
[Active work]

## Next Steps
[Upcoming work]

---
📜 [Full History](./docs/archive/document-archive.md)
```

---

## 📦 Repositories

This project consists of two main repositories:

### 🎨 [Frontend](./aic-complaint-app)
Next.js 16 web application with PWA support
- **Tech:** React 19, TypeScript, Tailwind CSS v4
- **Features:** Real-time quality scoring, tone selector, dark mode
- **Deployment:** Vercel (auto-deploy from main)
- **URL:** https://bijakmengeluh.id

### 🧠 [Backend](./bijak-mengeluh-ai-backend)
AWS Lambda serverless API with AI processing
- **Tech:** Python 3.12, AWS Bedrock, Pinecone, DynamoDB
- **Features:** Parallel processing, ministry matching, social media lookup
- **Deployment:** AWS SAM (ap-southeast-2)
- **URL:** https://brain.bijakmengeluh.id

---

## 🏗️ Architecture

```
User Browser → Next.js (Vercel) → API Gateway → Lambda → Bedrock AI
                                                    ├─→ Pinecone
                                                    └─→ DynamoDB
```

---

## 📖 Documentation

- [Style Guide](./STYLE_GUIDE.md) - **Unified coding standards**
- [Frontend Docs](./aic-complaint-app/docs/README.md)
- [Backend Docs](./bijak-mengeluh-ai-backend/README.MD)
- [Development Workflow](./aic-complaint-app/docs/DEVELOPMENT.md)

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

## 📝 Unified Naming Conventions

| Concept | Term | Frontend | Backend |
|---------|------|----------|---------|
| User input | `complaint` | ✅ | ✅ |
| AI output | `generatedComplaint` | ✅ | ✅ |
| Government agency | `ministry` | ✅ | ✅ |
| Confidence | `matchScore` | ✅ | ✅ |

See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for complete conventions.

---

**Last Updated:** Nov 14, 2025  
**Version:** Frontend 1.4.0 | Backend 1.1.0
