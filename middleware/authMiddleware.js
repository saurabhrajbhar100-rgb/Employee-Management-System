const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
    try {
        const tokenString = token.split(' ')[1];
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied, admin only' });
    }
};

module.exports = { protect, admin };