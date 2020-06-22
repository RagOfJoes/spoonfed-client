import Head from 'next/head';
import Search from 'page-containers/Search';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<Head>
				<title>Search | Spoonfed</title>
				<meta key="title" name="og:title" content="Search | Spoonfed" />
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
					<Search />
				</MeProvider>
			</UserProvider>
		</>
	);
};

export default Index;
