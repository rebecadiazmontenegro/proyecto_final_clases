const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");
const authMiddleware = require('../middlewares/authMiddleware');

// GET http://localhost:3000/login/1
//router.get("/login/:email", usersController.getUser);

router.post("/signup", usersController.createUser);

router.post("/login", usersController.loginUser);

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {});
    }

    res.clearCookie('token', { path: '/' });
    res.clearCookie('connect.sid', { path: '/' });

    // Devuelve JSON, NO redirect
    return res.status(200).json({ message: 'Logout exitoso' });
});


module.exports = router;

