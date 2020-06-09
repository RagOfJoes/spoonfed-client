import auth from 'lib/initAuth';

export default async function signup(req, res, options = {}) {
	try {
		await auth.handleLogin(req, res, {
			authParams: { prompt: 'sign_up', redirectTo: '/settings', ...options },
		});
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
}
