import { memo } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

export default memo(({ tab, setTab }) => {
	return (
		<Tabs
			value={tab}
			textColor="primary"
			variant="scrollable"
			scrollButtons="auto"
			indicatorColor="primary"
			onChange={(e, v) => setTab(v)}
		>
			<Tab label="Meta" />
			<Tab label="Ingredients" />
			<Tab label="Instructions" />
		</Tabs>
	);
});
