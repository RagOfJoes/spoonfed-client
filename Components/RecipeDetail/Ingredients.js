import { memo, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
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
		},
		timeValue: {
			textTransform: 'lowercase',
		},
	}),
	{ name: 'RecipeDetailIngredients' }
);

export default memo(({ id, ingredients }) => {
	const classes = useStyles();
	const [selected, setSelected] = useState([]);
	const [collapse, toggleCollapse] = useState(true);

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
								Ingredients
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
					{ingredients.map((ingredient, index) => {
						if (!ingredient || ingredient.length === 0) return null;
						const isSelected = selected.indexOf(index) !== -1;

						return (
							<ListItem
								button
								divider
								disableRipple
								selected={isSelected}
								alignItems="flex-start"
								key={`${id}-${ingredient}-${index}`}
								onClick={() => {
									const currentIndex = selected.indexOf(index);
									const newChecked = [...selected];

									if (currentIndex === -1) {
										newChecked.push(index);
									} else {
										newChecked.splice(currentIndex, 1);
									}

									setSelected(newChecked);
								}}
							>
								<ListItemText
									primary={
										<Typography
											variant="subtitle2"
											className={classes.timeKey}
											style={isSelected ? { opacity: 0.6, textDecoration: 'line-through' } : {}}
										>
											{ingredient}
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
