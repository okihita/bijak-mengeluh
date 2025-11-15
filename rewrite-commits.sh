#!/bin/bash

# Bijak Mengeluh - Git History Cleanup
# This rewrites commit messages to be more concise and professional

git filter-branch --msg-filter '
  msg=$(cat)
  
  # Phase 3: DynamoDB Migration
  if echo "$msg" | grep -q "Phase 1 in progress"; then
    echo "feat: DynamoDB migration (75% complete)"
  elif echo "$msg" | grep -q "DKI Jakarta test prompts"; then
    echo "test: add DKI Jakarta test cases"
  elif echo "$msg" | grep -q "DKI Jakarta automated scraping"; then
    echo "docs: DKI scraping cost analysis"
  elif echo "$msg" | grep -q "database population cost"; then
    echo "docs: database population cost analysis"
  
  # Phase 2: Documentation
  elif echo "$msg" | grep -q "cleanup, reorganize"; then
    echo "docs: reorganize by user priority"
  elif echo "$msg" | grep -q "local government expansion"; then
    echo "docs: local government expansion spec"
  
  # Phase 1: Instagram Share
  elif echo "$msg" | grep -q "Instagram share as image"; then
    echo "feat: Instagram Story sharing"
  elif echo "$msg" | grep -q "pixel perfect Instagram"; then
    echo "feat: Instagram Story design (9:16)"
  elif echo "$msg" | grep -q "redesign for Instagram"; then
    echo "feat: viral Instagram Story format"
  elif echo "$msg" | grep -q "isolated iframe"; then
    echo "fix: CSS isolation for image generation"
  elif echo "$msg" | grep -q "hex colors instead of oklch"; then
    echo "fix: use hex colors for html2canvas"
  elif echo "$msg" | grep -q "test page for image"; then
    echo "test: add /test-image page"
  elif echo "$msg" | grep -q "improve image generation"; then
    echo "fix: improve image generation error handling"
  elif echo "$msg" | grep -q "Instagram image sharing with proper"; then
    echo "fix: Instagram sharing error handling"
  
  # UX Improvements
  elif echo "$msg" | grep -q "auto-scroll, fix button jumps"; then
    echo "feat: auto-scroll and compact layout"
  elif echo "$msg" | grep -q "smooth blink, char count"; then
    echo "fix: blink animation and character counter"
  elif echo "$msg" | grep -q "refine: fix blink"; then
    echo "refine: colors and layout"
  elif echo "$msg" | grep -q "restore clarity"; then
    echo "fix: restore UX clarity"
  elif echo "$msg" | grep -q "aggressively reduce vertical"; then
    echo "feat: reduce vertical space"
  elif echo "$msg" | grep -q "reduce vertical space and improve"; then
    echo "feat: improve vertical spacing"
  elif echo "$msg" | grep -q "improve UX - add tagline"; then
    echo "feat: add tagline and improve UX"
  
  # Documentation
  elif echo "$msg" | grep -q "prioritize cost optimization"; then
    echo "docs: add AI agent instructions"
  elif echo "$msg" | grep -q "add cost analysis"; then
    echo "docs: cost analysis and optimization"
  elif echo "$msg" | grep -q "cleanup and technical debt"; then
    echo "docs: cleanup summary"
  elif echo "$msg" | grep -q "technical debt tracker"; then
    echo "docs: technical debt tracker"
  elif echo "$msg" | grep -q "style unification"; then
    echo "docs: style unification"
  elif echo "$msg" | grep -q "unified style guide"; then
    echo "docs: unified style guide"
  elif echo "$msg" | grep -q "Phase 1 summary"; then
    echo "docs: Phase 1 summary"
  
  # Initial
  elif echo "$msg" | grep -q "Initial commit"; then
    echo "init: Next.js + TypeScript + Tailwind"
  
  # Default: keep original
  else
    echo "$msg"
  fi
' --tag-name-filter cat -- --all

echo "✅ Git history rewritten"
echo "⚠️  Run 'git push --force' to update remote"
