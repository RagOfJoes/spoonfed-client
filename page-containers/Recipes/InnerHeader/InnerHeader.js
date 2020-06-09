import Sort from './Sort';
import Filter from './Filter';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { handleFilterRecipe } from './helpers';
import { useApp } from 'lib/Providers/AppProvider';
import IconButton from '@material-ui/core/IconButton';
import ExpandableSearch from 'views/ExpandableSearch';
import SortRoundedIcon from '@material-ui/icons/SortRounded';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useAllRecipes } from 'lib/Providers/AllRecipesProvider';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';

const useStyles = makeStyles(
	({ shape, spacing, palette }) => ({
		container: {
			zIndex: 1,
		},
		wrapper: {
			padding: spacing(1),
			borderRadius: shape.borderRadius,
			backgroundColor: palette.background.default,
		},
	}),
	{ name: 'RecipeInnerHeader' }
);

export default () => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [open, toggleOpen] = useState(false);
	const [sortAnchorEl, setSortAnchorEl] = useState(null);

	const {
		recipes: { sort, toggleSort, filters, toggleFilters },
	} = useApp();
	const { fetchMore, toggleSorting } = useAllRecipes();
	const [value, setValue] = useState(() => {
		try {
			if (filters.length > 0) {
				const searchWord = filters.find((o) => o.name.contains);
				return searchWord.name.contains;
			}
		} catch {}

		return '';
	});

	return (
		<>
			<Grid xs={12} item container className={classes.container}>
				<Grid item container wrap="nowrap" alignItems="center" justify="space-between" className={classes.wrapper}>
					<Grid item>
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								const s = { key: 'creation', order: 'DESC' };
								const f = [{ name: { contains: value || '' } }];
								toggleSort(s);
								toggleFilters(f);

								await handleFilterRecipe(s, f, fetchMore, toggleSorting, enqueueSnackbar);
							}}
						>
							<ExpandableSearch value={value} onChange={(e) => setValue(e.target.value)} />
						</form>
					</Grid>

					<Grid item container justify="flex-end">
						<Grid item>
							<IconButton onClick={(e) => setSortAnchorEl(e.currentTarget)}>
								<SortRoundedIcon />
							</IconButton>
						</Grid>

						<Grid item>
							<IconButton onClick={(e) => toggleOpen(true)}>
								<FilterListRoundedIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Sort anchorEl={sortAnchorEl} setAnchorEl={setSortAnchorEl} />
			<Filter
				open={open}
				toggleOpen={toggleOpen}
				onClear={async () => {
					setValue('');
					toggleFilters([]);

					await handleFilterRecipe(sort, [], fetchMore, toggleSorting, enqueueSnackbar);

					toggleOpen(false);
				}}
			/>
		</>
	);
};
