# v2.4 Documentation

**Status:** ✅ Complete  
**Date:** November 17, 2025

---

## Quick Links

**Implementation:**
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - What was built
- [SPEC_MATCH.md](./SPEC_MATCH.md) - Spec compliance checklist

**Specifications:**
- [DIRECTORY_UX_SPEC_v2.4.md](./DIRECTORY_UX_SPEC_v2.4.md) - Locked UX spec
- [DIRECTORY_UX_SPEC_v2.4_SCALING.md](./DIRECTORY_UX_SPEC_v2.4_SCALING.md) - Region filtering for 30+ provinces
- [DATABASE_SCHEMA_v2.4.md](./DATABASE_SCHEMA_v2.4.md) - Database expansion plan

**Planning (Archive):**
- [PLAN_v2.4.md](./PLAN_v2.4.md) - Original planning document
- [SPEC_v2.4.md](./SPEC_v2.4.md) - Original spec
- [dirspec.md](./dirspec.md) - External AI-generated UX spec
- [DIRECTORY_IMPLEMENTATION_PLAN.md](./DIRECTORY_IMPLEMENTATION_PLAN.md) - Technical translation

**Design System:**
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Visual design tokens
- [DESIGN_IMPLEMENTATION_GUIDE.md](./DESIGN_IMPLEMENTATION_GUIDE.md) - Implementation patterns
- [PAGE_AUDIT_CHECKLIST.md](./PAGE_AUDIT_CHECKLIST.md) - Quality checklist

---

## What's New in v2.4

### Problem-First Directory
- Search by problem ("jalan rusak") not agency names
- Synonym mapping: "aspal bolong" → "jalan rusak"
- 6 category cards for browsing
- 36 province dropdown filter
- Combined filtering (region + category + search)

### Agency Detail Page
- Full contact information (phone, email, website)
- Social media links (Instagram, Twitter, Facebook, YouTube, TikTok)
- Location with Google Maps integration
- Description and keywords
- Mobile-optimized layout

### Database Expansion
- 15+ new fields added to schema
- Contact info: phone, email, website
- Social media: all major platforms
- Location: address, coordinates, maps URL
- Metadata: verified status, last updated

---

## Current Status

**Features:** 95% spec compliance  
**Data Coverage:** 25% (target: 80%)  
**Performance:** <2s load time  
**Cost:** $7/month (unchanged)

**Database:**
- 386 agencies total
- 100% have social media
- 25% have full contact info
- 0% have location data

---

## Next Steps

1. **Data Enrichment** - Scrape phone/email for remaining 75%
2. **Location Data** - Add addresses and coordinates
3. **Advanced Features** - Fuzzy search, geolocation, suggest edit

---

## Files Modified

**New:**
- `/src/app/directory/[id]/page.tsx`
- `/src/lib/problem-categories.ts`
- `/src/lib/synonyms.ts`
- `/src/lib/search-utils.ts`

**Modified:**
- `/src/app/directory/page.tsx` (complete rewrite)
- `/src/types/agency.ts` (expanded schema)

---

## Key Decisions

1. **Dropdown over chips** - Scales to 36 provinces
2. **Client-side filtering** - Instant, zero cost
3. **Native select** - Accessible, mobile-optimized
4. **Problem-first** - Users search by issue, not bureaucracy
5. **Backward compatible** - All new fields optional

---

Read [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for complete details.
