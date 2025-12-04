// const multer = require('multer');
// const path = require('path');

// const upload = multer({
//   dest: path.join(__dirname, '../uploads'), // Carpeta donde se guardan los ficheros
//   limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2MB por archivo
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|mp4|mov|mp3|wav|mkv|avi|pdf/;
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);

//     if (extName && mimeType) {
//       cb(null, true);
//     } else {
//       cb(new Error('El tipo de archivo no esta permitido'));
//     }
//   },
// });

// const errorFileHandler = (err, req, res, next) => {
//   if (err instanceof multer.MulterError || err.message === 'Solo se permiten archivos JPG o PNG') {
//     return res.status(400).json({ success: false, error: err.message });
//   }
//   next(err);
// };

// module.exports = { upload, errorFileHandler };

const multer = require('multer');
const path = require('path');

// Para que guarde el nombre real del archivo y su extension (si no se queda raro)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    const name = path.basename(file.originalname, ext); 
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: storage, //
  limits: { fileSize: 2 * 1024 * 1024 }, //Limite de subida
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|mp4|mov|mp3|wav|mkv|avi|pdf/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('El tipo de archivo no está permitido'));
    }
  },
});

const errorFileHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Solo se permiten archivos JPG o PNG') {
    return res.status(400).json({ success: false, error: err.message });
  }
  next(err);
};

module.exports = { upload, errorFileHandler };
