import { memo, useState } from 'react';
import { fade } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import useSoftRise from 'lib/hooks/useSoftRise';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		list: {},
		listHeader: {},
		listHeaderText: {
			fontSize: theme.typography.h6.fontSize,
		},
		listItem: {
			borderRadius: theme.shape.borderRadius,
		},
		listItemSelected: {
			'&.Mui-selected': {
				backgroundColor: fade(theme.palette.primary.main, 0.2),
			},

			'&.Mui-selected:hover': {
				backgroundColor: fade(theme.palette.primary.main, 0.25),
			},
		},
		collapseButton: {
			padding: theme.spacing(0.25, 2),
		},
		timeKey: {
			textTransform: 'capitalize',
			fontWeight: theme.typography.fontWeightMedium,
		},
		timeValue: {
			textTransform: 'lowercase',
		},
	}),
	{ name: 'RecipeDetailIntrusctions' }
);

export default memo(({ id, instructions }) => {
	const classes = useStyles();
	const [selected, setSelected] = useState(0);
	const shadow = useSoftRise({ inactive: false });
	const [collapse, toggleCollapse] = useState(true);

	return (
		<Grid item xs={12}>
			<List
				className={classes.list}
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
								Instructions
							</ListSubheader>
						</Grid>
					</Grid>
				}
			>
				{instructions.map((instruction, index) => {
					if (!instruction || instruction.length === 0) return null;
					const isSelected = selected === index;

					return (
						<ListItem
							button
							disableRipple
							selected={isSelected}
							alignItems="flex-start"
							key={`${id}-${instruction}-${index}`}
							className={`${classes.listItem} ${isSelected && shadow.root}`}
							classes={{
								root: classes.listItemSelected,
							}}
							onClick={() => {
								if (selected === index) setSelected(null);
								else setSelected(index);
							}}
						>
							<ListItemText
								primary={
									<Typography
										variant="subtitle2"
										className={classes.timeKey}
										style={
											isSelected ? { transform: 'scale(1.01)' } : selected !== null ? { opacity: 0.7 } : {}
										}
									>
										{instruction}
									</Typography>
								}
							/>
						</ListItem>
					);
				})}
			</List>
		</Grid>
	);
});
