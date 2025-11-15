# Testing Guide

## Current Status

⚠️ **No automated tests yet** (0% coverage)

See [ROADMAP.md](../../ROADMAP.md) for test automation ideas.

## Manual Testing

Use [manual-test-checklist.md](./manual-test-checklist.md) for production verification.

---

## Test Ideas

See [ROADMAP.md](../../ROADMAP.md) backlog for test automation ideas (pytest, Jest, E2E, etc.).

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
