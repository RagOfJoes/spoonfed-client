/**
 * A proxy that lets you communicate with GQL Server using the session cookie
 * that is assigned to you from the browser/Auth
 */
import auth from 'lib/initAuth';

const gqlURL = process.env.GRAPHQL_SERVER;

export default async function graphql(req, res) {
	if (gqlURL == null) throw new Error('GRAPHQL_URL is missing!');

	if (req.method !== 'POST') {
		res.status(404);
		return;
	}

	const session = await auth.getSession(req);

	// Should only happen if we have an active session
	// and Access Token is either somewhat expire or does not
	// exist
	const noAccessToken = session && !session.accessToken;
	const expiredAccessToken = session && session?.user && session?.accessTokenExpiresAt * 1000 - 60000 < Date.now();
	if (expiredAccessToken) {
		res.status(401).json({
			error: true,
			code: 'access_token_expired',
			message: 'Access Token has expired',
		});

		res.end();

		return;
	}

	const getHeader = () => {
		if (noAccessToken) {
			return {
				accept: 'application/json',
				'accept-encoding': 'gzip, deflate',
				'content-type': 'application/json; charset=utf-8',
			};
		}

		return {
			accept: 'application/json',
			'accept-encoding': 'gzip, deflate',
			authorization: `Bearer ${session?.accessToken}`,
			'content-type': 'application/json; charset=utf-8',
		};
	};

	const headers = getHeader();

	try {
		// Execute GQL Operation
		const gqlResponse = await fetch(gqlURL, {
			headers,
			method: 'POST',
			body: JSON.stringify(req.body),
		});

		// Retrieve GQL Response
		const data = await gqlResponse.text();

		// Ensure to pass down appropriate Headers
		const contentType = gqlResponse.headers.get('content-type');
		if (contentType !== null) res.setHeader('content-type', contentType);
		res.status(gqlResponse.status).send(data);
	} catch (error) {
		if (res.writable) {
			res.status(error.status || 500).json({
				error: true,
				message: 'Internal server error',
				code: 500,
			});
		}
	}
}
