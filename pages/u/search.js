import Head from 'next/head';
import Search from 'page-containers/Search';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Search | Spoonfed</title>
				</Head>

				<Header />
				<Search />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
