import { NextSeo } from 'next-seo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import Creations from 'page-containers/Creations';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<NextSeo
				title="Creations"
				description="Spoonfed allows users to make and share new Creations. Join Spoonfed now to show off your delicious Creations!"
				openGraph={{
					title: 'Creations | Spoonfed',
					url: 'https://www.spoonfed.dev/creations',
					description:
						'Spoonfed allows users to make and share new Creations. Join Spoonfed now to show off your delicious Creations!',
				}}
			/>
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
