# Roadmap

**Current Version:** v2.0 (Nov 2025)  
**Next Release:** v3.0 (when ready)

---

## ✅ v1.0 - Initial Release (Oct 2025)

**Delivered:**
- 34 national agencies
- AI complaint generation (formal/funny/angry tones)
- Pinecone vector search
- Instagram Story sharing
- PWA support
- Dark mode

**Cost:** $77-85/mo

---

## ✅ v2.0 - Cost Optimization (Nov 2025)

**Progress:** ██████████ 100% | **Status:** Production

**Delivered:**
- DynamoDB keyword matching (replaced Pinecone)
- 121 agencies (31 national + 90 DKI Jakarta)
- 100% match accuracy
- 50% faster response time (8-10s → 4-6s)
- 90% cost reduction ($77/mo → $7.50/mo)

**Savings:** $840/year

**Known Issues:**
- ⚠️ 0% test coverage (backend + frontend)
- ⚠️ No error monitoring
- ⚠️ 3 national ministries missing (scraping failed)

---

## 🚧 v3.0 - Local Coverage

**Progress:** ░░░░░░░░░░ 0% | **Status:** Planned

**Goal:** Expand to 380 agencies (top 10 provinces)

### Coverage Expansion
- **Top 10 provinces:** 380 agencies
- **Method:** Manual data entry (quality over speed)
- **Coverage:** 80% of Indonesian complaints
- **Cost:** $0 (manual entry)

### Quality Improvements
- Add automated tests (pytest + Jest)
- 80% test coverage target
- Error boundaries (frontend)
- CloudWatch alarms (backend)

### Performance
- Response streaming (SSE)
- Caching layer (Redis/ElastiCache)
- Request batching

**Success Criteria:**
- ✅ 380 agencies in database
- ✅ 95%+ match accuracy maintained
- ✅ <2s response time (P95)
- ✅ 80% test coverage
- ✅ Cost stays under $15/mo

**Estimated Cost:** $10.50/mo (+40%)

---

## 🔮 v4.0 - User Experience

**Progress:** ░░░░░░░░░░ 0% | **Status:** Planned

**Goal:** Track complaint progress and improve UX

### Complaint Tracking
- Follow-up reminders
- Status updates (submitted/in-progress/resolved)
- Success stories showcase
- Community voting on complaints

### Enhanced Features
- PDF export (printable letters)
- Email integration (send directly to agencies)
- Voice input (speech-to-text Indonesian)
- Enhanced social sharing (X/Twitter, WhatsApp)
- User accounts (cloud sync, optional)
- Community complaint templates

### Multi-language
- English support
- Auto-detect language
- Bilingual complaints (Indonesian + English)

**Success Criteria:**
- ✅ Complaint tracking functional
- ✅ 50% user retention (return visits)
- ✅ PDF export working
- ✅ Voice input 90%+ accuracy

**Estimated Cost:** $18/mo (+80% from v3.0)

---

## 🌟 v5.0 - National Coverage

**Goal:** All Indonesia (8,314 agencies)

### Full Coverage
- **All 38 provinces:** 570 agencies
- **514 cities:** 7,710 agencies
- **Method:** Automated scraping + crowdsourcing
- **Cost:** $0.61 one-time

### Crowdsourcing
- Community can add/update agencies
- Verification system (upvotes/downvotes)
- Gamification (badges, leaderboards)

### AI Improvements
- Multi-model support (GPT-4, Gemini)
- Tone detection (auto-select formal/funny/angry)
- Complaint quality scoring
- Auto-suggest improvements

**Success Criteria:**
- ✅ 8,314 agencies in database
- ✅ 95%+ match accuracy
- ✅ <3s response time
- ✅ Cost stays under $20/mo

---

## 🚀 v6.0 - Mobile App

**Goal:** Native mobile experience

### Mobile App
- React Native (iOS + Android)
- Offline mode (full PWA features)
- Push notifications (follow-up reminders)
- Camera integration (photo evidence)
- Location services (auto-detect city)

### Backend Improvements
- Multi-region deployment (Jakarta + Singapore)
- CDN for static assets
- Database replication
- Auto-scaling policies

**Success Criteria:**
- ✅ App Store + Play Store published
- ✅ 10K+ downloads in first month
- ✅ 4.5+ star rating
- ✅ 99.9% uptime

---

## 📊 Version Comparison

| Version | Status | Agencies | Cost/mo | Key Feature |
|---------|--------|----------|---------|-------------|
| v1.0 | Released Oct 2025 | 34 | $77 | Initial release |
| v2.0 | Released Nov 2025 | 121 | $7.50 | DynamoDB migration |
| v3.0 | Planned | 380 | $10.50 | Top 10 provinces |
| v4.0 | Planned | 380 | $18 | Complaint tracking |
| v5.0 | Planned | 8,314 | $20 | All Indonesia |
| v6.0 | Planned | 8,314 | $25 | Mobile app |

---

## Success Metrics

### v3.0 Targets
- 380 agencies
- 80% test coverage
- <2s response time
- $10.50/mo cost

### v4.0 Targets
- 50% user retention
- Complaint tracking functional
- PDF export working

### v5.0 Targets
- 8,314 agencies
- 95%+ match accuracy
- <3s response time
- $20/mo cost

### v6.0 Targets
- 10K+ app downloads
- 4.5+ star rating
- 99.9% uptime

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to help with any version.

**Priority areas:**
- v3.0: Manual agency data entry
- v3.0: Automated tests
- v4.0: Complaint tracking design
- v5.0: Crowdsourcing platform

---

**Last Updated:** Nov 15, 2025
