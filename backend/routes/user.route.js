// routes/user.route.js
import express from "express";
import { signup, login, logout, allUsers } from "../controller/user.controller.js";

const router = express.Router();
  
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/all", allUsers);

export default router;



