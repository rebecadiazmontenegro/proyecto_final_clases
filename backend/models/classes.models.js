const queries = require("../queries/classes.queries");
const pool = require("../config/db_pgsql");

// GET Para ver las 4 últimas clases añadidas (Material y horario) http://localhost:3000/classes/profile
const getLatestClassesModel = async (id_user) => {
  let client, result;

  try {
    client = await pool.connect();
    const data = await client.query(queries.latestClasses, [id_user]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

// GET Para ver todas las clases (Material, horario y nivel) http://localhost:3000/classes/profile/all
const getAllClassesModel = async (id_user) => {
  let client, result;

  try {
    client = await pool.connect();
    const data = await client.query(queries.allClasses, [id_user]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

// GET Para ver una clase con todos los detalles http://localhost:3000/classes/detail/id
const getClassDetailModel = async (id_class) => {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(queries.classesDetail, [id_class]);
    return result.rows;
  } catch (err) {
    console.error("Error :", err);
    throw err;
  } finally {
    if (client) client.release();
  }
};

// DELETE Para ver una clase con todos los detalles http://localhost:3000/classes/detail/id
const deleteClassModel = async (id_class, id_user) => {
  const values = [id_class, id_user];
  const { rows } = await pool.query(queries.deleteClass, values);
  return rows[0];
};

// PUT Para editar una clase http://localhost:3000/classes/detail/id
const editClassModel = async (data) => {
  const {
    subject_name,
    materials,
    level,
    schedule,
    format,
    id_class,
    id_user,
  } = data;

  const values = [
    subject_name,
    materials,
    level,
    schedule,
    format,
    id_class,
    id_user,
  ];

  const { rows } = await pool.query(queries.editClass, values); //Por que pgAdmin devuelve row,rowCount y update, para solo coger row que es donde viene la información
  return rows[0];
};

const classes = {
  getLatestClassesModel,
  getAllClassesModel,
  getClassDetailModel,
  deleteClassModel,
  editClassModel
};

module.exports = classes;
