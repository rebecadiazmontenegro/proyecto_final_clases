const express = require("express");
const { upload } = require("../middlewares/fileMiddleware")
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

router.put("/detail/:id", authMiddleware, upload.array("materials", 10), classesController.editClass);

router.post("/create", authMiddleware, upload.array("materials", 10), classesController.createClass);


module.exports = router;

