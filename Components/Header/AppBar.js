import Link from 'next/link';
import Routes from './Routes';
import Icons from './AppBarIcons';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useAppBarStyle } from './AppBar.style';
import { Typography, Avatar } from '@material-ui/core';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

const AppBarComponent = () => {
	const classes = useAppBarStyle();
	return (
		<AppBar elevation={0} variant="outlined" color="default" position="fixed" className={classes.appbar}>
			<Grid container justify="center" direction="column" className={classes.appbarContainer}>
				<Grid container wrap="nowrap" direction="row" component={Toolbar} justify="space-between">
					<Link href="/">
						<Grid item container spacing={1} alignItems="center" className={classes.logoContainer}>
							<Grid item>
								<Avatar className={classes.logo}>
									<LocalDiningIcon fontSize="small" />
								</Avatar>
							</Grid>

							<Grid item>
								<Typography variant="subtitle1" className={classes.spoonfed}>
									Spoonfed
								</Typography>
							</Grid>
						</Grid>
					</Link>

					<Icons />
				</Grid>
			</Grid>

			<Routes />
		</AppBar>
	);
};

export default AppBarComponent;
