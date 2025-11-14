# Database Population Cost Analysis

**Date:** 2025-11-15  
**Scope:** Populate DynamoDB with maximum regional coverage

---

## 📊 Coverage Breakdown

### National Level (Current)
- **Agencies:** 34 ministries
- **Status:** ✅ Already populated
- **Cost:** $0 (already done)

### Provincial Level (Phase 1)
- **Provinces:** 38
- **Dinas per province:** ~15 (average)
- **Total agencies:** 570
- **Priority:** Top 10 provinces first (380 agencies)

### City/Regency Level (Phase 2)
- **Cities/Regencies:** 514
- **Dinas per city:** ~15 (average)
- **Total agencies:** 7,710

### **GRAND TOTAL:** 34 + 570 + 7,710 = **8,314 agencies**

---

## 💰 DynamoDB Storage Cost

### Data Structure per Agency
```json
{
  "agency_id": "dki-dinkes",           // 20 bytes
  "province": "DKI Jakarta",           // 30 bytes
  "city": "Jakarta Selatan",           // 30 bytes
  "name": "Dinas Kesehatan...",        // 100 bytes
  "level": "provincial",               // 20 bytes
  "keywords": ["kesehatan", ...],      // 200 bytes (10 keywords)
  "social_media": {...},               // 300 bytes
  "website": "https://...",            // 100 bytes
  "phone": "021-1234567",              // 30 bytes
  "email": "info@...",                 // 50 bytes
  "created_at": "2025-11-15...",       // 30 bytes
  "updated_at": "2025-11-15..."        // 30 bytes
}
```

**Average size per agency:** ~1 KB (conservative estimate)

### Storage Calculation
- **8,314 agencies × 1 KB = 8.3 MB**
- **DynamoDB storage:** $0.25 per GB/month
- **Cost:** 8.3 MB × $0.25 / 1024 MB = **$0.002/month**

**Verdict:** Storage is essentially FREE 💰

---

## 💰 Initial Write Cost

### DynamoDB Write Units
- **1 WCU = 1 write per second**
- **On-demand pricing:** $1.25 per million writes

### One-Time Population
- **8,314 agencies × 1 write each = 8,314 writes**
- **Cost:** 8,314 / 1,000,000 × $1.25 = **$0.01**

**Verdict:** One-time cost is negligible 💰

---

## 💰 Data Collection Cost

### Option 1: Manual Entry (FREE)
**Method:** Spreadsheet + manual research

**Time estimate:**
- Per agency: 5 minutes (research + data entry)
- 8,314 agencies × 5 min = 41,570 minutes = **693 hours**
- At 8 hours/day = **87 days** (3 months)

**Cost:** $0 (your time)

**Pros:**
- ✅ Free
- ✅ High quality data
- ✅ Verified social media accounts

**Cons:**
- ❌ Very time-consuming
- ❌ Boring/tedious work

---

### Option 2: Crowdsourcing (FREE)
**Method:** Public form + community contributions

**Implementation:**
1. Create Google Form for agency submissions
2. Share on social media
3. Verify submissions manually
4. Import to DynamoDB

**Time estimate:**
- Setup: 2 hours
- Verification: 2 minutes per submission
- 8,314 agencies × 2 min = 277 hours (if all submitted)

**Cost:** $0

**Pros:**
- ✅ Free
- ✅ Community-driven
- ✅ Scalable

**Cons:**
- ❌ Unpredictable timeline
- ❌ Quality varies
- ❌ Still need verification

---

### Option 3: Web Scraping (CHEAP)
**Method:** Automated scraping of government websites

**Sources:**
- Wikipedia (list of provinces/cities)
- satu.indonesia.go.id
- Individual government websites

**Tools:**
- Python + BeautifulSoup (free)
- Scrapy (free)
- AWS Lambda (for automation)

**Time estimate:**
- Script development: 8 hours
- Running scraper: 2-4 hours
- Data cleaning: 20 hours
- **Total: ~30 hours**

**Cost:**
- Lambda execution: 8,314 requests × 1 second = 2.3 hours
- Lambda cost: $0.0000166667 per GB-second
- **Total: ~$0.50**

