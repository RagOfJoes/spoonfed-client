import { memo } from 'react';
import Waypoint from './Waypoint';
import { useUser } from 'lib/user';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import RecipeCard from 'Components/RecipeCard';
import { useMutation } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import { useAllRecipes } from 'lib/Providers/AllRecipesProvider';
import { LikeRecipeMutation, UnlikeRecipeMutation } from 'graphql/Mutations';

export default memo(() => {
	const { user } = useUser();
	const { data, isSorting } = useAllRecipes();
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

	if (isSorting) {
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

	return (
		<Grid item container spacing={2}>
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
							totalTime={total}
							isLiked={isLiked}
							servings={servings}
							createdBy={createdBy}
							href={`/recipes?recipeSlug=${slug}`}
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
