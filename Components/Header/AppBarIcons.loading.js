import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Skeleton from '@material-ui/lab/Skeleton';
import { useAppBarIconsStyle } from './AppBarIcons.style';

const AppBarIconsLoading = () => {
	const classes = useAppBarIconsStyle();

	return (
		<Grid item container spacing={1} wrap="nowrap" direction="row" alignItems="center" justify="flex-end">
			<Grid item component={Hidden} xsDown>
				<Skeleton width={40} height={40} variant="circle" className={classes.avatar} />
			</Grid>

			<Grid item style={{ minWidth: 120 }}>
				<Skeleton width="100%" height={39} variant="rect" />
			</Grid>
		</Grid>
	);
};

export default AppBarIconsLoading;
