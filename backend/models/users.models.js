const queries = require("../queries/users.queries");
const pool = require("../config/db_pgsql");


const getUserModel = async (email) => {
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getUser, [email]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};


const createUserModel = async (user) => {
  const { name, email, password, role } = user;
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.createUser, [
      name,
      email,
      password,
      role,
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

module.exports = {
  getUserModel,
  createUserModel,
};
