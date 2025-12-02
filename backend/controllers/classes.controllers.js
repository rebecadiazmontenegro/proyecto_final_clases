const pool = require("../config/db_pgsql");
const classesModel = require("../models/classes.models"); 

// // GET http://localhost:3000/classes/profile

const getLatestClasses = async (req, res) => {
  const id_user = req.user.id; 

  try {
    const classes = await classesModel.getLatestClassesModel(id_user);
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching latest classes' });
  }
};

// Controller para obtener detalle de una clase
const getClassDetail = async (req, res) => {
  const { id } = req.params; // id de la clase desde la URL

  try {
    // Llamamos al modelo
    const classDetail = await classesModel.getClassDetailModel(id);

    if (!classDetail || classDetail.length === 0) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    res.status(200).json(classDetail[0]); // Devuelve un solo objeto
  } catch (error) {
    console.error("Error al obtener el detalle de la clase:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getLatestClasses,
};
