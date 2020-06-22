import Head from 'next/head';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';
import CreateCreations from 'page-containers/CreateCreations';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<>
			<Head>
				<title>New Creation | Spoonfed</title>
				<meta key="title" name="og:title" content="New Creation | Spoonfed" />
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
					<CreateCreations />
				</MeProvider>
			</UserProvider>
		</>
	);
};

export default Index;
