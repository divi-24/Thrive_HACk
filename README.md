# Thrive - Swipe. Match. Hire. 🚀

**Thrive** is a modern, full-stack web application built with the MERN stack that revolutionizes how developers connect with opportunities and how companies find talent. It combines the engaging swipe interface of dating apps with professional networking and job searching, creating a unique and efficient platform for tech recruitment and collaboration.

## 🌟 Key Features

### 👨‍💻 **For Developers**
- **Comprehensive Profile Creation**
  - Professional details and work experience
  - Skills and expertise showcase
  - Portfolio and project links
  - Resume upload and management
  - Job preferences and location settings

- **Smart Matching System**
  - Swipe-based interface for job applications
  - AI-powered job recommendations
  - Skill-based matching with other developers
  - Location-based opportunity filtering

- **Networking & Collaboration**
  - Connect with developers for hackathons
  - Find project collaborators
  - Build professional connections
  - Direct messaging system

- **Application Management**
  - Real-time application status tracking
  - Interview scheduling
  - Application history
  - Company response notifications

### 🏢 **For Companies**
- **Advanced Job Posting**
  - Detailed job descriptions
  - Skill requirements specification
  - Salary range and benefits
  - Location and work mode options
  - Application deadline management

- **Smart Candidate Matching**
  - AI-powered candidate recommendations
  - Skill-based matching algorithm
  - Experience level filtering
  - Location-based candidate search

- **Application Management**
  - Streamlined applicant review process
  - Bulk application processing
  - Interview scheduling tools
  - Excel export of applicant data
  - Automated communication templates

## 🛠️ **Technical Architecture**

### **Frontend Technologies**
- **React.js** - Modern UI framework
- **Redux** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Bootstrap** - Component library
- **React Router** - Navigation and routing
- **Axios** - HTTP client
- **Socket.io** - Real-time communication
- **Chart.js** - Data visualization
- **React Query** - Data fetching and caching

### **Backend Technologies**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email notifications
- **Multer** - File upload handling
- **Natural** - NLP for job matching
- **NewsAPI** - Developer news integration
- **Socket.io** - Real-time features

## 📦 **Project Structure**
```
thrive/
├── frontend/
│   ├── public/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── docker-compose.yml
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Docker (optional)

### **1️⃣ Backend Setup**
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PWD=your_email_password
   NEWS_API=your_news_api_key
   ```

4. Start the backend server:
   ```sh
   npm run dev
   ```

### **2️⃣ Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

### **3️⃣ Docker Setup**
1. Build and start the containers:
   ```sh
   docker-compose up --build
   ```

2. Access the application at `http://localhost:3000`

## 🔒 **Security Features**
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Secure file uploads
- Environment variable management

## 📊 **Performance Optimizations**
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Database indexing
- API response compression

## 📝 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Authors**
- [Divi](https://github.com/divi-24)


## 📜 **API Endpoints**
The complete list of API endpoints is present at API_Guide.md at the root of the directory.

---
