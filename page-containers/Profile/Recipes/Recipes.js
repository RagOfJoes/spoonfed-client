import { memo } from 'react';
import Waypoint from './Waypoint';
import { useUser } from 'lib/user';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import RecipesLoading from './Recipes.loading';
import RecipeCard from 'Components/RecipeCard';
import { useMutation } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import Typography from '@material-ui/core/Typography';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import { useProfile } from 'lib/Providers/ProfileProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LikeRecipeMutation, UnlikeRecipeMutation } from 'graphql/Mutations';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			marginTop: theme.spacing(2),
		},
		image: {
			width: '100%',
			maxWidth: 500,
		},
	}),
	{ name: 'ProfileRecipes' }
);

export default memo(() => {
	const { user } = useUser();
	const classes = useStyles();
	const {
		recipes: { data, loading },
		profile: {
			data: { username },
		},
	} = useProfile();
	const { enqueueSnackbar } = useSnackbar();
	const [likeRecipeMutation] = useMutation(LikeRecipeMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
		},
	});
	const [unlikeRecipeMutation] = useMutation(UnlikeRecipeMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
		},
	});

	if (!loading && data && data?.edges.length > 0) {
		const { edges } = data;
		return (
			<Grid item container spacing={2} className={classes.container}>
				{edges.map((edge) => {
					const {
						id,
						slug,
						name,
						images,
						isLiked,
						servings,
						createdBy,
						time: { total },
					} = edge;
					return (
						<Grid key={id} item md={4} sm={6} xs={12}>
							<RecipeCard
								name={name}
								slug={slug}
								images={images}
								as={`/r/${slug}`}
								totalTime={total}
								isLiked={isLiked}
								servings={servings}
								createdBy={createdBy}
								href={`/u/[username]/t/[tab]?username=${username}&tab=recipes&recipeSlug=${slug}`}
								onLike={async () => {
									if (!user) {
										enqueueSnackbar(UNAUTHENTICATED_MSG, {
											variant: 'error',
										});
										return;
									}
									const variables = { recipeId: id };
									const optimisticResponse = {
										__typename: 'Mutation',
										[isLiked ? 'unlikeRecipe' : 'likeRecipe']: {
											id,
											isLiked: !isLiked,
											__typename: 'Recipe',
										},
									};

									if (isLiked) await unlikeRecipeMutation({ variables, optimisticResponse });
									else await likeRecipeMutation({ variables, optimisticResponse });
								}}
							/>
						</Grid>
					);
				})}

				<Waypoint />
			</Grid>
		);
	}

	if (!loading && data && data?.edges.length === 0) {
		return (
			<Grid
				item
				container
				spacing={3}
				justify="center"
				direction="column"
				alignItems="center"
				className={classes.container}
			>
				<Grid item>
					<Typography variant="h6">No Recipes yet!</Typography>
				</Grid>

				<Grid item container justify="center">
					<img alt="Invalid Recipe" title="Invalid Recipe" src="/images/NoData.svg" className={classes.image} />
				</Grid>
			</Grid>
		);
	}

	return <RecipesLoading />;
});
