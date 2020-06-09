import Router from 'next/router';

/**
 * Mainly for user auth to redirect with correct context and appropriate target URL
 */
export default (context, target) => {
	if (context.res) {
		// server
		// 303: "See other"
		context.res.writeHead(303, { Location: target });
		context.res.end();
	} else {
		// In the browser, we just pretend like this never even happened ;)
		Router.replace(target);
	}
};
