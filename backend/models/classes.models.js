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


// GET http://localhost:3000/api/authors
const getClassDetailModel = async () => {
  let client, result;

  try {
    client = await pool.connect(); 
    const data = await client.query(queries.getClassDetail);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

const classes = {
  getLatestClassesModel
}

module.exports = classes;