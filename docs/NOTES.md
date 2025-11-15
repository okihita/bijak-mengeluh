# Development Notes

The story of how we built this thing.

---

## Oct 2025: The Beginning

**Initial Setup** (Oct 14-15)

- Stack: Next.js 16, React 19, TypeScript, Tailwind v4

- Basic complaint form + AI generation

- **Why:** Wanted to help Indonesians complain effectively

**Instagram Sharing** (Oct 22-24)

- 9:16 viral Story format with html2canvas

- **Problem:** CSS inheritance broke image generation

- **Solution:** Isolated iframe rendering

- **Result:** 3x more engagement than copy-paste 🎉

**UX Improvements** (Oct 28 - Nov 4)

- Reduced vertical space (users scrolled too much)

- Auto-scroll to generated complaint (users missed it)

- Character counter (users wrote too much)

- **Learning:** Small UX tweaks = big impact

---

## Nov 2025: The Great Cost Optimization

**The Problem** (Nov 14)

- Pinecone: $70/mo (82% of total cost!)

- Only 34 agencies covered

- Users couldn't find local agencies

**The Pivot** (Nov 14)

- "What if we just use keyword matching?"

- Built DynamoDB keyword index

- Tested on 7 cases: 100% accuracy

- **Surprise:** Simpler = better (and cheaper!)

**DKI Jakarta Scraping** (Nov 14)

- Scraped 90 agencies in 45 minutes

- Cost: $0.03 (Serper API free tier + Bedrock $0.02)

- **Fun fact:** Automated scraping cheaper than 1 coffee ☕

**The Migration** (Nov 14-15)

- Replaced Pinecone with DynamoDB

- Response time: 500ms → 200ms (faster!)

- Cost: $77-85/mo → $7-13/mo

- **Savings:** $840/year 💰

---

## Architecture Evolution

**v1.0** (Oct 2025)
```
User → Next.js → Lambda → Bedrock + Pinecone
Cost: $77-85/mo | Coverage: 34 agencies
```
*Problem:* Expensive, limited coverage

**v2.0** (Nov 2025)
```
User → Next.js → Lambda → Bedrock + DynamoDB
Cost: $7-13/mo | Coverage: 124 agencies
```
*Win:* 10x cheaper, 3.6x more agencies

**Future**
```
Coverage: 8,314 agencies (all Indonesia!)
Cost: $0.61 one-time + $0.006/mo
```
*Plan:* Automated scraping + crowdsourcing

---

## Key Metrics

**Performance**

- Response time: <2s

- Match accuracy: 100% (7/7 test cases)

- DynamoDB query: <200ms

**Coverage**

- v1.0: 34 agencies

- v2.0: 124 agencies (+265%)

- Target: 8,314 agencies (+24,329%!)

**Cost**

- Before: $77-85/mo

- After: $7-13/mo

- Savings: $840/year (enough for 280 coffees ☕)

---

## Lessons Learned

**What Worked**

- ✅ Simple solutions beat complex ones (keyword > vector search)

- ✅ Test before building (7 test cases saved us)

- ✅ Incremental improvements (small UX tweaks compound)

- ✅ Cost analysis first (saved $840/year!)

**What Didn't**

- ❌ Over-engineering (Pinecone was overkill)

- ❌ Too many docs (had 23 files, now 4)

- ❌ Verbose commits (cleaned up history)

**Funny Moments**

- Spent 2 hours debugging CSS, solution was 1 line: `isolation: isolate`

- Pinecone cost more than our AWS bill combined

- "Let's just try keyword matching" → 100% accuracy 🤯

---

## Development Workflow

**Golden Rule:** Always run `npm run dev` before coding

**Before Committing:**
```bash
npm run build          # Must pass
npx tsc --noEmit      # No TypeScript errors
git commit -m "feat: description"
```

**Deployment:**

- Push to main → Auto-deploy via Vercel

- Wait 2-3 minutes

- Test on bijakmengeluh.id

---

## Next Steps

**Immediate**

- Remove Pinecone completely (90% done)

- Scrape 34 national ministries

- Celebrate $840/year savings 🎉

**Q1 2026**

- Top 10 provinces (380 agencies)

- Manual entry for quality

- 80% of complaints covered

**Q2 2026**

- All Indonesia (8,314 agencies)

- Crowdsourcing for updates

- Mobile app (PWA → native)

---

**Full historical docs:** `docs/archive/`
