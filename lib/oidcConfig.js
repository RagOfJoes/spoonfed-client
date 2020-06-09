if (typeof window === 'undefined') {
	/**
	 * Settings exposed to the server.
	 */
	module.exports = {
		ISSUER: process.env.ISSUER,
		URI: process.env.REDIRECT_URI,
		CLIENT_ID: process.env.CLIENT_ID,
		REDIRECT_URI: process.env.REDIRECT_URL,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		COOKIE_DOMAIN: process.env.SESSION_COOKIE_DOMAIN,
		SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
		POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
	};
} else {
	/**
	 * Settings exposed to the client.
	 */
	module.exports = {
		ISSUER: process.env.ISSUER,
		CLIENT_ID: process.env.CLIENT_ID,
		REDIRECT_URI: process.env.REDIRECT_URL,
		COOKIE_DOMAIN: process.env.SESSION_COOKIE_DOMAIN,
		POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
	};
}
