import { useUser } from 'lib/user';
import { schema } from './constants';
import { useState, memo } from 'react';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import profaneScan from 'lib/profaneScan';
import { Formik, Form, Field } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextFormField from 'views/TextFormField';
import { useMe } from 'lib/Providers/MeProvider';
import AvatarEditor from 'Components/AvatarEditor';
import { useEditProfile, useUpload } from './hooks';
import Typography from '@material-ui/core/Typography';
import { handleUpload, getAvatarSrc } from './helpers';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ palette }) => ({
		avatar: {
			width: 60,
			height: 60,
			backgroundColor: palette.primary.main,
		},
		remove: {
			color: palette.error.main,
		},
		multiline: {
			minHeight: 57,
		},
	}),
	{ name: 'SettingsProfile' }
);

export default memo(({}) => {
	const { me } = useMe();
	const { user } = useUser();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [avatarError, setAvatarError] = useState('');
	const [avatar, setAvatar] = useState(() => me?.avatar || '');

	// Custom Mutation Hooks
	const [signS3] = useUpload(enqueueSnackbar);
	const [editProfile] = useEditProfile(enqueueSnackbar);
	return (
		<Formik
			validationSchema={schema}
			initialValues={{
				bio: (me && me.bio) || '',
				avatar: (me && me.avatar) || '',
				username: (me && me.username) || '',
			}}
			onSubmit={async (values, actions) => {
				try {
					enqueueSnackbar('Submitting...', {
						variant: 'info',
					});
					values.avatar = await handleUpload(`${user.sub}:avatar`, avatar, signS3);

					await editProfile({
						variables: { profile: values },
					});
				} catch (e) {
					enqueueSnackbar('Something went wrong! Try again later', {
						variant: 'error',
					});
				}
			}}
		>
			{({ values }) => (
				<Grid item container spacing={3} component={Form}>
					<Grid item xs={12}>
						<Typography variant="h6">Profile</Typography>
					</Grid>

					<Grid item container spacing={2} wrap="nowrap" alignItems="center">
						<Grid item>
							<Avatar className={classes.avatar} src={getAvatarSrc(avatar)}>
								<Typography variant="h6">{user.given_name[0]}</Typography>
							</Avatar>
						</Grid>

						<AvatarEditor
							image={values.avatar}
							onSave={(img) => {
								setAvatarError('');

								setAvatar(img);
							}}
							onError={(e) => {
								setAvatarError(e);
							}}
						/>
					</Grid>

					{avatar && (
						<Grid item xs={12}>
							<Button size="small" color="inherit" className={classes.remove} onClick={() => setAvatar('')}>
								Delete
							</Button>
						</Grid>
					)}

					{avatarError && (
						<Grid item>
							<Typography color="error" variant="caption">
								{avatarError}
							</Typography>
						</Grid>
					)}

					<Grid item xs={12}>
						<Field
							margin="dense"
							name="username"
							variant="filled"
							label="Username"
							component={TextFormField}
							validate={(value) => {
								if (profaneScan.profane(value)) {
									return 'Invalid Username';
								}

								return undefined;
							}}
						/>
					</Grid>

					<Grid item xs={12}>
						<Field
							multiline
							name="bio"
							label="Bio"
							margin="dense"
							variant="filled"
							component={TextFormField}
							InputProps={{
								classes: {
									input: classes.multiline,
								},
							}}
							validate={(value) => {
								if (profaneScan.profane(value)) {
									return 'Contains invalid words';
								}

								return undefined;
							}}
						/>
						<div style={{ textAlign: 'right' }}>
							<Typography variant="caption">{values.bio.length || 0} / 120</Typography>
						</div>
					</Grid>

					<Grid item>
						<Button color="primary" type="submit" variant="contained">
							Submit
						</Button>
					</Grid>
				</Grid>
			)}
		</Formik>
	);
});
