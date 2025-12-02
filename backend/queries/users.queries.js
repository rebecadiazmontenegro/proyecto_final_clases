const queries = {
  getUser: `
    SELECT * FROM 
        users
    WHERE 
        email = $1;
    `,
  getInfoProfile:`
    SELECT name, email, role
    FROM users
    WHERE id_user = $1;
  `,
  createUser: `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id_user;
    `,

  deleteUser: `
    DELETE FROM users
    WHERE id_user = $1
    RETURNING id_user, name, email, role;
        `,
};

module.exports = queries;
