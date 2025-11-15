# DKI Jakarta Automated Scraping - Cost Analysis

**Date:** 2025-11-15  
**Scope:** DKI Jakarta Province + 5 Municipalities (Fully Automated)  
**Goal:** Validate database structure, prompting, and matching accuracy

---

## 📊 DKI Jakarta Coverage

### Provincial Level
- **Province:** DKI Jakarta
- **Dinas:** ~15 agencies
- **Examples:** Dinas Kesehatan, Dinas Perhubungan, Dinas PU, etc.

### Municipal Level (5 Cities)
1. Jakarta Pusat
2. Jakarta Utara
3. Jakarta Barat
4. Jakarta Selatan
5. Jakarta Timur

**Dinas per city:** ~15 agencies  
**Total municipal:** 5 × 15 = 75 agencies

### **TOTAL DKI:** 15 + 75 = **90 agencies**

---

## 🔍 Search API Options Comparison

### Option 1: Google Custom Search API
**Pricing:**
- Free tier: 100 queries/day
- Paid: $5 per 1,000 queries (after free tier)

**For 90 agencies:**
- 90 agencies × 3 searches each (name, social media, contact) = 270 queries
- Free tier covers: 100 queries
- Paid: 170 queries × $5/1000 = **$0.85**

**Pros:**
- ✅ Official Google API
- ✅ Reliable results
- ✅ Good for structured data

**Cons:**
- ❌ Expensive at scale
- ❌ Rate limited (100/day free)
- ❌ Need API key setup

---

### Option 2: Serper API (RECOMMENDED)
**Pricing:**
- Free tier: 2,500 queries/month
- Paid: $50/month for 10,000 queries = $0.005 per query

**For 90 agencies:**
- 90 agencies × 3 searches = 270 queries
- **Cost: $0** (within free tier)
- Or paid: 270 × $0.005 = **$1.35**

**Pros:**
- ✅ Generous free tier (2,500/month)
- ✅ Fast response time
- ✅ Clean JSON output
- ✅ No rate limiting issues

**Cons:**
- ⚠️ Third-party service (not Google)
- ⚠️ Need account signup

---

### Option 3: SerpAPI
**Pricing:**
- Free tier: 100 queries/month
- Paid: $50/month for 5,000 queries = $0.01 per query

**For 90 agencies:**
- 270 queries × $0.01 = **$2.70**

**Pros:**
- ✅ Reliable service
- ✅ Good documentation

**Cons:**
- ❌ More expensive than Serper
- ❌ Small free tier

---

### Option 4: ScraperAPI + Direct Scraping
**Pricing:**
- Free tier: 1,000 requests/month
- Paid: $49/month for 100,000 requests

**For 90 agencies:**
- 90 agencies × 5 pages = 450 requests
- **Cost: $0** (within free tier)

**Pros:**
- ✅ Free for our scale
- ✅ Handles JavaScript rendering
- ✅ Proxy rotation included

**Cons:**
- ❌ Need to parse HTML (more complex)
- ❌ Slower than API

---

### **WINNER: Serper API**
- **Cost:** $0 (free tier) or $1.35 (paid)
- **Speed:** Fast
- **Reliability:** High
- **Ease of use:** Excellent

---

## 🤖 LLM Verification Cost

### Task: Verify Official Social Media Accounts
**Input per agency:**
```
Agency: Dinas Kesehatan DKI Jakarta
Search results:
1. @DinkesJakarta (Twitter) - 50K followers, verified
2. @dinkes_jakarta_parody (Twitter) - 500 followers
3. @dinkes.jakarta (Instagram) - 30K followers, verified

Task: Identify official accounts (not parody)
```

**Output:**
```json
{
  "official_accounts": {
    "twitter": "@DinkesJakarta",
    "instagram": "@dinkes.jakarta"
  },
  "confidence": 0.95,
  "reasoning": "Verified badges, high followers, consistent naming"
}
```

### LLM Options

#### Option 1: AWS Bedrock (Claude Haiku)
**Pricing:**
- Input: $0.25 per 1M tokens
- Output: $1.25 per 1M tokens

**Per agency:**
- Input: ~500 tokens (search results)
- Output: ~100 tokens (JSON response)
- Cost: (500 × $0.25 + 100 × $1.25) / 1,000,000 = **$0.000250**

**For 90 agencies:**
- 90 × $0.000250 = **$0.0225** (~2 cents)

**Pros:**
- ✅ Already using Bedrock
- ✅ Very cheap
- ✅ Fast (Haiku model)
- ✅ No new setup needed

**Cons:**
- None for this use case

---

#### Option 2: OpenAI GPT-4o-mini
**Pricing:**
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens

**Per agency:**
- Cost: (500 × $0.15 + 100 × $0.60) / 1,000,000 = **$0.000135**

**For 90 agencies:**
- 90 × $0.000135 = **$0.0122** (~1 cent)

**Pros:**
- ✅ Slightly cheaper
- ✅ Good accuracy

