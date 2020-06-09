import { memo } from 'react';
import { useUser } from 'lib/user';
import Layout from 'Components/Layout';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import CreationCard from 'views/CreationCard';
import CreationDetail from './CreationDetail';
import { useMutation } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useAllCreations } from 'lib/Providers/AllCreationsProvider';
import { LikeCreationMutation, UnlikeCreationMutation } from 'graphql/Mutations';
import Waypoint from './Waypoint';
import CreationsLoading from './Creations.loading';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			width: '100%',
			maxWidth: 640,
			margin: 'auto',
			paddingTop: spacing(4),
		},
	}),
	{ name: 'CreationsPage' }
);

export default memo(() => {
	const { user } = useUser();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { data, loading } = useAllCreations();

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
	if (data && !loading) {
		return (
			<Layout>
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
							<Grid key={slug} item xs={12} container justify="center">
								<CreationCard
									name={full}
									slug={slug}
									title={title}
									avatar={avatar}
									isLiked={isLiked}
									image={images[0]}
									username={username}
									href={`/creations?creationSlug=${slug}`}
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
				<CreationDetail />
			</Layout>
		);
	}

	return (
		<Layout>
			<Grid container spacing={2} direction="row" className={classes.container}>
				<CreationsLoading />
			</Grid>
		</Layout>
	);
});
