import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app } from "./SocketIO/server.js"; // Importing app from SocketIO server
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
// import { app, server } from "./SocketIO/server.js";
import { server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Backend is running");
});
  
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

console.log("Hi");
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
   
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});