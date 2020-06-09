import Head from 'next/head';
import { withApollo } from 'lib/withApollo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import EditRecipe from 'page-containers/EditRecipe';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Head>
					<title>Edit Recipe | Spoonfed</title>
				</Head>

				<Header />
				<EditRecipe />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
