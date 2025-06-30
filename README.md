# 🚀 CodeCollab — A Collaborative Coding Platform

![CodeCollab Banner](https://sdmntprwestus2.oaiusercontent.com/files/00000000-1f2c-61f8-b635-414d7a831761/raw?se=2025-06-30T18%3A16%3A17Z&sp=r&sv=2024-08-04&sr=b&scid=b1521431-4be1-55bf-b91e-73c50391dd11&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-29T18%3A53%3A21Z&ske=2025-06-30T18%3A53%3A21Z&sks=b&skv=2024-08-04&sig=eLGmDW/h4SxB11bBgkJmnzprXywH0owDrBOIfVYhjtA%3D) <!-- (Optional: Add a banner image here) -->

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

| Frontend       | Backend        | Database | Real-Time & Others       |
|----------------|----------------|----------|---------------------------|
| React.js       | Node.js        | MongoDB  | WebRTC, Socket.io         |
| Tailwind CSS   | Express.js     | Mongoose | JWT Auth, RESTful APIs    |


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

- Create a `.env` file with:
  ```env
   # Backend API Endpoint
  VITE_API_ENDPOINT=http://localhost:9000/api

  # Firebase Configuration
  VITE_FIRE_API_KEY=your_firebase_api_key
  VITE_FIRE_AUTH_DOMAIN=your_firebase_auth_domain
  VITE_FIRE_PROJECT_ID=your_firebase_project_id
  VITE_FIRE_STORAGE_BUCKET=your_firebase_storage_bucket
  VITE_FIRE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  VITE_FIRE_APP_ID=your_firebase_app_id
  VITE_FIRE_MEASUREMENT_ID=your_firebase_measurement_id
  ```




## 🔐 Auth System

- JWT Token based login
- Firebase auth 
- Auth middleware for protected routes

---

## 🌈 UI & UX

- Built with **Tailwind CSS**
- Responsive, dark-themed design
- Interactive filters, buttons, and badges

---

## 📸 Preview

![CodeCollab Preview](https://res.cloudinary.com/dmhm7q4ow/image/upload/v1751304445/Screenshot_2025-06-30_225819_akz9ci.png) <!-- (Optional: Add screenshot of the UI) -->

---

## 👤 Author

**Sarthak Joshi**   
🔗 [LinkedIn](https://www.linkedin.com/in/sarthakjoshi1535)  
📧 sarthakjoshi12005@gmail.com

---

## 📝 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you find this project helpful, please consider giving it a ⭐ on GitHub to show support and help others discover it.