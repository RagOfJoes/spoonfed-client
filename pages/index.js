import { NextSeo } from 'next-seo';
import Header from 'Components/Header/Header';
import Welcome from 'page-containers/Welcome';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<NextSeo
				title="Welcome"
				description="Sign-up and join Spoonfed today to find the perfect Recipe and share your delicious Creations!"
				openGraph={{
					title: 'Welcome | Spoonfed',
					images: [{ alt: 'Welcome to Spoonfed', url: '/images/ogImage.png' }],
				}}
			/>
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
