const pool = require("../config/db_pgsql");
const classesModel = require("../models/classes.models");

/**
 * Obtener las últimas clases del usuario.
 * GET /classes/profile
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.user - Usuario autenticado.
 * @param {number} req.user.id - ID del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const getLatestClasses = async (req, res) => {
  const id_user = req.user.id;

  try {
    const classes = await classesModel.getLatestClassesModel(id_user);
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching latest classes" });
  }
};

/**
 * Obtener todas las clases del usuario.
 * GET /classes/profile/all
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.user - Usuario autenticado.
 * @param {number} req.user.id - ID del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const getAllClasses = async (req, res) => {
  const id_user = req.user.id;

  try {
    const classes = await classesModel.getAllClassesModel(id_user);
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching all classes" });
  }
};

/**
 * Obtener el detalle de una clase específica.
 * GET /classes/profile/:id
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.id - ID de la clase.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const getClassDetail = async (req, res) => {
  try {
    const id_class = req.params.id;

    const data = await classesModel.getClassDetailModel(id_class);

    if (data.length === 0) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    res.json(data[0]); // solo un resultado
  } catch (err) {
    console.error("Error en getClassDetail:", err);
    res
      .status(500)
      .json({ message: "Error al obtener el detalle de la clase" });
  }
};

/**
 * Eliminar una clase del usuario.
 * DELETE /classes/:id
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.id - ID de la clase a eliminar.
 * @param {Object} req.user - Usuario autenticado.
 * @param {number} req.user.id - ID del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const deleteClass = async (req, res) => {
  try {
    const id_class = req.params.id;
    const id_user = req.user.id;

    const deleted = await classesModel.deleteClassModel(id_class, id_user);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Clase no encontrada o no pertenece al usuario" });
    }

    res.json({ message: "Clase eliminada correctamente", deleted });
  } catch (error) {
    console.error("Error al eliminar clase", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * Editar una clase existente.
 * PUT /classes/:id
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.id - ID de la clase a editar.
 * @param {Object} req.user - Usuario autenticado.
 * @param {number} req.user.id - ID del usuario.
 * @param {Object} req.body - Datos de la clase.
 * @param {string} req.body.subject_name - Nombre de la asignatura.
 * @param {string} req.body.level - Nivel de la clase.
 * @param {string} req.body.schedule - Horario de la clase.
 * @param {string} req.body.format - Formato de la clase.
 * @param {string} [req.body.oldMaterials] - Materiales existentes en formato JSON.
 * @param {Object} req.files - Archivos subidos (materiales nuevos).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const editClass = async (req, res) => {
  try {
    const { id } = req.params;
    const id_user = req.user.id;

    const { subject_name, level, schedule, format, oldMaterials } = req.body;

    const newMaterials = req.files
      ? req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        )
      : [];

    const materials = oldMaterials
      ? [...JSON.parse(oldMaterials), ...newMaterials]
      : newMaterials;

    const updated = await classesModel.editClassModel({
      subject_name,
      materials,
      level,
      schedule,
      format,
      id_class: id,
      id_user,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No se encontró la clase o no tienes permiso." });
    }

    res.json({
      message: "Clase actualizada correctamente",
      class: updated,
    });
  } catch (error) {
    console.error("Error en editClassController:", error);
    res.status(500).json({ message: "Error interno al editar la clase" });
  }
};


/**
 * Crear una nueva clase.
 * POST /classes
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.user - Usuario autenticado.
 * @param {number} req.user.id - ID del usuario.
 * @param {Object} req.body - Datos de la clase.
 * @param {string} req.body.subjectName - Nombre de la asignatura.
 * @param {string} req.body.level - Nivel de la clase.
 * @param {string} req.body.schedule - Horario de la clase.
 * @param {string} req.body.format - Formato de la clase.
 * @param {Object} req.files - Archivos subidos (materiales).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const createClass = async (req, res) => {
  try {
    const id_user = req.user.id;
    const { subjectName, level, schedule, format } = req.body;

    const materials = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const newClass = await classesModel.createClass(
      id_user,
      subjectName,
      materials,
      level,
      schedule,
      format
    );

    res.status(201).json({
      message: "Clase creada con éxito",
      class: newClass,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLatestClasses,
  getAllClasses,
  getClassDetail,
  deleteClass,
  editClass,
  createClass,
};
