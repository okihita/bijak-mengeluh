# Design Guide

**Complete design reference for Bijak Mengeluh**

---

## Brand Identity

### Colors

**Primary Brand: Orange**
- Value: `#D97706` / `oklch(0.55 0.22 25)`
- Use for: Primary buttons, active states, brand emphasis

**Neutrals**
- Background: White/Black (auto dark mode)
- Text: Black/White (auto dark mode)
- Muted: Gray for secondary text

**Semantic (Status Only)**
- Success: Green
- Warning: Yellow
- Error: Red
- Info: Blue

### Blue Color Policy

**Decision: Blue for info alerts only**

**Allowed:**
- Info alerts/callouts (non-interactive)
- Informational badges (status display)

**Forbidden:**
- Navigation (use orange)
- Buttons (use orange/gray/red)
- Loading spinners (use gray)
- Active states (use orange)
- Any interactive elements

---

## Typography

- **System fonts** (instant load, native feel)
- **Sizes:** 12px → 16px → 20px → 24px → 32px
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700)
- **Minimum:** 16px for body text (mobile accessibility)

---

## Spacing

**Scale:** 8px, 16px, 24px, 32px, 48px, 64px

**Usage:**
- Tight (8px): Related items
- Normal (16px): Form fields, list items
- Loose (24px): Cards, sections
- Major (32px): Page sections
- Extra (48px+): Hero sections

---

## Layout

### Structure (All Pages)
```
┌─────────────────────────┐
│ Top Bar (minimal)       │ ← PWA install + theme toggle
├─────────────────────────┤
│                         │
│   Content (max 768px)   │ ← Centered, generous padding
│                         │
├─────────────────────────┤
│ Bottom Nav (mobile)     │ ← 3 items, thumb-friendly
└─────────────────────────┘
```

### Navigation

**Mobile (< 768px):**
- Bottom navigation (3 items: Home, Directory, History)
- Active state: Orange text
- Fixed position

**Desktop (≥ 768px):**
- Top navigation (horizontal)
- Active state: Orange background
- Sticky position

### Active State Color

**Decision: Orange everywhere**

All active states use orange (primary color):
- Mobile bottom navigation
- Desktop top navigation
- Tabs
- Selected items
- Current page indicators

---

## Components

### Buttons

**Primary (Orange)**
- Main actions only
- One per screen section
- Always visible (no scrolling)

**Secondary (Gray)**
- Alternative actions
- Multiple allowed

**Destructive (Red)**
- Delete, remove, dangerous actions
- Always confirm

### Button Colors

**Decision: Orange/gray/red only**

**Primary (Orange)** - Main actions
**Secondary (Gray)** - Alternative actions  
**Destructive (Red)** - Dangerous actions

No blue buttons. Use gray for informational actions.

---

### Cards

**Standard:**
- White/dark background
- Subtle border
- 24px padding
- Rounded corners

**Interactive:**
- Hover: Lift + shadow
- Click: Scale down slightly

### Forms

**Required:**
- Label for every input
- Inline validation
- Clear error messages
- Loading states
- Disabled submit during processing

---

## Interactions

### Feedback

**Immediate:**
- Button press: Scale down
- Hover: Color change
- Focus: Ring outline

**Loading:**
- Buttons: Show spinner + disable
- Content: Show skeleton
- Actions: Show progress

**Success:**
- Message: Green alert
- Subtle: Checkmark icon
- Optional: Confetti (major actions)

### Loading States

**Decision: Gray spinners**

Loading spinners use gray (neutral):
- Not brand color (orange too aggressive)
- Not info color (blue conflicts with policy)
- Neutral, non-distracting

Use `text-muted-foreground` for spinners.

---

## Accessibility

### Must Have
- 4.5:1 contrast for text
- 3:1 contrast for UI elements
- Keyboard navigation
- Screen reader support
- 44x44px touch targets

### Color Rules
- Never use color alone to convey info
- Always pair with icon/text
- Support color-blind users

---

## Voice & Tone

### Empowerment
- "You can" not "You should"
- "Create" not "Submit"
- Active voice, present tense

### Clarity
- Short sentences
- Everyday Indonesian
- No jargon
- Explain, don't assume

### Color in Copy

**Decision: Forbidden**

Never describe UI elements by color in text:

**❌ Wrong:**
- "Click the blue button"
- "Orange text means active"
- "Red items are errors"

**✅ Right:**
- "Click the Submit button"
- "Selected items are highlighted"
- "Error messages appear below the field"

Use position, label, or icon instead of color.

---

## Implementation Notes

### Current Stack (v2.4)
- React, Next.js, Tailwind CSS
- Shadcn/ui components
- System fonts

### Design Tokens
```css
--primary: oklch(0.55 0.22 25)      /* Orange */
--foreground: oklch(...)             /* Black/White */
--muted-foreground: oklch(...)       /* Gray */
--success: oklch(...)                /* Green */
--destructive: oklch(...)            /* Red */
```

### Info Token Usage

**Decision: Alerts only**

The `--info` token (blue) is for:
- Info alerts (non-interactive)
- Informational callouts
- Status badges (display only)

**Not for:**
- Buttons
- Navigation
- Spinners
- Any interactive elements

---

## What NOT to Do

### ❌ Forbidden
- Multiple brand colors
- Blue for navigation/primary buttons (pending decision)
- Hardcoded colors (use tokens)
- Color-only information
- Jargon or bureaucratic language
- Hidden primary actions
- Inconsistent spacing

### ✅ Required
- Orange for brand/active states
- Design tokens for all colors
- Icon + text for status
- Plain language
- Visible primary actions
- Consistent spacing scale

---

**This is the single source of truth for design decisions.**

**Last Updated:** 2025-11-16  
**Decisions finalized:** 2025-11-16
