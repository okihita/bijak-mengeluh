# Usability Test Guide

This guide provides test paths for both human testers and AI agents to validate the application's usability.

## Test Environment

**Production URL:** https://bijakmengeluh.id (or your Vercel deployment URL)  
**API Endpoint:** https://brain.bijakmengeluh.id/generate

---

## Human Tester Paths

### Path 1: Basic Complaint Submission (Happy Path)
**Goal:** Submit a valid complaint and receive AI-generated response

1. Open the application
2. Read the main heading "Curhatin Aja Keluhanmu"
3. Click on the textarea
4. Type: "Jalanan di depan rumah saya di Jalan Sudirman Jakarta rusak parah sudah 3 bulan tidak diperbaiki"
5. Observe the character counter (should show 100+ characters)
6. Observe the quality score badge (should appear with suggestions)
7. Click "Bikinin Komplain" button
8. Wait for processing (observe loading states)
9. Verify generated complaint appears
10. Verify suggested ministries appear with scores
11. Verify social media handle appears (if found)
12. Click "Salin" button to copy complaint
13. Verify "Tersalin!" confirmation appears

**Expected Results:**
- ✅ Quality score shows 80-100 (green badge)
- ✅ Generated complaint is formal and well-structured
- ✅ At least 1 ministry suggested
- ✅ Copy button works
- ✅ No errors displayed

---

### Path 2: Short Input Validation
**Goal:** Test minimum character validation

1. Open the application
2. Click on textarea
3. Type: "Jalan rusak"
4. Observe character counter (should show red, below 20)
5. Try to click "Bikinin Komplain" button
6. Verify button is disabled
7. Add more text: "Jalan rusak di depan rumah saya"
8. Verify button becomes enabled when > 20 characters

**Expected Results:**
- ✅ Button disabled when < 20 characters
- ✅ Character counter shows red
- ✅ Button enabled when ≥ 20 characters

---

### Path 3: Quality Scoring Feedback
**Goal:** Test real-time quality feedback system

1. Open the application
2. Type: "Jalan rusak banget nih"
3. Observe quality score (should be low, red badge)
4. Note suggestions (should mention location, timeframe)
5. Add location: "Jalan rusak banget nih di Jalan Sudirman"
6. Observe score increase
7. Add timeframe: "Jalan rusak banget nih di Jalan Sudirman sudah 2 bulan"
8. Observe score increase (should be yellow/green)

**Expected Results:**
- ✅ Score starts low (< 60)
- ✅ Suggestions appear for missing info
- ✅ Score increases as details added
- ✅ Badge color changes (red → yellow → green)

---

### Path 4: Keyboard Navigation (Accessibility)
**Goal:** Test keyboard-only navigation

1. Open the application
2. Press `Tab` key repeatedly
3. Verify focus moves through interactive elements
4. Press `Ctrl+K` (or `Cmd+K` on Mac)
5. Verify textarea receives focus
6. Type a complaint
7. Press `Tab` to navigate to submit button
8. Press `Enter` to submit
9. Press `Escape` to clear focus

**Expected Results:**
- ✅ All interactive elements are keyboard accessible
- ✅ Focus indicators are visible
- ✅ Ctrl+K focuses textarea
- ✅ Escape clears focus

---

### Path 5: Mobile Experience
**Goal:** Test mobile responsiveness and touch targets

1. Open on mobile device (or use browser DevTools mobile view)
2. Verify layout is readable
3. Tap on textarea (should be easy to hit)
4. Type complaint using mobile keyboard
5. Tap category buttons (should be ≥ 44px)
6. Scroll through results
7. Tap "Salin" button
8. Verify bottom navigation is accessible

**Expected Results:**
- ✅ All touch targets ≥ 44px
- ✅ Text is readable without zooming
- ✅ No horizontal scrolling
- ✅ Bottom navigation doesn't overlap content

---

### Path 6: Dark Mode
**Goal:** Test theme switching

1. Open the application
2. Click theme toggle button (top right)
3. Verify dark mode activates
4. Check all text is readable
5. Submit a complaint
6. Verify results are readable in dark mode
7. Toggle back to light mode

**Expected Results:**
- ✅ Theme switches smoothly
- ✅ All text has sufficient contrast
- ✅ No visual glitches

---

### Path 7: Error Handling
**Goal:** Test error scenarios

1. Open browser DevTools
2. Go to Network tab
3. Set network to "Offline"
4. Try to submit a complaint
5. Verify error message appears in Indonesian
6. Set network back to "Online"
7. Click "Coba Lagi" button
8. Verify complaint processes successfully

**Expected Results:**
- ✅ Error message in Indonesian
- ✅ Retry button appears
- ✅ Retry works after network restored

---

### Path 8: History Feature
**Goal:** Test complaint history

