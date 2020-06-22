import auth from 'lib/initAuth';
import Layout from 'Components/Layout';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { ApolloClient } from 'apollo-client';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { useMutation } from '@apollo/react-hooks';
import { GetRecipeDetail } from 'graphql/Queries';
import { handleAuthError } from 'graphql/handlers';
import RecipeDetail from 'Components/RecipeDetail';
import { initializeApollo } from 'lib/apolloClient';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import { UserProvider, useFetchUser } from 'lib/user';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LikeRecipeMutation, UnlikeRecipeMutation } from 'graphql/Mutations';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			paddingTop: theme.spacing(3),
		},
	}),
	{ name: 'RecipeDetailPage' }
);

const Index = () => {
	const classes = useStyles();
	const { user, loading } = useFetchUser();
	const { enqueueSnackbar } = useSnackbar();

	const [likeRecipeMutation] = useMutation(LikeRecipeMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
			// TODO: if not user then prompt with Auth Dialog
		},
	});
	const [unlikeRecipeMutation] = useMutation(UnlikeRecipeMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
			// TODO: if not user then prompt with Auth Dialog
		},
	});
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Header />
				<Layout>
					<Grid container direction="column" className={classes.container}>
						<RecipeDetail
							onLike={async (id, isLiked, numOfLikes) => {
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
										numOfLikes: isLiked ? numOfLikes-- : numOfLikes++,
										__typename: 'Recipe',
									},
								};

								if (isLiked) await unlikeRecipeMutation({ variables, optimisticResponse });
								else await likeRecipeMutation({ variables, optimisticResponse });
							}}
						/>
					</Grid>
				</Layout>
			</MeProvider>
		</UserProvider>
	);
};

/**
 *
 * @param {GetServerSidePropsContext} ctx
 */
export async function getServerSideProps({ req, query }) {
	/**
	 * @type {ApolloClient}
	 */
	const apolloClient = initializeApollo();

	try {
		const session = await auth.getSession(req);

		const context =
			session && session?.accessToken
				? {
						headers: {
							authorization: `Bearer ${session?.accessToken}`,
						},
				  }
				: {};

		await apolloClient.query({
			context,
			query: GetRecipeDetail,
			skip: !query.recipeSlug,
			variables: {
				slug: query?.recipeSlug,
			},
		});
	} catch (e) {}

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
	};
}

export default Index;
