# Design System Specification

**Document Type:** Design & Development Standard  
**Purpose:** Ensure consistent brand, style, and user experience across all pages  
**Audience:** Developers, designers, product managers  
**Last Updated:** 2025-11-16

---

## Table of Contents

1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Components](#components)
7. [Navigation](#navigation)
8. [Animations & Interactions](#animations--interactions)
9. [Responsive Behavior](#responsive-behavior)
10. [Implementation Checklist](#implementation-checklist)

---

## Overview

Bijak Mengeluh's design system reflects our core philosophy: **empowerment through simplicity**. Every design decision should reduce friction, build confidence, and make users feel in control.

### Design Goals
- **Instant clarity**: Users understand what to do within 3 seconds
- **Zero intimidation**: No bureaucratic or technical language
- **Mobile-first**: Optimized for one-handed phone use
- **Accessible**: WCAG 2.1 AA compliant minimum
- **Fast**: Perceived performance < 1 second

---

## Visual Branding Reference

**These are the approved visual patterns from the current homepage and history page. Use these as reference for consistency.**

### Homepage Layout Pattern

```tsx
// Clean, focused layout with minimal chrome
<main className="container mx-auto p-4 sm:p-6 md:p-8 pb-16">
  <div className="w-full max-w-3xl mx-auto">
    {/* Top bar with PWA install and theme toggle */}
    <TopBar />
    
    {/* Main content area */}
    <div className="space-y-6">
      {/* Content sections */}
    </div>
  </div>
</main>
```

**Key characteristics:**
- Max width: 768px (3xl) for optimal reading
- Centered content on desktop
- Consistent padding: 16px mobile, 24px tablet, 32px desktop
- Bottom padding: 64px (pb-16) for mobile nav clearance
- Clean, uncluttered layout

### History Page Layout Pattern

```tsx
// List-based layout with statistics and search
<main className="container mx-auto p-4 sm:p-6 md:p-8 pb-16">
  <div className="w-full max-w-3xl mx-auto">
    <TopBar />
    
    {/* Page title */}
    <h1 className="text-3xl font-bold mb-6">Riwayat Komplain</h1>
    
    {/* Analytics dashboard */}
    <AnalyticsDashboard />
    
    {/* Statistics card */}
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Statistik</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {/* Stats */}
      </CardContent>
    </Card>
    
    {/* Search and filter */}
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search input */}
    </div>
    
    {/* List items */}
  </div>
</main>
```

**Key characteristics:**
- Same max-width and centering as homepage
- Clear visual hierarchy (title → stats → search → list)
- Grid layout for statistics (2 columns)
- Responsive search bar (stacked on mobile, horizontal on desktop)

### Top Bar Pattern

```tsx
// Minimal top bar with essential actions only
<div className="flex justify-between items-center mb-6">
  <PwaInstallPrompt />
  <ThemeToggle />
</div>
```

**Key characteristics:**
- Flexbox with space-between
- Only essential actions (PWA install, theme toggle)
- 24px bottom margin (mb-6)
- No logo or branding (keeps focus on content)

### Bottom Navigation Pattern (Mobile)

```tsx
// Fixed bottom navigation with 3 items
<div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:hidden z-50">
  <div className="flex justify-around h-16 items-center">
    <Link href="/" className={`flex flex-col items-center justify-center gap-1 text-xs ${
      pathname === "/" ? "text-primary" : "text-muted-foreground"
    }`}>
      <Home className="h-5 w-5" />
      <span>Beranda</span>
    </Link>
    {/* More nav items */}
  </div>
</div>
```

**Key characteristics:**
- Fixed positioning at bottom
- Height: 64px (h-16)
- 3 navigation items (Home, Directory, History)
- Icon + label layout (vertical flex)
- Active state: Primary color (text-primary) - ORANGE ONLY
- Hidden on desktop (sm:hidden)
- High z-index (z-50) to stay on top

### Desktop Navigation Pattern

```tsx
// Sticky header with horizontal navigation
<header className="hidden sm:block sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
  <div className="container mx-auto px-4 h-14 flex items-center justify-between">
    <Link href="/" className="font-bold text-lg hover:text-primary transition-colors">
      Bijak Mengeluh
    </Link>
    <nav className="flex gap-2">
      <Link href="/" className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        pathname === "/" 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}>
        <Home className="h-4 w-4" />
        <span className="text-sm font-medium">Buat Keluhan</span>
      </Link>
      {/* More nav items */}
    </nav>
  </div>
</header>
```

**Key characteristics:**
- Sticky positioning at top
- Height: 56px (h-14)
- Backdrop blur effect (backdrop-blur-sm)
- Semi-transparent background (bg-white/80)
- Logo on left, navigation on right
- Active state: Primary color background
- Hover state: Light gray background
- Hidden on mobile (hidden sm:block)

### Card Pattern (Statistics)

```tsx
// Statistics card with grid layout
<Card className="mb-6">
  <CardHeader>
    <CardTitle className="text-lg">Statistik</CardTitle>
  </CardHeader>
  <CardContent className="grid grid-cols-2 gap-4">
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Total Komplain</p>
      <p className="text-2xl font-bold">{totalComplaints}</p>
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Rata-rata Panjang</p>
      <p className="text-2xl font-bold">{avgLength} karakter</p>
    </div>
  </CardContent>
</Card>
```

**Key characteristics:**
- 2-column grid for statistics
- Small label text (text-sm) in muted color
- Large value text (text-2xl) in bold
- 16px gap between columns (gap-4)
- 24px bottom margin (mb-6)

### Typography Hierarchy (From History Page)

```tsx
// Page title
<h1 className="text-3xl font-bold mb-6">Riwayat Komplain</h1>

// Card title
<CardTitle className="text-lg">Statistik</CardTitle>

// Stat label
<p className="text-sm text-gray-500 dark:text-gray-400">Total Komplain</p>

// Stat value
<p className="text-2xl font-bold">{totalComplaints}</p>
```

**Key characteristics:**
- Clear size progression: 3xl → lg → sm
- Bold for titles and values
- Muted color for labels
- Consistent bottom margins

### Color Usage (From Implementation)

```tsx
// Active navigation (mobile & desktop)
className="text-primary"  // Orange only

// Active navigation background (desktop)
className="bg-primary text-primary-foreground"

// Inactive navigation
className="text-muted-foreground"

// Hover state (desktop)
className="hover:bg-muted"

// Muted text
className="text-muted-foreground"
```

**Key characteristics:**
- **Primary (orange) for ALL active states** - no blue
- Gray for inactive/muted states
- Consistent dark mode support via design tokens
- Never use hardcoded colors (no text-blue-600, no text-orange-500)

**STRICT RULE: Only use `text-primary` or `bg-primary` for brand color. No blue, no other colors for active states.**

---

## Design Principles

### 1. Empowerment Over Decoration
- Every visual element serves a functional purpose
- No decorative elements that don't guide action
- Bold, confident colors that inspire action

### 2. Clarity Over Cleverness
- Direct language, no jargon
- Obvious interactive elements
- Clear visual hierarchy

### 3. Speed Over Perfection
- Instant feedback on all interactions
- Progressive disclosure (show what's needed, when needed)
- Optimistic UI updates

### 4. Consistency Over Novelty
- Same patterns across all pages
- Predictable navigation
- Familiar interaction patterns

---

## Color System

### Brand Colors

```css
/* Primary - Orange (Action, Empowerment) */
--primary: oklch(0.55 0.22 25);           /* #D97706 equivalent */
--primary-foreground: oklch(0.985 0 0);   /* White text on primary */

/* Used for: Primary CTAs, active states, emphasis */
```

**Usage Rules:**
- Primary color for all main action buttons
- Primary color for ALL active states (navigation, tabs, etc.)
- Use sparingly - only for primary actions and active states
- Never use for decorative elements
- Ensure 4.5:1 contrast ratio with background

**STRICT ENFORCEMENT:**
- ❌ NO blue colors anywhere (no text-blue-*, no bg-blue-*)
- ❌ NO other brand colors (no green, red, purple for branding)
- ✅ ONLY orange primary for brand/active states
- ✅ Use semantic colors (success/warning/error) only for status, not branding

### Semantic Colors

```css
/* Success - Green */
--success: oklch(0.6 0.15 145);
--success-foreground: oklch(0.985 0 0);

/* Warning - Yellow */
--warning: oklch(0.75 0.15 85);
--warning-foreground: oklch(0.2 0 0);

/* Destructive - Red */
--destructive: oklch(0.577 0.245 27.325);
--destructive-foreground: oklch(0.985 0 0);

/* Info - Blue (STATUS ONLY, NOT BRANDING) */
--info: oklch(0.6 0.15 240);
--info-foreground: oklch(0.985 0 0);
```

**IMPORTANT: Semantic colors are for status/feedback ONLY, never for branding or active states.**

**Allowed usage:**
- ✅ Success badges/alerts (green)
- ✅ Warning messages (yellow)
- ✅ Error states (red)
- ✅ Info messages (blue) - ONLY for informational alerts, never for navigation/buttons

**Forbidden usage:**
- ❌ Blue for active navigation
- ❌ Blue for primary buttons
- ❌ Green/red for branding
- ❌ Any semantic color for active states

### Neutral Colors

```css
/* Light Mode */
--background: oklch(1 0 0);                    /* Pure white */
--foreground: oklch(0.141 0.005 285.823);      /* Near black */
--muted: oklch(0.967 0.001 286.375);           /* Light gray */
--muted-foreground: oklch(0.552 0.016 285.938); /* Medium gray */
--border: oklch(0.92 0.004 286.32);            /* Border gray */

/* Dark Mode */
--background: oklch(0.141 0.005 285.823);      /* Near black */
--foreground: oklch(0.985 0 0);                /* Pure white */
--muted: oklch(0.274 0.006 286.033);           /* Dark gray */
--muted-foreground: oklch(0.705 0.015 286.067); /* Light gray */
--border: oklch(1 0 0 / 10%);                  /* Subtle border */
```

### Color Usage Matrix

| Element | Color Token | Purpose | Notes |
|---------|------------|---------|-------|
| Primary CTA | `bg-primary` | Main actions | Orange only |
| Active navigation | `text-primary` | Active nav items | Orange only, no blue |
| Secondary CTA | `bg-secondary` | Alternative actions | Gray |
| Text (body) | `text-foreground` | Main content | Black/white |
| Text (muted) | `text-muted-foreground` | Supporting text | Gray |
| Background | `bg-background` | Page background | White/black |
| Card | `bg-card` | Content containers | White/dark gray |
| Border | `border-border` | Dividers, outlines | Light gray |
| Success badge | `bg-success` | Success status | Green - status only |
| Warning badge | `bg-warning` | Warning status | Yellow - status only |
| Error badge | `bg-destructive` | Error status | Red - status only |
| Info alert | `bg-info` | Info messages | Blue - alerts only, never navigation |

**CRITICAL RULES:**
1. **Brand color = Orange primary ONLY**
2. **Active states = Orange primary ONLY** (no blue)
3. **Semantic colors = Status/feedback ONLY** (not for branding)
4. **Never use hardcoded colors** (no text-blue-600, no bg-orange-500)

---

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

**Rationale:** System fonts for instant loading and native feel.

### Type Scale

```css
/* Headings */
--text-h1: 2rem;      /* 32px - Page titles */
--text-h2: 1.5rem;    /* 24px - Section titles */
--text-h3: 1.25rem;   /* 20px - Card titles */
--text-h4: 1.125rem;  /* 18px - Subsections */

/* Body */
--text-base: 1rem;    /* 16px - Default body text */
--text-sm: 0.875rem;  /* 14px - Supporting text */
--text-xs: 0.75rem;   /* 12px - Captions, labels */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Typography Rules

1. **Headings**
   - Use semantic HTML (`h1`, `h2`, `h3`)
   - One `h1` per page
   - Never skip heading levels
   - Font weight: 600 (semibold) or 700 (bold)

2. **Body Text**
   - Base size: 16px (never smaller for body content)
   - Line height: 1.5 for readability
   - Max width: 65ch for optimal reading

3. **Interactive Text**
   - Links: Underlined or clearly distinguished
   - Buttons: Font weight 500-600
   - Labels: Font weight 500, uppercase optional

### Typography Examples

```tsx
// Page Title
<h1 className="text-2xl font-bold text-foreground">
  Bijak Mengeluh
</h1>

// Section Title
<h2 className="text-xl font-semibold text-foreground">
  Keluhan Anda
</h2>

// Card Title
<h3 className="text-lg font-medium text-foreground">
  Hasil Analisis
</h3>

// Body Text
<p className="text-base text-foreground leading-normal">
  Keluhan Anda akan dianalisis...
</p>

// Supporting Text
<p className="text-sm text-muted-foreground">
  Biasanya memakan waktu 2-3 detik
</p>

// Caption
<span className="text-xs text-muted-foreground">
  Terakhir diperbarui: 5 menit lalu
</span>
```

---

## Spacing & Layout

### Spacing Scale

```css
/* Base unit: 4px (0.25rem) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Layout Grid

```css
/* Container widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;

/* Padding */
--page-padding-mobile: 1rem;    /* 16px */
--page-padding-tablet: 1.5rem;  /* 24px */
--page-padding-desktop: 2rem;   /* 32px */
```

### Spacing Rules

1. **Vertical Rhythm**
   - Section spacing: `space-8` (32px) minimum
   - Card spacing: `space-6` (24px)
   - Element spacing: `space-4` (16px)
   - Tight spacing: `space-2` (8px)

2. **Horizontal Spacing**
   - Page margins: `space-4` on mobile, `space-6` on desktop
   - Card padding: `space-6` (24px)
   - Button padding: `space-4` horizontal, `space-2` vertical

3. **Component Spacing**
   - Form fields: `space-4` between fields
   - Buttons: `space-3` between buttons
   - List items: `space-2` between items

### Layout Examples

```tsx
// Page Container
<div className="container mx-auto px-4 md:px-6 py-8">
  {/* Content */}
</div>

// Section Spacing
<section className="space-y-8">
  {/* Sections */}
</section>

// Card Layout
<Card className="p-6 space-y-4">
  <CardHeader className="space-y-2">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Content */}
  </CardContent>
</Card>

// Form Layout
<form className="space-y-4">
  <div className="space-y-2">
    <Label>Field Label</Label>
    <Input />
  </div>
</form>
```

---

## Components

### Button Variants

```tsx
// Primary - Main actions
<Button variant="default" size="default">
  Kirim Keluhan
</Button>

// Secondary - Alternative actions
<Button variant="secondary" size="default">
  Simpan Draft
</Button>

// Outline - Tertiary actions
<Button variant="outline" size="default">
  Batal
</Button>

// Ghost - Subtle actions
<Button variant="ghost" size="default">
  Lewati
</Button>

// Destructive - Dangerous actions
<Button variant="destructive" size="default">
  Hapus
</Button>
```

**Button Rules:**
- One primary button per screen section
- Primary button always visible (no scrolling required)
- Minimum touch target: 44x44px
- Loading state: Show spinner, disable button
- Disabled state: Reduce opacity to 0.5

### Card Variants

```tsx
// Default Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// Interactive Card (clickable)
<Card className="cursor-pointer hover:shadow-lg transition-shadow">
  {/* Content */}
</Card>

// Status Card (with badge)
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Title</CardTitle>
      <Badge variant="success">Selesai</Badge>
    </div>
  </CardHeader>
</Card>
```

### Input Fields

```tsx
// Text Input
<div className="space-y-2">
  <Label htmlFor="input">Label</Label>
  <Input 
    id="input"
    type="text"
    placeholder="Placeholder text"
  />
</div>

// Textarea
<div className="space-y-2">
  <Label htmlFor="textarea">Label</Label>
  <Textarea 
    id="textarea"
    placeholder="Placeholder text"
    rows={4}
  />
</div>

// Input with Error
<div className="space-y-2">
  <Label htmlFor="input" className="text-destructive">
    Label
  </Label>
  <Input 
    id="input"
    className="border-destructive"
  />
  <p className="text-sm text-destructive">
    Error message
  </p>
</div>
```

### Badges

```tsx
// Status Badges
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### Alerts

```tsx
// Info Alert
<Alert>
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

// Success Alert
<Alert variant="success">
  <Check className="h-4 w-4" />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your complaint has been submitted.
  </AlertDescription>
</Alert>

// Error Alert
<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>
```

---

## Navigation

### Top Bar (All Pages)

```tsx
<TopBar>
  {/* Left: Logo/Title */}
  <div className="flex items-center gap-2">
    <Logo />
    <span className="font-semibold">Bijak Mengeluh</span>
  </div>
  
  {/* Right: Actions */}
  <div className="flex items-center gap-2">
    <ThemeToggle />
    <SettingsButton />
  </div>
</TopBar>
```

**Top Bar Rules:**
- Fixed height: 56px (3.5rem)
- Always visible (sticky)
- Background: `--background` with border
- Z-index: 50

### Bottom Navigation (Mobile)

```tsx
<BottomNavigation>
  <NavItem href="/" icon={Home} label="Beranda" />
  <NavItem href="/history" icon={History} label="Riwayat" />
  <NavItem href="/directory" icon={Map} label="Direktori" />
</BottomNavigation>
```

**Bottom Navigation Rules:**
- Show on mobile only (< 768px)
- Fixed height: 64px (4rem)
- Always visible (sticky)
- Active state: Primary color
- Safe area inset: Account for iOS notch

### Page Layout Structure

```tsx
<div className="min-h-screen flex flex-col">
  {/* Top Bar */}
  <TopBar />
  
  {/* Main Content */}
  <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
    {/* Page content */}
  </main>
  
  {/* Bottom Navigation (Mobile) */}
  <BottomNavigation className="md:hidden" />
</div>
```

---

## Animations & Interactions

### Micro-interactions

```css
/* Button Press */
button {
  @apply transition-transform active:scale-95;
}

/* Card Hover */
.card-hover {
  @apply transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5;
}

/* Link Hover */
a {
  @apply transition-colors hover:text-primary;
}

/* Input Focus */
input, textarea {
  @apply transition-all focus:ring-2 focus:ring-primary;
}
```

### Loading States

```tsx
// Skeleton Loading
<Skeleton className="h-4 w-full" />
<Skeleton className="h-20 w-full" />

// Spinner Loading
<Spinner className="h-6 w-6 animate-spin" />

// Button Loading
<Button disabled>
  <Spinner className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### Transitions

```css
/* Default transition */
transition: all 150ms ease-in-out;

/* Fast transition (hover, active) */
transition: all 100ms ease-in-out;

/* Slow transition (layout changes) */
transition: all 300ms ease-in-out;
```

### Animation Rules

1. **Performance**
   - Use `transform` and `opacity` only
   - Avoid animating `width`, `height`, `top`, `left`
   - Use `will-change` sparingly

2. **Duration**
   - Micro-interactions: 100-150ms
   - Standard transitions: 200-300ms
   - Page transitions: 300-500ms

3. **Easing**
   - Default: `ease-in-out`
   - Entrances: `ease-out`
   - Exits: `ease-in`

---

## Responsive Behavior

### Breakpoints

```css
/* Mobile First */
/* Default: 0-639px */

/* sm: 640px */
@media (min-width: 640px) { }

/* md: 768px */
@media (min-width: 768px) { }

/* lg: 1024px */
@media (min-width: 1024px) { }

/* xl: 1280px */
@media (min-width: 1280px) { }
```

### Responsive Patterns

```tsx
// Responsive Text
<h1 className="text-xl md:text-2xl lg:text-3xl">
  Title
</h1>

// Responsive Spacing
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>

// Responsive Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>

// Responsive Visibility
<div className="block md:hidden">Mobile only</div>
<div className="hidden md:block">Desktop only</div>
```

### Mobile-First Rules

1. **Touch Targets**
   - Minimum: 44x44px
   - Spacing between: 8px minimum

2. **Font Sizes**
   - Body text: 16px minimum (prevents zoom on iOS)
   - Headings: Scale up on larger screens

3. **Layout**
   - Single column on mobile
   - Multi-column on tablet+
   - Max width on desktop (prevent line length issues)

4. **Navigation**
   - Bottom nav on mobile
   - Top nav or sidebar on desktop

---

## Implementation Checklist

### For Every New Page

- [ ] Uses consistent top bar with logo and theme toggle
- [ ] Has bottom navigation on mobile (< 768px)
- [ ] Uses container with proper padding (`px-4 md:px-6`)
- [ ] Has proper vertical spacing (`space-y-6` or `space-y-8`)
- [ ] Implements dark mode correctly
- [ ] Has loading states for async operations
- [ ] Has error states with clear messages
- [ ] Uses semantic HTML (`main`, `section`, `article`)
- [ ] Has proper heading hierarchy (`h1` → `h2` → `h3`)
- [ ] Meets WCAG 2.1 AA contrast requirements

### For Every Component

- [ ] Uses design tokens (CSS variables)
- [ ] Has hover states for interactive elements
- [ ] Has focus states for keyboard navigation
- [ ] Has disabled states where applicable
- [ ] Has loading states for async actions
- [ ] Uses consistent spacing from spacing scale
- [ ] Uses consistent colors from color system
- [ ] Has proper touch targets (44x44px minimum)
- [ ] Works on mobile, tablet, and desktop
- [ ] Supports dark mode

### For Every Form

- [ ] Has clear labels for all inputs
- [ ] Has placeholder text where helpful
- [ ] Shows validation errors inline
- [ ] Disables submit button during submission
- [ ] Shows loading state during submission
- [ ] Shows success/error feedback after submission
- [ ] Supports keyboard navigation (Tab, Enter)
- [ ] Has proper `autocomplete` attributes
- [ ] Prevents double submission
- [ ] Clears or resets after successful submission

### For Every Button

- [ ] Has clear, action-oriented label
- [ ] Uses correct variant (primary, secondary, etc.)
- [ ] Has proper size (default, sm, lg)
- [ ] Has hover state
- [ ] Has active state (scale down)
- [ ] Has disabled state (when applicable)
- [ ] Has loading state (when async)
- [ ] Has minimum 44x44px touch target
- [ ] Has proper spacing from other elements
- [ ] Has proper contrast ratio (4.5:1 minimum)

---

## Quick Reference

### Common Patterns

```tsx
// Page Template
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="space-y-8">
          {/* Page content */}
        </div>
      </main>
      <BottomNavigation className="md:hidden" />
    </div>
  );
}

// Card with Action
<Card className="p-6 space-y-4">
  <CardHeader className="space-y-2">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button className="w-full">Action</Button>
  </CardFooter>
</Card>

// Form Field
<div className="space-y-2">
  <Label htmlFor="field">Label</Label>
  <Input id="field" placeholder="Placeholder" />
  <p className="text-sm text-muted-foreground">
    Helper text
  </p>
</div>

// Loading State
{isLoading ? (
  <div className="space-y-4">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-20 w-full" />
  </div>
) : (
  <div>{/* Content */}</div>
)}

// Error State
{error && (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

---

## Maintenance

### When to Update This Document

- Adding new components
- Changing color palette
- Updating spacing scale
- Adding new patterns
- Fixing inconsistencies

### Review Schedule

- Monthly: Check for drift between spec and implementation
- Quarterly: Review with team for improvements
- Annually: Major revision based on user feedback

---

**Last Updated:** 2025-11-16  
**Version:** 1.0  
**Maintained by:** Product Team
