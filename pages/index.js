import Head from 'next/head';
import Header from 'Components/Header/Header';
import Welcome from 'page-containers/Welcome';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<Head>
				<title>Welcome | Spoonfed</title>
				<meta key="title" property="og:title" content="Welcome | Spoonfed" />
				<meta key="image" property="og:image" content="/images/ogImage.png" />
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
					<Welcome />
				</MeProvider>
			</UserProvider>
		</>
	);
};

export default Index;
