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

---

## DynamoDB Table Structure

**Table:** `BijakMengeluhAgencies`  
**Primary Key:** `agency_id` (String)

**Attributes:**
- `name` - Agency full name
- `category` - Type (e.g., "Pekerjaan Umum")
- `jurisdiction` - Geographic scope (e.g., "Jakarta Selatan")
- `keywords` - Search terms (e.g., "jalan,rusak,lubang")
- `social_media` - Contact handles

**GSI:** `jurisdiction-index` for city-level queries

---

## Monitoring

### CloudWatch Dashboards

**Lambda Metrics:**
- Invocations, Errors, Duration, Throttles
- Log group: `/aws/lambda/BijakMengeluhComplaintGenerationFunction`

**DynamoDB Metrics:**
- Read/Write capacity units
- Throttled requests

**Bedrock Metrics:**
- Model invocations
- Token usage

### Alarms (Recommended)

```bash
# Lambda errors >5 in 5 minutes
aws cloudwatch put-metric-alarm \
  --alarm-name BijakMengeluh-Lambda-Errors \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold

# API latency >3s
aws cloudwatch put-metric-alarm \
  --alarm-name BijakMengeluh-High-Latency \
  --metric-name Duration \
  --namespace AWS/Lambda \
  --statistic Average \
  --period 60 \
  --threshold 3000 \
  --comparison-operator GreaterThanThreshold
```

---

## Rollback Procedures

### Backend Rollback

**Option 1: CloudFormation Stack Rollback**
```bash
aws cloudformation cancel-update-stack \
  --stack-name cloudformation-stack-2025-aws-hackathon-bijak-mengeluh \
  --profile bijak-mengeluh-aws-iam \
  --region ap-southeast-2
```

**Option 2: Redeploy Previous Version**
```bash
git checkout <previous-commit>
cd bijak-mengeluh-ai-backend
bash scripts/deploy.sh
```

### Frontend Rollback

**Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Select `bijak-mengeluh-webapp` project
3. Click "Deployments" tab
4. Find previous working deployment
5. Click "..." → "Promote to Production"

**CLI:**
```bash
vercel rollback <deployment-url>
```

### Emergency Contacts

- AWS Support: Check AWS Console for support options
- Vercel Support: https://vercel.com/support
- On-call: Check team documentation

---

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
