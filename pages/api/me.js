import auth from 'lib/initAuth';

export default async function me(req, res) {
	try {
		await auth.handleProfile(req, res);
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
}
