const multer = require("multer");
const path = require("path");

// Carpeta específica para fotos de perfil
const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/profiles"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const uploadProfile = multer({
  storage: storageProfile,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // solo imágenes
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos JPG o PNG"));
    }
  },
});

const errorProfileHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === "Solo se permiten archivos JPG o PNG") {
    return res.status(400).json({ success: false, error: err.message });
  }
  next(err);
};

module.exports = { uploadProfile, errorProfileHandler };
