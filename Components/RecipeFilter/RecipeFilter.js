import FilterForms from './Forms';
import Grid from '@material-ui/core/Grid';
import { Form, Formik, FieldArray } from 'formik';

const RecipeFilter = ({ filters, onClear, onSubmit }) => {
	return (
		<Formik
			initialValues={{
				filters: filters.length > 0 ? filters : [{ name: { contains: '' } }],
			}}
			onSubmit={async (values, action) => {
				action.setSubmitting(true);
				try {
					// Ensure the filters are valid keys
					// and also have values chosen
					const filtered = values.filters.filter((filter) => {
						const key = Object.keys(filter)[0];
						const query = Object.values(filter)[0];
						// Make sure key is not empty
						if (key.length === 0) return false;
						// Make sure Filter for ObjectId is not empty
						else if (query.is && query.is.length === 0) return false;
						else if (query.notIs && query.notIs.length === 0) return false;
						// Make sure array for multi_select type not empty
						else if (query.has && query.has.length === 0) return false;
						else if (query.notHas && query.notHas.length === 0) return false;
						// Make sure text search value is not empty
						else if (query.contains?.length === 0) return false;
						return true;
					});

					typeof onSubmit === 'function' && (await onSubmit(filtered));
				} catch (e) {}
				action.setSubmitting(false);
			}}
		>
			{() => {
				return (
					<Grid item container spacing={2} component={Form} direction="column">
						<FieldArray
							name="filters"
							render={(arrayHelpers) => (
								<FilterForms {...arrayHelpers} onClear={typeof onClear === 'function' && onClear} />
							)}
						></FieldArray>
					</Grid>
				);
			}}
		</Formik>
	);
};

export default RecipeFilter;
