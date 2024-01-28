const express = require("express");
const router = express.Router();
const {generateAuthToken} = require("../../../utils/helpers");
const {authRegistration} = require("../authSchema");


router
	.post("/registration", async (req, res) => {
		try {
			const {email, password, username} = req.body
			const data = {
				time: new Date().toISOString(),
				email,
				password,
				username
			}

			await authRegistration.create(data);
			const user = await authRegistration.findOne({email: email})
			const token = generateAuthToken(user._id)

			res.json({status: "200", token: token, message: "User registered successfully"})

		} catch (e) {
			console.log(e)
			if (e.code === 11000) {
				res.status(400).json({status: "400", message: "User with this email already exists"})
			} else {
				res.status(500).json({status: "500", message: "Internal server error"})
			}
		}
	})
	.get("/registration", async (req, res) => {
		try {
			let {dataStart, dataEnd} = req.query
			let objs

			objs = await authRegistration.find({
				time: {
					$gte: dataStart,
					$lte: dataEnd
				}
			});

			console.log(objs)
			res.json(objs)
		} catch (err) {
			console.error(err)
			res.status(500).json({status: "500", message: "Internal server error"})
		}
	})

const swagger = {
	"/api/registration": {
		post: {
			tags: [`registration`],
			summary: '',
			description: 'registration new userInfo',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								time: {type: 'string',},
								username: {type: 'string'},
								email: {type: 'string'},
								password: {type: 'string'}
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
		get: {
			tags: [`registration`],
			summary: '',
			description: 'get registration new userInfo',
			parameters: [
				{
					name: "dataStart",
					in: "query",
					description: 'dataStart',
					schema: {
						type: "string"
					}
				},
				{
					name: "dataEnd",
					in: "query",
					description: 'dataEnd',
					schema: {
						type: "string"
					}
				},
			],
			responses: {
				200: {
					description: 'ok',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									id: {type: "string"},
									time: {type: 'string',},
									username: {type: 'string'},
									email: {type: 'string'},
									password: {type: 'string'}
								},
							},
						},
					},
				},
				500: {
					description: 'error',
				},
			},
		}
	}
}


module.exports = {router, swagger}