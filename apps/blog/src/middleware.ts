// // src/middleware.ts
// export async function onRequest(context, next) {
// 	// Do something before the request is handled.
// 	const response = await next()
// 	// Or, do something before the response is returned.
// 	return response
// }

// // src/middleware.ts
// // Example: A simple authentication check in middleware.
// export async function onRequest({ cookies, locals }, next) => {
// 	// Check for the "sid" user session ID cookie.
// 	// Return a 405 (Not Allowed) if the cookie is missing.
// 	const sessionId = cookies.get("sid");
// 	if (!sessionId) {
// 		return new Response(null, {status: 405});
// 	}
// 	// Use your own `getUser()` function to validate the user.
// 	// Return a 405 (Not Allowed) if the user isn't real.
// 	const user = await getUser(sessionId);
// 	if (!user) {
// 		return new Response(null, {status: 405});
// 	}
// 	// Attach the loaded user to the `locals` object.
// 	// Now, it can be read in the page route!
// 	locals.user = user;
// 	// Return `next()` to return the response.
// 	return next();
// }
