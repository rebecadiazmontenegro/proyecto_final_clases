const queries = {
  latestClasses: `
    SELECT 
      s.name AS subject,
      c.schedule
    FROM classes c
    JOIN subjects s ON c.id_subject = s.id_subject
    WHERE c.id_user = $1
    ORDER BY c.id_class DESC
    LIMIT 4;
    `,

  allClasses: `
  SELECT
    c.id_class,
    s.name AS subject,
    c.schedule,
    c.level
  FROM classes c
  JOIN subjects s ON c.id_subject = s.id_subject
  WHERE c.id_user = $1
  ORDER BY c.schedule;
`,

  classesDetail: `
    SELECT 
      c.materials,
      c.level,
      c.schedule,
      c.format,
      u.name AS teacher_name,
      u.email AS teacher_email,
      s.name AS subject_name
    FROM classes c
    JOIN users u ON c.id_user = u.id_user
    JOIN subjects s ON c.id_subject = s.id_subject
    WHERE c.id_class = $1
  `,

  getSubjectId: `
    SELECT id_subject FROM subjects WHERE name = $1
  `,

  createClass: `
    INSERT INTO classes (id_user, id_subject, materials, level, schedule, format)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id_class;
    `,

  editClass: `
    UPDATE classes
    SET 
        id_subject = (
            SELECT id_subject 
            FROM subjects 
            WHERE name = $1
            LIMIT 1
        ),
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
  allClassesList: `
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
ORDER BY 
    c.id_class DESC;

  `,
  createFavorite: `
    INSERT INTO favorites (id_user, id_class)
    VALUES ($1, $2)
    ON CONFLICT (id_user, id_class) DO NOTHING
    RETURNING *;
  `,

  deleteFavorite: `
    DELETE FROM favorites
    WHERE id_user = $1
      AND id_class = $2
    RETURNING *;
  `,

  getAllUserFavorites: `
    SELECT f.id_favorite,
          c.id_class,
          c.level,
          c.schedule,
          c.format,
          u.name AS teacher_name,
          s.name AS subject_name
    FROM 
      favorites f
    JOIN 
      classes c ON f.id_class = c.id_class
    JOIN
      users u ON c.id_user = u.id_user
    JOIN
      subjects s ON c.id_subject = s.id_subject
    WHERE
      f.id_user = $1
    ORDER BY
      c.id_class DESC;
  `,
};

module.exports = queries;
