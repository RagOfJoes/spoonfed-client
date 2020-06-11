import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import Welcome from 'page-containers/Welcome';
import { UserProvider, useFetchUser } from 'lib/user';
import MeProvider from 'lib/Providers/MeProvider';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Welcome | Spoonfed</title>
					<meta key="title" property="og:title" content="Welcome" />
				</Head>

				<Header />
				<Welcome />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
