import moment from 'moment';
import Keyword from './Keyword';
import DatePicker from './DatePicker';
import { FILTERS } from 'constants/index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useFilterStyle } from './Filter.style';
import Divider from '@material-ui/core/Divider';
import TextFormField from 'views/TextFormField';
import { Field, useFormikContext } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';

const Filter = ({ index, options, filterKey, onRemove, numOfActiveFilters }) => {
	const { setFieldValue } = useFormikContext();
	const classes = useFilterStyle({ shouldDisplayRemove: numOfActiveFilters > 1 });

	const type = FILTERS.find(({ name }) => name === filterKey)?.type || '';
	return (
		<Grid item container direction="column">
			<Grid item container spacing={1} direction="row" alignItems="center" className={classes.container}>
				<Grid item container xs={6}>
					<Field
						select
						required
						label="Key"
						margin="dense"
						variant="filled"
						value={filterKey}
						name={`filters.${index}`}
						component={TextFormField}
						InputLabelProps={{ className: classes.label }}
						onChange={({ target: { name, value } }) => {
							const type = FILTERS.find((o) => o.name === value)?.type;
							if (type === 'string') {
								setFieldValue(name, { [value]: { contains: '' } });
							} else if (type === 'multi_select') {
								setFieldValue(name, { [value]: { has: [] } });
							} else if (type === 'date') {
								setFieldValue(name, { [value]: { after: moment() } });
							}
						}}
					>
						{FILTERS.map((o) => {
							return (
								<MenuItem key={o.name} value={o.name}>
									{o.displayName}
								</MenuItem>
							);
						})}
					</Field>
				</Grid>

				{type === 'string' && <Keyword index={index} filterKey={filterKey} />}

				{type === 'date' && (
					<DatePicker
						index={index}
						filterKey={filterKey}
						onChange={({ target: { value } }, condition) => {
							const filter = `filters.${index}.${filterKey}`;
							setFieldValue(filter, { [condition]: value });
						}}
					/>
				)}
			</Grid>

			<Grid item className={classes.removeButton}>
				<Button size="small" color="inherit" variant="text" onClick={onRemove}>
					Remove
				</Button>
			</Grid>

			<Grid item className={classes.dividerContainer}>
				<Divider variant="middle" />
			</Grid>
		</Grid>
	);
};

export default Filter;
