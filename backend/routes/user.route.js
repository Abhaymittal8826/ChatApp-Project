import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  console.log("hi from signup route");

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    const newUser = new User({
      fullname,
      email,
      password, 
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
