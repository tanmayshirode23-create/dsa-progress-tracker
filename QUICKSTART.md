# Installation & Quick Start Guide

## Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm 8+ or yarn 3+
- Git
- GitHub account
- Firebase account (free tier sufficient)

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dsa-progress-tracker.git
cd dsa-progress-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

**Visit Firebase Console:**
- Go to https://console.firebase.google.com/
- Create a new project: `dsa-progress-tracker`
- Enable Google Authentication
- Create Firestore Database (test mode)
- Get your Firebase config from Project Settings

### 4. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit with your Firebase config
nano .env.local
```

Your `.env.local` should look like:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

### 5. Start Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 6. Test the App

1. Click "Sign in with Google"
2. Complete Google authentication
3. Mark a problem as completed
4. Verify data saves (check Firestore in Firebase Console)
5. Refresh page - data should persist

## Project Features Overview

✅ **200+ DSA Problems**
- Arrays (38 problems)
- Strings (28 problems)  
- Linked List (20 problems)
- Stack (20 problems)
- Queue/Deque (15 problems)
- Trees (40+ problems)

✅ **Real-time Sync**
- Cloud storage with Firebase
- Instant updates across devices
- Offline support with PWA

✅ **Progress Tracking**
- Mark problems as complete
- Track timestamps
- Add personal notes
- Favorite marking
- Revision counting

✅ **Analytics**
- Progress charts
- Difficulty distribution
- Contribution heatmap
- Daily/weekly/monthly stats
- Streak counter

✅ **Mobile-Friendly**
- Fully responsive
- Installable as PWA
- Works on all devices

## Common Commands

```bash
# Development server (with hot reload)
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Folder Structure

```
project/
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React Context (state)
│   ├── pages/           # Page components
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static files
├── .env.example         # Example env variables
├── .env.local           # Your env variables (NOT in git)
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.js   # Tailwind config
├── vite.config.ts       # Vite config
└── README.md            # This file
```

## Next Steps

1. **Explore the App**
   - Click through all pages
   - Try marking problems as complete
   - Check analytics page

2. **Customize**
   - Edit `src/utils/dsaData.ts` to add/remove problems
   - Modify colors in `tailwind.config.js`
   - Update text/branding as needed

3. **Deploy**
   - Read `VERCEL_DEPLOYMENT.md` for deployment
   - Deploy to Vercel with 1 click
   - Share your app with others

4. **Learn More**
   - Check `DEVELOPMENT.md` for architecture
   - Read `FIREBASE_SETUP.md` for database details
   - Explore component code to understand patterns

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Firebase Auth Not Working
- Check .env.local has correct variables
- Restart dev server after changing env
- Check Firebase Console for errors

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Hot Reload Not Working
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check file paths are correct
- Clear browser cache

## Support

- 📖 Read the full docs in README.md
- 🐛 Report issues on GitHub
- 💬 Discussions for questions
- 📧 Email for urgent matters

## Next: Deploy to Vercel

When ready to go live:

1. Push code to GitHub
2. Follow VERCEL_DEPLOYMENT.md
3. Share your live app!

---

**You're all set! Happy tracking! 🚀**
