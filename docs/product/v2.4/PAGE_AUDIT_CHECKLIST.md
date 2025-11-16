# Page Audit Checklist

**Use this checklist to audit existing pages for design system compliance**

---

## How to Use This Checklist

1. Open the page you want to audit
2. Go through each section below
3. Mark items as ✅ (pass), ❌ (fail), or ⚠️ (needs improvement)
4. Document issues in the "Notes" section
5. Create tasks to fix failing items

---

## Page: ________________

**Audited by:** ________________  
**Date:** ________________

---

## 1. Layout & Structure

### Top Bar
- [ ] Has consistent top bar with logo
- [ ] Has theme toggle in top right
- [ ] Top bar is sticky/fixed
- [ ] Top bar height is 56px (3.5rem)
- [ ] Top bar has proper background and border

### Bottom Navigation (Mobile)
- [ ] Shows on mobile (< 768px)
- [ ] Hidden on desktop (≥ 768px)
- [ ] Has 3 navigation items (Home, History, Directory)
- [ ] Active state uses primary color
- [ ] Fixed at bottom with proper safe area

### Main Content
- [ ] Uses `<main>` semantic element
- [ ] Has container with max-width
- [ ] Has proper horizontal padding (px-4 md:px-6)
- [ ] Has proper vertical padding (py-6)
- [ ] Has bottom padding for mobile nav (pb-20 md:pb-6)
- [ ] Content is centered on desktop

**Notes:**
```
[Write any issues here]
```

---

## 2. Typography

### Headings
- [ ] Has one `<h1>` per page
- [ ] Heading hierarchy is correct (h1 → h2 → h3)
- [ ] Headings use correct font sizes
  - h1: text-2xl (32px)
  - h2: text-xl (24px)
  - h3: text-lg (20px)
- [ ] Headings use correct font weights (600-700)
- [ ] Headings use `text-foreground` color

### Body Text
- [ ] Body text is 16px minimum (text-base)
- [ ] Line height is 1.5 (leading-normal)
- [ ] Body text uses `text-foreground` color
- [ ] Supporting text uses `text-muted-foreground`
- [ ] Max line length is reasonable (< 65ch)

### Interactive Text
- [ ] Links are clearly distinguishable
- [ ] Button text is readable (font-weight 500-600)
- [ ] Labels are clear and associated with inputs

**Notes:**
```
[Write any issues here]
```

---

## 3. Colors

### Brand Colors
- [ ] Primary color used for main actions only
- [ ] Primary color is not overused
- [ ] Secondary color used appropriately
- [ ] No hardcoded color values (uses CSS variables)

### Semantic Colors
- [ ] Success states use green
- [ ] Warning states use yellow
- [ ] Error states use red
- [ ] Info states use blue (if applicable)

### Contrast
- [ ] Text has 4.5:1 contrast ratio minimum
- [ ] Interactive elements have 3:1 contrast ratio
- [ ] Focus states are clearly visible
- [ ] Works in both light and dark mode

**Notes:**
```
[Write any issues here]
```

---

## 4. Spacing

### Vertical Spacing
- [ ] Sections use space-y-8 (32px)
- [ ] Cards use space-y-6 (24px)
- [ ] Form fields use space-y-4 (16px)
- [ ] Related items use space-y-2 (8px)
- [ ] No arbitrary spacing values

### Horizontal Spacing
- [ ] Page margins are consistent
- [ ] Card padding is 24px (p-6)
- [ ] Button padding is appropriate
- [ ] No arbitrary spacing values

### Component Spacing
- [ ] Consistent spacing between components
- [ ] Proper spacing in cards
- [ ] Proper spacing in forms
- [ ] Proper spacing in lists

**Notes:**
```
[Write any issues here]
```

---

## 5. Components

### Buttons
- [ ] Uses Button component from ui/button
- [ ] Correct variant (default, secondary, outline, ghost, destructive)
- [ ] Correct size (default, sm, lg)
- [ ] Has hover state
- [ ] Has active state (scale down)
- [ ] Has disabled state (when applicable)
- [ ] Has loading state (when async)
- [ ] Minimum 44x44px touch target
- [ ] Clear, action-oriented label

### Cards
- [ ] Uses Card component from ui/card
- [ ] Has CardHeader, CardContent structure
- [ ] Has proper padding (p-6)
- [ ] Has proper spacing between elements
- [ ] Interactive cards have hover state

