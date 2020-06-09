import { memo } from 'react';
import Creations from './Creations';
import AllCreationsProvider from 'lib/Providers/AllCreationsProvider';

export default memo(() => {
	return (
		<AllCreationsProvider>
			<Creations />
		</AllCreationsProvider>
	);
});
