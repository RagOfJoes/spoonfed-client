import { memo } from 'react';
import { useUser } from 'lib/user';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default memo(() => {
	const { user } = useUser();
	return (
		<>
			<Grid item>
				<Typography variant="h6">Account</Typography>
			</Grid>

			<Grid item container spacing={1} justify="center">
				<Grid item xs={12} md={6}>
					<TextField
						disabled
						fullWidth
						margin="dense"
						variant="filled"
						label="First Name"
						value={user?.given_name || ''}
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<TextField
						disabled
						fullWidth
						margin="dense"
						variant="filled"
						label="Last Name"
						value={user?.family_name || ''}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField disabled fullWidth label="Email" margin="dense" variant="filled" value={user?.email || ''} />
				</Grid>
			</Grid>
		</>
	);
});
