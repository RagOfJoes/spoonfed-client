process.env.NODE_ENV !== 'production' && require('dotenv/config');

module.exports = {
	target: 'serverless',
	env: {
		ISSUER: process.env.ISSUER,
		CLIENT_ID: process.env.CLIENT_ID,
		REDIRECT_URI: process.env.REDIRECT_URL,
		POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
	},
};
