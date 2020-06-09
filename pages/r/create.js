import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';
import CreateRecipe from 'page-containers/CreateRecipe';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Create a Recipe | Spoonfed</title>
				</Head>

				<Header />
				<CreateRecipe />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
