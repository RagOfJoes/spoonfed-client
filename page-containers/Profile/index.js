import Profile from './Profile';
import ProfileProvider from 'lib/Providers/ProfileProvider';

export default () => {
	return (
		<ProfileProvider>
			<Profile />
		</ProfileProvider>
	);
};
