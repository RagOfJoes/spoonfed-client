import { useState } from 'react';
import Dropdown from './Dropdown';
import { useUser } from 'lib/user';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { useMe } from 'lib/Providers/MeProvider';
import AppBarIconsLoading from './AppBarIcons.loading';
import { useAppBarIconsStyle } from './AppBarIcons.style';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default () => {
	const { me } = useMe();
	const { user, loading } = useUser();
	const classes = useAppBarIconsStyle();
	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	if (!user && !loading) {
		return (
			<Grid item container spacing={1} wrap="nowrap" direction="row" alignItems="center" justify="flex-end">
				<Grid item>
					<Button
						color="primary"
						disableElevation
						href="/api/login"
						variant="outlined"
						className={classes.signInButton}
					>
						Sign-in
					</Button>
				</Grid>
			</Grid>
		);
	}

	if (me && user && !loading) {
		const { given_name, family_name } = user;
		return (
			<Grid item container spacing={1} wrap="nowrap" direction="row" alignItems="center" justify="flex-end">
				<Grid item component={Hidden} xsDown>
					<Avatar src={me?.avatar} alt="Avatar" className={classes['avatar']}>
						{(given_name && given_name[0]) || ''}
					</Avatar>
				</Grid>

				<Grid item>
					<Button
						size="small"
						endIcon={<ArrowDropDownIcon />}
						onClick={(e) => handlePopoverOpen(e)}
						className={classes.myAccountButton}
					>
						My Account
					</Button>
				</Grid>

				<Dropdown anchorEl={anchorEl} onClose={() => setAnchorEl(null)} name={`${given_name} ${family_name}`} />
			</Grid>
		);
	}

	return <AppBarIconsLoading />;
};
