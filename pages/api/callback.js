import auth from 'lib/initAuth';

export default async function callback(req, res, options = {}) {
	try {
		await auth.handleCallback(req, res, options);
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
}
