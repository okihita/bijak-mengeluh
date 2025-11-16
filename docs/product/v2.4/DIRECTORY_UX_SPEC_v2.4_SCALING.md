# Directory UX Specification v2.4 - Scaling to 30+ Provinces

**Purpose:** Design pattern for region filtering with 30+ provinces  
**Date:** November 16, 2025  
**Context:** Current chip implementation works for 5-7 regions, needs redesign for full Indonesia coverage

---

## Problem

**Current Implementation:**
- Horizontal chip row with 7 regions
- Works well for limited set (Jakarta, Jabar, Jateng, Jatim, Banten + Semua + Nasional)
- Breaks down with 30+ provinces:
  - Horizontal scroll becomes unwieldy
  - Cognitive load increases (too many options)
  - Difficult to scan and find specific province

**Design Constraint:**
- Must maintain zero-tap visibility of filter
- Must preserve AND logic with category filter
- Must remain mobile-first and thumb-friendly

---

## Solution: Compact Dropdown Pattern

### UI Design

Replace chip row with compact dropdown that shows selected state:

```
┌─────────────────────────────────────┐
│ Wilayah: [🇮🇩 Semua ▼]              │  ← Collapsed state
└─────────────────────────────────────┘

When tapped:
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ 🇮🇩 Semua                       │ │
│ │ 🏛️ Nasional                     │ │
│ │ ─────────────────────────────── │ │
│ │ 🏙️ Aceh                         │ │
│ │ 🏙️ Bali                         │ │
│ │ 🏙️ Banten                       │ │
│ │ 🏙️ DKI Jakarta                  │ │
│ │ ... (scrollable)                │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Key Features

**Visual Hierarchy:**
- "Semua" and "Nasional" at top (most common)
- Divider line separating special options from provinces
- Provinces alphabetically sorted
- Selected option shown in collapsed state with emoji

**Interaction:**
- Single tap to open dropdown
- Single tap to select province
- Dropdown auto-closes on selection
- Selected province shown in collapsed state
- Active filter badge appears below

**Mobile Optimization:**
- Dropdown opens downward (natural scroll direction)
- Max height: 60vh (prevents covering category grid)
- Smooth scroll within dropdown
- 44px minimum tap target per option

---

## Implementation Spec

### Component Structure

```tsx
<div className="space-y-2">
  <label className="text-xs sm:text-sm font-medium">
    Wilayah:
  </label>
  <select 
    value={selectedRegion}
    onChange={(e) => setSelectedRegion(e.target.value)}
    className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800"
  >
    <option value="all">🇮🇩 Semua</option>
    <option value="national">🏛️ Nasional</option>
    <option disabled>──────────</option>
    {PROVINCES.sort().map(p => (
      <option key={p.id} value={p.id}>
        🏙️ {p.name}
      </option>
    ))}
  </select>
</div>
```

### Data Structure

```typescript
const REGIONS = [
  { id: 'all', label: 'Semua', emoji: '🇮🇩', type: 'special' },
  { id: 'national', label: 'Nasional', emoji: '🏛️', type: 'special' },
  // Provinces from database, sorted alphabetically
  { id: 'aceh', label: 'Aceh', emoji: '🏙️', province: 'Aceh' },
  { id: 'bali', label: 'Bali', emoji: '🏙️', province: 'Bali' },
  // ... 30+ more
];
```

### Filter Logic (Unchanged)

```typescript
// Same AND operation as chip version
if (selectedRegion !== 'all') {
  if (selectedRegion === 'national') {
    results = results.filter(a => a.level === 'national');
  } else {
    const region = REGIONS.find(r => r.id === selectedRegion);
    results = results.filter(a => a.province === region.province);
  }
}
```

---

## Alternative Patterns Considered

### ❌ Searchable Dropdown
- **Pro:** Faster to find specific province
- **Con:** Adds complexity, requires extra tap to search
- **Decision:** Overkill for 30 items, alphabetical sort sufficient

### ❌ Two-Level Dropdown (Island → Province)
- **Pro:** Groups provinces by island (Sumatra, Java, etc.)
- **Con:** Adds cognitive load, users know their province
- **Decision:** Flat list is simpler

### ❌ Accordion with Chips Inside
- **Pro:** Visual scanning of all options
- **Con:** Takes too much vertical space, pushes content down
- **Decision:** Dropdown is more compact

### ✅ Native Select Dropdown (Chosen)
- **Pro:** Familiar, accessible, mobile-optimized by OS
- **Pro:** Zero custom JS, works everywhere
- **Pro:** Compact when collapsed
- **Con:** Less visually distinctive than chips
- **Decision:** Best balance of simplicity and scalability

---

## Migration Path

### Phase 1: Current (5-7 regions)
- Keep chip implementation
- Covers Java + Jakarta (80% of users)

### Phase 2: Expansion (30+ provinces)
- Replace chips with dropdown
- Populate from database dynamically
- Maintain same filter logic

### Phase 3: Future Enhancement
- Add "Terdekat" (Nearest) option using geolocation
- Auto-select user's province on first visit
- Remember last selected region in localStorage

---

## Visual Comparison

### Chip Pattern (Current)
```
Wilayah:
[🇮🇩 Semua] [🏛️ Nasional] [🏙️ Jakarta] [🏔️ Jabar] [🌾 Jateng] [🌊 Jatim] [🏭 Banten]
```
- **Pros:** All options visible, one-tap selection
- **Cons:** Doesn't scale beyond 7-8 options

### Dropdown Pattern (Scaled)
```
Wilayah: [🇮🇩 Semua ▼]
```
- **Pros:** Compact, scales to 100+ options, familiar pattern
- **Cons:** Requires tap to see options (but selected state visible)

---

## Accessibility Notes

- Native `<select>` has built-in keyboard navigation
- Screen readers announce "Wilayah, dropdown, Semua selected"
- Arrow keys navigate options
- Enter/Space to select
- Escape to close without selecting

---

## Code Changes Required

**Minimal changes:**
1. Replace chip buttons with `<select>` element
2. Update REGIONS array with all provinces
3. Keep filter logic identical
4. Update active badge to show selected province name

**No changes needed:**
- Filter logic (AND operation)
- Category grid
- Search functionality
- Active filter badges
- Agency card display

---

## Decision

**Use native `<select>` dropdown for 30+ provinces**

Rationale:
- Simplest implementation (native HTML)
- Best accessibility (built-in)
- Familiar to all users
- Scales infinitely
- Mobile-optimized by OS
- Zero maintenance overhead
