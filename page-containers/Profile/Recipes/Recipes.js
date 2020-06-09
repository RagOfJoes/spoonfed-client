import { memo } from 'react';
import Waypoint from './Waypoint';
import { useUser } from 'lib/user';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import RecipeCard from 'Components/RecipeCard';
import { useMutation } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import { useProfile } from 'lib/Providers/ProfileProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LikeRecipeMutation, UnlikeRecipeMutation } from 'graphql/Mutations';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(2),
	},
}), {name: 'ProfileRecipes'});

export default memo(() => {
	const { user } = useUser();
	const classes = useStyles();
	const {
		recipes: { data },
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
	return (
		<Grid item container spacing={2} className={classes.container}>
			{data?.edges.map((edge) => {
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
							href={`/u/[username]?username=${username}&recipeSlug=${slug}`}
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
});
