import dotenv from "dotenv"
import express from "express"
import authRoutes from '../src/routes/auth.route.js'
import messageRoutes from "../src/routes/message.route.js"
import { connectDB } from "./lib/db.js"
import process from "process"
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/auth.middleware.js";
import cors from "cors"
import path from "path"
import { app, server } from "./lib/socket.js"

dotenv.config();
const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(cookieParser())
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

app.use(protectRoute);
app.get('/check', protectRoute, (req, res) => {
  res.send('This is a protected route');
});

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, "../frontend/public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
})