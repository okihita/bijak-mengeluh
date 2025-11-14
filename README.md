# Bijak Mengeluh

> 🇮🇩 AI-powered complaint letter generator for Indonesian public services

**Helping Indonesian citizens write effective complaints and find the right government agencies to contact.**

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
