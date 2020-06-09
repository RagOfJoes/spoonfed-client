process.env.NODE_ENV !== 'production' && require('dotenv/config');

module.exports = {
	target: 'serverless',
	env: {
		PORT: process.env.PORT,
		GRAPHQL_SERVER: process.env.GRAPHQL_SERVER,
	},
};
