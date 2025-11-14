# Bijak Mengeluh

AI-powered complaint letter generator for Indonesian public services. This app helps citizens write effective complaint letters and identifies the appropriate government agencies to contact.

> 📚 **Full documentation available in [/docs](./docs/README.md)**

## 🚨 For Developers

**ALWAYS run local dev server before making changes:**

```bash
npm run dev
# Test at http://localhost:3000
```

See [Development Workflow](./docs/DEVELOPMENT.md) for complete guide.

---

## Quick Links

- 🛠️ [Development Workflow](./docs/DEVELOPMENT.md) - **START HERE**
- 📖 [Documentation Index](./docs/README.md)
- 🗺️ [Product Roadmap](./docs/ROADMAP.md)
- 🧪 [Testing Guide](./docs/testing/usability-test-guide.md)
- 🚀 [Deployment Guide](./docs/deployment/deployment-guide.md)
- 📜 [Development History](./docs/README.md#development-history)

---

## Recent Updates (Phase 4 - Nov 14, 2025)

### Accessibility (WCAG 2.1 AA Compliant)
- ♿ **Full screen reader support** with ARIA labels and live regions
- ⌨️ **Keyboard shortcuts** (Ctrl/Cmd + K to focus, Escape to clear)
- 🎯 **44px minimum touch targets** for mobile accessibility
- 🔊 **Live announcements** for dynamic content changes

### UX Improvements
- 📊 **Real-time quality scoring** with actionable suggestions
- 💡 **Smart feedback** for location, timeframe, and details
- 🎨 **Better visual feedback** with color-coded badges
- 📱 **Optimized mobile experience** with improved spacing

### Performance
- ⚡ **1.2s build time** with Turbopack
- 🚀 **Optimized bundle** for faster loading
- 📦 **Better component structure** for maintainability

See [PHASE1_DEPLOYMENT.md](./PHASE1_DEPLOYMENT.md) for detailed changes.

## Features

- **AI-Generated Complaints**: Transform casual complaints into formal, well-structured letters
- **Smart Agency Matching**: Automatically suggests relevant government ministries/agencies with confidence scores
- **Quality Scoring**: Real-time feedback on complaint completeness with suggestions
- **Social Media Integration**: Finds verified official X/Twitter accounts for direct contact
- **Complaint History**: Tracks your previous complaints locally
- **PWA Support**: Install as a mobile app for offline access
- **Dark Mode**: Full theme support with system preference detection
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard and screen reader support

## Tech Stack

- Next.js 16 with Turbopack
- React 19
- TypeScript
- Tailwind CSS v4
- Radix UI components
- AI backend integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# .env.local
NEXT_PUBLIC_API_GATEWAY_URL=https://brain.bijakmengeluh.id
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## How It Works

1. User enters a complaint in casual Indonesian language
2. **Quality scorer** provides real-time feedback and suggestions
3. AI analyzes the complaint and generates a formal letter
4. System suggests relevant government agencies with rationale
5. Provides verified social media handles for direct contact
6. User can copy, share, or preview the generated complaint

## Accessibility Features

### Keyboard Navigation
- `Ctrl/Cmd + K` - Focus complaint textarea
- `Escape` - Clear focus
- `Tab` - Navigate through interactive elements
- `Enter` - Activate buttons and links

### Screen Reader Support
- Comprehensive ARIA labels
- Live regions for dynamic content
- Status announcements for loading/success/error states
- Proper heading hierarchy

### Mobile Accessibility
- Minimum 44px touch targets
- Proper spacing for fat-finger taps
- Responsive typography
- Optimized for one-handed use

## Quality Scoring System

The app analyzes complaints and provides scores based on:
- **Word count** (minimum 15 words recommended)
- **Location details** (street, city, district)
- **Timeframe** (when the issue occurred)
- **Specific details** (numbers, names, dates)

Scores range from 0-100 with color-coded badges:
- 🟢 80-100: Excellent
- 🟡 60-79: Good
- 🔴 0-59: Needs improvement

## Component Structure

```
src/
├── app/
│   ├── page.tsx          # Main complaint form
│   ├── history/          # Complaint history
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # Reusable UI components
│   ├── theme-toggle.tsx  # Dark mode toggle
│   └── bottom-navigation.tsx
└── lib/
    ├── scorer.ts         # Quality scoring logic
    ├── hooks.ts          # Custom React hooks
    ├── templates.ts      # Complaint templates
    └── utils.ts          # Utility functions
```

## Development

### Code Quality
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

### Format Code
```bash
npx prettier --write .
```

## Deployment

### Auto-Deploy (Configured)
The app is connected to Vercel via GitHub webhook. Simply push to main branch:

```bash
git push origin main
# Vercel will automatically build and deploy
```

### Manual Deployment Options

#### Vercel (Recommended)
```bash
vercel --prod
```

### AWS Amplify
Connect your GitHub repository and use these build settings:
- Build command: `npm run build`
- Output directory: `.next`

### Static Export
Add to `next.config.ts`:
```typescript
output: 'export'
```

Then deploy `.next/out` to any static host.

## Performance Metrics

### Build Stats
- Compile time: ~1.2 seconds
- Static pages: 7
- Bundle: Optimized with Turbopack

### Expected Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android 90+

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`

### API Errors
- Check `NEXT_PUBLIC_API_GATEWAY_URL` in `.env.local`
- Verify backend is deployed and accessible

### Accessibility Issues
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Run axe DevTools extension
- Check keyboard navigation

## License

Proprietary - Bijak Mengeluh Project
