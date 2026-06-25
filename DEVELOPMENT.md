# DSA Progress Tracker - Development Guide

## Project Overview

A complete DSA progress tracker web application built with React, TypeScript, Vite, Tailwind CSS, and Firebase. The app helps users track their Data Structures & Algorithms learning journey with 200+ curated problems.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (next-gen build tool, extremely fast)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **Backend**: Firebase (Authentication + Firestore Database)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **PWA**: vite-plugin-pwa
- **Deployment**: Vercel

## Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── CollapsibleSection.tsx  # Collapsible problem sections
│   ├── ContributionHeatmap.tsx # GitHub-style contribution graph
│   ├── DifficultyBadge.tsx     # Difficulty level badge
│   ├── LoadingSpinner.tsx      # Loading state
│   ├── Navbar.tsx             # Navigation bar
│   ├── ProgressBar.tsx        # Progress bar component
│   ├── ProgressChart.tsx      # Charts for analytics
│   ├── ProblemTable.tsx       # Main problem table with filtering
│   └── StatCard.tsx           # Statistics card component
│
├── contexts/                   # React Context (State Management)
│   ├── AuthContext.tsx        # Authentication context
│   └── ProgressContext.tsx    # Progress/Problem tracking context
│
├── pages/                      # Page components
│   ├── AnalyticsPage.tsx      # Analytics & insights page
│   ├── DashboardPage.tsx      # Main dashboard
│   ├── LoginPage.tsx          # Google login page
│   └── TrackerPage.tsx        # Problem tracker page
│
├── types/                      # TypeScript interfaces
│   └── index.ts               # All type definitions
│
├── utils/                      # Utility functions
│   ├── dsaData.ts             # 200+ DSA problems database
│   ├── firebase.ts            # Firebase configuration
│   └── serviceWorker.ts       # PWA service worker registration
│
├── App.tsx                     # Main app component with routing
├── main.tsx                    # Application entry point
└── index.css                   # Global Tailwind styles
```

## Key Files Explained

### `src/types/index.ts`
Defines all TypeScript interfaces:
- `User` - Authenticated user
- `Problem` - DSA problem
- `UserProgress` - User's tracking data
- `FilterOptions` - Problem filtering

### `src/utils/dsaData.ts`
Contains **200+ hand-curated DSA problems** organized by:
- Arrays (38 problems)
- Strings (28 problems)
- Linked List (20 problems)
- Stack (20 problems)
- Queue/Deque (15 problems)
- Trees (40+ problems)

Problems include:
- Problem name and LeetCode link
- Algorithm pattern
- Difficulty level (Easy/Medium/Hard)

### `src/contexts/AuthContext.tsx`
Handles Google authentication:
- User login/logout
- Auth state management
- Provides auth to entire app

### `src/contexts/ProgressContext.tsx`
Manages problem progress:
- Tracks completed problems
- Saves to Firestore
- Real-time sync across devices
- Export/import functionality

## Development Workflow

### 1. Local Development

```bash
# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Open http://localhost:5173
```

The dev server automatically reloads when you save files.

### 2. Building for Production

```bash
# Type checking
npm run type-check

# Build production bundle
npm run build

# Output: dist/ folder ready for deployment

# Preview production build
npm run preview
```

### 3. Code Quality

```bash
# Run linter
npm run lint

# Type checking (Recommended before commits)
npm run type-check
```

## Key Features Explanation

### Real-time Cloud Sync
- All user data stored in Firestore
- Automatic sync across devices
- Real-time listeners on ProgressContext
- No local storage dependency

### PWA Support
- Service Worker caches app shell
- Offline functionality
- Installable on all devices
- Works without internet

### Problem Tracking
- Mark problems as completed
- Timestamp tracking (date + time)
- Personal notes per problem
- Favorite marking
- Revision tracking

### Analytics
- Daily/weekly/monthly stats
- Contribution heatmap (GitHub style)
- Difficulty distribution pie chart
- Progress line chart
- Completion percentage

## Component Hierarchy

```
App
├── BrowserRouter
│   └── AuthProvider
│       └── ProgressProvider
│           ├── LoginPage
│           ├── DashboardPage
│           │   ├── Navbar
│           │   ├── StatCard (x4)
│           │   └── ProgressBar
│           ├── TrackerPage
│           │   ├── Navbar
│           │   ├── CollapsibleSection (x6)
│           │   │   └── ProblemTable
│           │   └── ImportModal
│           └── AnalyticsPage
│               ├── Navbar
│               ├── StatCard (x4)
│               ├── ProgressChart
│               ├── ContributionHeatmap
│               └── DetailedStats
```

## Data Flow

### Problem Completion Flow
1. User clicks checkbox in ProblemTable
2. `toggleProblem()` called in ProgressContext
3. Problem state updated locally
4. `updateDoc()` saves to Firestore
5. Real-time listener triggers
6. UI updates across all tabs/devices

### Authentication Flow
1. User clicks "Sign in with Google" on LoginPage
2. `loginWithGoogle()` opens Google OAuth popup
3. Firebase handles authentication
4. `onAuthStateChanged()` listens for auth change
5. User data set in AuthContext
6. ProgressProvider initializes user data from Firestore
7. App navigates to Dashboard

## Firebase Integration

### Collections Structure

```
Firestore Database
└── users/
    └── {userId}/
        ├── problems: Problem[] (array of all problems)
        ├── totalSolved: number
        ├── easySolved: number
        ├── mediumSolved: number
        ├── hardSolved: number
        ├── streakDays: number
        ├── lastActivityDate: string
        ├── totalProblems: number
        ├── completionPercentage: number
        ├── dailyGoal: number
        ├── todaysSolved: number
        └── lastUpdated: timestamp
