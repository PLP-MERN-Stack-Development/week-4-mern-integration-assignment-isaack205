// Import
const jwt = require('jsonwebtoken');

// Load environment variable
const JWT_SECRET = process.env.JWT_SECRET

exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if( !authHeader || !authHeader.startsWith('Bearer') ) { return res.status(401).json({message: "No token"}) }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid token", "Error": error.message })
    }

};

exports.authorize = (roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
        next();
    }
};
