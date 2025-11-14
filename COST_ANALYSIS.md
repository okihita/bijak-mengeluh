# Cost Analysis & Optimization

**Date:** Nov 14, 2025

---

## 💰 Current Cost Factors

### Frontend (Vercel) - ~$0/month
- **Hobby Plan:** FREE
- **Bandwidth:** 100GB/month free
- **Build minutes:** Unlimited
- **Cost:** $0 (within free tier)

### Backend (AWS)

#### 1. Lambda Functions - ~$5-15/month
**Main Function:**
- Memory: 1024MB
- Timeout: 60s
- Avg duration: 4-6s
- Cost per 1M requests: ~$20
- **Estimated:** 1000 requests/month = $0.02

**Finder Function:**
- Memory: 768MB
- Timeout: 30s
- Cost: Minimal (invoked per request)

#### 2. AWS Bedrock - ~$10-50/month (HIGHEST COST)
**Cohere Embeddings:**
- Model: cohere.embed-multilingual-v3
- Cost: ~$0.0001 per 1K tokens
- Usage: 1 embedding per request

**Claude 3 Haiku:**
- Input: $0.25 per 1M tokens
- Output: $1.25 per 1M tokens
- Max tokens: 1024 (complaint) + 512 (rationale) + 256 (social)
- **This is your main cost driver**

#### 3. Pinecone - $70/month
- Serverless plan: $0.40 per 1M queries
- OR Starter pod: $70/month
- **Check your current plan**

#### 4. DynamoDB - ~$0-1/month
- Billing: PAY_PER_REQUEST
- Cost: $1.25 per 1M writes, $0.25 per 1M reads
- Cache hits reduce Bedrock calls

#### 5. API Gateway - ~$1-3/month
- Cost: $1 per 1M requests
- Custom domain: $0

#### 6. Serper API - Variable
- Check your plan pricing

---

## 🎯 Cost Optimization Strategies

### Immediate (No Code Changes)

1. **Reduce Lambda Memory**
   - Main: 1024MB → 512MB (save 50%)
   - Finder: 768MB → 512MB (save 33%)
   - Trade-off: Slightly slower

2. **Reduce Bedrock Token Limits**
   - Complaint: 1024 → 512 tokens
   - Rationale: 512 → 256 tokens
   - Social: 256 → 128 tokens
   - **Saves 50% on Bedrock costs**

3. **Increase DynamoDB Cache Usage**
   - Already implemented
   - Ensure TTL is reasonable

### Medium Term

4. **Add Request Throttling**
   - Limit: 10 requests/minute per IP
   - Prevents abuse

5. **Cache Embeddings**
   - Cache common complaint patterns
   - Reuse embeddings

6. **Use Cheaper Models**
   - Consider Claude Instant instead of Haiku
   - Or use smaller models for rationale

### Long Term

7. **Implement Response Caching**
   - Cache similar complaints
   - Return cached responses

8. **Batch Processing**
   - Process multiple requests together
   - Reduce Lambda invocations

---

## 📊 Estimated Monthly Costs

### Current (1000 requests/month)
- Frontend: $0
- Lambda: $0.50
- Bedrock: $15-30 ⚠️
- Pinecone: $70 ⚠️
- DynamoDB: $0.10
- API Gateway: $0.01
- **Total: ~$85-100/month**

### Optimized (same usage)
- Frontend: $0
- Lambda: $0.25 (reduced memory)
- Bedrock: $7-15 (reduced tokens)
- Pinecone: $70 (no change)
- DynamoDB: $0.10
- API Gateway: $0.01
- **Total: ~$77-85/month**

### At Scale (10K requests/month)
- Current: ~$200-300/month
- Optimized: ~$150-200/month

---

## 🚨 Biggest Cost Drivers

1. **Pinecone: $70/month** (fixed)
2. **Bedrock: $15-30/month** (variable)
3. **Lambda: $0.50/month** (minimal)

**Focus on:** Bedrock optimization and Pinecone plan review

---

## ✅ Quick Wins (Implement Now)

```yaml
# template.yaml changes
MemorySize: 512  # was 1024
```

```python
# bedrock_service.py changes
"max_tokens": 512  # was 1024
"max_tokens": 256  # was 512
```

**Estimated savings: $8-15/month (10-15%)**

---

## 📈 Monitoring

Check AWS Cost Explorer for:
- Bedrock usage by model
- Lambda invocations
- Pinecone bill separately

---

**Next Review:** Dec 2025
