# SavvyNest — MERN Learning Platform

A polished, full-stack online learning platform built with MongoDB, Express, React and Node.js.

## Features
- Responsive learning dashboard with progress overview and course discovery
- Course catalogue with search, category filters and sorting
- Course detail pages with curriculum and lesson list
- JWT authentication (register / login)
- Enrollments and lesson progress tracking
- Student dashboard with continue-learning cards
- Instructor/admin-ready course schema and protected API structure
- Demo mode: sample courses load automatically; MongoDB is required for account/enrollment persistence

## Stack
- Frontend: React, Vite, React Router, Axios, Lucide React
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs
- Database: MongoDB

## Run locally

### 1. Requirements
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

### 2. Backend
```bash
cd server
cp .env.example .env
# Set MONGODB_URI and JWT_SECRET in .env
npm install
npm run seed
npm run dev
```
API runs at `http://localhost:5000`.

### 3. Frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Demo experience
The catalogue is seeded with 6 sample courses. You can browse without signing in. Register or log in to enroll and track lesson progress. Seeded demo accounts:
- Student: `student@savvynest.dev` / `SavvyNest123!`
- Admin: `admin@savvynest.dev` / `SavvyNest123!`

Run `npm run seed` in `server` after configuring MongoDB to create these accounts and courses.

## Environment
`server/.env`
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/savvynest
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/enrollments/:courseId`
- `GET /api/enrollments/me`
- `PATCH /api/enrollments/:courseId/lessons/:lessonId`
- `GET /api/health`

## Production notes
Before deployment, use a strong unique JWT secret, configure Atlas network access, set `CLIENT_URL`, enable HTTPS, and deploy the client and API separately (or serve the built client from Express). Add rate limiting, email verification, password reset, payment integration and instructor moderation before commercial launch.
