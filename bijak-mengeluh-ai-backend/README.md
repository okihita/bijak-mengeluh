# Backend - Bijak Mengeluh

Lambda functions for complaint generation and agency matching.

## Prerequisites

- AWS CLI with profile `bijak-mengeluh-aws-iam`
- SAM CLI
- Secrets in Parameter Store (see [Deployment Guide](../docs/deployment/deployment-guide.md))

## Quick Deploy

```bash
bash scripts/deploy.sh
```

## Local Development

```bash
sam build
sam local start-api
# Test: curl http://localhost:3000/generate -X POST -d '{"complaint":"test","tone":"formal"}'
```

## Testing

See [Testing Guide](../docs/testing/test-guide.md).
