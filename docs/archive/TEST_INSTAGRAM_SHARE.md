# Instagram Share Feature - Production Test

**URL:** https://bijakmengeluh.id  
**Deployed:** 2025-11-15 00:07 WIB  
**Commit:** 9cc5fc3

## Test Checklist

### ✅ Pre-Test
- [x] Code committed and pushed
- [x] Vercel auto-deploy triggered
- [x] Site returns 200 OK

### 🧪 Manual Tests Required

1. **Generate a complaint**
   - Go to https://bijakmengeluh.id
   - Enter complaint text
   - Click "Buat Komplain"
   - Wait for AI response

2. **Test Instagram Share Button**
   - Look for "Instagram" button next to "Bagikan"
   - Click the Instagram button
   - Verify:
     - Button shows "Membuat..." while processing
     - Image is generated (1080px width)
     - Share dialog appears OR image downloads
     - Image contains:
       - Complaint text
       - Ministry name (if available)
       - bijakmengeluh.id branding
       - Gradient purple background

3. **Test on Mobile**
   - Open on mobile device
   - Generate complaint
   - Click Instagram button
   - Verify native share sheet appears
   - Check if Instagram app is in share options

### Expected Behavior
- Desktop: Download image or share dialog
- Mobile: Native share sheet with Instagram option
- Image: 1080x1080 PNG, styled card on gradient

### Rollback Plan
If feature fails:
```bash
cd aic-complaint-app
git revert 9cc5fc3
git push origin main
```

---

**Status:** ⏳ Awaiting manual verification  
**Next:** Test on https://bijakmengeluh.id and update this file
