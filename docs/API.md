# API Documentation

**Purpose:** Backend API reference and usage examples  
**Audience:** Frontend developers, API consumers  
**Last Updated:** 2025-11-16

**Base URL:** `https://brain.bijakmengeluh.id`

---

## Endpoints

### POST /generate

Generate polished complaint comment with agency recommendation.

**Request:**
```json
{
  "complaint": "Jalan rusak parah di Jakarta Selatan",
  "tone": "formal"  // "formal" | "funny" | "angry"
}
```

**Response (200):**
```json
{
  "generated_text": "Kepada Yth. Bapak/Ibu Kepala Dinas...",
  "suggested_agency": {
    "name": "Dinas Pekerjaan Umum Jakarta Selatan",
    "category": "Pekerjaan Umum",
    "jurisdiction": "Jakarta Selatan",
    "social_media": {
      "twitter": "@DinaspuJaksel",
      "instagram": "@dinaspu.jaksel"
    }
  }
}
```

**Error (400):**
```json
{
  "error": "Complaint must be at least 20 characters"
}
```

**Error (500):**
```json
{
  "error": "Internal server error"
}
```

---

### GET /agencies

List agencies with optional filtering.

**Query Parameters:**
- `province` (optional): Filter by province (e.g., "DKI Jakarta")
- `search` (optional): Search by name or category
- `limit` (optional): Max results (default: 50)

**Request:**
```bash
GET /agencies?province=DKI%20Jakarta&search=pekerjaan&limit=10
```

**Response (200):**
```json
{
  "agencies": [
    {
      "agency_id": "dpu-jaksel",
      "name": "Dinas Pekerjaan Umum Jakarta Selatan",
      "category": "Pekerjaan Umum",
      "jurisdiction": "Jakarta Selatan",
      "keywords": "jalan,rusak,lubang,aspal,trotoar",
      "social_media": {
        "instagram": "@dinaspu.jaksel",
        "twitter": "@DinaspuJaksel"
      },
      "website": "https://pu.jakarta.go.id",
      "phone": "+62-21-1234567",
      "email": "info@pu.jakarta.go.id"
    }
  ],
  "count": 1,
  "total": 90
}
```

**Error (500):**
```json
{
  "error": "Internal server error"
}
```

---

## Request Validation

**complaint:**
- Required: Yes
- Type: String
- Min length: 20 characters
- Max length: 1000 characters

**tone:**
- Required: No
- Type: String
- Default: "formal"
- Allowed: "formal", "funny", "angry"

---

## Rate Limits

- 10 requests per minute per IP
- 100 requests per hour per IP

Exceeded limits return `429 Too Many Requests`.

---

## Response Times

- Average: 1.5s
- P95: 2.0s
- P99: 3.0s

---

## Examples

### Formal Tone
```bash
curl -X POST https://brain.bijakmengeluh.id/generate \
  -H "Content-Type: application/json" \
  -d '{
    "complaint": "Jalan rusak parah di Jakarta Selatan",
    "tone": "formal"
  }'
```

### Funny Tone
```bash
curl -X POST https://brain.bijakmengeluh.id/generate \
  -H "Content-Type: application/json" \
  -d '{
    "complaint": "Sampah menumpuk kayak gunung",
    "tone": "funny"
  }'
```

### Angry Tone
```bash
curl -X POST https://brain.bijakmengeluh.id/generate \
  -H "Content-Type: application/json" \
  -d '{
    "complaint": "Banjir terus tiap hujan",
    "tone": "angry"
  }'
```

---

## Agency Matching Logic

**Priority:**
1. City-level match (e.g., "Jakarta Selatan" → local Dinas)
2. Province-level match (e.g., "DKI Jakarta" → provincial agency)
3. National fallback (e.g., Kementerian)

**Keywords:**
- Jalan, rusak, lubang → Dinas PU
- Sampah, kebersihan → Dinas Kebersihan
- Banjir, air → Dinas SDA
- Polusi, udara → Kementerian LHK

---

## CORS

Allowed origins:
- `https://bijakmengeluh.id`
- `http://localhost:3000` (development)

---

## Monitoring

**CloudWatch Logs:**
- `/aws/lambda/BijakMengeluhComplaintGenerationFunction`

**Metrics:**
- Invocations, Errors, Duration, Throttles
- Available in AWS CloudWatch Console
