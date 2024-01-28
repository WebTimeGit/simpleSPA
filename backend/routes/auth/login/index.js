const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {authRegistration} = require("../authSchema");
const {generateAuthToken} = require("../../../utils/helpers");



router.post("/login", async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await authRegistration.findOne({ email: email })

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateAuthToken(user._id)

			res.json({status: "200", token: token, message: "User login successfully"})
		} else {
			res.status(401).json({status: "400", message: "Incorrect email or password"})
		}

	} catch (e) {
		res.status(500).json({status: "500", message: "Internal server error"})
	}
})


const swagger = {
	"/api/login": {
		post: {
			tags: [`login`],
			summary: '',
			description: 'login userInfo',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								email: {type: 'string'},
								password: {type: 'string'},
							},
						},
					},
				},
			},
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