import Search from './Search';
import UserSearchProvider from 'lib/Providers/UserSearchProvider';

export default () => {
	return (
		<UserSearchProvider>
			<Search />
		</UserSearchProvider>
	);
};
