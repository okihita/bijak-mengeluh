# Design System Quick Start

**Read this first if you're new to the design system**

---

## 5-Minute Overview

### What is this?
A design system that ensures all pages look and feel consistent. Think of it as a style guide + component library + best practices.

### Why do we need it?
Pages were drifting in style. Different colors, spacing, navigation patterns. This fixes that.

### What do I need to do?
1. Use the templates when building new pages
2. Follow the color/spacing rules
3. Run the audit checklist before submitting PRs

---

## The 3 Documents You Need

### 1. DESIGN_SYSTEM.md
**When:** Need to know the "official" way to do something  
**Example:** "What color should this button be?" → Check color system section

### 2. DESIGN_IMPLEMENTATION_GUIDE.md
**When:** Need code to copy-paste  
**Example:** "How do I build a form?" → Copy form template

### 3. PAGE_AUDIT_CHECKLIST.md
**When:** Need to check if page is correct  
**Example:** "Is my page ready for PR?" → Run through checklist

---

## Most Common Tasks

### Task: Build a new page

```tsx
// 1. Copy this template
"use client";

import { TopBar } from "@/components/top-bar";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function NewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-6 pb-20 md:pb-6">
        <div className="space-y-8">
          {/* Your content here */}
        </div>
      </main>
      <BottomNavigation className="md:hidden" />
    </div>
  );
}
```

**Key points:**
- Always include TopBar
- Always include BottomNavigation (mobile only)
- Use `space-y-8` for section spacing
- Use `px-4 md:px-6` for horizontal padding

---

### Task: Add a button

```tsx
// Primary action (orange)
<Button variant="default">Main Action</Button>

// Secondary action (gray)
<Button variant="secondary">Alternative</Button>

// Destructive action (red)
<Button variant="destructive">Delete</Button>

// With loading state
<Button disabled={isLoading}>
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

**Key points:**
- Only ONE primary button per section
- Use `variant="default"` for main actions
- Always show loading state for async actions

---

### Task: Add spacing

```tsx
// Between sections (32px)
<div className="space-y-8">

// Between cards (24px)
<div className="space-y-6">

// Between form fields (16px)
<div className="space-y-4">

// Between related items (8px)
<div className="space-y-2">
```

**Key points:**
- Use `space-y-*` for vertical spacing
- Never use arbitrary values like `mt-7` or `mb-13`
- Stick to: 2, 4, 6, 8 (8px, 16px, 24px, 32px)

---

### Task: Choose a color

```tsx
// Text colors
<p className="text-foreground">Main text</p>
<p className="text-muted-foreground">Supporting text</p>

// Background colors
<div className="bg-background">Page background</div>
<div className="bg-card">Card background</div>

// Action colors
<Button className="bg-primary">Primary action</Button>
<Badge variant="success">Success</Badge>
<Badge variant="destructive">Error</Badge>
```

**Key points:**
- Never use hardcoded colors like `bg-orange-500`
- Use semantic names: `primary`, `success`, `destructive`
- Use `text-foreground` for body text
- Use `text-muted-foreground` for supporting text

---

### Task: Make it responsive

```tsx
// Text size
<h1 className="text-xl md:text-2xl lg:text-3xl">
  Title
</h1>

// Spacing
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>

// Show/hide
<div className="block md:hidden">Mobile only</div>
<div className="hidden md:block">Desktop only</div>
```

**Key points:**
- Mobile first (default styles are for mobile)
- Use `md:` for tablet (768px+)
- Use `lg:` for desktop (1024px+)

---

## The 5 Rules You Must Follow

### 1. Always use design tokens
❌ `bg-orange-500`  
✅ `bg-primary`

### 2. Always use spacing scale
❌ `mt-7 mb-13`  
✅ `space-y-8`

### 3. Always include TopBar and BottomNav
```tsx
<TopBar />
<main>...</main>
<BottomNavigation className="md:hidden" />
```

### 4. Always show loading states
❌ `<Button onClick={submit}>Submit</Button>`  
✅ `<Button disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</Button>`

### 5. Always run the audit checklist
Before submitting PR, check:
- [ ] Uses design tokens (no hardcoded colors)
- [ ] Uses spacing scale (no arbitrary values)
- [ ] Has TopBar and BottomNav
- [ ] Has loading states
- [ ] Works on mobile and desktop

---

## Common Mistakes

### Mistake 1: Hardcoded colors
```tsx
// ❌ Wrong
<div className="bg-orange-500 text-white">

// ✅ Right
<div className="bg-primary text-primary-foreground">
```

### Mistake 2: Arbitrary spacing
```tsx
// ❌ Wrong
<div className="mt-7 mb-13 ml-5">

// ✅ Right
<div className="space-y-8">
```

### Mistake 3: No loading state
```tsx
// ❌ Wrong
<Button onClick={handleSubmit}>Submit</Button>

// ✅ Right
<Button onClick={handleSubmit} disabled={isLoading}>
  {isLoading ? "Submitting..." : "Submit"}
</Button>
```

### Mistake 4: Missing navigation
```tsx
// ❌ Wrong
<main>
  {/* content */}
</main>

// ✅ Right
<div className="min-h-screen flex flex-col">
  <TopBar />
  <main className="flex-1">
    {/* content */}
  </main>
  <BottomNavigation className="md:hidden" />
</div>
```

### Mistake 5: Not responsive
```tsx
// ❌ Wrong
<div className="p-8">

// ✅ Right
<div className="p-4 md:p-6 lg:p-8">
```

---

## Quick Reference Card

### Colors
- Primary: `bg-primary` (orange)
- Text: `text-foreground` (black/white)
- Muted: `text-muted-foreground` (gray)
- Success: `bg-success` (green)
- Error: `bg-destructive` (red)

### Spacing
- Sections: `space-y-8` (32px)
- Cards: `space-y-6` (24px)
- Fields: `space-y-4` (16px)
- Items: `space-y-2` (8px)

### Typography
- H1: `text-2xl font-bold`
- H2: `text-xl font-semibold`
- H3: `text-lg font-medium`
- Body: `text-base`
- Small: `text-sm`

### Breakpoints
- Mobile: default (< 640px)
- Tablet: `md:` (≥ 768px)
- Desktop: `lg:` (≥ 1024px)

---

## Need More Help?

### For detailed specs
→ [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

### For code examples
→ [DESIGN_IMPLEMENTATION_GUIDE.md](./DESIGN_IMPLEMENTATION_GUIDE.md)

### For auditing pages
→ [PAGE_AUDIT_CHECKLIST.md](./PAGE_AUDIT_CHECKLIST.md)

### For copy guidelines
→ [VOICE_AND_TONE.md](./VOICE_AND_TONE.md)

---

## Checklist Before PR

- [ ] Used design tokens (no `bg-orange-500`)
- [ ] Used spacing scale (no `mt-7`)
- [ ] Has TopBar and BottomNav
- [ ] Has loading states for async actions
- [ ] Works on mobile (test at 375px width)
- [ ] Works on desktop (test at 1280px width)
- [ ] Text is readable (16px minimum)
- [ ] Buttons are tappable (44x44px minimum)
- [ ] Follows voice & tone guidelines
- [ ] Ran through full audit checklist

---

**Last Updated:** 2025-11-16  
**Version:** 1.0
