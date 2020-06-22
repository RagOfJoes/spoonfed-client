import Head from 'next/head';
import Recipes from 'page-containers/Recipes';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<Head>
				<title>Recipes | Spoonfed</title>
				<meta key="title" name="og:title" content="Recipes | Spoonfed" />
				<meta
					name="description"
					content="Spoonfed allows users to store and share their favorite recipes to other users. Join others and sign-up now to find the perfect recipe for you!"
				/>
				<meta
					key="description"
					name="og:description"
					content="Spoonfed allows users to store and share their favorite recipes to other users. Join others and sign-up now to find the perfect recipe for you!"
				/>
			</Head>
			<UserProvider value={{ user, loading }}>
				<MeProvider>
					<Header />
					<Recipes />
				</MeProvider>
			</UserProvider>
		</>
	);
};

export default Index;
