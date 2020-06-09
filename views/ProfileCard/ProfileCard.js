import React from 'react';
import Info from './Info';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles';
import ProfileCardLoading from './ProfileCard.loading';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ shape, spacing, palette }) => ({
		card: {
			transition: '0.4s',
			padding: spacing(2),
			border: '1.25px solid',
			borderRadius: shape.borderRadius * 2,
			borderColor: fade(palette.grey[600], 0.2),
			'&:hover': {
				borderColor: palette.primary.main,
			},
		},
	}),
	{ name: 'ProfileCard' }
);

export default React.memo(({ name, avatar, username, skeleton }) => {
	const classes = useStyles();

	if (skeleton) return <ProfileCardLoading />;

	return (
		<Grid container className={classes.card}>
			<Info avatar={avatar} name={name} username={username} />
		</Grid>
	);
});
