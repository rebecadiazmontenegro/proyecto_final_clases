const express = require("express");
const router = express.Router();
const passport = require("../config/googleAuth");
const usersController = require("../controllers/users.controllers");
const jwt = require("jsonwebtoken");

const {
  validateCreateUser,
  validateLoginUser,
} = require("../validators/users.validator");

// POST http://localhost:3000/signup
router.post(
  "/signup",
  validateCreateUser,
  usersController.createUser
);


// POST http://localhost:3000/login
router.post(
  "/login",
  validateLoginUser,
  usersController.loginUser
);

// GET http://localhost:3000/logOUT
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {});
  }

  res.clearCookie("token", { path: "/" });
  res.clearCookie("connect.sid", { path: "/" });

  return res.status(200).json({ message: "Logout exitoso" });
});

//Rutas Google Auth

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/auth/failure" }),
  (req, res) => {
    const user = req.user; // viene del strategy

    const payload = {
      id: user.id_user,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("access-token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.redirect(`${process.env.FRONTEND_URL}/dashboardteacher?token=${token}`);
  }
);

router.get("/auth/failure", (req, res) => {
  res.send("Error al autenticar con Google.");
});

router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie("access-token").send("Logout con Google correcto");
  });
});

module.exports = router;
