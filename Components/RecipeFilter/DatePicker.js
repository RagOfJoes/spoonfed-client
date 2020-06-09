import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { Field, useFormikContext } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import DatePickerField from 'views/DatePickerField';
import { useRef, useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MenuProps, useDateTimePickerStyle } from './DatePicker.style';

const CustomField = ({ name, label, ...props }) => {
	return (
		<Field
			name={name}
			label={label}
			component={DatePickerField}
			leftArrowButtonProps={{ 'aria-label': 'Prev month' }}
			rightArrowButtonProps={{ 'aria-label': 'Next month' }}
			TextFieldProps={{
				fullWidth: true,
				margin: 'dense',
				variant: 'filled',
			}}
			{...props}
		/>
	);
};

export default ({ index, filterKey, onChange }) => {
	const {
		values: { filters },
	} = useFormikContext();

	const conditionLabelRef = useRef(null);
	const [condition, changeCondition] = useState(() => {
		try {
			return Object.keys(filters[index][filterKey])[0];
		} catch {}

		return 'after';
	});

	const classes = useDateTimePickerStyle({ condition });

	const [conditionLabelWidth, setConditionLabelWidth] = useState(0);

	useEffect(() => {
		setConditionLabelWidth(conditionLabelRef.current.offsetWidth);
	}, []);

	const isBetween = condition === 'between';
	return (
		<>
			<Grid item container xs={6}>
				<FormControl margin="dense" variant="filled" className={classes['formControl']}>
					<InputLabel id="conditionSelect" ref={conditionLabelRef} className={classes['label']}>
						Condition
					</InputLabel>
					<Select
						value={condition}
						MenuProps={MenuProps}
						labelId="conditionSelect"
						labelWidth={conditionLabelWidth}
						onChange={(e) => {
							if (e.target.value === condition) return;

							const prevValue = filters[index][filterKey][condition];

							changeCondition(e.target.value);
							if (e.target.value === 'between') {
								onChange(
									{
										target: {
											value: [moment(prevValue), moment(prevValue).add('day')],
										},
									},
									e.target.value
								);
								return;
							}

							const newDate = prevValue.length > 1 ? prevValue[0] : prevValue;
							onChange({ target: { value: newDate } }, e.target.value);
						}}
					>
						<MenuItem key={'after'} value={'after'}>
							after
						</MenuItem>
						<MenuItem key={'before'} value={'before'}>
							before
						</MenuItem>
						<MenuItem key={'equals'} value={'equals'}>
							equals
						</MenuItem>
						<MenuItem key={'between'} value={'between'}>
							between
						</MenuItem>
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={isBetween ? 6 : 12}>
				<CustomField
					label="Start date"
					maxDate={isBetween ? filters[index][filterKey][condition][1] : undefined}
					name={
						isBetween ? `filters.${index}.${filterKey}.${condition}.0` : `filters.${index}.${filterKey}.${condition}`
					}
				/>
			</Grid>

			{condition === 'between' && (
				<Grid item xs={6} className={classes['endDateContainer']}>
					<CustomField
						label="End date"
						InputLabelProps={{ className: classes['label'] }}
						minDate={filters[index][filterKey][condition][0]}
						name={`filters.${index}.${filterKey}.${condition}.1`}
					/>
				</Grid>
			)}
		</>
	);
};
