import React from 'react';
import Portal from '@material-ui/core/Portal';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from '@material-ui/core/Typography';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles(
	(theme) => ({
		root: {
			height: '100%',
			position: 'fixed',
			right: theme.spacing(2),
			bottom: theme.spacing(2),
			zIndex: theme.zIndex.drawer + 2,
		},
		backdrop: {
			height: '100%',
			overflowY: 'auto',
			overflowX: 'hidden',
			zIndex: theme.zIndex.drawer + 1,
		},
	}),
	{ name: 'CreateSpeedDial' }
);

export default () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Portal>
			<Backdrop open={open} className={classes.backdrop} />
			<SpeedDial
				open={open}
				onOpen={handleOpen}
				onClose={handleClose}
				className={classes.root}
				icon={<SpeedDialIcon />}
				ariaLabel="SpeedDial Routes"
				FabProps={{
					size: 'medium',
				}}
			>
				<SpeedDialAction
					tooltipOpen
					onClick={handleClose}
					icon={<AddToPhotosIcon />}
					FabProps={{ href: '/c/create' }}
					tooltipTitle={
						<Typography noWrap variant="subtitle2">
							New Creation
						</Typography>
					}
				/>
				<SpeedDialAction
					tooltipOpen
					onClick={handleClose}
					icon={<PostAddIcon />}
					FabProps={{ href: '/r/create' }}
					tooltipTitle={
						<Typography noWrap variant="subtitle2">
							New Recipe
						</Typography>
					}
				/>
			</SpeedDial>
		</Portal>
	);
};
