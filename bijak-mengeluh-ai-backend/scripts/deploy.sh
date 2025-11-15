#!/bin/bash
set -e

# Configuration - override with environment variables
PROFILE="${AWS_PROFILE:-bijak-mengeluh-aws-iam}"
REGION="${AWS_REGION:-ap-southeast-2}"
STACK_NAME="cloudformation-stack-2025-aws-hackathon-bijak-mengeluh"

echo "=== Bijak Mengeluh - Deployment ==="
echo ""

# Retrieve keys from Parameter Store
echo "Retrieving API keys from Parameter Store..."

SERPER_KEY=$(aws ssm get-parameter \
  --name /bijak-mengeluh/serper-api-key \
  --with-decryption \
  --query Parameter.Value \
  --output text \
  --profile "$PROFILE" \
  --region "$REGION")

echo "✓ Keys retrieved"
echo ""

# Build and deploy
echo "Building SAM application..."
sam build --profile "$PROFILE"

echo ""
echo "Deploying to AWS..."
sam deploy \
  --stack-name "$STACK_NAME" \
  --profile "$PROFILE" \
  --region "$REGION" \
  --parameter-overrides \
    SerperApiKey="$SERPER_KEY"

echo ""
echo "✓ Deployment complete!"
