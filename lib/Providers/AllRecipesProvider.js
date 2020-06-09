import { useSnackbar } from 'notistack';
import { forceCheck } from 'react-lazyload';
import { useQuery } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import { GetAllRecipesQuery } from 'graphql/Queries';
import { DEFAULT_RECIPES_VARIABLE } from 'constants/index';
import React, { useState, useContext, useMemo, createContext, useEffect } from 'react';

const AllRecipesContext = createContext({
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

const AllRecipesProvider = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar();
	const [isSorting, toggleSorting] = useState(false);
	const [isFetching, toggleFetching] = useState(true);

	const defaultVariables = DEFAULT_RECIPES_VARIABLE;
	const { data, error, loading, fetchMore } = useQuery(GetAllRecipesQuery, {
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
			data: data && data.getAllRecipes,

			isFetching,
			toggleFetching,

			isSorting,
			toggleSorting,
		}),
		[data, loading, isSorting, isFetching]
	);

	return <AllRecipesContext.Provider value={value}>{children}</AllRecipesContext.Provider>;
};

export default AllRecipesProvider;

export const useAllRecipes = () => useContext(AllRecipesContext);
