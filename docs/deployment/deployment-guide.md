# Deployment Guide

## Prerequisites

- AWS CLI configured with profile `bijak-mengeluh-aws-iam`
- SAM CLI installed
- Node.js 18+

## Secrets Setup

Store API keys in AWS Parameter Store:

```bash
aws ssm put-parameter \
  --name /bijak-mengeluh/serper-api-key \
  --value "YOUR_KEY" \
  --type SecureString \
  --profile bijak-mengeluh-aws-iam \
  --region ap-southeast-2
```

## Backend Deployment

```bash
cd bijak-mengeluh-ai-backend
bash scripts/deploy.sh
```

**Stack:** cloudformation-stack-2025-aws-hackathon-bijak-mengeluh  
**Region:** ap-southeast-2

### Manual Deploy

```bash
sam build
sam deploy \
  --stack-name cloudformation-stack-2025-aws-hackathon-bijak-mengeluh \
  --profile bijak-mengeluh-aws-iam \
  --region ap-southeast-2 \
  --parameter-overrides SerperApiKey=$SERPER_KEY
```

## Frontend Deployment

```bash
cd bijak-mengeluh-webapp
npm run build
npm run deploy  # or push to main for auto-deploy
```

**Platform:** Vercel  
**Domain:** bijakmengeluh.id

### Environment Variables

Set in Vercel dashboard:
- `NEXT_PUBLIC_API_URL=https://brain.bijakmengeluh.id`

## Verification

```bash
# Backend
curl https://brain.bijakmengeluh.id/generate -X POST \
  -H "Content-Type: application/json" \
  -d '{"complaint":"jalan rusak","tone":"formal"}'

# Frontend
open https://bijakmengeluh.id
```

## Troubleshooting

### Backend Issues

**Lambda timeout:**
- Check CloudWatch logs: `/aws/lambda/BijakMengeluhComplaintGenerationFunction`
- Increase timeout in `template.yaml` if needed

**DynamoDB errors:**
- Verify table exists: `aws dynamodb list-tables --profile bijak-mengeluh-aws-iam --region ap-southeast-2`
- Check IAM permissions in CloudFormation stack

**Bedrock throttling:**
- Wait 1 minute and retry
- Check quota limits in AWS console

### Frontend Issues

**Build fails:**
- Clear cache: `rm -rf .next node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

**API calls fail:**
- Verify `NEXT_PUBLIC_API_URL` in Vercel dashboard
- Check CORS in backend `template.yaml`

## Rollback

```bash
# Backend
aws cloudformation describe-stack-events \
  --stack-name cloudformation-stack-2025-aws-hackathon-bijak-mengeluh \
  --profile bijak-mengeluh-aws-iam \
  --region ap-southeast-2

# Frontend (Vercel)
# Use Vercel dashboard to rollback to previous deployment
```
