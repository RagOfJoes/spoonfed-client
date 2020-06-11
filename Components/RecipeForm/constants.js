import * as yup from 'yup';

export const init = {
	name: '',
	servings: '',
	importUrl: '',
	ingredients: [''],
	instructions: [''],
	images: [],
	time: {
		prep: '',
		cook: '',
		ready: '',
		active: '',
		inactive: '',
		total: '',
	},
};

export const timeRegExp = new RegExp(
	/^[0-9][0-9]{0,1}[ ]?(?:(h|hr|hrs|hour|hours)[ ]?(\band\b)?[ ]?([0-9][0-9]{0,1}[ ]?(m|min|mins|minute|minutes))?|m|min|mins|minute|minutes)$/,
	'i'
);

export const schema = yup.object().shape({
	name: yup.string().required('You must name the recipe').max(60, 'Cannot exceed 60 letters!'),
	importUrl: yup.string(),
	servings: yup.string().required('You must provide the amount of serving'),
	ingredients: yup
		.array()
		.of(yup.string().required('Cannot be left empty'))
		.min(1, 'You need to provide one or more ingredient(s)'),
	instructions: yup
		.array()
		.of(yup.string().required('Cannot be left empty'))
		.min(1, 'You need to provide one or more instruction(s)'),
	time: yup.object().shape({
		prep: yup.string().matches(timeRegExp, { message: 'Invalid Time' }),
		cook: yup.string().matches(timeRegExp, { message: 'Invalid Time' }),
		ready: yup.string().matches(timeRegExp, { message: 'Invalid Time' }),
		active: yup.string().matches(timeRegExp, { message: 'Invalid Time' }),
		inactive: yup.string().matches(timeRegExp, { message: 'Invalid Time' }),
		total: yup.string().matches(timeRegExp, { message: 'Invalid Time' }).required('You must provide a total cooking time'),
	}),
});
