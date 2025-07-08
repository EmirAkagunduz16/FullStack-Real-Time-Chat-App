# 💬 QuickChat - Real-Time Chat Application

<div align="center">
  
![QuickChat](https://img.shields.io/badge/QuickChat-Real--Time--Chat-blueviolet?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-success?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-orange?style=for-the-badge)

*A modern, real-time chat application built with the MERN stack featuring instant messaging, file sharing, and live status updates.*

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🐛 Report Bug](#contributing)

</div>

---

## ✨ Features

### 🔐 **Authentication & Security**
- **JWT-based Authentication** - Secure login/signup system
- **Password Encryption** - bcrypt.js for password hashing
- **Protected Routes** - Middleware-based route protection
- **Session Management** - Persistent login sessions

### 💬 **Real-Time Messaging**
- **Instant Messaging** - Socket.io powered real-time communication
- **Message Status** - Read/unread message indicators
- **Typing Indicators** - See when users are typing
- **Message History** - Persistent message storage

### 👥 **User Management**
- **User Profiles** - Customizable profile pictures and bio
- **Online Status** - Real-time online/offline indicators
- **User Search** - Filter users by name
- **Profile Updates** - Edit profile information

### 📱 **Modern UI/UX**
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Three-Panel Layout** - Sidebar, Chat, and User Info panels
- **Dark Theme** - Modern glassmorphism design
- **Toast Notifications** - User-friendly feedback system

### 📸 **Media Sharing**
- **Image Upload** - Cloudinary integration for image sharing
- **Media Gallery** - View shared images in conversation
- **File Preview** - Click to view full-size images

### 🔔 **Smart Notifications**
- **Unread Count** - Badge indicators for new messages
- **Sound Notifications** - Audio alerts for new messages
- **Desktop Notifications** - Browser notification support

---

## 🛠️ Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-06B6D4?style=flat-square&logo=tailwindcss)
![Socket.io Client](https://img.shields.io/badge/Socket.io--Client-4.8.1-010101?style=flat-square&logo=socket.io)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-010101?style=flat-square&logo=socket.io)
![MongoDB](https://img.shields.io/badge/MongoDB-8.16.1-47A248?style=flat-square&logo=mongodb)

### **Additional Tools**
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=flat-square&logo=jsonwebtokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.7.0-3448C5?style=flat-square&logo=cloudinary)
![Axios](https://img.shields.io/badge/Axios-1.10.0-5A29E4?style=flat-square&logo=axios)

---

## 🚀 Quick Start

### Prerequisites
```bash
node -v    # v18.0.0 or higher
npm -v     # v8.0.0 or higher
```

### 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/quickchat.git
cd quickchat
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Setup**

Create `.env` file in the `server` directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/quickchat
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port
PORT=5000
```

Create `.env` file in the `client` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

4. **Start the application**

```bash
# Terminal 1 - Start backend server
cd server
npm run server

# Terminal 2 - Start frontend development server
cd client
npm run dev
```

5. **Access the application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📁 Project Structure

```
quickchat/
├── 📁 client/                 # Frontend React application
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── RightSidebar.jsx
│   │   ├── 📁 pages/          # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── 📁 assets/         # Static assets
│   │   └── 📁 context/        # React Context providers
│   │       ├── AuthContext.jsx
│   │       └── ChatContext.jsx
│   ├── package.json
│   └── vite.config.js
├── 📁 server/                 # Backend Node.js application
│   ├── 📁 controllers/        # Route controllers
│   ├── 📁 middleware/         # Custom middleware
│   ├── 📁 models/             # MongoDB schemas
│   ├── 📁 routes/             # API routes
│   ├── 📁 lib/                # Utility functions
│   ├── package.json
│   └── server.js              # Main server file
└── README.md
```

---

## 🔄 API Endpoints

### Authentication
```http
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/check        # Verify authentication
PUT  /api/auth/update-profile  # Update user profile
```

### Messages
```http
GET  /api/messages/users    # Get all users for sidebar
GET  /api/messages/:userId  # Get messages with specific user
POST /api/messages/send/:userId  # Send message to user
PUT  /api/messages/mark/:messageId  # Mark message as read
```

---

## 🎯 Socket Events

### Client → Server
```javascript
// User connection with userId
socket.connect({ query: { userId } })

// User disconnection
socket.disconnect()
```

### Server → Client
```javascript
// New message received
socket.on('newMessage', (message) => { ... })

// Online users update
socket.on('getOnlineUsers', (userIds) => { ... })
```

---

## 🎨 Features Demo

### **Real-time Messaging**
```javascript
// Send message with image support
const sendMessage = async (messageData) => {
  const response = await axios.post(`/api/messages/send/${userId}`, {
    text: "Hello!",
    image: base64Image // Optional
  });
};
```

### **Online Status Tracking**
```javascript
// Real-time online users
const [onlineUsers, setOnlineUsers] = useState([]);

socket.on("getOnlineUsers", (userIds) => {
  setOnlineUsers(userIds);
});
```

### **Unread Message Count**
```javascript
// Track unseen messages per user
const [unseenMessages, setUnseenMessages] = useState({});

// Update count when new message arrives
setUnseenMessages(prev => ({
  ...prev,
  [senderId]: (prev[senderId] || 0) + 1
}));
```

---

## 🔐 Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcrypt.js
- **Protected Routes** with middleware validation
- **CORS Configuration** for cross-origin requests
- **Environment Variables** for sensitive data
- **Input Validation** and sanitization

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 **Mobile devices** (320px+)
- 📟 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large screens** (1440px+)

---

## 🚀 Deployment

### **Frontend (Vercel)**
```bash
cd client
npm run build
# Deploy to Vercel
```

### **Backend (Railway/Heroku)**
```bash
cd server
# Set environment variables in your hosting platform
# Deploy to your preferred hosting service
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime
- [Socket.io](https://socket.io/) - Real-time communication
- [MongoDB](https://mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Cloudinary](https://cloudinary.com/) - Image hosting

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and lots of ☕

</div>
