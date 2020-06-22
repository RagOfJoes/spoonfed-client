import { NextSeo } from 'next-seo';
import Search from 'page-containers/Search';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<>
			<NextSeo
				title="Search"
				openGraph={{
					title: 'Search | Spoonfed',
					url: 'https://www.spoonfed.dev/u/search',
				}}
			/>
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
