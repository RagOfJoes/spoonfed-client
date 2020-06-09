import makeStyles from '@material-ui/core/styles/makeStyles';

const appBarStyle = (theme) => ({
	appbar: {
		border: 'none',
		zIndex: theme.zIndex.drawer + 1,
		color: theme.palette.text.primary,
		borderBottom: theme.palette.type === 'light' ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.12)',
	},
	appbarContainer: {},
	logoContainer: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
	logo: {
		width: 30,
		height: 30,
		cursor: 'pointer',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		color: theme.palette.background.paper,
		backgroundColor: theme.palette.primary.main,
	},
	spoonfed: {
		cursor: 'pointer',
		fontWeight: theme.typography.fontWeightMedium,
	},
	name: {
		color: theme.palette.getContrastText(theme.palette.background.paper),
	},
});

const useAppBarStyle = makeStyles(appBarStyle, {name: 'AppBar'});

export { appBarStyle, useAppBarStyle };

export default { appBarStyle, useAppBarStyle };
