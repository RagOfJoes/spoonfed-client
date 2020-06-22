import { ApolloClient } from 'apollo-client';
import Header from 'Components/Header/Header';
import Profile from 'page-containers/Profile';
import { GetServerSidePropsContext } from 'next';
import MeProvider from 'lib/Providers/MeProvider';
import { initializeApollo } from 'lib/apolloClient';
import { UserProvider, useFetchUser } from 'lib/user';
import { GetUserProfileQuery } from 'graphql/Queries';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Header />
				<Profile />
			</MeProvider>
		</UserProvider>
	);
};

/**
 *
 * @param {GetServerSidePropsContext} ctx
 */
export async function getServerSideProps({ query }) {
	/**
	 * @type {ApolloClient}
	 */
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: GetUserProfileQuery,
		skip: !query?.username,
		variables: {
			username: query?.username,
		},
	});

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
	};
}

export default Index;
