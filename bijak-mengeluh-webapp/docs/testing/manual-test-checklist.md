# Manual Testing Checklist - Phase 1

**Test Date:** 2025-11-14  
**Tester:** _________  
**Browser:** _________  
**Device:** _________

## Pre-Test Setup
- [ ] Clear localStorage: `localStorage.clear()` in console
- [ ] Clear browser cache
- [ ] Open http://localhost:3000

---

## 1. Complaint Templates

### Test 1.1: Template Selection
- [ ] Click "🛣️ Jalan Rusak" button
- [ ] Verify textarea fills with template text
- [ ] Template contains placeholders like [lokasi], [waktu]
- [ ] Can edit the filled text

### Test 1.2: All Categories
- [ ] Test all 8 category buttons work:
  - [ ] 🛣️ Jalan Rusak
  - [ ] 🗑️ Sampah
  - [ ] ⚡ Listrik
  - [ ] 💧 Air Bersih
  - [ ] 🏥 Kesehatan
  - [ ] 🎓 Pendidikan
  - [ ] 🚌 Transportasi
  - [ ] 📋 Birokrasi

---

## 2. Smart Input Assistance

### Test 2.1: Progress Bar
- [ ] Type 10 characters - bar is red
- [ ] Type 100 characters - bar is yellow
- [ ] Type 200+ characters - bar is green
- [ ] Bar animates smoothly

### Test 2.2: Suggestion Chips
- [ ] Chips visible when textarea is empty
- [ ] Click "Saya ingin melaporkan" - text appears in textarea
- [ ] Click another chip - text appends with space
- [ ] Chips hide after typing 10+ characters

### Test 2.3: Auto-Capitalize
- [ ] Type "saya ingin melaporkan" - first letter capitalizes
- [ ] Type "ini masalah. saya butuh bantuan" - letter after period capitalizes

### Test 2.4: Character Counter
- [ ] Shows "X / 20 karakter minimum"
- [ ] Red when < 20 characters
- [ ] Green when ≥ 20 characters
- [ ] Updates in real-time

---

## 3. Auto-Save & Draft Management

### Test 3.1: Auto-Save
- [ ] Type some text
- [ ] Wait 10 seconds
- [ ] See "Menyimpan..." indicator
- [ ] Changes to "Tersimpan baru saja"
- [ ] Timestamp updates correctly

### Test 3.2: Draft Restoration
- [ ] Type text and wait for save
- [ ] Refresh page (F5)
- [ ] Text is restored in textarea
- [ ] No hydration errors in console

### Test 3.3: Save Indicator States
- [ ] "Menyimpan..." shows while saving
- [ ] "Tersimpan baru saja" after save
- [ ] "Tersimpan X menit lalu" after time passes
- [ ] Indicator only shows after page mount (no hydration error)

---

## 4. Enhanced History View

### Test 4.1: Navigation
- [ ] Click "Riwayat" in bottom nav (mobile) or top link (desktop)
- [ ] History page loads at /history
- [ ] Can navigate back to home

### Test 4.2: Empty State
- [ ] With no history, see empty state
- [ ] Shows calendar icon
- [ ] Shows "Belum ada riwayat komplain"
- [ ] "Buat Komplain Pertama" button works

### Test 4.3: Create History Entry
- [ ] Go to home page
- [ ] Fill complaint (>20 chars)
- [ ] Submit successfully (need API or mock)
- [ ] Go to history
- [ ] Entry appears in list

### Test 4.4: Statistics Card
- [ ] Shows "Total Komplain" count
- [ ] Shows "Rata-rata Panjang" in characters
- [ ] Numbers are accurate

### Test 4.5: Search
- [ ] Type in search box
- [ ] Results filter in real-time
- [ ] Case-insensitive search
- [ ] Shows "Gak nemu komplain dengan kata..." if no results

### Test 4.6: Sort
- [ ] Click "Terbaru" - newest first
- [ ] Click "Terlama" - oldest first
- [ ] Order changes correctly

