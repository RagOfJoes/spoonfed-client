if (typeof window === 'undefined') {
	/**
	 * Settings exposed to the server.
	 */
	module.exports = {
		SCOPE: process.env.SCOPE,
		ISSUER: process.env.ISSUER,
		URI: process.env.REDIRECT_URI,
		CLIENT_ID: process.env.CLIENT_ID,
		REDIRECT_URI: process.env.REDIRECT_URL,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
		POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI
	};
} else {
	/**
	 * Settings exposed to the client.
	 */
	module.exports = {
		SCOPE: process.env.SCOPE,
		ISSUER: process.env.ISSUER,
		CLIENT_ID: process.env.CLIENT_ID,
		REDIRECT_URI: process.env.REDIRECT_URL,
		POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI
	};
}
