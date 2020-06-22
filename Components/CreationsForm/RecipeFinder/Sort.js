import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { handleSortRecipe } from './helpers';
import { useRecipeFinder } from './Provider';
import { fade } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import { useApp } from 'lib/Providers/AppProvider';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
	{ name: 'RecipeSortPopover' }
);

export default ({ anchorEl, setAnchorEl }) => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const { loading, fetchMore, fetching, toggleManipulating } = useRecipeFinder();

	const {
		editCreations: { sort, toggleSort, filters },
	} = useApp();

	return (
		<Popover
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={() => setAnchorEl(null)}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			PaperProps={{
				elevation: 1,
				className: classes.paper,
			}}
		>
			<Grid container spacing={1} direction="column">
				<Grid item xs={12} className={classes.title}>
					<Typography variant="h6">Sort by</Typography>
				</Grid>

				<Grid item xs={12}>
					<Divider />
				</Grid>

				<Grid item>
					<ToggleButtonGroup
						exclusive
						size="small"
						value={sort.order}
						aria-label="sort recipe"
						style={{ width: '100%' }}
						classes={{ grouped: classes.grouped }}
						onChange={async (e, v) => {
							if (loading || fetching) return;

							if (!v || v === sort.key) return;

							const newSort = { ...sort, order: v };
							toggleSort(newSort);

							await handleSortRecipe(newSort, filters, fetchMore, toggleManipulating, enqueueSnackbar);
						}}
					>
						<ToggleButton
							value="DESC"
							style={{ width: '100%' }}
							aria-label="Descending Order"
							classes={{ selected: classes.selected }}
						>
							Desc
						</ToggleButton>
						<ToggleButton
							value="ASC"
							style={{ width: '100%' }}
							aria-label="Ascending Order"
							classes={{ selected: classes.selected }}
						>
							Asc
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
				<Grid item>
					<ToggleButtonGroup
						exclusive
						size="small"
						value={sort.key}
						aria-label="Sort Recipe"
						classes={{ grouped: classes.grouped }}
						onChange={async (e, v) => {
							if (loading || fetching) return;

							if (!v || v === sort.key) return;

							const newSort = { ...sort, key: v };
							toggleSort(newSort);

							await handleSortRecipe(newSort, filters, fetchMore, toggleManipulating, enqueueSnackbar);
						}}
					>
						<ToggleButton value="name" aria-label="Recipe Name" classes={{ selected: classes.selected }}>
							Name
						</ToggleButton>
						<ToggleButton value="creation" aria-label="Creation Date" classes={{ selected: classes.selected }}>
							Creation
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
			</Grid>
		</Popover>
	);
};
