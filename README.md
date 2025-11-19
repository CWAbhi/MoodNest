# MoodNest - Digital Journal & Mood Tracker

A full-stack web application for journaling and mood tracking with beautiful 3D animations and mood-psychology-based design.

##  Features

- ** Mood Tracking**: Track emotions with beautiful visualizations and gain insights into mental patterns
- ** Digital Journaling**: Express thoughts in a secure, private space designed for reflection and growth
- ** Analytics & Insights**: Understand emotional journey with detailed analytics and personalized insights
- ** 3D Animations**: Beautiful Three.js animations with floating mood orbs and interactive elements
- ** Mood Psychology Colors**: Calming color palette based on psychological research
- ** Secure Authentication**: JWT-based authentication with HTTP-only cookies
- ** Responsive Design**: Fully responsive across all devices
- ** Real-time Updates**: Live mood tracking and instant feedback

## Tech Stack

### Frontend
- **React.js** - Modern UI library
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Three.js / React-Three-Fiber** - 3D graphics and animations
- **Recharts** - Beautiful charts and analytics
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Zustand** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database (via Supabase)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase (PostgreSQL)

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moodnest.git
   cd moodnest
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Copy environment variables
   cp .env.example .env
   
   # Edit .env with your database URL and JWT secret
   # DATABASE_URL="postgresql://username:password@localhost:5432/moodnest"
   # JWT_SECRET="your-super-secret-jwt-key"
   
   # Generate Prisma client and push schema
   npx prisma generate
   npx prisma db push
   
   # Start development server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Start development server
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
moodnest/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── three/          # 3D components
│   │   ├── styles/         # CSS styles
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── prisma/         # Database schema
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md
```

##  Color Palette (Mood Psychology Based)

- **Calm Blue** (#A4C2F4) - Reduces stress and promotes tranquility
- **Soft Purple** (#CDB4FF) - Encourages reflection and creativity
- **Mint Green** (#C1F2D5) - Represents healing and positivity
- **Warm Yellow** (#FFE680) - Inspires optimism and energy
- **Deep Navy** (#1A1F3A) - Provides grounding and contrast

##  API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Journal Entries
- `GET /api/entries` - Get user entries (with pagination, search, filter)
- `GET /api/entries/:id` - Get specific entry
- `POST /api/entries` - Create new entry
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry

### Mood Tracking
- `GET /api/mood` - Get user moods
- `POST /api/mood` - Log new mood
- `GET /api/mood/summary` - Get mood analytics and insights

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Use the provided `render.yaml` configuration
3. Set environment variables in Render dashboard
4. Deploy automatically on push to main branch

### Database (Supabase)
1. Create a new Supabase project
2. Copy the PostgreSQL connection string
3. Update `DATABASE_URL` in your environment variables
4. Run `npx prisma db push` to create tables

---

**Made with ❤️ for mental wellness and self-reflection**
