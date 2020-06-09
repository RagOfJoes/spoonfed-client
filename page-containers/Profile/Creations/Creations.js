import { memo } from 'react';
import Waypoint from './Waypoint';
import { useUser } from 'lib/user';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import CreationCard from 'views/CreationCard';
import { useMutation } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import CreationsLoading from './Creations.loading';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import { useProfile } from 'lib/Providers/ProfileProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LikeCreationMutation, UnlikeCreationMutation } from 'graphql/Mutations';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			width: '100%',
			marginTop: spacing(2),
		},
	}),
	{ name: 'ProfileCreations' }
);

export default memo(() => {
	const { user } = useUser();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const {
		creations: { data, loading },
	} = useProfile();

	const [likeCreationMutation] = useMutation(LikeCreationMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
		},
	});
	const [unlikeCreationMutation] = useMutation(UnlikeCreationMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
		},
	});

	if (!loading && data) {
		return (
			<Grid container spacing={2} direction="row" className={classes.container}>
				{data?.edges.map((creation) => {
					const {
						id,
						slug,
						title,
						images,
						isLiked,
						createdBy: {
							avatar,
							username,
							name: { full },
						},
					} = creation;

					return (
						<Grid key={slug} item xs={12} sm={6} md={4} container justify="center">
							<CreationCard
								name={full}
								slug={slug}
								title={title}
								avatar={avatar}
								as={`/c/${slug}`}
								isLiked={isLiked}
								image={images[0]}
								username={username}
								href={`/u/[username]/creations?username=${username}&creationSlug=${slug}`}
								onLike={async () => {
									if (!user) {
										enqueueSnackbar(UNAUTHENTICATED_MSG, {
											variant: 'error',
										});
										return;
									}
									const variables = { creationId: id };
									const optimisticResponse = {
										__typename: 'Mutation',
										[isLiked ? 'unlikeCreation' : 'likeCreation']: {
											id,
											isLiked: !isLiked,
											__typename: 'Creation',
										},
									};

									if (isLiked) await unlikeCreationMutation({ variables, optimisticResponse });
									else await likeCreationMutation({ variables, optimisticResponse });
								}}
							/>
						</Grid>
					);
				})}

				<Waypoint />
			</Grid>
		);
	}

	return <CreationsLoading />;
});
