# Deployment Protocol

## ⚠️ CRITICAL RULE: Always Ask for Confirmation Before Push

This is a **hard requirement** for all AI agents and contributors working on this project.

### The Rule

**NEVER execute `git push` without explicit user confirmation.**

### The Process

1. ✅ Make code changes
2. ✅ Test locally
3. ✅ `git add` and `git commit` locally
4. ⚠️ **STOP and ask user:** "Ready to push to GitHub? (y/n)"
5. ⏸️ **WAIT for explicit confirmation**
6. ✅ Only if user says "y" or "yes": execute `git push`

### Example Interaction

```
✅ Changes committed locally (commit: abc1234)

📝 Summary:
   - Added feature X
   - Fixed bug Y
   - Updated documentation

⚠️ Ready to push to GitHub? (y/n)
```

**If user says "n" or "no":**
- Do NOT push
- Keep changes local
- Ask what they'd like to do next

**If user says "y" or "yes":**
- Proceed with `git push`
- Confirm push was successful

### Why This Matters

- **Prevents premature deployments** - User may want to review changes first
- **Allows additional testing** - User may want to test more before deploying
- **Avoids breaking production** - Gives user control over when code goes live
- **Respects user workflow** - User may have specific deployment timing needs
- **Enables review** - User can check commit message, diff, etc.

### What NOT to Do

❌ Push automatically after committing  
❌ Assume user wants immediate deployment  
❌ Skip the confirmation step  
❌ Push without showing what's being pushed  
❌ Combine commit and push in one step without asking  

### What TO Do

✅ Always commit first, then ask  
✅ Show clear summary of what's being pushed  
✅ Wait for explicit "yes" or "y"  
✅ Respect "no" answers  
✅ Ask if user wants to make more changes  

### For AI Agents

This rule applies to:
- All versions (v2.x, v3.x, etc.)
- All types of changes (features, fixes, docs)
- All branches (main, develop, feature branches)
- All repositories in this project

**Remember:** The user has final say on when code gets pushed to GitHub.

### Exceptions

There are **NO exceptions** to this rule. Even for:
- Documentation changes
- Typo fixes
- Emergency hotfixes

Always ask first.

---

## Development Server Protocol

### During Active AI Sessions

When working with an agentic AI during development:

**The localhost development server MUST remain running throughout the entire session.**

- Changes to code will restart the server automatically (hot reload)
- The server process itself should NOT be killed
- Only terminate the server when explicitly requested by the user or when the AI session ends

This ensures:
- Continuous testing capability
- Immediate feedback on changes
- Uninterrupted development workflow
- No need to manually restart the server between changes

---

## UI Development Protocol

### Component Reusability (Next.js)

When coding UI components, **maximize reusability** to maintain consistency and reduce code duplication.

**Required practices:**

- **Shared layout patterns**: Use consistent container classes across pages
  - Example: `container mx-auto px-4 sm:px-6 md:px-8 py-6`
- **Reusable components**: Extract common UI elements (buttons, cards, headers)
- **Consistent spacing**: Use the same padding/margin patterns across similar elements
- **Shared utilities**: Leverage Next.js layout system for common page structures
- **Component composition**: Build complex UIs from smaller, reusable pieces

**Benefits:**
- Consistent user experience across all pages
- Easier maintenance and updates
- Faster development of new features
- Reduced CSS/styling conflicts
- Better mobile responsiveness consistency

**Before adding new UI code, ask:**
1. Does a similar component already exist?
2. Can this be extracted into a reusable component?
3. Are the spacing/layout patterns consistent with existing pages?

---

**Last Updated:** 2025-11-16  
**Status:** Active and enforced
