# Design System Implementation Guide

**Quick reference for developers implementing new pages or components**

---

## TL;DR - Copy-Paste Templates

### New Page Template

```tsx
"use client";

import { TopBar } from "@/components/top-bar";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar - Always include */}
      <TopBar />
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-6 pb-20 md:pb-6">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Page Title
            </h1>
            <p className="text-muted-foreground">
              Page description
            </p>
          </div>
          
          {/* Content Sections */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Section Title</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Card content */}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      {/* Bottom Navigation - Mobile only */}
      <BottomNavigation className="md:hidden" />
    </div>
  );
}
```

### Form Template

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Check } from "@/components/icons";

export function FormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Your API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {success && (
        <Alert variant="success">
          <Check className="h-4 w-4" />
          <AlertTitle>Berhasil!</AlertTitle>
          <AlertDescription>
            Data Anda telah tersimpan.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input 
            id="name"
            type="text"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Pesan</Label>
          <Textarea 
            id="message"
            placeholder="Tulis pesan Anda"
            rows={4}
            required
          />
          <p className="text-sm text-muted-foreground">
            Minimal 10 karakter
          </p>
        </div>
      </div>
      
      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Mengirim..." : "Kirim"}
      </Button>
    </form>
  );
}
```

### Loading State Template

```tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function LoadingState() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Common Patterns

### 1. Page Header

```tsx
<div className="space-y-2">
  <h1 className="text-2xl font-bold text-foreground">
    Page Title
  </h1>
  <p className="text-muted-foreground">
    Brief description of what this page does
  </p>
</div>
```

### 2. Section with Cards

```tsx
<section className="space-y-4">
  <h2 className="text-xl font-semibold">Section Title</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card>
      <CardHeader>
        <CardTitle>Card 1</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        Content
      </CardContent>
    </Card>
    
    {/* More cards */}
  </div>
</section>
```

### 3. Action Card

```tsx
<Card className="p-6 space-y-4">
  <div className="space-y-2">
    <h3 className="text-lg font-medium">Action Title</h3>
    <p className="text-sm text-muted-foreground">
      Description of what this action does
    </p>
  </div>
  
  <Button className="w-full">
    Take Action
  </Button>
</Card>
```

### 4. List with Status

```tsx
<div className="space-y-2">
  {items.map((item) => (
    <Card key={item.id} className="p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-medium">{item.title}</h4>
          <p className="text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>
        
        <Badge variant={item.status === "done" ? "success" : "default"}>
          {item.status}
        </Badge>
      </div>
    </Card>
  ))}
</div>
```

### 5. Empty State

```tsx
<Card className="p-12 text-center">
  <div className="space-y-4">
    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
      <Icon className="h-6 w-6 text-muted-foreground" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-lg font-medium">No items yet</h3>
      <p className="text-sm text-muted-foreground">
        Get started by creating your first item
      </p>
    </div>
    
    <Button>Create Item</Button>
  </div>
</Card>
```

---

## Color Usage Quick Reference

### When to use each color:

**Primary (Orange)**
- Main action buttons
- Active navigation items
- Important badges
- Links (optional)

**Secondary (Gray)**
- Alternative actions
- Less important buttons
- Inactive states

**Success (Green)**
- Success messages
- Completed status
- Positive feedback

**Warning (Yellow)**
- Warning messages
- Pending status
- Caution indicators

**Destructive (Red)**
- Error messages
- Delete actions
- Failed status

**Muted (Gray)**
- Supporting text
- Disabled states
- Placeholders

---

## Spacing Quick Reference

### Common spacing values:

```tsx
// Tight spacing (related items)
className="space-y-2"  // 8px

// Normal spacing (form fields, list items)
className="space-y-4"  // 16px

// Section spacing
className="space-y-6"  // 24px

// Major section spacing
className="space-y-8"  // 32px

// Card padding
className="p-4"        // 16px (mobile)
className="p-6"        // 24px (desktop)

// Page padding
className="px-4 py-6"  // 16px horizontal, 24px vertical
```

---

## Responsive Patterns

### Show/Hide by Breakpoint

```tsx
// Mobile only
<div className="block md:hidden">Mobile content</div>

// Desktop only
<div className="hidden md:block">Desktop content</div>

// Tablet and up
<div className="hidden sm:block">Tablet+ content</div>
```

### Responsive Grid

```tsx
// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

### Responsive Text

```tsx
// Smaller on mobile, larger on desktop
<h1 className="text-xl md:text-2xl lg:text-3xl">
  Title
</h1>
```

### Responsive Spacing

```tsx
// Less padding on mobile, more on desktop
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>
```

---

## Accessibility Checklist

### Every interactive element must have:

- [ ] Visible focus state (automatic with Tailwind)
- [ ] Proper ARIA labels (if icon-only)
- [ ] Keyboard navigation support
- [ ] Minimum 44x44px touch target
- [ ] 4.5:1 contrast ratio for text
- [ ] 3:1 contrast ratio for UI elements

### Forms must have:

- [ ] `<label>` for every input
- [ ] Proper `htmlFor` and `id` connection
- [ ] Error messages associated with inputs
- [ ] Clear validation feedback
- [ ] Disabled state during submission

### Images must have:

- [ ] `alt` text (descriptive or empty if decorative)
- [ ] Proper aspect ratio
- [ ] Loading state

---

## Common Mistakes to Avoid

### ❌ Don't Do This

```tsx
// No semantic HTML
<div onClick={handleClick}>Click me</div>

// Inconsistent spacing
<div className="mt-3 mb-5 ml-2">

// Hardcoded colors
<div className="bg-orange-500">

// No loading state
<Button onClick={handleSubmit}>Submit</Button>

// No error handling
const data = await fetch('/api/data');
```

### ✅ Do This Instead

```tsx
// Use semantic HTML
<button onClick={handleClick}>Click me</button>

// Use spacing scale
<div className="space-y-4">

// Use design tokens
<div className="bg-primary">

// Show loading state
<Button onClick={handleSubmit} disabled={isLoading}>
  {isLoading ? "Submitting..." : "Submit"}
</Button>

// Handle errors
try {
  const data = await fetch('/api/data');
} catch (error) {
  setError("Failed to load data");
}
```

---

## Testing Your Implementation

### Visual Check

1. Open page in browser
2. Check light mode and dark mode
3. Resize window (mobile → tablet → desktop)
4. Check all interactive states (hover, focus, active, disabled)
5. Verify spacing is consistent
6. Verify colors match design system

### Functional Check

1. Test keyboard navigation (Tab, Enter, Escape)
2. Test form submission (success and error cases)
3. Test loading states
4. Test error states
5. Test empty states
6. Test with screen reader (if possible)

### Code Review Check

1. Uses design tokens (no hardcoded colors)
2. Uses spacing scale (no arbitrary values)
3. Has proper semantic HTML
4. Has loading states for async operations
5. Has error handling
6. Has proper TypeScript types
7. Follows naming conventions
8. Has comments for complex logic

---

## Getting Help

### Questions?

1. Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for detailed specs
2. Check [VOICE_AND_TONE.md](./VOICE_AND_TONE.md) for copy guidelines
3. Look at existing components for examples
4. Ask in team chat

### Found an inconsistency?

1. Document it
2. Propose a fix
3. Update this guide
4. Update affected components

---

**Last Updated:** 2025-11-16  
**Version:** 1.0