1. Submit a complaint successfully
2. Click "Riwayat" link (desktop) or bottom nav (mobile)
3. Verify submitted complaint appears in history
4. Click on a history item
5. Verify it loads the complaint

**Expected Results:**
- ✅ History saves locally
- ✅ Can view past complaints
- ✅ Can reload past complaints

---

## AI Agent Test Paths

### Automated Test Script

```javascript
// Test 1: Page Load
async function testPageLoad() {
  const response = await fetch('https://bijakmengeluh.id');
  console.assert(response.status === 200, 'Page should load');
  const html = await response.text();
  console.assert(html.includes('Curhatin Aja Keluhanmu'), 'Title should be present');
}

// Test 2: API Integration
async function testAPIIntegration() {
  const response = await fetch('https://brain.bijakmengeluh.id/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'Jalanan di depan rumah saya di Jalan Sudirman Jakarta rusak parah sudah 3 bulan'
    })
  });
  console.assert(response.status === 200, 'API should respond');
  const data = await response.json();
  console.assert(data.generated_text, 'Should have generated text');
  console.assert(data.suggested_contacts.length > 0, 'Should have contacts');
}

// Test 3: Accessibility
async function testAccessibility() {
  // Check for ARIA labels
  const textarea = document.querySelector('#complaint-description');
  console.assert(textarea.hasAttribute('aria-label'), 'Textarea should have aria-label');
  console.assert(textarea.hasAttribute('aria-describedby'), 'Textarea should have aria-describedby');
  
  // Check for skip link
  const skipLink = document.querySelector('a[href="#main-content"]');
  console.assert(skipLink !== null, 'Skip link should exist');
  
  // Check for live regions
  const liveRegion = document.querySelector('[aria-live="polite"]');
  console.assert(liveRegion !== null, 'Live region should exist');
}

// Test 4: Form Validation
async function testFormValidation() {
  const textarea = document.querySelector('#complaint-description');
  const button = document.querySelector('button[type="submit"]');
  
  // Test short input
  textarea.value = 'Short';
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  console.assert(button.disabled, 'Button should be disabled for short input');
  
  // Test valid input
  textarea.value = 'This is a valid complaint with more than twenty characters';
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  console.assert(!button.disabled, 'Button should be enabled for valid input');
}

// Test 5: Quality Scoring
async function testQualityScoring() {
  const textarea = document.querySelector('#complaint-description');
  
  // Test without location
  textarea.value = 'Jalan rusak banget sudah lama';
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 100));
  
  const badge = document.querySelector('[class*="badge"]');
  console.assert(badge !== null, 'Quality badge should appear');
  
  // Test with location
  textarea.value = 'Jalan rusak banget di Jalan Sudirman sudah 3 bulan';
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  await new Promise(r => setTimeout(r, 100));
  // Score should improve
}

// Run all tests
async function runAllTests() {
  console.log('Starting usability tests...');
  await testPageLoad();
  await testAPIIntegration();
  await testAccessibility();
  await testFormValidation();
  await testQualityScoring();
  console.log('All tests completed!');
}
```

---

## Accessibility Checklist

### Screen Reader Testing
- [ ] Navigate with Tab key through all interactive elements
- [ ] Verify ARIA labels are announced
- [ ] Verify live regions announce status changes
- [ ] Verify form errors are announced
- [ ] Verify success messages are announced

### Keyboard Testing
- [ ] All functionality accessible via keyboard
- [ ] Focus indicators visible
- [ ] Ctrl+K focuses textarea
- [ ] Escape clears focus
- [ ] Enter submits form

### Visual Testing
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Text readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators have 3:1 contrast

### Touch Testing
- [ ] All touch targets ≥ 44px
- [ ] No accidental activations
- [ ] Swipe gestures work (if applicable)
- [ ] Pinch zoom works

---

## Performance Checklist

- [ ] Page loads in < 3 seconds
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] API response time < 6 seconds

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS 14+)
- [ ] Chrome Android (latest)

---

## Success Criteria

### Must Pass
- ✅ All happy path tests pass
- ✅ Accessibility score 100 (Lighthouse)
- ✅ No console errors
- ✅ API integration works
- ✅ Mobile responsive

### Should Pass
- ✅ Quality scoring accurate
- ✅ Error handling graceful
- ✅ Dark mode works
- ✅ History feature works

### Nice to Have
- ✅ Keyboard shortcuts work
- ✅ PWA installable
- ✅ Offline support

---

## Reporting Issues

When reporting issues, include:
1. Test path number
2. Step where issue occurred
3. Expected vs actual behavior
4. Browser/device info
5. Screenshots/video if applicable

Example:
```
Path 3, Step 5
Expected: Score increases when location added
Actual: Score stays the same
Browser: Chrome 120, macOS
```
