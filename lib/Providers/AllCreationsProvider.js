import { useSnackbar } from 'notistack';
import { forceCheck } from 'react-lazyload';
import { useQuery } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import { GetAllCreationsQuery } from 'graphql/Queries';
import { DEFAULT_CREATIONS_VARIABLE } from 'constants/index';
import React, { useState, useContext, useMemo, createContext, useEffect } from 'react';

const AllCreationsContext = createContext({
	defaultVariables: {},

	data: {},
	error: null,
	loading: false,
	fetchMore: () => {},

	isFetching: false,
	toggleFetching: () => {},

	isSorting: false,
	toggleSorting: () => {},
});

const AllCreationsProvider = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar();
	const [isSorting, toggleSorting] = useState(false);
	const [isFetching, toggleFetching] = useState(true);

	const defaultVariables = DEFAULT_CREATIONS_VARIABLE;
	const { data, error, loading, fetchMore } = useQuery(GetAllCreationsQuery, {
		variables: defaultVariables,
		onCompleted: () => toggleFetching(false),
		onError: async (e) => await handleAuthError(e, null, enqueueSnackbar),
	});

	// When sorting force
	// react-lazyload to check
	// if newly mounted components
	// are in viewport
	useEffect(() => {
		forceCheck();
	}, [isSorting]);

	const value = useMemo(
		() => ({
			defaultVariables,

			loading,
			fetchMore,
			error: error && error.message,
			data: data && data.getAllCreations,

			isFetching,
			toggleFetching,

			isSorting,
			toggleSorting,
		}),
		[data, loading, isSorting, isFetching]
	);

	return <AllCreationsContext.Provider value={value}>{children}</AllCreationsContext.Provider>;
};

export default AllCreationsProvider;

export const useAllCreations = () => useContext(AllCreationsContext);
