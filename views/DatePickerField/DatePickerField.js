import moment from "moment";
// import { DatePicker } from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";

const DatePickerField = (
  {
    form,
    field: { value, name },
    TextFieldProps,
    getShouldDisableDateError,
    ...other
  }
) => {
  const currentError = form.errors[name];
  const toShowError = Boolean(currentError && form.touched[name]);
  return <div>Placeholder</div>;
  // return (
  // 	<DatePicker
  // 		autoOk
  // 		clearable
  // 		value={value}
  // 		showTodayButton
  // 		onError={(reason, value) => {
  // 			switch (reason) {
  // 				case 'invalidDate':
  // 					form.setFieldError(name, 'Invalid date format');
  // 					break;

  // 				case 'disablePast':
  // 					form.setFieldError(name, 'Values in the past are not allowed');
  // 					break;

  // 				case 'maxDate':
  // 					form.setFieldError(name, `Date should not be after ${moment(maxDate, 'P').format('')}`);
  // 					break;

  // 				case 'minDate':
  // 					form.setFieldError(name, `Date should not be before ${moment(minDate, 'P').format}`);
  // 					break;

  // 				case 'shouldDisableDate':
  // 					// shouldDisableDate returned true, render custom message according to the `shouldDisableDate` logic
  // 					form.setFieldError(name, getShouldDisableDateError(value));
  // 					break;

  // 				default:
  // 					form.setErrors({
  // 						...form.errors,
  // 						[name]: undefined,
  // 					});
  // 			}
  // 		}}
  // 		// Make sure that your 3d param is set to `false` on order to not clear errors
  // 		onChange={(date) => form.setFieldValue(name, moment(date).startOf('d'), false)}
  // 		renderInput={(props) => {
  // 			return (
  // 				<TextField
  // 					name={name}
  // 					error={toShowError}
  // 					onBlur={() => form.setFieldTouched(name, true, false)}
  // 					// Make sure that your 3d param is set to `false` on order to not clear errors
  // 					{...props}
  // 					{...TextFieldProps}
  // 					helperText={toShowError ? currentError ?? props.helperText : undefined}
  // 				/>
  // 			);
  // 		}}
  // 		{...other}
  // 	/>
  // );
};

export default DatePickerField;
