import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    // Check for token in cookies
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ 
        error: "Please login to access this resource" 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      
      // Find user
      const user = await User.findById(decoded.userId)
        .select("-password")
        .lean();
      
      if (!user) {
        return res.status(401).json({ 
          error: "User not found. Please login again." 
        });
      }

      // Add user to request object
      req.user = user;
      next();
      
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          error: "Session expired. Please login again." 
        });
      }
      
      return res.status(401).json({ 
        error: "Invalid authentication token" 
      });
    }
    
  } catch (error) {
    console.error("Error in secureRoute:", error);
    res.status(500).json({ 
      error: "Something went wrong. Please try again." 
    });
  }
};
export default secureRoute;