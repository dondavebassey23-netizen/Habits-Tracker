
[README.md](https://github.com/user-attachments/files/24680013/README.md)
# 🚀 Habit Tracker API

## 📌 Description
Habit Tracker is a backend API designed to help users create, manage, and track their daily habits.  
It supports habit completion, streak tracking, notifications (email & in-app), and analytics.

Users can register, verify their email, add habits, mark completions, view their habit streaks, and receive automated reminders.

---

## ✨ Features Implemented

### 🔐 User Authentication
- Registration with email verification
- Login with JWT authentication

### 📋 Habit Management
- Create, update, delete habits
- Fetch all active habits for a user

### ✅ Habit Completion
- Mark habits as completed
- Duplicate completion prevention
- Streak calculation (current & longest)

### 🔔 Notifications
- In-app notifications stored in DB
- Email reminders:
  - Daily habits
  - Missed habits
  - Streak warnings

### 📊 Analytics
- Total habits
- Total completions
- Current streaks
- Longest streaks

### 🛡 Rate Limiting
- Prevents abuse of login & register endpoints

### 🧪 Validation
- Joi validation for:
  - User registration
  - Habit creation
  - Habit completion

---

## 🧰 Tech Stack
- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **MongoDB & Mongoose** – Database & ODM
- **JWT** – Authentication
- **Bcrypt.js** – Password hashing
- **Nodemailer** – Email service
- **Node-Cron** – Scheduled jobs
- **Joi** – Request validation

---

## 📂 Folder Structure
```
src/
├─ controllers/      # API route handlers
├─ models/           # MongoDB models (User, Habit, Completion, Notification)
├─ routes/           # Express routes
├─ services/         # Business logic
├─ middleware/       # Auth, validation, rate-limiting
├─ jobs/             # Cron jobs (daily reminders, streak warnings)
├─ utils/            # Helpers (email sending, token generation)
├─ validators/       # Joi schemas
└─ app.js            # Main Express app
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/habit-tracker-api.git
cd habit-tracker-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
BACKEND_URL=http://localhost:5000
```

### 4️⃣ Run the server
```bash
npm run dev
```

---

## 🔗 API Endpoints

### 🔐 Auth
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/register | Register user (email verification sent) |
| POST | /api/auth/login | Login user (JWT issued) |
| GET | /api/auth/verify-email/:token | Verify email |

### 📋 Habits
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/habits | Create habit |
| GET | /api/habits | Get all active habits |
| PUT | /api/habits/:id | Update habit |
| DELETE | /api/habits/:id | Delete habit (soft delete) |

### ✅ Completions
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/completions | Mark habit completed |
| GET | /api/completions/streak/:habitId | Get habit streak |

### 🔔 Notifications
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /api/notifications | Fetch notifications |
| PATCH | /api/notifications/:id/read | Mark as read |

### 📊 Analytics
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /api/analytics | Fetch analytics |

---

## 📧 Email Notifications
- ⏰ Daily reminder – 8 AM
- ⚠️ Missed habit alert – 9 AM
- 🔥 Streak warning – 7 PM

---

## ⚡ Performance Optimization
- Indexed:
  - `User.email`
  - `Habit.user`
  - `Completion.user + habit + date`
  - `Notification.user + isRead`
- Optimized queries using `.select()` & `.countDocuments()`
- Parallel execution with `Promise.all()`

---

## 🛣 Roadmap / Next Steps
- User-configurable reminder times
- Push notifications (mobile/web)
- Weekly summary emails
- Frontend integration

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/your-feature
```
3. Commit changes
```bash
git commit -m "Add feature"
```
4. Push branch
```bash
git push origin feature/your-feature
```
5. Open a Pull Request

---

## 📜 License
MIT License © 2026
