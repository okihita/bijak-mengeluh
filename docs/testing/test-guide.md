# Testing Guide

## Current Status

⚠️ **No automated tests yet** (0% coverage)

Planned for Phase 2:
- Backend: pytest with 80% coverage target
- Frontend: Jest + React Testing Library

## Manual Testing

Use [manual-test-checklist.md](./manual-test-checklist.md) for production verification.

---

## Future Test Coverage (Phase 2)

### Backend Tests (pytest)

**Unit Tests**
- `test_complaint_handler.py` - AI generation logic
- `test_agency_matcher.py` - Keyword matching (100% accuracy target)
- `test_dynamodb_service.py` - Database operations

**Integration Tests**
- `test_api_endpoints.py` - Lambda handler responses
- `test_bedrock_integration.py` - AI model calls

**Test Cases to Cover**
```python
# Agency matching
assert match("jalan rusak Jakarta Selatan") == "Dinas PU Jakarta Selatan"
assert match("sampah menumpuk Surabaya") == "Dinas Kebersihan Surabaya"

# Tone variations
assert "Kepada Yth" in generate(tone="formal")
assert "anjir" not in generate(tone="formal")
```

### Frontend Tests (Jest + RTL)

**Component Tests**
- `ComplaintForm.test.tsx` - Form validation
- `InstagramShare.test.tsx` - Image generation
- `HistoryList.test.tsx` - LocalStorage operations

**Integration Tests**
- `ComplaintFlow.test.tsx` - End-to-end user journey

**Test Cases to Cover**
```typescript
// Form validation
expect(submit("")).toShowError("Minimal 20 karakter")
expect(submit("jalan rusak")).toCallAPI()

// Instagram share
expect(generateImage()).toHaveAspectRatio(9/16)
expect(downloadImage()).toSaveFile()
```

### E2E Tests (Playwright)

**Critical Paths**
1. Submit complaint → Get response → Copy text
2. Submit complaint → Share to Instagram → Download
3. View history → Delete complaint

**Performance Tests**
- Page load <2s
- API response <2s
- Image generation <3s

---

## Running Tests (When Implemented)

### Backend
```bash
cd bijak-mengeluh-ai-backend
pytest src/tests/ -v --cov=src --cov-report=html
open htmlcov/index.html
```

### Frontend
```bash
cd bijak-mengeluh-webapp
npm test -- --coverage
npm run test:e2e  # Playwright
```

### CI/CD Integration
```yaml
# .github/workflows/test.yml
- run: pytest --cov=80  # Fail if <80%
- run: npm test -- --coverage --watchAll=false
```
