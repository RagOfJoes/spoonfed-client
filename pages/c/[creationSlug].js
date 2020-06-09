import Head from 'next/head';
import Layout from 'Components/Layout';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { useMutation } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import { UserProvider, useFetchUser } from 'lib/user';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LikeRecipeMutation, UnlikeRecipeMutation } from 'graphql/Mutations';
import CreationDetail from 'Components/CreationDetail/CreationDetail';

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
				<Head>
					<title>Creation Detail | Spoonfed</title>
				</Head>

				<Header />
				<Layout>
					<Grid container direction="column" className={classes.container}>
						<CreationDetail
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

export default withApollo({ ssr: true })(Index);