**Pros:**
- ✅ Very cheap
- ✅ Fast (days, not months)
- ✅ Repeatable (for updates)

**Cons:**
- ❌ Data quality varies
- ❌ Social media harder to scrape
- ❌ May miss some agencies

---

### Option 4: Hybrid (RECOMMENDED)
**Method:** Scraping + Manual + Crowdsourcing

**Phase 1: Top 10 Provinces (380 agencies)**
- Manual entry: 380 × 5 min = 32 hours
- Cost: $0

**Phase 2: Remaining 28 Provinces (190 agencies)**
- Web scraping: 190 agencies
- Cost: $0.10

**Phase 3: Cities (7,710 agencies)**
- Web scraping baseline: 7,710 agencies
- Crowdsource social media: Community form
- Cost: $0.50

**Total time:** 32 hours + 20 hours cleanup = **52 hours**  
**Total cost:** $0.60

**Pros:**
- ✅ Best quality for high-traffic provinces
- ✅ Scalable for long tail
- ✅ Community engagement
- ✅ Fast enough (1-2 weeks)

**Cons:**
- ⚠️ Still requires manual work for top provinces

---

## 💰 Social Media Data Collection

### Twitter/X API
- **Free tier:** 1,500 requests/month
- **Cost per agency:** 1 request
- **8,314 agencies / 1,500 = 6 months** (if using free tier)
- **Paid tier:** $100/month (unlimited)
- **Cost:** $0 (use free tier over 6 months) or $100 one-time

### Instagram
- **No official API for public data**
- **Method:** Manual entry or scraping
- **Cost:** $0 (manual) or $50 (scraping service)

### Facebook
- **Graph API:** Free tier available
- **Cost:** $0

### **Total Social Media Cost:** $0-150 (one-time)

---

## 💰 Ongoing Maintenance Cost

### Monthly Updates
- **Agencies to verify:** 8,314
- **Verification rate:** 1% per month (83 agencies)
- **Time per verification:** 2 minutes
- **Monthly time:** 166 minutes = **2.8 hours**

**Cost:** $0 (your time) or crowdsource

### DynamoDB Ongoing Cost
- **Storage:** $0.002/month (8.3 MB)
- **Reads:** 1,000 complaints/month × 3 reads = 3,000 RCU
- **Read cost:** $0.25 per million reads = **$0.0008/month**
- **Writes:** 83 updates/month = **$0.0001/month**

**Total ongoing:** **$0.003/month** (essentially free)

---

## 📊 Cost Summary

| Phase | Method | Agencies | Time | One-Time Cost | Monthly Cost |
|-------|--------|----------|------|---------------|--------------|
| **National** | Already done | 34 | 0 | $0 | $0 |
| **Phase 1: Top 10 Provinces** | Manual | 380 | 32 hrs | $0 | $0.001 |
| **Phase 1: Other Provinces** | Scraping | 190 | 10 hrs | $0.10 | $0.0005 |
| **Phase 2: Cities** | Scraping + Crowd | 7,710 | 20 hrs | $0.50 | $0.002 |
| **Social Media** | Mixed | 8,314 | 40 hrs | $0-150 | $0 |
| **DynamoDB Write** | One-time | 8,314 | - | $0.01 | - |
| **DynamoDB Storage** | Ongoing | 8,314 | - | - | $0.003 |
| **TOTAL** | | **8,314** | **102 hrs** | **$0.61-150** | **$0.006** |

---

## 🎯 Recommended Approach

### Phase 1: Quick Win (Week 1-2)
**Scope:** Top 10 provinces (380 agencies)  
**Method:** Manual entry  
**Cost:** $0  
**Time:** 32 hours (4 days × 8 hours)

**Provinces:**
1. DKI Jakarta (most complaints)
2. Jawa Barat
3. Jawa Timur
4. Jawa Tengah
5. Banten
6. Sumatera Utara
7. Sulawesi Selatan
8. Bali
9. Kalimantan Timur
10. Riau

**Coverage:** ~80% of user complaints

