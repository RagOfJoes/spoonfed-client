import auth from 'lib/initAuth';
import { NextSeo } from 'next-seo';
import { MeQuery } from 'graphql/Queries';
import Header from 'Components/Header/Header';
import Settings from 'page-containers/Settings';
import MeProvider from 'lib/Providers/MeProvider';
import { initializeApollo } from 'lib/apolloClient';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<NextSeo
				noindex={true}
				title="Settings"
				openGraph={{
					title: 'Settings | Spoonfed',
					url: 'https://www.spoonfed.dev/settings',
				}}
			/>
			<UserProvider value={{ user, loading }}>
				<MeProvider>
					<Header />
					<Settings />
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
		await apolloClient.query({
			query: MeQuery,
			skip: !Boolean(session.user),
			context: {
				headers: {
					authorization: `Bearer ${session.accessToken}`,
				},
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
