# Bijak Mengeluh

AI-powered complaint letter generator for Indonesian public services. This app helps citizens write effective complaint letters and identifies the appropriate government agencies to contact.

## Features

- **AI-Generated Complaints**: Transform casual complaints into formal, well-structured letters
- **Smart Agency Matching**: Automatically suggests relevant government ministries/agencies with confidence scores
- **Social Media Integration**: Finds verified official X/Twitter accounts for direct contact
- **Complaint History**: Tracks your previous complaints locally
- **PWA Support**: Install as a mobile app for offline access
- **Dark Mode**: Full theme support with system preference detection

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
NEXT_PUBLIC_API_GATEWAY_URL=your_api_gateway_url
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
2. AI analyzes the complaint and generates a formal letter
3. System suggests relevant government agencies with rationale
4. Provides verified social media handles for direct contact
5. User can copy or share the generated complaint
