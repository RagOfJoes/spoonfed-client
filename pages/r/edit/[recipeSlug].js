import Head from 'next/head';
import auth from 'lib/initAuth';
import { ApolloClient } from 'apollo-client';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { GetRecipeDetail } from 'graphql/Queries';
import { initializeApollo } from 'lib/apolloClient';
import EditRecipe from 'page-containers/EditRecipe';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<>
			<Head>
				<title>Edit Recipe | Spoonfed</title>
				<meta key="title" name="og:title" content="Edit Recipe | Spoonfed" />
				<meta
					name="description"
					content="Join Spoonfed today to perfect your cooking skills and inspire others to do so!"
				/>
				<meta
					key="description"
					name="og:description"
					content="Join Spoonfed today to perfect your cooking skills and inspire others to do so!"
				/>
			</Head>
			<UserProvider value={{ user, loading }}>
				<MeProvider>
					<Header />
					<EditRecipe />
				</MeProvider>
			</UserProvider>
		</>
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
