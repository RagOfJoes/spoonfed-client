import { memo } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Waypoint } from 'react-waypoint';
import Grid from '@material-ui/core/Grid';
import RecipeCard from 'Components/RecipeCard';
import { handleAuthError } from 'graphql/handlers';
import { GetUserCreationsQuery } from 'graphql/Queries';
import { useProfile } from 'lib/Providers/ProfileProvider';

export default memo(() => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const {
		sort,
		isSorting,
		isFetching,
		toggleFetching,
		creations: { data, fetchMore },
	} = useProfile();

	// Only render if User is not filtering, sorting, or is initially Fetching
	// And if there's a next page
	if (!isSorting && !isFetching && data?.pageInfo?.hasNextPage) {
		return (
			<Waypoint
				fireOnRapidScroll
				bottomOffset="-25%"
				onEnter={async () => {
					const { pageInfo } = data;
					if (isSorting || isFetching || !pageInfo.hasNextPage) return;

					toggleFetching(true);
					const variables = {
						limit: 6,
						cursor: pageInfo.cursor,
						user: router?.query?.username,
						sort: { [sort.key]: sort.order },
					};

					try {
						await fetchMore({
							variables,
							query: GetUserCreationsQuery,
							updateQuery: (prev, { fetchMoreResult }) => {
								if (!fetchMoreResult || !fetchMoreResult.getUserCreations) return prev;

								const { edges, pageInfo } = fetchMoreResult.getUserCreations;

								return {
									getUserCreations: {
										pageInfo,
										__typename: 'Creations',
										edges: prev.getUserCreations.edges.concat(edges),
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
