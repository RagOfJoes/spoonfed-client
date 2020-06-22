import { handleAuthError } from 'graphql/handlers';
import { GetRecipesForCreationsQuery } from 'graphql/Queries';

export const handleSortRecipe = async (sort, filters, fetchMore, toggleLoading, enqueueSnackbar) => {
	toggleLoading(true);
	const variables = {
		limit: 6,
		sort: {
			[sort.key]: sort.order,
		},
		filters,
	};

	try {
		await fetchMore({
			query: GetRecipesForCreationsQuery,
			variables,
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult || !fetchMoreResult.getAllRecipes) return prev;

				const { edges, pageInfo } = fetchMoreResult.getAllRecipes;

				if (!pageInfo.cursor) return prev;

				if (edges.length === 0) {
					return {
						getAllRecipes: {
							__typename: 'Recipes',
							edges: prev.getAllRecipes.edges,
							pageInfo,
						},
					};
				}

				return {
					getAllRecipes: {
						__typename: 'Recipes',
						edges: edges,
						pageInfo,
					},
				};
			},
		});
		toggleLoading(false);
	} catch (e) {
		await handleAuthError(e, null, enqueueSnackbar);
	}
};

export const handleFilterRecipe = async (filters, fetchMore, toggleLoading, enqueueSnackbar) => {
	toggleLoading(true);
	const variables = {
		filters,
		limit: 12,
		sort: {
			creation: 'DESC',
		},
	};

	try {
		await fetchMore({
			query: GetRecipesForCreationsQuery,
			variables,
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult || !fetchMoreResult.getAllRecipes) return prev;

				const { edges, pageInfo } = fetchMoreResult.getAllRecipes;

				if (edges.length === 0) {
					return {
						getAllRecipes: {
							__typename: 'Recipes',
							edges: [],
							pageInfo,
						},
					};
				}

				return {
					getAllRecipes: {
						__typename: 'Recipes',
						edges: edges,
						pageInfo,
					},
				};
			},
		});
		toggleLoading(false);
	} catch (e) {
		await handleAuthError(e, null, enqueueSnackbar, { disableRedirect: true });
	}
};