**Cons:**
- ❌ Need OpenAI account
- ❌ Another service to manage

---

#### Option 3: Groq (Llama 3.1 8B)
**Pricing:**
- **FREE** (currently)
- Rate limit: 30 requests/minute

**For 90 agencies:**
- Cost: **$0**
- Time: 90 / 30 = 3 minutes

**Pros:**
- ✅ FREE
- ✅ Fast inference
- ✅ Good enough for this task

**Cons:**
- ⚠️ May not be free forever
- ⚠️ Rate limited

---

### **WINNER: AWS Bedrock (Claude Haiku)**
- **Cost:** $0.0225 (2 cents)
- **Reason:** Already integrated, reliable, cheap enough
- **Fallback:** Groq (free) if cost is concern

---

## 💰 Total Cost Breakdown

### DKI Jakarta (90 agencies)

| Component | Service | Queries | Unit Cost | Total Cost |
|-----------|---------|---------|-----------|------------|
| **Search** | Serper API | 270 | $0 (free tier) | **$0** |
| **LLM Verification** | Bedrock Haiku | 90 | $0.000250 | **$0.02** |
| **DynamoDB Write** | AWS | 90 | $0.000001 | **$0.0001** |
| **Lambda Execution** | AWS | 90 × 5s | $0.0000167/GB-s | **$0.01** |
| **TOTAL** | | | | **$0.03** |

### If Using Paid Tiers

| Component | Service | Cost |
|-----------|---------|------|
| Search | Serper (paid) | $1.35 |
| LLM | Bedrock | $0.02 |
| DynamoDB | AWS | $0.0001 |
| Lambda | AWS | $0.01 |
| **TOTAL** | | **$1.38** |

---

## 🏗️ Scraping Architecture

### Step 1: Search for Agency Info
```python
import requests

def search_agency(agency_name: str, query_type: str) -> dict:
    """
    Query types:
    - "official website"
    - "twitter account"
    - "instagram account"
    - "contact phone"
    """
    url = "https://google.serper.dev/search"
    headers = {"X-API-KEY": SERPER_API_KEY}
    
    payload = {
        "q": f"{agency_name} {query_type} site:jakarta.go.id OR site:twitter.com OR site:instagram.com",
        "num": 5
    }
    
    response = requests.post(url, json=payload, headers=headers)
    return response.json()
```

### Step 2: LLM Verification
```python
import boto3

def verify_official_accounts(agency_name: str, search_results: dict) -> dict:
    """
    Use Claude Haiku to identify official accounts
    """
    bedrock = boto3.client('bedrock-runtime', region_name='ap-southeast-2')
    
    prompt = f"""
    Agency: {agency_name}
    
    Search results:
    {json.dumps(search_results, indent=2)}
    
    Task: Identify the OFFICIAL social media accounts (not parody/fake).
    Look for:
    - Verified badges
    - High follower count
    - Consistent naming with agency
    - .go.id domain for websites
    
    Return JSON:
    {{
      "twitter": "@handle or null",
      "instagram": "@handle or null",
      "facebook": "page_name or null",
      "website": "url or null",
      "phone": "number or null",
      "confidence": 0.0-1.0
    }}
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-haiku-20240307-v1:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 500,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    return json.loads(response['body'].read())
```

### Step 3: Store in DynamoDB
```python
def store_agency(agency_data: dict):
    """
    Store verified agency data in DynamoDB
    """
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('agencies')
    
    table.put_item(Item={
        'agency_id': agency_data['id'],
        'province': 'DKI Jakarta',
        'city': agency_data.get('city'),
        'name': agency_data['name'],
        'level': agency_data['level'],
        'keywords': agency_data['keywords'],
        'social_media': agency_data['social_media'],
        'website': agency_data['website'],
        'phone': agency_data['phone'],
        'confidence': agency_data['confidence'],
        'created_at': datetime.now().isoformat(),
        'updated_at': datetime.now().isoformat()
    })
```

---

## 🔄 Scraping Workflow

### Phase 1: Provincial Dinas (15 agencies)
```
For each dinas in DKI_PROVINCIAL_DINAS:
  1. Search: "{dinas_name} DKI Jakarta official website"
  2. Search: "{dinas_name} DKI Jakarta twitter"
  3. Search: "{dinas_name} DKI Jakarta instagram"
  4. LLM: Verify official accounts
  5. Store: DynamoDB
  
Time: 15 agencies × 30 seconds = 7.5 minutes
Cost: $0.01
```

### Phase 2: Municipal Dinas (75 agencies)
```
For each city in [Pusat, Utara, Barat, Selatan, Timur]:
  For each dinas in CITY_DINAS:
    1. Search: "{dinas_name} Jakarta {city} official"
    2. Search: "{dinas_name} Jakarta {city} social media"
    3. LLM: Verify accounts
    4. Store: DynamoDB
    
Time: 75 agencies × 30 seconds = 37.5 minutes
Cost: $0.02
```

