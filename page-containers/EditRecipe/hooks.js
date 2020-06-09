import Router from 'next/router';
import { GetRecipeDetail } from 'graphql/Queries';
import { handleAuthError } from 'graphql/handlers';
import { EditRecipeMutation } from 'graphql/Mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const useRecipeDetail = (enqueueSnackbar, onError) =>
	useQuery(GetRecipeDetail, {
		skip: !Router?.query?.recipeSlug,
		variables: {
			slug: Router?.query?.recipeSlug,
		},
		onError: async (e) => {
			if (onError && typeof onError === 'function') await onError(e);

			await handleAuthError(e, null, enqueueSnackbar);
		},
	});

export const useEditRecipe = (enqueueSnackbar) =>
	useMutation(EditRecipeMutation, {
		onCompleted: ({ editRecipe }) => {
			if (editRecipe?.slug) {
				const { slug } = editRecipe;
				enqueueSnackbar('Successfully edited Recipe!', {
					variant: 'success',
				});
				Router.push({ query: { recipeSlug: slug }, pathname: '/r/[recipeSlug]' }, `/r/${slug}`);
				return;
			}
		},
	});
