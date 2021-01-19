import Profile from './Profile';
import ProfileProvider from 'lib/Providers/ProfileProvider';

const Index = () => {
	return (
		<ProfileProvider>
			<Profile />
		</ProfileProvider>
	);
};

export default Index;