### Test 4.7: Quick Actions
- [ ] Hover over card - buttons appear
- [ ] Click copy button - text copied to clipboard
- [ ] Click delete button - item removed
- [ ] Deleted item disappears from list

### Test 4.8: Bulk Delete
- [ ] Click trash icon in header
- [ ] Confirmation dialog appears
- [ ] Click OK - all history cleared
- [ ] Empty state shows

---

## 5. Micro-interactions

### Test 5.1: Confetti
- [ ] Submit a complaint successfully
- [ ] Confetti animation plays
- [ ] Particles spread from center
- [ ] Animation completes smoothly

### Test 5.2: Button Animations
- [ ] Click any button - scales down slightly
- [ ] Release - returns to normal
- [ ] Smooth transition

### Test 5.3: Card Hover
- [ ] Hover over history card - lifts up
- [ ] Shadow increases
- [ ] Smooth transition
- [ ] Returns to normal on mouse out

---

## 6. Loading States

### Test 6.1: Skeleton Loaders
- [ ] Submit complaint
- [ ] Generated text area shows skeleton lines (not spinner)
- [ ] Suggested contacts shows skeleton boxes
- [ ] Skeletons animate (pulse effect)

### Test 6.2: Analysis Steps
- [ ] Steps show in order during loading
- [ ] Each step shows spinner → checkmark
- [ ] Text changes color when active
- [ ] All complete when done

---

## 7. Error States

### Test 7.1: Short Input Error
- [ ] Type < 20 characters
- [ ] Click "Bikinin Komplain"
- [ ] Error message shows
- [ ] Message: "Isi dulu keluhannya, bos..."

### Test 7.2: Network Error (simulate)
- [ ] Open DevTools → Network tab
- [ ] Set to "Offline"
- [ ] Submit complaint
- [ ] Error card shows with icon
- [ ] "Coba Lagi" button appears

### Test 7.3: Retry Functionality
- [ ] After error, click "Coba Lagi"
- [ ] Form resubmits with same text
- [ ] (Go online first to test success)

---

## 8. Responsive Design

### Test 8.1: Mobile (375px)
- [ ] All buttons are tappable (44x44px min)
- [ ] Text is readable
- [ ] No horizontal scroll
- [ ] Bottom navigation visible
- [ ] Category chips wrap properly

### Test 8.2: Tablet (768px)
- [ ] Layout adjusts appropriately
- [ ] Two-column layout for results
- [ ] Desktop nav link shows

### Test 8.3: Desktop (1920px)
- [ ] Content max-width constrains properly
- [ ] No excessive whitespace
- [ ] All features accessible

---

## 9. Dark Mode

### Test 9.1: Theme Toggle
- [ ] Click theme toggle icon
- [ ] Theme switches instantly
- [ ] All colors readable in both modes
- [ ] Icons change appropriately

### Test 9.2: System Preference
- [ ] Set OS to dark mode
- [ ] Refresh page
- [ ] App respects system preference
- [ ] Can override with toggle

---

## 10. Accessibility

### Test 10.1: Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can submit form with Enter
- [ ] Can close modals with Escape (if any)

### Test 10.2: Screen Reader (if available)
- [ ] Form labels are announced
- [ ] Button purposes are clear
- [ ] Error messages are announced
- [ ] Status updates are announced

---

## 11. Performance

### Test 11.1: Load Time
- [ ] Hard refresh (Cmd+Shift+R)
- [ ] Page loads in < 2 seconds
- [ ] No layout shift
- [ ] Smooth animations (60fps)

### Test 11.2: Build
- [ ] Run `npm run build`
- [ ] No errors
- [ ] No warnings
- [ ] All routes generated

---

## Issues Found

| # | Feature | Issue | Severity | Status |
|---|---------|-------|----------|--------|
| 1 |         |       |          |        |
| 2 |         |       |          |        |
| 3 |         |       |          |        |

---

## Summary

**Total Tests:** 80+  
**Passed:** ___  
**Failed:** ___  
**Blocked:** ___  

**Overall Status:** ⬜ Pass / ⬜ Fail  

**Notes:**
