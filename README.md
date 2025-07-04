# 📝 iNotebook - A Cloud-Based Note-Taking App using React JS

iNotebook is a secure and intuitive React-based note-taking web application that allows users to create, update, and delete notes from anywhere. It integrates frontend and backend technologies including MongoDB, Express, and Node.js, ensuring data persistence and authentication via JWT.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 📓 Create, edit, and delete personal notes
- ☁️ Notes stored securely in MongoDB database
- ⚙️ Backend API integration using Fetch API
- 🌐 Responsive Bootstrap UI
- 🛡️ Password encryption using Bcrypt.js
- ✉️ Email & password validation during signup/login
- 🧭 Smooth routing with React Router

---

## 🛠️ Tech Stack

| Layer        | Technology                      |
|--------------|----------------------------------|
| Frontend     | React JS, Bootstrap              |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB (via Mongoose)           |
| Auth & API   | JWT, Bcrypt, Fetch API           |
| Routing      | React Router DOM                 |

---

## 📸 Screenshots

| Login Page                          | Notes Dashboard                     |
|------------------------------------|-------------------------------------|
| ![Login](./screenshots/login.png)  | ![Dashboard](./screenshots/note.png) |

---

## 📂 Folder Structure

```

iNotebook/
├── backend/               # Node.js + Express API
│   ├── routes/
│   ├── models/
│   ├── db.js
│   └── ...
├── frontend/              # React App
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── ...
├── .env
├── package.json
└── README.md

````

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AmanStarLitePro/iNotebook.git
cd iNotebook
````

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

The app will run at `http://localhost:3000`.

---

## 🧪 Sample API Routes

| Method | Route                      | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | /api/auth/createuser       | Register user        |
| POST   | /api/auth/login            | Login user           |
| GET    | /api/notes/fetchallnotes   | Fetch all user notes |
| POST   | /api/notes/addnote         | Add new note         |
| PUT    | /api/notes/updatenote/\:id | Update note          |
| DELETE | /api/notes/deletenote/\:id | Delete note          |

---

## 📌 Future Enhancements

* 🌓 Dark mode toggle
* 🖼️ Rich text editor for notes
* 📱 Mobile PWA support
* 🔔 Reminders and notifications
* 📁 Note categories or folders

---


## 👨‍💻 Author

**Aman Kumar**
📧 [amankumarsrivastav124@gmail.com](mailto:amankumarsrivastav124@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/aman-kumar-srivastav-aa438b28b/)
🌐 [GitHub](https://github.com/AmanStarLitePro)

---

> “Your notes, your cloud — always accessible, always secure. Welcome to iNotebook.”
