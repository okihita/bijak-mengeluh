# Roadmap - Bijak Mengeluh

**Prioritized by User Impact**

---

## 🎯 Phase 1: Cost Optimization + Local Coverage (NEXT)
**Timeline:** 4 weeks  
**Impact:** 🔥 Very High  
**Cost:** -$70/month

### Goals
1. Replace Pinecone ($70/mo) with DynamoDB ($0.50/mo)
2. Expand from 34 ministries to 604 agencies (38 provinces)
3. Enable local agency matching (Dinas Kesehatan, Dinas PU, etc.)

### User Benefits
- ✅ Find local government agencies (not just national)
- ✅ More relevant complaint routing
- ✅ Faster response times (local agencies more responsive)

### Implementation
- [x] Spec complete: [LOCAL_GOVT_EXPANSION_SPEC.md](../LOCAL_GOVT_EXPANSION_SPEC.md)
- [ ] Setup DynamoDB schema
- [ ] Collect top 10 provinces data (380 agencies)
- [ ] Implement keyword matching algorithm
- [ ] Deploy parallel run (DynamoDB + Pinecone fallback)
- [ ] Monitor & tune (target >85% match rate)
- [ ] Full cutover & remove Pinecone

**Savings:** $840/year

---

## 🏙️ Phase 2: City/Regency Coverage (Q1 2026)
**Timeline:** 8 weeks  
**Impact:** 🔥 Very High  
**Cost:** $0

### Goals
1. Add 514 cities/regencies (7,744 agencies total)
2. Location-aware routing
3. Hierarchical matching (city → province → national)

### User Benefits
- ✅ Precise local agency matching
- ✅ "Jalan rusak di Jakarta Selatan" → Jakarta Selatan Dinas PU
- ✅ Better complaint resolution rates

### Implementation
- [ ] Collect city-level data (crowdsource)
- [ ] Implement location extraction from complaint
- [ ] Add hierarchical matching logic
- [ ] Deploy incrementally (top 50 cities first)

---

## 📱 Phase 3: User Experience (Q2 2026)
**Timeline:** 4 weeks  
**Impact:** 🔥 High  
**Cost:** $0

### Goals
1. Complaint history & tracking
2. Follow-up reminders
3. Success stories showcase
4. Enhanced mobile experience

### User Benefits
- ✅ Track complaint status
- ✅ Get reminded to follow up
- ✅ See what works (success stories)
- ✅ Better mobile UX

### Features
- [ ] Complaint history page with search
- [ ] Status tracking (submitted, in progress, resolved)
- [ ] Email/push notifications for follow-ups
- [ ] Success stories section (anonymized)
- [ ] Mobile app (PWA → native)

---

## 🤝 Phase 4: Community Features (Q2 2026)
**Timeline:** 6 weeks  
**Impact:** 🔥 High  
**Cost:** $0

### Goals
1. Public complaint database (anonymized)
2. Upvote similar complaints
3. Agency response tracking
4. Community moderation

### User Benefits
- ✅ Collective voice (strength in numbers)
- ✅ See if others have same issue
- ✅ Track agency responsiveness
- ✅ Transparency & accountability

### Features
- [ ] Public complaint feed (opt-in, anonymized)
- [ ] Upvote/downvote system
- [ ] Agency response rate dashboard
- [ ] Community moderation tools
- [ ] Trending complaints section

---

## 🔮 Future Ideas (Backlog)

### Smart Features
- AI-powered follow-up suggestions
- Complaint template library (user-contributed)
- Multi-language support (regional languages)
- Voice input for complaints

### Integration
- WhatsApp bot for complaint submission
- Telegram bot
- Integration with LAPOR! (government system)
- API for third-party apps

### Analytics
- Complaint heatmap (geographic)
- Agency response time leaderboard
- Most common complaint types
- Success rate by agency

---

## 📊 Success Metrics

### Phase 1
- Match rate: >85%
- Cost: <$1/month
- Coverage: 604 agencies
- User satisfaction: >4.5/5

### Phase 2
- Coverage: 7,744 agencies
- Location accuracy: >90%
- Resolution rate: +20%

### Phase 3
- User retention: +30%
- Follow-up rate: +50%
- Mobile engagement: +40%

### Phase 4
- Community size: 10,000+ users
- Public complaints: 1,000+
- Agency engagement: 50+ agencies

---

**Last Updated:** Nov 15, 2025  
**Next Review:** Dec 15, 2025
