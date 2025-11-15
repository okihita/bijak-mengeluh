# Changelog

All notable changes to Bijak Mengeluh will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.2.1] - 2025-11-16

### Changed
- **ComplaintForm header** - Shortened subtitle to fit one line
  - "AI bantu bikin surat & kasih tau lapor ke mana" → "AI rapikan bahasa & tunjukkan kontak yang tepat"
  - More accurate (not "surat", but "bahasa")
  - Fits on one line on mobile

### Removed
- **Tagline** - Removed "Bijak sana, bijak sini, bijak di mana-mana!" for cleaner UI

---

## [2.2.0] - 2025-11-16

### Added
- **Typewriter effect for placeholder** - Animated placeholder text cycles through 8 empowering hints
  - Typing speed: 40ms/character
  - Backspace speed: 20ms/character
  - Pause after completion: 2 seconds
  - Stops when user types, resumes when empty
- **Product documentation standardization** - Unified structure across all contributor guidelines
  - Standardized headers (Document Type, Purpose, Audience, Last Updated)
  - Consistent markdown formatting
  - README.md index for product docs
  - STANDARDIZATION_SUMMARY.md for change tracking

### Changed
- **Documentation reorganization**
  - Renamed RESEARCH.md → STRATEGIC_INSPIRATION.md (better reflects purpose)
  - Renamed MICROCOPY_AUDIT.md → VOICE_AND_TONE.md (permanent guideline, not audit)
  - Moved GAP_ANALYSIS.md → reports/ folder (one-time report)
- **Markdown formatting cleanup**
  - Removed bold from 70+ headings across all docs
  - Removed 80+ orphaned citation numbers
  - Validated all markdown syntax

### Fixed
- **Documentation consistency** - All product docs now follow same structure and formatting

---

## [2.1.0] - 2025-11-16

### Added
- **Animated thinking messages** - 12 entertaining messages during AI generation (cycles every 1.5s)
- **Dual-layer spinner effect** - Ping animation overlay for active loading state
- **Desktop navigation** - Sticky header with Home/History links (hidden on mobile)
- **Onboarding modal** - First-time user guide showing capabilities/limitations
- **Settings panel** - Global controls for auto-save and confidence display
- **Help tooltips** - Contextual help with Radix UI integration
- **Confidence badges** - AI confidence indicators (High/Medium/Low) with color coding
- **UX compliance testing** - 32 tests covering Microsoft HAI, Nielsen, WCAG 2.1 AA
- **100% test coverage** - 65 tests across 11 suites, all passing

### Changed
- **Philosophy rewrite** - From adversarial to collaborative tone
- **Output format** - Casual social media comments instead of formal letters
- **Terminology** - "ministry/kementerian" → "agency/instansi" (reflects 90 DKI Jakarta agencies)
- **Pixel-perfect spacing** - Consistent 4px/8px/12px/16px/24px rhythm across all components
- **Loading animation** - Smooth 500ms transitions with scale/translate effects
- **Card padding** - Unified 24px (px-6) horizontal, 24px (pt-6) top, 16px (pb-4) bottom
- **Textarea height** - 80px → 120px for better comfort
- **Progress bar** - 1.5px → 2px thickness for visibility
- **Submit button** - 40px → 48px height with larger text
- **Tone buttons** - Larger emojis (text-2xl) and better touch targets (py-3)

### Fixed
- **SSR localStorage errors** - Added `typeof window !== 'undefined'` checks in onboarding, settings, confidence badge
- **Hydration mismatch** - Added `suppressHydrationWarning` to body tag for Dark Reader extension compatibility

### Removed
- **Analysis steps card** - Removed animated loading steps (no longer needed)
- **useAnalysisStepsAnimation hook** - Cleaned up unused code

---

## [2.0.0] - 2025-11-15

### Added
- **DynamoDB keyword matching** - Replaced Pinecone vector search
- **90 DKI Jakarta agencies** - City-level matching (Jakarta Selatan, Pusat, etc.)
- **Instagram Story sharing** - Export complaints as 9:16 images
- **Dark mode** - System preference support
- **PWA support** - Works offline, installable
- **Quality scoring** - Real-time feedback on complaint quality
- **Keyboard shortcuts** - Ctrl+Enter to submit
- **Auto-save** - Every 10 seconds to LocalStorage
- **Comparison view** - Original vs AI-generated side-by-side
- **Print functionality** - Print-friendly formatting

### Changed
- **Response time:** 8-10s → 4-6s (50% faster)
- **Cost:** $77/mo → $7.50/mo (90% cheaper)
- **Match accuracy:** 85% → 100% (15% improvement)
- **Lambda memory:** 512MB → 1024MB
- **Error messages:** Now in Indonesian
- **Loading states:** Skeleton loaders instead of spinners

### Removed
- **Pinecone integration** - Replaced with DynamoDB
- **Embedding generation** - No longer needed
- **Vector search** - Keyword matching more accurate

### Fixed
- Instagram share blank image on Firefox
- Dark mode text readability issues
- Mobile touch target sizes (<44px)
- Accessibility issues (now WCAG 2.1 AA compliant)

---

## [1.0.0] - 2025-10-15

### Added
- **Initial release** 🎉
- **34 national agencies** - Ministries and national-level agencies
- **AI complaint generation** - Formal, funny, and angry tones
- **Agency matching** - Pinecone vector search
- **Complaint history** - LocalStorage-based
- **Responsive design** - Mobile and desktop
- **8 complaint templates** - Quick-start categories
- **Character counter** - Visual progress bar
- **Confetti celebration** - On successful generation
- **Error handling** - Retry functionality

### Technical
- Next.js 16 with React 19
- AWS Lambda + Bedrock (Claude Haiku)
- Pinecone vector database
- Tailwind CSS v4
- Radix UI components

---

## [Unreleased]

Nothing yet. See [ROADMAP.md](./ROADMAP.md) for backlog ideas.

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 2.0.0 | 2025-11-15 | DynamoDB migration, 90% cost reduction |
| 1.0.0 | 2025-10-15 | Initial release, 34 agencies |

---

**See also:**
- [ROADMAP.md](./ROADMAP.md) - Product backlog
- [docs/NOTES.md](./docs/NOTES.md) - Development diary
- [docs/archive/PHASE1_COMPLETE.md](./docs/archive/PHASE1_COMPLETE.md) - Phase 1 details
