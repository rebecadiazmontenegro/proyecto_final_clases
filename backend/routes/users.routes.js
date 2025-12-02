const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");

// POST http://localhost:3000/signup
router.post("/signup", usersController.createUser);

// POST http://localhost:3000/login
router.post("/login", usersController.loginUser);

// GET http://localhost:3000/logOUT
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {});
  }

  res.clearCookie("token", { path: "/" });
  res.clearCookie("connect.sid", { path: "/" });

  return res.status(200).json({ message: "Logout exitoso" });
});

module.exports = router;
