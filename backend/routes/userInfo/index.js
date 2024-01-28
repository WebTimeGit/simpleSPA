const express = require("express");
const router = express.Router();
const {authRegistration} = require("../auth/authSchema");
const {getUserIdFromToken} = require("../../utils/helpers");



router.get("/userInfo", async (req, res) => {
	// Извлечение токена из заголовков
	const token = req.headers.authorization?.split(" ")[1]; // Предполагается формат "Bearer YOUR_TOKEN_HERE"

	if (!token) {
		return res.status(401).json({status: "401", message: "No token provided"});
	}

	try {
		const userId = await getUserIdFromToken(token);
		const user = await authRegistration.findOne({ _id: userId });

		if (user) {
			const data ={
				id: user._id,
				time: user.time,
				email: user.email,
				username: user.username
			}
			res.json({status: "200", userInfo: data, message: "User found"});
		} else {
			res.status(404).json({status: "404", message: "User not found"});
		}

	} catch (e) {
		if (e.name === 'JsonWebTokenError') {
			res.status(401).json({status: "401", message: "Invalid token"});
		} else {
			res.status(500).json({status: "500", message: "Internal server error"});
		}
	}
});



const swagger = {
	"/api/userInfo": {
		get: {
			tags: [`userInfo`],
			summary: '',
			description: 'get userInfo',
			responses: {
				200: {
					description: 'ok',
				},
				500: {
					description: 'error',
				},
			},
		},
	}
}

module.exports = {router, swagger}