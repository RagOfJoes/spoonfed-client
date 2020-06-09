import { memo, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { RECIPE_TIME } from 'constants/index';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		list: {},
		listHeader: {
			cursor: 'pointer',
			position: 'relative',
		},
		listHeaderText: {
			fontSize: theme.typography.body2.fontSize,
		},
		collapseButton: {
			padding: theme.spacing(0.25, 2),

			[theme.breakpoints.down('xs')]: {
				padding: 0,
			},
		},
		timeKey: {
			textTransform: 'capitalize',
			fontWeight: theme.typography.fontWeightMedium,
			color: theme.palette.type === 'light' ? theme.palette.grey[600] : theme.palette.text.secondary,
		},
		timeValue: {
			textTransform: 'lowercase',
		},
	}),
	{ name: 'RecipeDetailTimes' }
);

export default memo(({ id, time }) => {
	const classes = useStyles();
	const [collapse, toggleCollapse] = useState(false);
	return (
		<Grid item>
			<List
				subheader={
					<Grid
						container
						alignItems="center"
						justify="space-between"
						className={classes.listHeader}
						onClick={() => toggleCollapse(!collapse)}
					>
						<Grid item>
							<ListSubheader disableSticky disableGutters className={classes.listHeaderText}>
								Times
							</ListSubheader>
						</Grid>

						<Grid item>
							<ListItem dense button disableRipple className={classes.collapseButton}>
								{collapse ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
							</ListItem>
						</Grid>
					</Grid>
				}
				className={classes.list}
			>
				<Collapse in={collapse} timeout="auto">
					{RECIPE_TIME.map((key) => {
						const val = time[key];

						if (!val || val.length === 0) return null;

						const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
						return (
							<ListItem dense divider key={`${id}-${key}`}>
								<ListItemText
									primary={
										<Typography variant="body2" className={classes.timeKey}>
											{capitalizedKey}
										</Typography>
									}
									secondary={
										<Typography variant="subtitle2" className={classes.timeValue}>
											{val}
										</Typography>
									}
								/>
							</ListItem>
						);
					})}
				</Collapse>
			</List>
		</Grid>
	);
});
