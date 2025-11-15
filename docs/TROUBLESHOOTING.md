# Troubleshooting Guide

Common issues and solutions for Bijak Mengeluh users.

---

## Complaint Generation Issues

### "Minimal 20 karakter" Error

**Problem:** Complaint too short

**Solution:**
- Add more details: "Jalan rusak" → "Jalan rusak parah di depan rumah saya"
- Minimum 20 characters required

### No Agency Suggested

**Problem:** Location not recognized

**Solution:**
- Add specific location: "sampah menumpuk" → "sampah menumpuk di Jakarta Selatan"
- Currently supports: 31 national agencies + 90 DKI Jakarta agencies
- Other provinces coming in v3.0

### Response Takes Too Long (>5s)

**Problem:** Network or server issue

**Solution:**
1. Check internet connection
2. Refresh page (Cmd+R / Ctrl+R)
3. Try again in 1 minute
4. If persists, report at GitHub Issues

---

## Instagram Sharing Issues

### Image Not Generating

**Problem:** Browser compatibility

**Solution:**
- Use Chrome, Safari, or Edge (latest version)
- Firefox may have issues with html2canvas
- Clear browser cache and retry

### Downloaded Image is Blank

**Problem:** Timing issue with image generation

**Solution:**
1. Wait 2-3 seconds after clicking "Share ke Instagram Story"
2. Click download button again
3. If still blank, refresh page and regenerate complaint

### Image Quality is Low

**Problem:** Device screen resolution

**Solution:**
- Image is optimized for Instagram Stories (1080x1920)
- Quality may appear lower on high-DPI screens
- Final Instagram upload will look correct

---

## History Issues

### Complaints Not Saving

**Problem:** LocalStorage disabled or full

**Solution:**
1. Check browser settings: Enable cookies/storage
2. Clear old history: Click "Hapus" on old complaints
3. Private/Incognito mode doesn't save history

### Can't Delete Complaint

**Problem:** Browser storage locked

**Solution:**
1. Refresh page
2. Try deleting again
3. Clear all browser data if persists

---

## Dark Mode Issues

### Theme Not Persisting

**Problem:** LocalStorage not saving preference

**Solution:**
- Enable cookies/storage in browser settings
- Private/Incognito mode resets theme on close

### Text Unreadable in Dark Mode

**Problem:** Browser extension interfering

**Solution:**
- Disable dark mode extensions (Dark Reader, etc.)
- Use built-in theme toggle instead

---

## Mobile Issues

### Buttons Not Tappable

**Problem:** Zoom level incorrect

**Solution:**
- Reset zoom: Pinch out or double-tap
- Refresh page
- Try landscape orientation

### Keyboard Covers Input

**Problem:** Mobile browser behavior

**Solution:**
- Scroll up manually after typing
- Close keyboard to see full form
- Use "Done" button on keyboard

### PWA Not Installing

**Problem:** Browser doesn't support PWA

**Solution:**
- Use Chrome or Safari on mobile
- Look for "Add to Home Screen" in browser menu
- iOS: Share button → "Add to Home Screen"

---

## Performance Issues

### Page Loads Slowly

**Problem:** Network or cache issue

**Solution:**
1. Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
2. Clear browser cache
3. Check internet speed (requires ~1 Mbps)

### API Timeout

**Problem:** Server overload or network issue

**Solution:**
1. Wait 30 seconds
2. Try again
3. If persists >5 minutes, check status at GitHub Issues

---

## Browser Compatibility

**Fully Supported:**
- Chrome 90+
- Safari 14+
- Edge 90+

**Partially Supported:**
- Firefox 88+ (Instagram share may have issues)

**Not Supported:**
- IE11 (use modern browser)
- Opera Mini (limited JavaScript support)

---

## Reporting Issues

**Before Reporting:**
1. Check this guide
2. Try in different browser
3. Clear cache and retry

**How to Report:**
1. Go to: https://github.com/okihita/Bijak-Mengeluh/issues
2. Click "New Issue"
3. Include:
   - Browser + version
   - Device (mobile/desktop)
   - Steps to reproduce
   - Screenshot if possible

---

## FAQ

**Q: Why is my complaint not formal enough?**  
A: Try selecting "Formal" tone explicitly. Default tone may vary.

**Q: Can I edit generated complaint?**  
A: Yes! Copy text and edit in any text editor before sending.

**Q: Why doesn't my city have agencies?**  
A: v2.0 covers national + DKI Jakarta only. More provinces coming in v3.0.

**Q: Is my complaint data stored?**  
A: Only in your browser's LocalStorage. We don't store complaints on servers.

**Q: Can I use this for non-government complaints?**  
A: It's optimized for government agencies, but you can adapt the generated text.

---

**Still stuck?** Open an issue: https://github.com/okihita/Bijak-Mengeluh/issues
