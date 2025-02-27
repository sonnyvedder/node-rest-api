const jwt = require('jsonwebtoken');
const secretKey = "3a07b3ccd7a84934365748cf9cff4af302585d0de2291c5ca56dc0cb7fb2f444";

function verifyToken(req, res, next) {
	const authHeader = String(req.header('Authorization') || '');

	if (!authHeader) return res.status(401).json({ error: 'Access denied' });

	if(authHeader.startsWith("Bearer ")){
		const token = authHeader.substring(7, authHeader.length);
		try {
			const decoded = jwt.verify(token, secretKey);
			req.userId = decoded.userId;
			next();
		} catch (error) {
			res.status(401).json({ error: 'Invalid token' });
		}
	} else {
		try {
			const decoded = jwt.verify(authHeader, secretKey);
			req.userId = decoded.userId;
			next();
		} catch (error) {
			res.status(401).json({ error: 'Invalid token' });
		}
	}

};

module.exports = verifyToken;