import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import Profile from 'page-containers/Profile';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>User | Spoonfed</title>
				</Head>

				<Header />
				<Profile />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
