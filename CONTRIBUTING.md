# Contributing to Bijak Mengeluh

Thanks for your interest in contributing! 🎉

---

## Quick Start

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/Bijak-Mengeluh.git
cd Bijak-Mengeluh

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes (follow STYLE_GUIDE.md)

# 4. Test
cd bijak-mengeluh-webapp && npm run build
cd bijak-mengeluh-ai-backend && sam build

# 5. Commit
git commit -m "feat: add amazing feature"

# 6. Push and create PR
git push origin feature/amazing-feature
```

---

## Development Workflow

### Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Read [STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Follow code standards
3. **Read [ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Understand the system

### Making Changes

**Frontend (bijak-mengeluh-webapp):**
```bash
cd bijak-mengeluh-webapp
npm install
npm run dev  # http://localhost:3000
```

**Backend (bijak-mengeluh-ai-backend):**
```bash
cd bijak-mengeluh-ai-backend
sam build
sam local invoke  # Test locally
```

### Testing

**Before committing:**
```bash
# Frontend
npm run build          # Must pass
npx tsc --noEmit      # No TypeScript errors

# Backend
sam build             # Must pass
sam validate          # Template valid
```

**Manual testing:**
- Follow [docs/testing/manual-test-checklist.md](./docs/testing/manual-test-checklist.md)
- Test on mobile (Chrome DevTools)
- Test dark mode
- Test offline (PWA)

---

## Commit Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance (deps, build, etc.)

### Examples

```bash
feat(frontend): add WhatsApp sharing
fix(backend): handle empty complaint gracefully
docs: update API.md with rate limits
refactor(matcher): simplify keyword extraction
perf(lambda): reduce cold start time
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- [ ] Frontend builds without errors
- [ ] Backend builds without errors
- [ ] Manual tests pass
- [ ] CHANGELOG.md updated (if user-facing change)
- [ ] Documentation updated (if API/behavior changed)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Manual test checklist passed
- [ ] No console errors

## Screenshots (if UI change)
[Add screenshots]

## Related Issues
Closes #123
```

### Review Process

1. **Automated checks** - Build must pass (when CI implemented)
2. **Code review** - 1 approval required
3. **Testing** - Reviewer tests manually
4. **Merge** - Squash merge preferred

---

## Code Standards

### Frontend (TypeScript/React)

```typescript
// ✅ Good
export function ComplaintForm({ onSubmit }: Props) {
  const [complaint, setComplaint] = useState("");
  
  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}

// ❌ Bad
function complaintForm(props) {
  var complaint = "";
  // ...
}
```

**Key points:**
- Use TypeScript strict mode
- Functional components with hooks
- Named exports (not default)
- camelCase for variables/functions
- PascalCase for components

### Backend (Python)

```python
# ✅ Good
def match_agency(complaint: str) -> List[Agency]:
    """Match complaint to relevant agencies."""
    location = extract_location(complaint)
    return query_agencies(location)

# ❌ Bad
def matchAgency(complaint):
    location = extractLocation(complaint)
    return queryAgencies(location)
```

**Key points:**
- Follow PEP 8
- Type hints for functions
- snake_case for everything
- Docstrings for public functions

---

## What to Contribute

### Good First Issues

- [ ] Add more complaint templates
- [ ] Improve error messages
- [ ] Add keyboard shortcuts
- [ ] Improve mobile UX
- [ ] Add more test cases

### High Priority

- [ ] Add unit tests (frontend + backend)
- [ ] Implement error boundaries
- [ ] Add CloudWatch alarms
- [ ] Improve accessibility
- [ ] Add E2E tests

### Feature Requests

Check [ROADMAP.md](./ROADMAP.md) for planned features.

**Before implementing:**
1. Open an issue to discuss
2. Wait for approval
3. Then start coding

---

## Documentation

### When to Update Docs

**Always update:**
- API changes → [docs/API.md](./docs/API.md)
- Architecture changes → [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- User-facing changes → [CHANGELOG.md](./CHANGELOG.md)

**Sometimes update:**
- New features → [README.md](./README.md)
- Deployment changes → [docs/deployment/](./docs/deployment/)
- Troubleshooting → [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

### Documentation Style

- Use Markdown
- Keep it concise
- Add code examples
- Include screenshots for UI changes

---

## Getting Help

**Questions?**
- Read [docs/](./docs/) first
- Check [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
- Open a GitHub Discussion
- Ask in PR comments

**Found a bug?**
- Check existing issues
- Open new issue with reproduction steps
- Include screenshots/logs

---

## Code of Conduct

**Be respectful:**
- Constructive feedback only
- No harassment or discrimination
- Assume good intentions
- Help newcomers

**Be professional:**
- Clear communication
- Timely responses
- Quality over quantity

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🙏
