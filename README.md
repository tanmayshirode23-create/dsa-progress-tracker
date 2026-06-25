# DSA Progress Tracker

A modern, production-ready DSA (Data Structures & Algorithms) progress tracker built with React, TypeScript, Vite, Tailwind CSS, and Firebase. Track your DSA learning journey with real-time cloud synchronization across all your devices.

## 🌟 Features

### Core Features
- ✅ **200+ Curated DSA Problems** from LeetCode, NeetCode, Blind 75, and FAANG interviews
- ✅ **Real-time Cloud Sync** - Progress syncs instantly across all devices
- ✅ **Google Authentication** - Secure login with Firebase Auth
- ✅ **Progressive Web App (PWA)** - Install as a native app on any device
- ✅ **Offline Support** - Access your progress even without internet
- ✅ **Beautiful Dark Theme** - Modern, eye-friendly UI
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### Problem Tracking
- 📝 Mark problems as completed with timestamp
- ⭐ Favorite important questions
- 🔖 Add personal notes to each problem
- 🔄 Track revision count and dates
- 📊 Filter by difficulty, pattern, data structure
- 🔍 Full-text search functionality

### Analytics Dashboard
- 📈 Real-time progress charts
- 🔥 Contribution heatmap (GitHub-style)
- 📊 Difficulty distribution pie charts
- 📅 Daily, weekly, and monthly statistics
- 🎯 Completion percentage tracking
- 🏆 Streak counter

### Problem Categories (200+ Problems)
1. **Arrays** (38 problems) - Hashing, Two Pointer, Sliding Window, Binary Search, Prefix Sum, etc.
2. **Strings** (28 problems) - Pattern Matching, Palindrome, KMP, Rabin Karp, etc.
3. **Linked List** (20 problems) - Reversal, Cycle Detection, Merge, LRU concepts
4. **Stack** (20 problems) - Monotonic Stack, Expression Evaluation, Next Greater Element
5. **Queue/Deque** (15 problems) - BFS, Priority Queue, Circular Queue
6. **Trees** (40 problems) - DFS, BFS, BST, Trie, Serialization, LCA, Path Sum

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Firebase project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dsa-progress-tracker.git
   cd dsa-progress-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Google Authentication
   - Create a Firestore database (Start in test mode)
   - Copy your Firebase config

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CollapsibleSection.tsx
│   ├── ContributionHeatmap.tsx
│   ├── DifficultyBadge.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── ProgressBar.tsx
│   ├── ProgressChart.tsx
│   ├── ProblemTable.tsx
│   └── StatCard.tsx
├── contexts/            # React Context for state management
│   ├── AuthContext.tsx
│   └── ProgressContext.tsx
├── pages/               # Page components
│   ├── AnalyticsPage.tsx
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   └── TrackerPage.tsx
├── types/               # TypeScript interfaces
│   └── index.ts
├── utils/               # Utility functions
│   ├── dsaData.ts      # 200+ DSA problems database
│   ├── firebase.ts     # Firebase configuration
│   └── serviceWorker.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🔧 Firebase Setup Guide

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

### Firestore Database Structure
```
users/
├── {uid}/
│   ├── problems: []
│   ├── totalSolved: number
│   ├── easySolved: number
│   ├── mediumSolved: number
│   ├── hardSolved: number
│   ├── streakDays: number
│   ├── lastActivityDate: string
│   ├── totalProblems: number
│   ├── completionPercentage: number
│   ├── dailyGoal: number
│   ├── todaysSolved: number
│   └── lastUpdated: timestamp
```

## 📦 Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🚢 Deploy to Vercel

1. **Connect your repository to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - Add all `VITE_*` variables from `.env.local`

3. **Deploy**
   ```bash
   vercel --prod
   ```

## 📱 Install as PWA

### Desktop
1. Click the install button in the browser address bar
2. Or: Menu → Install DSA Progress Tracker

### Mobile
1. **iOS**: Open in Safari → Share → Add to Home Screen
2. **Android**: Chrome → Menu → Install app

## 🎨 UI/UX Highlights

- **Dark Theme**: Easy on the eyes, perfect for long study sessions
- **Responsive Layout**: Optimized for mobile-first design
- **Smooth Animations**: Subtle transitions for better UX
- **Color-Coded Difficulty**: Green (Easy), Orange (Medium), Red (Hard)
- **Sticky Table Headers**: Easy navigation in large tables
- **Interactive Charts**: Visual representation of progress

## 🔐 Security

- Firebase Authentication for secure login
- Firestore security rules for data privacy
- No sensitive data stored in localStorage
- All data encrypted in transit (HTTPS)
- User data is private and never shared

## 📊 Data Export

- **Export as CSV**: Download all problems and progress
- **Export as JSON**: Full backup of your progress
- **Import from JSON**: Restore previous backups

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **PWA**: vite-plugin-pwa
- **Deployment**: Vercel

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- LeetCode, NeetCode, Blind 75, and Grind 75 for problem lists
- Firebase for excellent backend services
- Vercel for amazing deployment platform
- Tailwind CSS for beautiful utilities

---

**Happy Learning! 🚀 Track your DSA journey and land your dream job!**
