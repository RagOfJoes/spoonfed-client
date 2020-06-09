export default function createLoginURL(loginPath = '/api/login', redirectTo) {
	return redirectTo != null ? `${loginPath}?redirectTo=${encodeURIComponent(redirectTo)}` : loginPath;
}
