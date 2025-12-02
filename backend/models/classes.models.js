const queries = require("../queries/classes.queries"); 
const pool = require("../config/db_pgsql");

// GET http://localhost:3000/classes/profile
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

// GET http://localhost:3000/classes/profile/all
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


const classes = {
  getLatestClassesModel,
  getAllClassesModel,
  getClassDetailModel
}

module.exports = classes;