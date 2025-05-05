import User from "../models/user.model.js";
import bcrypt from 'bcrypt'; 
import createTokenAndSaveCookie from "../jwt/generateToken.js";
// Signup Controller
export const signup = async (req, res) => {
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
       
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashPassword });

    await newUser.save();

    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
    }

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
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      
      return res.status(400).json({ error: "Invalid user credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }

    createTokenAndSaveCookie(user._id, res);

    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in allUsers Controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
