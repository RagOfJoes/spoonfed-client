import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useQuery } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import { UserSearchQuery } from 'graphql/Queries';
import React, { useState, useContext, useMemo, createContext } from 'react';

const UserSearchContext = createContext({
	defaultVariables: {},

	data: {},
	error: null,
	loading: false,
	fetchMore: () => {},

	isFetching: false,
	toggleFetching: () => {},
});

const UserSearchProvider = ({ children }) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const [isFetching, toggleFetching] = useState(true);

	const defaultVariables = {
		limit: 10,
		username: router.query?.username,
	};
	const { data, error, loading, fetchMore } = useQuery(UserSearchQuery, {
		variables: defaultVariables,
		onCompleted: () => toggleFetching(false),
		onError: async (e) => await handleAuthError(e, null, enqueueSnackbar),
	});

	const value = useMemo(
		() => ({
			defaultVariables,

			loading,
			fetchMore,
			error: error && error.message,
			data: data && data.userSearch,

			isFetching,
			toggleFetching,
		}),
		[data, loading, isFetching]
	);

	return <UserSearchContext.Provider value={value}>{children}</UserSearchContext.Provider>;
};

export default UserSearchProvider;

export const useUserSearch = () => useContext(UserSearchContext);
