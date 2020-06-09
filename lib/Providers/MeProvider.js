import { useUser } from 'lib/user';
import redirect from 'lib/redirect';
import { useRouter } from 'next/router';
import { MeQuery } from 'graphql/Queries';
import { useQuery } from '@apollo/react-hooks';
import { createContext, useMemo, useContext } from 'react';

const MeContext = createContext({
	me: {},
	error: {},
	called: false,
	loading: false,
});

const MeProvider = ({ children }) => {
	const user = useUser();
	const router = useRouter();
	const { data, error, called, loading } = useQuery(MeQuery, {
		skip: Boolean(!user.user || user.loading),
	});

	const value = useMemo(
		() => ({
			error,
			called,
			loading,
			me: data && data.me,
		}),
		[data, error, called, loading]
	);

	if (called && data && (!data.me || !data.me.username)) {
		if (router.pathname !== '/settings') router.push('/settings');
	}

	return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};

export default MeProvider;

export const useMe = () => useContext(MeContext);
