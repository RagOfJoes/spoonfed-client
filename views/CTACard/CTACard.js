import { fade } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ shape, spacing, palette, breakpoints, typography }) => ({
		card: ({ bgColor = palette.primary.main }) => ({
			overflow: 'hidden',
			position: 'relative',
			padding: spacing(4, 2),
			backgroundColor: fade(bgColor, 0.7),
			borderRadius: shape.borderRadius * 2,

			[breakpoints.down('xs')]: {
				padding: spacing(1, 2),
			},
		}),
		title: {
			zIndex: 1,
			opacity: 0.8,
			fontWeight: typography.fontWeightMedium,
			color: palette.getContrastText('#2F6D65'),
		},
		description: {
			zIndex: 1,
			fontWeight: typography.fontWeightMedium,
			color: palette.getContrastText('#2F6D65'),
		},
		actions: {
			padding: spacing(1, 2),
		},
	}),
	{ name: 'CTACard' }
);

export default ({ bgColor, title, description, buttonText, onClickButton }) => {
	const classes = useStyles({ bgColor });
	return (
		<Card elevation={0} className={classes.card}>
			<CardContent>
				<Typography variant="subtitle1" color="textSecondary" gutterBottom className={classes.title}>
					{title}
				</Typography>

				<Typography variant="h6" className={classes.description}>
					{description}
				</Typography>
			</CardContent>
			<CardActions className={classes.actions}>
				<Button
					color="secondary"
					variant="contained"
					onClick={() => typeof onClickButton === 'function' && onClickButton()}
				>
					{buttonText}
				</Button>
			</CardActions>
		</Card>
	);
};
