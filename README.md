# 🚀 AI Interview Prep Platform

A full-stack application that helps candidates prepare smarter for interviews using AI-driven insights, personalized question generation, and structured preparation plans.

---

## 🌐 Live Demo

👉 Try the app here: https://prep-ai-pied-pi.vercel.app/

---

## 🔑 Demo Credentials

Use the following credentials to explore the app without signing up:

* **Email:** test@gmail.com
* **Password:** pass123

---

## 🌟 What This Project Does

This platform takes in:

* Job description
* Candidate profile (self-description)
* Resume

…and generates:

* 🎯 **Targeted technical questions with answers**
* 💬 **Behavioral interview questions with answers**
* 📅 **A personalized 7-day preparation roadmap**
* 📄 **An improved, downloadable resume**

The goal is simple: **bridge the gap between preparation and real interview expectations.**

---

## 🧠 Key Highlights

* AI-driven interview preparation tailored to each user
* Real-world, role-specific questions instead of generic practice
* Structured roadmap to avoid unfocused preparation
* Resume enhancement for better alignment with job roles
* Secure authentication and user session handling

---

## 🔐 Authentication & Security

* JWT-based authentication
* Password hashing using bcrypt
* Secure cookies (`httpOnly`, `secure`, `sameSite`)
* Protected backend routes

---

## 🛠️ Tech Stack

**Frontend**

* React (Vite)
* JavaScript
* SCSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**AI Integration**

* Gemini API

---

## ⚙️ How It Works

1. User signs up / logs in
2. Provides:

   * Job description
   * Personal background
   * Resume
3. Backend processes input and sends it to the AI model
4. AI returns:

   * Interview questions + answers
   * 7-day roadmap
   * Resume improvements
5. User can review and download results

---

## 📦 Setup Instructions

```bash id="326r2q"
# Clone the repo
git clone <repo-url>

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

Create a `.env` file in the backend:

```env id="4pq4om"
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

Run the project:

```bash id="ccul46"
# backend
npm run dev

# frontend
npm run dev
```

---


## 🚧 Future Improvements

* Mock interview simulation with feedback
* AI-based answer evaluation
* Progress tracking dashboard
* Multi-role preparation support

---


