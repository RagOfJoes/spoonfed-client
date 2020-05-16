import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useThemeType } from 'lib/Providers/ThemeProvider';

export default () => {
	const { theme, setTheme } = useThemeType();
	return (
		<Container maxWidth="lg">
			<Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
				<Grid item>
					<Button color="primary" variant="contained" onClick={setTheme}>
						{theme === 'light' ? 'Dark Mode: OFF' : 'Dark Mode: ON'}
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};
