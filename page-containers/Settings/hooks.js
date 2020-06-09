import { MeQuery } from 'graphql/Queries';
import { handleAuthError, isAuthError } from 'graphql/handlers';
import { useMutation } from '@apollo/react-hooks';
import { SignS3SingleMutation, EditProfileMutation } from 'graphql/Mutations';

export const useUpload = (enqueueSnackbar) =>
	useMutation(SignS3SingleMutation, {
		onError: async (e) => {
			await handleAuthError(e, null, enqueueSnackbar);
		},
	});

export const useEditProfile = (enqueueSnackbar) =>
	useMutation(EditProfileMutation, {
		onCompleted: async () => {
			enqueueSnackbar('Successfully updated profile!', {
				variant: 'success',
			});
		},
		onError: async (e) => {
			try {
				if (isAuthError(e)) {
					const redirectTo = Router.asPath;
					enqueueSnackbar('Re-authenticating', {
						variant: 'info',
					});
					redirect({}, createLoginURL('/api/login', redirectTo));
					return;
				}

				const { code } = e.graphQLErrors[0].extensions;

				switch (code) {
					case 'INVALID_USERNAME':
						enqueueSnackbar('Invalid Username!', {
							variant: 'error',
						});
						return;
				}
			} catch (er) {}
			enqueueSnackbar('Something went wrong, Try again later!', {
				variant: 'error',
			});
		},
		update: async (proxy, { data: { editProfile } }) => {
			const query = MeQuery;

			proxy.writeQuery({
				query,
				data: {
					me: editProfile,
				},
			});
		},
	});
