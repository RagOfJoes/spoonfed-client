import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import { handleFilterRecipe } from './helpers';
import { fade } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import RecipeFilter from 'Components/RecipeFilter';
import { useApp } from 'lib/Providers/AppProvider';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useAllRecipes } from 'lib/Providers/AllRecipesProvider';

const useStyles = makeStyles(
	({ shape, spacing, palette }) => ({
		title: {
			margin: spacing(0.5),
		},
		grouped: {
			margin: spacing(0.5),
			border: 'none',
			'&:not(:first-child)': {
				borderRadius: shape.borderRadius,
			},
			'&:first-child': {
				borderRadius: shape.borderRadius,
			},
		},
		paper: {
			overflow: 'hidden',
			padding: spacing(1),
		},
		selected: {
			backgroundColor: `${fade(palette.primary.main, 0.28)} !important`,
		},
	}),
	{ name: 'RecipeFilterPopover' }
);

const Filter = ({ open, onClear, toggleOpen }) => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const {
		recipes: { sort, filters, toggleFilters },
	} = useApp();

	const { fetchMore, isSorting, isFetching, toggleSorting } = useAllRecipes();

	return (
		<Dialog scroll="body" open={open} onClose={() => toggleOpen(false)} PaperProps={{ className: classes.paper }}>
			<Grid container spacing={1} direction="column">
				<Grid item xs={12} className={classes.title}>
					<Typography variant="h6">Filters</Typography>
				</Grid>

				<Grid item xs={12}>
					<Divider />
				</Grid>

				<RecipeFilter
					filters={filters}
					onClear={async () => await onClear()}
					onSubmit={async (filtered) => {
						if (isFetching || isSorting) return;

						if (!filtered || filtered.length <= 0) return toggleOpen(false);

						if (JSON.stringify(filtered) === JSON.stringify(filters)) return toggleOpen(false);

						toggleFilters(filtered);
						await handleFilterRecipe(sort, filtered, fetchMore, toggleSorting, enqueueSnackbar);
						toggleOpen(false);
					}}
				/>
			</Grid>
		</Dialog>
	);
};

export default Filter;
