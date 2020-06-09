import makeStyles from '@material-ui/core/styles/makeStyles';

const appBarIconStyle = (theme) => ({
	avatar: {
		color: theme.palette.background.paper,
		backgroundColor: theme.palette.primary.main,
	},
	signInButton: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
	myAccountButton: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		color: theme.palette.getContrastText(theme.palette.background.paper),
	},
});

const useAppBarIconsStyle = makeStyles(appBarIconStyle, { name: 'AppBarIcons' });

export { appBarIconStyle, useAppBarIconsStyle };

export default { appBarIconStyle, useAppBarIconsStyle };
