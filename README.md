# Smart Complaint & Public Feedback App

## 📚 University Development Project (UDP)

**Student Name:** Pratham Darji  
**Enrollment Number:** 2305101020015  
**Department:** BscIT  
**Semester:** 6  
**Academic Year:** 2025-2026

---

## 📖 Project Overview

This is my University Development Project (UDP) - a comprehensive complaint management system designed to streamline the complaint handling process in educational institutions. The application allows students to raise complaints and provide feedback, while administrators can efficiently manage and resolve these complaints.

Built with modern technologies including React Native (Expo), NativeWind, Node.js, Express, and MongoDB, this project demonstrates full-stack mobile application development skills learned throughout my academic journey.

## 🎯 Project Objectives

1. **Problem Statement:** Develop a mobile application to digitize the complaint management process in universities
2. **Solution:** Create an intuitive, role-based system for students and administrators
3. **Learning Goals:**
   - Master full-stack mobile development
   - Implement RESTful API architecture
   - Work with NoSQL databases
   - Understand authentication and authorization
   - Deploy a production-ready application

## ✨ Features

### Student Features

- ✅ User registration and authentication
- ✅ Dashboard with complaint statistics
- ✅ Raise new complaints with title, description, and category
- ✅ View all personal complaints
- ✅ View detailed complaint status and admin responses
- ✅ Submit feedback for resolved complaints (rating 1-5 + comment)
- ✅ View and edit profile
- ✅ Secure logout

### Admin Features

- ✅ Admin authentication
- ✅ Dashboard with comprehensive statistics
- ✅ View all complaints with filtering by category and status
- ✅ Update complaint status (Pending → In Progress → Resolved)
- ✅ Add admin responses to complaints
- ✅ View all student feedbacks
- ✅ Manage student users (activate/deactivate/delete)
- ✅ View and manage student profiles

## 🛠 Tech Stack

### Frontend

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **NativeWind** - Tailwind CSS for React Native
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **AsyncStorage** - Local data persistence
- **TypeScript** - Type safety

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```bash
smart-complaint-feedback-app/
├── backend/                    # Backend server
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth middleware
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   └── server.js          # Server entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
├── src/                       # React Native source
│   ├── components/            # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ComplaintCard.tsx
│   │   ├── StatCard.tsx
│   │   └── Loading.tsx
│   ├── context/              # Context providers
│   │   └── AuthContext.tsx
│   ├── navigation/           # Navigation setup
│   │   ├── AuthNavigator.tsx
│   │   ├── StudentNavigator.tsx
│   │   ├── AdminNavigator.tsx
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/              # Application screens
│   │   ├── auth/             # Authentication screens
│   │   ├── student/          # Student screens
│   │   └── admin/            # Admin screens
│   ├── services/             # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── complaintService.ts
│   │   ├── feedbackService.ts
│   │   └── userService.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   └── utils/                # Helper functions
│       └── helpers.ts
│
├── App.tsx                   # App entry point
├── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Expo CLI
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update MongoDB connection string if needed

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/complaint-feedback-db
   JWT_SECRET=udp_complaint_feedback_secret_2025
   NODE_ENV=development
   ```

4. **Start MongoDB:**

   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Start the backend server:**

   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to project root:**

   ```bash
   cd ..
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Update API URL:**
   - Open `src/services/api.ts`
   - Update `API_URL` to your backend URL
   - For physical device: Use your computer's IP address

   ```typescript
   const API_URL = 'http://192.168.x.x:5000/api'; // Replace with your IP
   ```

4. **Start the Expo development server:**

   ```bash
   npm start
   ```

## 📱 Running the Application

### Using Expo Go (Easiest)

1. Install **Expo Go** app on your mobile device
2. Scan the QR code from terminal with Expo Go
3. App will load on your device

### Using Android Emulator

```bash
npm run android
```

### Using iOS Simulator (Mac only)

```bash
npm run ios
```

## 👥 User Roles

### Default Admin Account

- **Email:** admin@college.edu
- **Password:** admin123

> **Note:** Create this admin account manually in MongoDB or create a seed script.

### Student Account

Students can register through the app:

- Name, Email, Password
- Enrollment Number
- Department
- Semester
- Phone (optional)

## Database Models

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  phone: String,
  enrollmentNumber: String (unique),
  department: String,
  semester: Number,
  isActive: Boolean,
  timestamps: true
}
```

