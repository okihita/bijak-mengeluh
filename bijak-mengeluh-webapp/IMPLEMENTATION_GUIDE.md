# Frontend Implementation Guide

**Purpose:** UI/UX implementation rules for agentic AI development  
**Audience:** AI agents, developers  
**Last Updated:** 2025-11-16

---

## Core Principles

### 1. Component Reusability
**Always check existing components before creating new ones.**

```tsx
// ✅ Reuse existing
import { Button } from "@/components/ui/button";

// ❌ Don't create new button variants
const MyCustomButton = () => { ... }
```

### 2. Consistent Layout Patterns
**Use standardized container classes across all pages.**

```tsx
// Standard page container
<main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
  <div className="w-full max-w-3xl mx-auto">
    <TopBar />
    {/* Page content */}
  </div>
</main>
```

**Key patterns:**
- Container: `container mx-auto`
- Horizontal padding: `px-4 sm:px-6 md:px-8`
- Vertical padding: `py-6`
- Bottom padding (for nav): `pb-20`
- Max width: `max-w-3xl mx-auto`

### 3. Spacing System
**Use 4px/8px/12px/16px/24px rhythm.**

```tsx
// ✅ Consistent spacing
<div className="space-y-6">      // 24px vertical
  <Card className="p-6">         // 24px padding
    <div className="space-y-4">  // 16px between items
```

---

## Component Guidelines

### Buttons

**Standard button (primary action):**
```tsx
<Button 
  className="w-full h-12 text-base"
  disabled={loading}
>
  Kirim Keluhan
</Button>
```

**Secondary button:**
```tsx
<Button 
  variant="outline"
  className="w-full h-12"
>
  Batal
</Button>
```

**Icon button:**
```tsx
<Button 
  variant="ghost" 
  size="icon"
  className="h-10 w-10"
>
  <X className="h-4 w-4" />
</Button>
```

### Cards

**Standard card:**
```tsx
<Card>
  <CardHeader className="px-6 pt-6 pb-4">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="px-6 pb-6">
    {/* Content */}
  </CardContent>
</Card>
```

**Padding rules:**
- Horizontal: `px-6` (24px)
- Top: `pt-6` (24px)
- Bottom: `pb-4` or `pb-6` (16px or 24px)

### Forms

**Textarea:**
```tsx
<Textarea
  placeholder="Ketik keluhan kamu..."
  className="min-h-[120px] resize-none"
  value={complaint}
  onChange={(e) => setComplaint(e.target.value)}
/>
```

**Input:**
```tsx
<Input
  type="text"
  placeholder="Cari..."
  className="h-12"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

### Loading States

**Spinner:**
```tsx
import { Spinner } from "@/components/icons";

<Spinner className="h-5 w-5 text-gray-400" />
```

**Skeleton:**
```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-12 w-full" />
```

---

## Layout Components

### TopBar
**Always use at top of page:**
```tsx
import { TopBar } from "@/components/top-bar";

<TopBar />
```

Contains: PWA install prompt + theme toggle

### BottomNavigation
**Always use at bottom of page:**
```tsx
import { BottomNavigation } from "@/components/bottom-navigation";

<BottomNavigation />
```

Contains: Home, History, Directory links

---

## Responsive Design

### Breakpoints
```tsx
// Mobile-first approach
className="text-sm sm:text-base md:text-lg"

// Tailwind breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
```

### Touch Targets
**Minimum 44px for mobile:**
```tsx
// ✅ Good
<Button className="h-12 w-12">  // 48px

// ❌ Too small
<Button className="h-8 w-8">   // 32px
```

### Container Width
```tsx
// Standard pattern
<div className="w-full max-w-3xl mx-auto">
  {/* Content */}
</div>
```

---

## Color System

### Brand Colors
```tsx
// Primary (Orange)
className="bg-orange-500 text-white"
className="text-orange-600"

// Info (Blue) - alerts only
className="bg-blue-50 border-blue-200"

// Success (Green)
className="bg-green-50 border-green-200"

// Error (Red)
className="bg-red-50 border-red-200"

