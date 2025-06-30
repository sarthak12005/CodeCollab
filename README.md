# 🚀 CodeCollab — A Collaborative Coding Platform

![CodeCollab Banner](https://imgur.com/your-banner-url.png) <!-- (Optional: Add a banner image here) -->

A modern, full-stack web application designed for collaborative coding, problem-solving, and tracking progress across challenges. Built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), CodeCollab provides a dynamic interface to search, solve, and manage coding problems effectively.

🌐 **Live Website**: [code-collab-sable.vercel.app](https://code-collab-sable.vercel.app)

---

## ✨ Features

- 🧠 **Filterable Problems List**  
  Filter questions by difficulty, tags, status, and companies.

- 🔍 **Real-time Search**  
  Instantly search problems by title or description.

- ⭐ **Favorites System**  
  Star problems you want to save for later.

- 🏆 **Solved Tracker**  
  Track which problems you've solved or attempted.

- 🔐 **JWT-Based Authentication**  
  Secure login and protected routes for personalized experience.

- 📚 **User Profiles**  
  View user info including profile photo and activity.

---

## 🛠️ Tech Stack

| Frontend   | Backend     | Database |
|------------|-------------|----------|
| React.js   | Node.js     | MongoDB  |
| Tailwind CSS | Express.js | Mongoose |

---

## 📂 Folder Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Page Components
│   │   ├── context/     # Auth Context
│   │   └── App.jsx
│
├── server/              # Node + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sarthak12005/code-collab.git
cd code-collab
```

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

- Create a `.env` file with:
  ```env
  MONGO_URI=your_mongodb_connection
  JWT_SECRET=your_jwt_secret
  ```

```bash
npm start
```

### 3. Setup Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```

---

## 🔐 Auth System

- JWT Token based login
- Google OAuth (if integrated)
- Auth middleware for protected routes

---

## 🌈 UI & UX

- Built with **Tailwind CSS**
- Responsive, dark-themed design
- Interactive filters, buttons, and badges

---

## 📸 Preview

![CodeCollab Preview](https://imgur.com/your-preview-url.png) <!-- (Optional: Add screenshot of the UI) -->

---

## 👤 Author

**Sarthak Joshi**  
💼 [Portfolio](https://sarthak12005.github.io)  
🔗 [LinkedIn](https://www.linkedin.com/in/sarthak12005)  
📧 sarthakjoshi12005@gmail.com

---

## 📝 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you find this project helpful, please consider giving it a ⭐ on GitHub to show support and help others discover it.