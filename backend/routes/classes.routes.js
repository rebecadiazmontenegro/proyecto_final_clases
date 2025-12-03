const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.controllers");
const authMiddleware = require('../middlewares/authMiddleware');

// GET http://localhost:3000/classes/profile
router.get('/profile', authMiddleware, classesController.getLatestClasses);

// GET http://localhost:3000/classes/profile/all
router.get('/all', authMiddleware, classesController.getAllClasses);

// GET http://localhost:3000/classes/detail/3
router.get("/detail/:id", authMiddleware, classesController.getClassDetail);

router.delete("/detail/:id", authMiddleware, classesController.deleteClass);

router.put("/detail/:id", authMiddleware, classesController.editClass);

router.post("/create", authMiddleware, classesController.createClass);

module.exports = router;

