import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';
import CreateCreations from 'page-containers/CreateCreations';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>New Creation | Spoonfed</title>
					<meta key="title" property="og:title" content="New Creation" />
				</Head>

				<Header />
					<CreateCreations />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
