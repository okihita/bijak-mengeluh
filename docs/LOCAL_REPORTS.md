# Local Reports Workflow

**Purpose:** Track development context locally without cluttering git history  
**Audience:** Developers, maintainers  
**Last Updated:** 2025-11-16

---

## Quick Start

```bash
# Run daily check
bash scripts/daily-check.sh

# Manual deployment note
echo "$(date): Deployed v2.1 - Fixed bug X" >> reports/deployment/$(date +%Y-%m).log

# Manual usability note
echo "$(date): User reported issue Y" >> reports/usability/$(date +%Y-%m).log
```

---

## Directory Structure

```
reports/                    # ⚠️ Git-ignored, never pushed
├── README.md              # Templates and usage guide
├── deployment/            # Deployment logs
│   └── YYYY-MM.log
├── stability/             # Daily sanity checks
│   └── YYYY-MM.log
├── performance/           # Speed benchmarks
│   └── YYYY-MM.log
└── usability/             # User feedback
    └── YYYY-MM.log
```

---

## Philosophy

**Local reports are for:**
- Your personal development context
- Quick notes that don't need git commits
- Daily checks and benchmarks
- Temporary debugging info

**NOT for:**
- Production documentation → use `docs/`
- Permanent records → use git commits
- Team collaboration → use GitHub Issues
- Public information → use README

---

## Automated Daily Check

```bash
# Run manually
bash scripts/daily-check.sh

# Or add to cron (optional)
# 0 8 * * * cd /path/to/Bijak-Mengeluh && bash scripts/daily-check.sh
```

**Output:**
```
2025-11-15 08:00: ✅ Frontend OK (0.24s)
2025-11-15 08:00: ✅ Backend OK (1.5s)
```

---

## Manual Logging

### After Deployment
```bash
echo "$(date): Deployed backend - Fixed agency matching" >> reports/deployment/$(date +%Y-%m).log
```

### User Feedback
```bash
echo "$(date): User A - Instagram share not working on Firefox" >> reports/usability/$(date +%Y-%m).log
```

### Performance Issue
```bash
echo "$(date): API slow (3.5s) - investigating DynamoDB" >> reports/performance/$(date +%Y-%m).log
```

---

## Retention Policy

- **Keep:** Current month + last 2 months
- **Delete:** Older than 3 months (they're local only)
- **Archive:** Manually if needed for reference

```bash
# Clean old reports (older than 3 months)
find reports/ -name "*.log" -mtime +90 -delete
```

---

## Why Git-Ignored?

1. **Context-specific:** Your machine, your workflow
2. **Noise reduction:** Don't clutter git history with daily logs
3. **Privacy:** May contain sensitive debugging info
4. **Flexibility:** Change format anytime without commits
5. **Speed:** No need to commit/push for quick notes

---

## Integration with Docs

**When to promote reports to docs:**
- Recurring issue → Add to `docs/TROUBLESHOOTING.md`
- Deployment pattern → Update `docs/deployment/deployment-guide.md`
- Performance insight → Add to `docs/NOTES.md`
- User feedback → Create GitHub Issue

**Rule of thumb:** If it's useful for others, move it to `docs/` or GitHub Issues.

---

## Examples

See `reports/README.md` for detailed templates and examples.

**Related:**
- [STYLE_GUIDE.md](../STYLE_GUIDE.md) - Development workflow
- [docs/deployment/](./deployment/) - Deployment guide
- [docs/NOTES.md](./NOTES.md) - Development diary

---

## Archive vs Reports - Quick Reference

### Decision Tree

```
New document to create?
│
├─ Strategic decision? ────────────────► docs/archive/
├─ Milestone/phase completion? ────────► docs/archive/
├─ Cost/architecture analysis? ────────► docs/archive/
│
├─ Deployment log? ────────────────────► reports/deployment/
├─ Test result? ───────────────────────► reports/usability/ or stability/
├─ Daily check? ───────────────────────► reports/stability/ or performance/
└─ Temporary debugging? ───────────────► reports/ (appropriate subfolder)
```

### When in Doubt

**Ask yourself:**
1. Will future developers need this to understand decisions? → **archive/**
2. Is this just for my local context? → **reports/**
3. Is this a "what happened" log? → **reports/**
4. Is this a "why we decided" doc? → **archive/**

**See also:** [docs/archive/README.md](./archive/README.md) for archive purpose.