### Forms
- [ ] All inputs have labels
- [ ] Labels use Label component
- [ ] Inputs use Input/Textarea components
- [ ] Has validation feedback
- [ ] Has error states
- [ ] Has loading states
- [ ] Prevents double submission

### Badges
- [ ] Uses Badge component
- [ ] Correct variant for status
- [ ] Appropriate size and placement

### Alerts
- [ ] Uses Alert component
- [ ] Correct variant (default, success, warning, destructive)
- [ ] Has icon
- [ ] Has clear message

**Notes:**
```
[Write any issues here]
```

---

## 6. Responsive Design

### Mobile (< 640px)
- [ ] Layout works on small screens
- [ ] Text is readable (16px minimum)
- [ ] Touch targets are 44x44px minimum
- [ ] No horizontal scrolling
- [ ] Bottom navigation is visible
- [ ] Content is not cut off

### Tablet (640px - 1023px)
- [ ] Layout adapts appropriately
- [ ] Spacing increases from mobile
- [ ] Grid layouts work correctly
- [ ] Navigation is appropriate

### Desktop (≥ 1024px)
- [ ] Content has max-width
- [ ] Layout uses available space well
- [ ] Multi-column layouts work
- [ ] No bottom navigation
- [ ] Hover states work

**Notes:**
```
[Write any issues here]
```

---

## 7. Interactions & Animations

### Micro-interactions
- [ ] Buttons scale down on press
- [ ] Cards have hover effects (if interactive)
- [ ] Links have hover effects
- [ ] Inputs have focus effects
- [ ] Transitions are smooth (150-300ms)

### Loading States
- [ ] Has skeleton loading for content
- [ ] Has spinner for actions
- [ ] Buttons show loading state
- [ ] Loading states are clear

### Transitions
- [ ] Page transitions are smooth
- [ ] No jarring layout shifts
- [ ] Animations are performant
- [ ] Respects prefers-reduced-motion

**Notes:**
```
[Write any issues here]
```

---

## 8. Accessibility

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus states are visible
- [ ] Can submit forms with Enter
- [ ] Can close modals with Escape

### Screen Reader
- [ ] Has proper semantic HTML
- [ ] Images have alt text
- [ ] Forms have proper labels
- [ ] ARIA labels where needed
- [ ] Error messages are announced

### Touch Targets
- [ ] All interactive elements are 44x44px minimum
- [ ] Adequate spacing between touch targets
- [ ] No overlapping touch areas

**Notes:**
```
[Write any issues here]
```

---

## 9. Performance

### Loading
- [ ] Initial load is fast (< 3s)
- [ ] Perceived performance is good
- [ ] No layout shift during load
- [ ] Images are optimized
- [ ] Fonts load quickly

### Interactions
- [ ] Buttons respond immediately
- [ ] Forms submit quickly
- [ ] No janky animations
- [ ] No unnecessary re-renders

**Notes:**
```
[Write any issues here]
```

---

## 10. Content & Copy

### Voice & Tone
- [ ] Uses empowerment language
- [ ] Avoids bureaucratic language
- [ ] Clear and direct
- [ ] Appropriate for audience
- [ ] Consistent with brand voice

### Clarity
- [ ] Instructions are clear
- [ ] Error messages are helpful
- [ ] Success messages are clear
- [ ] No jargon or technical terms
- [ ] Proper Indonesian grammar

**Notes:**
```
[Write any issues here]
```

---

## Summary

### Passing Items: _____ / _____

### Critical Issues (Must Fix)
1. 
2. 
3. 

### Minor Issues (Should Fix)
1. 
2. 
3. 

### Improvements (Nice to Have)
1. 
2. 
3. 

### Overall Assessment
- [ ] ✅ Passes audit (minor issues only)
- [ ] ⚠️ Needs improvement (some critical issues)
- [ ] ❌ Fails audit (many critical issues)

---

## Action Items

| Issue | Priority | Assigned To | Due Date | Status |
|-------|----------|-------------|----------|--------|
|       | High/Med/Low |           |          | Todo/In Progress/Done |
|       |          |             |          |        |
|       |          |             |          |        |

---

## Follow-up

**Re-audit date:** ________________  
**Re-audit by:** ________________

---

**Template Version:** 1.0  
**Last Updated:** 2025-11-16
