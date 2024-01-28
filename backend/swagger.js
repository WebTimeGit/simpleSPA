const {routesConfig} = require("./routes/index");
const registration = require('./routes/auth/registration');
const login = require('./routes/auth/login');
const userInfo = require('./routes/userInfo');

const swaggerOptions = {
	openapi: '3.0.0',
	info: {
		title: 'Express API with Swagger',
		version: '2.0.0',
	},
	servers: [
		{
			url: 'http://localhost:3010',
			description: 'Development server',
		},
	],
	components: {
		securitySchemes: {
			BearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
	paths: {
		...registration.swagger, ...login.swagger, ...userInfo.swagger
	}
};


const createPost = (route, dataPost) => {
	return {
		tags: [`${route.url}`],
		summary: '',
		description: route.description,
		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: dataPost,
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
	}
}
const createGet = (route, dataPost) => {
	return {
		tags: [`${route.url}`],
		summary: '',
		description: route.description,
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
								time: {type: "string"},
								id: {type: "string"},
								...dataPost
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


routesConfig?.forEach(route => {
	const dataPost = {}
	route?.fields?.forEach(field => {
		dataPost[field] = {
			type: "string"
		}
	})
	swaggerOptions.paths[("/api/" + route.url)] = {
		post: createPost(route, dataPost),
		get: createGet(route, dataPost)
	}
})

module.exports = swaggerOptions