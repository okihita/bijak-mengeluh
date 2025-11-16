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

**Last Updated:** 2025-11-16  
**Status:** Active and enforced