// Neutral (Gray)
className="bg-gray-100 text-gray-900"
```

### Dark Mode
```tsx
// Always include dark mode variants
className="bg-white dark:bg-gray-800"
className="text-gray-900 dark:text-white"
className="border-gray-200 dark:border-gray-700"
```

---

## Typography

### Headings
```tsx
<h1 className="text-3xl font-bold">Page Title</h1>
<h2 className="text-2xl font-semibold">Section</h2>
<h3 className="text-xl font-medium">Subsection</h3>
```

### Body Text
```tsx
<p className="text-base text-gray-600 dark:text-gray-400">
  Body text
</p>
```

### Small Text
```tsx
<span className="text-sm text-gray-500">
  Helper text
</span>
```

---

## State Management

### LocalStorage (Persistent)
```tsx
import { usePersistentState } from "@/lib/hooks";

const [history, setHistory] = usePersistentState<string[]>("promptHistory", []);
```

### Regular State
```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

---

## Error Handling

### Display Errors
```tsx
{error && (
  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
    <p className="text-sm text-red-800">{error}</p>
  </div>
)}
```

### Try-Catch Pattern
```tsx
try {
  const response = await fetch('/api/endpoint');
  const data = await response.json();
} catch (error) {
  setError('Terjadi kesalahan. Coba lagi.');
  console.error(error);
}
```

---

## Accessibility

### ARIA Labels
```tsx
<button aria-label="Tutup dialog">
  <X className="h-4 w-4" />
</button>
```

### Keyboard Navigation
```tsx
<button
  onClick={handleSubmit}
  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
>
  Submit
</button>
```

### Focus States
```tsx
className="focus:outline-none focus:ring-2 focus:ring-orange-500"
```

---

## Animation

### Transitions
```tsx
className="transition-all duration-300"
className="transition-colors duration-200"
```

### Loading Animation
```tsx
<div className="animate-spin">
  <Spinner />
</div>
```

---

## Common Patterns

### Conditional Rendering
```tsx
{loading ? (
  <Skeleton className="h-12 w-full" />
) : (
  <div>{content}</div>
)}
```

### List Rendering
```tsx
{items.map((item, index) => (
  <div key={item.id || index}>
    {item.name}
  </div>
))}
```

### Empty States
```tsx
{items.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-gray-500">Belum ada data</p>
  </div>
) : (
  <div>{/* List items */}</div>
)}
```

---

## Performance

### Code Splitting
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/heavy'), {
  loading: () => <Skeleton className="h-48 w-full" />
});
```

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/icon.png"
  alt="Icon"
  width={192}
  height={192}
  priority
/>
```

---

## Testing Checklist

Before committing UI changes:

- [ ] Mobile responsive (test at 375px width)
- [ ] Dark mode works
- [ ] Touch targets ≥44px
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Consistent spacing (4/8/12/16/24px)
- [ ] Reused existing components
- [ ] Follows layout patterns

---

## Common Mistakes

### ❌ Don't Do This
```tsx
// Custom padding values
<div className="p-[13px]">

// Inconsistent container
<div className="mx-auto px-3 py-5">

// Missing dark mode
<div className="bg-white text-black">

// Too small touch target
<button className="h-8 w-8">

// Creating new button variant
const MyButton = styled.button`...`
```

### ✅ Do This
```tsx
// Standard spacing
<div className="p-4">

// Consistent container
<div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">

// Dark mode included
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// Proper touch target
<button className="h-12 w-12">

// Reuse existing
<Button variant="outline">
```

---

## Quick Reference

### Standard Page Template
```tsx
export default function Page() {
  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <TopBar />
          
          <h1 className="text-3xl font-bold mb-6">Page Title</h1>
          
          {/* Page content */}
        </div>
      </main>
      
      <BottomNavigation />
    </>
  );
}
```

### Standard Card Template
```tsx
<Card>
  <CardHeader className="px-6 pt-6 pb-4">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="px-6 pb-6">
    <div className="space-y-4">
      {/* Content */}
    </div>
  </CardContent>
</Card>
```

---

**See also:**
- [DESIGN_GUIDE.md](../docs/product/DESIGN_GUIDE.md) - Visual design system
- [VOICE_AND_TONE.md](../docs/product/VOICE_AND_TONE.md) - Copy guidelines
- [UX_GUIDELINES.md](../docs/product/UX_GUIDELINES.md) - UX principles