### **Total Time:** 45 minutes  
### **Total Cost:** $0.03

---

## 📋 DKI Jakarta Agency List

### Provincial Level (15 agencies)
1. Dinas Kesehatan
2. Dinas Perhubungan
3. Dinas Pekerjaan Umum
4. Dinas Pendidikan
5. Dinas Sosial
6. Dinas Lingkungan Hidup
7. Dinas Perumahan
8. Dinas Perindustrian
9. Dinas Perdagangan
10. Dinas Pariwisata
11. Dinas Kebudayaan
12. Dinas Pemuda dan Olahraga
13. Dinas Ketahanan Pangan
14. Dinas Kependudukan
15. Dinas Komunikasi dan Informatika

### Municipal Level (15 per city × 5 cities = 75)
**Same dinas structure for each:**
- Jakarta Pusat
- Jakarta Utara
- Jakarta Barat
- Jakarta Selatan
- Jakarta Timur

---

## 🎯 Validation Metrics

### Database Structure
- ✅ Schema works for provincial + municipal
- ✅ Keywords are searchable
- ✅ Social media fields populated
- ✅ Confidence scores tracked

### Matching Accuracy
**Test cases:**
```
1. "Jalan rusak di Jakarta Selatan"
   → Expected: Dinas PU Jakarta Selatan
   
2. "Puskesmas tutup di Jakarta Pusat"
   → Expected: Dinas Kesehatan Jakarta Pusat
   
3. "Transjakarta mogok"
   → Expected: Dinas Perhubungan DKI Jakarta
```

**Success criteria:**
- Match rate: >85%
- Response time: <200ms
- Correct level (city vs province): >90%

### Prompting Quality
- LLM correctly identifies official accounts: >95%
- No parody accounts included: 100%
- Confidence scores accurate: >90%

---

## 🚀 Implementation Plan

### Day 1: Setup (2 hours)
1. ✅ Create Serper API account (free tier)
2. ✅ Setup DynamoDB table schema
3. ✅ Write scraping script
4. ✅ Write LLM verification function
5. ✅ Test with 3 agencies

### Day 2: Scrape Provincial (1 hour)
1. Run scraper for 15 provincial dinas
2. Verify results manually (spot check)
3. Import to DynamoDB
4. Test matching accuracy

### Day 3: Scrape Municipal (2 hours)
1. Run scraper for 75 municipal dinas
2. Verify results (sample 10%)
3. Import to DynamoDB
4. Test matching accuracy

### Day 4: Validation (2 hours)
1. Test 20 real complaint scenarios
2. Measure match accuracy
3. Tune keywords if needed
4. Document results

### **Total Time:** 7 hours  
### **Total Cost:** $0.03

---

## 💡 Cost Optimization Tips

### 1. Use Free Tiers
- Serper: 2,500 queries/month (free)
- Groq: Unlimited (currently free)
- Lambda: 1M requests/month (free)
- **Savings: $1.35**

### 2. Batch Processing
- Process 10 agencies at once
- Reduce Lambda cold starts
- **Savings: $0.005**

### 3. Cache Results
- Store search results in S3
- Reuse for future updates
- **Savings: $0.50/month**

### 4. Smart Searching
- Only search if not found in cache
- Use site-specific queries (site:jakarta.go.id)
- **Savings: 50% of queries**

---

## 📊 Scaling to All Indonesia

### If DKI works, scale to:
- **38 provinces:** 38 × 15 = 570 agencies
- **514 cities:** 514 × 15 = 7,710 agencies
- **Total:** 8,280 agencies

### Projected Cost (Using Free Tiers)
- Search: $0 (within 2,500/month limit)
- LLM: 8,280 × $0.000250 = **$2.07**
- DynamoDB: **$0.01**
- Lambda: **$0.10**
- **Total: $2.18** for entire Indonesia

### Projected Time
- 8,280 agencies × 30 seconds = **69 hours**
- At 8 hours/day = **9 days**

---

## ✅ Recommendation

### Start with DKI Jakarta (90 agencies)
**Why:**
- ✅ Highest user concentration
- ✅ Best data availability
- ✅ Validates entire pipeline
- ✅ Cost: $0.03 (essentially free)
- ✅ Time: 45 minutes

**If successful:**
- Scale to top 10 provinces (570 agencies)
- Cost: $0.20
- Time: 5 hours

**Then:**
- Scale to all Indonesia (8,280 agencies)
- Cost: $2.18
- Time: 9 days

---

## 🎬 Next Steps

1. **Approve this approach**
2. **Setup Serper API account** (5 minutes)
3. **Write scraping script** (2 hours)
4. **Test with 3 agencies** (30 minutes)
5. **Run full DKI scrape** (45 minutes)
6. **Validate results** (2 hours)

**Ready to start coding when you approve!** 🚀

---

**Prepared by:** Amazon Q  
**Date:** 2025-11-15  
**Status:** Awaiting approval to implement