```

### Real-time Listeners

The app uses `onSnapshot()` for real-time updates:
- User progress updates instantly
- Changes sync across devices
- No manual refresh needed

## State Management Pattern

Using React Context + Hooks (no Redux needed):

```typescript
// In component
const { problems, toggleProblem } = useProgress()
const { user, logout } = useAuth()

// Update state
const handleToggle = async (id: string) => {
  await toggleProblem(id)
  // Automatically syncs to Firestore
}
```

## Styling with Tailwind

### Custom Component Classes

Defined in `src/index.css`:

```css
.card { /* Reusable card styling */ }
.btn-primary { /* Primary button */ }
.badge-easy { /* Easy difficulty badge */ }
.input-field { /* Input field */ }
```

### Dark Theme

Custom color palette in `tailwind.config.js`:

```javascript
dark: {
  50: '#f9fafb',
  ...
  900: '#111827',  // Main background
  950: '#030712',
}
```

## Performance Optimizations

1. **Code Splitting**: React Router handles automatic splitting
2. **Tree Shaking**: Vite removes unused code
3. **Image Optimization**: SVG icons (no heavy images)
4. **Lazy Loading**: Components loaded on-demand
5. **Caching**: PWA caches app shell + Firebase data
6. **Database Indexing**: Firestore indexes configured

## Security Best Practices

1. **Firebase Rules**: Only users can read/write their data
2. **No Sensitive Data in LocalStorage**: Everything in Firestore
3. **HTTPS Only**: Automatic on Vercel
4. **API Keys Protected**: Using environment variables
5. **No Personal Data Sharing**: Private by default

## Testing (Recommended Additions)

```bash
# Example: Add testing libraries
npm install --save-dev vitest @testing-library/react @testing-library/user-event
```

Write tests in `__tests__` folders.

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Firebase security rules updated
- [ ] PWA manifest verified
- [ ] Build passes: `npm run build`
- [ ] No console errors in production
- [ ] All features tested
- [ ] Mobile responsiveness checked
- [ ] PWA installable on devices
- [ ] Firestore data persists
- [ ] Cross-device sync working

## Common Tasks

### Add a New Problem

Edit `src/utils/dsaData.ts`:

```typescript
{
  id: 'arr_39',
  dataStructure: 'Arrays',
  name: 'Problem Name',
  link: 'https://leetcode.com/...',
  pattern: 'Pattern Name',
  difficulty: 'Easy',
  completed: false,
}
```

### Add a New Feature

1. Create component in `src/components/`
2. Add types in `src/types/index.ts`
3. Import and use in pages
4. Add styling in `src/index.css` if needed

### Debug Firestore Issues

```typescript
// In console
import { collection, getDocs } from 'firebase/firestore'
import { db } from './utils/firebase'

const userDocs = await getDocs(collection(db, 'users'))
userDocs.forEach(doc => console.log(doc.data()))
```

## Useful Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [Vercel Docs](https://vercel.com/docs)

## Troubleshooting

### Hot Reload Not Working
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Fails
```bash
# Check TypeScript errors
npm run type-check

# Check linting errors
npm run lint
```

### Firebase Connection Issues
- Verify `.env.local` has all variables
- Check Firebase console for errors
- Test with `console.log()` in AuthContext

---

**Happy coding! Build amazing things!** 🚀
