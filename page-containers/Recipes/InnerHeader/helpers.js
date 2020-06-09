import { handleAuthError } from 'graphql/handlers';
import { GetAllRecipesQuery } from 'graphql/Queries';

export const handleSortRecipe = async (sort, filters, fetchMore, toggleSorting, enqueueSnackbar) => {
	toggleSorting(true);
	const variables = {
		limit: 6,
		sort: {
			[sort.key]: sort.order,
		},
		filters,
	};

	try {
		await fetchMore({
			query: GetAllRecipesQuery,
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
		toggleSorting(false);
	} catch (e) {
		await handleAuthError(e, null, enqueueSnackbar);
	}
};

export const handleFilterRecipe = async (sort, filters, fetchMore, toggleSorting, enqueueSnackbar) => {
	toggleSorting(true);
	const variables = {
		limit: 6,
		sort: {
			[sort.key]: sort.order,
		},
		filters,
	};

	try {
		await fetchMore({
			query: GetAllRecipesQuery,
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
		toggleSorting(false);
	} catch (e) {
		await handleAuthError(e, null, enqueueSnackbar);
	}
};
