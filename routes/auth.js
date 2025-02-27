const express = require('express');
const router = express.Router();
const users = require('../services/users');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "3a07b3ccd7a84934365748cf9cff4af302585d0de2291c5ca56dc0cb7fb2f444";

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await users.issetUsers(username, password);


		if (!user.status) {
			return res.status(401).json({ error: 'Authentication failed' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ error: 'Authentication failed' });
		}


		const token = jwt.sign({ userId: user.users_id }, secretKey, {
			expiresIn: '24h',
		});

		res.status(200).json({ status: true, token: token });

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Login failed' });
	}
});

module.exports = router;