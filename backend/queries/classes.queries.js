const queries = {
  getClassDetail: `
    SELECT 
        c.id_class,
        c.materials,
        c.level,
        c.schedule,
        c.format,
        u.name AS teacher_name,
        s.name AS subject_name
    FROM 
        classes c
    JOIN 
        users u ON c.id_user = u.id_user
    JOIN 
        subjects s ON c.id_subject = s.id_subject
    WHERE 
        c.id_class = $1;
    `,

  createClass: `
    INSERT INTO classes (id_user, id_subject, materials, level, schedule, format)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_class;
    `,

  editClass: `
    UPDATE classes
    SET 
        id_subject = (SELECT id_subject FROM subjects WHERE name = $1),
        materials = $2, 
        level = $3, 
        schedule = $4, 
        format = $5
    WHERE 
        id_class = $6
        AND id_user = $7
    RETURNING *;
    `,

  deleteClass: `
    DELETE FROM classes
    WHERE id_class = $1
    AND id_user = $2
    RETURNING *;
    `,
};

module.exports = queries;
