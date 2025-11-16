# Typography Specification

**Purpose:** Enforce consistent typography across all pages  
**Audience:** Developers, designers, AI agents  
**Last Updated:** 2025-11-16

---

## Core Principle

**Mobile-first, compact typography that scales up on desktop.**

All pages must feel part of the same app through consistent type hierarchy, sizing, and spacing.

---

## Type Scale

### Headings

```tsx
// Page Title (H1)
<h1 className="text-2xl sm:text-3xl font-bold">
  Page Title
</h1>

// Section Title (H2)
<h2 className="text-xl sm:text-2xl font-semibold">
  Section Title
</h2>

// Subsection (H3)
<h3 className="text-lg sm:text-xl font-medium">
  Subsection
</h3>

// Card Title (H4)
<h4 className="text-base sm:text-lg font-semibold">
  Card Title
</h4>
```

**Rules:**
- Always use responsive sizing: `text-{mobile} sm:text-{desktop}`
- Mobile: 1 size smaller than desktop
- Font weights: bold (700), semibold (600), medium (500)

### Body Text

```tsx
// Primary body text
<p className="text-sm sm:text-base text-gray-900 dark:text-white">
  Main content
</p>

// Secondary text
<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
  Supporting text
</p>

// Helper text
<span className="text-xs text-gray-500 dark:text-gray-500">
  Helper text
</span>
```

**Rules:**
- Body: `text-sm sm:text-base` (14px → 16px)
- Secondary: `text-xs sm:text-sm` (12px → 14px)
- Helper: `text-xs` (12px, no scaling)

### Buttons & Interactive

```tsx
// Primary button
<Button className="text-sm sm:text-base font-medium">
  Action
</Button>

// Secondary button
<Button className="text-xs sm:text-sm font-medium">
  Secondary
</Button>

// Link
<a className="text-sm sm:text-base text-orange-600 hover:text-orange-700">
  Link text
</a>
```

**Rules:**
- Buttons scale with content
- Font weight: medium (500)
- Links inherit body size

---

## Spacing Hierarchy

### Vertical Rhythm

```tsx
// Between sections
<div className="space-y-6 sm:space-y-8">

// Between cards
<div className="space-y-4 sm:space-y-6">

// Within cards
<div className="space-y-3 sm:space-y-4">

// Tight spacing (form fields)
<div className="space-y-2">
```

**Rules:**
- Section spacing: 24px → 32px
- Card spacing: 16px → 24px
- Internal spacing: 12px → 16px
- Tight spacing: 8px (no scaling)

### Margins

```tsx
// After headings
<h1 className="mb-4 sm:mb-6">Title</h1>
<h2 className="mb-3 sm:mb-4">Section</h2>
<h3 className="mb-2 sm:mb-3">Subsection</h3>

// After paragraphs
<p className="mb-3 sm:mb-4">Text</p>
```

---

## Line Height

```tsx
// Headings (tight)
className="leading-tight"  // 1.25

// Body text (normal)
className="leading-normal"  // 1.5

// Relaxed (long-form)
className="leading-relaxed"  // 1.625
```

**Rules:**
- Headings: `leading-tight`
- Body: `leading-normal`
- Long-form: `leading-relaxed`

---

## Font Weights

```tsx
// Bold (headings, emphasis)
className="font-bold"  // 700

// Semibold (section titles)
className="font-semibold"  // 600

// Medium (buttons, labels)
className="font-medium"  // 500

// Normal (body text)
className="font-normal"  // 400
```

**Never use:**
- `font-light` (300) - too thin on mobile
- `font-extrabold` (800+) - too heavy

---

## Text Colors

```tsx
// Primary text
className="text-gray-900 dark:text-white"

// Secondary text
className="text-gray-600 dark:text-gray-400"

// Tertiary/helper
className="text-gray-500 dark:text-gray-500"

// Disabled
className="text-gray-400 dark:text-gray-600"

// Brand (links, accents)
className="text-orange-600 dark:text-orange-500"

// Error
className="text-red-600 dark:text-red-500"

// Success
className="text-green-600 dark:text-green-500"
```

**Rules:**
- Always include dark mode variant
- Use semantic colors (gray for text, orange for brand)

---

## Component Patterns

### Page Header

```tsx
<div className="text-center mb-6 sm:mb-8">
  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
    Page Title
  </h1>
  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
    Page description
  </p>
</div>
```

### Card Header

```tsx
<CardHeader className="px-6 pt-6 pb-4">
  <CardTitle className="text-base sm:text-lg font-semibold">
    Card Title
  </CardTitle>
  <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
    Card description
  </CardDescription>
</CardHeader>
```

### Form Label

```tsx
<Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
  Field Label
</Label>
```

### Input Placeholder

```tsx
<Input 
  placeholder="Placeholder text..."
  className="text-sm sm:text-base"
/>
```

### Empty State

```tsx
<div className="text-center py-12">
  <p className="text-4xl mb-4">🔍</p>
  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
    No results found
  </p>
</div>
```

---

## Responsive Breakpoints

```tsx
// Mobile: < 640px (default)
text-sm

// Tablet: ≥ 640px
sm:text-base

// Desktop: ≥ 768px (optional)
md:text-lg

// Large: ≥ 1024px (rare)
lg:text-xl
```

**Standard pattern:**
```tsx
className="text-sm sm:text-base"  // Most common
className="text-xs sm:text-sm"    // Secondary text
className="text-2xl sm:text-3xl"  // Page titles
```

---

## Common Mistakes

### ❌ Don't Do This

```tsx
// No responsive sizing
<h1 className="text-3xl">

// Inconsistent sizing
<p className="text-base md:text-lg">

// Missing dark mode
<p className="text-gray-900">

// Wrong font weight
<h1 className="font-extrabold">

// Fixed line height
<p className="leading-6">
```

### ✅ Do This

```tsx
// Responsive sizing
<h1 className="text-2xl sm:text-3xl">

// Consistent pattern
<p className="text-sm sm:text-base">

// Dark mode included
<p className="text-gray-900 dark:text-white">

// Appropriate weight
<h1 className="font-bold">

// Semantic line height
<p className="leading-normal">
```

---

## Testing Checklist

Before committing:

- [ ] All headings use responsive sizing
- [ ] Body text is `text-sm sm:text-base`
- [ ] Dark mode colors included
- [ ] Font weights appropriate (400-700)
- [ ] Line heights semantic (tight/normal/relaxed)
- [ ] Spacing follows hierarchy (2/3/4/6/8)
- [ ] Test at 375px width (mobile)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1440px width (desktop)

---

## Quick Reference

### Standard Page Template

```tsx
export default function Page() {
  return (
    <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <TopBar />
        
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Page Title
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Description
          </p>
        </div>
        
        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-base sm:text-lg font-semibold">
                Section
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="text-sm sm:text-base text-gray-900 dark:text-white">
                Content
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
```

---

## Size Reference Table

| Element | Mobile | Desktop | Weight | Line Height |
|---------|--------|---------|--------|-------------|
| H1 (Page) | 24px | 30px | 700 | tight |
| H2 (Section) | 20px | 24px | 600 | tight |
| H3 (Subsection) | 18px | 20px | 500 | tight |
| H4 (Card) | 16px | 18px | 600 | tight |
| Body | 14px | 16px | 400 | normal |
| Secondary | 12px | 14px | 400 | normal |
| Helper | 12px | 12px | 400 | normal |
| Button | 14px | 16px | 500 | normal |

---

**See also:**
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Component patterns
- [../docs/product/DESIGN_GUIDE.md](../docs/product/DESIGN_GUIDE.md) - Visual design
