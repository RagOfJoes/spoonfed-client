import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Recipes from 'page-containers/Recipes';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Recipes | Spoonfed</title>
					<meta name="description" content="Recipes" />
				</Head>

				<Header />
				<Recipes />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
