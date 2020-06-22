import auth from 'lib/initAuth';
import { NextSeo } from 'next-seo';
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
			<NextSeo title="Edit Recipe" openGraph={{ title: 'Edit Recipe | Spoonfed' }} />
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
