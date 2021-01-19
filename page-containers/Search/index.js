import Search from './Search';
import UserSearchProvider from 'lib/Providers/UserSearchProvider';

const Index = () => {
	return (
		<UserSearchProvider>
			<Search />
		</UserSearchProvider>
	);
};

export default Index;
