# Note Taking App with Status Tracker

A full-stack note management app built with the MERN stack. Users can register, log in, and manage their own notes with status tracking, search, and filtering — all behind JWT-based authentication.

---

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- dotenv, cors

**Frontend**
- React 19 + Vite
- React Router DOM (client-side routing)
- Axios (with auto auth interceptor)
- Lucide React (icons)

---

## Features

- **Authentication** — Register and login with JWT. Token stored in localStorage, verified on every app load via `/api/auth/me`.
- **Protected routes** — Dashboard is inaccessible without a valid token. Auth pages redirect away if already logged in.
- **Per-user notes** — Every note is scoped to the logged-in user. No user can see or modify another user's notes.
- **CRUD** — Create, read, update, and delete notes via modal form.
- **Status tracking** — Each note has a status: Pending, In Progress, or Completed. Change it inline from the card.
- **Search** — Debounced search across note titles and descriptions.
- **Filter** — Filter notes by status (All / Pending / In Progress / Completed).
- **Stats dashboard** — Animated count-up cards showing total, pending, in-progress, and completed notes with progress bars.
- **Toasts** — Non-blocking notifications for every action (create, update, delete, status change).
- **Confetti** — Triggers when a note is marked Completed.
- **Loading skeletons** — Shown while notes are fetching on first load.
- **Responsive** — Works on mobile and desktop.

---

## Project Structure

```
grp9repo/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env              ← you create this
│   ├── .env.example
│   └── server.js
│
└── my-react-app/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Dashboard.jsx
        ├── services/
        │   ├── api.js
        │   ├── authService.js
        │   └── noteService.js
        ├── App.jsx
        └── main.jsx
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| GET | `/api/auth/me` | Get logged-in user | Yes |

### Notes
All note endpoints require a valid JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get user's notes (supports `?status=` and `?search=`) |
| POST | `/api/notes` | Create a note |
| GET | `/api/notes/stats` | Get count stats for dashboard |
| GET | `/api/notes/:id` | Get single note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo

```bash
git clone <repo-url>
cd grp9repo
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/notetracker
JWT_SECRET=your_super_secret_key
```

Start the server:

```bash
node server.js
```

You should see:
```
Server Running on Port 5000
MongoDB Connected
```

### 3. Set up the frontend

```bash
cd my-react-app
npm install
npm install react-router-dom
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the Express server (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

---

## Authentication Flow

```
Register / Login
      ↓
JWT returned from server
      ↓
Saved to localStorage
      ↓
AuthContext loads user via /api/auth/me on startup
      ↓
Axios interceptor attaches token to every request
      ↓
Backend verifies JWT → attaches req.user
      ↓
Notes are scoped to req.user._id
      ↓
Dashboard renders user's own notes only
```

---

## Notes Schema

```js
{
  user:        ObjectId  // reference to User
  title:       String    // required
  description: String    // required
  status:      String    // "Pending" | "In Progress" | "Completed"
  createdAt:   Date
  updatedAt:   Date
}
```

---

## MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write access
3. Under **Network Access**, add `0.0.0.0/0` to allow connections from anywhere
4. Copy the connection string into your `.env` as `MONGO_URI`
