#!/bin/bash

echo "🚀 Deploying Bijak Mengeluh to Production"
echo "=========================================="

# Check if build passes
echo "📦 Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "Choose deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Manual (show instructions)"
echo ""
read -p "Enter choice (1-2): " choice

case $choice in
    1)
        echo "🔧 Installing Vercel CLI..."
        npm i -g vercel
        
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        
        echo ""
        echo "✅ Deployment complete!"
        echo "📝 Don't forget to set environment variables:"
        echo "   vercel env add NEXT_PUBLIC_API_GATEWAY_URL production"
        ;;
    2)
        echo ""
        echo "📖 Manual Deployment Instructions:"
        echo ""
        echo "1. Push to GitHub:"
        echo "   git push origin main"
        echo ""
        echo "2. Deploy to Vercel:"
        echo "   - Go to vercel.com"
        echo "   - Import Git repository"
        echo "   - Add environment variable:"
        echo "     NEXT_PUBLIC_API_GATEWAY_URL=https://brain.bijakmengeluh.id"
        echo "   - Deploy!"
        echo ""
        echo "3. Or use Netlify/AWS Amplify"
        echo "   See DEPLOYMENT.md for details"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
