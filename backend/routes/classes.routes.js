const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.controllers");
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, classesController.getLatestClasses);

module.exports = router;
