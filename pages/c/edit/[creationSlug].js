import Head from 'next/head';
import auth from 'lib/initAuth';
import { ApolloClient } from 'apollo-client';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { initializeApollo } from 'lib/apolloClient';
import { UserProvider, useFetchUser } from 'lib/user';
import EditCreation from 'page-containers/EditCreation';
import { GetCreationDetailQuery } from 'graphql/Queries';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<>
			<Head>
				<title>Edit Creation | Spoonfed</title>
				<meta key="title" name="og:title" content="Edit Creation | Spoonfed" />
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
					<EditCreation />
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
			skip: !query.creationSlug,
			query: GetCreationDetailQuery,
			variables: {
				slug: query?.creationSlug,
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
