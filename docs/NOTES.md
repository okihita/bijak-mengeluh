# Development Notes

Chronological record of development decisions, implementations, and outcomes.

---

## Oct 2025: Foundation

**Initial Setup** (Oct 14-15)
- Stack: Next.js 16, React 19, TypeScript, Tailwind v4
- Basic complaint form + AI generation

**Instagram Sharing** (Oct 22-24)
- 9:16 viral Story format
- html2canvas image generation
- Isolated iframe rendering
- Files: `src/lib/share-image.ts`, `src/app/page.tsx`

**UX Improvements** (Oct 28 - Nov 4)
- Reduced vertical space, added tagline
- Auto-scroll, compact layout, character counter
- Smooth animations, color refinements
- Template suggestions

---

## Nov 2025: Cost Optimization & DynamoDB Migration

**Style Unification** (Nov 14)
- Unified naming: `complaint` (not `prompt`), `ministry` (not `contact`)
- API backward compatibility maintained
- Conventional commit format

**Cost Analysis** (Nov 14)
- Before: $77-85/mo (Pinecone $70 + DynamoDB $5 + Bedrock $2-5 + Lambda $0-3)
- After: $7-13/mo (DynamoDB $0.50 + Bedrock $2-5 + Lambda $0-3)
- Savings: $70/mo = $840/year

**DKI Jakarta Scraping** (Nov 14)
- 90 agencies (15 provincial + 75 municipal)
- Cost: $0.03 (Serper API free + Bedrock $0.02)
- Match accuracy: 100% (7/7 test cases)
- Response time: <200ms

**DynamoDB Migration** (Nov 14-15)
- Keyword-based matching (replace Pinecone vector search)
- 100% accuracy on test cases
- Production deployment complete
- Pinecone removal pending

---

## Architecture Evolution

**v1.0** (Oct 2025)
```
User → Next.js → Lambda → Bedrock + Pinecone
Cost: $77-85/mo | Coverage: 34 national ministries
```

**v2.0** (Nov 2025)
```
User → Next.js → Lambda → Bedrock + DynamoDB
Cost: $7-13/mo | Coverage: 124 agencies (34 national + 90 DKI)
```

**Future**
```
Coverage: 8,314 agencies (38 provinces + 514 cities)
Method: Automated scraping + crowdsourcing
Cost: $0.61 one-time + $0.006/mo ongoing
```

---

## Key Metrics

**Performance**
- Response time: <2s
- Match accuracy: 100%
- DynamoDB query: <200ms

**Coverage**
- v1.0: 34 agencies
- v2.0: 124 agencies (+265%)
- Target: 8,314 agencies

**Cost**
- Before: $77-85/mo
- After: $7-13/mo
- Savings: $840/year

---

## Development Workflow

**Critical Rule:** Always run local dev server before coding
```bash
cd aic-complaint-app && npm run dev
```

**Before Committing:**
- Test on localhost:3000
- Check console for errors
- Run `npm run build`
- Verify TypeScript: `npx tsc --noEmit`

**Deployment:**
- Push to main → Auto-deploy via Vercel
- Wait 2-3 minutes for production
- Test on bijakmengeluh.id

---

## Next Steps

**Immediate**
- Complete Pinecone removal
- Scrape 34 national ministries
- Validate >95% accuracy

**Q1 2026**
- Expand to top 10 provinces (380 agencies)
- Manual data entry for quality
- Monitor cost savings

**Q2 2026**
- Full Indonesia coverage (8,314 agencies)
- Crowdsourcing for updates
- Mobile app (PWA → native)

---

**Full historical docs:** `docs/archive/`
