import { useMemo } from 'react';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

let apolloClient;

/**
 * @returns {ApolloClient}
 */
const createApolloClient = () => {
	const serverURL = typeof window === 'undefined' ? process.env.GRAPHQL_SERVER : `${window.location.origin}/api/graphql`;
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: new HttpLink({
			uri: serverURL, // Server URL (must be absolute)
			credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
		}),
		cache: new InMemoryCache({
			dataIdFromObject: (object) => {
				switch (object.__typename) {
					case 'User':
						return `User:${object.sub}`;
					default:
						return defaultDataIdFromObject(object); // fall back to default handling
				}
			},
		}),
	});
};

export const initializeApollo = (initialState = null) => {
	/**
	 * @type {ApolloClient}
	 */
	const _apolloClient = apolloClient ? apolloClient : createApolloClient();

	// On First render and if we have SSG or SSR then we hydrate the cache here
	if (initialState && !apolloClient) _apolloClient.cache.restore(initialState);

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
};

export const useApollo = (initialState) => {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
};
