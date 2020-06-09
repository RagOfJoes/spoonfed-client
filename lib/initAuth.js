import initAuth from 'nextjs-oidc';
import oidcConfig from './oidcConfig';

const common = {
	clientId: oidcConfig.CLIENT_ID,
	scope: 'opendid profile email',
	redirectUri: oidcConfig.REDIRECT_URI,
	postLogoutRedirectUri: oidcConfig.POST_LOGOUT_REDIRECT_URI,
};

export default typeof window !== 'undefined'
	? initAuth(common)
	: initAuth({
			...common,
			issuer: oidcConfig.ISSUER,
			scope: 'openid profile email',
			clientId: oidcConfig.CLIENT_ID,
			redirectUri: oidcConfig.REDIRECT_URI,
			clientSecret: oidcConfig.CLIENT_SECRET,
			postLogoutRedirectUri: oidcConfig.POST_LOGOUT_REDIRECT_URI,
			session: {
				storeIdToken: true,
				cookieName: 'rp:sid',
				storeAccessToken: true,
				cookieLifetime: 60 * 60 * 24 * 14, // 2 weeks,
				cookieDomain: oidcConfig.COOKIE_DOMAIN,
				cookieSecret: oidcConfig.SESSION_COOKIE_SECRET,
				accessTokenLifetime: 60 * 60 * 24 * 14, // 2 weeks
			},
	  });
