import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';


// Create Express app and HTPP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
  cors: {origin: "*"}
})

// Store online Users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket)=>{
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);
  
  if(userId) userSocketMap[userId] = socket.id;

  // Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", ()=>{ 
    console.log("user Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/status", (req, res)=> res.send("Server is running"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});