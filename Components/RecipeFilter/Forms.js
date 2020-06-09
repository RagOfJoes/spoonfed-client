import _ from 'lodash';
import Filter from './Filter';
import { useFormikContext } from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default ({ push, remove, onClear }) => {
	const { values, resetForm } = useFormikContext();
	return (
		<>
			{values.filters.map((filter, index) => {
				const key = _.keys(filter)[0];

				return (
					<Filter
						index={index}
						filterKey={key}
						key={key + '.' + index}
						numOfActiveFilters={values.filters.length}
						onRemove={() => values.filters.length > 1 && remove(index)}
					/>
				);
			})}
			<Grid item container wrap="nowrap" direction="row" justify="space-between">
				<Grid item container spacing={2} direction="row">
					<Grid item>
						<Button variant="contained" onClick={() => push({ '': {} })}>
							Add
						</Button>
					</Grid>

					<Grid item>
						<Button
							variant="text"
							onClick={() => {
								onClear();
								resetForm();
							}}
						>
							Clear
						</Button>
					</Grid>
				</Grid>

				<Grid item>
					<Button type="submit" color="primary" variant="contained">
						Submit
					</Button>
				</Grid>
			</Grid>
		</>
	);
};
