-- Tabla users
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Tabla subjects
CREATE TABLE subjects (
    id_subject SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Tabla classes
CREATE TABLE classes (
    id_class SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_subject INT NOT NULL,
    materials TEXT [],
    level VARCHAR(50) NOT NULL,
    schedule VARCHAR(100) NOT NULL,
    format VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_subject) REFERENCES subjects(id_subject)
);

-- QUERIES CLASES
-- [ GET ] http://localhost:3000/classes/detail
-- Retorna toda la información de una clase, incluyendo materia y nombre del profesor
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
    c.id_class = 2;

-- [ POST ] Crear una clase
INSERT INTO classes (id_user, id_subject, materials, level, schedule, format)
VALUES (3, 2, 'Apuntes y ejercicios', 'Intermedio', 'Lunes 10:00-12:00', 'Presencial')
RETURNING id_class;

-- [ PUT ]Editar una clase
UPDATE classes
SET 
    id_subject = 1,               -- ID de la materia nueva
    materials = 'Apuntes actualizados', 
    level = 'Avanzado', 
    schedule = 'Miércoles 14:00-16:00', 
    format = 'Online'
WHERE 
    id_class = 2
    AND id_user = 1
RETURNING *;

RETURNING *;

-- [ DELETE ] Borrar una clase
DELETE FROM classes
WHERE id_class = 2
  AND id_user = 1
RETURNING *;

-- QUERIES SUBJECTS
-- Retorna una subjects y todos sus horarios
SELECT 
    s.id_subject,
    s.name AS subject_name,
    c.schedule
FROM 
    subjects s
JOIN 
    classes c ON s.id_subject = c.id_subject
ORDER BY 
    s.id_subject, c.schedule;

-- Retornar todas las materias
SELECT 
    id_subject,
    name AS subject_name
FROM 
    subjects
ORDER BY 
    name;


-- QUERIES PROFESOR
-- [ GET ]Ver todas las clases de un profesor pero solo horario y material
SELECT 
    s.name AS subject_name,
    c.schedule
FROM 
    classes c
JOIN 
    subjects s ON c.id_subject = s.id_subject
WHERE 
    c.id_user = 1
ORDER BY 
    c.schedule;

-- [ GET ] Ver todas las clases de un profesor
SELECT 
    c.id_class,
    c.materials,
    c.level,
    c.schedule,
    c.format,
    s.name AS subject_name
FROM 
    classes c
JOIN 
    subjects s ON c.id_subject = s.id_subject
JOIN
    users u ON c.id_user = u.id_user
WHERE 
    u.email = $1;


-- [ GET ] Traer un user http://localhost:3000/login
-- Obtener un usuario por su email
SELECT * FROM 
    users
WHERE 
    email = ana@email.com;

-- [ POST ] Crear un user http://localhost:3000/signup
INSERT INTO users (name, email, password, role)
VALUES ('Ana Pérez', 'ana@email.com', 'hashed_password', 'teacher')
RETURNING id_user;

-- [ DELETE ] Borrar un user
DELETE FROM users
WHERE id_user = 1
RETURNING id_user, name, email, role;

-- Traer información de un usuario
SELECT name, email, role
FROM users
WHERE id_user = $1;

