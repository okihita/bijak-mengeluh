# Terminology Guide

**Purpose:** Standardize terms across all documentation and code  
**Audience:** All contributors  
**Last Updated:** 2025-11-16

---

## Language Policy

### Documentation
- **Technical docs** (architecture, API, deployment): English
- **Product docs** (design, voice, UX): English with Indonesian examples
- **User-facing UI**: Indonesian (primary userbase)
- **Code comments**: English
- **Git commits**: English

### Rationale
English for docs enables global contributors. Indonesian for UI serves primary users.

---

## Core Terms

### Product Features

| Preferred Term | Avoid | Context | Indonesian UI |
|----------------|-------|---------|---------------|
| complaint | keluhan | Technical docs | keluhan |
| polish | generate, rewrite, create | What AI does | rapikan |
| comment | letter, surat | Output format (v2.1+) | komentar |
| agency | instansi, dinas | Generic term | instansi |
| tone | style | formal/funny/angry | nada |
| history | riwayat | Feature name | riwayat |

### Agency Types

| Term | Use When | Example |
|------|----------|---------|
| agency | Generic reference | "121 agencies" |
| ministry | National level | "Ministry of Environment" |
| department | City/provincial level | "Public Works Department" |
| dinas | Indonesian context | "Dinas PU Jakarta Selatan" |

See [AGENCY_STRUCTURE.md](./AGENCY_STRUCTURE.md) for full hierarchy.

### User References

| Preferred | Avoid | Context |
|-----------|-------|---------|
| user | citizen, people | Technical docs |
| citizen | user | Civic/philosophical context |
| you | user, citizen | UI copy |

**Example:**
- Technical: "User submits complaint"
- Philosophical: "Citizens have agency"
- UI: "Kamu bisa ubah masalah jadi solusi"

---

## Version Format

### Technical Docs
Use **semantic versioning**: `MAJOR.MINOR.PATCH`
- Example: `2.3.0`, `2.4.1`
- Context: CHANGELOG.md, package.json, git tags

### Non-Technical Docs
Use **short version**: `vMAJOR.MINOR`
- Example: `v2.3`, `v2.4`
- Context: README.md, ROADMAP.md, user-facing docs

### When to Use Which
- Code/API: `2.3.0`
- Marketing: `v2.3`
- Git tags: `v2.3.0`

---

## Action Verbs

### What AI Does

| Preferred | Context | Indonesian |
|-----------|---------|------------|
| polish | Primary term (v2.1+) | rapikan |
| rewrite | Acceptable alternative | tulis ulang |
| generate | Technical context only | buat |
| create | Avoid (too generic) | - |

**Example:**
- ✅ "AI polishes your complaint"
- ✅ "AI rapikan bahasa kamu"
- ❌ "AI generates a letter"

### What Users Do

| Preferred | Context | Indonesian |
|-----------|---------|------------|
| submit | Send complaint | kirim |
| type | Enter text | ketik |
| share | Social media | bagikan |
| send | To agency | kirim |

---

## Cost Format

### Preferred Format
`$X-Y/mo` for ranges, `$X/mo` for exact

**Examples:**
- ✅ "$7-13/mo"
- ✅ "$7.50/mo"
- ❌ "$7.54" (too precise for estimates)
- ❌ "$7-13 per month" (too verbose)

### Context
- Use ranges for projections
- Use exact for historical data
- Always include `/mo` suffix

---

## Geographic Terms

### Hierarchy (Specific to General)

1. **City/District**: Jakarta Selatan, Jakarta Pusat
2. **Province**: DKI Jakarta
3. **National**: Indonesia

### Usage Rules

| Term | When to Use | Example |
|------|-------------|---------|
| Jakarta Selatan | Specific city reference | "Dinas PU Jakarta Selatan" |
| DKI Jakarta | Province reference | "90 DKI Jakarta agencies" |
| Jakarta | Casual/generic | "Jakarta's broken roads" |

**Never mix:** Don't say "Jakarta Selatan agencies" when you mean "DKI Jakarta agencies"

See [AGENCY_STRUCTURE.md](./AGENCY_STRUCTURE.md) for complete hierarchy.

---

## Feature Names

### Instagram Story Feature

| Preferred | Context |
|-----------|---------|
| Instagram Story | Full feature name |
| Story | Short reference |
| 9:16 format | Technical spec |

**Capitalization:** "Story" is capitalized (Instagram brand term)

### Other Features

| Feature | Preferred Term | Avoid |
|---------|----------------|-------|
| Complaint history | history | riwayat (in docs) |
| Agency directory | directory | direktori (in docs) |
| Dark mode | dark mode | night mode |
| PWA | PWA | progressive web app |

---

## Common Mistakes

### ❌ Wrong
- "AI generates formal letters"
- "34 ministries" (when including non-ministries)
- "Jakarta agencies" (ambiguous: city or province?)
- "v2.0.0" in README
- "keluhan" in technical docs
- "$7.54/mo" (false precision)

### ✅ Right
- "AI polishes your complaint into a comment"
- "31 national agencies"
- "90 DKI Jakarta agencies" or "Dinas PU Jakarta Selatan"
- "v2.0" in README, "2.0.0" in CHANGELOG
- "complaint" in technical docs, "keluhan" in UI
- "$7-13/mo" for estimates

---

## Translation Pairs

Common terms that appear in both languages:

| English (Docs) | Indonesian (UI) | Notes |
|----------------|-----------------|-------|
| complaint | keluhan | Core concept |
| agency | instansi | Generic term |
| history | riwayat | Feature name |
| submit | kirim | Action button |
| polish | rapikan | What AI does |
| comment | komentar | Output format |
| tone | nada | formal/funny/angry |
| directory | direktori | Agency list |

---

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| 2025-11-16 | Created document | Standardize terminology |
| 2025-11-16 | "letter" → "comment" | Product evolved (v2.1) |
| 2025-11-16 | "generate" → "polish" | More accurate |

---

**See also:**
- [AGENCY_STRUCTURE.md](./AGENCY_STRUCTURE.md) - Government hierarchy
- [VOICE_AND_TONE.md](./product/VOICE_AND_TONE.md) - UI copy guidelines
- [DEPLOYMENT_PROTOCOL.md](./DEPLOYMENT_PROTOCOL.md) - Contribution rules
