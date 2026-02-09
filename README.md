ChatIn — Real-Time Language Exchange Platform
ChatIn connects language learners worldwide through instant messaging and voice calls. Built with a scalable MERN stack and real-time Stream SDK integration, it delivers seamless communication with secure authentication, persistent profiles, and personalized themes.

Live Demo
Launch ChatIn - https://chatin-livechatapp.onrender.com

✨ Core Features
Secure Authentication
JWT tokens stored in HTTP-only cookies

Protected routes with automatic session validation

Persistent login state across browser sessions

Secure logout with immediate redirects

Comprehensive User Onboarding
Multi-step profile completion flow

Profile picture upload and management

Native/secondary language preferences

Location and bio customization

Persistent profile state across sessions

Real-Time Messaging
Instant message delivery with typing indicators

Optimistic UI updates via React Query

Message persistence and caching

Dynamic conversation routing

Voice Calling
One-to-one WebRTC calling

Dynamic call route generation

Streamlined connection handling

Robust stream-based communication

Smart Notifications
Real-time friend request alerts

Interaction and message notifications

Dedicated notifications dashboard

Customizable Themes
Multiple DaisyUI themes

Persistent theme selection via Zustand

Global theme application through HTML data attributes

🛠 Modern Tech Stack
Frontend
text
React 18    React Router   Zustand     React Query
Tailwind    DaisyUI        Stream SDK  Axios
Backend
text
Node.js     Express.js     MongoDB     Mongoose
JWT         Cookie Parser  CORS
Deployment
text
Backend: Render
Frontend: Static hosting
Database: MongoDB Atlas
🎯 Application Flow
text
1. AUTH → 2. ONBOARDING → 3. DISCOVER → 4. CHAT/CALL
   ↓              ↓             ↓           ↓
JWT Cookie  Profile Setup   User Search  Real-time Comm
Detailed Flows:

Authentication: Signup/Login → JWT cookie → Session validation → Protected access

Onboarding: Profile completion → Database persistence → Full platform access

Chat: Contact selection → Cached messages → Real-time updates → Optimistic UI

Calls: Call initiation → Dynamic route → Stream connection → Active communication

Themes: Selection → localStorage → Global HTML attribute → Instant UI refresh

📁 Clean Architecture
text
ChatIn/
├── backend/
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   ├── models/         # MongoDB schemas
│   ├── middleware/     # Auth & validation
│   └── server.js
├── frontend/
│   ├── components/     # Reusable UI
│   ├── pages/          # Route components
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand stores
│   └── main.jsx
└── README.md
🔌 Environment Variables
Backend (.env)

bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret
CLIENT_URL=http://localhost:5173
Frontend (.env)

bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_key
🚀 Quick Start
bash
# Clone & Install
git clone <repo-url>
cd ChatIn
npm install

# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
Production:

bash
# Frontend Build
cd frontend
npm run build

# Backend Production
cd backend
npm start
📋 API Endpoints
text
Auth:
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Users:
PUT  /api/users/onboarding
GET  /api/users

Chat:
GET  /api/chat/:id
POST /api/chat/send
🎓 Key Engineering Concepts
Protected Route Architecture with granular access control

HTTP-only JWT Cookies for secure session management

React Query for intelligent server state caching

Zustand for lightweight global state

Stream SDK for production-grade real-time communication

Modular Backend with RESTful API design

Production Deployment configuration

🔮 Future Roadmap
Group chat functionality

Message reactions and threading

File/image sharing

Push notifications

Online presence indicators

Admin moderation dashboard

📄 License
Educational & portfolio project. Free to fork, modify, and showcase.

Built with ❤️ for language learners worldwide

Would you like me to adjust the technical depth, add screenshots sections, or emphasize any particular feature more prominently?



