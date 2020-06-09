import { memo } from 'react';
import { useSnackbar } from 'notistack';
import { Waypoint } from 'react-waypoint';
import Grid from '@material-ui/core/Grid';
import CreationCard from 'views/CreationCard';
import { useApp } from 'lib/Providers/AppProvider';
import { handleAuthError } from 'graphql/handlers';
import { GetAllCreationsQuery } from 'graphql/Queries';
import { useAllCreations } from 'lib/Providers/AllCreationsProvider';

export default memo(() => {
	const { enqueueSnackbar } = useSnackbar();

	const {
		creations: { sort },
	} = useApp();

	const { data, fetchMore, isSorting, isFetching, toggleFetching } = useAllCreations();

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
						sort: { [sort.key]: sort.order },
					};

					try {
						await fetchMore({
							variables,
							query: GetAllCreationsQuery,
							updateQuery: (prev, { fetchMoreResult }) => {
								if (!fetchMoreResult || !fetchMoreResult.getAllCreations) return prev;

								const { edges, pageInfo } = fetchMoreResult.getAllCreations;

								return {
									getAllCreations: {
										pageInfo,
										__typename: 'Creations',
										edges: prev.getAllCreations.edges.concat(edges),
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
				<Grid item xs={12}>
					<CreationCard skeleton />
				</Grid>

				<Grid item xs={12}>
					<CreationCard skeleton />
				</Grid>

				<Grid item xs={12}>
					<CreationCard skeleton />
				</Grid>

				<Grid item xs={12}>
					<CreationCard skeleton />
				</Grid>

				<Grid item xs={12}>
					<CreationCard skeleton />
				</Grid>

				<Grid item xs={12}>
					<CreationCard skeleton />
				</Grid>
			</>
		);
	}

	return null;
});
