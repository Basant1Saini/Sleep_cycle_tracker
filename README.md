# Sleep Cycle Tracker

A full-stack sleep tracking app built with the MERN stack.

## Tech Stack

- **MongoDB** – stores sleep logs and user data
- **Express.js** – REST API (v4+)
- **React** – frontend UI (v18+) with Vite
- **Node.js** – backend runtime (v18+)

## Features

- Log sleep and wake times
- Track sleep quality (1–5 rating) and notes
- View sleep duration history
- Average sleep duration on dashboard
- User authentication (JWT)

## Prerequisites

- Node.js >= 18
- MongoDB >= 6

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/sleep-cycle-tracker.git
cd sleep-cycle-tracker
```

### 2. Setup backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

`server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sleep_tracker
JWT_SECRET=your_jwt_secret
```

### 3. Setup frontend

```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`

> Vite proxies `/api` requests to `http://localhost:5000` — no CORS issues in dev.

## Project Structure

```
sleep-cycle-tracker/
├── client/                  # React (Vite)
│   └── src/
│       ├── api/
│       │   └── axios.js     # Axios instance with JWT interceptor
│       ├── components/
│       │   ├── SleepForm.jsx
│       │   └── SleepList.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── App.jsx          # Auth context + React Router v6
│       └── main.jsx
└── server/                  # Express + MongoDB
    ├── middleware/
    │   └── auth.js          # JWT verification
    ├── models/
    │   ├── Sleep.js         # sleepTime, wakeTime, quality, notes
    │   └── User.js          # name, email, password (hashed)
    ├── routes/
    │   ├── auth.js          # /api/auth/register, /api/auth/login
    │   └── sleep.js         # /api/sleep CRUD
    ├── .env.example
    └── index.js
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/sleep` | Yes | Get all sleep logs |
| POST | `/api/sleep` | Yes | Add sleep log |
| DELETE | `/api/sleep/:id` | Yes | Delete sleep log |

### Sleep Log Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sleepTime` | Date | Yes | When you fell asleep |
| `wakeTime` | Date | Yes | When you woke up |
| `quality` | Number (1–5) | No | Sleep quality rating |
| `notes` | String | No | Optional notes |

## License

MIT
