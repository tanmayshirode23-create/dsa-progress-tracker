# Vercel Deployment Guide

## Quick Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/dsa-progress-tracker&env=VITE_FIREBASE_API_KEY,VITE_FIREBASE_AUTH_DOMAIN,VITE_FIREBASE_PROJECT_ID,VITE_FIREBASE_STORAGE_BUCKET,VITE_FIREBASE_MESSAGING_SENDER_ID,VITE_FIREBASE_APP_ID)

## Manual Deployment Steps

### Prerequisites
- GitHub account with your repo pushed
- Vercel account (free)
- Firebase project set up

### Steps

1. **Go to Vercel**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

2. **Import Repository**
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (auto-selected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**
   - Click on "Environment Variables"
   - Add each variable from your Firebase config:
   
   | Variable | Value |
   |----------|-------|
   | VITE_FIREBASE_API_KEY | Your API Key |
   | VITE_FIREBASE_AUTH_DOMAIN | Your Auth Domain |
   | VITE_FIREBASE_PROJECT_ID | Your Project ID |
   | VITE_FIREBASE_STORAGE_BUCKET | Your Storage Bucket |
   | VITE_FIREBASE_MESSAGING_SENDER_ID | Your Messaging ID |
   | VITE_FIREBASE_APP_ID | Your App ID |

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)
   - You'll get a URL like `https://dsa-tracker-xxx.vercel.app`

6. **Update Firebase Settings**
   - Go to Firebase Console
   - Authentication → Settings → Authorized domains
   - Add your Vercel domain

## Post-Deployment

### Set Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as shown

### Enable Analytics
1. Go to project Settings
2. Analytics → Enable
3. View real-time analytics

### Monitor Deployment
1. Go to Deployments tab
2. View deployment logs
3. Check if build succeeded
4. See real-time metrics

## Troubleshooting

### Build Failed
- Check build logs in Vercel
- Verify all dependencies in `package.json`
- Test locally: `npm run build`

### App Shows Blank Page
- Check browser console for errors
- Verify environment variables are set
- Check Vercel logs for server errors

### Firebase Connection Failed
- Verify environment variables are correct
- Check Firebase console for any issues
- Add Vercel domain to authorized domains in Firebase

## Auto-Deploy from GitHub

Vercel automatically deploys when you push to main:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will:
1. Pull latest changes
2. Run build
3. Deploy to production
4. Update your URL

## Rollback Previous Deployment

1. Go to Vercel dashboard
2. Deployments tab
3. Click on previous deployment
4. Click "Promote to Production"

## Performance Tips

- Use Vercel's Edge Functions for better performance
- Enable "Use Production Branch" in Settings
- Configure analytics to monitor metrics
- Use Vercel's Image Optimization (if images added)

## Security

- Never commit `.env.local` to GitHub
- Use Vercel's secure environment variables
- Enable branch protection
- Review deployment logs for errors

---

**Deployment complete! Your app is now live.**
