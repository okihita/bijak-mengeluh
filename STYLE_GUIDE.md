# Style Guide

Quick reference for coding standards.

---

## TL;DR

**Frontend:** camelCase functions, PascalCase components  
**Backend:** snake_case everything, PascalCase classes  
**Commits:** Conventional format (`feat:`, `fix:`, `docs:`)

---

## Naming Conventions

### Frontend (TypeScript)

| Type | Format | Example |
|------|--------|---------|
| Component | PascalCase | `ComplaintForm.tsx` |
| Function | camelCase | `generateComplaint()` |
| Variable | camelCase | `userComplaint` |
| Constant | UPPER_SNAKE | `MAX_LENGTH` |
| Type | PascalCase | `ComplaintData` |

### Backend (Python)

| Type | Format | Example |
|------|--------|---------|
| File | snake_case | `complaint_handler.py` |
| Function | snake_case | `generate_complaint()` |
| Variable | snake_case | `user_complaint` |
| Constant | UPPER_SNAKE | `MAX_LENGTH` |
| Class | PascalCase | `ComplaintService` |

---

## API Contract

### Request
```json
{
  "complaint": "Jalan rusak parah",
  "tone": "formal"
}
```

### Response
```json
{
  "generated_text": "Kepada Yth...",
  "suggested_contacts": [...],
  "rationale": "...",
  "social_handle_info": {...}
}
```

**Note:** Backend uses snake_case, frontend converts to camelCase.

---

## Directory Structure

### Frontend
```
src/
├── app/              # Next.js pages
├── components/
│   ├── complaint/    # Feature-specific
│   └── ui/           # Generic (shadcn)
└── lib/              # Utilities
```

### Backend
```
src/
├── handlers/         # Lambda handlers
├── services/         # Business logic
├── models/           # Data models
└── config/           # Configuration
```

---

## Git Commits

**Format:** `type: description`

**Types:**

- `feat:` - New feature

- `fix:` - Bug fix

- `docs:` - Documentation

- `refactor:` - Code restructure

- `test:` - Tests

- `chore:` - Maintenance

**Examples:**
```
feat: add Instagram sharing
fix: broken image generation
docs: update README
```

---

## Code Style

### Frontend
- Prefer functional components
- Use Tailwind for styling
- Extract reusable logic to hooks

### Backend
- Type hints for all functions
- Docstrings for public APIs
- Keep handlers thin (logic in services)

---

## Testing

**Before committing:**
```bash
# Frontend
npm run build
npx tsc --noEmit

# Backend
sam build
```

---

**Full guide:** See `docs/archive/` for detailed examples

---

## Local Reports Workflow

**Philosophy:** Keep development context local, git history clean.

### Reports Directory

```
reports/              # Git-ignored, never pushed
├── deployment/       # Deployment logs
├── stability/        # Daily sanity checks
├── performance/      # Speed benchmarks
└── usability/        # User feedback notes
```

### When to Use

**DO use reports/ for:**
- Daily stability checks
- Deployment notes
- Performance benchmarks
- User feedback tracking
- Debugging context

**DON'T use reports/ for:**
- Production documentation (use docs/)
- Permanent records (use git commits)
- Shared team info (use GitHub Issues)

### Quick Commands

```bash
# Daily check
curl -o /dev/null -s -w "$(date): Frontend %{time_total}s\n" https://bijakmengeluh.id >> reports/stability/$(date +%Y-%m).log

# After deployment
echo "$(date): Deployed - <description>" >> reports/deployment/$(date +%Y-%m).log

# Performance test
echo "$(date): API response $(curl -o /dev/null -s -w '%{time_total}s' https://brain.bijakmengeluh.id/generate -X POST -d '{\"complaint\":\"test\",\"tone\":\"formal\"}')" >> reports/performance/$(date +%Y-%m).log
```

### Retention

- Keep current + last 2 months
- Delete older reports (they're local only)
- Archive manually if needed for reference

See `reports/README.md` for templates and examples.

---

## Historical Context

### Why This Style Guide Exists

**Problem (Nov 14, 2025):** Frontend and backend had inconsistent naming conventions, making them feel disconnected despite being part of the same project.

**Issues:**
- Frontend: `prompt`, Backend: `user_prompt`
- Frontend: `contact`, Backend: `ministry`
- No unified term for "complaint"
- Different naming styles (camelCase vs snake_case)

**Solution:** Created unified style guide and aligned both repositories.

**Impact:**
- Clear API contracts
- Consistent terminology
- Better developer experience
- Easier onboarding

### Key Decisions

**Why snake_case for backend?**
- Python convention (PEP 8)
- Better readability for long names
- Consistent with AWS SDK

**Why camelCase for frontend?**
- JavaScript/TypeScript convention
- React ecosystem standard
- Next.js best practices

**Why "complaint" not "prompt"?**
- User-facing term
- Clear domain language
- Matches Indonesian "keluhan"

**Why "agency" not "ministry"?**
- More accurate (includes local Dinas)
- Scalable terminology
- Matches DynamoDB schema

---

**Last Updated:** Nov 15, 2025
