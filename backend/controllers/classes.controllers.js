const pool = require("../config/db_pgsql");
const classesModel = require("../models/classes.models"); 

// GET http://localhost:3000/classes/profile
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

// GET http://localhost:3000/classes/profile/all
const getAllClasses = async (req, res) => {
  const id_user = req.user.id; 

  try {
    const classes = await classesModel.getAllClassesModel(id_user);
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching all classes' });
  }
};


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
    res.status(500).json({ message: "Error al obtener el detalle de la clase" });
  }
};


module.exports = {
  getLatestClasses,
  getAllClasses,
  getClassDetail
};
