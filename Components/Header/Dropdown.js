import Link from 'next/link';
import redirect from 'lib/redirect';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import { useMe } from 'lib/Providers/MeProvider';
import ListItem from '@material-ui/core/ListItem';
import { LogoutMutation } from 'graphql/Mutations';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useThemeType } from 'lib/Providers/ThemeProvider';
import DarkThemeIcon from '@material-ui/icons/EmojiObjects';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import LightThemeIcon from '@material-ui/icons/EmojiObjectsOutlined';

const useStyles = makeStyles(
	({ spacing, palette, typography }) => ({
		popover: {},
		paper: {
			width: 320,
		},
		header: {
			padding: spacing(1, 2),
		},
		name: {
			fontWeight: typography.fontWeightMedium,
		},
		username: {
			color: palette.grey[500],
		},
		icon: {
			color: palette.text.secondary,
		},
		logout: {
			color: palette.error.main,
		},
		listText: {
			fontWeight: typography.fontWeightMedium,
		},
	}),
	{ name: 'AppBarDropdown' }
);

export default ({ name, anchorEl, onClose }) => {
	const { me } = useMe();
	const classes = useStyles();
	const open = Boolean(anchorEl);
	const client = useApolloClient();
	const { theme, setTheme } = useThemeType();
	const [logout] = useMutation(LogoutMutation);
	return (
		<Popover
			open={open}
			onClose={onClose}
			disableRestoreFocus
			anchorEl={anchorEl}
			className={classes.popover}
			PaperProps={{ elevation: 2 }}
			classes={{
				paper: classes.paper,
			}}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
		>
			<Grid container alignItems="center">
				<Grid item container direction="column" className={classes.header}>
					<Grid item>
						<Typography variant="h6" className={classes.name}>
							{name}
						</Typography>
					</Grid>

					<Grid item>
						<Typography variant="subtitle2" className={classes.username}>
							{me?.username}
						</Typography>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Divider />
				</Grid>

				<Grid item xs={12}>
					<List>
						{me?.username && (
							<Link
								shallow
								as={`/u/${me.username}`}
								href={{ pathname: '/u/[username]', query: { username: me.username } }}
							>
								<ListItem button>
									<ListItemIcon className={classes.icon}>
										<PersonIcon />
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{
											variant: 'body1',
											color: 'textSecondary',
											className: classes.listText,
										}}
									>
										Profile
									</ListItemText>
								</ListItem>
							</Link>
						)}

						<Link passHref href="/settings">
							<ListItem button>
								<ListItemIcon className={classes.icon}>
									<SettingsIcon />
								</ListItemIcon>
								<ListItemText
									primaryTypographyProps={{
										variant: 'body1',
										color: 'textSecondary',
										className: classes.listText,
									}}
								>
									Settings
								</ListItemText>
							</ListItem>
						</Link>

						<ListItem button onClick={() => setTheme()}>
							<ListItemIcon className={classes.icon}>
								{theme === 'light' ? <LightThemeIcon /> : <DarkThemeIcon />}
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{
									variant: 'body1',
									color: 'textSecondary',
									className: classes.listText,
								}}
							>
								Dark Mode: {theme === 'light' ? 'OFF' : 'ON'}
							</ListItemText>
						</ListItem>

						<ListItem
							button
							className={classes.logout}
							onClick={async () => {
								try {
									await logout();
								} catch {}
								await client.clearStore();
								return await redirect({}, '/api/logout');
							}}
						>
							<ListItemIcon className={classes.logout}>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{
									variant: 'body1',
									className: classes.listText,
								}}
							>
								Logout
							</ListItemText>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</Popover>
	);
};
