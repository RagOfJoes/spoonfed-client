import React from 'react';
import Tooltip from './Tooltip';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import CallMade from '@material-ui/icons/CallMade';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ shape, spacing, palette, typography, breakpoints }) => ({
		loading: {
			transition: '0.4s',
			padding: spacing(2),
			border: '1.25px solid',
			borderRadius: shape.borderRadius * 2,
			borderColor: fade(palette.grey[600], 0.2),
			'&:hover': {
				borderColor: palette.primary.main,
			},
		},

		content: {
			padding: spacing(2),
			position: 'relative',

			[breakpoints.down('xs')]: {
				padding: spacing(1),
			},
		},
		avatar: {
			width: 50,
			height: 50,

			[breakpoints.down('sm')]: {
				width: 45,
				height: 45,
			},
		},
		text: {
			display: 'flex',
			overflow: 'hidden',
			flexDirection: 'column',
			justifyContent: 'center',
		},
		overline: {
			color: 'transparent',
			fontSize: typography.pxToRem(16),
			fontWeight: typography.fontWeightMedium,
		},
		name: {
			color: 'transparent',
			fontSize: typography.pxToRem(14),
			fontWeight: typography.fontWeightRegular,
		},
	}),
	{ name: 'Profileloading' }
);

export default React.memo(({}) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.loading}>
			<Grid container spacing={2} alignItems="center" className={classes.content}>
				<Grid item>
					<Skeleton variant="circle" className={classes.avatar}></Skeleton>
				</Grid>

				<Grid item xs={12} sm="auto" className={classes.text}>
					<Skeleton width={220} height={48} />

					<Skeleton width={140} height={28} />
				</Grid>
			</Grid>
		</Grid>
	);
});
