# JobReady - AI-Powered Job Portal 🚀

![JobReady Banner](https://placehold.co/1200x400/2563eb/ffffff?text=JobReady+-+AI+Powered+Career+Platform)

**JobReady** is a production-grade, full-stack MERN application designed to streamline the job search process with the power of Artificial Intelligence. It features an ATS-friendly resume builder, AI-driven keyword optimization, and intelligent job matching analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_19-cyan)
![Node](https://img.shields.io/badge/backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green)
![Tailwind](https://img.shields.io/badge/styles-Tailwind_CSS-38bdf8)
![AI](https://img.shields.io/badge/AI-Gemini_Flash_1.5-purple)

## ✨ Key Features

### 🤖 AI-Powered Tools
- **Resume Analysis**: Submit your resume and a target job description to get an instant **ATS Score**, missing keywords, and improvement suggestions via Google Gemini AI.
- **Keyword Generator**: Automatically generate role-specific keywords to optimize your resume for applicant tracking systems.

### 📄 Resume Builder
- **Multiple Templates**: Choose from Modern, Professional, and Minimal designs.
- **Real-time Preview**: See changes as you type.
- **PDF Export**: Verified professional formatting.

### 💼 Jobs Dashboard
- **Smart Search**: Filter jobs by keyword, experience level, and recency.
- **One-Click Apply**: Apply to jobs directly using your stored resumes.
- **Application Tracking**: Monitor status of all your applications (Applied, Interview, etc.).

### 🔒 Secure & Scalable
- **JWT Authentication**: Secure user sessions with HttpOnly rules.
- **Production Grade**: Implements Rate Limiting, Helmet Security Headers, and Input Validation (Joi).
- **Cloudinary Integration**: Optimized image storage for user profiles.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **State/Routing**: React Router DOM 7, Context API
- **Performance**: Custom Hooks (`useDebounce`), Skeleton Loading

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB (Mongoose) + Text Indexes
- **AI Engine**: Google Generative AI (`gemini-1.5-flash`)
- **Security**: Helmet, XSS-Clean, Mongo-Sanitize, Rate-Limit

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Cloudinary Account
- Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/job-ready.git
    cd job-ready
    ```

2.  **Install Dependencies**
    ```bash
    # Install Backend Deps
    cd backend
    npm install

    # Install Frontend Deps
    cd ../frontend
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `backend` directory:
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/jobready
    JWT_SECRET=your_super_secret_key
    
    # Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # AI
    GEMINI_API_KEY=your_gemini_key
    ```

4.  **Run the Application**

    **Backend:**
    ```bash
    cd backend
    npm run dev
    # Server runs on http://localhost:5000
    ```

    **Frontend:**
    ```bash
    cd frontend
    npm run dev
    # Client runs on http://localhost:5173
    ```

---

## 📸 Screenshots

### Landing Page
_Clean, conversion-focused landing page introducing the platform._
![Landing Page](./docs/screenshots/landing.png)

### Dashboard
_Central hub for managing resumes and job applications._
![Dashboard](./docs/screenshots/dashboard.png)

### AI Analysis Result
_Detailed breakdown of resume performance against job descriptions._
![AI Analysis](./docs/screenshots/analysis.png)

---

## 📡 API Documentation

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user | Public |
| `POST` | `/api/auth/login` | Login user | Public |
| `GET` | `/api/jobs` | Fetch jobs with filters | Public |
| `POST` | `/api/jobs/:id/apply` | Apply to a job | User |
| `GET` | `/api/resumes` | Get user resumes | User |
| `POST` | `/api/ai/analyze-resume`| Get ATS Score & Feedback | User |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
