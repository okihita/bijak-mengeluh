# Development Workflow

**For Developers & AI Agents**

---

## 🚨 Critical Rule: Always Run Local Server

**Before making ANY code changes, ensure local dev server is running:**

```bash
cd /Users/okihita/ArcaneSanctum/Bijak-Mengeluh/aic-complaint-app
npm run dev
```

**Access at:** http://localhost:3000

### Why?
- ✅ Instant feedback on changes
- ✅ No waiting for production deployment
- ✅ Test before pushing to production
- ✅ Catch errors early
- ⚠️ Production URL (bijakmengeluh.id) takes 2-3 minutes to deploy

---

## Development Checklist

### Before Starting Work
- [ ] Pull latest changes: `git pull origin main`
- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Verify http://localhost:3000 loads
- [ ] Check `.env.local` has correct API URL

### During Development
- [ ] Keep dev server running in terminal
- [ ] Test changes in browser immediately
- [ ] Check browser console for errors
- [ ] Verify mobile view (DevTools)
- [ ] Test accessibility (keyboard navigation)

### Before Committing
- [ ] All features work in localhost
- [ ] No console errors
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Lint passes: `npm run lint`
- [ ] Build succeeds: `npm run build`

### After Pushing
- [ ] Monitor Vercel deployment
- [ ] Test on production URL
- [ ] Verify no regressions

---

## Quick Commands

```bash
# Start development server (ALWAYS RUN THIS FIRST)
npm run dev

# Build for production (test before pushing)
npm run build

# Start production build locally
npm run build && npm start

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Format code
npx prettier --write .
```

---

## AI Agent Instructions

When making code changes:

1. **ALWAYS start dev server first:**
   ```bash
   cd /Users/okihita/ArcaneSanctum/Bijak-Mengeluh/aic-complaint-app
   npm run dev &
   ```

2. **Make changes to code**

3. **Test in browser:**
   - Open http://localhost:3000
   - Verify changes work
   - Check console for errors

4. **Build test:**
   ```bash
   npm run build
   ```

5. **Only then commit and push:**
   ```bash
   git add .
   git commit -m "Description"
   git push origin main
   ```

---

## Environment Variables

### Local Development (.env.local)
```bash
NEXT_PUBLIC_API_GATEWAY_URL=https://brain.bijakmengeluh.id
```

### Production (Vercel)
Set in Vercel dashboard:
- `NEXT_PUBLIC_API_GATEWAY_URL=https://brain.bijakmengeluh.id`

---

## Common Issues

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Changes Not Reflecting
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Build Fails
```bash
# Clear everything and reinstall
rm -rf .next node_modules
npm install
npm run build
```

---

## Testing Workflow

### 1. Local Testing (Required)
- Test all changes on localhost:3000
- Verify functionality works
- Check console for errors
- Test mobile view

### 2. Build Testing (Required)
```bash
npm run build
npm start
```
- Verify production build works
- Check for build warnings
- Test on localhost:3000 (production mode)

### 3. Production Testing (After Deploy)
- Wait for Vercel deployment (~2 min)
- Test on bijakmengeluh.id
- Verify no regressions
- Check real API integration

---

## File Structure

```
src/
├── app/              # Next.js app router
│   ├── page.tsx      # Main page
│   ├── layout.tsx    # Root layout
│   └── history/      # History page
├── components/       # React components
│   ├── ui/           # UI components
│   └── ...
└── lib/              # Utilities
    ├── scorer.ts     # Quality scoring
    ├── hooks.ts      # Custom hooks
    └── utils.ts      # Helper functions
```

---

## Git Workflow

```bash
# 1. Pull latest
git pull origin main

# 2. Create feature branch (optional)
git checkout -b feature/my-feature

# 3. Make changes (with dev server running!)

# 4. Test locally

# 5. Commit
git add .
git commit -m "feat: add feature description"

# 6. Push
git push origin main  # or feature branch

# 7. Auto-deploys to production via Vercel webhook
```

---

## Performance Tips

### Fast Refresh
- Next.js automatically refreshes on file changes
- Keep dev server running for instant feedback
- No need to restart server for most changes

### Turbopack
- Already enabled in `npm run dev`
- Faster than Webpack
- Better HMR (Hot Module Replacement)

### TypeScript
- Type checking happens in editor
- Run `npx tsc --noEmit` before committing
- Catches errors early

---

## Debugging

### Browser DevTools
```javascript
// Add breakpoints in browser
debugger;

// Console logging
console.log('Debug:', variable);

// React DevTools
// Install extension for component inspection
```

### VS Code
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    }
  ]
}
```

---

## Best Practices

### DO ✅
- Always run dev server before coding
- Test changes immediately in browser
- Check console for errors
- Build before pushing
- Write descriptive commit messages
- Test on mobile view

### DON'T ❌
- Don't push without local testing
- Don't ignore TypeScript errors
- Don't skip build testing
- Don't commit console.logs
- Don't push broken code
- Don't test only on production

---

## Monitoring

### Local Development
- Watch terminal for errors
- Check browser console
- Monitor network tab
- Use React DevTools

### Production
- Vercel deployment logs
- Browser console on bijakmengeluh.id
- User feedback
- Analytics (if enabled)

---

**Last Updated:** Nov 14, 2025  
**For Questions:** Check docs/ or ask in team chat
