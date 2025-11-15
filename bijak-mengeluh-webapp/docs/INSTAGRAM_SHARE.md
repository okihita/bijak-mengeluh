# Instagram Share Feature

## Overview
Users can share generated complaints as styled images for Instagram stories/posts.

## Implementation

### Files
- `src/lib/share-image.ts` - Image generation utility using html2canvas
- `src/app/page.tsx` - Updated with Instagram share button

### How It Works
1. User clicks "Instagram" button
2. Complaint text is rendered in a styled container (1080px width)
3. html2canvas converts the DOM to canvas
4. Canvas is converted to PNG blob
5. If device supports file sharing → native share dialog
6. Otherwise → automatic download

### Image Specs
- **Size:** 1080px width (Instagram optimized)
- **Format:** PNG
- **Content:** 
  - Complaint text (max 400 chars)
  - Ministry name (if available)
  - bijakmengeluh.id branding
- **Style:** Gradient background, white card, rounded corners

## Usage
```tsx
const { shareAsImage } = useWebShare();
await shareAsImage(complaintText, ministryName);
```

## Dependencies
- `html2canvas` - DOM to canvas conversion
