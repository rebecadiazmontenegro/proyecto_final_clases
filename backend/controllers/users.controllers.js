const usersModels = require("../models/users.models"); // Importar el modelo de la BBDD
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {validationResult} = require("express-validator");

/**
 * Login de un usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string} req.body.email - Email del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }
    const user = await usersModels.getUserModel(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign(
      { id: user.id_user, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login correcto",
      token,
      user: {
        id: user.id_user,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      message: "Error en login",
      error: error.message,
    });
  }
};

/**
 * Crear un nuevo usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string} req.body.name - Nombre del usuario.
 * @param {string} req.body.email - Email del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {string} [req.body.role] - Rol del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const createUser = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { name, email, password, role } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: encryptedPassword,
      role: role || "Profesor",
    };

    const response = await usersModels.createUserModel(newUser);

    return res.status(201).json({
      message: `Usuario creado correctamente`,
      user: {
        name,
        email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);

    return res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};



function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
}

module.exports = {
  createUser,
  loginUser,
  logout
};
