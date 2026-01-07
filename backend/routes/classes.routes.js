const express = require("express");
const { upload } = require("../middlewares/fileMiddleware")
const router = express.Router();
const classesController = require("../controllers/classes.controllers");
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /classes/profile:
 *   get:
 *     summary: Obtener las últimas 4 clases del profesor
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clases recientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subject:
 *                     type: string
 *                     example: Matemáticas
 *                   schedule:
 *                     type: string
 *                     example: Lunes 10:00
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/profile', authMiddleware, classesController.getLatestClasses);

/**
 * @swagger
 * /classes/all:
 *   get:
 *     summary: Obtener todas las clases del profesor
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de clases
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/all', authMiddleware, classesController.getAllClasses);

/**
 * @swagger
 * /classes/detail/{id}:
 *   get:
 *     summary: Obtener el detalle de una clase
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Detalle de la clase
 *       404:
 *         description: Clase no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get("/detail/:id", authMiddleware, classesController.getClassDetail);

/**
 * @swagger
 * /classes/detail/{id}:
 *   delete:
 *     summary: Eliminar una clase
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clase eliminada correctamente
 *       404:
 *         description: Clase no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.delete("/detail/:id", authMiddleware, classesController.deleteClass);

/**
 * @swagger
 * /classes/detail/{id}:
 *   delete:
 *     summary: Eliminar una clase
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clase eliminada correctamente
 *       404:
 *         description: Clase no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put("/detail/:id", authMiddleware, upload.array("materials", 10), classesController.editClass);

/**
 * @swagger
 * /classes/create:
 *   post:
 *     summary: Crear una nueva clase
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - subjectName
 *               - level
 *               - schedule
 *               - format
 *             properties:
 *               subjectName:
 *                 type: string
 *                 example: Historia
 *               level:
 *                 type: string
 *                 example: Bachillerato
 *               schedule:
 *                 type: string
 *                 example: Martes 12:00
 *               format:
 *                 type: string
 *                 example: Online
 *               materials:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Clase creada con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post("/create", authMiddleware, upload.array("materials", 10), classesController.createClass);

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Obtener todas las clases disponibles
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las clases
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */

router.get("/", authMiddleware, classesController.getAllClassesList);

router.get("/favorites", authMiddleware, classesController.getUserFavorites);

router.post("/favorites/:id_class", authMiddleware, classesController.addFavorite);

router.delete("/favorites/:id_class", authMiddleware, classesController.removeFavorite);



module.exports = router;

