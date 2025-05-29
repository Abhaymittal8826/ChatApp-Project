import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);
router.get("/validate", secureRoute, (req, res) => {
  // Since secureRoute middleware already validates the token and adds user to req
  res.status(200).json(req.user);
});

export default router;