# Firebase Setup & Deployment Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `dsa-progress-tracker`
4. Accept the terms and create
5. Wait for project creation to complete

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Select **Google** as sign-in method
4. Enable it and add your support email
5. Save

## Step 3: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **test mode** (for development)
4. Choose a region close to you
5. Click **Enable**

### Security Rules (Important for Production)

Go to **Firestore** → **Rules** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own data only
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

Click **Publish**

## Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click **Web** (</>)
4. Register app
5. Copy the Firebase config

Your config should look like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "dsa-progress-tracker-xxx.firebaseapp.com",
  projectId: "dsa-progress-tracker-xxx",
  storageBucket: "dsa-progress-tracker-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

## Step 5: Configure Local Environment

1. Create `.env.local` file in project root
2. Add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

3. Save and restart dev server

## Step 6: Test Locally

```bash
npm run dev
```

- Open http://localhost:5173
- Click "Sign in with Google"
- You should be redirected to login
- After login, check Firebase Console → Firestore to verify user data is being saved

## Step 7: Deploy to Vercel

### Option A: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add environment variables**
   - Vercel will ask you to confirm settings
   - Add your `.env.local` variables when prompted

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option B: Using GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: DSA Progress Tracker"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure environment variables**
   - In project settings, go to "Environment Variables"
   - Add all `VITE_*` variables
   - Save

4. **Deploy**
   - Vercel auto-deploys on every push to `main`

## Step 8: Update Firebase OAuth Redirect URLs

After deploying to Vercel:

1. Go to Firebase Console → **Authentication**
2. Click **Settings** (gear icon)
3. Go to **Authorized domains**
4. Add your Vercel domain (e.g., `your-app.vercel.app`)
5. Save

## Step 9: Enable PWA on Mobile

### iOS
1. Open your app in Safari
2. Tap **Share** → **Add to Home Screen**
3. Give it a name and tap **Add**

### Android
1. Open your app in Chrome
2. Tap **Menu** (3 dots) → **Install app**
3. Confirm installation

## Troubleshooting

### "Firebase is not configured"
- Check `.env.local` has all required variables
- Verify variable names start with `VITE_`
- Restart dev server after adding env variables

### "Sign in with Google fails"
- Check Google auth is enabled in Firebase Console
- Verify authorized domains include your URL
- Check browser console for error messages

### "No data appears in Firestore"
- Check Firestore security rules allow writes
- Verify user is authenticated (check Firebase Console → Users)
- Check browser Network tab for failed requests

### "App not installable as PWA"
- Check browser shows install prompt
- Verify HTTPS is enabled (automatic on Vercel)
- Check manifest in browser DevTools → Application → Manifest

## Performance Optimization

1. **Enable Firestore caching** - Already configured in `vite.config.ts`
2. **Use PWA offline support** - Service Worker caches static files
3. **Optimize images** - Use next-gen formats
4. **Bundle analysis** - Run `npm run build` and check dist size

## Monitoring

### Firebase Console
- **Firestore** → **Usage** - Monitor read/write operations
- **Authentication** → **Users** - See registered users
- **Realtime Database** - Monitor data changes

### Vercel Dashboard
- **Analytics** - Page performance metrics
- **Logs** - Server-side error logs
- **Deployment History** - Track all deploys

## Production Checklist

- [ ] Firebase security rules configured
- [ ] Environment variables set on Vercel
- [ ] Google OAuth domains updated
- [ ] PWA manifest configured
- [ ] Service Worker working
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Email verification enabled
- [ ] Firestore backups configured
- [ ] Analytics tracking enabled
- [ ] Error monitoring set up

## Next Steps

1. Share your app URL with friends
2. Monitor Firebase usage
3. Collect user feedback
4. Add more features based on feedback
5. Optimize based on analytics

---

**Need help?** Check [Firebase Docs](https://firebase.google.com/docs) or [Vercel Docs](https://vercel.com/docs)