---

### Phase 2: Scale Up (Week 3-4)
**Scope:** Remaining 28 provinces (190 agencies)  
**Method:** Web scraping + manual verification  
**Cost:** $0.10  
**Time:** 10 hours

**Coverage:** 100% of provinces

---

### Phase 3: Full Coverage (Month 2-3)
**Scope:** 514 cities (7,710 agencies)  
**Method:** Web scraping + crowdsourcing  
**Cost:** $0.50  
**Time:** 20 hours + community contributions

**Coverage:** 100% of cities

---

## 💡 Cost Optimization Tips

### 1. Start Small
- Launch with top 10 provinces (380 agencies)
- Validate approach before scaling
- Cost: $0

### 2. Leverage Community
- Create public submission form
- Gamify contributions (leaderboard)
- Verify submissions manually
- Cost: $0

### 3. Automate Verification
- Script to check if social media accounts exist
- Flag suspicious entries for manual review
- Cost: $0.10 (Lambda)

### 4. Incremental Updates
- Update 1% of database per month (83 agencies)
- Crowdsource updates via "Report outdated info" button
- Cost: $0

---

## 🚨 Risk Analysis

### Risk 1: Data Quality
**Impact:** Users get wrong contact info  
**Mitigation:**
- Manual entry for top 10 provinces (high traffic)
- Verification script for scraped data
- Community reporting for errors
- "Last verified" timestamp

### Risk 2: Time Overrun
**Impact:** Delayed launch  
**Mitigation:**
- Launch with top 10 provinces only (380 agencies)
- Add more provinces incrementally
- Set realistic timeline (1-2 weeks for Phase 1)

### Risk 3: Social Media Changes
**Impact:** Outdated accounts  
**Mitigation:**
- Monthly verification (1% of database)
- Community updates
- Show "Last verified" date
- Warning if >6 months old

---

## 🎬 Action Plan

### Immediate (This Week)
1. ✅ Create this cost analysis
2. ⏳ Setup DynamoDB table
3. ⏳ Create data collection spreadsheet (top 10 provinces)
4. ⏳ Start manual entry (4 hours/day × 8 days = 32 hours)

### Week 2
1. Complete top 10 provinces (380 agencies)
2. Deploy to production
3. Monitor match rates
4. Collect user feedback

### Week 3-4
1. Develop web scraping script
2. Scrape remaining 28 provinces (190 agencies)
3. Verify and import to DynamoDB
4. Launch full provincial coverage

### Month 2-3
1. Scrape 514 cities (7,710 agencies)
2. Launch crowdsourcing form
3. Verify and import city data
4. Announce full coverage

---

## 💰 Final Cost Prediction

### Minimum (Manual Only)
- **One-time:** $0.01 (DynamoDB writes)
- **Monthly:** $0.003 (DynamoDB storage)
- **Time:** 693 hours (87 days)

### Recommended (Hybrid)
- **One-time:** $0.61 (scraping + DynamoDB)
- **Monthly:** $0.006 (DynamoDB)
- **Time:** 102 hours (13 days)

### Maximum (With Social Media Scraping)
- **One-time:** $150.61 (scraping + social media + DynamoDB)
- **Monthly:** $0.006 (DynamoDB)
- **Time:** 102 hours (13 days)

---

## ✅ Recommendation

**Start with Phase 1 (Top 10 Provinces):**
- **Cost:** $0
- **Time:** 32 hours (1 week)
- **Coverage:** 380 agencies (80% of users)
- **Risk:** Low (manual entry = high quality)

**Then scale with scraping:**
- **Cost:** $0.60
- **Time:** 30 hours (1 week)
- **Coverage:** 8,314 agencies (100%)
- **Risk:** Medium (need verification)

**Total investment:**
- **Cost:** $0.61 one-time + $0.006/month
- **Time:** 62 hours (2 weeks)
- **ROI:** Save $840/year (Pinecone removal)

**Payback period:** Immediate (cost is negligible)

---

**Prepared by:** Amazon Q  
**Date:** 2025-11-15  
**Status:** Ready for implementation
