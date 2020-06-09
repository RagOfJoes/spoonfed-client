import { memo } from 'react';
import { useSnackbar } from 'notistack';
import { Waypoint } from 'react-waypoint';
import Grid from '@material-ui/core/Grid';
import RecipeCard from 'Components/RecipeCard';
import { handleAuthError } from 'graphql/handlers';
import { useApp } from 'lib/Providers/AppProvider';
import { GetAllRecipesQuery } from 'graphql/Queries';
import { useAllRecipes } from 'lib/Providers/AllRecipesProvider';

export default memo(() => {
	const { enqueueSnackbar } = useSnackbar();

	const {
		recipes: { sort, filters },
	} = useApp();

	const { data, fetchMore, isSorting, isFetching, toggleFetching } = useAllRecipes();

	// Only render if User is not filtering, sorting, or is initially Fetching
	// And if there's a next page
	if (!isSorting && !isFetching && data?.pageInfo?.hasNextPage) {
		return (
			<Waypoint
				bottomOffset={0}
				onEnter={async () => {
					const { pageInfo } = data;
					if (isSorting || isFetching || !pageInfo.hasNextPage) return;

					toggleFetching(true);
					const variables = {
						limit: 6,
						filters: filters,
						cursor: pageInfo.cursor,
						sort: { [sort.key]: sort.order },
					};

					try {
						await fetchMore({
							variables,
							query: GetAllRecipesQuery,
							updateQuery: (prev, { fetchMoreResult }) => {
								if (!fetchMoreResult || !fetchMoreResult.getAllRecipes) return prev;

								const { edges, pageInfo } = fetchMoreResult.getAllRecipes;

								return {
									getAllRecipes: {
										pageInfo,
										__typename: 'Recipes',
										edges: prev.getAllRecipes.edges.concat(edges),
									},
								};
							},
						});
						toggleFetching(false);
					} catch (e) {
						if (e?.name === 'Invariant Violation') return;

						await handleAuthError(e, null, enqueueSnackbar);
					}
				}}
			/>
		);
	}

	if (isSorting || isFetching) {
		return (
			<>
				<Grid item md={4} sm={6} xs={12}>
					<RecipeCard skeleton />
				</Grid>
				<Grid item md={4} sm={6} xs={12}>
					<RecipeCard skeleton />
				</Grid>
				<Grid item md={4} sm={6} xs={12}>
					<RecipeCard skeleton />
				</Grid>
				<Grid item md={4} sm={6} xs={12}>
					<RecipeCard skeleton />
				</Grid>
				<Grid item md={4} sm={6} xs={12}>
					<RecipeCard skeleton />
				</Grid>
				<Grid item md={4} sm={6} xs={12}>
					<RecipeCard skeleton />
				</Grid>
			</>
		);
	}

	return null;
});
