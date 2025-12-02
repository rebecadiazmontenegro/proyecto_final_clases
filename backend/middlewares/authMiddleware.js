// const jwt = require('jsonwebtoken');

// function authMiddleware(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) return res.redirect('/login');

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) return res.redirect('/users/login');
//         req.user = decoded;
//         next();
//     });
// }

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "No estás autenticado" });

    const token = authHeader.split(' ')[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ message: "No estás autenticado" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token inválido" });
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;
