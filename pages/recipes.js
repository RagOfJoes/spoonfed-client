import { withApollo } from 'lib/withApollo';
import Recipes from 'page-containers/Recipes';
import Header from 'Components/Header/Header';
import MeProvider from 'lib/Providers/MeProvider';
import { UserProvider, useFetchUser } from 'lib/user';

const Index = () => {
	const { user, loading } = useFetchUser();
	return (
		<UserProvider value={{ user, loading }}>
			<MeProvider>
				<Header />
				<Recipes />
			</MeProvider>
		</UserProvider>
	);
};

export default withApollo({ ssr: true })(Index);
