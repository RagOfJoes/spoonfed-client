import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';
import EditCreation from 'page-containers/EditCreation';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Edit Creation | Spoonfed</title>
					<meta key="title" property="og:title" content="Edit Creation" />
				</Head>

				<Header />
				<EditCreation />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
