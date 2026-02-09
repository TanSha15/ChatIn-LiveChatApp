# ChatIn — Real-Time Global Communication Platform

## Working Link

[https://chatin-livechatapp.onrender.com]

---

## Overview

ChatIn is a full‑stack real‑time communication platform designed to connect users based on language preferences. The application enables users to discover others, chat instantly, and initiate calls while maintaining secure authentication and persistent user profiles.

The platform focuses on real‑time interaction, scalable architecture, and user personalization through onboarding, themes, and protected communication routes.

The system follows a modern client–server architecture using the MERN stack combined with real‑time communication services and optimized state management.

---

## Core Features

### Authentication & Security

* Secure JWT authentication using HTTP‑only cookies
* Login and signup flow
* Protected routes based on authentication state
* Persistent session handling
* Automatic redirect on logout

### User Onboarding

* Profile completion after signup
* Profile picture support
* Bio and location storage
* Native and secondary language preferences
* Stored user profile state across sessions

### Real‑Time Chat

* Instant messaging between users
* Typing indicators
* Message persistence
* Conversation routing via dynamic routes
* Optimistic UI updates using React Query caching

### Calls

* One‑to‑one calling support
* Dynamic call routes
* Stream based communication integration

### Notifications System

* Friend request notifications
* Interaction updates
* Dedicated notifications page

### Theme System

* Multiple UI themes using DaisyUI
* Persistent theme selection using Zustand
* Theme applied globally using HTML data attributes

### Routing & Access Control

* Auth‑guarded pages
* Onboarding guard before accessing platform
* Conditional layout rendering

### Deployment Ready

* Backend deployed on Render
* Production build configuration
* Environment‑based API configuration

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Zustand (global theme state)
* TanStack React Query (server state management)
* Tailwind CSS + DaisyUI (UI and theming)
* Stream Chat React SDK
* Axios
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Cookie Parser
* CORS configuration
* Stream API integration

### Database

* MongoDB

### Deployment

* Render
---

## Application Flow

### 1. Authentication Flow

1. User signs up or logs in
2. Server generates JWT and stores it in HTTP‑only cookie
3. Frontend validates session using auth user query
4. Unauthorized users are redirected to login

### 2. Onboarding Flow

1. New users redirected to onboarding page
2. User completes profile details
3. Profile stored in database
4. User gains access to application features

### 3. Chat Flow

1. User selects a contact
2. Chat route loads conversation
3. Messages fetched and cached via React Query
4. Real‑time updates handled via Stream SDK
5. UI updates instantly with optimistic rendering

### 4. Call Flow

1. User initiates call
2. Unique call route generated
3. Stream handles connection between participants

### 5. Theme Flow

1. User selects theme
2. Theme stored in localStorage
3. HTML data attribute updated
4. UI updates globally without reload

---

## Folder Structure

```
ChatIn
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── lib
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── store
│   ├── constants
│   ├── lib
│   └── main.jsx
│
└── package.json
```

---

## Environment Variables

### Backend (.env)

```
PORT=
MONGO_URI=
JWT_SECRET=
STREAM_API_KEY=
STREAM_API_SECRET=
CLIENT_URL=
```

### Frontend (.env)

```
VITE_API_BASE_URL=
VITE_STREAM_API_KEY=
```

---

## Running Locally

### Clone Repository

```
git clone <repo-url>
cd ChatIn
```

### Install Dependencies

```
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Start Development Servers

Backend

```
cd backend
npm run dev
```

Frontend

```
cd frontend
npm run dev
```

---

## Production Build

Frontend

```
npm run build
```

Backend

```
npm start
```

---

## API Overview

### Auth

* POST /api/auth/signup
* POST /api/auth/login
* POST /api/auth/logout
* GET /api/auth/me

### Users

* PUT /api/users/onboarding
* GET /api/users

### Chat

* GET /api/chat/:id
* POST /api/chat/send

---

## Key Concepts Demonstrated

* Protected route architecture
* Persistent authentication using cookies
* Global state management
* Server state caching and invalidation
* Real‑time communication integration
* Production deployment configuration
* Modular backend architecture

---

## Future Improvements

* Group chat support
* Message reactions
* File sharing
* Push notifications
* Online presence indicators
* Admin moderation tools

---

## License

This project is for educational and portfolio purposes.
