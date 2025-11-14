# Deployment Guide - Bijak Mengeluh

## Pre-Deployment Checklist

- [x] All tests passing
- [x] Build successful
- [x] No console errors
- [x] Environment variables configured
- [x] Git repository clean
- [x] README updated
- [x] Version tagged

## Environment Variables

Required for production:

```bash
NEXT_PUBLIC_API_GATEWAY_URL=https://brain.bijakmengeluh.id
```

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros:** Zero config, automatic deployments, edge network, free tier
**Cons:** None for this project

#### Steps:

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Set Environment Variables:**
```bash
vercel env add NEXT_PUBLIC_API_GATEWAY_URL production
# Enter: https://brain.bijakmengeluh.id
```

5. **Redeploy with env vars:**
```bash
vercel --prod
```

**Custom Domain:**
```bash
vercel domains add bijakmengeluh.id
vercel domains add www.bijakmengeluh.id
```

---

### Option 2: AWS Amplify

**Pros:** AWS integration, CI/CD, custom domains
**Cons:** Requires AWS account

#### Steps:

1. **Push to GitHub:**
```bash
git push origin main
```

2. **AWS Amplify Console:**
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect GitHub repository
   - Select branch: `main`
   - Build settings (auto-detected):
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm ci
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: .next
         files:
           - '**/*'
       cache:
         paths:
           - node_modules/**/*
     ```
   - Add environment variable:
     - Key: `NEXT_PUBLIC_API_GATEWAY_URL`
     - Value: `https://brain.bijakmengeluh.id`
   - Click "Save and deploy"

3. **Custom Domain:**
   - Go to "Domain management"
   - Add domain: `bijakmengeluh.id`
   - Follow DNS configuration steps

---

### Option 3: Netlify

**Pros:** Simple, free tier, good DX
**Cons:** None for this project

#### Steps:

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify deploy --prod
```

4. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Environment variables:
     - `NEXT_PUBLIC_API_GATEWAY_URL=https://brain.bijakmengeluh.id`

---

### Option 4: Docker + VPS

**Pros:** Full control, any hosting provider
**Cons:** Manual setup, maintenance required

#### Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

#### Deploy:

```bash
# Build image
docker build -t bijak-mengeluh .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_GATEWAY_URL=https://brain.bijakmengeluh.id \
  bijak-mengeluh
```

---

## Post-Deployment

### 1. Verify Deployment

```bash
# Check homepage
curl -I https://bijakmengeluh.id

# Check API connection
curl https://bijakmengeluh.id/api/health
```

### 2. Test Core Features

- [ ] Homepage loads
- [ ] Templates work
- [ ] Form submission works
- [ ] History page works
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] PWA installable

### 3. Monitor

- [ ] Set up error monitoring (Sentry)
- [ ] Set up analytics (Plausible/Umami)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure alerts

### 4. Performance

- [ ] Run Lighthouse audit (target: 90+)
- [ ] Check Core Web Vitals
- [ ] Test on slow 3G
- [ ] Test on various devices

---

## Rollback Plan

### Vercel:
```bash
vercel rollback
```

### AWS Amplify:
- Go to Amplify Console
- Select previous deployment
- Click "Redeploy this version"

### Netlify:
```bash
netlify rollback
```

---

## CI/CD Setup (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## DNS Configuration

### For bijakmengeluh.id:

**A Records:**
```
@ → [Vercel IP or CNAME]
www → [Vercel IP or CNAME]
```

**CNAME Records:**
```
www → cname.vercel-dns.com
```

---

## SSL/TLS

All platforms provide automatic SSL certificates via Let's Encrypt.

---

## Monitoring & Maintenance

### Weekly:
- [ ] Check error logs
- [ ] Review analytics
- [ ] Check uptime reports

### Monthly:
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Check security advisories

### Quarterly:
- [ ] Full security audit
- [ ] Performance optimization
- [ ] User feedback review

---

## Support

**Production URL:** https://bijakmengeluh.id  
**API Endpoint:** https://brain.bijakmengeluh.id  
**Status Page:** [Setup status page]  
**Documentation:** This repository

---

## Quick Deploy Commands

```bash
# Vercel (Recommended)
vercel --prod

# Or with environment check
npm run build && vercel --prod

# Check deployment
curl -I https://bijakmengeluh.id
```
