import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import Creations from 'page-containers/Creations';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Creations | Spoonfed</title>
					<meta name="description" content="Find the perfect inspiration for your next Creation!" />
					<meta name="og:description" content="Find the perfect inspiration for your next Creation!" />
				</Head>

				<Header />
				<Creations />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
