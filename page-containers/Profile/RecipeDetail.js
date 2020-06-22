import { useUser } from 'lib/user';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useMutation } from '@apollo/react-hooks';
import RecipeDetail from 'Components/RecipeDetail';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { handleAuthError, isAuthError } from 'graphql/handlers';
import { LikeRecipeMutation, UnlikeRecipeMutation } from 'graphql/Mutations';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			width: '100%',
			overflow: 'hidden',
			[theme.breakpoints.down('xs')]: {
				margin: theme.spacing(2),
				maxWidth: `calc(100% - ${theme.spacing(4)}px) !important`,
			},
		},
	}),
	{ name: 'RecipeDetailDialog' }
);

export default () => {
	const { user } = useUser();
	const router = useRouter();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [hasError, toggleError] = useState(false);
	const [likeRecipeMutation] = useMutation(LikeRecipeMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);

			if (!user) {
				enqueueSnackbar(UNAUTHENTICATED_MSG, {
					variant: 'error',
				});
			}
		},
	});
	const [unlikeRecipeMutation] = useMutation(UnlikeRecipeMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);

			if (!user) {
				enqueueSnackbar(UNAUTHENTICATED_MSG, {
					variant: 'error',
				});
			}
		},
	});

	useEffect(() => () => toggleError(false), []);
	const onClose = () =>
		!hasError &&
		router.push(
			{ pathname: '/u/[username]/t/[tab]', query: { username: router?.query?.username, tab: 'recipes' } },
			`/u/${router?.query?.username}/t/recipes`,
			{
				scroll: false,
				shallow: true,
			}
		);
	return (
		<Dialog
			maxWidth="md"
			scroll="body"
			onClose={onClose}
			onBackdropClick={onClose}
			disableBackdropClick={hasError}
			disableEscapeKeyDown={hasError}
			open={!!router?.query?.recipeSlug}
			PaperProps={{
				className: classes.container,
			}}
		>
			<RecipeDetail
				onError={(e) => {
					if (isAuthError(e)) toggleError(true);
				}}
				onLike={async (id, isLiked) => {
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
		</Dialog>
	);
};
