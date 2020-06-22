import Head from 'next/head';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import Creations from 'page-containers/Creations';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<Head>
				<title>Creations | Spoonfed</title>
				<meta key="title" property="og:title" content="Creations | Spoonfed" />
				<meta
					name="description"
					content="Spoonfed allows users to make and share new Creations. Join Spoonfed now to show off your delicious Creations!"
				/>
				<meta
					key="description"
					name="og:description"
					content="Spoonfed allows users to make and share new Creations. Join Spoonfed now to show off your delicious Creations!"
				/>
			</Head>
			<UserProvider value={{ user, loading }}>
				<MeProvider>
					<Header />
					<Creations />
				</MeProvider>
			</UserProvider>
		</>
	);
};

export default Index;
