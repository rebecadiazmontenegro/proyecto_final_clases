const queries = {
  getAllSubjects: `
    SELECT * FROM subjects WHERE id_subject = $1;
    `,
};

module.exports = queries;
