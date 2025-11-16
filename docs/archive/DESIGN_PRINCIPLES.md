# Design Principles

**Version-agnostic design guidelines for Bijak Mengeluh**

---

## Brand Identity

### Color
- **Primary brand color: Orange** (#D97706 / oklch(0.55 0.22 25))
- Use orange for all active states, primary actions, and brand emphasis
- Never use blue for branding or active states
- Semantic colors (green/yellow/red/blue) only for status feedback

### Typography
- System fonts for instant loading
- Clear hierarchy: Large titles → Medium headings → Body text
- Minimum 16px for body text (mobile accessibility)
- Bold for emphasis, not color

### Spacing
- Consistent rhythm: 8px, 16px, 24px, 32px
- More space = more importance
- Mobile: tighter spacing
- Desktop: generous spacing

---

## Layout Principles

### Mobile-First
- Design for one-handed phone use
- Bottom navigation on mobile (thumb-friendly)
- Top navigation on desktop
- Touch targets: minimum 44x44px

### Content-First
- Maximum width: 768px (optimal reading)
- Center content on large screens
- No distracting sidebars or chrome
- Focus on the task at hand

### Consistent Structure
Every page follows:
1. Top bar (minimal: PWA install + theme toggle)
2. Main content (centered, max-width)
3. Bottom navigation (mobile only)

---

## Interaction Principles

### Instant Feedback
- Show loading states immediately
- Disable buttons during actions
- Confirm destructive actions
- Celebrate success (subtle)

### Clear Actions
- One primary action per screen
- Primary action = orange button
- Secondary actions = gray/outline
- Destructive actions = red

### Forgiving
- Allow undo where possible
- Save drafts automatically
- Clear error messages
- Easy recovery

---

## Visual Hierarchy

### Importance = Size + Weight + Color
1. **Most important**: Large, bold, orange
2. **Important**: Medium, bold, black
3. **Normal**: Base size, regular, black
4. **Less important**: Small, regular, gray

### Grouping
- Related items close together
- Unrelated items far apart
- Cards for distinct sections
- Borders for separation

---

## Accessibility

### Must Have
- 4.5:1 contrast ratio for text
- 3:1 contrast ratio for UI elements
- Keyboard navigation support
- Screen reader friendly
- Works without JavaScript

### Nice to Have
- Reduced motion support
- High contrast mode
- Zoom support (up to 200%)
- Voice control friendly

---

## Voice & Tone

### Empowerment
- "You can" not "You should"
- "Create" not "Submit"
- "Your complaint" not "The complaint"
- Active voice, present tense

### Clarity
- Short sentences
- Everyday Indonesian
- No jargon or bureaucratic language
- Explain, don't assume

### Confidence
- Direct instructions
- No apologies for features
- Positive framing
- Action-oriented

---

## What NOT to Do

### ❌ Don't
- Use blue for branding or active states
- Use multiple brand colors
- Make users scroll to find primary action
- Hide important information
- Use jargon or technical terms
- Require account creation
- Add unnecessary steps
- Use decorative elements that don't guide action

### ✅ Do
- Use orange for all brand/active states
- Keep primary action visible
- Show progress clearly
- Use plain language
- Make it work without login
- Remove friction
- Guide with purpose

---

## Success Metrics

### User Experience
- Task completion < 30 seconds
- Zero confusion about next step
- Works on first try
- Feels fast (< 1s perceived)

### Visual Consistency
- Same colors across pages
- Same spacing patterns
- Same navigation structure
- Same interaction patterns

---

**This document is version-agnostic. Implementation details are in version-specific directories.**

**Last Updated:** 2025-11-16  
**Maintained by:** Product Team
