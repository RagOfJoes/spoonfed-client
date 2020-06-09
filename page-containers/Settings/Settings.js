import Form from './Form';
import { useEffect } from 'react';
import { useUser } from 'lib/user';
import Layout from 'Components/Layout';
import { useSnackbar } from 'notistack';
import SettingsLoading from './Settings.loading';
import { useMe } from 'lib/Providers/MeProvider';
import Unauthenticated from 'Components/Unauthenticated';

export default () => {
	const { user, loading } = useUser();
	const { enqueueSnackbar } = useSnackbar();
	const { me, called, ...otherMe } = useMe();

	useEffect(() => {
		if (user && called && !otherMe.loading && (!me || !me.username)) {
			enqueueSnackbar('You have to finish the registration process!', {
				variant: 'warning',
				autoHideDuration: 1500,
			});
		}
	}, [user, me]);

	if (!loading && !user) return <Unauthenticated />;

	if (!loading && !otherMe.loading) {
		return (
			<Layout>
				<Form />
			</Layout>
		);
	}

	return <SettingsLoading />;
};
