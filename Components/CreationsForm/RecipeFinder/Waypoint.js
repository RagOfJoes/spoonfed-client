import { memo } from 'react';
import { useSnackbar } from 'notistack';
import { useRecipeFinder } from './Provider';
import Button from '@material-ui/core/Button';
import { handleAuthError } from 'graphql/handlers';
import { useApp } from 'lib/Providers/AppProvider';
import { GetRecipesForCreationsQuery } from 'graphql/Queries';

export default memo(({}) => {
	const { enqueueSnackbar } = useSnackbar();
	const {
		editCreations: { sort, filters },
	} = useApp();

	const { data, fetching, fetchMore, manipulating, toggleFetching } = useRecipeFinder();

	// Only render if User is not filtering, sorting, or is initially Fetching
	// And if there's a next page
	return (
		<Button
			fullWidth
			color="primary"
			variant="contained"
			disabled={fetching || !data?.pageInfo?.hasNextPage}
			onClick={async () => {
				const { pageInfo } = data;
				if (fetching || manipulating || !pageInfo.hasNextPage) return;

				toggleFetching(true);
				const variables = {
					filters,
					limit: 6,
					cursor: pageInfo.cursor,
					sort: { [sort.key]: sort.order },
				};

				try {
					await fetchMore({
						variables,
						query: GetRecipesForCreationsQuery,
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
		>
			Show More
		</Button>
	);
});
