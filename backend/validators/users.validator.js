const { body, param } = require("express-validator");

const validateCreateUser = [
  body("name")
    .exists()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser un texto")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  body("email")
    .exists()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .exists()
    .withMessage("La contraseña es obligatoria"),

  body("role")
    .optional()
    .isString()
    .withMessage("El rol debe ser un texto"),
];

const validateLoginUser = [
  body("email")
    .exists()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
  .exists()
  .withMessage("La contraseña es obligatoria")
  .isLength({ min: 6 })
  .withMessage("La contraseña debe tener al menos 6 caracteres")
  .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/)
  .withMessage(
    "La contraseña debe tener al menos una mayúscula, una minúscula y un carácter especial"
  )
];

module.exports = {
  validateCreateUser,
  validateLoginUser
};
