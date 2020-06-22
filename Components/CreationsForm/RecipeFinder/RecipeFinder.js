import Sort from './Sort';
import List from './List';
import { memo } from 'react';
import { useState } from 'react';
import Waypoint from './Waypoint';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { useRecipeFinder } from './Provider';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import SortIcon from '@material-ui/icons/Sort';
import { handleFilterRecipe } from './helpers';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import { useApp } from 'lib/Providers/AppProvider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandableSearch from 'views/ExpandableSearch';
import useTheme from '@material-ui/core/styles/useTheme';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default memo(({ open, toggleOpen, onRecipeSelect }) => {
	const theme = useTheme();
	const { enqueueSnackbar } = useSnackbar();
	const [sortAnchorEl, setSortAnchorEl] = useState(null);
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const {
		editCreations: { filters, toggleSort, toggleFilters },
	} = useApp();
	const { fetchMore, toggleManipulating } = useRecipeFinder();

	const [value, setValue] = useState(() => (filters.length > 0 ? filters[0].name.contains : ''));

	return (
		<Dialog open={open} fullWidth maxWidth="md" fullScreen={fullScreen} onClose={() => toggleOpen(false)} scroll="body">
			<AppBar elevation={0} color="transparent" position="relative">
				<Toolbar>
					<Typography variant="h6">Find a Recipe</Typography>
					<IconButton aria-label="close" style={{ marginLeft: 'auto' }} onClick={() => toggleOpen(false)}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogContent dividers>
				<Grid container justify="space-between">
					<Grid item>
						<form
							style={{ display: 'flex' }}
							onSubmit={async (e) => {
								e.preventDefault();
								const f = [{ name: { contains: value || '' } }];
								toggleFilters(f);
								toggleSort({ key: 'creation', order: 'DESC' });

								await handleFilterRecipe(f, fetchMore, toggleManipulating, enqueueSnackbar);
							}}
						>
							<ExpandableSearch value={value} onChange={(e) => setValue(e.target.value)} />
						</form>
					</Grid>

					<Grid item>
						<IconButton onClick={(e) => setSortAnchorEl(e.currentTarget)}>
							<SortIcon />
						</IconButton>
					</Grid>
				</Grid>
				<Sort anchorEl={sortAnchorEl} setAnchorEl={setSortAnchorEl} />
				<List onRecipeSelect={onRecipeSelect} />
			</DialogContent>
			<DialogActions>
				<Waypoint />
			</DialogActions>
		</Dialog>
	);
});
