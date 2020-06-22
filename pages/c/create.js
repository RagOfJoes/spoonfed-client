import { NextSeo } from 'next-seo';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';
import CreateCreations from 'page-containers/CreateCreations';

const Index = () => {
	const { user, loading } = useFetchUser();

	return (
		<>
			<NextSeo title="New Creation" openGraph={{ title: 'New Creation | Spoonfed' }} />
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
