import { memo } from 'react';
import { useSnackbar } from 'notistack';
import { Waypoint } from 'react-waypoint';
import Grid from '@material-ui/core/Grid';
import ProfileCard from 'views/ProfileCard';
import { UserSearchQuery } from 'graphql/Queries';
import { handleAuthError } from 'graphql/handlers';
import { useUserSearch } from 'lib/Providers/UserSearchProvider';

export default memo(() => {
	const { enqueueSnackbar } = useSnackbar();

	const { data, fetchMore, isFetching, toggleFetching, defaultVariables } = useUserSearch();

	// Only render if User is not filtering, sorting, or is initially Fetching
	// And if there's a next page
	if (!isFetching && data?.pageInfo?.hasNextPage) {
		return (
			<Waypoint
				bottomOffset={0}
				onEnter={async () => {
					const { pageInfo } = data;
					if (isFetching || !pageInfo.hasNextPage) return;

					toggleFetching(true);
					const variables = {
						limit: 6,
						cursor: pageInfo.cursor,
						username: defaultVariables?.username || '',
					};

					try {
						await fetchMore({
							variables,
							query: UserSearchQuery,
							updateQuery: (prev, { fetchMoreResult }) => {
								if (!fetchMoreResult || !fetchMoreResult.userSearch) return prev;

								const { edges, pageInfo } = fetchMoreResult.userSearch;

								return {
									userSearch: {
										pageInfo,
										__typename: 'Users',
										edges: prev.userSearch.edges.concat(edges),
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

	if (isFetching) {
		return (
			<>
				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>
				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>
				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>
				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>
				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>
				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>
			</>
		);
	}

	return null;
});
