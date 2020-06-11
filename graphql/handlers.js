import Router from 'next/router';
import redirect from 'lib/redirect';
import createLoginURL from 'lib/createLoginURL';

/**
 *
 * @param {Object} error Error to check
 */
export const isAuthError = (error) => {
	if (!error) return false;

	try {
		if (error?.networkError?.result?.code === 'access_token_expired' && error?.networkError?.statusCode === 401) return true;

		if (error.graphQLErrors && error.graphQLErrors.length > 0) {
			const { code } = error.graphQLErrors[0].extensions;

			if (code === 'UNAUTHENTICATED') return true;
		}
	} catch (e) {}

	return false;
};

/**
 * Handler for dealing with authentication errors from GQL Server
 * @param {Object} error
 * @param {Function} onError callback w/ error passed down, use for notifications, etc.
 * @param {Function} enqueueSnackbar
 * @param {Object} options
 */
export const handleAuthError = async (
	error,
	onError,
	enqueueSnackbar,
	{ disableRedirect = false, message = 'Something went wrong, Try again later!' } = {}
) => {
	if (!error) return;

	if (!enqueueSnackbar || typeof enqueueSnackbar !== 'function') {
		throw new Error('You must provide an enqueueSnackbar Function!');
	}

	if (typeof onError === 'function') onError(error);
	try {
		if (isAuthError(error)) {
			const redirectTo = Router.asPath;
			enqueueSnackbar('Re-authenticating', {
				variant: 'info',
			});
			!disableRedirect && redirect({}, createLoginURL('/api/login', redirectTo));
			return;
		}

		enqueueSnackbar(message, {
			variant: 'error',
		});
	} catch (e) {}

	!disableRedirect && redirect({}, '/');
};
