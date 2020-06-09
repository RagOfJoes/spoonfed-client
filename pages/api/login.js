import auth from 'lib/initAuth';

export default async function login(req, res, options = {}) {
	try {
		await auth.handleLogin(req, res, options);
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
}
