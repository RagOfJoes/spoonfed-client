import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

// TODO: Pass Authorization Header to link
export default function createApolloClient(initialState, headers) {
	// The `ctx` (NextPageContext) will only be present on the server.
	// use it to extract auth headers (ctx.req) or similar.
	const serverURL = typeof window === 'undefined' ? process.env.GRAPHQL_SERVER : `${window.location.origin}/api/graphql`;

	const httpLink = new HttpLink({
		headers,
		uri: serverURL, // Server URL (must be absolute)
		credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
	});
	return new ApolloClient({
		link: httpLink,
		ssrMode: Boolean(typeof window === 'undefined'),
		connectToDevTools: process.env.NODE_ENV === 'development',
		cache: new InMemoryCache({
			dataIdFromObject: (object) => {
				switch (object.__typename) {
					case 'User':
						return `User:${object.sub}`;
					default:
						return defaultDataIdFromObject(object); // fall back to default handling
				}
			},
		}).restore(initialState),
	});
}
