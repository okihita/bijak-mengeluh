#!/bin/bash
# Daily stability and performance check
# Usage: bash scripts/daily-check.sh

MONTH=$(date +%Y-%m)
TIMESTAMP=$(date "+%Y-%m-%d %H:%M")

echo "Running daily checks..."

# Frontend check
FRONTEND_TIME=$(curl -o /dev/null -s -w '%{time_total}' https://bijakmengeluh.id)
if [ $? -eq 0 ]; then
  echo "$TIMESTAMP: ✅ Frontend OK (${FRONTEND_TIME}s)" | tee -a reports/stability/$MONTH.log
else
  echo "$TIMESTAMP: ❌ Frontend FAILED" | tee -a reports/stability/$MONTH.log
fi

# Backend check
BACKEND_TIME=$(curl -o /dev/null -s -w '%{time_total}' -X POST https://brain.bijakmengeluh.id/generate \
  -H "Content-Type: application/json" \
  -d '{"complaint":"test jalan rusak","tone":"formal"}')
if [ $? -eq 0 ]; then
  echo "$TIMESTAMP: ✅ Backend OK (${BACKEND_TIME}s)" | tee -a reports/stability/$MONTH.log
else
  echo "$TIMESTAMP: ❌ Backend FAILED" | tee -a reports/stability/$MONTH.log
fi

# Performance log
echo "$TIMESTAMP: Frontend ${FRONTEND_TIME}s | Backend ${BACKEND_TIME}s" >> reports/performance/$MONTH.log

echo "✓ Daily check complete. See reports/stability/$MONTH.log"
