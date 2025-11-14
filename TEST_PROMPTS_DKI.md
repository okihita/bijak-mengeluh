# Test Prompts for DKI Jakarta Agencies

**Production URL:** https://brain.bijakmengeluh.id/generate

---

## ✅ Test Case 1: Health (Kesehatan)

### Prompt:
```
Puskesmas di daerah saya tutup terus, padahal banyak warga yang butuh berobat. Dokter juga jarang ada.
```

### Expected Match:
- **Agency:** Dinas Kesehatan DKI Jakarta
- **Twitter:** @dinkesJKT
- **Instagram:** @dinkesdki
- **Website:** dinkes.jakarta.go.id

### cURL Test:
```bash
curl -X POST https://brain.bijakmengeluh.id/generate \
  -H "Content-Type: application/json" \
  -d '{
    "user_prompt": "Puskesmas di daerah saya tutup terus, padahal banyak warga yang butuh berobat. Dokter juga jarang ada.",
    "tone": "formal"
  }'
```

---

## ✅ Test Case 2: Transportation (Perhubungan Jakarta Selatan)

### Prompt:
```
Transjakarta di Jakarta Selatan sering mogok dan penuh sesak. Sopir juga ugal-ugalan.
```

### Expected Match:
- **Agency:** Dinas Perhubungan Jakarta Selatan
- **Level:** City (municipal)

### cURL Test:
```bash
curl -X POST https://brain.bijakmengeluh.id/generate \
  -H "Content-Type: application/json" \
  -d '{
    "user_prompt": "Transjakarta di Jakarta Selatan sering mogok dan penuh sesak. Sopir juga ugal-ugalan.",
    "tone": "formal"
  }'
```

---

## ✅ Test Case 3: Public Works (PU Jakarta Pusat)

### Prompt:
```
Jalan di Jakarta Pusat rusak parah, banyak lubang. Trotoar juga hancur tidak bisa dipakai pejalan kaki.
```

### Expected Match:
- **Agency:** Dinas Pekerjaan Umum Jakarta Pusat
- **Level:** City (municipal)

### cURL Test:
```bash
curl -X POST https://brain.bijakmengeluh.id/generate \
  -H "Content-Type: application/json" \
  -d '{
    "user_prompt": "Jalan di Jakarta Pusat rusak parah, banyak lubang. Trotoar juga hancur tidak bisa dipakai pejalan kaki.",
    "tone": "formal"
  }'
```

---

## 🔍 What to Check:

### 1. Response Structure
```json
{
  "generated_text": "Kepada Yth...",
  "suggested_contacts": [
    {
      "name": "Dinas Kesehatan DKI Jakarta",
      "score": 0.85,
      "description": "provincial level agency"
    }
  ],
  "rationale": "...",
  "social_handle": {
    "handle": "@dinkesJKT",
    "status": "found"
  }
}
```

### 2. Verify DynamoDB is Used
Check CloudWatch logs for:
```
"DynamoDB matched X agencies"
```

If you see:
```
"DynamoDB returned no results, falling back to Pinecone"
```
Then the agency isn't in DynamoDB yet.

### 3. Match Accuracy
- Score should be >0.5 for good matches
- Agency name should match the complaint topic
- City-level complaints should match city agencies (not provincial)

---

## 📊 Expected Results:

| Test | Complaint | Expected Agency | Level |
|------|-----------|----------------|-------|
| 1 | Puskesmas tutup | Dinas Kesehatan DKI Jakarta | Provincial |
| 2 | Transjakarta Jaksel | Dinas Perhubungan Jakarta Selatan | City |
| 3 | Jalan rusak Jakpus | Dinas PU Jakarta Pusat | City |

---

## 🎯 Success Criteria:

✅ All 3 tests return correct agency  
✅ CloudWatch shows "DynamoDB matched" (not Pinecone fallback)  
✅ Response time <2 seconds  
✅ Match score >0.5  

---

## 🚨 If Tests Fail:

### Scenario 1: "DynamoDB returned no results"
**Cause:** Agency not in database  
**Fix:** Run full DKI scraper (90 agencies)

### Scenario 2: Wrong agency matched
**Cause:** Keywords need tuning  
**Fix:** Update KEYWORDS_MAP in scraper

### Scenario 3: Pinecone still being used
**Cause:** DynamoDB query error  
**Fix:** Check CloudWatch logs for errors

---

## 📝 Quick Test (Browser):

Visit: https://bijakmengeluh.id

1. Enter: "Puskesmas tutup di Jakarta"
2. Click "Bikin Komplain"
3. Check suggested agency
4. Should show: "Dinas Kesehatan DKI Jakarta"

---

**Ready to test!** 🚀

Run the cURL commands above or test on the website.
