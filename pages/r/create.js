import Head from 'next/head';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';
import CreateRecipe from 'page-containers/CreateRecipe';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<>
			<Head>
				<title>Create a Recipe | Spoonfed</title>
				<meta key="title" property="og:title" content="Create a Recipe | Spoonfed" />
				<meta
					name="description"
					content="Join Spoonfed today to perfect your cooking skills and inspire others to do so!"
				/>
				<meta
					key="description"
					name="og:description"
					content="Join Spoonfed today to perfect your cooking skills and inspire others to do so!"
				/>
			</Head>
			<UserProvider value={{ user, loading }}>
				<MeProvider>
					<Header />
					<CreateRecipe />
				</MeProvider>
			</UserProvider>
		</>
	);
};

export default Index;
