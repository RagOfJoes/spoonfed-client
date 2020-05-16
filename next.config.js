process.env.NODE_ENV !== 'production' && require('dotenv/config');

module.exports = {
	env: {
		PORT: process.env.PORT,
	},
};
