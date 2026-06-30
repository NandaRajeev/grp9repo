# 📝 NoteTracker

A modern full-stack note management application built using the MERN Stack. Users can securely sign in, create and organize notes, track their progress using status categories, and manage their personal notes through an intuitive dashboard.

## 🌐 Live Demo

**Frontend:** https://project-c507532a-27c6-463e-bea.web.app

**Backend API:** https://note-tracker-api-356019879858.asia-south1.run.app

---

## ✨ Features

- 🔐 Authentication using Clerk
- 📧 Email & Password Sign In
- 🌐 Google Sign In
- 📝 Create, Edit and Delete Notes
- 📌 Track note status (Pending, In Progress, Completed)
- 🔍 Search notes instantly
- 📊 Dashboard with note statistics
- 👤 Each user can access only their own notes
- 📱 Responsive and modern UI

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- CSS
- Clerk Authentication

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Authentication
- Clerk

### Deployment

- Firebase Hosting (Frontend)
- Google Cloud Run (Backend)

---

## 📂 Project Structure

```
grp9repo/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/NandaRajeev/grp9repo.git
cd grp9repo
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
```
> For production deployment, configure the same environment variables in Google Cloud Run.

Start the backend server:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder.

Example:

```env
# Local Development
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
VITE_API_URL=http://localhost:5000

# Production
# Change VITE_API_URL to your deployed backend URL
# VITE_API_URL=https://note-tracker-api-356019879858.asia-south1.run.app
```

Start the frontend:

```bash
npm run dev
```

---

## 📖 Usage

1. Register using Email or Google.
2. Log in securely.
3. Create new notes.
4. Update note status.
5. Search and filter notes.
6. Edit or delete notes.
7. View dashboard statistics.

---

## 🔒 Authentication

Authentication is implemented using **Clerk**.

Users can:

- Register using Email & Password
- Sign in using Email/Username & Password
- Continue with Google
- Stay logged in securely

Each authenticated user can only access their own notes.

---

## 👨‍💻 Author

1. **Aibin James Burby**
2. **Arunima Nithin Nair**
3. **Hridya K K**
4. **Nanda Rajeev**
5. **Swathi M**

MERN Stack Capstone Project
