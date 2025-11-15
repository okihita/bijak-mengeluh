# Style Guide

Quick reference for coding standards.

---

## TL;DR

**Frontend:** camelCase functions, PascalCase components  
**Backend:** snake_case everything, PascalCase classes  
**API:** Use `complaint` (not `prompt`), `ministry` (not `contact`)  
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

  "generatedComplaint": "Kepada Yth...",
  "suggestedMinistries": [...],
  "rationale": "...",
  "socialHandle": {...}
}

```

**Why `complaint` not `prompt`?** More descriptive, user-facing term.

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

- Use TypeScript strict mode

- Prefer functional components

- Use Tailwind for styling

- Extract reusable logic to hooks

### Backend

- Type hints for all functions

- Docstrings for public APIs

- Use async/await for I/O

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
python -m pytest
```

---

**Full guide:** See `docs/archive/` for detailed examples
