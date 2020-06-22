import { NextSeo } from 'next-seo';
import Recipes from 'page-containers/Recipes';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<NextSeo
				title="Recipes"
				description="Spoonfed allows users to store and share their favorite recipes to other users. Join others and sign-up now to find the perfect recipe for you!"
				openGraph={{
					title: 'Recipes | Spoonfed',
					url: 'https://www.spoonfed.dev/recipes',
					description:
						'Spoonfed allows users to store and share their favorite recipes to other users. Join others and sign-up now to find the perfect recipe for you!',
				}}
			/>
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
