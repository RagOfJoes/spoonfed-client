import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import Settings from 'page-containers/Settings';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Settings | Spoonfed</title>
					<meta key="title" property="og:title" content="Settings" />
				</Head>

				<Header />
        <Settings />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
