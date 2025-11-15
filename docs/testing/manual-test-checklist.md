# Manual Test Checklist

Quick production verification checklist.

## Critical Path (5 min)

### 1. Complaint Generation
- [ ] Visit https://bijakmengeluh.id
- [ ] Type complaint (>20 chars): "Jalan rusak parah di Jakarta Selatan"
- [ ] Click "Bikinin Komplain"
- [ ] Generated text appears (<2s)
- [ ] Suggested agency appears (Dinas PU Jakarta Selatan)
- [ ] Social media handle shows

### 2. Agency Matching Accuracy
- [ ] Test: "sampah menumpuk Jakarta Pusat" → Dinas Kebersihan Jakarta Pusat
- [ ] Test: "banjir Kemang" → Dinas SDA Jakarta Selatan
- [ ] Test: "polusi udara Jakarta" → Kementerian LHK (national)

### 3. Tone Variations
- [ ] Select "Formal" → Check for "Kepada Yth", "Hormat saya"
- [ ] Select "Lucu" → Check for humor/wordplay
- [ ] Select "Marah" → Check for assertive language (no profanity)

### 4. Instagram Sharing
- [ ] Click "Share ke Instagram Story"
- [ ] Image generates (9:16 format)
- [ ] Text is readable
- [ ] Download works

### 5. History
- [ ] Click "Riwayat" in bottom nav
- [ ] Previous complaint appears
- [ ] Copy button works
- [ ] Delete button works

### 6. Dark Mode
- [ ] Toggle theme switch
- [ ] All text readable in both modes

### 7. Mobile
- [ ] Test on mobile device or DevTools
- [ ] All buttons tappable
- [ ] No horizontal scroll

## Error Cases (2 min)

- [ ] Submit empty form → Error shows
- [ ] Submit <20 chars → Error shows
- [ ] Offline mode → Error shows with retry

## Performance (1 min)

- [ ] Hard refresh (Cmd+Shift+R)
- [ ] Page loads <2s
- [ ] No console errors
- [ ] Lighthouse score >90

---

**Total Time:** ~8 minutes  
**Run Before:** Every production deploy  
**Last Updated:** Nov 15, 2025
