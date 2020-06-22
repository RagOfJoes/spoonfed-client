import { NextSeo } from 'next-seo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';
import CreateRecipe from 'page-containers/CreateRecipe';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<>
			<NextSeo title="Create a Recipe" openGraph={{ title: 'Create a Recipe | Spoonfed' }} />
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
