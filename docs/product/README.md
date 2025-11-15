# Product Documentation

**Purpose:** Contributor guidelines for maintaining consistency across Bijak Mengeluh  
**Audience:** Developers, designers, content writers, product managers  
**Last Updated:** 2025-11-16

---

## Document Structure

All product documentation follows this standardized format:

### Header Section
```markdown
# [Document Title]

**Document Type:** Contributor Guideline  
**Purpose:** [One-line purpose]  
**Audience:** [Target readers]  
**Last Updated:** YYYY-MM-DD
```

### Required Sections
1. **Table of Contents** - Numbered list with anchor links
2. **Overview** - 2-3 paragraphs explaining document purpose
3. **How to Use This Document** - Role-specific guidance (Developers, Designers, etc.)
4. **Main Content** - Organized in logical sections with clear headings
5. **Practical Examples** - Real before/after or implementation examples
6. **Checklists** - Actionable validation steps
7. **Common Mistakes** - Anti-patterns to avoid

### Markdown Standards
- Use `#` for title, `##` for major sections, `###` for subsections
- No bold in headings (remove `**` from `## **Section**`)
- Use tables for structured comparisons
- Use code blocks with language tags (```typescript, ```markdown)
- Use horizontal rules (`---`) to separate major sections
- Use blockquotes (`>`) for important callouts
- Use numbered lists for sequential steps, bullets for non-sequential items

---

## Available Documents

### 1. VOICE_AND_TONE.md
**Purpose:** Language, tone, and empowerment guidelines for all user-facing copy

**Use When:**
- Writing UI text, buttons, error messages
- Creating onboarding flows or help content
- Reviewing copy changes in PRs
- Designing new features with user-facing text

**Key Sections:**
- Voice Characteristics (5 principles)
- Tone Principles (4 core principles)
- Word Choices (always use / avoid tables)
- Empowerment Language Patterns (4 patterns)
- Component-Specific Guidelines
- Writing Checklist

---

### 2. UX_GUIDELINES.md
**Purpose:** UI/UX principles, guardrails, and accessibility standards

**Use When:**
- Designing new components or features
- Implementing frontend interfaces
- Conducting UX reviews or audits
- Ensuring accessibility compliance

**Key Sections:**
- Microsoft HAI 18 Guidelines (mandatory framework)
- Nielsen's 10 Usability Heuristics
- Shneiderman's 8 Golden Rules
- Dark Patterns to Avoid
- Accessibility (A11y) Standards (WCAG 2.1 AA)
- Component-Level Design Rules
- Validation Checklists

---

### 3. STRATEGIC_INSPIRATION.md
**Purpose:** Global civic tech inspiration for strategic planning

**Use When:**
- Planning long-term product strategy
- Discussing features with stakeholders
- Understanding civic tech landscape
- Evaluating new opportunities

**Key Sections:**
- Global Case Studies (Taiwan, Estonia, Iceland, Spain, South Korea, Finland)
- Strategic Opportunities for Bijak Mengeluh
- Technology Levers (Blockchain, AI, IoT, AR/VR)
- Implementation Lessons

**Important:** This is inspiration, not commitment. Features listed are long-term possibilities, not immediate roadmap items.

---

## Contribution Guidelines

### When Adding New Documentation

1. **Follow the Standard Structure**
   - Include all required sections
   - Use consistent markdown formatting
   - Add to this README with description

2. **Keep It Actionable**
   - Provide clear examples
   - Include checklists
   - Show before/after comparisons

3. **Maintain Consistency**
   - Use same terminology across documents
   - Cross-reference related sections
   - Update all affected documents

4. **Validate Before Committing**
   - Check markdown syntax
   - Verify all links work
   - Ensure examples are accurate
   - Run through relevant checklist

### When Updating Existing Documentation

1. **Update "Last Updated" Date**
2. **Maintain Backward Compatibility** - Don't break existing references
3. **Document Changes** - Add note in CHANGELOG.md if significant
4. **Review Cross-References** - Update related documents if needed

---

## Document Relationships

```
VOICE_AND_TONE.md
    ↓ (defines language for)
UX_GUIDELINES.md
    ↓ (implements principles in)
Frontend Components
    ↓ (inspired by)
STRATEGIC_INSPIRATION.md
```

**Flow:**
1. STRATEGIC_INSPIRATION provides long-term vision
2. UX_GUIDELINES defines how to build interfaces
3. VOICE_AND_TONE defines how to write copy
4. All three inform frontend implementation

---

## Quick Reference

### Need to write UI copy?
→ [VOICE_AND_TONE.md](./VOICE_AND_TONE.md)

### Need to design a component?
→ [UX_GUIDELINES.md](./UX_GUIDELINES.md)

### Need strategic context?
→ [STRATEGIC_INSPIRATION.md](./STRATEGIC_INSPIRATION.md)

### Need to understand overall product?
→ [../../README.md](../../README.md)

---

## Maintenance

**Review Cycle:** Quarterly (every 3 months)

**Review Checklist:**
- [ ] Are examples still accurate?
- [ ] Do guidelines reflect current implementation?
- [ ] Are there new patterns to document?
- [ ] Are there deprecated patterns to remove?
- [ ] Do cross-references still work?
- [ ] Is terminology consistent across documents?

**Owner:** Product team  
**Last Review:** 2025-11-16  
**Next Review:** 2026-02-16
