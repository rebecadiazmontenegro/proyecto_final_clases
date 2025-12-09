const express = require("express");
const router = express.Router();
const passport = require("../config/googleAuth");
const usersController = require("../controllers/users.controllers");
const jwt = require("jsonwebtoken");

const {
  validateCreateUser,
  validateLoginUser,
} = require("../validators/users.validator");

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rebeca
 *               email:
 *                 type: string
 *                 example: rebeca@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: Profesor
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
router.post(
  "/signup",
  validateCreateUser,
  usersController.createUser
);


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: rebeca@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login correcto
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en login
 */
router.post(
  "/login",
  validateLoginUser,
  usersController.loginUser
);

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Cerrar sesión del usuario
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Logout exitoso
 */
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {});
  }

  res.clearCookie("token", { path: "/" });
  res.clearCookie("connect.sid", { path: "/" });

  return res.status(200).json({ message: "Logout exitoso" });
});

/**
 * @swagger
 * /user/auth/google:
 *   get:
 *     summary: Autenticación con Google
 *     tags:
 *       - Auth Google
 *     responses:
 *       302:
 *         description: Redirección a Google
 */
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