### Complaint Model

```javascript
{
  title: String,
  description: String,
  category: String (enum),
  status: String (Pending/In Progress/Resolved),
  student: ObjectId (ref: User),
  adminResponse: String,
  resolvedAt: Date,
  hasFeedback: Boolean,
  timestamps: true
}
```

### Feedback Model

```javascript
{
  complaint: ObjectId (ref: Complaint),
  student: ObjectId (ref: User),
  category: String,
  rating: Number (1-5),
  comment: String,
  timestamps: true
}
```

## 🎯 Complaint Categories

- Infrastructure
- Cleanliness
- Faculty
- IT
- Library
- Security
- General

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected API routes
- Token expiration handling
- Secure password requirements

## 🎨 UI Features

- Clean and modern design
- Responsive layout
- Status color coding
- Pull-to-refresh functionality
- Loading states
- Error handling
- Toast notifications
- Form validation

## 📝 Notes for College Submission

### Demonstration Points

1. **Registration Flow** - Show student registration
2. **Login** - Demonstrate both student and admin login
3. **Student Features** - Raise complaint, view status, submit feedback
4. **Admin Features** - Manage complaints, update status, view analytics
5. **Real-time Updates** - Show how status changes reflect immediately
6. **Feedback System** - Only available for resolved complaints

### Key Highlights for Viva

- **Scalability**: MongoDB for handling large datasets
- **Security**: JWT authentication, password hashing
- **User Experience**: Intuitive UI, real-time updates
- **Role Management**: Separate interfaces for students and admins
- **Data Validation**: Both frontend and backend validation
- **Error Handling**: Comprehensive error messages
- **Code Organization**: Clean, modular architecture

## 📚 Learning Outcomes

Through this UDP project, I have gained hands-on experience in:

1. **Mobile App Development** - React Native and Expo framework
2. **Backend Development** - Node.js, Express.js, and RESTful APIs
3. **Database Management** - MongoDB and Mongoose ODM
4. **Authentication** - JWT-based secure authentication
5. **State Management** - React Context API
6. **UI/UX Design** - NativeWind (Tailwind CSS for React Native)
7. **Version Control** - Git and GitHub
8. **Problem Solving** - Real-world application development challenges

## 🎓 Academic Significance

This project addresses a real problem faced by students in universities:

- **Current Problem:** Manual complaint handling is time-consuming and inefficient
- **Digital Solution:** Automated tracking, real-time updates, and data analytics
- **Impact:** Improved response time and better complaint resolution
- **Scalability:** Can be deployed across multiple departments and institutions

## 🚀 Future Enhancements

Potential improvements for future iterations:

1. Push notifications for complaint status updates
2. Image/file attachments for complaints
3. Multi-language support
4. Advanced analytics dashboard with charts
5. Email notifications
6. Department-wise routing
7. Priority-based complaint handling
8. Mobile responsive web version
9. Export reports to PDF/Excel
10. WhatsApp integration for quick updates

## Acknowledgments

I would like to express my gratitude to:

- **Department Faculty** for providing resources and feedback
- **Peers** who helped in testing and providing suggestions
- **Online Communities** (Stack Overflow, GitHub, React Native Community) for troubleshooting help

## 📄 License

This project is created for educational purposes as part of a University Development Project. All rights reserved.

© 2024-2025 | University Development Project

## 👨‍💻 Author

Created for UDP (University Development Project)

---
