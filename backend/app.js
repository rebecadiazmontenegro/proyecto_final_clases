const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/googleAuth");

require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // tu frontend
    credentials: true, // permite enviar cookies
  })
);

// Middlewares
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
app.use(express.json());

// Routes
const usersRoutes = require("./routes/users.routes");
const classesRoutes = require("./routes/classes.routes");
app.use("/user", usersRoutes);
app.use("/classes", classesRoutes);

// Run server
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
