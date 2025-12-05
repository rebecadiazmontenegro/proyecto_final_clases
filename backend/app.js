const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/googleAuth");
const path = require("path");
const { upload, errorFileHandler } = require("./middlewares/fileMiddleware");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Descargar materiales en classes/details
app.post("/upload", upload.single("file"), errorFileHandler, (req, res) => {
  const { title, description, year } = req.body;

  const fileInfo = req.file
    ? {
        originalName: req.file.originalname,
        path: `${req.protocol}://${req.get("host")}/uploads/${path.basename(
          req.file.path
        )}`,
      }
    : null;

  const record = { title, description, year, file: fileInfo };
  records.push(record);

  res.json({
    success: true,
    data: record,
  });
});

app.get("/records", (req, res) => {
  const normalizedRecords = records.map((record) => ({
    ...record,
    file: record.file
      ? {
          ...record.file,
          path: record.file.path.startsWith("http")
            ? record.file.path
            : `${req.protocol}://${req.get("host")}/uploads/${path.basename(
                record.file.path
              )}`,
        }
      : null,
  }));

  res.json({
    success: true,
    data: normalizedRecords,
  });
});

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "SECRET_GOOGLE",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Rutas API
const usersRoutes = require("./routes/users.routes");
const classesRoutes = require("./routes/classes.routes");

app.use("/user", usersRoutes);
app.use("/classes", classesRoutes);


if (process.env.NODE_ENV==="production") {
  // Servir archivos estáticos del frontend con React
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // Manejar cualquier ruta que no sea de la API y servir el index.html de React
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
